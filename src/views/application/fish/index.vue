<template>
<div class="height-max position-f bb" :class="position">
  <div class="position-r radius-10">
    <ul>
    <template v-for="(item,index) in dataList" :key="index">
      <template v-if="item.count > '1'">
          <li :style="b(index)">
              <div :class="item.image" v-for="(list, i) in parseInt(item.count)" :key="i"></div>
          </li>
      </template>
      <template v-else>
          <li  :style="b(index)"><div :class="item.image"></div></li>
      </template>
    </template>
    </ul>
  </div>
</div>
</template>
<script setup lang="ts">

import { ref, toRefs,computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const props: any = defineProps({
  position: {
    type: String,
    default: 'fixed'
  }
})

const store = useStore()
const { userInfo } = toRefs(store.state)


const showModel = ref(true)
const comeIn = ref(true)

const dataList: any = ref([])

function deg(obj:any,start:any,end:any,m:any,m2:any){
    var x = end.x-start.x
    var y = end.y-start.y
    var deg = 360*Math.atan(x/y)/(2*Math.PI)
    var deg2 = 0

    if(m<0 && m2<0){
      deg2 = deg+180
    }

    if(m>0 && m2<0){
      deg2 = deg
    }

    if(m<0 && m2>0){
      deg2 = deg+180
    }

    if(m>0 && m2>0){
      deg2 = deg
    }

    // 判断水母多加90度
    if(obj && obj.image == 'fish7'){
      deg2 = deg2+90
    }

    return `${deg2}deg`

}

const dom = document.querySelector("body")


const handleClose = (event: any) => {
  event.stopPropagation(); // 阻止事件传播
  showModel.value = false
}

async function handleModel() {
  showModel.value = true
  comeIn.value = true
  if(dom){
    dom.style.overflow = 'hidden'
  }
}


var top = 0
var left = 0
const b = computed(()=>(param:any)=>{
        const obj:any = dataList[param]

        // 直接赋值
        top = Math.random()*1080
        left = Math.random()*1920

        const a = Math.random()*5+10
        const a2 = Math.random()*3
        const pp1:any = Math.floor(Math.random() * 2) > 0?'':'-'
        const pp2:any = Math.floor(Math.random() * 2) > 0?'':'-'

        const random_x2: any = Math.random()*100 + 1500
        const random_y2: any = Math.random()*100 + 800

        const m:any =  pp1+ random_x2
        const m2:any = pp2+ random_y2

        
        const obj3 = {x: 0, y: 0}
        const obj2 = {x: m2, y: m}
        
        const style = {
            '--a': `${a}s`,
            '--a2': `${a2}s`,
            '--x2':m+'px',
            '--y2':m2+'px',
            '--deg':deg(obj,obj3,obj2,m,m2),
            '--left': Math.random()*1920 + 'px',
            '--top':Math.random()*1080 + 'px',
        }
        return style
    })

function init() {
  store.dispatch('common/Fetch', {
    api: "seaFishList"
  }).then(res => {
    dataList.value = res.result || []
  })
}

onMounted(() => {
  init()
})
</script>

<style scoped>
.bb{
  width:100%;height: 100%;top: 0px;left: 0px; z-index: 999; pointer-events: none;
}

li{
    opacity: 0; 
        width: auto;
        height: auto;
        animation-delay: var(--a2);
        animation-duration: var(--a);
        animation-iteration-count: infinite;
        animation-name: drop;
        animation-timing-function: linear;
        position: absolute;
        left: var(--left);
        top: var(--top);
        transform:rotate(var(--deg));
        transition: 0.3s ease;
}
li.fish-li{
  width: 180px;
  height: 120px;
  display: ruby;
}

@keyframes drop {
  0% {
    opacity: 0; 
    transform:rotate(var(--deg));
  }

  10%,90% {
    opacity: 1; 
  }


  100% {
    transform: translate(var(--x2),var(--y2)) rotate(var(--deg)); } 
}
</style>