<template>
<v-button v-model:show="isShow">
  更换头像
</v-button>
<v-dialog ref="dialog" v-model:show="isShow" :action="action" title="头像设置" :style="{width: 650, height: 550}" :data="data" :confirm="true" :cancel="true" @submit="submit">
  <template v-slot:content>
    <v-tabs :tabs="[{name: '本地上传',value: 'photos'},{name: '历史头像',value: 'background'},{name: '系统头像',value: 'banner'}]" :isEmit="true" v-model:index="index">
      <template v-slot:content1>
        <div class="setphotos">
          <div class="box-1" style="width: 410px">
            <div class="con-1" v-show="!img">
              <div class="upfile upphotos" @click="handleChoose">选择图片</div>
            </div>
            <div v-show="img">
              <canvas id="drawCanv" ref="drawCanv" class="con-2" height="360" style="display: block; width: 410px;"></canvas>
              <canvas id="cover" style="background: rgba(10, 10, 10, 0.27); position:absolute; width:150px; height:150px; border-radius: 50%"></canvas>
              <span class="relate" style=" position: absolute; bottom: 45px; padding: 5px;  border: 1px solid #333;"><span>90°旋转</span></span>
            </div>
          </div>
          <div class="box-2">
            <p>预览</p>
            <div class="oldimg"><canvas id="big" width="100" height="100" class="canvas"></canvas>
              <p>100px x 100px</p>
            </div>
            <div class="newimg"><canvas id="mid" width="50" height="50" class="canvas"></canvas>
              <p>50px x 50px</p>
            </div>
            <div class="newimg"><canvas id="small" width="30" height="30" class="canvas"></canvas>
              <p>30px x 30px</p>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:content2>
        <List className="col-md-2" />
      </template>
      <template v-slot:content3>
        <List className="col-md-2" type="system" />
      </template>
    </v-tabs>
    <!-- <div id="photostabs" class="setphotos">
      <div class="tabs-btn nav-tabs pt0">
        <span class="current" @click="handelclick('local')">本地上传</span>
        <span @click="handelclick('history')">历史头像</span>
        <span @click="handelclick('system')">系统头像</span>
      </div>
      <div class="tabs-con tab-content">
        <div class="tabsbox" style="display: block;" v-show="currentIndex === 'local'">
          <div class="box-1" style="width: 410px">
            <div class="con-1" v-show="!img">
              <div class="upfile upphotos" @click="handleChoose">选择图片</div>
            </div>
            <div v-show="img">
              <canvas id="drawCanv" ref="drawCanv" class="con-2" height="360" style="display: block; width: 410px;"></canvas>
              <canvas id="cover" style="background: rgba(10, 10, 10, 0.27); position:absolute; width:150px; height:150px; border-radius: 50%"></canvas>
              <span class="relate" style=" position: absolute; bottom: 45px; padding: 5px;  border: 1px solid #333;"><span>90°旋转</span></span>
            </div>
          </div>
          <div class="box-2">
            <p>预览</p>
            <div class="oldimg"><canvas id="big" width="100" height="100" class="canvas"></canvas>
              <p>100px x 100px</p>
            </div>
            <div class="newimg"><canvas id="mid" width="50" height="50" class="canvas"></canvas>
              <p>50px x 50px</p>
            </div>
            <div class="newimg"><canvas id="small" width="30" height="30" class="canvas"></canvas>
              <p>30px x 30px</p>
            </div>
          </div>
        </div>
        <div class="tabsbox" style="display: block; overflow: auto;" v-show="currentIndex === 'history'">
          <div class="col-md-2 appstore p5" v-for="(img, index) in history" :key="index" style="height: 95px;">
            <img :src="img" style="width: 100% ;height: 100%;" />
          </div>
        </div>
        <div class="tabsbox" style="display: block; overflow: auto;" v-show="currentIndex === 'system'">
          <div class="col-md-2 appstore p5" v-for="(img, index) in system" :key="index" style="height: 95px;">
            <img :src="img" style="width: 100% ;height: 100%;" />
          </div>
        </div>
      </div>
    </div> -->
    <input type="file" id="filElem" accept=".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic" multiple="multiple" class="FileUpload_file_27ilM" style="display: none" @change="getFile">
  </template>
</v-dialog>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  useStore,
  onMounted,
  ref
} from '@/utils'
import List from '@/views/index/album/components/list.vue'

export default defineComponent({
  name: 'HomeViewh',
  components: {
    List
  },
  props: {
    action: {
      type: String,
      default: 'add'
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
    const filElem = ref("filElem")
    const isShow = ref(false)
    let img: any = ref("")
    const drawCanv = ref(null)
    const currentIndex = ref("local")

    function getFile() {
      let _obj: any = document.getElementById(filElem.value);
      let file = _obj.files[0]

      let reader = new FileReader()
      drawCanv

      reader.onload = function () {
        img.value = reader.result
        init(reader.result);
      }
      reader.readAsDataURL(file)
    }

    //初始页面
    function init(src: any) {
      // 获取canvas内建对象
      let boximg: any = drawCanv.value;
      let canvas = boximg.getContext("2d");
      let img_width: any = "",
        img_height: any = ""
      let img = new Image()
      let xs = 0,
        ys = 0

      img.src = src;
      img.onload = () => {
        if (img.width > img.height) {
          img_width = boximg.clientWidth;
          img_height = (boximg.clientWidth * img.height) / img.width;
          xs = 0
          ys = (360 - img_height) / 2;
        } else {
          img_width = (boximg.clientWidth * img.width) / img.height;
          img_height = boximg.clientWidth;
          xs = (410 - img_width) / 2
          ys = 0;
        }
        canvas.drawImage(img, 0, 0, img.width, img.height, xs, ys, img_width, img_height);
      }

      proxy.$move.moveWindow('#cover', '.box-1', (data: any) => {
        drag(data.el, data.x, data.y);
      })
      // //旋转事件
      // $('.relate').on('click', function(){
      // 	rotate("drawCanv", 'right')
      // })

      // layer.moveWindow('cover', '.box-1', function(data){
      // 	drag(data.el,data.x,data.y);
      // });
    }

    //绘制缩略图
    function drag(box: any, x: any, y: any) {
      let c = document.querySelectorAll(box)[0];
      let ctxs = c.getContext("2d");
      let img = document.getElementById("drawCanv");
      ctxs.drawImage(img, x, y, 150, 150, 0, 0, 300, 150);

      let big: any = document.querySelectorAll("#big")[0];
      let big_canvas = big.getContext("2d");
      big_canvas.drawImage(c, 0, 0, 300, 150, 0, 0, 100, 100);

      let mid: any = document.querySelectorAll("#mid")[0];
      let mid_canvas = mid.getContext("2d");
      mid_canvas.drawImage(c, 0, 0, 300, 150, 0, 0, 50, 50);

      let small: any = document.querySelectorAll("#small")[0];
      let small_canvas = small.getContext("2d");
      small_canvas.drawImage(c, 0, 0, 300, 150, 0, 0, 30, 30);
    }

    // 选择图片
    function handleChoose() {
      let _obj: any = document.getElementById(filElem.value);
      _obj.dispatchEvent(new MouseEvent('click'))
    }

    // 保存
    function submit() {
      let cvs: any = document.querySelectorAll("#cover")[0];
      var image = new Image();
      image.src = cvs.toDataURL("image/png");
      store.dispatch('common/Fetch', {
        api: "UploadPhotos",
        data: {
          type: 0,
          root: 1,
          img: image.src,
        }
      }).then(res => {
        context.emit('update:showFlag', false)
      })
    }

    function handelclick(index: any) {
      currentIndex.value = index
      console.log("sdsd");

    }

    return {
      handleChoose,
      submit,
      getFile,
      isShow,
      img,
      drawCanv,
      handelclick,
      currentIndex,
    }
  }
})
</script>

<style lang="less" scoped>
.box-1 {
  background: #f2f2f5;
  position: relative;
  width: 360px;
  height: 360px;
  float: left;

  .con-1 {
    padding: 155px 0;
    text-align: center;
  }
}

.box-2 {
  background: #f2f2f5;
  width: 158px;
  height: 360px;
  font-size: 10px;
  color: #999;
  float: right;
  text-align: center;
}
</style>
