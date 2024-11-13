<template>
  <div class="container w1100 relative clearfix">
    <!-- 侧边菜单 -->
    <div class="left-sidebar left">
      <v-aside :data="module.groups"
               title="首页" />
    </div>
    <!-- 主内容 -->
    <div class="main-center left"
         style="width: 620px;">
      <div class="module-wrap">
        <div class="module-content plr15"
             style="height: 1500px;">
          <div class="mb15">
            <div class="font18"
                 style="flex: 1">我的音乐盒</div>
            <div>
              <div class="flex">
                <div class="p10"
                     style="flex: 1">歌曲名称</div>
                <div class="p10 align_center"
                     style="width: 150px">操作</div>
              </div>
              <div class="flex"
                   v-for="(item, index) in dataList"
                   :key="index"
                   style="border-top: 1px solid var(--default-border);">
                <div class="p10"
                     style="flex: 1">{{item.music_name}}
                  <v-audio :data="item"
                           :hasMusic="true" />
                </div>
                <div class="p10"
                     style="width: 150px">
                  <span class="mr10"
                        @click="handleClick(item)">
                    <span class="cl-primary"
                          v-if="item.background_music == '1'">取消背景音乐</span>
                    <span v-else>设为背景音乐</span>
                  </span>
                  <span @click="handleCollect(item)">
                    删除
                  </span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧 -->
    <div class="w280 right">
      <RightView :module="module.personal_center"
                 :userInfo="userInfo"
                 :render="init" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  computed,
  useStore,
  useRouter,
  useRoute,
  ref,
  getUid,
  codings,
  toBlob
} from '@/utils'

import RightView from '../../index/components/right_aside.vue'
export default defineComponent({
  name: 'HomeView',
  components: {
    RightView
  },
  setup(props, context) {
    const coding: any = codings.talk.background_music
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const dataList: any = ref([])
    let query: any = computed(() => route.query || "");
    const module = computed(() => store.getters['user/config_talk']);
    const userInfo = computed(() => store.getters['user/loginuser']);

    function init() {
      store.dispatch('common/Fetch', {
        api: 'getMusic',
        data: {
          uid: getUid()
        }
      }).then( async res => {
        await toBlob(res.result)
        let newArr = res.result.map((item: any)=>{
          item.music_file = item.file
          delete item.file
          return item
        })
        dataList.value = newArr
      })
    }

    function handleClick(param: any){
      store.dispatch('common/Fetch', {
        api: 'updateStatus',
        data: {
          coding: coding,
          id: param.id,
          status: 'background_music'

        }
      }).then(res => {
        param.background_music = res.result.value
      })
    }

    function handleCollect(param: any){
      store.dispatch('common/Fetch', {
        api: 'collect_music',
        data: {
          music: param.music_id
        }
      }).then(res => {
        if (res.ifSuccess === 2) {
          return
        }
        let index = dataList.value.findIndex((item: any) => item.id === param.id)
        dataList.value.splice(index, 1)
      })
    }

    onMounted(() => {
      init()
    })

    return {
      coding,
      module,
      userInfo,
      query,
      dataList,
      init,
      handleCollect,
      handleClick
    }
  }
})
</script>
