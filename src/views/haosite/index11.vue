<template>
<div class="container w1100">
  <!-- 权威网站 -->
  <div class="module-wrap bd-dee3eb mb10">
    <div class="module-content p0">
      <ul class="clearfix">
        <li class="p15 left" style="width: auto" v-for="(list, i) in dataList.authority" :key="i">
          <span @click="visit(list)">{{list.title}}</span>
        </li>
      </ul>
    </div>
  </div>

  <!-- 知名网址 -->
  <div class="module-wrap bd-dee3eb mb10" style="height: auto">
    <div class="module-content p15 hot-site relative">
      <!--<span class="bg-5bc0de cl-white font12 block absolute" style=" top: 100px; padding: 3px; width:18px; line-height: 16px;">推荐网站</span>-->
      <ul class="clearfix">
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
    <div class="module-content" style="padding: 15px !important; min-height: 500px;">
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
  <!-- 博客网站 -->
  <div class="module-wrap mb15">
    <div class="module-head p20">网站大全
      <span class="right">
        <Detail :data="{coding: coding.art}" /></span>
    </div>
    <div class="module-content" style="padding: 15px !important; min-height: 500px;">
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
          <a href="#">更多</a>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  useStore,
  useRoute,
  ref,
  onMounted,
  codings
} from '@/utils'
import Detail from './components/detail.vue'
export default defineComponent({
  name: 'MessageBoardView',
  components: {
    Detail
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding: any = codings.haosite
    let dataList: any = ref([])

    function init() {
      store.dispatch('common/Fetch', {
        api: 'haosite',
        data: {
          coding: coding.art,
          page: 1,
          pagesize: 20
        }
      }).then(res => {
        dataList.value = res.result
      })
    }

    function visit(param: any) {
      const {
        id
      } = param

      store.dispatch('common/Fetch', {
        api: "VisitCommunity",
        data: {
          coding: coding.info,
          id
        }
      }).then(res => {
        debugger
        window.open(param.url)

      })
    }

    onMounted(init)

    return {
      coding,
      dataList,
      init,
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
