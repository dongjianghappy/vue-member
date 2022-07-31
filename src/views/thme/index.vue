<template>
<div>
  <div class="theme" @click="onThem"></div>
  <div id="theme-box" class="theme-box" :style="{bottom: style}">
    <v-tabs :tabs="[{
        name: '套装主题'
      },{
        name: '背景特效'
      },{
        name: '自定义'
      }]" v-model:index="index" method="click" :className="{nav: 'theme-head', con: 'theme-con'}">
      <template v-slot:extra>
        <v-space>
          <!-- <span><Setting /></span> -->
          <span id="close-theme" style=" width:60px;"><i class="iconfont icon-close" @click="onThem"></i></span>
        </v-space>
      </template>
      <template v-slot:content1>
        <ul class="theme-list">
          <li class="themestyle" :class="{current: item.id === currentThem || (!currentThem && item.id === theme.theme_id)}" v-for="(item, index) in themeList" :key="index" @click="chooseTheme(item.id)">
            <img :src="item.image">{{item.name}}
          </li>
        </ul>
      </template>
      <template v-slot:content2>
        <ul class="theme-list">
          <li class="themestyle" :class="{current: item.id === currentEffects || (!currentEffects && item.id === theme.effects.id)}" v-for="(item, index) in effectsList" :key="index" @click="chooseEffects(item.id)">
            <img :src="item.image">{{item.name}}
          </li>
        </ul>
      </template>
      <template v-slot:content3>
      </template>
    </v-tabs>
    <div class="btngroud">
      <span data-fn="chooseTheme" data-theme="" data-type="blog" data-tips="您确定更换风格" class="btn btn-xs tipsbtn determinetheme" @click="comfirm">确认</span>
      <span class="btn btn-xs active" @click="onThem">取消</span>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  computed
} from 'vue'
import {
  useStore
} from 'vuex'
// import Setting from './components/setting.vue'
export default defineComponent({
  name: 'v-Search',
  components: {
    // Setting
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();

    const showThme = ref(false)
    const style = ref("-300px")
    const currentThem = ref()
    const currentEffects: any = ref()
    const themeList: any = ref([])
    const effectsList = ref([])
    const index: any = ref("0")
    const theme: any = computed(() => store.getters['user/loginuser'].theme);

    function onThem() {
      showThme.value = !showThme.value
      style.value = showThme.value ? "0px" : "-300px"
      getThem()
      getEffects()
    }

    function getThem() {
      store.dispatch('common/Fetch', {
        api: 'Theme'
      }).then(res => {
        themeList.value = res.result
      })
    }

    function getEffects() {
      store.dispatch('common/Fetch', {
        api: 'Effects'
      }).then(res => {
        effectsList.value = res.result
      })
    }

    function chooseTheme(id: any) {
      currentThem.value = id
    }

    function chooseEffects(id: any) {
      currentEffects.value = id
    }

    function comfirm() {
      const aaa: any = {
        theme: currentThem.value,
        background_effects: currentEffects.value
      }

      store.dispatch('common/Fetch', {
        api: 'ChooseTheme',
        data: {
          ...aaa
        }
      }).then(res => {
        showThme.value = false
        style.value = "-300px"
        proxy.$hlj.message({
          msg: "设置成功"
        })
      })

    }
    return {
      onThem,
      comfirm,
      theme,
      currentThem,
      currentEffects,
      style,
      themeList,
      effectsList,
      index,
      chooseTheme,
      chooseEffects
    }
  }
})
</script>
