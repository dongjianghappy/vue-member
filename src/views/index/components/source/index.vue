<template>
<!-- <div class="module-wrap">
  <div class="module-head" style="height: 50px;">
    <span class="catelist mr15" @click="handleTabs('')">全部</span>
    <span class="catelist mr15" @click="handleTabs('1')">网站特效</span>
    <span class="catelist mr15" @click="handleTabs('19')">网站模板</span>
    <span class="catelist" @click="handleTabs('download')">TA们下载</span>
  </div>
  <div class="module-content plr15">
    <div class="col-md-6 p5" v-for="(item, index) in dataList" :key="index">
      <div class="p10" @click="visit(item)" style=" background: #f9f9f9; border-radius: 8px;">
        <a class="block align_center" :href="`http://www.yunxi10.com/ziyuan/${item.id}.html`" target="_brank" style="width: 100%; height: 150px; overflow: hidden;"
        >
        <v-img :src="item.cover || item.image[0]" :isalbum="true" />
        </a>
        <div class="nowrap pt10 font12">{{item.title}}</div>
      </div>
    </div>
  </div>
</div> -->
<div>
  <div class="con-list" v-for="(item, index) in dataList" :key="index">
    <div class="con-wrap">
      <div class="photos">
        <v-photo :data="item" :style="{width: '50px', height: '50px', borderRadius: '50%'}" v-if="loginuser.account === item.uid" />
        <v-photos :sourceData="item" v-else />
      </div>
      <div class="user_info pb5">
        <span class="username">{{item.nickname}}</span>
      </div>
      <div class="user_from pb5">{{item.times}}</div>
      <div class="user_text">
        <h3 class="pb10" v-html="item.title"></h3>
        <!--原文渲染-->
        <div>
          <div>
            <a class="block" :href="`http://www.yunxi10.com/ziyuan/${item.id}.html`" target="_brank">
              <img :src="item.image[0]" style="border-radius: 8px;width: 250px; height: auto; cursor: zoom-in;" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <TalkItembar :data="item" />
  </div>
  <v-loding v-if="!loading" />
  <v-layer v-model:isShow="showFlag" :data="currentData" :img="currentImg" v-if="showFlag" type="image" :hasComment="true" />
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

    function handleTabs(param: any) {
      debugger
      let obj: any = {}
      if (param) {
        obj.fid = `|${param}|`
      }
      store.dispatch(`talk/Module`, {
        state: 'sourceList',
        data: {
          ...obj,
          type: 'source',
          coding: 'U0060000',
          page: 1,
          pagesize: '50',
          uid: getUid(),
        }
      }).then((res) => {

      })
    }

    return {
      loginuser,
      handleTabs
    }
  }
})
</script>

<style lang="less" scoped>
.catelist> {
  position: relative;

  &:after {
    z-index: 3;
    width: 0;
    content: "";
    position: absolute;
    height: 3px;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.4s;
    border-radius: 2px;
  }

  &:hover {
    color: #5bc0de;

    &:after {
      background-color: #FA4633;
      width: 100%;
      background-color: #5bc0de;
      z-index: 4;
    }
  }

}
</style>
