<template>
<div>
  <!-- <div class="w-full" style="background: linear-gradient(45deg ,#020031,#6d3353); height: 180px;">
    <div class="container w1100 cl-white">
      <div class="pt30" style="font-size:30px;">程序员的话题讨论、技术交流、知识分享、解决问题</div>
      <div class="pt30 font18">在这里，我们为爱好开发者提供技术话题讨论区。并助力他们在技术能力、职业生涯、影响力上获得提升。</div>
    </div>
  </div> -->

  <div class="container w1100 relative pt15 clearfix">
    <div class="col-md-2 p10" v-for="(item, index) in activity" :key="index">
      <div class="thumbnail p10 relative"  style="background: rgb(255, 255, 255); overflow: hidden;" @click="show(item.name)">
        <img :src="item.image" style="width: 100%; height: 160px;">
        <div class="caption relative" style="padding: 10px 0px; height: 40px;">
          <span>{{item.name}}
            <span class="mark vote" v-if="item.vote !=='0'">票</span>
          </span>
        </div>
        <div class="relative" style="border-top: 1px dotted rgb(234, 234, 234); padding: 10px 0px; height: 40px;"> {{item.num}}参与</div>
      </div>
    </div>

  </div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  onMounted
} from 'vue'
import {
  useStore
} from 'vuex'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {

  },
  setup(props, context) {
    const {
      ctx
    }: any = getCurrentInstance();
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const component = computed(() => route.query.mod);
    const activity = computed(() => store.getters['common/activityList']);

    function init() {
      store.dispatch('common/ActivityList', {

      })
    }

    function show(name: any) {
      router.push(`/activity?item=${name}`)
    }
    onMounted(init)

    return {
      component,
      activity,
      show
    }
  }
})
</script>
