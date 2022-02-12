<template>
  <ul>
    <li class="col-sm-6 col-md-6 p10"
        v-for="(item, index) in data"
        :key="index">
      <div class="grid-wrap">
        <div class="grid-left">
          <a :href="`/${item.account}/home`">
            <img :src="item.photos"
                 width="50"
                 height="50"
                 style="vertical-align:middle; border-radius:50%; "
                 class="showuserinfo"
                 data-uid="1105825974"
                 data-placement="automatic"
                 data-toggle="tooltip17">
          </a>
        </div>
        <div class="grid-body">
          <p style="font-weight:bold;">
            {{item.nicknames}} 张三
            <i class="iconfont icon-male"
               v-if="item.sex === '1'"></i>
            <i class="iconfont icon-female"
               v-else></i>
          </p>
          <p>
            <a>上海</a> |
            <a href="/506372/home?mod=concern&amp;action=myconcern"><span>关注</span> 3</a> |
            <a href="/506372/home?mod=concern&amp;action=concernmy"><span>粉丝</span> 2</a> |
            <a><span>内容</span> 11</a>
          </p>
          <p>{{item.signature}}</p>
        </div>
        <div class="right"
             style="width:50%">
          <span class="concern"
                @click="concern(item)"
                style=" background:#FFF; width:auto; height:20px; line-height:20px; display:block; text-align:center; cursor:pointer; position: absolute; top: 25px; right: 80px;">
            {{item.concern_status}}</span>
          <span class="infos demoimg"
                data-placement="top"
                data-toggle="tooltip17"
                style="background:#FFF; width:60px; height:20px; line-height:20px; display:block; text-align:center; cursor:pointer; position:absolute; top:25px; right:15px;"
                data-left="-90">更多<i class="iconfont icon-down"></i></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'AsideView',
  props: {
    data: {
      type: Object,
      defualt: ()=>{return}
    }
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();

    // 点击关注
    function concern(item: any) {
      store.dispatch('common/Fetch', {
          api: "Concern",
          data: {uid: item.uid || item.friend_uid}
      }).then(res => {
        if(res.returnMessage === "你已取消关注"){
          item.concern_status = "关注Ta"
        }else{
          item.concern_status = "互相关注"
        }
        // userInfo.value.concernstatus = res.result.status
      })
    }

    return {
      concern,
    }
  }  
  
})
</script>
