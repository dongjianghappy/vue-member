<template>
<v-button v-model:show="isShow" :disabled="auth">
  <i class="iconfont icon-shezhi pointer"></i>
</v-button>
<v-drawer v-model:show="isShow" title="系统设置" :style="{width: '400', top: '0', 'line-height': 'none'}" :hasfooter="false" :auth="auth">
  <template v-slot:extra>
    
  </template>
  <template v-slot:content>
    <!-- <v-collapse :title="item.name" v-for="(item, index) in dataList" :key="index">
      <template v-slot:extra>
        
      </template>
      <ul class="form-wrap-box">
        <li class="li mb15" v-for="(item, i) in item.list" :key="i">
          <span class="label">
            {{item.remark}}
            
          </span>
          <v-switch :data="{ item, field: 'value', coding: data.coding.setting }" @toggle="getValue" className="right" :auth="true" />
        </li>
      </ul>
    </v-collapse> -->
  </template>
</v-drawer>
</template>

<script lang="ts">
import {
  useStore
} from '@/utils'
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watch,
  computed,
  codings
} from '@/utils'
export default defineComponent({
  name: 'v-Search',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    auth: {
      type: Boolean,
      default: false
    },
  },
  emits: ['onClick'],
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore()
    const coding: any = codings.user

    const isShow: any = ref(false)
    const dataList: any = ref([])
    const setting = computed(() => store.getters['user/setting']);

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        // init()
      }
    })

    function init() {
      store.dispatch('common/Fetch', {
        api: "systemSetting",
        data: {
          type: "user"
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function getValue(param: any) {
      store.commit('user/setSettingValue', {
        ...param
      })
    }

    return {
      isShow,
      dataList,
      setting,
      module,
      init,
      getValue
    }
  }
})
</script>
