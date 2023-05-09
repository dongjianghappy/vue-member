<template>
<StructureAttributes v-if="graphType === 0" :node="node" :attrs="attrs" :borderStyle="borderStyle" @setAttrs="setAttrs" />
<RobotAttributes v-else :node="node" :attrs="attrs" :borderStyle="borderStyle" @setAttrs="setAttrs" />
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
} from 'vue'
import StructureAttributes from './structureAttributes.vue'
import RobotAttributes from './robotAttributes.vue'
import {
  useStore
} from '@/utils';
export default defineComponent({
  name: "MymodalD",
  components: {
    StructureAttributes,
    RobotAttributes
  },
  props: {
    graph: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  emits: ['update:show'],
  setup(props, context) {
    const store = useStore()
    const node: any = computed(() => store.getters['graph/nodeData'] || {});
    const graphType: any = computed(() => store.getters['graph/graphType']);
    const attrs: any = computed(() => {
      const attr = store.getters['graph/nodeData'].attrs
      if (node.value.ftype === 'link' || node.value.ftype === 'intentionLink') {
        return {
          stroke: attr && attr.line.stroke,
          strokeDasharray: attr.line.strokeDasharray,
          fill: attr && attr.line.fill,
          text: attr && attr.text.text,
          textColor: attr && attr.text.fill,
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
        value: 'none',
        name: '实线',
      },
      {
        value: '5',
        name: '点线',
      },
      {
        value: '10, 5',
        name: '虚线',
      }
    ]

    function setAttrs(param: any) {
      props.graph.setAttrs({
        id: node.value.id,
        islabel: param.islabel,
        type: "attrs",
        attr: `${param.attr}`,
        value: param.value
      })
    }

    return {
      node,
      graphType,
      attrs,
      borderStyle,
      setAttrs
    }
  }
})
</script>
