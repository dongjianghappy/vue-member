<template>
  <!-- <TalkItembar :data="data" /> -->
  <div style="padding: 100px">
    <!-- <Basic name="基本信息s"
           :data="{nickname: '昵称', age: '14', sex: '男'}" /> -->
    <!-- <Ranking :ref="ranking" /> -->
    <!-- <v-like :data="talkList[0]"
            :init="init" /> -->
    <!-- <Hobby /> -->
    <SDD />
    <!-- <div class="w150 left left-sidebar">
      <v-aside :data="data"
               title="首页" />
      <v-aside :data="menu"
               title="内容资讯" />
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, computed, onMounted } from 'vue'
import { article } from '@/assets/const'
import {useStore} from 'vuex'
import TalkItembar from '../index/components/TalkItem/TalkItembar.vue'
import Ranking from '../../views/activity/components/module/ranking.vue'
// import Basic from '../../views/basicInfo/info/index.vue'
// import Hobby from '../../views/basicInfo/components/hobby.vue'
import Photos from '../../views/index/components/sidebar.vue'
// import Log from '../../views/setting/components/safe.vue'
import SDD from '../concern/index.vue'
export default defineComponent({
  name: 'TextView',
    components: {
  //  Ranking,
  // Basic,
  // Hobby,
  // Photos,
  // Log,
  SDD
  },
  setup() {
    const {ctx, proxy}:any = getCurrentInstance();
    const data: any = [{"name":"收藏","path":"?mod=collect","icon":"icon-star"},{"name":"评论","path":"?mod=comment","icon":"icon-comment"},{"name":"点赞","path":"?mod=praise","icon":"icon-like"},{"name":"相册","path":"/album","icon":"icon-img"},{"name":"日志","path":"/journal","icon":"icon-node"},{"name":"留言","path":"/application?mod=feedback","icon":"icon-vote"}]
    const menu: any = article
 const store = useStore();
 const talkList = computed(() => store.getters['common/talkList']);
 
    function init(){
      debugger
  //     proxy.$scroll.init({
	// 	win: {
	// 		el: window,
	// 		y: 60
	// 	},
	// 	doc: {
	// 		el: 'aside_fixed'
	// 	},
	// 	type: "fixed"
	// })
    }
    // init({})

    onMounted(init)
    // {"id":"51","fid":"|50|45|","uid":"110506372","from_uid":"110506372","name":"","type":"art","istopic":"0","image":"","video":"","tag":"","summary":"12313131","content":"","flags":"","management_checked":"0","reason_type":"","return_reason":"","checked":"1","isdelete":"1","datetime":"1639104912","source_url":"","forwarding":"0","comment":"0","praise":"0","collect":0,"account":"110506372","username":"dongjiang","nickname":"\u00e4\u00b8\u0153\u00e6\u00b1\u0178\u00e5\u201c\u00a5","photos":"http:\/\/127.0.0.1\/\/user\/110506372\/photos\/110506372.png","coding3":"M0003","coding4":"M0004","coding5":"M0005","times":"\u4eca\u5929 02:55:12","coding":"M0000","list":[{"id":"50","fid":"|45|","uid":"110506372","from_uid":"110506372","name":"","type":"art","istopic":"0","image":"","video":"","tag":"","summary":"aaaaa","content":"","flags":"","management_checked":"0","reason_type":"","return_reason":"","checked":"1","isdelete":"1","datetime":"1639104664","source_url":"","forwarding":"1","comment":"0","praise":"0","collect":0,"account":"110506372","username":"dongjiang","nickname":"\u00e4\u00b8\u0153\u00e6\u00b1\u0178\u00e5\u201c\u00a5","photos":"http:\/\/127.0.0.1\/\/user\/110506372\/photos\/110506372.png","coding3":"M0003","coding4":"M0004","coding5":"M0005","times":"\u4eca\u5929 02:51:04","coding":"M0000"}
    return {
      visible: ref(false),
      data,
      menu,
      talkList
    }
  },
})
</script>