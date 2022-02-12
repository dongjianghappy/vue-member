<template>
  <div class="module-wrap mb15 operation_wrap">
    <div class="module-head p20">
      <span v-for="(item, index) in menu"
            :key="index"
            @click="handleclicks(item.path)"
            class="inline mr10">{{item.name}}</span>
      <a class="inline mr10 batch-button"
         @click="onBatch">批量管理</a>
      <!--<a href="/110506372/home?mod=picture&item=list&action=add"  class="inline right">上传作品</a></span>
        <a data-coding="U40001" data-uploadtype="picture" data-temp="moreimg" data-title="批量上传图片" class="inline right mr10 batchupload">批量上传</a></span>-->
    </div>
    <div class="module-content p10 bg-eee">
      <div class="batch-btngroup bg-white mlr10 p10"
           v-if="isShowBatch">
        <span class="mr15"
              @click="operation('all')">全选</span>
        <span class="mr15"
              @click="operation('moveCate')">移动</span>
        <span class="mr15"
              @click="operation('moveAlbum')">移动文档</span>
        <span class="mr15"
              @click="operation('delete')">删除</span>
      </div>
      <div class="row clearfix"
           v-if="dataList.length">

        <div class="col-sm-6 col-md-3 p10"
             v-for="(item, index) in dataList"
             :key="index"
             @click="handleclick(item)">
          <div class="
             thumbnail
             p10
             relative"
               style="background: #fff;; overflow: hidden;">
            <div class="cover"
                 :class="{active: selectList.indexOf(item.id) !== -1}"
                 @click.stop="select(item.id)"
                 style="position: absolute; top: 0; left: 0; bottom:0; width: 100%;z-index: 10;"
                 v-show="isShowBatch">
              <i class="iconfont icon-checkbox">
                <input name="checkbox"
                       type="checkbox"
                       value="6"
                       style="display: none;">
              </i>
            </div>

            <a data-artcoding="C0000"
               data-catcoding="C0002"
               data-albumcoding="U40001"
               data-uid="110506372"
               data-id="6"
               data-pid="0"
               data-checked="0"
               data-placement="top"
               data-toggle="tooltip9"
               style="position:absolute; top:15px; right:15px;"
               data-left="0"
               class="infos trip_arrow content_trip bg-white hide">
              <i class="iconfont icon-down"></i>
            </a>
            <img :src="item.image[0]"
                 style="width:  100%;
                 height:150px">
            <div class="
                 caption
                 relative"
                 style="padding:10px 0; height:40px;">
              <span class="inputline updata nowrap"
                    data-coding="C0000"
                    data-field="title"
                    data-id="6"
                    contenteditable="true"
                    style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.title}}</span>

              <!--<span style=" color:#5bc0de; float:right;">1张</span>-->
            </div>
            <div class="relative"
                 style="border-top: 1px dotted #eaeaea; padding:10px 0; height:40px;">
              分类：{{item.parent}}
              <i class="iconfont icon-shenhe font18 absolute"
                 style="top: 5px; right: 0; color: #5bc0de;"></i>

            </div>
          </div>
        </div>
      </div>
      <v-nodata v-else
                trip="暂时没有数据" />
    </div>
    <CategoryDialog name="选择分类"
                    v-model:showFlag="isShow"
                    v-if="isShow"
                    :config="configData" />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute, watch, onMounted, ref, codings } from '@/utils'
import CategoryDialog from '../components/CategoryDialog.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
   CategoryDialog
  },  
    props: {
    item: {
      type: String,
      default: ""
    }
  },
  data() {
  return {
    menu:[
      {name: "全部", path: ""},
      {name: "已审核", path: "audited"},
      {name: "未审核", path: "unAudited"},
      {name: "被退回", path: "returned"}
    ]
  }
},  
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const dataList = ref([])
    let m: any = route.query.mod;
    const coding: any = codings[m]
    const isShowBatch = ref(false)
    const selectList:any = ref([])
    const checkAll = ref(false)
    const isShow = ref(false)
    const configData: any = ref({})
    const loginuser = computed(() => store.getters['common/loginuser']);
    

    watch(() => route.query.item,() => {
    init()
    })

    function init(){

      let param: any={}
      if(route.query.item === 'audited'){
        param.check="1"
      }else if(route.query.item === 'unAudited'){
        param.check="0"
      }else if(route.query.item === 'returned'){
        param.check="-1"
      }else if(route.query.cat){
        param.cat=route.query.cat
      }


      store.dispatch('common/Fetch', {
          api: 'ArticleList',
          data: {
            coding: coding['art'],
            ...param
          }
      }).then(res => {
        dataList.value = res.result || []
      })
    }
        
    function handleclick(param:any){
      isShowBatch.value = false
        router.push(proxy.const.setUrl({
          uid: loginuser.value.account,
          query: `/appstore/?mod=${route.query.mod}&item=details&action=edit&id=${param.id}`
        }))
    }

    function handleclicks(param:any){
      let query =  ""
      if(param){
         query = param === 'details' ? `&item=${param}&action=add` : `&item=${param}`
      }

      router.push(`/appstore/?mod=${route.query.mod}${query}`)
    }
    function onBatch(){
      isShowBatch.value = !isShowBatch.value
       selectList.value = []
    }
    function operation(param: any){
      if(param === 'all'){
        debugger
        if(selectList.value.length < dataList.value.length){
          dataList.value.map((item:any) => {
            selectList.value.push(item.id)
          })
          
        }else{
          selectList.value = []
        }
        
      }
      else if(param === 'moveAlbum' || param === 'moveCate'){
          if(param === 'moveAlbum'){
            configData.value = {coding: 'U40001', api: 'userCategory', type:"album", name: "", value: "", title: "移动专辑"}
          }else if(param === 'moveCate'){
            configData.value = {coding: coding.cate, api: 'systemCate', type: "cate", name: "", value: "", title: "移动分类"}
          }
          isShow.value = true
      }
      else if(param === 'delete'){
     store.dispatch('common/Fetch', {
          api: 'Delete',
          data: {
            coding: coding['art'],
            list: JSON.stringify({
              id: selectList.value
            })
          }
      }).then(res => {
         proxy.$hlj.message("删除成功")
        init()
      })        
      
      }
      
      
    }
    function select(id: any){
      
      if(selectList.value.indexOf(id) === -1){
       
        selectList.value.push(id)
      }else{
        let index = selectList.value.findIndex((item:any) => item == id);
        selectList.value.splice(index, 1)
      }
    }
    
    onMounted(init)
    return {
      isShow,
      handleclick,
      dataList,
      handleclicks,
      onBatch,
      isShowBatch,
      operation,
      select,
      selectList,
      configData
    }
  }  
})
</script>

<style scoped>
.active{
  background: rgba(0, 0, 0, 0.5);
}
</style>