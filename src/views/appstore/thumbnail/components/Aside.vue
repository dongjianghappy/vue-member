<template>
  <div class="module-wrap shadow mb15">
    <div class="module-head head p20">内容资讯</div>
    <div class="module-content bb h500">
      <ul class="p10">
        <li class="list"
            style="padding: 8px 0;"
            v-for="(item, index) in menu"
            :key="index"
            @click="handleclick(item.path)">
          <i class="iconfont icon-dot"
             style="color: #ccc;"></i> {{item.name}}
        </li>
        <li class="list"
            style="padding: 8px 0px;">
          <span @click="addAlum">

            <i class="iconfont icon-anonymous-iconfont pl5"
               style="color: #ccc;"></i> 新增专辑
          </span>

        </li>
      </ul>
    </div>
    <AlbumDialog @choose="choose"
                 v-model:showAlbum="showAlbum"
                 v-if="showAlbum"
                 :cateData="data" />
    <CategoryDialog name="选择分类"
                    v-model:showFlag="showCate"
                    v-if="showCate"
                    :config="configData"
                    @getValue="getCate" />
    <!-- <CategoryDialog name="选择分类"
                    :sourceData="{}"
                    @getValue="getCate"
                    v-model:showFlag="showCate"
                    v-if="showCate" /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute, ref, watch , codings} from '@/utils'
import AlbumDialog from '../../components/AlbumDialog.vue'
import CategoryDialog from '../../components/CategoryDialog.vue'

export default defineComponent({
  name: 'AsideView',
   components: {
   AlbumDialog,
   CategoryDialog
  },
  data() {
  return {
    menu:[
      {name: "图片专辑", path: "category"},
      {name: "图片管理", path: ""},
      {name: "上传图片", path: "details"},
      // {name: "上传点赞", path: "returned"},
      // {name: "图片收藏", path: "details"}
    ]
  }
},
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const groups = computed(() => store.getters['common/groups']);
    const loginuser = computed(() => store.getters['common/loginuser']);
    const showCate = ref(false)
    const showAlbum = ref(false)
    const coding: any = codings["picture"]
    const configData: any = ref({coding: 'U40001', api: 'userCategory', type:"album", name: "", value: "", title: "移动专辑"})
  
    const data = ref({fid: "", cateName: "", name: "",
      description: "",})
        
watch([showCate], (newValues, prevValues) => {
  if(newValues[0] === false){
showAlbum.value = true
  }
  
  })

    function handleclick(param:any){
      let query =  ""
      if(param){
         query = param === 'details' ? `&item=${param}&action=add` : `&item=${param}`
      }

      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: `/appstore/?mod=${route.query.mod}${query}`
      }))
    }
    function addAlum(){
      showAlbum.value = true
    }
    function choose(param: any){
      configData.value = {coding: coding.cate, api: 'systemCate', type: "cate", name: "", value: "", title: "选择分类"}
      data.value = param
     showCate.value = true
     showAlbum.value = false
    }
    function getCate(param: any){
      debugger
      data.value.fid = param.value
      data.value.cateName = param.name
    }
    return {
      handleclick,
      groups,
      data,
      addAlum,
      showAlbum,
      choose,
      showCate,
      getCate,
      configData
    }
  }
})
</script>
