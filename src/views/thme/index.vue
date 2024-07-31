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
      }]" v-model:index="tabIndex" :isEmit="true" method="click" :className="{nav: 'theme-head', con: 'theme-con'}" type="vertical">
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
    <Display :usertheme="usertheme" :tabIndex="tabIndex" />
  </div>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  computed,
  useStore,
  onMounted,
} from '@/utils'
import Thme from './thme/index.vue'
import Effects from './effects/index.vue'
import Pendant from './pendant/index.vue'
import AvatarPendant from './avatarPendant/index.vue'
import MouseEffects from './mouseEffects/index.vue'
import Cursor from './cursor/index.vue'
import Display from './components/display.vue'
import VueEvent from '@/utils/event'

const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const information = "1、背景主题：整体博客风格样式。<br/>2、背景特效：带动画效果的网页特效，可多选。<br/>3、挂件装饰：用来装饰博客小物件风格，直接拖拽到页面，完成设置后点击保存。<br/>4、鼠标特效：自定义博客鼠标样式。<br/>注意：当设置主题时与页面效果不一致，是系统强制配置；当设置完成时，无展示效果，可能配置开关按钮没开启，需要用户前去开启。"
const showThme = ref(false)
const style = ref("-400px")
const theme: any = ref({})
const tabIndex: any = ref(0)
const currentData: any = ref({
  theme: [],
  effects: [],
  avatar_pendant: '',
  mouse_effects: '',
  mouse_cursor: ''
})
const usertheme: any = computed(() => {

  let aa = store.getters['user/loginuser'].theme
  aa.pendant = JSON.parse(aa.pendant)

  let cc = aa.pendant && aa.pendant.map((item: any) => {
    return {
      name: item.img.title,
      src: item.img.src
    }
  }) || []
  
  const reduce = cc.reduce((arr: any, item: any)=>{
    if(!arr.some((i: any)=>i.name === item.name)){
      arr.push(item)
    }
    return arr
  }, [])
  aa.pendant = reduce
  return aa
});

function handleClick(type: any, param: any) {
  let obj: any = {}
  if (type === 'theme' || type === 'effects') {
    if (currentData.value[type].indexOf(param.id) > -1) {
      let index = currentData.value[type].indexOf(param.id)
      currentData.value[type].splice(index, 1)
    } else {
      currentData.value[type].push(param.id)
    }
    if (type === 'effects') {
      obj['background_effects'] = currentData.value.effects && currentData.value.effects.join(',') || ""
    } else {
      obj['theme'] = currentData.value.theme && currentData.value.theme.join(',') || ""
    }
  } else {
    currentData.value[type] = param.id
    obj[type] = param.id
  }
  save(obj)
}

function init() {
  let cc: any = []

  usertheme.value.pendant && usertheme.value.pendant.map((item: any) => {
    let index = cc.findIndex((list: any) => list.src === item.src)
    if (index === -1) {
      cc.push(item.src)
    }
  })
  currentData.value.effects = usertheme.value.effects_id
  currentData.value.avatar_pendant = usertheme.value.avatar_pendant.id
  currentData.value.mouse_effects = usertheme.value.mouse_effects.id
  currentData.value.theme = usertheme.value.theme_id
  currentData.value.mouse_cursor = usertheme.value.cursor.id
  currentData.value.pendants = cc
}

function onThem() {
  showThme.value = !showThme.value
  style.value = showThme.value ? "0px" : "-400px"
  VueEvent.emit("saveTheme", showThme.value);
  init()
}

function save(param: any) {
  store.dispatch('common/Fetch', {
    api: 'ChooseTheme',
    data: {
      ...param
    }
  }).then(res => {
    store.dispatch('user/Detect')
  })
}

function savass() {
  VueEvent.on("saveTheme", (data: any) => {
    if (data) {
      return
    }
    let pendant: any = document.getElementsByClassName('pendant-box')
    let dom: any = []
    for (let i = 0; i < pendant.length; i++) {
      let box_style: any = ""
      let img_style: any = ""
      for (let j = 0; j < pendant[i].style.length; j++) {
        let left_value: any = "";
        if (pendant[i].style[j] == 'left') {
          left_value = window.innerWidth / 2 - parseInt(pendant[i].style[pendant[i].style[j]])
        }
        box_style += `${[pendant[i].style[j]]}: ${pendant[i].style[j] == 'left' ? left_value+'px' : pendant[i].style[pendant[i].style[j]]}; `
      }
      let style_arr = pendant[i].children[0].getAttribute('style').split(';')
      for (let j = 0; j < style_arr.length; j++) {
        if (style_arr[j]) {
          let attr = style_arr[j].split(":")
          img_style += `${attr[0]}: ${attr[1]}; `
        }
      }

      dom.push({
        class: 'pendant-box',
        style: box_style,
        img: {
          title: pendant[i].children[0].title,
          src: pendant[i].children[0].src,
          style: img_style
        }
      })
    }

    store.dispatch('common/Fetch', {
      api: 'savePendant',
      data: {
        content: JSON.stringify(dom)
      }
    }).then(res => {
      proxy.$hlj.message({
        type: 'info',
        msg: "保存成功"
      })
    })
  })
}

onMounted(() => {
  savass()
})
</script>
