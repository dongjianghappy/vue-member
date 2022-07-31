<template>

  <img :src="data.photos"
       @click="handleclick(data.from_uid || data.account || data.uid)"
       :style="style">
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed } from 'vue'
import { getUid } from '@/utils'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'v-Search',
  components: {

  },
  props: {
    data: {
      type: Object,
      defualt: () => {
        return
      }
    },
    photos: {
      type: String,
      default: "http://127.0.0.1//user/110506372/photos/110506372.png"
    },
    style: {
      type: Object,
       defualt: () => {
        return
      }
    }
  },
  emits: ['onClick'],
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const router = useRouter();
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);

    function handleclick(uid: any){
      debugger
      if(getUid() !== uid){
        const path = window.location.pathname.split("/")
        window.location.href = `${path[1] === "app" ? "/app": ""}/u/${uid}/home`;
      }else{
        router.push(`${proxy.const.u}${uid}/home`)
      }
    }
    
    return {
      handleclick
    }
  }
})
</script>
