const install = (Vue:any) => {
  Vue.config.globalProperties.$move = {

    moveWindow(obj: any, docs: any, callback: any){
			let docE: any = ""
			const _z=9000;//新对象的z-index
			let _mv=false;//移动标记
			let _x: any ,_y: any;//鼠标离控件左上角的相对位置		
			const _obj: any= document.querySelectorAll(obj)[0];
			const _wid: any= _obj?.style.width;
			const _hei: any= _obj?.style.height;
      let _tit: any = ""
      
      if(docs !== document){
        docE = document.querySelectorAll(docs)[0];
        _tit = _obj
      }else{
        docE = docs.documentElement;
        _tit = document.getElementById("msgtitle")
      }

      
      const left=(docE.clientWidth-parseInt(_wid))/2;
      const top =(docE.clientHeight-parseInt(_hei))/2;
		
			// _obj.style.cssText=`left: ${left}px; top: ${top}px; display: block; z-index: ${_z-(-1)}`;
      _obj.style.left = left+"px"
      _obj.style.top = top+"px"
      _obj.style.zIndex = _z-(-1)
      _obj.style.display = "block"



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
					x=Math.min((docs == document ? docE.clientWidth : docE.clientWidth)-parseInt(_wid),x);
					let y=e.pageY-_y;
					if(y<=0){y=0}
					y=Math.min((docs == document ? docE.clientHeight : docE.clientHeight)-parseInt(_hei),y);
          _obj.style.top = y+"px"
          _obj.style.left = x+"px"
        //控件新位置
					
					if(docs != document){
						callback({
							el: obj,
							x: x,
							y: y	
						});
					}
				}
			}
		}


  }
}

export default install