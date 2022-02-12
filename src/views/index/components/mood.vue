<template>
  <v-dialog title="设置状态"
            width="650px"
            height="550px"
            :confirm="true"
            :cancel="true"
            :hasfooter="false"
            v-model:isShow="isShow">
    <template v-slot:content>
      <div class="layer-content pt0"
           style="height: 350px; overflow-y: auto;">
        <div v-for="(item, index) in dataList"
             :key="index">
          <div class="mb15">{{item.name}}</div>
          <div style="overflow: hidden;">
            <div class="col-md-2 p10"
                 v-for="(list, i) in item.list"
                 :key="i"
                 @click="handelclick(list)">
              <div class="align_center li"
                   :class="{current: current === list.id}">
                {{list.name}}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="form-wrap"
           style="background: rgb(242, 242, 245);"
           v-if="issave">
        <div class="input-box">
          <input type="text"
                 v-model="content"
                 placeholder="说点什么好"
                 ref="Input">
        </div>
        <div class="operate">
          <div class="operate-left">

          </div>
          <button @click="save"
                  class="operate-right"
                  :class="{disabled: !content}"
                  :disabled="!content">保存</button>
        </div>
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
    const isShow = ref(true) // props.showFlag
    const issave = ref(false)
    const dataList = ref([])
    const content: any = ref("")
    const current: any = ref()


     // 监听弹窗变量
    watch([isShow], (newValues, prevValues) => {
      context.emit('update:showFlag', false)
    })   

    
    //初始页面
		function init(){
           store.dispatch('common/Fetch', {
          api:"GetMoodList"
      }).then(res => {
        dataList.value = res.result
        
      })
		}

    function handelclick(param: any){
      current.value = param.id
      issave.value = true
    }

    function save(){
      store.dispatch('common/Fetch', {
        api:"SaveMood",
        data: {
          mood: current.value,
          description: content.value
        }
      }).then(res => {
        console.log("ss");
        
        
      })
    }


    onMounted(init)
    return {
      isShow,
      dataList,
      handelclick,
      content,
      issave,
      current,
      save
    }
  }
})
</script>

<style scoped>
.li{
  background: #ccc; height: 75px;border-radius: 5px; line-height: 75px; color: #fff;
}
.current{
  background: #8bc34a;
}
</style>
