<template>
<div class="content-atten">
<ul>
  <li @click="handleClick('concernmy')" class="pointer">
    <span><strong>{{userInfo.concernmy}}</strong><span>照片</span></span>
  </li>
  <li @click="handleClick('myconcern')" class="pointer">
    <span><strong>{{userInfo.myconcern}}</strong><span>话题</span></span>
  </li>
  <li @click="handleClick('praise')" class="pointer">
    <a><strong>{{userInfo.talk}}</strong><span>日志</span></a>
  </li>
</ul>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed
} from 'vue'
import {
  useStore,
  useRouter,
  getUid
} from '@/utils'
export default defineComponent({
  name: 'v-Content',
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const {
      proxy
    }: any = getCurrentInstance();
    const userInfo = computed(() => store.getters['user/userInfo']);

    function handleClick(param: any) {
      if (param === 'praise') {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: `?mod=${param}`
        }))
      } else {
        router.push(proxy.const.setUrl({
          uid: getUid(),
          query: `/concern?mod=${param}`
        }))
      }
    }
    return {
      userInfo,
      handleClick
    }
  }
})
</script>

<style lang="less" scoped>
.content-atten {
  background: #fff;
  margin-bottom: 15px;
  border-radius: 4px;
  padding: 15px;
  height: 65px;
  ul {
    li {
      width: 33.33333333%;
      height: 35px;
      float: left;

      a {
        color: #333;
      }

      text-align: center;

      strong,
      span {
        display: block;
      }
    }

    li:nth-child(2) {
      border-left: 1px solid var(--vertical-line);
      border-right: 1px solid var(--vertical-line);
    }
  }

  &:after {
    content: '';
    clear: both;
  }
}
</style>
