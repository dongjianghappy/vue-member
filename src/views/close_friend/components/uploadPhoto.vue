<template>
  <v-button v-model:show="isShow">
    更换头像
  </v-button>
  <v-dialog ref="dialog"
            v-model:show="isShow"
            :style="{width: 690, height: 620}"
            :confirm="true"
            :cancel="true"
            @submit="submit">
    <template v-slot:content>
      <v-tabs :tabs="[{name: '本地上传',value: 'photos'}]"
              :isEmit="true"
              v-model:index="index">
        <template v-slot:content1>
          <div class="setphotos">
            <div class="box-1"
                 style="width: 450px">
              <v-listsss ref="aaaaaaaaa"
                         @value="(d)=>src=d"
                         :style="{width: 450, height: 450}"
                         kind="photos"
                         :size="{width: 400, height: 400}"
                         :mask="{ w: 425, h: 425, tb: 25, lr: 25 }" />
            </div>
            <div class="box-2">
              <p class="ptb10">预览</p>
              <div class="mb25">
                <img class="inline"
                     :src="src"
                     style="width: 120px; height: 120px; border-radius: 50%;">
                <p>120px x 120px</p>
              </div>
              <div class="mb25">
                <img class="inline"
                     :src="src"
                     style="width: 60px; height: 60px; border-radius: 50%;">
                <p>60px x 50px</p>
              </div>
              <div>
                <img class="inline"
                     :src="src"
                     style="width: 40px; height: 40px; border-radius: 50%;">
                <p>40px x 40px</p>
              </div>
            </div>
          </div>
        </template>
        
      </v-tabs>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  defineComponent,
  useStore,
  ref,
  defineEmits
} from '@/utils'
const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const emit: any = defineEmits(['uploadPhoto'])

    const store = useStore();
    const isShow: any = ref(false)
    let src: any = ref("")
    const aaaaaaaaa: any = ref(null)
    

    // 保存
    function submit() {
      let src = aaaaaaaaa.value.cutPicture()
      store.dispatch('common/Fetch', {
        api: "UploadPhotos",
        data: {
          id: props.data.id,
          uploadType: "friend",
          root: 1,
          img: src,
        }
      }).then(res => {
        isShow.value = false
        emit('uploadPhoto', res.result)
      })
    }
</script>

<style scoped>
.box-1 {
  background: #f2f2f5;
  position: relative;
  width: 360px;
  height: 450px;
  float: left;
}

.box-2 {
  background: #f2f2f5;
  width: 158px;
  height: 450px;
  font-size: 10px;
  color: #999;
  float: right;
  text-align: center;
}
</style>
