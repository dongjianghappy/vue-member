import { createApp } from 'vue'
import modal from './index.vue'
// const Loading = {
//   install: function (Vue:any) {
//     const Vues = createApp(modal)
//     let productCheckResultInit:any;
//     const initInstance = () => {
//       // 实例化vue实例
//       // productCheckResultInit = new productCheckResultInstance();
//       const qqq = Vues.mount('#app').$el;
//       // const productCheckResultEl = productCheckResultInit.$mount().$el;
//       document.body.appendChild(qqq);
//     };
//     Vue.config.globalProperties.$hlj = {
//       message(options:any) {
//         if (!productCheckResultInit) {
//           initInstance();
//         }
//         Vues._component.setup().message(options)
        
//       },
      
//     }

//   }
// }

// // 导出组件
// export default Loading


const install = (Vue:any) => {

     Vue.config.globalProperties.$hlj = {
      message(param:any) {
        const AA = Vue.component("MymodalDa", modal)
        const Vues = createApp(modal)
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
      
    }
  }



export default install