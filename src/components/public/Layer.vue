<template>
<div style="position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0; background: rgba(0,2,6,.85); display: flex;min-height: 100vh; z-index: 100000;" @click="handleclick">
  {{showFlag}}
  <div style="flex: 1; display: flex; flex-flow: column;">
    <div class="relative" style="flex: 1; text-align: center;">
      <img :src="currentImg" style=" width: 450px; height: 100%" @click.stop />
      <v-operate1 @click.stop :data="currentIndex" @onClick="toggle" @close="handleclick" />
    </div>
    <div style="background: #000; height: 90px" v-if="data.image.length > 1" @click.stop>
      <ul style="display: flex; justify-content: center;     height: 90px;
    align-items: center;">

        <li class="mlr5" v-for="(img, index) in data.image" :key="index" style="width: 4.2%;" @click="showImg(img, index)">

          <img :src="img" style="width: 100%;
    height: 100%;" />
        </li>
        
      </ul>
    </div>
  </div>
  <div class="relative" v-if="type!=='album'" style=" background: #fff; width: 350px" @click.stop>
    <TalkItem :data="data" />
    <Comment :data="data"/>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref
} from 'vue'
import TalkItem from '@/views/index/components/TalkItem/layer/index.vue'
import Comment from '@/views/index/components/TalkItem/layer/form.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    TalkItem,
    Comment
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    img: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: ""
    },
    isShow: Boolean // 以前是`value：String`
  },
  emits: ['update:isShow'],
  setup(props, context) {

    const {
      ctx
    }: any = getCurrentInstance();
    const currentImg = ref(props.img)
    const currentIndex = ref({
      total: props.data.image.length - 1,
      num: props.data.image.indexOf(props.img)
    })
    document.getElementsByTagName("html")[0].style.overflow = "hidden"

    function handleclick() {
      document.getElementsByTagName("html")[0].style.overflow = ""
      context.emit('update:isShow', false)
    }

    function showImg(img: any, index: any) {
      currentImg.value = img
      currentIndex.value.num = index
    }

    function toggle(num: any) {
      currentIndex.value.num += num
      currentImg.value = props.data.image[currentIndex.value.num]
    }
    return {
      handleclick,
      currentImg,
      currentIndex,
      showImg,
      toggle
    }
  }
})
</script>
