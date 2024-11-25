<template>
<v-button v-model:show="isShow">
  场景设置
</v-button>
<v-drawer ref="drawer" v-model:show="isShow" :style="{top: 46, width: 450}" :action="action" title="场景设置 " :submit="submit" :data="data" :param="detail" :render="render">
  <template v-slot:content v-if="isShow">
    <ul class="three-list">
      <li class="flex mb10">
        <span class="label">名称</span>
        <input type="text" v-model="basicInfo.name" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">前景</span>
        <input type="text" v-model="basicInfo.color" class="input-sm input-full" />
      </li>
      <li class="flex mb10">
        <span class="label">背景</span>
        <input type="text" v-model="basicInfo.background_color" class="input-sm input-full" />
      </li>
      <li class="mb10">
        <span class="label">语音</span>
        <input type="checkbox" :value="basicInfo.vs" :checked="basicInfo.cs == '1' ? true: false" @change="handleChange($event, basicInfo)" />
        <ul class="three-list" style="background: #333;">
            <li class="flex mb10">
              <span class="label">音频</span>
              <div style="display: flex">
                <div style="flex: 1;">文件名: 
                  <!-- <span class="ml10" >
                    <i class="iconfont" :class="`icon-${1 ? 'stop' : 'play1'}`" />
                  </span> -->
                </div>
                <div class="cl-red pointer" style=" width: 60px; text-align: right" >重新上传</div>
              </div>
            </li>
            <li class="flex mb10">
              <span class="label">话术</span>
              <textarea v-model="basicInfo.name1" placeholder="请输入话术" class="w-full"></textarea>
            </li>
          </ul>
      </li>
    </ul>
  </template>
</v-drawer>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  ref,
  watch,
  computed,
  useStore,
  codings
} from '@/utils'

const {
  proxy
}: any = getCurrentInstance();
const isShow: any = ref(false)
const coding = codings.three.scene
const showGraph = ref(false)
const dataList: any = ref([])
const drawer: any = ref(null)
const List: any = ref([])
const speech_lib: any = ref([])
const checkedList: any = ref([])

const store = useStore()
const basicInfo = computed(() => store.getters['three/config'].home);

// 监听弹窗变量
watch(basicInfo, (newValues, prevValues) => {
  store.commit('three/setSceneConfig')
}, {
  deep: true
})

function submit(){
  const { id, name, color, background_color } = basicInfo.value

  store.dispatch('common/Fetch', {
    api: "Update",
    data: {
      coding: coding,
      id,
      name,
      color,
      background_color
    }
  }).then(res => {
    isShow.value = false
    proxy.$hlj.message({
      type: 'info',
      msg: "保存成功"
    })
  })
}
</script>
