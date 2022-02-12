<template>
  <div>
    <div class="theme"
         @click="onThem"></div>
    <div id="theme-box"
         class="theme-box"
         :style="{bottom: style}">
      <div class="tabs">
        <div class="nav-tabs theme-head">
          <span class=""
                style="background:#0f1012; "
                @click="handelclick('theme')">套装</span>
          <span class="active">模板</span>
          <span class="active"
                @click="handelclick('effects')">背景特效</span>
          <span class="active">自定义</span>
          <span id="close-theme"
                style=" width:60px;"><i class="iconfont icon-close"
               @click="onThem"></i></span>
        </div>

        <div class="tab-content theme-con">
          <div class="tabsbox"
               style="display: block;">
            <input id="themestyle"
                   type="hidden"
                   value="../module/member/user/156149/photos/171012092851.png">
            <ul class="theme-list">

              <li class="themestyle"
                  v-for="(item, index) in dataList"
                  :key="index"
                  @click="chooseTheme(item.id)"><i></i><img :src="item.image"
                     data-theme="1">{{item.name}}</li>
            </ul>
          </div>
          <div class="tabsbox">

          </div>
        </div>
      </div>
      <div class="btngroud">
        <span data-fn="chooseTheme"
              data-theme=""
              data-type="blog"
              data-tips="您确定更换风格"
              class="btn btn-xs tipsbtn determinetheme"
              @click="comfirm">确认</span>
        <span class="btn btn-xs active"
              @click="onThem">取消</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const showThme = ref(false)
    const style = ref("-300px")
    const currentThem = ref()
    const dataList = ref([])
    const current: any = ref("theme")

    function onThem(){
      showThme.value = !showThme.value
      style.value = showThme.value ?  "0px" : "-300px"

         
      getThem()
    }

    function getThem(){
 store.dispatch('common/Fetch', {
          api: 'Theme'
      }).then(res => {
        dataList.value = res.result
      })
    }

function getEffects(){
 store.dispatch('common/Fetch', {
          api: 'Effects'
      }).then(res => {
        dataList.value = res.result
      })
    }    

    function handelclick(param: any){
      current.value = param
      if(param === "theme"){
        getThem()
      }else{
        getEffects()
      }
    }
    function chooseTheme(id: any){
      currentThem.value = id
    }
    function comfirm(){
      const aaa: any = {}
          if(current.value === 'theme'){
            aaa.theme = currentThem.value
          }else{
             aaa.background_effects = currentThem.value
          }
      store.dispatch('common/Fetch', {
          api: 'ChooseTheme',
          data: {
            ...aaa
          }
      }).then(res => {
        showThme.value = false
        style.value = "-300px"
      })

    }
    return {
      onThem,
      chooseTheme,
      comfirm,
      handelclick,
      style,
      dataList
    }
  }
})
</script>
