<template>
  <div>
    <div class="container w1100 relative clearfix"
         style="background: rgba(17, 17, 17, 0.2);">
      <div class="w180 left">
        <v-aside :data="menu"
                 title="相册"
                 @route="onclicks" />
      </div>
      <div class="right"
           style="width: 910px;">
        <div class="module-wrap">
          <div class="module-head">相册(2)
            <span class="right"
                  @click="add('add')"><i class="iconfont icon-anonymous-iconfont font24" /></span>
          </div>
          <div class="module-content p10">
            <div class="col-sm-6 col-md-3 p10"
                 style="height: 120px"
                 @click="handelclick(item.id)"
                 v-for="(item, index) in photoAlbum"
                 :key="index"><img :src="item.image"
                   style="width: 100%; height: 80px; border: 1px solid #ddd;" />
              <div>{{item.name}}<span class="right"
                      @click.stop="add('edit', item)"
                      v-if="item.id !== 'talk' && item.id !== 'photo'"><i class="iconfont icon-edit"></i></span></div>
            </div>
          </div>
        </div>
        <div class="module-wrap">
          <div class="module-head">相册
            <span class="right pointer"
                  @click="handleSave('add')"
                  v-if="current !== 'talk' && current !== 'photos'"
                  :disable="img.length<2">保存</span>
            <span class="right pointer mr25"
                  @click="handleUpload('add')"
                  v-if="current !== 'talk' && current !== 'photos'">上传</span>

          </div>
          <div class="module-content p10">
            <v-upload ref="upload"
                      uploadtype='album'
                      @imgList="image" />
            <div v-if="current === 'photos'">
              <div class="col-sm-6 col-md-2 p10"
                   v-for="(img, i) in history"
                   :key="i"><img :src="img"
                     width="140"
                     height="150"
                     style="border-radius: 8px;" />
              </div>
            </div>
            <div v-else-if="current === 'talk'">
              <div v-for="(item, index) in albumList"
                   :key="index"
                   style="overflow: auto;">
                <div>{{item.month}}</div>
                <div>
                  <div class="col-sm-6 col-md-2 p10"
                       v-for="(img, i) in item.list"
                       :key="i"><img :src="img"
                         width="140"
                         height="150"
                         style="border-radius: 8px;"
                         @click="showImg(item, img)" />
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="col-sm-6 col-md-2 p10"
                   v-for="(item, i) in photoList"
                   :key="i"><img :src="item.image"
                     width="140"
                     height="150"
                     style="border-radius: 8px;" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <AddGroup :showAlbum="true"
            :render="Grouping"
            v-model:showFlag="showAlbum"
            v-if="showAlbum"
            :data="currentData" />

  <v-layer v-model:isShow="showFlag"
           :data="currentData"
           :img="currentImg"
           v-if="showFlag" />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, onMounted, ref } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'
import AddGroup from './components/addGroup.vue'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {
   AddGroup
  },
  setup(props,context) {
  const {ctx, proxy}:any = getCurrentInstance();
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
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
    const img= ref("")     

    function aaaa(){
      store.dispatch('common/Fetch', {
          api:"photoAlbum",
          data: {
            uid: "U10001"
          }
      }).then(res => {
        photoAlbum.value = res.result
        init()
      })
    }

    // 监听图片上传
    function image(a:any){
      let abc = "|"
      for(let i = 0; i < a.length; i++){
        let v = a[i].src.split("/");
        debugger
            v = v[v.length-1].split(".")[0]+"|"
        abc += v
      }
      img.value = abc
    }  

    function handleUpload(param: any){
      upload.value.handleclick()
    }    

    function handleSave(param: any){
      // proxy.$loading.loading()
      store.dispatch('common/Fetch', {
          api: "UploadUserPhoto",
          data: {
            fid: currentAlbum.value,
            img: img.value,
          }
      }).then(res => {
        proxy.$hlj.message(res.returnMessage)
        console.log("ss");
      })
    }   

    function init(){
      store.dispatch('common/AlbumList')
    }

    function getHistory(){
      store.dispatch('common/Fetch', {
          api:"GetHistoryPhotos",
          data: {
            type: "history"
          }
      }).then(res => {
        history.value = res.result
        
      })
    }

    function handelclick(param: any){
      current.value = param
      if(param === 'photo'){
        getHistory()
      }
      else if(param === 'talk'){
        init()
      }      
      else{
        currentAlbum.value = param
        store.dispatch('common/Fetch', {
            api:"photoList",
            data: {
              id: param
            }
        }).then(res => {
          photoList.value = res.result
        })
      }
      
    }
    
    function add(action: any, item: any){
      showAlbum.value = true
      currentData.value = {
        action,
        item
      }
    }

        function showImg(data: any, img: any){
      debugger
      currentData.value = data
      currentImg.value = img
      showFlag.value = !showFlag.value
    }

    onMounted(() => {
      
      aaaa()
    })

  return {
    albumList,
    history,
    handelclick,
    current,
    add,
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
  }
}
})
</script>
