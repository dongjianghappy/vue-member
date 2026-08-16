<template>
    <div class="mb10 p15" style="background: var(--card-background);">
        <div class="edit-list">
            <div class="li flex">
                <div style="flex: 1">
                    <span v-if="isRoot ==='0'">{{data.name}}</span>
                </div>
                <div class="mr15"><v-album :data="data.image" v-model:value="data.cover" :style="{width: '160px', height: '120px'}" /></div>
                <div class="mr15">
                    <ChooseUser ref="chooseuser" :userList="data.userList" @choose="choose($event, data, index)" />
                </div>
                <div @click="handleRemove(data)" v-if="isRoot === '0'">移除</div>
            </div>
            <div class="li mtb10">
                <div class="flex" style="flex-wrap: wrap;">
                    <div class="relative p5 align_center" style="width: 70px; height: 80px" v-for="(user, i) in data.userList" :key="i">
                        <v-deleteicon :dataList="data.userList" field="id" :data="{id: user.id}" />
                        <div>
                            <img :src="user.photo" onerror="this.src='/images/head_normal_100.png'" style="width: 50px; height: 50px; border-radius: 50%;">
                        </div>
                        <div class="font12 nowrap">{{`${user.name}`}}</div>
                    </div>
                </div>
            </div>
            <div class="li mtb10">
                <img :src="data.cover" onerror="this.src='/images/noimage.png'" class="radius-4" style="width: 100%; height: 150px;" />
            </div>
            <div class="li mb15">
                <div class="label">日程内容</div>
                <textarea v-model="data.content" style="height: 80px" placeholder="请输入日程内容" class="w-full"></textarea>
            </div>
            <div class="li mb15" v-for="(item, index) in formList" :key="index">
                <div class="label">{{item.remark}}
                    <span v-if="item.unit">({{item.unit}})</span>
                </div>
                <input placeholder="请输入" type="text" v-model="data[item.name]" class="input-sm input-full" v-if="item.text_type === 'input'" />
                <div v-else-if="item.text_type === 'select'">
                    <v-select :enums="item.enums" v-model:value="data[item.name]" :defaultValue="'0'" />
                </div>
                <div class="flex" v-else-if="item.text_type === 'time'">
                    <div style="flex: 1">
                        <input v-model="data[item.name]" type="text" placeholder="请输入开始时间" class="input-sm w-full" />
                    </div>
                    <div class="w250 pl10"><v-timepicker :data="data" :attr="item.name" /></div>
                </div>
                <div v-else-if="item.text_type === 'location'">
                    <span class="mr10" v-if="data[item.name]">{{data[item.name]}}</span>
                    <v-location @onLocaltion="(e)=>data[item.name] = e" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore,
  inject,
  computed,
  defineEmits
} from '@/utils'
import ChooseUser from '../../../close_friend/components/chooseUser.vue'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  isRoot: {
    type: String,
    default: '0'
  },
  index: {
    type: Number,
    default: 0
  },
  formList: {
    type: Array,
    default: []
  }
})
const emit: any = defineEmits(['index'])
const userList: any = ref([])
const chooseuser: any = ref(null)

function choose(param: any){
  let index = props.data.userList.findIndex((item: any) => item.id === param.id)
  if(index === -1){
    props.data.userList.push(param)
  }else{
    props.data.userList.splice(index, 1)
  }  

  chooseuser.value.setStatus()
  let friend_id = []
  for(let i=0; i<props.data.userList.length; i++){
    friend_id.push(props.data.userList[i].id)
  }
  props.data.friend_id = `|${friend_id.join("|")}|`
}

function handleRemove(param: any){
  emit('remove', param)
}
</script>
