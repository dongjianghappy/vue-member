<template>
  <v-dialog title="头像设置"
            width="650px"
            height="550px"
            :confirm="true"
            :cancel="true"
            @submit="submit"
            v-model:isShow="isShow">
    <template v-slot:content>
      <div class="layer-content pt0"
           style="height: 450px;">
        <div id="photostabs"
             class="setphotos">
          <div class="tabs-btn nav-tabs pt0">
            <span class="current"
                  @click="handelclick('local')">本地上传</span>
            <span @click="handelclick('history')">历史头像</span>
            <span @click="handelclick('system')">系统头像</span>
          </div>

          <div class="tabs-con tab-content">
            <div class="tabsbox"
                 style="display: block;"
                 v-show="currentIndex === 'local'">
              <div class="box-1"
                   style="width: 410px">
                <div class="con-1"
                     v-show="!img">
                  <div class="upfile upphotos"
                       @click="handlechoose">选择图片</div>
                </div>
                <div v-show="img">
                  <canvas id="drawCanv"
                          ref="drawCanv"
                          class="con-2"
                          height="360"
                          style="display: block; width: 410px;"></canvas>
                  <canvas id="cover"
                          style="background: rgba(10, 10, 10, 0.27); position:absolute; width:150px; height:150px; border-radius: 50%"></canvas>
                  <span class="relate"
                        style=" position: absolute; bottom: 45px; padding: 5px;  border: 1px solid #333;"><span>90°旋转</span></span>
                </div>
              </div>

              <div class="box-2">
                <p>预览</p>
                <div class="oldimg"><canvas id="big"
                          width="100"
                          height="100"
                          class="canvas"></canvas>
                  <p>100px x 100px</p>
                </div>
                <div class="newimg"><canvas id="mid"
                          width="50"
                          height="50"
                          class="canvas"></canvas>
                  <p>50px x 50px</p>
                </div>
                <div class="newimg"><canvas id="small"
                          width="30"
                          height="30"
                          class="canvas"></canvas>
                  <p>30px x 30px</p>
                </div>
              </div>
            </div>
            <div class="tabsbox"
                 style="display: block; overflow: auto;"
                 v-show="currentIndex === 'history'">

              <div class="col-md-2 appstore p5"
                   v-for="(img, index) in history"
                   :key="index"
                   style="height: 95px;">
                <img :src="img"
                     style="width: 100% ;height: 100%;" />
              </div>

            </div>
            <div class="tabsbox"
                 style="display: block; overflow: auto;"
                 v-show="currentIndex === 'system'">
              <div class="col-md-2 appstore p5"
                   v-for="(img, index) in system"
                   :key="index"
                   style="height: 95px;">
                <img :src="img"
                     style="width: 100% ;height: 100%;" />
              </div>
            </div>
          </div>
        </div>
        <input type="file"
               id="filElem"
               accept=".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic"
               multiple="multiple"
               class="FileUpload_file_27ilM"
               style="display: none"
               @change="getFile">
      </div>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, ref, watch } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'v-Search',
  props: {
     showFlag: {
      type: Boolean,
      default: false
    },   
  },
  emits: ['update:showFlag'],
  setup(props,context) {
    const {ctx, proxy}:any = getCurrentInstance();
    const store = useStore();
    const isShow = ref(props.showFlag)
    const filElem = ref("filElem")
    let img: any = ref("")
    const drawCanv = ref(null)
    const currentIndex = ref("local")
    const history: any =ref([])
    const system: any = ref([])

     // 监听弹窗变量
    watch([isShow], (newValues, prevValues) => {
      context.emit('update:showFlag', false)
    })   

    function getFile(){
      let _obj: any= document.getElementById(filElem.value);
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
		function init(src: any){
      debugger
			// 获取canvas内建对象
			let boximg: any = drawCanv.value;
			let canvas = boximg.getContext("2d");
			let img_width: any = "", 	img_height: any =""
			let img=new Image()
      let xs = 0, ys = 0


			img.src=src;			
      img.onload = () => {
        if(img.width>img.height){
          img_width = boximg.clientWidth;
          img_height = (boximg.clientWidth*img.height)/img.width;
          xs = 0
          ys = (360-img_height)/2;
        }else{
          img_width = (boximg.clientWidth*img.width)/img.height;
          img_height = boximg.clientWidth;
          xs = (410-img_width)/2
          ys = 0;
        }
        debugger
        canvas.drawImage(img,0,0, img.width, img.height, xs, ys, img_width, img_height);
      }

      
      proxy.$move.moveWindow('#cover', '.box-1', (data: any) => {
				drag(data.el,data.x,data.y);
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
		function drag(box: any, x: any, y: any){
			let c = document.querySelectorAll(box)[0];
      debugger
			let ctxs=c.getContext("2d");
			let img=document.getElementById("drawCanv");
			ctxs.drawImage(img,x,y,150,150,0,0,300,150);
			
			let big: any =document.querySelectorAll("#big")[0];
			let big_canvas=big.getContext("2d");
			big_canvas.drawImage(c,0,0,300,150,0,0,100,100);	
			
			let mid: any =document.querySelectorAll("#mid")[0];
			let mid_canvas=mid.getContext("2d");
			mid_canvas.drawImage(c,0,0,300,150,0,0,50,50);
			
			let small: any =document.querySelectorAll("#small")[0];
			let small_canvas=small.getContext("2d");
			small_canvas.drawImage(c,0,0,300,150,0,0,30,30);
		}    

    // 选择图片
    function handlechoose(){
      let _obj: any= document.getElementById(filElem.value);
      _obj.dispatchEvent(new MouseEvent('click'))
    }    

    // 保存
    function submit(){
      let cvs: any = document.querySelectorAll("#cover")[0];
      var image = new Image();
      image.src = cvs.toDataURL("image/png");
      debugger
      store.dispatch('common/Fetch', {
          api:"UploadPhotos",
          data: {
            type: 0,
            root: 1,
            img: image.src,
          }
      }).then(res => {
        context.emit('update:showFlag', false)
      })
    }

    function handelclick(index: any){
      currentIndex.value = index
      console.log("sdsd");
      
    }

    function getData(){
      store.dispatch('common/Fetch', {
          api:"GetHistoryPhotos",
          data: {
           type: "history"
          }
      }).then(res => {
        history.value = res.result
        
      })

      store.dispatch('common/Fetch', {
          api:"GetHistoryPhotos",
          data: {
           type: "system"
          }
      }).then(res => {
        system.value = res.result
        
      })      
    }

    onMounted(getData)
    return {
      handlechoose,
      submit,
      getFile,
      isShow,
      img,
      drawCanv,
      handelclick,
      currentIndex,
      history,
      system
    }
  }
})
</script>
