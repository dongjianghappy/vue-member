<template>
  <div class="module-wrap"
       style="margin:0">
    <div class="module-head p20">
      留言板
      <!--留言板需要你的足迹哦http://125772116.qzone.qq.com-->
    </div>
    <div class="module-content"
         style="margin:0; padding:25px 50px;">
      <div class="font14"
           style="width:100%;">
        <div class="goto-write"
             v-if="!isShow">
          留言板需要你的足迹哦，<span id="goto-write"
                class="pointer"
                style="color: #666;"
                @click="write">开始留言</span>
        </div>
        <div class="send_info sendform"
             style=" background:#f9f9f9; margin:0; padding:15px;"
             v-else>
          <div class="send-input bb0">
            <textarea id="talkcontent"
                      field="content"
                      class="talkcontent-wrap"></textarea>
            <input type="hidden"
                   field="uid"
                   value="110506372">
          </div>
          <div class="operate"
               style="padding: 15px 0">
            <div class="left">
              <a id="face"
                 class="infos"
                 data-insertbox=".talkcontent-wrap"
                 data-placement="top"
                 data-toggle="toolface"
                 data-left="300">
                <i class="iconfont icon-face"></i>表情
              </a>
            </div>
            <div class="right">
              <button id="feedbackbtn"
                      class="btn btn-sm"
                      data-coding="U30002">发表</button>
              <button id="cancel-write"
                      class="btn btn-sm"
                      data-coding="U30002">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
   
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const upload: any = ref(null);
    let summary = ref("");
    let dataList:any = ref([])
    let expressionStatus = ref(false)
    let topicStatus = ref(false)
    const isShow = ref(false)

    function init(param: any){
      store.dispatch('common/Talk', {
        ...param
      })
    }
    
    function handleclick(q: any){
      if(q === 'expression'){
        expressionStatus.value = !expressionStatus.value
      }else if(q ==='upload'){
        upload.value.handleclick()
      }else{
        topicStatus.value = !topicStatus.value
      }
      
    }

    function write(){
      isShow.value = true
    }

    function sendTalk(){
      debugger
          store.dispatch('common/Fetch', {
    
          api: 'InsertTalk',
          data: {
          coding: "M0000",
          type: "art",
          summary: summary.value
        }
      }).then(res => {
        summary.value = ""
        init({})
      })
    }

    function aaaaa(aa: any){
      summary.value = summary.value+aa
    }
    return {
      sendTalk,
      dataList,
      summary,
      handleclick,
      upload,
      expressionStatus,
      topicStatus,
      aaaaa,
      write,
      isShow
    }
  }
})
</script>
