<template>
<div id="energy-wrap" style="border: 0px solid red; position: fixed; top: 85px; left: 0; height: 215px; z-index: 100; pointer-events: 3;">
  <div class="fixed" style="left: 10px; top: 70px; color: var(--color-primary);">
    <span @click="handleRouter()" class="mr15" v-if="userInfo.currentUser">能量：{{userInfo.energy || 0}}g</span>
    <span @click="handleRouter('user')" >产生能量用户</span>
  </div>
  <template v-for="(item, index) in userInfo.energy_ball" :key="index">
    <li class="absolute" :class="{'aa':tabIndex == index}" :style="a(item)" @click.stop="handleSubmit(item, index)">
      <span v-if="item.status">{{item.energy}}g</span>
      <span style="line-height: 12px;" v-else>
        <span class="font12">还剩</span>
        <span class="font12">{{item.time}}</span>
      </span>
      <span class="energy font12">
        {{item.status ? '可收获' : item.name}}
      </span>
    </li>
  </template>
</div>
</template>

<script setup lang="ts">
import {
  getCurrentInstance,
  computed,
  onMounted,
  ref,
  useStore,
  useRouter
} from '@/utils'
const {
  proxy
}: any = getCurrentInstance();
const store = useStore();
const router = useRouter()
const tabIndex = ref()
const userInfo = computed(() => {
  let login = store.getters['user/loginuser']
  let baisc = store.getters['user/userInfo']
  let info = baisc
  if(login.currentUser){
    info = login
  }
  return info
});

function handleSubmit(param: any, index: any) {
  if(!userInfo.value.currentUser || (userInfo.value.currentUser && !param.status)){
    return
  }

  store.dispatch('common/Fetch', {
    api: 'getEnergy',
    data: {
      id: param.id
    }
  }).then((res: any) => {
    tabIndex.value = index
    setTimeout(() => {
      store.commit('user/setEnergy', res.result)
    }, 500)
  })
}

const a = computed(() => (param: any) => {
  const a = Math.random()
  const x2 = Math.floor(Math.random() * 2) > 0 ? '' : '-'
  const y2 = Math.floor(Math.random() * 2) > 0 ? '' : '-'

  const attr: any = JSON.parse(param.style || '{}')
  const style = {
    '--x': attr.left, // attr.Math.random() * 20 + 10,
    '--y': attr.top, // Math.random() * 100 - 150,
    '--o': Math.random(),
    '--a': a > 0.1 ? a : 0.1,
    '--d': Math.random(),
    '--s': Math.random(),
    '--w': Math.random() * 5 + 40 + 'px',
    '--h': Math.random() * 120 + 10 + 'px',
    '--shadow': Math.floor(Math.random() * 5) + 10 + 'px',
    '--x2': x2 + Math.random() * 350 + 100 + 'px',
    '--y2': y2 + Math.random() * 350 + 100 + 'px',
    '--background': 'var(--color-primary)',

  }
  return style
})

function handleRouter(param: any) {
    if(param === 'user'){
      router.push('/energy')
    }else{
      router.push(proxy.const.setUrl({
        uid: userInfo.value.account,
        query: '/info?mod=energy'
      }))
    }
}
onMounted(() => {
  let el: any = document.getElementById('energy-wrap')
  if(el){
    el.style.width = `${(window.innerWidth-1100)/2}px`
  }
})
</script>

<style scoped>
div {
  /* background: red; */
}

.li {
  width: 10px;
  height: 10px;
  box-shadow: 0px 0px 10px var(--color-primary);
  background: var(--color-primary);
}

li {
  width: var(--w);
  height: var(--w);
  border-radius: 50px;
  animation: drop 2s calc(var(--s)* 0.5s) linear infinite;

  position: absolute;
  left: calc(var(--x)* 2%);
  top: calc((var(--y) + 50)* -1px);
  /* margin-left: -600px; */
  box-shadow: 0px 0px 5px var(--background),inset 1px 1px 1px white;
  background: var(--background);
  text-align: center;
  /* line-height: 45px; */
  color: var(--background-dayAndMoon);
  font-weight: bold;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

li .energy {
  content: '可收获';
  position: absolute;
  top: 50px;
  left: 50%;
  margin-left: -40px;
  width: 80px;
  color: var(--color-primary);
  font-size: 12px;
  /* 🏄 */
}

li.aa{
    animation: drop2 0.5s linear;
}

@keyframes drop {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }

  100% {
    transform: translateY(0);
  }
}
@keyframes drop2 {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 1;
        /* width: var(--w);
            height: var(--w); */
    }
    100% {
        left: 30px;
        top: -20px;
        margin-left: 0px;
        opacity: 0;
        width: 30px;
        height: 30px;
    }
}
</style>
