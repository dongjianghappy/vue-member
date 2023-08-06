<template>
<div>
  <div class="theme" @click="onThem"></div>
  <div id="theme-box" class="theme-box" :style="{bottom: style}">
    <v-tabs :tabs="[{
        name: '背景主题'
      },{
        name: '背景特效'
      },{
        name: '挂件装饰'
      },{
        name: '鼠标特效'
      }]" v-model:index="index" method="click" :className="{nav: 'theme-head', con: 'theme-con'}">
      <template v-slot:extra>
        <v-space>
          <div class="cl-white" style="line-height: 50px;">
            <div class="btn btn-xs active" @click="onThem">取消</div>
            <div class="btn btn-xs tipsbtn determinetheme" @click="comfirm">确认</div>
          </div>
        </v-space>
      </template>
      <template v-slot:content1>
        <ul class="align_left">
          <li class="themestyle" :class="{current: item.id === currentThem || (!currentThem && item.id === theme.theme_id)}" v-for="(item, index) in themeList" :key="index" @click="chooseTheme(item.id)">
            <img :src="item.image" v-if="item.image">
            <div class="theme-color" :style="{background: item.color}" v-else></div>
            <div class="font12 cl-white align_center">{{item.name}}</div>
          </li>
        </ul>
      </template>
      <template v-slot:content2>
        <ul class="align_left">
          <li class="themestyle" :class="{current: item.id === currentEffects || (!currentEffects && item.id === theme.effects.id)}" v-for="(item, index) in effectsList" :key="index" @click="chooseEffects(item.id)">
            <img :src="item.image">
            <div class="font12 cl-white align_center">{{item.name}}</div>
          </li>
        </ul>
      </template>
      <template v-slot:content3>
        <ul class="align_left">
          <li :id="`pendant_${index}`" class="themestyle" draggable="true" @dragstart="(e, fType, style)=>dragstart(e, `pendant_${index}`, item.style)" :class="{current: item.id === currentEffects || (!currentEffects && item.id === theme.effects.id)}" v-for="(item, index) in pendantList" :key="index" @click="choosePendant(item.id)">
            <img :src="item.image">
            <div class="font12 cl-white align_center">{{item.name}}</div>
          </li>
        </ul>
      </template>
      <template v-slot:content4>
        <ul class="align_left">
          <li :id="`pendant_${index}`" class="themestyle" :class="{current: item.id === currentCursor || (!currentCursor && item.file === theme.cursor)}" v-for="(item, index) in cursorList" :key="index" @click="chooseCursor(item.id)">
            <div class="bg-ccc" style="width: 120px; height: 70px; text-align: center; line-height: 64px;"><img :src="item.file" style="width: auto; height: auto"></div>
            <div class="font12 cl-white align_center">{{item.name}}</div>
          </li>
        </ul>
      </template>
      <template v-slot:content5>
      </template>
    </v-tabs>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed,
  onMounted
} from 'vue'
import {
  useStore
} from 'vuex'
import VueEvent from '@/utils/event'
// import Setting from './components/setting.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    // Setting
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();

    const showThme = ref(false)
    const style = ref("-300px")
    const currentThem = ref()
    const currentEffects: any = ref()
    const currentCursor: any = ref()
    const themeList: any = ref([])
    const effectsList = ref([])
    const pendantList = ref([])
    const cursorList = ref([])
    const index: any = ref("0")
    const theme: any = computed(() => store.getters['user/loginuser'].theme);
    const contentssss: any = ref([])

    function onThem() {
      showThme.value = !showThme.value
      style.value = showThme.value ? "0px" : "-300px"
      getThem()
      getEffects()
      getPendant()
      getCursor()
    }

    function getThem() {
      store.dispatch('common/Fetch', {
        api: 'Theme'
      }).then(res => {
        themeList.value = res.result
      })
    }

    function getEffects() {
      store.dispatch('common/Fetch', {
        api: 'Effects'
      }).then(res => {
        effectsList.value = res.result
      })
    }

    function getPendant() {
      store.dispatch('common/Fetch', {
        api: 'Pendant'
      }).then(res => {
        pendantList.value = res.result
      })
    }

    function getCursor() {
      store.dispatch('common/Fetch', {
        api: 'Cursor'
      }).then(res => {
        cursorList.value = res.result
      })
    }

    function chooseTheme(id: any) {
      currentThem.value = id
    }

    function chooseEffects(id: any) {
      currentEffects.value = id
    }

    function choosePendant(id: any) {
      currentEffects.value = id
    }

    function chooseCursor(id: any) {
      currentCursor.value = id
    }

    function dragstart(e: any, fType: any, style: any) {
      e.dataTransfer.setData('ftype', fType)
      e.dataTransfer.setData('style', style)
    }

    function comfirm() {
      const aaa: any = {
        theme: currentThem.value,
        background_effects: currentEffects.value,
        cursor_effects: currentCursor.value
      }

      store.dispatch('common/Fetch', {
        api: 'ChooseTheme',
        data: {
          ...aaa
        }
      }).then(res => {
        showThme.value = false
        style.value = "-300px"
        proxy.$hlj.message({
          msg: "设置成功"
        })
        store.dispatch('user/Detect')
      })

    }

    function handleSave() {

    }
    // <div draggable="true" class="pendant-box" style="position: absolute; left: 447px; top: 275px;"><img src="http://127.0.0.1/uploadfile/theme/thumb/f79e110aa5b665ce98ecdb47a97e141f.jpg" style="width: 100px; height: auto;"><span class="remove">x</span></div>
    onMounted(() => {

      let el: any = document.getElementById('main')
      el.addEventListener('dragover', (e: any) => {
        e.preventDefault()
      })
      el.addEventListener('drop', (e: any) => {
        let ftype: any = e.dataTransfer.getData('ftype')
        let style: any = e.dataTransfer.getData('style')
        let content: any = document.getElementById(ftype)
        var y = content.children[0].cloneNode(true);

        y.style = style

        var container = document.createElement('div') //创建ul节点
        container.style.position = "absolute"
        container.style.left = e.pageX + "px"
        container.style.top = e.pageY + "px"
        // container.draggable = true
        container.classList.add('pendant-box')
        container.appendChild(y);

        document.body.appendChild(container)

        proxy.$pendant.init()
      })

      VueEvent.on("saveTheme", (data: any) => {
        let pendant: any = document.getElementsByClassName('pendant-box')
        let dom: any = []
        for (let i = 0; i < pendant.length; i++) {
          let box_style: any = ""
          for (let j = 0; j < pendant[i].style.length; j++) {
            box_style += `${[pendant[i].style[j]]}: ${pendant[i].style[pendant[i].style[j]]}; `
          }
          dom.push({
            class: 'pendant-box',
            style: box_style,
            img: {
              src: pendant[i].children[0].src,
              style: 'width: 100px; height: auto;'
            }
          })
        }

        store.dispatch('common/Fetch', {
          api: 'savePendant',
          data: {
            content: JSON.stringify(dom)
          }
        }).then(res => {
          showThme.value = false
          style.value = "-300px"
          proxy.$hlj.message({
            msg: "保存成功"
          })
        })
      });
    })

    return {
      onThem,
      comfirm,
      theme,
      currentThem,
      currentEffects,
      currentCursor,
      style,
      themeList,
      effectsList,
      pendantList,
      cursorList,
      index,
      chooseTheme,
      chooseEffects,
      choosePendant,
      chooseCursor,
      dragstart
    }
  }
})
</script>

<style lang="less">
.pendant-box {
  z-index: 100;

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

.theme-color {
  width: 120px;
  height: 70px;
}
</style>
