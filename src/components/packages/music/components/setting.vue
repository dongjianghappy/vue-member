<template>
<ul class="music-setting-warp">
  <div class="mb10">桌面歌词展示</div>
  <li class="li">
    <span class="label">底部(默认)</span>
    <v-switch :data="{ item: data, field: 'bottom'}" :basic="true" @toggle="getValue" className="right" :auth="true" />
  </li>
  <li class="li">
    <span class="label">左侧</span>
    <v-switch :data="{ item: data, field: 'left'}" :basic="true" @toggle="getValue" className="right" :auth="true" />
  </li>
  <li class="li">
    <span class="label">右侧</span>
    <v-switch :data="{ item: data, field: 'right'}" :basic="true" @toggle="getValue" className="right" :auth="true" />
  </li>
  <li class="li mt25">
    <span class="label">音频动画</span>
    <v-switch :data="{ item: data, field: 'yinpin'}" :basic="true" @toggle="getValue" className="right" :auth="true" />
  </li>
</ul>
</template>

<script setup lang="ts">
import {
  defineProps,
  defineExpose,
  onMounted,
  ref,
  timeToSeconds,
  useStore
} from '@/utils'
import VueEvent from '@/utils/event'

const props: any = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  update: {
    type: Function,
    default: () => {
      return
    }
  }
})

const store = useStore()
function getValue(param: any) {

  let theme = ""
  let location = ""

  if (param.field === 'bottom' && param.value === '0') {
    return
  }

  props.data[param.field] = param.value

  if (param.field === 'regular') {
    if (props.data[param.field] === '1') {
      props.data['trends'] = '0'
    } else {
      props.data['trends'] = '1'
    }
  }

  if (param.field === 'trends') {
    if (props.data[param.field] === '1') {
      props.data['regular'] = '0'
    } else {
      props.data['regular'] = '1'
    }
  }

  if (param.field === 'right') {
    props.data['left'] = '0'
    if (props.data[param.field] === '1') {
      props.data['bottom'] = '0'
    } else {
      props.data['bottom'] = '1'
    }
  }

  if (param.field === 'bottom') {
    props.data['right'] = '0'
    props.data['bottom'] = '1'
    props.data['left'] = '0'
  }

  if (param.field === 'left') {
    props.data['right'] = '0'
    if (props.data[param.field] === '1') {
      props.data['bottom'] = '0'
    } else {
      props.data['bottom'] = '1'
    }
  }

  if (props.data['regular'] === '1') {
    theme = '1';
  } else {
    theme = '2'
  }

  if (props.data['right'] === '1') {
    location = 'right';
  }

  if (props.data['bottom'] === '1') {
    location = 'bottom';
  }

  if (props.data['left'] === '1') {
    location = 'left';
  }
  
  props.update({
    lrc_location: location,
    theme: theme,
    yinpin: props.data.yinpin
  })
}
</script>
