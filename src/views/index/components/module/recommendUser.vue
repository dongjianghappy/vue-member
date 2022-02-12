<template>
  <div class="module-wrap">
    <div class="module-head">
      推荐用户
    </div>
    <div class="module-content plr15 font12">
      <div class="media-wrap mb10 pb10"
           v-for="(item, index) in dataList"
           :key="index"
           style="display: flex">
        <div class="media-left">
          <v-avatar :data="item"
                    :style="{    width: '50px',
    height: '50px',
    borderRadius: '50%'}" />
        </div>
        <div class="media-body"
             style="flex: 1">
          <div class="pb5">
            {{item.nickname}}
          </div>
          <div>{{item.signature}}</div>
        </div>
        <div style="width: 70px">
          <button class="nobg font12"
                  style="border-radius: 30px; width: 70px; 
        padding: 5px 10px; border: 1px solid #ff8200;height: 30px;
    line-height: 20px; color: #ff8200"
                  @click="concern(item)"
                  v-if="item.hasconcern === 0">
            <i class="iconfont icon-anonymous-iconfont m0"
               style="color: #ff8200" />
            关注
          </button>
          <button class="nobg font12"
                  style="border-radius: 30px; width: 70px; 
        padding: 5px 10px; border: 1px solid #ccc;height: 30px;
    line-height: 20px; color: #666"
                  @click="concern(item)"
                  v-else>已关注
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, onMounted } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'HomeViewr',
    setup(props, context) {
      const {ctx}:any = getCurrentInstance();
      const store = useStore();
      const router = useRouter();
      const dataList = computed(() => store.getters['common/recommendUser']);
      
    function init(){
      store.dispatch('common/RecommendUser')
    }

    // 点击关注
    function concern(param: any) {
      store.dispatch('common/Fetch', {
          api: "Concern",
          data: {uid: param.uid}
      }).then(res => {
        init()
      })
    }

    onMounted(init)
      return { 
        dataList,
        concern
      }
    },
})
</script>
