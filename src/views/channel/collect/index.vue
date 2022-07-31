<template>
<div class="module-wrap">
  <div class="module-head p20">
    收藏
  </div>
  <div class="module-content plr25">
    <template v-if="toggleDisplay === 'album'">
      <div class="col-sm-6 col-md-3 p10" v-for="(item, index) in dataList.list" :key="index" @click="handleclick(item)">
        <div class="thumbnail p10 relative" style="background: #fff;; overflow: hidden;">

          <a data-artcoding="C0000" data-catcoding="C0002" data-albumcoding="U40001" data-uid="110506372" data-id="6" data-pid="0" data-checked="0" data-placement="top" data-toggle="tooltip9" style="position:absolute; top:15px; right:15px;" data-left="0" class="infos trip_arrow content_trip bg-white hide">
            <i class="iconfont icon-down"></i>
          </a>
          <img :src="item.image[0]" style="width:  100%;
                 height:150px">
          <div class="
                 caption
                 relative" style="padding:10px 0; height:40px;">
            <span class="inputline updata nowrap" data-coding="C0000" data-field="title" data-id="6" contenteditable="true" style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display:block !important">{{item.title}}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <ul class="tech-lists">
        <li class="relative" style="border-bottom: 1px dotted #ddd; padding:15px 0;" v-for="(item, index) in dataList.list" :key="index" @mouseover="hover(item)" @mouseleave="leave(item)">
          <p class="mb10 relative">
            <span v-if="item.management_checked === '0'"><i class="iconfont icon-shenhe font18 ml0" style="color: #5bc0de"></i></span>
            <span class="art-title font16 mr5 pointer" @click="handleclick(item)">
              {{item.title}}
            </span>
            <span class="font16 cl-ccc">({{item.times}})</span>
            <span class="right pointer" @click="handleedit(item)"><i class="iconfont icon-recycle"></i></span>
          
          </p>
          <!-- <p>
            <span class="operating f-fr font12 cl-ccc">
              <a class="cl-ccc">分类：{{item.parent || '未分类'}}</a> |
              <a title="阅读" data-model="partner" data-action="remove" data-id="22" class="remove cl-ccc">阅读({{item.visit}})</a> |
              <a title="评论" data-model="partner" data-action="remove" data-id="22" class="remove cl-ccc">评论({{item.comment}})</a>
            </span>
          </p> -->
          <div v-if="isShowBatch" style=" position: absolute; left: 0; top: 0; right: 0; bottom: 0"></div>
        </li>
      </ul>
    </template>
  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  getUid
} from '@/utils'
import {
  useStore
} from 'vuex'
// import TalkItem from '../components//TalkItem/index.vue'
import List from "../article/list.vue"
import Album from "../article/album.vue"
export default defineComponent({
  name: 'HomeViewsss',
  components: {
    List,
    Album
  },
  props: {
    channel: {
      type: String,
      default: ""
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const toggleDisplay: any = ref("list")
    const coding: any = props.data.coding
    const loading: any = ref(false)
    const dataList: any = ref({});
    let tabMenu: any = ref([{
        name: "我收藏的",
        value: "appstore1"
      },
      {
        name: "被收藏的",
        value: "appstore2"
      }
    ])

    if (props.channel === 'picture') {
      // menu.value[0].name = "图片管理"
      toggleDisplay.value = 'album'
    } else if (props.channel === 'video') {
      // menu.value[0].name = "视频管理"
    } else if (props.channel === 'website') {
      // menu.value[0].name = "网站管理"
      toggleDisplay.value = 'album'
    } else if (props.channel === 'source') {
      // menu.value[0].name = "资源管理"
      toggleDisplay.value = 'album'
    } else if (props.channel === 'funny') {
      // menu.value[0].name = "搞笑段子"
    }

    function init() {
      loading.value = false
      store.dispatch('common/Fetch', {
        api: "getCollect",
        data: {
          uid: getUid(),
          coding: coding.art,
          page: 1,
          pagesize: 25,
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result
      })
    }
    init()
    return {
      toggleDisplay,
      init,
      loading,
      dataList,
      tabMenu
    }
  },
})
</script>
