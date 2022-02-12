<template>
  <v-dialog :title="data.action === 'add' ? '创建相册' : '编辑相册'"
            width="450px"
            height="350px"
            :confirm="true"
            :cancel="true"
            @submit="submit"
            v-model:isShow="visible">
    <template v-slot:content>
      <ul class="edit-list">
        <li class="mb15">

          <div class="mb5">相册名称</div>
          <input type="text"
                 v-model="formData.name"
                 class="input-mid input-full">
        </li>
        <li>
          <div class="mb5">相册描述</div>
          <input type="text"
                 v-model="formData.description"
                 class="input-mid input-full">
        </li>
      </ul>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    img: {
      type: String,
      defualt: ""
    },
    showFlag: {
      type: Boolean,
      default: false
    },  
    render: {
      type: Function,
      default: ()=>{
        return 'Default function'
      }
    } 
  },
  emits: ['update:showFlag'],
  setup(props,context) {
      const {ctx, proxy}:any = getCurrentInstance();
      const store = useStore();
      const visible = ref(props.showFlag)
      const { action, item } = props.data
      const formData = ref(item || {
        name: "",
        description: "",
      })

      // 监听弹窗变量
      watch([visible], (next, prev) => {
        context.emit('update:showFlag', false)
      })

        // 初始化数据
      function init(){
      console.log("sdsd");
      
      }

    function submit(){
     const {name, description} = formData.value
      const param: any = {
        name,
        description,
        coding: "U0012",
      }

      if(action !== "add"){
        param.id = item.id
      }      
     
      // proxy.$loading.loading()
      store.dispatch('common/Fetch', {
          api: action === "add" ? "CreatePhotoAlbum" : "UpdateAlbum",
          data: {
            ...param
          }
      }).then(res => {
        props.render()
        context.emit('update:showFlag', false)
      })
       
      
    }      

      onMounted(init)
      return {
        visible,
        formData,
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
