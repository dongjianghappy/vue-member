<template>
<div class="module-wrap">
  <div class="module-head" style="height: 50px;">
      <span class="right">
       </span>
    </div>
  <div class="module-content p5">
    <div class="col-md-3 p10" v-for="(item, index) in dataList" :key="index">
      <div class="p15 align_center" @click="visit(item)" style=" background: #f9f9f9; border-radius: 8px;">
        <div class="ptb10 font6">{{item.title}}</div>
      </div>
    </div>
  </div>
</div>
<v-nodata v-if="dataList.length === 0 && loading" trip="暂时没有数据" />
</template>

<script lang="ts">
import {
  getUid
} from '@/utils';
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViews',
  components: {

  },
  props: {
    channel: {
      type: String,
      default: ""
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const coding: any = codings.website
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);

        function visit(param: any) {
      const {
        id
      } = param

      store.dispatch('common/Fetch', {
        api: "VisitCommunity",
        data: {
          coding: coding.info,
          id
        }
      }).then(res => {
        window.open(param.url)

      })
    }

    return {
      loginuser,
      visit
    }
  }
})
</script>
