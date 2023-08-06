<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-qr" />
</v-button>
<v-dialog v-model:show="isShow" ref="form" :title="`${user.nickname}的二维码`" :style="{width: 300, height: 350}" :confirm="true" :hasfooter="false">
  <template v-slot:content>
    <div class="mt20 align_center">
      <QrcodeVue :value="`http://www.dongblog.com/u/${user.account}/home`" :size="180" level="H" />
      <div class="mt15 font12">扫一扫二维码图案，加我为好友</div>
    </div>
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
} from 'vue'
import {
  useStore
} from 'vuex'
// yarn add qrcode.vue
import QrcodeVue from 'qrcode.vue'
export default defineComponent({
  name: 'v-Mood',
  components: {
    QrcodeVue
  },
  props: {
    user: {
      type: String,
      default: ""
    }
  },
  setup(props, context) {

    const isShow = ref(false)

    return {
      isShow
    }
  }
})
</script>

<style scoped>
.li {
  background: #ccc;
  height: 75px;
  border-radius: 5px;
  line-height: 75px;
  color: #fff;
}

.current {
  background: #8bc34a;
}

.ps {
  height: 320px;
}
</style>
