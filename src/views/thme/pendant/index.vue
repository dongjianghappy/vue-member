<template>
<div class="theme-cate">
  <span v-for="(item, index) in themeList" :key="index" @click="handleClick(item, index)">{{item.name}}</span>
</div>
<div class="theme-wrap">
  <div class="theme-list left" v-for="(item, index) in currentCate" :key="index" @click="chooseTheme(item)">
    <div :id="`pendant_${index}`" class="p10" style="cursor: move;" draggable="true" @dragstart="(e, fType, style)=>dragstart(e, `pendant_${index}`, item.style)">
      <img :src="item.image" :title="item.name" style="height: 80px">
      </div>
    <div class="theme-name ptb10 font12">{{item.name}}</div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  onMounted,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'
export default defineComponent({
  name: 'v-Pendant',
  emits: ['onClick'],
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();

    const currentCate = ref([])
    const currentIndex: any = ref()
    const themeList: any = ref([])
    const index: any = ref(0)

    function init() {
      store.dispatch('common/Fetch', {
        api: 'Pendant'
      }).then(res => {
        themeList.value = res.result
        currentCate.value = res.result.length > 0 ? res.result[0].list : []
      })
    }

    function handleClick(param: any, index: any) {
      currentCate.value = param.list || []
    }

    function chooseTheme(param: any) {
      currentIndex.value = param.id
      context.emit('onClick', param)

    }

    function dragstart(e: any, fType: any, style: any) {
      e.dataTransfer.setData('ftype', fType)
      e.dataTransfer.setData('style', style)
    }

    onMounted(() => {
      init()
      let el: any = document.getElementById('main')
      el.addEventListener('dragover', (e: any) => {
        e.preventDefault()
      })
      el.addEventListener('drop', (e: any) => {
        let ftype: any = e.dataTransfer.getData('ftype')
        let style: any = e.dataTransfer.getData('style')
        let content: any = document.getElementById(ftype)
        var y = content.children[0].cloneNode(true);
        debugger

        y.style = style

        let arrs = []
        let arr = style.split(";")
        for (let j = 0; j < arr.length; j++) {
          let b = arr[j].split(":")
          b[0].trim() && arrs.push(b[0].trim())
        }

        var container = document.createElement('div') //创建ul节点
        container.style.position = "absolute"
        container.style.left = e.pageX + "px"
        container.style.top = e.pageY + "px"
        container.classList.add('pendant-box')
        container.appendChild(y);

        document.body.appendChild(container)

        y.setAttribute('data', arrs)
        proxy.$pendant.init()
      })

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
            box_style += `${[pendant[i].style[j]]}: ${pendant[i].style[pendant[i].style[j]]}; `
          }

          let style_arr = pendant[i].children[0].getAttribute('data').split(',')
          for (let j = 0; j < style_arr.length; j++) {
            img_style += `${[style_arr[j]]}: ${pendant[i].children[0].style[style_arr[j]]}; `
            if (j === style_arr.length - 1 && pendant[i].children[0].style.opacity !== "") {
              img_style += `${['opacity']}: ${pendant[i].children[0].style.opacity}; `
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
          // showThme.value = false
          // style.value = "-300px"
          proxy.$hlj.message({
            msg: "保存成功"
          })
        })
      });
    })

    return {
      currentCate,
      index,
      currentIndex,
      themeList,
      handleClick,
      chooseTheme,
      dragstart
    }
  }
})
</script>
