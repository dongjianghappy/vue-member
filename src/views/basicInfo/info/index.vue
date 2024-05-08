<template>
<div class="module-wrap m0">
  <div class="module-content">
    <v-tabs :tabs="[{name: '个人信息',value: 'photos'},{name: '头像设置',value: 'background'},{name: '个人照片',value: 'background'}]" :isEmit="true">
      <template v-slot:content1>
        <Basic v-model:basicInfo="basicInfo" :edit="edit" :secrecy="secrecy" />
        <Contact v-model:basicInfo="basicInfo" :edit="edit" :secrecy="secrecy" />
        <Blog v-model:basicInfo="basicInfo" :edit="edit" />
        <Industry v-model:basicInfo="basicInfo" :edit="edit" />
        <Education v-model:basicInfo="basicInfo" :edit="edit" />
      </template>
      <template v-slot:content2>
        <Photos v-model:basicInfo="basicInfo" :edit="edit" :render="init" />
      </template>
      <template v-slot:content3>
        <PersonalPhotos v-model:basicInfo="basicInfo" :edit="edit" :render="init" />
      </template>
    </v-tabs>
  </div>
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
import Photos from '../photos/index.vue'
import PersonalPhotos from './components/personalPhotos.vue'

export default defineComponent({
  name: 'HomeViewdd',
  components: {
    Basic,
    Contact,
    Blog,
    Industry,
    Education,
    Photos,
    PersonalPhotos
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

    function secrecy(param: any) {

      store.dispatch('common/Fetch', {
        api: "secrecySetting",
        data: {
          field: param
        }
      }).then(res => {

      })
    }

    onMounted(init)

    return {
      basicInfo,
      edit,
      init,
      secrecy

    }
  }
})
</script>
