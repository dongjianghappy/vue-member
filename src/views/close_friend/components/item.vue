<template>
    <div class="con-list" v-for="(item, index) in sourceData" :key="index">
        <div class="con-wrap">
            <div class="photos">
                <div class="font24 align_center" style="background: var(--color-primary-background); border-radius: 50%; line-height: 50px; width: 50px; height: 50px;" v-if="item.user.length > 1">众</div>
                <div class="font24 align_center" style="background: var(--color-primary-background); border-radius: 50%; line-height: 50px; width: 50px; height: 50px;" v-else>单</div>
            </div>
            <div class="user_info mb10"><span class="username">
                    {{item.times}}
                </span>
                <span class="right span-icon">
                    <v-popover content="<i class='iconfont icon-down font18 icon-btn'></i>" arrow="tb" offset="right" :move="-50" :keys="`popover-${item.id}`">
                        <div style="width: 150px">
                            <ul class="font14">
                              <li><Detail2 action="edit" :data="{user: item.user, id: item.id,coding: data.coding.content}" :render="render" /></li>
                              <li><Detail3 :data="{id: item.id, ...data}" :render="render" /></li>
                            </ul>
                        </div>
                    </v-popover>
                </span>
            </div>
            <div class="user_text markdown">
                <div class="mb25">
                    <div class="flex mb15">
                        <div class="relative align_center" style="width: 60px;" v-for="(list, i) in item.user" :key="i" @click="handleclick(list)">
                            <img :src="list.photo" onerror="this.src='/images/head_normal_100.png'" style="width: 50px; height: 50px; border-radius: 50%;">
                            <div class="font12 nowrap">{{`${list.name}`}}</div>
                        </div>
                    </div>
                    {{item.name}}
                </div>
                <div v-for="(list, i) in item.list" :key="i" class="mb5 p10 radius-4" style="background: var(--color-primary-background);">
                    <span class="right">
                        <Detail3 action="edit" :data="{id: list.id,coding: data.coding}" />
                    </span>
                    <div class="mb5">{{list.name}}</div>
                    <div class="mb5">{{list.date}} {{list.period}} {{list.time}}:00</div>
                    <div class="mb5">{{list.content}}</div>
                    <Images :data="list" />
                    <div class="mt10 font12">
                      <i class="iconfont icon-position m0 font12" />
                      {{list.address}}</div>
                </div>
            </div>
        </div>
    </div>
    <v-nodata v-if="!sourceData.length && loading" trip="暂无内容" />
</template>

<script setup lang="ts">
import {
  defineProps,
  getCurrentInstance,
  ref,
  computed,
  useStore,
  useRouter,
  getUid,
  defineEmits
} from '@/utils'
import Detail2 from './detail2.vue'
import Detail3 from './detail3.vue'
import Images from '../../index/components/TalkItem/components/image.vue'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  sourceData: {
    type: Array,
    default: () => {
      return []
    }
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})
const {
  proxy
}: any = getCurrentInstance();
const emit: any = defineEmits(['chooseUser'])
const store = useStore();
const router = useRouter();
const loginuser = computed(() => store.getters['user/loginuser']);

function handleclick(param: any) {  
  emit('chooseUser', param)
}
</script>
