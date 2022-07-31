<template>
<div class="module-wrap">
  <div class="module-content plr15">
    <div class="con-list" v-for="(item, index) in dataList" :key="index">
      <div class="con-wrap">
        <div class="photos">
          <v-avatar :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" />
          <v-photos :sourceData="item" v-else />
        </div>
        <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
        <div class="user_from pb5">
          {{item.times}}
        </div>
        <div class="user_text">

          <div class="pb5">下载了：
            <span v-html="item.title"></span>
          </div>
          <div>
            <a :href="`http://www.yunxi10.com/ziyuan/${item.artid}.html`" target="_brank"><img :src="item.image" class="w200" /></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  getUid
} from '@/utils';
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref
} from 'vue'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'HomeViews',
  components: {

  },
  props: {
    channel: {
      type: String,
      default: ""
    },
    dataList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
setup(props, context) {
    const store = useStore();
    const loginuser = computed(() => store.getters['user/loginuser']);

    return {
      loginuser
    }
  }  
})
</script>
