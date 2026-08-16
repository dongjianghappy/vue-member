<template>
    <v-popover :content="title" arrow="tb" offset="right" :move="-400" keys="popover-choose-user" @onClick="handleclick">
        <div style="width: 455px; height: 260px;">
            <template v-if="dataList.length">
                <div class="module-wrap">
                    <div class="module-content plr15" style="height: 205px; overflow-y: auto;">
                        <div class="flex" style="flex-wrap: wrap;">
                            <div class="relative p5 align_center" style="width: 70px; height: 80px" v-for="(item, index) in dataList" :key="index" @click="handleChoose(item)">
                                <v-righticon v-if="item.isChoose === 1" />
                                <div>
                                    <img :src="item.photos" onerror="this.src='/images/head_normal_100.png'" style="width: 50px; height: 50px; border-radius: 50%;">
                                </div>
                                <div class="font12 nowrap">{{`${item.nickname}`}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <v-loding v-else />
        </div>
    </v-popover>
</template>

<script setup lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  getUid,
  watch,
  defineEmits,
  defineProps,
  defineExpose
} from '@/utils'
import {
  useStore
} from 'vuex'

const emit: any = defineEmits(['choose'])
const props: any = defineProps({
  title: {
    type: String,
    default: "选择好友"
  }
})
const store = useStore();
const dataList: any = ref([])

function handleChoose(param: any) {
  emit('choose', param)
}

function handleclick() {
  store.dispatch('common/Fetch', {
  api: 'scheduleBindRoster',
  data: {
    id: 24
  }
}).then((res: any) => {
  dataList.value = res.result
})
}
</script>
