<template>
  <div>
    <div class="ablumimg p15"
         v-if="imgList.length">
      <ul>
        <li v-for="(item, index) in imgList"
            :key="index"
            style="width: 100px; height: 100px;"
            draggable="true"
            @dragend="handleDragEnd($event, item)"
            @dragstart="handleDragStart($event, item)"
            @dragenter="handleDragEnter($event, item)"
            @dragover.prevent="handleDragOver($event, item)">
          <img draggable="true"
               :src="item.src"
               v-if="item.status ==='complete'" />
          <div class="load1"
               v-else>
            <div class="loader">Loading...</div>
          </div>
          <div class="cover"
               style="top: 0; display: none;"><i class="iconfont icon-close removeimg"
               @click="remove(index)"></i></div>
        </li>

        <li class="upfile"
            style="width: 100px; height: 100px;"
            @click="handleclick"><i class="iconfont icon-add"></i></li>

      </ul>
    </div> <input type="file"
           id="filElem"
           accept=".jpg, .jpeg, .bmp, .gif, .png, .heif, .heic"
           multiple="multiple"
           class="FileUpload_file_27ilM"
           style="display: none"
           @change="getFile">
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
  name: 'v-Upload',
  components: {

  },
  props: {
    uploadtype: {
      type: String,
      default: 'weibo'
    }
  },
  emits: ['imgList'],
  
  setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const filElem = ref("filElem")
    let imgList: any = ref([])
    const dragging = ref(null)
    const box: any = ref(0)
    function getFile(){
      let _obj: any= document.getElementById(filElem.value);
      // var fd = new imgList();

      for(let i=0; i<_obj.files.length; i++){
        imgList.value.push({
          src: _obj.files[i].name,
          status: "upload"
        })

      let fd = new FormData()
      fd.append('upload'+i, _obj.files[i])

          store.dispatch('common/uploadImg', {
            uploadtype: props.uploadtype,
            upload: true,
            data: fd,
      }).then(res => {
        let aaa:any = imgList.value.filter((item:any) => item.status === "upload")
        aaa[0].status = "complete"
       aaa[0].src = res[0].img
        context.emit('imgList', imgList.value)
      })
      }
    }

    function handleclick(){
      let _obj: any= document.getElementById(filElem.value);
      _obj.dispatchEvent(new MouseEvent('click'))
    }
function handleDragStart (e: any, item: any) {
  dragging.value = item
  //  e.currentTarget.children[1].style.display= "none"
}
function handleDragEnd (e: any, item: any) {
  dragging.value = null
  document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
}
function handleDragOver (e: any) {
  e.dataTransfer.dropEffect = 'move'


  
}
function handleDragEnter (e: any, item: any) {
  e.dataTransfer.effectAllowed = 'move'
  


  if (item === dragging.value) {
    

    
    return
   }
   const newItems = [...imgList.value]
   const src = newItems.indexOf(dragging.value)
   const dst = newItems.indexOf(item)

   if(box.value !== dst){
     document.querySelectorAll('ul>li')[box.value].removeAttribute("class")
   }
   
   document.querySelectorAll('ul>li')[dst].setAttribute("class", "current")
  box.value = dst


  console.log(dst);
  
   newItems.splice(dst, 0, ...newItems.splice(src, 1))
   imgList.value = newItems
   context.emit('imgList', imgList.value)
}
function remove(index: any){
  imgList.value.splice(index, 1)
  context.emit('imgList', imgList.value)
}
    return {
      handleclick,
      getFile,
      imgList,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      remove
    }
  }
})
</script>

<style scoped>
.current{
  padding: 2px;
  border: 2px dashed #fff;
}
</style>
