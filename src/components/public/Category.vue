<template>
<v-button v-if="type !== 'text'" @click="handleclick">{{name}}</v-button>
<span v-else @click="handleclick" v-html="name" class="cursor"></span>
<v-dialog v-model:show="isShow" ref="form" :title="title || name" :style="{width: '650', height: '500'}" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <slot name="content">
      <div class="ant-modal-body">
        <div style="padding: 10px;">当前：
          <span v-if="current.length">
            <span class="bg-eee mr10 p10 " v-for="(item, index) in current" :key="index">{{item.name}}</span>
            <span v-if="current.length > 0" @click="() => current = []">清空</span>
          </span>
          <span v-else>{{current.name}}</span>
        </div>
        <div class="cate-wrap" style="height: 300px; overflow: auto;">
          <div>
            <div class="ptb10">
              <div style="position: relative;">
                <span :class="{current: current.value ===  0}" @click="choose({value: 0, name: '顶级分类'})">顶级分类</span>
                <template v-if="isInt">
                  <div v-for="(item, index) in dataList" :key="index">
                    <div style="padding: 6px 0px;"><span :class="{current: current.value ===  item.id}" @click="choose({value: item.id, name: item.name})" style="padding: 6px 10px;">{{item.name}}</span></div>
                    <!-- 基本父类 -->
                    <ul class="pl20 clearfix" syle="display: flex; flex-wrap: wrap;" v-if="item.list">
                      <li v-for="(list, i) in item.list" class="left" :class="{current: current.value ===  list.id}" :key="i" style="padding: 6px 10px; display: flex" @click="choose({value: list.id, name: isCurrent ? list.name : `${item.name} > ${list.name}`})">
                        {{list.name}}
                      </li>
                    </ul>
                  </div>
                </template>
                <template v-else>
                  <div v-for="(item, index) in dataList" :key="index">
                    <div style="padding: 6px 0px;"><span :class="{current: getParent(current, `|${item.id}|`)}" @click="choose({value: `|${item.id}|`, name: item.name})" style="padding: 6px 10px;">{{item.name}}</span></div>
                    <!-- 基本父类 -->
                    <template v-if="item.list">
                      <div style="display: flex" v-for="(list, i) in item.list" :key="i" class="pl20 clearfix" syle="display: flex; flex-wrap: wrap;">
                        <div :class="{current: getParent(current, `|${item.id}|${list.id}|`)}" :key="i" style="width: 140px; padding: 6px 10px; display: flex" @click="choose({value: `|${item.id}|${list.id}|`, name: list.name})">
                          {{list.name}}
                        </div>
                        <div style="flex: 1" v-if="list.list">
                          <ul>
                            <li class="left mr15 mb15" v-for="(data, j) in list.list" :key="j" :class="{current: getParent(current, `|${item.id}|${list.id}|${data.id}|`)}" @click="choose({value: `|${item.id}|${list.id}|${data.id}|`, name:  data.name})">{{data.name}}</li>
                          </ul>
                        </div>
                      </div>
                    </template>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slot>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  watch,
  getParent,
  showParent
} from '@/utils'

export default defineComponent({
  name: 'v-Category',
  props: {
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "button"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    isInt: {
      type: Boolean,
      default: false
    },
    isCurrent: {
      type: Boolean,
      default: false
    },
    // 确认按钮是否是提交
    isUpdate: {
      type: Boolean,
      default: false
    },
    isMore: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:cate'],
  setup(props, context) {
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    let current: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function choose(param: any) {
      if (props.isMore === true) {
        let index = current.value.findIndex((item: any) => item.value === param.value)
        if (index > -1) {
          current.value.splice(index, 1)
        } else {
          if (current.value.length > 4) {
            proxy.$hlj.message({
              msg: "最多只能选择5个分类"
            })
          } else {
            current.value.push(param)
          }
        }
      } else {
        current.value = param
      }
    }

    function splitFid() {
      const {
        item
      } = props.data

      if (!item.fid) {
        return
      }
      let arr: any = []
      if (item.fid.indexOf("-") > -1) {
        let ccc = item.fid.split("-")
        ccc.map((data: any) => {
          arr.push({
            value: data
          })
        })
      } else {
        arr = [{
          value: item.fid
        }]
      }
      return arr
    }

    function init() {
      let aaa = props.isMore && splitFid()
      current.value = []
      store.dispatch('common/Fetch', {
        api: props.api || "cateList",
        data: {
          coding: props.data.coding.cate || props.data.coding || "P0001"
        }
      }).then(res => {
        dataList.value = res.result

        if (!props.isMore) {
          return
        }
        for (let i = 0; i < res.result.length; i++) {
          aaa.map((item: any) => {

            if (item.value.indexOf(`|${res.result[i].id}|`) > -1) {
              item.name = res.result[i].name
            }
            return item
          })

          // 二级分类查询
          let second: any = res.result[i].list
          if (second.length > 0) {
            for (let j = 0; j < second.length; j++) {
              aaa.map((item: any) => {
                if (item.value.indexOf(`|${second[j].id}|`) > -1) {
                  item.name = second[j].name
                }
                return item
              })

              // 二级分类查询
              let third: any = res.result[i].list[j].list
              if (third.length > 0) {
                for (let k = 0; k < third.length; k++) {
                  aaa.map((item: any) => {
                    if (item.value.indexOf(`|${third[k].id}|`) > -1) {
                      item.name = third[k].name
                    }
                    return item
                  })
                }
              }
            }
          }
        }
        current.value = aaa
      })
    }

    function submit() {
      const {
        data
      }: any = props

      // if (!props.isCurrent && data.item.id === current.value.value) {
      //   proxy.$hlj.message({
      //     msg: "不能以自己为父类"
      //   })
      //   return
      // }

      let fid: any = ""
      let parent = ""
      if (props.isMore) {

        current.value.map((item: any, index: number) => {
          if (index === 0) {
            fid = item.value
            parent = item.name
          } else {
            fid += '-' + item.value
            parent += '、' + item.name
          }
        })

        data.item.fid = fid
        data.item.parent = parent
      } else {
        data.item.fid = current.value.value
        data.item.parent = current.value.name
      }

      isShow.value = !isShow.value
      // 提交代码
      if (props.isUpdate) {
        store.dispatch('common/Fetch', {
          api: 'update',
          data: {
            id: data.item.id,
            fid: props.isMore ? fid : current.value.value,
            coding: props.data.coding.art || props.data.coding
          }
        })
      }
    }
    return {
      isShow,
      current,
      handleclick,
      choose,
      submit,
      dataList,
      getParent,
      showParent
    }
  }
})
</script>

<style scoped>
.current {
  background: #1890ff !important;
  padding: 0 5px;
  border-radius: 2px;
  color: #fff;

}
</style>
