<template>
<v-button v-model:show="isShow">
  <span style="color: var(--color-primary)" v-if="action == 'add'">添加</span>
  <span v-else><icon class="iconfont icon-edit"  />编辑</span>
</v-button>
<v-dialog v-model:show="isShow" ref="dialog" :title="action === 'add' ? '添加亲密好友' : '好友设置'" action="edit" :data="data" :style="{width: 650, height: 500}" @submit="submit">
  <template v-slot:content>
    
    <div class="form-wrap-box relative" style="height: 380px; overflow: auto;">
        <div class="plr15 absolute" style="width:100px; top: 0; right: 0; z-index: 100">
              <div class="align_center" v-if="action === 'edit'">
                <img class="radius-4" :src="detail.photo" onerror="this.src='/images/head_normal_100.png'"  style="width: 100%;" />
                <div class="m25">
                  <UploadPhoto :data="detail" @uploadPhoto="uploadPhoto" />
                </div>
              </div>
            </div>
      <div class="li">
        <span class="label">姓名</span>
        <input v-model="detail.name" placeholder="请输入好友姓名" type="text" class="input-sm input-250" />
      </div>
      <div class="li">
        <span class="label">性别</span>
                  <input name="sex" type="radio" value="1" class="sex" v-model="detail.sex"> 男&nbsp;&nbsp;
          <input name="sex" type="radio" value="0" class="sex" v-model="detail.sex"> 女
      </div>
            <div class="li">
        <span class="label">生日</span>
        <v-birthday :data="{year: detail.year, month: detail.month, day: detail.day}" @choose="chooseBirthday" />
      </div>
            <div class="li">
        <span class="label">籍贯</span>
        <v-citylist :data="{province: detail.province, city: detail.city, area: detail.area}" @choose="chooseArea" />
      </div>

            <div class="li">
        <span class="label">微信</span>
        <input v-model="detail.weixin" placeholder="请输入微信" type="text" class="input-sm input-full" />
      </div>
            <div class="li">
        <span class="label">电话</span>
        <input v-model="detail.phone" placeholder="请输入电话" type="text" class="input-sm input-full" />
      </div>
            <div class="li">
        <span class="label">QQ</span>
        <input v-model="detail.qq" placeholder="请输入QQ" type="text" class="input-sm input-full" />
      </div>
                  <div class="li">
        <span class="label">单位</span>
        <input v-model="detail.unit" placeholder="请输入单位" type="text" class="input-sm input-full" />
      </div>
            <div class="li">
        <span class="label">职业</span>
        <input v-model="detail.industry" placeholder="请输入职业" type="text" class="input-sm input-full" />
      </div>

      <div class="li">
      <span class="label">认识日期</span>
        <input v-model="detail.know_time" type="text" placeholder="请输入认识日期" class="input-sm input-100" />
        <v-timepicker :data="detail" attr="know_time" />
      </div>
            <div class="li">
        <span class="label">认识地点</span>
        <input v-model="detail.know_address" placeholder="请输入认识地点" type="text" class="input-sm input-full" />
      </div>
                  <div class="li">
        <span class="label">认识说明</span>
        <textarea v-model="detail.introduction" placeholder="请输入说明" class="w-full"></textarea>
      </div>
      <div class="li">
        <span class="label">住址</span>
        <textarea v-model="detail.address" placeholder="请输入住址" class="w-full"></textarea>
      </div>
      
    </div>
  </template>
</v-dialog>
</template>

<script setup lang="ts">
import {
  defineProps,
  ref,
  watch,
  useStore
} from '@/utils'
import UploadPhoto from './uploadPhoto.vue'
const props: any = defineProps({
  action: {
    type: String,
    default: 'add'
  },
  coding: {
    type: String,
    default: ""
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  render: {
    type: Function,
    default: () => {
      return 'Default function'
    }
  }
})
const store = useStore();
const isShow = ref(false)
const dialog: any = ref(null)
const detail: any = ref({})

// 监听
watch([isShow], async (newValues, prevValues) => {
  if (isShow.value) {
    detail.value = await dialog.value.init()
  }
})

function chooseBirthday(param: any) {
  detail.value.year = param.year
  detail.value.month = param.month
  detail.value.day = param.day
}

function chooseArea(param: any) {
  detail.value.province = param.province
  detail.value.city = param.city
  detail.value.area = param.area
}

function uploadPhoto(param: any){
  detail.value.photo = param
}

function submit(params: any) {
  const {
    id,
    name,
    sex,
    photo
  } = detail.value
  
  let photoArr = photo.split("/")
  if(photoArr.length > 1){
    detail.value.photo = photoArr[photoArr.length-1]
  }

  const param: any = {
    ...detail.value,
    coding: props.data.coding
  }

  store.dispatch('common/Fetch', {
    api: props.action === 'add' ? "Insert" : 'Update',
    data: {
      ...param,
    }
  }).then(() => {
    props.render()
    isShow.value = false
  })
}
</script>
