<template>
<div class="module-wrap mb15">
  <div class="module-content" style="min-height: 500px;">
    <div class="site-item relative" v-for="(item, index) in dataList.province" :key="index">
      <div class="head-name" style="left: 0; top: 0px">
        {{item.name}}
      </div>
      <ul class="clearfix">
        <li class="left" style="width: auto" v-for="(list, i) in item.list" :key="i">
          <span @click="visit(list)">{{list.title}}</span>
        </li>
      </ul>
      <div class="site-more absolute" style="right: 0; top: 0">
        更多
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from '@/utils'
import {
  useStore
} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  props: {
    dataList: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore();

    function visit(param: any) {
      const {
        id
      } = param

      store.dispatch('common/Fetch', {
        api: "VisitCommunity",
        data: {
          coding: props.data.coding.info,
          id
        }
      }).then(res => {
        window.open(param.url)

      })
    }
    return {
      visit
    }
  }

})
</script>

<style lang="less" scoped>
.site-item {
  display: flex;
  padding-left: 0;
  height: 35px;

  .head-name {
    width: 65px;
    padding: 8px 0 8px 15px;
    color: var(--color-primary);
  }

  ul {
    flex: 1;

    li {
      padding: 8px;
      text-align: center;
      float: left;
    }
  }

  .site-more {
    padding: 8px 15px;

    a {
      color: #ccc;
    }
  }
}
</style>
