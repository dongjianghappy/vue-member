<template>
<v-button v-if="type !== 'text'" @click="handleclick">{{name}}</v-button>
<span v-else @click="handleclick" v-html="name" class="cursor"></span>
<v-dialog v-model:show="isShow" ref="form" :title="title || name" width="650px" height="500px" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content v-if="isShow">
    <slot name="content">
      <div class="ant-modal-body">
        <div style="padding: 10px;">当前：</div>
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
                      <li v-for="(list, i) in item.list" class="left" :class="{current: current.value ===  list.id}" :key="i" style="padding: 6px 10px; display: flex" @click="choose({value: list.id, name:  `${item.name} > ${list.name}`})">
                        {{list.name}}
                      </li>
                    </ul>
                  </div>
                </template>
                <template v-else>
                  <div v-for="(item, index) in dataList" :key="index">
                    <div style="padding: 6px 0px;"><span :class="{current: current.value ===  `|${item.id}|`}" @click="choose({value: `|${item.id}|`, name: item.name})" style="padding: 6px 10px;">{{item.name}}</span></div>
                    <!-- 基本父类 -->
                    <template v-if="item.list">
                      <div style="display: flex" v-for="(list, i) in item.list" :key="i" class="pl20 clearfix" syle="display: flex; flex-wrap: wrap;">
                        <div :class="{current: current.value ===  `|${item.id}|${list.id}|`}" :key="i" style="width: 140px; padding: 6px 10px; display: flex" @click="choose({value: `|${item.id}|${list.id}|`, name:  `${item.name} > ${list.name}`})">
                          {{list.name}}
                        </div>
                        <div style="flex: 1" v-if="list.list">
                          <ul>
                            <li class="left mr15 mb15" v-for="(data, j) in list.list" :key="j" :class="{current: current.value ===  `|${item.id}|${list.id}|${data.id}|`}" @click="choose({value: `|${item.id}|${list.id}|${data.id}|`, name:  `${item.name} > ${list.name} > ${data.name}`})">{{data.name}}</li>
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
  onMounted,
  ref,
  useStore,
  watch
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
    // 是否更新
    isUpdate: {
      type: Boolean,
      default: false
    },
    operating: {
      type: String,
      default: ""
    },
  },
  emits: ['update:cate'],
  setup(props, context) {
    const isShow: any = ref(false)
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const dataList: any = ref([])
    let current: any = ref({})

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        current.value.name = "",
          current.value.value = "4324234"
        init()
      }
    })

    function handleclick(param: any) {
      isShow.value = !isShow.value
    }

    function choose(param: any) {
      current.value = param
    }

    function init() {
      store.dispatch('common/Fetch', {
        api: props.api || "cateList",
        data: {
          coding: props.data.coding.cate || props.data.coding || "P0001"
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function submit() {
      const {
        data
      }: any = props

      if (data.item.id === current.value.value) {
        proxy.$hlj.message({
          msg: "不能以自己为父类"
        })
        return
      }
      data.item.fid = current.value.value
      data.item.parent = current.value.name
      isShow.value = !isShow.value
      // 提交代码
      if (props.isUpdate) {
        store.dispatch('common/Fetch', {
          api: 'update',
          data: {
            id: data.item.id,
            fid: current.value.value,
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
      dataList
    }
  }
})
</script>

<style scoped>
.current {
  background: #1890ff;
  border-radius: 2px;
  color: #fff;

}
</style>
