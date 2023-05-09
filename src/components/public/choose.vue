<template>
<span @click="handleChoose" class="pointer" :class="{'no-event': disabled}">
  {{title}}
</span>
<v-drawer ref="drawer" v-model:show="isShow" action="add" :title="title" :style="{width: 350}" :hasfooter="false">
  <template v-slot:content v-if="isShow">
    <table width="100%" class="table-striped table-hover col-left-23">
      <tr class="th">
        <td class="col-md-1"> 选择</td>
        <td class="col-md-2">名称 </td>
      </tr>
      <template v-if="dataList.list.length > 0">
        <tr v-for="(item, index) in dataList.list" :key="index">
          <td>
            <label class="relative mr25" style="display: inline-block; line-height: 18px;" v-if="type === 'radio'">
              <input type="radio" name="radio" :value="item.id" :checked="data.item.id === item.id" class="mr5" style="float: left" @change="handleclick(item)" />
            </label>
            <v-checkbox :checkedList="checked" :data="{ id: item.id}" v-else />
          </td>
          <td>
            {{item.name || item.title}}
          </td>
        </tr>
      </template>
    </table>
    <div class="mt25 align_center">
      <v-pagination :pagination="{total: dataList.total, pages: dataList.pages, page: dataList.page ||  1, pagesize: dataList.pagesize}" :render="init" :simple="true" />
    </div>
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  useStore,
  watch
} from '@/utils'
export default defineComponent({
  name: 'v-ChooseSite',
  props: {
    title: {
      type: String,
      default: "请选择"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: "checkbox"
    },
    message: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
    api: {
      type: String,
      default: ""
    },
    coding: {
      type: String,
      default: ""
    },
  },
  emits: ['update:checked', 'choose'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore()
    const isShow: any = ref(false)
    const drawer: any = ref(null)
    const dataList: any = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        init()
      }
    })

    //初始页面
    function init(param: any = {}) {

      const params: any = {
        page: 1,
        pagesize: 10
      }

      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: props.api || "select",
        data: {
          coding: props.coding,
          ...props.data.condition,
          ...params
        }
      }).then(res => {
        dataList.value = res.result || {}
      })
    }

    // 按钮点击
    function handleChoose() {
      isShow.value = true
    }

    function handleclick(data: any) {
      let arr = dataList.value.list.filter((item: any) => item.id === data.id)
      if (arr) {
        context.emit('choose', {
          field: props.data.field,
          data: arr[0]
        })
      }
    }

    return {
      isShow,
      drawer,
      handleclick,
      handleChoose,
      dataList,
      init
    }
  }
})
</script>
