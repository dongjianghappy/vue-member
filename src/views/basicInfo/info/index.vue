<template>
<div>
  <Basic v-model:basicInfo="basicInfo" :edit="edit" />
  <Contact v-model:basicInfo="basicInfo" :edit="edit" />
  <Blog v-model:basicInfo="basicInfo" :edit="edit" />
  <Industry v-model:basicInfo="basicInfo" :edit="edit" />
  <Education v-model:basicInfo="basicInfo" :edit="edit" />
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
import Basic from './components/basic.vue'
import Contact from './components/contact.vue'
import Blog from './components/blog.vue'
import Industry from './components/industry.vue'
import Education from './components/education.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Basic,
    Contact,
    Blog,
    Industry,
    Education
  },
  props: {
    type: {
      type: String,
      defult: "index"
    }
  },
  setup(props, context) {
    const {
      ctx,
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const basicInfo = computed(() => store.getters['user/basicInfo']);

    function init() {
      store.dispatch('user/UserBaiscInfo', {})
    }

    function edit(param: any) {
      store.dispatch('common/Fetch', {
        api: "editUserInfo",
        data: {
          ...param
        }
      }).then(res => {
        proxy.$hlj.message(res.returnMessage)
        console.log("ss");
      })
    }

    onMounted(init)

    return {
      basicInfo,
      edit

    }
  }
})
</script>
