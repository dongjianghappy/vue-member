<template>
  <div v-if="isShow"
       id="detail"
       class="layer"
       style="width: 450px; height: 380px; top: 55px; left: 534.5px; display: block; z-index: 9001; opacity: 1;">
    <div id="msgtitle"
         ref="dialog"
         class="layer-title"
         @mousedown="mousedown"><span>{{title}}</span></div><span id="close"
          class="layer-close"
          @click="handleCancel">关闭</span>
    <div id="msgcon"
         class="layer-content"
         style="height: 140px;">
      <slot name="content"></slot>
    </div>
    <!-- <div class="layer-btngroup">
      <v-button @onClick="handleClick">转载</v-button>
    </div> -->

  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'

export default defineComponent({
  name: 'v-Search',
  props: {
    title: {
      type: String,
      default: "标题"
    },
    isShow: {
      type: Boolean,
      default: true
    }
  },
  mounted(){
    this.moveWindow("detail", "", "")
  },
  emits: ['close', 'submit'],
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const detail: any = ref("detail")
    const dialog: any = ref("dialog")

    function handleCancel(){
      context.emit('close')
    }
    function handleClick(){
      context.emit('submit')
    }

		function moveWindow(obj: any, docs: any, callback: any){
			let doc = document
			let _z=9000;//新对象的z-index
			let _mv=false;//移动标记
			let _x: any ,_y: any;//鼠标离控件左上角的相对位置		
			let _obj: any= document.getElementById(detail.value);
			let _wid: any= _obj?.style.width;
			let _hei: any= _obj?.style.height;

		

				let _tit: any = document.getElementById("msgtitle")

				let docE =doc.documentElement;
				let left=(docE.clientWidth-parseInt(_wid))/2;
				let top =(docE.clientHeight-parseInt(_hei))/2;
		
			_obj.style.cssText=`left: ${left}px; top: ${top}px; display: block; z-index: ${_z-(-1)}`;
			//obj.css({	"left":_left,"top":_top,"display":"block","z-index": "10000"});
			_tit.onmousedown = function(e: any){
				_mv=true;
				_x=e.pageX-parseInt(_obj.style.left);//获得左边位置
				_y=e.pageY-parseInt(_obj.style.top);//获得上边位置
				//_obj.css({	"z-index":_z-(-1)}).fadeTo(50,.5);//点击后开始拖动并透明显示	
			}
			_obj.onmouseup = function(e: any){
				_mv=false;			 
			};
			
			document.onmousemove = function(e: any){
				if(_mv){
					let x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
					if(x<=0){x=0}
					x=Math.min((doc == document ? docE.clientWidth : docE.clientWidth)-parseInt(_wid),x);
					let y=e.pageY-_y;
					if(y<=0){y=0}
					y=Math.min((doc == document ? docE.clientHeight : docE.clientHeight)-parseInt(_hei),y);
          _obj.style.top = y+"px"
          _obj.style.left = x+"px"
        //控件新位置
					
					if(doc != document){
						callback({
							el: obj,
							x: x,
							y: y	
						});
					}
				}
			}
		}

    
    return {
      handleClick,
      handleCancel,
      moveWindow,
      detail,
      dialog
    }
  }
})
</script>
