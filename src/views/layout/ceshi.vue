<template>
<div>
  <div id="myholder"></div>
</div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
} from 'vue'

import * as joint from 'jointjs'
export default defineComponent({
  name: 'v-Search',

  setup(props, context) {

    function init() {

      var namespace = joint.shapes;

      var graph = new joint.dia.Graph({}, {
        cellNamespace: namespace
      });
      var el: any = document.getElementById('myholder')
      var paper = new joint.dia.Paper(Object.assign({
        el: document.getElementById('myholder'),
        model: graph,
        width: 600,
        height: 100, 
        gridSize: 10,
            drawGrid: {
              name: 'dot',
              color: "#fff"
            },
            background: {
                color: "#f00"
            },Namespace: namespace
      }));
      var rect = new joint.shapes.standard.Rectangle();
      rect.position(100, 30);
      rect.resize(100, 40);
      rect.attr({
        body: {
          fill: 'blue'
        },
        label: {
          text: 'Hello',
          fill: 'white'
        }
      });
      rect.addTo(graph);

      var rect2 = rect.clone();
      rect2.translate(300, 0);
      rect2.attr('label/text', 'World!');
      rect2.addTo(graph);

      var link = new joint.shapes.standard.Link();
      link.source(rect);
      link.target(rect2);
      link.addTo(graph);
    }

    onMounted(() => {
      init()
    })
  }
})
</script>
