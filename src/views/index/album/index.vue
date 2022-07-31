<template>
<div>
  <div class="container w1100 relative clearfix" style="background: rgba(17, 17, 17, 0.2);">
    <div class="w180 left">
      <v-aside title="相册">
        <template v-slot:button>
          <Detail action='add' :data="data" :render="init" />
        </template>
        <template v-slot:aside>
          <ul>
            <li v-for="(item, index) in photoAlbum" :key="index" @click="handleclick(item.id)" class="aside">
              <i class="iconfont icon-dot font20"></i> {{item.name}}
              <span class="right" @click.stop="add('edit', item)" v-if="currentUser && item.id !== 'talk' && item.id !== 'photo'"><i class="iconfont icon-edit"></i></span>
            </li>
          </ul>
        </template>

      </v-aside>
    </div>
    <div class="right" style="width: 910px;">
      <div class="module-wrap">
        <div class="module-head p20">相册
          <span class="right pointer" @click="handleSave('add')" v-if="currentUser && current !== 'talk' && current !== 'photo'" :disable="img.length<2">保存</span>
          <span class="right pointer mr25" @click="handleUpload('add')" v-if="currentUser && current !== 'talk' && current !== 'photo'">上传</span>

        </div>
        <div class="module-content p10" style="min-height: 500px">
          <v-upload ref="upload" uploadtype='album' @imgList="image" />
          <div v-if="current === 'photo'">
            <div class="col-sm-6 col-md-2" v-for="(img, i) in history" :key="i">
              <div class="p5"><img :src="img" height="140" style="border-radius: 8px; width: 100%" @click="showImg(img)" /></div>
            </div>
          </div>
          <div v-else-if="current === 'talk'">
            <div v-for="(item, index) in albumList" :key="index" style="overflow: auto;">
              <div>{{item.month}}</div>
              <div>
                <div class="col-sm-6 col-md-2" v-for="(img, i) in item.list" :key="i">
                  <div class="p5"><img :src="img" height="140" style="border-radius: 8px; width: 100%" @click="showImg(img)" /></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="col-sm-6 col-md-2" v-for="(item, i) in photoList" :key="i">
              <div class="p5"><img :src="item.image" height="140" style="border-radius: 8px; width: 100%" @click="showImg(item.image)" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<v-layer v-model:isShow="showFlag" :data="currentData" :img="currentImg" v-if="showFlag" type="album" />
</template>

<script lang="ts">
import {
  
} from '@/utils'
import {
  defineComponent,
  getCurrentInstance,
  useStore,
   useRouter,
  useRoute,
  computed,
  onMounted,
  ref,
  getUid
} from '@/utils'
import Detail from './components/detail.vue'
import {album} from '@/assets/const'

export default defineComponent({
  name: 'AlbumView',
  components: {
    Detail
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const currentUser = computed(() => store.getters['user/currentUser']);
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

    function getHistory() {
      store.dispatch('common/Fetch', {
        api: "GetHistoryPhotos",
        data: {
          type: "album",
          uid: getUid()
        }
      }).then(res => {
        history.value = res.result

      })
    }

    function handleclick(param: any) {
      current.value = param
      if (param === 'photo') {
        getHistory()
      } else if (param === 'talk') {
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
      albumList,
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
    }
  }
})
</script>
