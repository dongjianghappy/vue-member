<template>
<div class="theme" @click="onThem"></div>
<div id="theme-box" class="theme-box" :style="{bottom: style}">
  <div class="p15 align_left cl-white" style="background: rgba(51, 51, 51, 0.9);">
    <i class="iconfont icon-theme cl-white" />主题设置
    <v-tooltip :content="information" arrow="top" offset="right" :move="-10" keys="popover-full-screen" type="hover">
      <i class="iconfont icon-info" style="font-size: 20px !important;" />
    </v-tooltip>
    <span class="right">
      <v-space>
        <div class="btn btn-xs active cl-white" @click="onThem">关闭</div>
        <!-- <div class="btn btn-xs tipsbtn determinetheme cl-white" @click="comfirm">确认</div> -->
      </v-space>
    </span>
  </div>
  <div class="flex" style="background: #0f1012">
    <div style="flex: 1">
      <v-tabs :tabs="[{
        name: '背景主题'
      },{
        name: '背景特效'
      },{
        name: '挂件装饰'
      },{
        name: '头像挂件'
      },{
        name: '鼠标特效'
      },{
        name: '鼠标样式'
      }]" v-model:index="index" method="click" :className="{nav: 'theme-head', con: 'theme-con'}" type="vertical">
        <template v-slot:content1>
          <Thme :currentData="currentData" :chooseTheme="handleClick" type="theme" />
        </template>
        <template v-slot:content2>
          <Effects :currentData="currentData" :chooseTheme="handleClick" type="effects" />
        </template>
        <template v-slot:content3>
          <Pendant :currentData="currentData" :chooseTheme="handleClick" type="pendant" />
        </template>
        <template v-slot:content4>
          <AvatarPendant :currentData="currentData" :chooseTheme="handleClick" />
        </template>
        <template v-slot:content5>
          <MouseEffects :currentData="currentData" :chooseTheme="handleClick" />
        </template>
        <template v-slot:content6>
          <Cursor :currentData="currentData" :chooseTheme="handleClick" />
        </template>
      </v-tabs>
    </div>
    <div class="p10" style="background: #212127; margin-left: 2px; width: 400px">
      <div class="pb10 cl-999">我的主题装扮</div>
      <div style=" height: 330px">
        <v-tabs :tabs="[{
        name: '主题'
      },{
        name: '特效'
      },{
        name: '挂件'
      },{
        name: '相框'
      },{
        name: '鼠标'
      },{
        name: '样式'
      }]" v-model:index="index" method="click">
          <template v-slot:content1>
            <div style=" height: 190px;">
              <div :style="`background: ${theme.theme_background}; height: 140px;`"></div>
              <div>{{theme.theme_name}}</div>
            </div>
          </template>
          <template v-slot:content2>
            <div class="col-md-4 p10" v-for="(item, index) in theme.effects" :key="index">
              <div class="align_center">
                <div style="height: 80px;">
                  <img :src="item.image" style="height: 80px;">
                </div>
                {{item.name}}
              </div>
            </div>
          </template>
          <template v-slot:content3>
            {{pendants}}
            <div class="col-md-4 p10" v-for="(item, index) in theme.pendants" :key="index">
              <div class="align_center">
                <!-- <img :src="item" style="height: 80px;"> -->
                <div style="height: 80px;">
                  <img :src="item.src" style="height: 80px;">
                </div>
                {{item.name}}
              </div>
            </div>
          </template>
          <template v-slot:content4>
            <img :src="theme.avatar_pendant.image" style="width: 64px; height: 64px;">
          </template>
          <template v-slot:content5>
            <img :src="theme.mouse_effects.image" style="width: 64px; height: 64px;">
          </template>
          <template v-slot:content6>
            <img :src="theme.cursor.file">
          </template>
        </v-tabs>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  writeNewStyle
} from '@/utils'
import Thme from './thme/index.vue'
import Effects from './effects/index.vue'
import Pendant from './pendant/index.vue'
import AvatarPendant from './avatarPendant/index.vue'
import MouseEffects from './mouseEffects/index.vue'
import Cursor from './cursor/index.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    Thme,
    Effects,
    Pendant,
    AvatarPendant,
    MouseEffects,
    Cursor
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const information = "1、背景主题：整体博客风格样式。<br/>2、背景特效：带动画效果的网页特效，可多选。<br/>3、挂件装饰：用来装饰博客小物件风格，直接拖拽到页面，完成设置后点击保存。<br/>4、鼠标特效：自定义博客鼠标样式。<br/>注意：当设置主题时与页面效果不一致，是系统强制配置；当设置完成时，无展示效果，可能配置开关按钮没开启，需要用户前去开启。"
    const showThme = ref(false)
    const style = ref("-400px")
    const currentThem: any = ref({})
    const currentCursor: any = ref()
    const currentData: any = ref({
      theme: '',
      effects: [],
      avatar_pendant: '',
      mouse_effects: '',
      cursor: ''
    })
    const theme: any = computed(() => {
      let aa = store.getters['user/loginuser'].theme
      debugger
      let bb: any = []
      let cc: any = []
      aa.effects.map((item: any) => {
        bb.push(item.id)
      })
      
      let pendant = JSON.parse(aa.pendant)
      pendant && pendant.map((item: any) => {
        let index = cc.findIndex((list: any) => list.src === item.img.src)
        if (index === -1) {
          cc.push({
            name: item.img.title,
            src: item.img.src
          })
        }
      })
      aa.pendants = cc
      currentData.value.effects = bb
      currentData.value.avatar_pendant = aa.avatar_pendant.id
      currentData.value.mouse_effects = aa.mouse_effects.id
      currentData.value.theme = aa.theme_id
      currentData.value.cursor = aa.cursor.id
      return aa
    });

    function handleClick(type: any, param: any) {
      let obj: any = {}
      if (type === 'effects') {
        if (currentData.value[type].indexOf(param.id) > -1) {
          let index = currentData.value[type].indexOf(param.id)
          currentData.value[type].splice(index, 1)
        } else {
          currentData.value[type].push(param.id)
        }
        obj['background_effects'] = currentData.value.effects && currentData.value.effects.join(',') || "" 
      } else {
        currentData.value[type] = param.id
        obj[type] = param.id
      }

      
      
      save(obj)
    }

    function onThem() {
      showThme.value = !showThme.value
      style.value = showThme.value ? "0px" : "-400px"
      // writeNewStyle()
    }

    function comfirm() {

      const aaa: any = {
        theme: currentData.value.theme,
        background_effects: currentData.value.effects && currentData.value.effects.join(',') || "",
        cursor_effects: currentData.value.cursor
      }

      store.dispatch('common/Fetch', {
        api: 'ChooseTheme',
        data: {
          ...aaa
        }
      }).then(res => {
        showThme.value = false
        style.value = "-400px"
        proxy.$hlj.message({
          msg: "设置成功"
        })
        store.dispatch('user/Detect')
      })
    }

    function save(param: any) {
      store.dispatch('common/Fetch', {
        api: 'ChooseTheme',
        data: {
          ...param
        }
      }).then(res => {
        // showThme.value = false
        // style.value = "-400px"
        // proxy.$hlj.message({
        //   msg: "设置成功"
        // })
        store.dispatch('user/Detect')
      })
    }

    return {
      information,
      handleClick,
      onThem,
      comfirm,
      theme,
      currentThem,
      currentData,
      currentCursor,
      style,
    }
  }
})
</script>

<style lang="less">
.pendant-box {
  z-index: 101;

  &.mouse-enter {
    border: 1px dashed #ccc;
    padding: 10px;
    position: relative;

    .remove {
      background: #f00;
      position: absolute;
      top: -6px;
      right: -6px;
      border-radius: 50px;
      width: 12px;
      height: 12px;
      line-height: 12px;
      text-align: center;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
