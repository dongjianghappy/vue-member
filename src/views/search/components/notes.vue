<template>
<div class="con-list" v-for="(item, index) in dataList" :key="index">
  <div class="con-wrap">
    <div class="photos">
      <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" />
      <v-photos :sourceData="item" v-else />
    </div>
    <div class="user_info pb5"><span class="username">{{item.nickname}}</span></div>
    <div class="user_from pb5">
      {{item.times}}
    </div>
    <div class="user_text">

      <div class="pb5">
        <span v-html="item.title"></span>
        <span v-html="item.content"></span>
      </div>
      <div>
        <ul v-if="item.image.length > 0" class="img-grid smallimg-wrap clearfix">
          <li v-for="(img, k) in item.image" :key="k">
            <img :src="img" @click="showImg(item, img)" class="_onalbumimg showimg" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
<v-nodata v-if="dataList.length === 0 && loading" trip="暂时没有数据" />
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
    },
    loading: {
      type: Boolean,
      default: false
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
