<template>
<!-- 结构体属性 -->
<StructureAttributes :node="node" />
<!-- 机器人属性 -->
<!-- <RobotAttributes  :node="node" /> -->
</template>

<script setup lang="ts">
  import {
    defineComponent,
    computed,
    provide
  } from 'vue'
  import StructureAttributes from './structureAttributes.vue'
  import RobotAttributes from './robotAttributes.vue'
  import {
    useStore
  } from '@/utils';


  const props: any = defineProps({
    graph: {
        type: Object,
        default: () => {
          return {}
        }
      }
  })
  const emit: any = defineEmits(['update:show'])
  const store = useStore()
  const node: any = computed(() => store.getters['graph/nodeData'] || {});

  function setDates(params: any){
    node.value.data[params.name] = params.value
  }

  provide('node', {
    node,
    setDates
  })

  const graphType: any = computed(() => store.getters['graph/graphType']);
  const attrs: any = computed(() => {
    const attr = store.getters['graph/nodeData'].attrs
    if (node.value.ftype === 'link' || node.value.ftype === 'intentionLink') {
      return {
        stroke: attr && attr.line.stroke,
        strokeDasharray: attr.line.strokeDasharray,
        fill: attr && attr.line.fill,
        text: attr && attr.text.text,
        textColor: attr && attr.text.fill
      }
    } else {
      return {
        stroke: attr && attr.body.stroke,
        strokeDasharray: attr && attr.body.strokeDasharray,
        fill: attr && attr.body.fill,
        text: attr && attr.label.text,
        textColor: attr && attr.label.fill
      }
    }
  });

  const borderStyle = [{
      value: 'solid',
      name: '实线',
    },
    {
      value: 'dotted',
      name: '点线',
    },
    {
      value: 'dashed',
      name: '虚线',
    }
  ]
  provide('borderStyle', borderStyle)

  function setAttrs(param: any) {
    props.graph.setAttrs({
      id: node.value.id,
      islabel: param.islabel,
      type: "attrs",
      attr: `${param.attr}`,
      value: param.value
    })
  }
  provide('attrs', {
    attrs,
    setAttrs
  })


</script>
