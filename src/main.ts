import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import views from './controller/component' // 公共组件
import packages from './controller/packages' // 公共组件
import hlj from './plugin/loading'
import hljs from './plugin/effects'
import scroll from './plugin/flxed'
import move from './plugin/move'
import cons from './plugin/const'

import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});


const Vue = createApp(App)
views(Vue)
packages(Vue)
hlj(Vue)
hljs(Vue)
scroll(Vue)
move(Vue)
cons(Vue)

// Vue.config.globalProperties.$aabb = hlj
Vue.use(store).use(router).use(VueMarkdownEditor).mount('#app')
