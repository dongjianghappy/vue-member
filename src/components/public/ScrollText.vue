<template>
<div class="vueBox">
  <div class="marquee">
    <div class="marquee_box">
      <ul class="marquee_list" :class="{marquee_top: animate}">
        <li v-for="(item, index) in dataList" :key="index">
          <span class="aaaa" @click="handleClick(item)">{{item.title}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {
  defineProps,
  onMounted,
  ref,
  onBeforeUnmount,
} from 'vue'
import {
  useRouter
} from 'vue-router';

const props: any = defineProps({
  dataList: {
    type: Array,
    default: []
  }
})
const router = useRouter()
let timer: number = 0;
let animate: any = ref(false)

function showMarquee() {
  animate.value = true;
  setTimeout(() => {
    props.dataList.push(props.dataList[0]);
    props.dataList.shift();
    animate.value = false;
  }, 500)
}

function handleClick(param: any) {
  router.push(`/announcement?id=${param.id}`)
}

onMounted(() => {
  timer = setInterval(showMarquee, 5000)
})

onBeforeUnmount(() => {
  clearInterval(timer); //清除定时器
  timer = 0;
});
</script>

<style scoped>
div,
ul,
li,
span,
img {
  margin: 0;
  padding: 0;
  display: flex;
  box-sizing: border-box;
}

.marquee {
  width: 100%;
  height: 50px;
  align-items: center;
  display: flex;
  box-sizing: border-box;
}

.marquee_title {
  padding: 0 20px;
  height: 30px;
  font-size: 14px;
  border-right: 1px solid #d8d8d8;
  align-items: center;
}

.marquee_box {
  display: block;
  position: relative;
  width: 100%;
  height: 30px;
  overflow: hidden;
}

.marquee_list {
  display: block;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.marquee_top {
  transition: all 0.5s;
  margin-top: -30px
}

.marquee_list li {
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  padding-left: 5px;
}

.marquee_list li span {
  padding: 0 2px;
}

.red {
  color: #FF0101;
}
</style>
