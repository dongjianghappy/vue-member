<template>
<ul class="font14 flex" style="justify-content: end; border-bottom: 1px dashed #eee;">
  <li v-for="(item, index) in [{name: '全部', value: ''},{name: '含图片', value: 'picture'},{name: '含视频', value: 'video'},{name: '含音频', value: 'audio'}]" :key="index" class="ml10" style="height: 32px" @click="handleClick(item)">{{item.name}}</li>
  <li class="ml10">
    <v-popover content="时间" arrow="tb" offset="right" :move="-250" keys="calendar">
      <div style="width: 350px; height: 350px;">
        <v-calendar @changeMonth="changeMonth" @changeDay="changeDay">
          <template v-slot:default="row">
            <template v-for="(item, index) in calendarData" :key="index">
              <div style="display: flex; flex-wrap:wrap; position: absolute; width: 100%; bottom: 0px; top: 25px; padding: 10px" v-if="item.date == `${row.item.fullYear}-${row.item.month}-${row.item.day}`">
                <div class="col-md-4" style="height: 32px;" v-for="(list, i) in item.list.slice(0, 5)" :key="i"><img :src="list.photos" style="border-radius: 50px; width: 32px; height: 32px;"></div>
                <div class="col-md-4" style=" height: 32px; line-height: 32px; display: inline-block;">
                  <div style="background: #ddd; border-radius: 50px; width: 32px; height: 32px;" v-if="item.list.length > 5">{{item.num}}</div>
                </div>
              </div>
            </template>
          </template>
        </v-calendar>
      </div>
    </v-popover>
  </li>
</ul>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'
export default defineComponent({
  name: 'v-Search',
  props: {
    field: {
      type: String,
      default: ""
    },
    render: {
      type: Function,
      default: () => {
        return 'Default function'
      }
    },
  },
  emits: ['update:name'],
  setup(props, context) {
    const currentSort: any = ref({
      value: '',
      name: '默认'
    })

    function handleClick(param: any) {
      context.emit('update:name', param.name)
      const params: any = {}
      params[props.field] = param.value
      debugger
      props.render(params)
    }
    return {
      handleClick,
      currentSort
    }
  }
})
</script>
