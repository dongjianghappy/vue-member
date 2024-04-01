<template>
  <div>
    <div class="container w1100">
      <UserInfoHead />
    </div>
    <div class="container w1100 relative clearfix">
      <div class="w180 left">
        <v-aside :data="module.home_nav"
                 :isFixed="false">
          <template v-slot:button>
          </template>
        </v-aside>
      </div>
      <div class="right"
           style="width: 910px;">
        <div class="module-wrap">
          <div class="module-content p20">
            <div style="height: 165px; overflow: hidden;">
              <div class="mb15 font14">视频({{cateList.length || 0}})
              </div>
              <v-slider @onClick="handleclick"
                        :dataList="cateList" />
            </div>
          </div>
        </div>
        <div class="module-wrap">
          <div class="module-content p20"
               style="min-height: 500px">
            <div class="plr15">
              <div class="col-md-4 p10"
                   v-for="(item, i) in dataList"
                   :key="i">
                <!-- <v-thumbnail :data="item" /> -->
                <Video :data="item"
                       :hasName="false" />
              </div>
            </div>
            <v-nodata v-if="dataList.length === 0"
                      trip="暂时没有数据" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  computed,
  onMounted,
  ref,
  getUid,
  codings
} from '@/utils'
import UserInfoHead from '../../home/components/UserInfoHead.vue'
import Detail from './components/detail.vue'
import List from './components/list.vue'
import Album from './components/album.vue'
import Video from '../../index/components/TalkItem/components/video2.vue'

export default defineComponent({
  name: 'AlbumView',
  components: {
    UserInfoHead,
    Detail,
    List,
    Album,
    Video
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.talk
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);
    const history: any = ref([])
    const current: any = ref({})
    const photoAlbum: any = ref([])
    const dataList: any = ref([])
    const albumList = computed(() => store.getters['common/albumList']);
    const showAlbum = ref(false)
    const currentData = ref({})
    const currentAlbum = ref()
    const showFlag = ref(false)
    const currentImg = ref()
    const upload: any = ref(null);
    const img = ref("")
    const index: any = ref(0)
    const uid = getUid()
    const cateList: any = ref([])
    const module = computed(() => store.getters['user/config_talk']);

    function init(param: any = {}) {
      dataList.value = []
      store.dispatch('common/Fetch', {
        api: 'getVideo',
        data: {
          pagesize: 25,
          page: 1,
          category: 'video',
          cid: param.id
        }
      }).then(res => {
        dataList.value = res.result || []
      })
    }

    function cate() {
      store.dispatch('common/Fetch', {
        data: {
          coding: coding.cate
        }
      }).then(res => {
        cateList.value = res.result
        init(cateList.value[0])
      })
    }

    function handleclick(param: any) {
      init(param)
    }

    function add(action: any, item: any) {
      showAlbum.value = true
      currentData.value = {
        action,
        item
      }
    }

    onMounted(() => {
      cate()
    })

    return {
      coding,
      albumList,
      uid,
      history,
      handleclick,
      current,
      add,
      showFlag,
      currentImg,
      showAlbum,
      currentData,
      photoAlbum,
      cateList,
      dataList,
      index,
      loginuser,
      // sidebar,
      module
    }
  }
})
</script>

<style scoped>
.background {
  background: rgba(0, 0, 0, 0.7)
}
</style>
