<template>
<v-button v-model:show="isShow">
  共{{data.reply}}条回复<i class="iconfont icon-triangle" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" className="font16" :title="`${data.reply}条回复`" :style="{width: 650, height: 650}" width="520px" height="450px" :hasfooter="false">
  <template v-slot:content>
    <perfect-scrollbar>
      <div class="content comment-content">
        <div class="comment-list nobg" style="padding-left: 65px;">
          <div class="photos" style="left: 10px;">
            <v-photos :sourceData="data" />
          </div>
          <p class="m0">{{data.nickname}}</p>
          <p>{{data.times}}
            <Itembar :data="data" />
          </p>
          <p v-html="data.content"></p>
          <p v-if="data.image.length>0">
            <Images :data="data" kind="comment" />
          </p>
          <div class="mt25">
            <div class="mb10 relative" style="padding-left: 55px;" v-for="(item, index) in dataList.list" :key="index">
              <div class="photos" style="top: 0; left: 0;">
                <v-photos :sourceData="item" />
              </div>
              <p class="m0">{{item.nickname}}<span v-html="`:回复${item.from_nickname}`" v-if="item.from_nickname"></span></p>
              <p>{{item.times}}
                <Itembar :data="{...item}" method="reply" />
              </p>
              <p v-html="item.content"></p>
              <p v-if="item.image.length>0">
                <Images :data="item" kind="comment" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  watch
} from 'vue'
import {
  useStore
} from 'vuex'
import Images from '../components/image.vue'
import Itembar from './itembar.vue'
export default defineComponent({
  name: 'HomeViewh',
  components: {
    Images,
    Itembar
  },
  props: {
    title: {
      type: String,
      default: "创建组"
    },
    action: {
      type: String,
      default: "add"
    },
    group: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    }
  },
  setup(props, context) {
    const store = useStore();
    const isShow = ref(false)
    const dataList = ref([])

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        int()
      }
    })

    function int() {
      // loading.value = true
      store.dispatch('common/Fetch', {
        api: 'commentReplyList',
        data: {
          coding: props.data.coding3,
          artid: props.data.id
        }
      }).then(res => {
        dataList.value = res.result
        // loading.value = false
      })
    }

    return {
      isShow,
      dataList
    }
  }
})
</script>

<style lang="less" scoped>
.ps {
  height: 560px;
}
</style>
