<template>
  <v-dialog title="转载话题"
            width="650px"
            height="350px"
            @submit="onClick"
            @close="cancel"
            :isShow="isShow">
    <template v-slot:content>
      <div style="background: #eee; padding: 10px; height: 90px; overflow-y: auto;"
           v-html="data.photos">

      </div>
      <div style="maring-bottom: 10px; padding: 10px; heightL 80px;"><textarea id="talkcon"
                  v-model="summary"
                  placeholder="请输入转载理由"
                  class="forwarding-wrap"
                  style="border: 1px solid #5bc7e9; width: 100%; height: 120px;"></textarea></div>
      <div><a class="infos face"
           data-append="#msgcon"
           data-insertbox=".forwarding-wrap"
           data-placement="bottom"
           data-toggle="toolface"
           data-position="absolute"><i class="iconfont icon-face"></i></a></div>
    </template>
    <template v-slot:footer>
      <button @onClick="handleClick"
              class="btn btn-default">转发</button>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    data: {
      type: Object,
      default: ()=>{return}
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
emits: ['cancel', 'submit'],
setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const { coding3, id, uid } = reactive(props.data)
    let summary: any = ref()

    function cancel(){
      
      context.emit('cancel')
    }
    
        function onClick(){
      store.dispatch('common/Fetch', {
  
        api: 'Forwarding',
        data: {
        coding: "coding3",
        id,
        uid,
        summary: summary.value
        }
      })

      
    }
    return {
      onClick,
      cancel
  
    }
  }
})
</script>
