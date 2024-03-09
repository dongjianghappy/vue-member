<template>
<ul class="tab_ul relative">
  <li v-for="(item, index) in (data.length >5 ? data.slice(0, 7) : data)" :key="index" :style="style" :class="{current: (mod.value || '') == item.value}">
    <span @click="handelClick(item.value)">{{item.name}}</span>
  </li>
  <span class="span-icon absolute" style="top: 12px; right: 15px">
    <v-popover v-if="data.length > 7" content="<i class='iconfont icon-more icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-more`">
      <div style="width: 100px; height: auto">
        <ul class="font14" style="display: block">
          <li v-for="(item, index) in data.slice(7, data.length)" :key="index" @click="handelClick(item.value)">{{item.name}}</li>
        </ul>
      </div>
    </v-popover>
  </span>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  useRouter,
  useStore,
  getUid,
  codings
} from '@/utils'
export default defineComponent({
  name: 'TalkTabsView',
  props: {
    mod: {
      type: Object,
      default: () => {
        return {
          tab: 'mod',
          value: ''
        }
      }
    },
    query: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: []
    },
    render: {
      type: Function,
      default: () => {
        return
      }
    },
    style: {
      type: Object,
      default: () => {
        return {}
      }
    },
    field: {
      type: String,
      default: "type"
    }
  },

  setup(props, context) {
    const store = useStore()
    const router = useRouter();
    const coding: any = codings

    function handelClick(type: any) {
      let query = ""
      query = type ? `?${props.mod.tab}=${type}${props.query}` : `?${props.query.substring(1, props.query.length)}`
      router.push(window.location.pathname + query)
      const param: any = {}

      if (type) {
        param[props.field] = type
      }
      props.render(param)

      Archive(param)
    }

    // 时间归档
    function Archive(param: any) {
      let params: any = {}
      let module_arr = ['talk', 'source', 'article', 'picture', 'tech', 'funny', 'notes', 'questions', 'website', "words"]
      let date: any = new Date()
      if (module_arr.indexOf(param.type) > -1) {
        params.coding = coding[param.type].art
      }

      store.dispatch(`talk/Archive`, {
        data: {
          uid: getUid(),
          type: 'archive',
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          ...params
        }
      })
    }

    return {
      handelClick,
    }
  }
})
</script>
