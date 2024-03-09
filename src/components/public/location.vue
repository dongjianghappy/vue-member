<template>
<v-button v-model:show="isShow">
  <i class="iconfont icon-position font12">所在位置</i>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="所在位置" :style="{width: 450, height: 550}" :confirm="true" :hasfooter="false">
  <template v-slot:content>
    <div>
      <ul>
        <li v-for="(item, index) in dataList" :key="index" class="ptb10" @click="handleClick(item.name)">{{item.name}}</li>
      </ul>
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
    const dataList: any = [{
      name: '广州市天河区'
    }, {
      name: '广州市海珠区'
    }]

    function handleClick(param: any){
      alert(param)

    }

    return {
      isShow,
      dataList,
      handleClick
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
