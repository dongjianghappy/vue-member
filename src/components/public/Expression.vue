<template>
<v-popover content="<i class='iconfont icon-face'>表情</i>" arrow="tb" offset="right" :move="move" :type="click" keys="popover-face" @onClick="handleClick">
  <div class="expression-wrap">
    <template v-if="dataList.length">
      <div class="expression-cate">
        <span class="expression-tabs" :class="{current: currentIndex == index}" v-for="(item, index) in dataList" :key="index" @click="handleCate(item, index)">
          <i :class="`iconfont icon-${item.icon}`" :title="item.name" v-if="item.icon" />
          <span :title="item.name" v-else>{{item.name}}</span>
        </span>
      </div>
      <div class="expression-box">
        <div class="expression-gif left" v-for="(item, index) in currentCate" :key="index" @click="ChooseEmoji(item.name)">
          <img :src="item.value" :title="item.name" style="width: 24px; height: 24px;">
        </div>
      </div>
    </template>
    <v-loding v-else />
  </div>
</v-popover>
</template>

<script lang="ts">
import {
  codings,
  defineComponent,
  ref,
  useStore,
} from '@/utils'
import {
  expression
} from '@/assets/const'
export default defineComponent({
  name: 'v-Expression',
  props: {
    move: {
      type: String,
      default: -10
    }
  },
  emits: ['onEmoji'],
  setup(props, context) {
    const store = useStore()
    const coding = codings.expression
    const currentCate = ref([])
    const expressionList: any = expression;
    const dataList = ref([])
    const currentIndex: any = ref('0')

    function handleClick(param: any) {
      currentIndex.value = "0"
      if (!param) {
        return
      }
      store.dispatch('common/Fetch', {
        api: 'expression'
      }).then(res => {
        dataList.value = res.result
        currentCate.value = res.result.length > 0 ? res.result[0].list : []
      })
    }

    function handleCate(param: any, index: any) {
      currentCate.value = param.list || []
      currentIndex.value = index
    }

    function ChooseEmoji(data: any) {
      context.emit('onEmoji', `[${data}]`)
    }
    return {
      ChooseEmoji,
      expressionList,
      dataList,
      handleClick,
      handleCate,
      currentCate,
      currentIndex
    }
  }
})
</script>

<style lang="less" scoped>
.facebox {
  li {
    padding: 0;
    width: 32px;
    height: 32px;
    line-height: 32px;
    float: left;
    text-align: center;
  }
}
</style>
