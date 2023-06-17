import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import views from './controller/component' // 公共组件
import publics from './controller/public' // 前台公共组件
import packages from './controller/packages' // 公共组件
import hlj from './plugin/loading'
import message from './plugin/message'
import hljs from './plugin/effects'
import scroll from './plugin/flxed'
import pendant from './plugin/pendant'
import move from './plugin/move'
import cons from './plugin/const'
import form from './plugin/validate'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});


const Vue = createApp(App)
views(Vue)
publics(Vue)
packages(Vue)
hlj(Vue)
message(Vue)
scroll(Vue)
pendant(Vue)
hljs(Vue)
move(Vue)
cons(Vue)
form(Vue)
Vue.use(PerfectScrollbar)

// Vue.config.globalProperties.$aabb = hlj
Vue.use(store).use(router).use(VueMarkdownEditor).mount('#app')
