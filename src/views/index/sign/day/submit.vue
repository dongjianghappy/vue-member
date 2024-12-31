<template>
  <div class="flex absolute" style="top: 10px; left: 730px">
    <div style="width: 100px;">
      <span class="font16 left" @click="handleBack">
        <i class="iconfont icon-back font20" />
      </span>
    </div>
    <div id="imgs" class="p0 align_center" style="flex: 1;">
      <div class="inline relative" style="width: 500px; height: 400px">
        <img :src="data.image" onerror="this.src='/images/default.jpg'" style="width: 500px; height: 400px;" />
        <div class="upfile absolute" style="left: 25px;
  top: 25px;
  right: 25px;
  bottom: 25px; border: 1px dashed #fff; line-height: 380px;" :style="{display: !hideCamera ? 'block' : 'none'}" @click="handleChoose">
          <i class="iconfont icon-camera font24 cl-white" />
        </div>
        <input type="file" id="filElem" accept=".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic" multiple="multiple" class="FileUpload_file_27ilM" style="display: none" @change="getFile">
      </div>
      <div class="p15 font16 inline align_left" style="width: 500px; height: 80px; box-shadow: 0 1px 3px rgba(27, 95, 160, 0.1) !important;">
        <div class="relative" style="height: 30px;">
          <span class="absolute" style="left: 0px; bottom: 20px">
            <span class="font32 bold">{{monthAbbr}} / </span>
            <span class="font14">{{today}}</span>
          </span>
        </div>
        <div>
          <div contenteditable="true" class="inline" style="width: 90%">{{currentText || data.name}}</div>
          <i class="iconfont icon-refresh1 font24 right" :style="{display: !hideCamera ? 'block' : 'none'}" @click="handleRefresh" v-if="data.bind && data.bind.length > 1" />
        </div>
      </div>
    </div>
    <div class="relative" style="width: 100px;">
      <button class="btn btn-send absolute" @click="save(data)" style="right: -25px; bottom: 0px">发表</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import html2canvas from 'html2canvas'
import {
  getCurrentInstance,
  defineEmits,
  ref,
  useStore
} from '@/utils'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
    const {
      proxy
    }: any = getCurrentInstance();
    const emit: any = defineEmits(['onBack'])
    const store = useStore();
    const date: any = new Date()
    const today = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    const filElem: any = ref("filElem")
    const dataUrl: any = ref("")
    const hideCamera: any = ref(false)
    const currentText: any = ref("")

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let monthIndex = date.getMonth();
    let monthAbbr = months[monthIndex];

    function handleBack() {
      emit('onBack', {
        isSelect: false
      })
    }

    // 选择图片
    function handleChoose() {
      let _obj: any = document.getElementById(filElem.value);
      _obj.dispatchEvent(new MouseEvent('click'))
    }

    function getFile() {
      let _obj: any = document.getElementById(filElem.value);
      let file = _obj.files[0]

      let reader = new FileReader()
      reader.onload = function () {
        props.data.image = reader.result
      }
      reader.readAsDataURL(file)
    }

    function handleRefresh() {
      let current = props.data.bind[Math.floor(Math.random() * props.data.bind.length)]
      currentText.value = current.name
    }

    // 提交
    async function save(param: any) {
      const dom: any = document.getElementById("imgs")
      hideCamera.value = true
      setTimeout(async () => {
        await html2canvas(dom, {
          allowTaint: true,
          useCORS: true
        }).then(canvas => {
          store.dispatch('common/Fetch', {
            api: 'Sign',
            data: {
              image: canvas.toDataURL('image/png'),
              year: date.getFullYear(),
              month: date.getMonth() + 1,
              day: date.getDate(),
              summary: param.name
            }
          }).then(res => {
            proxy.$hlj.message({
              type: 'info',
              msg: '签到成功！'
            })
          })
          hideCamera.value = false
        });
      }, 10)
    }
</script>
