<template>
<v-button v-model:show="isShow">
  <span style="color: var(--color-primary)"><i class="iconfont icon-feedback font18" />签到</span>
</v-button>
<v-dialog v-model:show="isShow" ref="form" title="" :style="{width: 800, height: 600}" :hasfooter="false">
  <template v-slot:content>
    <v-tabs :tabs="[{name: '每日一签'}, {name: '本月查看'}]" style="">
      <template v-slot:content1>
        <div class="relative" style="height: 530px; overflow: hidden;">
          <div :class="{'animation-left': isSelect, 'animation-right': !isSelect}">
            <perfect-scrollbar>
            <div style="height: 450px;">
              <div class="col-md-4 pb20 plr10" v-for="(item, index) in dataList" :key="index">
                <div style="border: 1px solid #f0f0f0;">
                  <div class="bg-f7f8fa align_center" style="height: 150px;" @click="handleClick(item)">
                    <img :src="item.image" style="width: 100%; height: 150px;" /></div>
                  <div class="p5 font12 relative">
                    <span class="absolute" style="left: 5px; bottom: 32px">
                      <span class="font28 bold">{{monthAbbr}} / </span>
                      <span class="font14">{{today}}</span>
                    </span>
                    <div class="mt15 nowrap">{{item.name}}</div>
                  </div>
                </div>
              </div>
            </div>
            </perfect-scrollbar>
            <div class="absolute" style="top: 10px; left: 730px">
              <div class="flex">
                <div style="width: 100px;">
                  <span class="font16 left" @click="handleBack">
                    <i class="iconfont icon-back font20" />
                  </span>
                </div>
                <div id="imgs" class="p0 align_center" style="flex: 1;">
                  <div class="inline relative" style="width: 500px; height: 400px">
                    <img ref="pic" :src="currentSign.image" style="width: 500px; height: 400px;" />
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
                      <div contenteditable="true" class="inline" style="width: 90%">{{currentText || currentSign.name}}</div>
                      <i class="iconfont icon-refresh1 font24 right" :style="{display: !hideCamera ? 'block' : 'none'}" @click="handleRefresh" />
                    </div>
                  </div>
                </div>
                <div class="relative" style="width: 100px;">
                  <button @click="save(currentSign)" class="btn btn-default cl-white absolute" style="background: #ffc09f; border-radius: 4px; right: -25px; bottom: 0px">发表</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:content2>
        <v-calendar @changeMonth="changeMonth" @changeDay="changeDay" :style="{
          'height': '50px',
          'line-height': '30px'
        }">
          <template v-slot:default="row">
            <template v-for="(item, index) in calendarData" :key="index">
              <div class="data-list font12" :class="{day: item.status}" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">

                <div class="cl-green" v-if="item.sign == 'true'">已签</div>
                <template v-else>
                  <div class="cl-ccc" v-if="item.status">未签</div>
                  <div class="cl-ccc" v-else>未签</div>
                </template>
              </div>
            </template>
          </template>
        </v-calendar>
      </template>
    </v-tabs>

  </template>
</v-dialog>
</template>

<script lang="ts">
import Img from '@/components/public/img.vue'
import html2canvas from 'html2canvas'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
  codings
} from '@/utils'
import {
  useStore
} from 'vuex'
export default defineComponent({
  name: 'HomeViewh',
  components: {
    Img

  },
  props: {
    group: {
      type: Object,
      default: () => {
        return {}
      }
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
  },
  setup(props, context) {
    const {
      proxy
    }: any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(false)
    const coding = codings.sign
    const calendarData = ref([])
    const date: any = new Date()
    const currentData = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    const today = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`
    const dataList: any = ref([])
    const currentSign: any = ref({})
    const upload: any = ref(null);
    const img: any = ref("")
    const cover: any = ref(null)
    const pic: any = ref(null)
    const filElem = ref("filElem")
    const dataUrl: any = ref("")
    const hideCamera = ref(false)
    const currentText: any = ref("")
    const isSelect: any = ref(false)

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let monthIndex = date.getMonth();
    let monthAbbr = months[monthIndex];

    // 监听
    watch([isShow], async (newValues, prevValues) => {
      if (isShow.value) {
        currentSign.value = {}
        isSelect.value = false
        let date: any = new Date()
        init({
          year: date.getFullYear(),
          month: date.getMonth() + 1
        })
      }
    })

    function init(param: any = {}) {
      store.dispatch('common/Fetch', {
        api: "Calendar",
        data: {
          type: 'sign',
          ...param
        }
      }).then((res: any) => {
        calendarData.value = res.result
      })

      store.dispatch('common/Fetch', {
        api: 'signDay'
      }).then(res => {
        dataList.value = res.result
      })
    }

    function changeMonth(data: any) {
      init({
        year: data.fullYear,
        month: data.month
      })
    }

    function handleClick(param: any) {
      currentSign.value = param
      currentText.value = ""
      isSelect.value = true
    }

    function handleBack() {
      isSelect.value = false
    }

    // 选择图片
    function handleChoose() {
      let _obj: any = document.getElementById(filElem.value);
      _obj.dispatchEvent(new MouseEvent('click'))
    }

    function changeDay(data: any) {

      if (currentData !== `${data.fullYear}-${data.month}-${data.day}`) {
        return
      }

      store.dispatch('common/Fetch', {
        api: 'Sign',
        data: {
          year: data.fullYear,
          month: data.month,
          day: data.day
        }
      }).then(res => {
        proxy.$hlj.message({
          msg: res.result.msg
        })

        init({
          year: data.fullYear,
          month: data.month
        })
      })
    }

    function getFile() {
      let _obj: any = document.getElementById(filElem.value);
      let file = _obj.files[0]

      let reader = new FileReader()
      reader.onload = function () {
        currentSign.value.image = reader.result
      }
      reader.readAsDataURL(file)
    }

    // 设置图片
    function image(a: any) {
      img.value = a
    }

    function handleRefresh() {
      let current = currentSign.value.bind[Math.floor(Math.random() * currentSign.value.bind.length)]
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
              msg: res.result.msg
            })

          })
          hideCamera.value = false
        });
      }, 10)

    }

    return {
      isShow,
      currentData,
      changeMonth,
      changeDay,
      calendarData,
      dataList,
      handleClick,
      currentSign,
      handleBack,
      image,
      upload,
      save,
      cover,
      pic,
      monthAbbr,
      today,
      handleChoose,
      getFile,
      hideCamera,
      handleRefresh,
      currentText,
      isSelect
    }
  }
})
</script>

<style lang="less" scoped>
.ps {
  height: 480px;
}
.data-list {
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 5px;
  padding-top: 22px;

  &.day {
    border: 1px dashed #f67f00;
  }
}

.animation-left {
  transition: .5s, ;
  /* transform: rotateX('-300px'); */
  transform: translateX(-730px)
}

.animation-right {
  transition: .5s, ;
  /* transform: rotateX('-300px'); */
  transform: translateX(0px)
}
</style>
