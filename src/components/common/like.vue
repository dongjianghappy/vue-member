<template>
<span class="pointer block" @click="handleclick">
  <i class="iconfont absolute" :class="`icon-${icon}`" v-if="isClick" style="top:-20px;right: 85px;" :style="style" />
  <i class="iconfont" :class="`icon-${icon} ${{current: data.haspraise === 1}}`" ></i>
  <span :class="{current: data.haspraise === 1}" v-if="icon === 'like'">{{data.praise || '点赞'}}</span>
</span>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'v-Like',
  props: {
    icon: {
      type: String,
      default: "like"
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    api: {
      type: String,
      default: ""
    },
    method: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const style: any = ref({})
    const isClick = ref(false)

    function handleclick() {
      const param: any = {
        coding: props.data.coding4,
        artid: props.data.id,
        uid: props.data.uid
      }

      store.dispatch('common/Fetch', {
        api: props.api || 'Praise',
        data: {
          ...param
        }
      }).then(res => {
        if(res.ifSuccess === 2){
          return
        }
        if (res.ifSuccess === 0) {
          proxy.$hlj.message({
            type: 'info',
            msg: res.returnMessage
          })
          return
        }

        props.data.praise = res.result.num
        if (res.result.state === 1) {
          isClick.value = true
          props.data.haspraise = 1
          style.value = {
            display: 'block'
          }
          setTimeout(() => {
            style.value = {
              top: '-100px',
              opacity: 0,
              transition: 'all 1s ease',
              fontSize: '48px',
              color: '#eb7350'
            }
          }, 100)
        } else {
          props.data.haspraise = 0
          style.value = {
            top: '-20px',
            opacity: 1,
            display: 'none'
          }
        }
      })
    }
    return {
      handleclick,
      style,
      isClick
    }
  }
})
</script>

<style scoped>
.current {
  color: #eb7350;
}
</style>
