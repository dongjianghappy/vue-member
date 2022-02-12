<template>
  <div>
    <div class="w-full"
         style="background: linear-gradient(45deg ,#020031,#6d3353); height: 180px;">
      <div class="container w1100 cl-white">
        <div class="pt30"
             style="font-size:30px;">程序员的话题讨论、技术交流、知识分享、解决问题</div>
        <div class="pt30 font18">在这里，我们为爱好开发者提供技术话题讨论区。并助力他们在技术能力、职业生涯、影响力上获得提升。</div>
      </div>
    </div>

    <div class="container w1200 relative clearfix">

      <!--item end-->

      <div class="col-sm-6 col-md-2 p10"
           v-for="(item, index) in activity"
           :key="index">
        <div class="thumbnail p10 relative"
             data-v-4a486d74=""
             style="background: rgb(255, 255, 255); overflow: hidden;"
             @click="show(item.name)">
          <img :src="item.image"
               style="width: 100%; height: 160px;">
          <div class="caption relative"
               data-v-4a486d74=""
               style="padding: 10px 0px; height: 40px;"><span class="inputline updata nowrap"
                  data-coding="C0000"
                  data-field="title"
                  data-id="6"
                  contenteditable="true"
                  data-v-4a486d74=""
                  style="border: 0px dashed rgb(204, 204, 204); width: 100%; background: none; display: block !important;">{{item.name}}
              <span class="mark vote"
                    v-if="item.vote !=='0'">票</span>
            </span>
            <!--<span style=" color:#5bc0de; float:right;">1张</span>-->
          </div>
          <div class="relative"
               data-v-4a486d74=""
               style="border-top: 1px dotted rgb(234, 234, 234); padding: 10px 0px; height: 40px;"> {{item.num}}参与</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, computed, onMounted } from 'vue'
import {useStore} from 'vuex'
import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  name: 'HomeViewdddf',
  components: {
    
  },
  setup(props,context) {
  const {ctx}:any = getCurrentInstance();
  const store = useStore();
  const router = useRouter();
  const route = useRoute();
  const component = computed(() => route.query.mod);
  const activity = computed(() => store.getters['common/activityList']);

function init(){
      store.dispatch('common/ActivityList', {
        
      }) 
    }

    function show(name: any){
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
