<template>
<div v-if="dataList.length > 0">
  <div class="bg-white mb25" style="min-height: 500px">
    <Card :data="dataList" />
  </div>
</div>
<v-nodata v-if="dataList.length === 0 && loading" trip="暂时没有数据" />
</template>

<script lang="ts">
import {
  getUid
} from '@/utils';

import Card from '../../concern/components/card.vue'
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViews',
  components: {
    Card
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
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);

    return {
      loginuser
    }
  }
})
</script>
