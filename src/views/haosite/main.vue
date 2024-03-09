<template>
<!-- 权威网站 -->
<div class="module-wrap mb10" style="border-bottom: 1px solid var(--default-border);">
  <div class="module-content p0">
    <ul class="clearfix">
      <li class="p15 left" style="width: auto" v-for="(list, i) in dataList.authority" :key="i">
        <span @click="visit(list)">{{list.title}}</span>
      </li>
    </ul>
  </div>
</div>

<!-- 知名网址 -->
<div class="module-wrap mb10" style="height: auto; border-bottom: 1px solid var(--default-border);">
  <div class="module-content p15 hot-site relative"><ul class="clearfix">
      <li class="left ptb5" style="width: 100px" v-for="(item, index) in dataList.brand" :key="index">
        <span @click="visit(item)">{{item.title}}</span>
        <template>•
          <span @click="visit(item)">{{item.second_title}}</span>
        </template>
      </li>
    </ul>
  </div>
</div>

<!-- 分类网站 -->
<div class="module-wrap mb15">
  <div class="module-content" style="min-height: 500px;">
    <div class="site-item relative" v-for="(item, index) in dataList.cate" :key="index">
      <div class="head-name" style="left: 0; top: 0px">
        {{item.name}}
      </div>
      <ul class="clearfix">
        <li class="left" style="width: auto" v-for="(list, i) in item.list" :key="i">
          <span @click="visit(list)">{{list.title}}</span>
        </li>
      </ul>
      <div class="site-more absolute" style="right: 0; top: 0">
        <a href="#">更多</a>
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

    store.dispatch('common/Appstore', {
      type: 1
    })

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
    color: #5bc0de;
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
