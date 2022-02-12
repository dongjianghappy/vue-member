<template>

  <v-dialog title="新增专辑"
            width="480px"
            height="300px"
            :confirm="true"
            :cancel="true"
            @submit="submit"
            @close="cancel"
            v-model:isShow="isShow">
    <template v-slot:content>
      <ul class="edit-list">
        <li class="mb15">

          <div class="mb5">名称</div><input type="text"
                 v-model="data.name"
                 class="input-mid input-full">
        </li>
        <li class="mb15">
          <span>{{data.cateName}}</span>
          <span @click="choose">选择分类</span>

        </li>
        <li>
          <div class="mb5">描述</div><input type="text"
                 v-model="data.description"
                 class="input-mid input-full">
        </li>
      </ul>
    </template>
  </v-dialog>

</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref, watch } from 'vue'

import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  components: {
  //  CategoryDialog
  },
  props: {
    name: {
      type: String,
      default: "弹窗按钮"
    },
    sourceData: {
      type: Object,
      default: ()=>{return}
    },
    value: {
      type: String,
      default: ""
    },
    showAlbum: {
      type: Boolean, 
      defualt: false
    },
    cateData: {
      type: Object,
      defualt: ()=>{
        return{
          fid: "",
          cateName: "",
           name: "",
      description: "",
      }}
    }
    
  },
  data(){
    return {
      summary: "",
    }
  },
emits: ['cancel', 'submit', 'getValue', 'choose', 'update:showAlbum'],
setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(props.showAlbum)
    const showCate = ref(false)
    const data = ref(props.cateData || {
          fid: "",
          cateName: "",
           name: "",
      description: "",
      })
   
watch([isShow], (newValues, prevValues) => {
  debugger
    context.emit('update:showAlbum', newValues[0])
  })

    function cancel(){
      
      context.emit('cancel')
    }
    
        function handleclick(){


      isShow.value = true
      
    }
    function choose(param: any){
     context.emit('choose', data.value)

    }
    function submit(){
     const {name, description, fid} = data.value
      const param: any = {
        name,
        description,
        fid,
        coding: "U40001",
      }
     
      proxy.$loading.loading()
      store.dispatch('common/Fetch', {
          api: "CreateAlbum",
          data: {
            ...param
          }
      }).then(res => {
        isShow.value = false
        proxy.$hlj.message("sdsd")
        
      })
       
      
    }


    return {
      handleclick,
      cancel,
      isShow,
      showCate,
      data,
      
      choose,
      submit
  
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
