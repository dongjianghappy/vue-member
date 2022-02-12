import { createApp } from 'vue'
import messageModal from './message.vue'
import loadingModal from './loading.vue'
import praiseModal from './praise.vue'

const install = (Vue:any) => {
  Vue.config.globalProperties.$hlj = {
    // 加载
    loading(param:any) {
      const Vues = createApp(loadingModal)
      if(!document.getElementById("screens")){
        const el = document.createElement('div')
        el.setAttribute('id', "screens")
        document.body.appendChild(el);
      }
      Vues.mount('#screens');
    },
    
    // 消息提示
    message(param:any) {
      const AA = Vue.component("MymodalDa", messageModal)
      const Vues = createApp(messageModal)
      AA.component("MymodalDa").data = () => {
        return {
          msg: param.msg
        }
      }
      if(!document.getElementById("screens")){
        const el = document.createElement('div')
        el.setAttribute('id', "screens")
        document.body.appendChild(el);
      }
      Vues.mount('#screens');
      AA.component("MymodalDa").setup().message()
    },

    // 点赞
    praise() {
      const AA = Vue.component("MymodalDa", praiseModal)
      const Vues = createApp(praiseModal)
      
      if(!document.getElementById("screens")){
        const el = document.createElement('div')
        el.setAttribute('id', "screens")
        document.body.appendChild(el);
      }
      Vues.mount('#screens');
      AA.component("MymodalDa").setup().message()
    },    
  }
}



export default install