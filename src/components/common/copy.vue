<template>
  <v-dialog title="复制图片地址"
            width="650px"
            height="250px"
            :hasfooter="false"
            v-model:isShow="visible">
    <template v-slot:content>
      {{img}}
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    img: {
      type: String,
      defualt: ""
    },
    showFlag: {
      type: Boolean,
      default: false
    },   
  },
  emits: ['update:showFlag'],
  setup(props,context) {
      const {ctx}:any = getCurrentInstance();
      const visible = ref(props.showFlag)

      // 监听弹窗变量
      watch([visible], (next, prev) => {
        context.emit('update:showFlag', false)
      })

        // 初始化数据
      function init(){
      console.log("sdsd");
      
      }

      onMounted(init)
      return {
        visible
      }
    }
  })
</script>
<style scoped>
.current{
    background: #1890ff;
    border-radius: 2px;
    color: #fff;

}
</style>
