<template>
<div>
  <div class="container w1100">
    <UserInfoHead />
  </div>

  <div class="container w1100 clearfix">
    <div class="w180 left">
      <v-aside :data="module.home_nav" :isFixed="false">
        <template v-slot:button>
        </template>
      </v-aside>
    </div>
    <div class="m0 right" style="width: 910px">
      <div class="module-wrap mb15">
        <div class="module-content p25" style="min-height: 650px;">
          <v-tabs :tabs="[{name: '给我留言',value: 'photos'},{name: '我留言的',value: 'background'}]" :isEmit="true" v-model:index="index">
            <template v-slot:content1>
              <div class="module-wrap mb10">
                <div class="module-content send_info p0" style="overflow: inherit;">
                  <div class="goto-write mb5">
                    主人寄语: <span class="cl-999">{{userInfo.message || '无'}}</span>
                    <span class="ml10 pointer" style="color: #f67f00; " @click="()=>isShow = true" v-if="!isShow">

                      开始留言</span>
                    <span class="ml10 pointer" style="color: #f67f00; " @click="()=>isShow = false" v-else>收起</span>
                  </div>
                  <template v-if="isShow">
                    <Form :render="init" :data="{coding: coding.list}" :placeholder="'给博主留言'" />
                  </template>
                </div>
              </div>
              
              <List :data="{coding: coding.reply}" :dataList="dataList" :isTome="isTome" :render="init" />
            </template>
            <template v-slot:content2>
              <List :data="{coding: coding.reply}" :dataList="dataList" :isTome="isTome" :render="init" />
            </template>
          </v-tabs>

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
  computed,
  ref,
  onMounted,
  getUid,
  watch,
  codings
} from '@/utils'
import UserInfoHead from '../../home/components/UserInfoHead.vue'
import Form from './components/form.vue'
import List from './components/list.vue'
import {
  feedback
} from '@/assets/const'

export default defineComponent({
  name: 'MessageBoardView',
  components: {
    UserInfoHead,
    Form,
    List
  },
  setup(props, context) {
    const store = useStore();
    const route = useRoute();
    const coding = codings.talk.message_board
    const isShow = ref(false)
    const isTome: any = ref(true);
    const userInfo: any = computed(() => store.getters['user/userInfo']);
    const loginuser = computed(() => store.getters['user/loginuser']);
    let dataList: any = ref({})
    const loading: any = ref(false)
    const module = computed(() => store.getters['user/config_talk']);

    watch(() => route.query.item, () => {
      isTome.value = route.query.item === 'tome' ? true : false
    })

    function init(param: any = {}) {
      loading.value = false

      const params: any = {
        coding: coding.list,
        item: route.query.item,
        uid: getUid(),
        page: 1,
        pagesize: 25
      }

      Object.assign(params, param)

      store.dispatch('common/Fetch', {
        api: "userMessageBoard",
        data: {
          ...params
        }
      }).then(res => {
        loading.value = true
        dataList.value = res.result
      })
    }

    onMounted(init)

    return {
      coding,
      route,
      isTome,
      isShow,
      dataList,
      loading,
      userInfo,
      loginuser,
      init,
      module
    }
  }
})
</script>
