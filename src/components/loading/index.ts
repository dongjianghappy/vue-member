import { createApp } from 'vue'
import modal from './index.vue'

const install = (Vue:any) => {

     Vue.config.globalProperties.$hdj = {
      loading(param:any) {
        const AA = Vue.component("MymodalDa", modal)
        const Vues = createApp(modal)
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