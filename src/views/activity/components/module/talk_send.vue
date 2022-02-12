<template>
  <div class="module-wrap">
    <div class="module-content send_info p0">
      <div class="sendtitle">休息片刻，有什么新鲜事赶紧和小伙伴们分享?</div>
      <div class="send-input">
        <textarea v-model="data.summary"
                  class="talkcontent-wrap"></textarea>
      </div>
      <v-upload ref="upload"
                @imgList="image" />
      <div class="operate">
        <div class="left">
          <span class="infos"
                @click="handleclick('expression')">
            <i class="iconfont icon-face"></i>表情
          </span>
          <span class="infos"
                @click="handleclick('upload')">
            <i class="iconfont icon-pic"></i>图片
          </span>
          <span class="infos"
                @click="handleclick('topic')">
            <i class="iconfont icon-topic"></i>话题
          </span>
        </div>
        <div class="right">
          <v-button @onClick="sendTalk">发布</v-button>
        </div>
      </div>
      <v-expression v-if="data.expressionStatus"
                    @onEmoji="choose" />
      <v-topic v-if="data.topicStatus"
               @onEmoji="choose" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, reactive } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewdd',
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();
    const upload: any = ref(null);
    const img= ref("")    
    const data: any = reactive({
      summary: "",
      expressionStatus: false,
      topicStatus: false,
      
    })

    function handleclick(param: any){
      if(param === 'expression'){
        data.expressionStatus = !data.expressionStatus
      }else if(param ==='upload'){
        upload.value.handleclick()
      }else{
        data.topicStatus = !data.topicStatus
      }
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

    // 话题发布
    function sendTalk(){
      proxy.$hlj.loading()
      store.dispatch('common/Fetch', {
        api: 'InsertTalk',
        data: {
          coding: "M0000",
          type: "art",
          img: img.value,
          summary: data.summary
        }
      }).then(res => {
        data.summary = ""
        proxy.$hlj.message({
          msg: "发布成功"
        })
        store.dispatch('common/Talk')
      })
    }

    // 选择表情或话题
    function choose(aa: any){
      data.summary = data.summary+aa
    }

    return {
      sendTalk,
      data,
      handleclick,
      upload,
      choose,
      image
    }
  }
})
</script>
