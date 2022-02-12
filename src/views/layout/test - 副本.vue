<template>
  <!-- 主内容 -->
  <div>
    <el-popover placement="top-start"
                title="Title"
                :width="200"
                trigger="hover"
                content="this is content, this is content, this is content">
      <template #reference>
        <el-button>Hover to activate</el-button>
      </template>
    </el-popover>
    <!-- <div style="height:100px"></div>
    <div style="padding-left: 250px; width: 30px; height: 30px;">
      <v-avatar :move="-100"
                arrow="lr"
                :sourceData="{uid: 1101946957}" />
    </div>
    <div style="height:320px"></div> -->
    <!-- <v-radio v-model:value="value"
           :data="confirm" /> -->
    <!-- <CheckboxGroup v-model="checkList"> -->
    <!-- <v-titleattribute /> -->
    <!-- <v-upload ref="upload"
            uploadtype='tech' />
  <a data-uploadtype="tech"
     data-temp="nineimg"
     class="cl-ccc"
     @click="onClick">点击上传图片</a> -->
    <!-- <v-info arrow="top" /> -->
    <!-- <div>
      <v-avatar :move="-100"
                :sourceData="{uid: 466891}" />
    </div>

    <v-popover content="1231231"
               arrow="lr"
               offset="right"
               :move="-150">

      <div style="width: 350px; height: 250px">
        <span @click="aaaaa">头像</span>
        是的撒大苏打撒旦水水水水水水水水水水水水水水水水水水水
      </div>
    </v-popover> -->

    <!-- <v-info arrow="bottom" /> -->
    <!-- <v-info arrow="left" /> -->
    <!-- </CheckboxGroup> -->
    <!-- <v-checkbox v-model:checkValue="checkedNames"
              :data="hobby" /> -->
    <!--<div class="container w1000 relative clearfix"
       style="background: rgba(17, 17, 17, 0.2);">
    <v-upload />

    <div class="w150 left left-sidebar">

    </div>
    <div class="main-center left">
     
  </div>
  <div class="w230 right">

  </div>
  </div>-->
    <!-- <div style="height:1920px"></div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, computed } from 'vue'
// import { confirMenum, hobbyMenum } from '@/assets/const'
import RadioGroup from '@/components/radio/.vue'
import CheckboxGroup from '@/components/checkbox/index.vue'
// import Checkbox from '@/components/checkbox/checkbox.vue'

import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeView4',
    components: {
    // CheckboxGroup,
    // Checkbox
  },
  
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();
    const value = ref(1)
    const checkList = ref([])
    const upload: any = ref(null);
    // const confirm = ref(confirMenum)
    // const hobby= ref(hobbyMenum)
    const photos = computed(() => {
      return "<img src='http://127.0.0.1//user/110506372/photos/110506372.png' width='30' height='30' class='showuserinfo'>"
    })
    function init(param: any){
      debugger
      store.dispatch('common/Talk', {
        ...param
      })
    }
        function uploadImg(){
      upload.value.handleclick()
    }

        function onClick(param: any){

      const options={
        type:'12',
        message:'success',
      }
      console.log(66666)
      proxy.$hlj.message(options)
      // store.dispatch('common/Fetch', param)
    }
    function aaaaa(){
      alert("sdsdsdsd")
    }
    return {
      init,
      value,
      confirm,
      uploadImg,
      upload,
      onClick,
      aaaaa,
      photos
      // hobby,
      // checkedNames
    }
  }
})
</script>
