<template>
  <div class="module-wrap mb15 operation_wrap">
    <div class="module-head p20">
      图片专辑
    </div>
    <div class="module-content p10 bg-eee">

      <div class="row clearfix"
           v-if="dataList.length">
        <div class="col-sm-6 col-md-3 p10"
             v-for="(item, index) in dataList"
             :key="index"
             @click="handleclick(item)">
          <div class="thumbnail p10 relative"
               style="background: #fff;; overflow: hidden;">
            <div class="cover hide"
                 style="position: absolute; top: 0; left: 0; bottom:0; width: 100%;z-index: 10;">
              <i class="iconfont icon-checkbox">
                <input name="checkbox"
                       type="checkbox"
                       value="2"
                       style="display: none;">
              </i>
            </div>
            <a class="infos trip_arrow works_cate_trip bg-white hide"
               data-coding="U40006"
               data-codings="C0002"
               data-win="true"
               data-id="2"
               data-fid=""
               data-n="updateGroup"
               data-name="dsdsad"
               data-parent=""
               data-description="dsadas"
               data-placement="top"
               data-toggle="tooltip9"
               style="position:absolute; top:15px; right:15px;"
               data-left="0">
              <i class="iconfont icon-down"></i>
            </a>

            <img :src="item.image[0]"
                 width="100%"
                 height="150">

            <div class="caption relative"
                 style="padding:10px 0;">
              <span class="inputline updata nowrap"
                    data-coding="U40006"
                    data-field="name"
                    data-id="2"
                    contenteditable="true"
                    style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.name}}</span>

              <span style=" color:#5bc0de; position: absolute; right: 0; top: 10px;">{{item.num}}张</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, useStore, useRouter, useRoute, watch, onMounted, ref, codings } from '@/utils'

export default defineComponent({
  name: 'HomeView',
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
    // let m = route.query.mod;
    const codding: any = codings["picture"]
    const loginuser = computed(() => store.getters['user/loginuser']);
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
      }


      store.dispatch('common/Fetch', {
          api: 'AlbumList',
          data: {
            ...param
          }
      }).then(res => {
        dataList.value = res.result
      })
    }
        
    function handleclick(param:any){
      router.push(proxy.const.setUrl({
        uid: loginuser.value.account,
        query: `/appstore/?mod=${route.query.mod}&item=list&cat=${param.id}`
      }))      
    }

    function handleclicks(param:any){
      let query =  ""
      if(param){
         query = param === 'details' ? `&item=${param}&action=add` : `&item=${param}`
      }

      router.push(`/appstore/?mod=${route.query.mod}${query}`)
    }
    
    onMounted(init)
    return {
      handleclick,
      dataList,
      handleclicks
    }
  }  
})
</script>
