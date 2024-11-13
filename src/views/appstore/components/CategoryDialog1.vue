<template>
  <v-dialog title="系统分类"
            width="650px"
            height="500px"
            :confirm="true"
            :cancel="true"
            @submit="submit"
            @close="cancel"
            v-model:isShow="isShow">
    <template v-slot:content>
      <div class="ant-modal-body">
        <div style="padding: 10px;">当前：{{currentValue.name || sourceData.parent}}</div>
        <div class="cate-wrap">
          <div>
            <div style="padding: 10px 0px;">
              <div style="position: relative; padding-left: 60px;">
                <template v-for="(item, index) in data"
                          :key="index">
                  <div style="position: absolute; left: 0px; padding: 6px 0px;"><span class=""
                          style="padding: 6px 10px;">{{item.name}}</span></div>
                  <div style="display: flex; flex-wrap: wrap;">
                    <div v-for="(list, i) in item.list"
                         :class="{current: currentValue.fid ===  `|${item.id}|${list.id}|`}"
                         :key="i"
                         style="padding: 6px 10px;"
                         @click="choose({fid: `|${item.id}|${list.id}|`, cateName:  `${item.name} > ${list.name}`})">{{list.name}}</div>

                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, watch } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'HomeViewh',
  props: {
    name: {
      type: String,
      default: "弹窗按钮"
    },
    sourceData: {
      type: Object,
      default: ()=>{return}
    },
    value: {
      type: String,
      default: ""
    },

    showFlag: {
      type: Boolean,
      default: false
    },
    
  },
  data(){
    return {
      summary: "",
    }
  },
emits: ['cancel', 'submit', 'getValue', 'update:showFlag'],
setup(props,context) {
    const {ctx}:any = getCurrentInstance();
    const store = useStore();
    const isShow: any = ref(props.showFlag)
    const data: any = ref([])
watch([isShow], (newValues, prevValues) => {
    context.emit('update:showFlag', false)
  })
    const currentValue: any = ref({fid: props.sourceData.fid, name: props.sourceData.parent})
    function cancel(){
      alert("11111111111")
      context.emit('cancel')
    }
    
        function handleclick(){

          store.dispatch('common/Fetch', {
          api: 'SystemCate',
          data: {
            coding: "A10002"
          }
      }).then(res => {
        data.value = res.result
      })

      isShow.value = true
      
    }
    function choose(param: any){
      currentValue.value = param
    }
    function submit(){
       isShow.value = false
       context.emit('getValue', currentValue.value)
    }

onMounted(handleclick)
    return {
      handleclick,
      cancel,
      isShow,
      data,
      currentValue,
      choose,
      submit
  
    }
  }
})
</script>
<style scoped>
.current{
    background: #1890ff;
    border-radius: 2px;
    color: #fff;

}
</style>
