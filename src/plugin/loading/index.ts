import { createApp } from 'vue'
import { component } from './components/index'
import loadingModal from './loading.vue'
import praiseModal from './praise.vue'

const install = (Vue:any) => {
  Vue.config.globalProperties.$hlj = {
    // 加载
    loading(param:any) {
      const Vues = createApp(loadingModal)
      if(!document.getElementById("app-screen")){
        const el = document.createElement('div')
        el.setAttribute('id', "app-screen")
        document.body.appendChild(el);
      }
      Vues.mount('#app-screen');
    },
    
    // 消息提示
    message(param:any) {
      const AA = Vue.component("MymodalDa", component(param))
      AA.component("MymodalDa").data = () => {
        return {
          msg: param.msg
        }
      }
      if(!document.getElementById("app-screen")){
        const el = document.createElement('div')
        el.setAttribute('id', "app-screen")
        document.body.appendChild(el);
      }
      const Vues = createApp(component(param))
      Vues.mount('#app-screen');
      if(param.type != 'info'){
        return
      }
      
      setTimeout(()=>{
        let tips = document.getElementsByClassName('tips-wrap')[0]
        tips.classList.remove('fadeIn')
        tips.classList.add('fadeOut')
        setTimeout(()=>{
          document.querySelectorAll("#app-screen")[0].remove()
        },2000)
      },3000)
    } 
  }
}



export default install