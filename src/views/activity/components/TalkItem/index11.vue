<template>
  <div>
    <div class="con-list">
      <div class="con-wrap">
        <div class="photos">
          <a href="/{$sm_talklist[l].uid}/home"
             target="_blank">
            <img :src="data.photos"
                 width="30"
                 height="30"
                 class="showuserinfo"
                 data-uid="{$sm_talklist[l].account}"
                 data-placement="automatic"
                 data-toggle="tooltip{$sm_talklist[l].id}"
                 data-left="150" />
          </a>
        </div>

        <div class="user_info pb5"><span class="username">{{data.nickname}}</span></div>
        <div class="user_from pb5">{{data.times}}</div>
        <div class="user_text">
          <div v-html="data.summary"></div>

          <!--转载渲染-->
          <template v-if="data.list">
            <div v-for="(list, i) in data.list"
                 :key="i">
              <div v-if="list.video || list.image"
                   style="background:#eee; margin-top: 5px; margin-left: -80px; margin-right: -15px; margin-bottom: -15px; padding-top: 10px; padding-left: 80px; padding-right:15px;    padding-bottom: 15px;">
                <a href="/{$sm_talklist[l].list[u].uid}/home"
                   class="showuserinfo"
                   style="color: #eb7350;">@{{list.nickname}}</a>

                {{list.summary}}
                <!-- 视频预览 -->
                <video v-if="list.video"
                       src="{$sm_talklist[l].video}"
                       class="playmp4"
                       style="width: 450px; height: auto;">
                  您的浏览器不支持HTML5
                </video>

                <!-- 图片预览 -->
                <ul v-else-if="list.image.length > 0"
                    class="img-grid smallimg-wrap clearfix">
                  <li v-for="(img, k) in list.image"
                      :key="k">
                    <img :src="img"
                         @click="showImg"
                         class="_onalbumimg showimg"
                         data-id="{$sm_talklist[l].list[u].id}"
                         data-coding="{$sm_talklist[l].list[u].coding}"
                         data-codinglist="collect={$sm_talklist[l].coding5}&comment={$sm_talklist[l].list[u].coding3}&praise={$sm_talklist[l].list[u].coding4}"
                         data-img="{$sm_talklist[l].list[u].imglist[i]}" />
                  </li>
                </ul>
              </div>
              <div v-else>
                <!-- 这部分显示最后转载用户吧 -->
                <a href="/{$sm_talklist[l].list[u].uid}/home"
                   class="showuserinfo"
                   style="color: #eb7350;">@{{list.nickname}}</a>

                {{list.summary}}
              </div>
            </div>
          </template>
          <!--原文渲染-->
        </div>
      </div>
      <TalkItembar :data="data" />
      <CommentList :data="data" />
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref} from '@/utils'
import TalkItembar from './TalkItembar1.vue'
import CommentList from './comment/list.vue'


export default defineComponent({
  name: 'TalkItemView',
  components: {
TalkItembar,
CommentList
  },
  props: {
    data: {
      type: Array,
      default: ()=>{return []}
    }
  },
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const showFlag = ref(false)


    function showImg(){
      showFlag.value = !showFlag.value
    }

    return {
     showImg,
     showFlag
    }
  }
})
</script>
