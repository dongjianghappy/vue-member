<template>
<div>
  <div class="container w1100 relative clearfix">
    <div class="w180 left">
      <v-aside title="相册">
        <template v-slot:button>
          <v-group action='add' :data="data" :group="photoAlbum" :coding="coding.album.list" :render="aaaa" />
          <!-- <Detail action='add' :data="{ coding: 'U10000' }" :render="aaaa" /> -->
        </template>
        <template v-slot:aside>
          <ul>
            <li v-for="(item, index) in photoAlbum" :key="index" @click="handleclick(item.id)" class="aside">
              <i class="iconfont icon-dot font20"></i> {{item.name}}
            </li>
          </ul>
        </template>

      </v-aside>
    </div>
    <div class="right" style="width: 910px;">
      <div class="module-wrap">
        <div class="module-head p20">相册
          <span class="right pointer" @click="handleSave('add')" v-if="currentUser && current !== 'talk' && current !== 'photo'" :disable="img.length<2">
            <i class="iconfont icon-mail" />
            保存
          </span>
          <span class="right pointer mr25" @click="handleUpload('add')" v-if="currentUser && current !== 'talk' && current !== 'photo'">
            <i class="iconfont icon-upload-file" />
            上传
          </span>
        </div>
        <div class="module-content p10" style="min-height: 500px">
          <v-upload ref="upload" uploadtype='album' @imgList="image" v-if="current !== 'talk' && current !== 'photo'" file="talk" />
          <div v-if="current === 'photo'">
            <v-tabs :tabs="[{name: '头像',value: 'photos'},{name: '头像背景',value: 'background'},{name: '主页背景',value: 'banner'}]" :isEmit="true" v-model:index="index">
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
          <div class="plr15" v-else-if="current === 'talk'">
            <div v-for="(item, index) in albumList" :key="index" style="overflow: auto;">
              <div>{{item.month}}</div>
              <div>
                <div class="col-sm-6 col-md-3 p10" v-for="(img, i) in item.list" :key="i">
                  <v-thumbnail :data="{image: [img]}" />
                </div>
              </div>
            </div>
          </div>
          <div class="plr15" v-else>
            <div class="col-sm-6 col-md-3 p10" v-for="(item, i) in photoList" :key="i">
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
import Detail from './components/detail.vue'
import List from './components/list.vue'
import {
  album
} from '@/assets/const'

export default defineComponent({
  name: 'AlbumView',
  components: {
    Detail,
    List
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const coding: any = codings.talk
    const store = useStore();
    const currentUser = computed(() => store.getters['user/currentUser']);
    const loginuser = computed(() => store.getters['user/loginuser']);
    const history: any = ref([])
    const current: any = ref("talk")
    const photoAlbum: any = ref([])
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

    const menu: any = album;
    menu.map((item: any) => {
      item.path = `/album?item=${item.value}`
    })

    function aaaa() {
      store.dispatch('common/Fetch', {
        api: "photoAlbum",
        data: {
          uid: getUid()
        }
      }).then(res => {
        photoAlbum.value = res.result
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
      // proxy.$loading.loading()
      store.dispatch('common/Fetch', {
        api: "UploadUserPhoto",
        data: {
          fid: currentAlbum.value,
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
      if (param === 'talk') {
        init()
      } else {
        currentAlbum.value = param
        store.dispatch('common/Fetch', {
          api: "photoList",
          data: {
            id: param
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
      debugger
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
      currentUser,
      handleclick,
      current,
      add,
      showFlag,
      currentImg,
      showAlbum,
      currentData,
      photoAlbum,
      photoList,
      image,
      img,
      upload,
      handleUpload,
      handleSave,
      showImg,
      menu,
      aaaa,
      index,
      loginuser,
    }
  }
})
</script>

<style scoped>
.background {
  background: rgba(0, 0, 0, 0.7)
}
</style>
