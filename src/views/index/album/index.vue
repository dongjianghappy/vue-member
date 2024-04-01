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
              <div class="mb15 font14">相册({{cateList.length || 0}})
                <span class="right">
                  <v-group action='add'
                           :data="data"
                           :group="cateList"
                           :coding="coding.album.list"
                           :render="aaaa" /></span>
              </div>
              <v-slider @onClick="handleclick"
                        :dataList="cateList" />
            </div>
          </div>
        </div>
        <div class="module-wrap">
          <div class="module-content p20"
               style="min-height: 500px">
            <div class="mb15">
              <span class="right pointer"
                    @click="handleSave('add')"
                    v-if="loginuser.currentUser && current.id !== '0' && current.id !== '-1'"
                    :disable="img.length<2">
                <i class="iconfont icon-mail" />
                保存
              </span>
              <span class="right pointer mr25"
                    @click="handleUpload('add')"
                    v-if="loginuser.currentUser && current.id !== '0' && current.id !== '-1'">
                <i class="iconfont icon-upload-file" />
                上传
              </span>
            </div>
            <v-upload ref="upload"
                      uploadtype='album'
                      @imgList="image"
                      v-if="current !== '0' && current !== 'photo'"
                      file="talk" />
            <div v-if="current.id === '-1'">
              <v-tabs :tabs="[{name: '头像',value: 'photos'},{name: '头像背景',value: 'background'},{name: '主页背景',value: 'banner'}]"
                      :isEmit="true"
                      v-model:index="index">
                <template v-slot:content1>
                  <List kind="photos" />
                </template>
                <template v-slot:content2>
                  <List kind="head_background" />
                </template>
                <template v-slot:content3>
                  <List kind="home_background" />
                </template>
              </v-tabs>
            </div>
            <div class="plr15"
                 v-else-if="current.id === '0'">
              <div v-for="(item, index) in albumList"
                   :key="index"
                   style="overflow: auto;">
                <div>{{item.month}}</div>
                <div>
                  <div class="col-sm-6 col-md-3 p10"
                       v-for="(img, i) in item.list"
                       :key="i">
                    <v-thumbnail :data="{image: [img]}" />
                  </div>
                </div>
              </div>
            </div>
            <div class="plr15"
                 v-else>
              <div class="col-sm-6 col-md-3 p10"
                   v-for="(item, i) in photoList"
                   :key="i">
                <v-thumbnail :data="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {

} from '@/utils'
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

export default defineComponent({
  name: 'AlbumView',
  components: {
    UserInfoHead,
    Detail,
    List,
    Album
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
    const cateList: any = ref([])
    const photoList: any = ref([])
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
    const module = computed(() => store.getters['user/config_talk']);

    function aaaa() {
      store.dispatch('common/Fetch', {
        api: "customGroup",
        data: {
          coding: coding.album.list,
          uid: getUid()
        }
      }).then(res => {
        cateList.value = res.result
        current.value = res.result[0]
        init()
      })
    }

    // 监听图片上传
    function image(a: any) {
      img.value = a
    }

    function handleUpload(param: any) {
      upload.value.handleclick()
    }

    function handleSave(param: any) {
      store.dispatch('common/Fetch', {
        api: "UploadUserPhoto",
        data: {
          fid: current.id,
          img: img.value,
        }
      }).then(res => {
        proxy.$hlj.message(res.returnMessage)
      })
    }

    function init() {
      store.dispatch('common/AlbumList', {
        uid: getUid()
      })
    }

    function handleclick(param: any) {
      current.value = param
      if (param.id == '0') {
        init()
      } else {
        currentAlbum.value = param
        store.dispatch('common/Fetch', {
          api: "photoList",
          data: {
            id: param.id
          }
        }).then(res => {
          photoList.value = res.result
        })
      }
    }

    function add(action: any, item: any) {
      showAlbum.value = true
      currentData.value = {
        action,
        item
      }
    }

    function showImg(img: any) {
      const aaa: any = {
        image: [img]
      }
      currentData.value = aaa
      currentImg.value = img
      showFlag.value = !showFlag.value
    }

    onMounted(() => {
      aaaa()
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
      cateList,
      photoList,
      image,
      img,
      upload,
      handleUpload,
      handleSave,
      showImg,
      aaaa,
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
