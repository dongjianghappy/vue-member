<template>
<div id="stencil" v-show="graphType === 0">
</div>
<div id="chatbot" v-show="graphType === 1">
</div>
<!-- <ul class="clearfix">
  <li style="padding: 10px">
    <div class="rect" draggable="true" @dragstart="(e, fType, text)=>dragstart(e, 'rect', '矩形')">矩形</div>
  </li>
  <li style="padding: 10px">
    <div class="round" draggable="true" @dragstart="(e, fType, text)=>dragstart(e, 'start', '圆形')">圆形</div>
  </li>
</ul> -->
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  onMounted,
  useStore,
  watch
} from '@/utils'
import * as joint from 'jointjs'
import $ from 'jquery'
import config from '../config'
export default defineComponent({
  name: "MymodalD",
  props: {
    graph: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, context) {
    const store = useStore()
    const graphType: any = computed(() => store.getters['graph/graphType']);

    // 监听弹窗变量
    watch(graphType, (next, prev) => {
      initGraph()
    })

    function dragstart(e: any, fType: any, text: any) {
      e.dataTransfer.setData('ftype', fType)
      e.dataTransfer.setData('text', text)
      e.dataTransfer.setData('offsetX', e.offsetX)
      e.dataTransfer.setData('offsetY', e.offsetY)
    }

    function initGraph() {
      var stencilGraph = new joint.dia.Graph,
        stencilPaper = new joint.dia.Paper(

          Object.assign({
            el: document.getElementById('stencil'),
            width: 180,
            height: '100%',
            model: stencilGraph,
            gridSize: 10,
            background: {
              color: 'transparent'
            },
            interactive: false,

          }));

      var circle = new joint.shapes.standard.Circle();
      circle.resize(100, 100);
      circle.position(40, 20);
      circle.attr('root/title', 'joint.shapes.standard.Circle');
      circle.attr('label/text', '圆形');
      circle.attr('body/stroke', config.circle.borderColor);
      circle.prop('ftype', 'circle')
      circle.addTo(stencilGraph);


      var rectangle = new joint.shapes.standard.Rectangle();
      rectangle.resize(100, 50);
      rectangle.position(40, 140);
      rectangle.attr('root/title', 'joint.shapes.standard.Rectangle');
      rectangle.attr('label/text', '矩形');
      rectangle.attr('body/stroke', config.rect.borderColor);
      rectangle.prop('ftype', 'rect')
      rectangle.addTo(stencilGraph);

      var polygon = new joint.shapes.standard.Polygon();
      polygon.resize(100, 100);
      polygon.position(40, 210);
      polygon.attr('root/title', 'joint.shapes.standard.Polygon');
      polygon.attr('label/text', '多边形');
      polygon.attr('body/stroke', config.polygon.borderColor);
      polygon.attr('body/refPoints', '0,10 10,0 20,10 10,20');
      polygon.prop('ftype', 'polygon')
      polygon.addTo(stencilGraph);

      var ellipse = new joint.shapes.standard.Ellipse();
      ellipse.resize(100, 60);
      ellipse.position(40, 330);
      ellipse.attr('root/title', 'joint.shapes.standard.Ellipse');
      ellipse.attr('label/text', '椭圆形');
      ellipse.attr('body/stroke', config.ellipse.borderColor);
      ellipse.prop('ftype', 'ellipse')
      ellipse.addTo(stencilGraph);

      var check = new joint.shapes.standard.Circle();
      check.resize(30, 30);
      check.position(75, 420);
      check.attr('root/title', 'joint.shapes.standard.Circle');
      check.attr('label/text', '是');
      check.attr('body/stroke', config.check.borderColor);
      check.prop('ftype', 'check')
      check.addTo(stencilGraph);

      stencilPaper.on('cell:pointerdown', function (cellView: any, e, x, y) {

        $('body').append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;z-index:100000000000000000"></div>');
        var flyGraph = new joint.dia.Graph,
          flyPaper = new joint.dia.Paper(Object.assign({
            el: $('#flyPaper'),
            model: flyGraph,
            height: cellView.model.attributes.size.height,
            width: cellView.model.attributes.size.width,
            interactive: false,
          })),
          flyShape = cellView.model.clone(),
          pos = cellView.model.position(),
          offset = {
            x: x - pos.x,
            y: y - pos.y
          };

        flyShape.position(0, 0);
        flyGraph.addCell(flyShape);
        $("#flyPaper").offset({
          left: e.pageX - offset.x,
          top: e.pageY - offset.y
        });
        $('body').on('mousemove.fly', function (e: any) {
          $("#flyPaper").offset({
            left: e.pageX - offset.x,
            top: e.pageY - offset.y
          });
        });
        $('body').on('mouseup.fly', function (e: any) {

          // Dropped over paper ?
          // if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
          //   var s = flyShape.clone();
          //   s.position(x - target.left - offset.x, y - target.top - offset.y);
          //   graph.addCell(s);
          // }
          props.graph.draggable(e, {
            ftype: flyShape.attributes.ftype,
            text: flyShape.attributes.attrs.label.text,
            offsetX: e.offsetX,
            offsetY: e.offsetY

          })
          // var x = e.pageX,
          //   y = e.pageY,
          //   target = paper.$el.offset();

          // // Dropped over paper ?
          // if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
          //   var s = flyShape.clone();
          //   s.position(x - target.left - offset.x, y - target.top - offset.y);
          //   graph.addCell(s);
          // }
          $('body').off('mousemove.fly').off('mouseup.fly');
          flyShape.remove();
          $('#flyPaper').remove();
        });
      });
    }

    // 机器人工具栏
    function robotInitGraph() {
      var stencilGraph = new joint.dia.Graph,
        stencilPaper = new joint.dia.Paper(

          Object.assign({
            el: document.getElementById('chatbot'),
            width: 180,
            height: '100%',
            model: stencilGraph,
            gridSize: 10,
            background: {
              color: 'transparent'
            },
            interactive: false,

          }));

      var circle = new joint.shapes.standard.Circle();
      circle.resize(50, 50);
      circle.position(65, 20);
      circle.attr('root/title', 'joint.shapes.standard.Circle');
      circle.attr('label/text', '开始');
      circle.attr('body/stroke', config.start.borderColor);
      circle.prop('ftype', 'start')
      circle.addTo(stencilGraph);

      var rectangle = new joint.shapes.standard.Rectangle();
      rectangle.resize(100, 50);
      rectangle.position(40, 100);
      rectangle.attr('root/title', 'joint.shapes.standard.Rectangle');
      rectangle.attr('label/text', '坐席');
      rectangle.attr('body/stroke', config.question.borderColor);
      rectangle.prop('ftype', 'question')
      rectangle.addTo(stencilGraph);

      var polygon = new joint.shapes.standard.Polygon();
      polygon.resize(100, 100);
      polygon.position(40, 180);
      polygon.attr('root/title', 'joint.shapes.standard.Polygon');
      polygon.attr('label/text', '逻辑');
      polygon.attr('body/stroke', config.polygon.borderColor);
      polygon.attr('body/refPoints', '0,10 10,0 20,10 10,20');
      polygon.prop('ftype', 'polygon')
      polygon.addTo(stencilGraph);

      // var ellipse = new joint.shapes.standard.Ellipse();
      // ellipse.resize(100, 60);
      // ellipse.position(20, 310);
      // ellipse.attr('root/title', 'joint.shapes.standard.Ellipse');
      // ellipse.attr('label/text', 'Ellipse');
      // ellipse.attr('body/fill', 'lightblue');
      // ellipse.addTo(stencilGraph);

      var end = new joint.shapes.standard.Circle();
      end.resize(50, 50);
      end.position(65, 320);
      end.attr('root/title', 'joint.shapes.standard.Circle');
      end.attr('label/text', '结束');
      end.attr('body/stroke', config.end.borderColor);
      end.prop('ftype', 'end')
      end.addTo(stencilGraph);

      stencilPaper.on('cell:pointerdown', function (cellView: any, e, x, y) {
        debugger
        $('body').append('<div id="flyPaperRobot" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;z-index:100000000000000000"></div>');
        var flyGraph = new joint.dia.Graph,
          flyPaper = new joint.dia.Paper(Object.assign({
            el: $('#flyPaperRobot'),
            model: flyGraph,
            height: cellView.model.attributes.size.height,
            width: cellView.model.attributes.size.width,
            interactive: false,
          })),
          flyShape = cellView.model.clone(),
          pos = cellView.model.position(),
          offset = {
            x: x - pos.x,
            y: y - pos.y
          };

        flyShape.position(0, 0);
        flyGraph.addCell(flyShape);
        $("#flyPaperRobot").offset({
          left: e.pageX - offset.x,
          top: e.pageY - offset.y
        });
        $('body').on('mousemove.fly', function (e: any) {
          $("#flyPaperRobot").offset({
            left: e.pageX - offset.x,
            top: e.pageY - offset.y
          });
        });
        $('body').on('mouseup.fly', function (e: any) {
          //     e.dataTransfer.setData('ftype', fType)
          // e.dataTransfer.setData('text', text)
          // e.dataTransfer.setData('offsetX', e.offsetX)
          // e.dataTransfer.setData('offsetY', e.offsetY)
          flyShape
          // Dropped over paper ?
          // if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
          //   var s = flyShape.clone();
          //   s.position(x - target.left - offset.x, y - target.top - offset.y);
          //   graph.addCell(s);
          // }
          props.graph.draggable(e, {
            ftype: flyShape.attributes.ftype,
            text: flyShape.attributes.attrs.label.text,
            offsetX: e.offsetX,
            offsetY: e.offsetY

          })
          // var x = e.pageX,
          //   y = e.pageY,
          //   target = paper.$el.offset();

          // // Dropped over paper ?
          // if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
          //   var s = flyShape.clone();
          //   s.position(x - target.left - offset.x, y - target.top - offset.y);
          //   graph.addCell(s);
          // }
          $('body').off('mousemove.fly').off('mouseup.fly');
          flyShape.remove();
          $('#flyPaperRobot').remove();
        });
      });
    }

    onMounted(() => {
      initGraph()
      robotInitGraph()
    })

    return {
      dragstart,
      graphType
    }
  }
})
</script>

<style lang="less" scoped>
.rect {
  border: 2px solid #31d0c6;
  border-radius: 3px;
  width: 100px;
  height: 50px;
  line-height: 50px;
  cursor: move;
  text-align: center;
}

.diamond {
  width: 200px;
  height: 200px;
  background-color: red;
  transform: rotate(45deg);
  margin: 100px auto;
}

.round {
  border: 2px solid #31d0c6;
  border-radius: 30px;
  width: 50px;
  height: 50px;
  line-height: 50px;
  cursor: move;
  text-align: center;
}
</style>
