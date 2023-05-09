import * as joint from 'jointjs'
import svgPanZoom from 'svg-pan-zoom'
import * as ports from './ports'
import * as Elements from './elements'
import * as linkss from './link'
import * as dataModel from './dataModel/index'
import basicInfo from './dataModel/basic'
import VueEvent from '@/utils/event'
import {cloneDeep} from 'lodash'

 class graphs {
  el: any = HTMLDivElement
  paper: any = joint.dia.Paper
  graph: any = joint.dia.Graph
  currCell: null
  undoStack: any
  redoStack: any
  constructor(el: HTMLDivElement) {
    
    let namespace = joint.shapes;
    let graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    let paper:any = new joint.dia.Paper(Object.assign({
      el: el,
      model: graph,
      width: '100%',
      height: '100%',
      gridSize: 10,
      drawGrid: true,
      background: {
          color: '#fff'
      },
      cellViewNamespace: namespace,
      // 默认线设置
      // defaultLink: () => new joint.shapes.standard.Link(),
      defaultLink:  new linkss.basicLink ,
  }, {
    id: '12'
  }));
  this.el = el
  this.paper = paper
  this.graph = graph
  this.currCell = null
  this.undoStack = []
  this.redoStack = []


  var paperSmall = new joint.dia.Paper(Object.assign({
    el: document.getElementById('paper-multiple-papers-small'),
    model: graph,
    width: 270,
    height: 200,
    gridSize: 1,
    interactive: false,
    cellViewNamespace: namespace
  }));
  paperSmall.scale(0.25,0.25,0,0)



  var boundaryTool = new joint.elementTools.Boundary();
var removeButton = new joint.elementTools.Remove();

var toolsView = new joint.dia.ToolsView({
    tools: [
        boundaryTool,
        removeButton
    ]
});

    // this.draggable()
    this.setLink()
    // this.svgPanZooms()
    this.handleMouse()



  const rect = new joint.shapes.standard.Rectangle({
    position: { x: 50, y: 50 },
    size: { width: 90, height: 90 },
    ports: {
        groups: ports.PortGroups,
        items: [
          ports.anchorPort
        ]
    }
});
  
  paper.on('element:mouseleave', function(elementView: any) {
      elementView.hideTools();
  });
  let _this = this
  paper.on('element:pointermove', function(elementView: any) {
      _this.currCell = cloneDeep(elementView)
  });

  
  paper.on('element:pointerup', function(elementView: any) {
    _this.undoStackPush('add', 'node',  _this.currCell, true)
});
  }
  

  // 创建节点
  createNode(ftype: any, text: any, position: any, data?: any) {
debugger
    // 如果没有数据则表示新创建的节点，否则是通过数据生成
    if(!data){
      data = new dataModel.start({id: 'null', name: text})
    }
    
    const rect = new (Elements as any)[ftype]({})
    rect.position(position.x, position.y);
    rect.setData(data)
    rect.addTo(this.graph);
    this.undoStackPush('add', 'node', rect, true)
  }

  // 创建线条
  createLink(linkView: any) {

    let currentLinkModel = linkView.model.attributes
    let source = linkView.sourceView
    let target = linkView.targetView
    let sourceFtype = source.model.attributes.ftype
    let targetFtype = target ? target.model.attributes.ftype : ''
    let fontSourceNode = source.model.attributes
    let fontTargetNode = target ? target.model.attributes : null
    let ftype = fontSourceNode.ftype === 'start' || fontTargetNode.ftype === 'end' ? "link" : "intentionLink"

    source && linkView.model.source(source.model)
    target && linkView.model.target(target.model)
    let linkObj: any = {
      id: linkView.id,
      type: ftype,
      source: fontSourceNode.id,
      target: fontTargetNode.id
    }
    if(ftype === 'intentionLink'){
      linkObj.name = "意图线"
    }
    let linkData = new dataModel['linkNode'](linkObj)
    debugger
    linkView.model.setData(linkData)
    this.undoStackPush('add', 'link', linkView, true)
  }

  setLink() {
    let self = this
    this.paper.on('link:pointerdblclick', function(linkView: any) {
      
     
    });

  this.paper.on('link:pointerup', function(linkView: any) {
    let source = linkView.sourceView
    let target = linkView.targetView
    
  }); 


    this.paper.on('link:connect', function(linkView: any) {
      let source = linkView.sourceView
      let target = linkView.targetView
      
      self.createLink(linkView)
      
    });    

    const _this = this
// 删除节点
    this.paper.on('element:delete', function(elementView: any, evt: any) {
      alert("ccccc")
      // Stop any further actions with the element view e.g. dragging
      evt.stopPropagation();
      if (confirm('Are you sure you want to delete this element?')) {
          elementView.model.remove();
      }
      _this.undoStackPush('delete', 'link', elementView, true)
    });    
  }




  // // 允许拖拽
  // draggable(){
  //   this.el.addEventListener('dragover', (e: any) => {
  //     e.preventDefault()
  //   })
  //   this.el.addEventListener('drop', (e: any) => {
  //     let ftype: any = e.dataTransfer.getData('ftype')
  //     let text: any = e.dataTransfer.getData('text')
  //     let offsetX: any = Number(e.dataTransfer.getData('offsetX'))
  //     let offsetY: any = Number(e.dataTransfer.getData('offsetY'))
  //     let dropPoint: any = this.paper.pageToLocalPoint(e.pageX, e.pageY)
  //     let x: any = dropPoint.x - offsetX
  //     let y: any = dropPoint.y - offsetY
      
  //     let cellView: any = this.createNode(ftype, text, {x, y})
  //   })
  // }

  // 允许拖拽
  draggable(e: any, data: any){
      let ftype: any = data.ftype
      let text: any = data.text
      let offsetX: any = Number(data.offsetX)
      let offsetY: any = Number(data.offsetY)
      let dropPoint: any = this.paper.pageToLocalPoint(e.pageX, e.pageY)
      let x: any = dropPoint.x - offsetX
      let y: any = dropPoint.y - offsetY
      
      let cellView: any = this.createNode(ftype, text, {x, y})

  }


  setGraphData(id: any){
    const cell = this.graph.getCell(id)
    let data = cell.attributes.data
    cell.setData(data)
  }

  updateCells(cells: any, graph: Object){
    let thisa: any = graph

    if(!cells) {
      return
    }

   let cellsList:any = (typeof cells=='string') ? JSON.parse(cells) : cells

   cellsList.cells && cellsList.cells.map((cell: any) => {

    if(cell.ftype === 'link' || cell.ftype === 'intentionLink'){
      
      const {id, ftype, source, target, vertices, data} = cell as dataModel.Link
      let sourceCell = thisa.getCell(source.id)
      let targetCell = thisa.getCell(target.id)
      let sss = new (Elements as any)[ftype]({id}) 
      source && sss.source(sourceCell)
      target && sss.target(targetCell)
      vertices && sss.vertices(vertices)
      let linkData: any = new dataModel['linkNode'](data)
      sss.render({attrs: cell.attrs, data: cell.data})
      sss.addTo(this.graph);    
    }else{
      const {id, ftype, position, data} = cell as dataModel.Node
      const datas = new dataModel.start({...data})
      const rect = new (Elements as any)[ftype]({id})
      rect.position(position.x, position.y);
      rect.render({attrs: cell.attrs, data: datas})
      rect.addTo(this.graph);
    }
   })
   this.svgPanZooms()
  //  this.svgPanZooms2()
  }

  updateGraph(cells: any){
    this.updateCells(cells, this.graph)

  }

  handleMouse(){

    let _this = this

    this.paper.on('element:pointerdown', (cellView: any, evt: any, x: number, y: number) => {
      this.currCell = cellView;
  })
  this.paper.on('cell:pointerup blank:pointerup', (cellView: any, evt: any, x: number, y: number) => {
      this.currCell = null;
  })

  this.paper.on('link:pointerdown', (cellView: any, evt: any, x: number, y: number) => {
    this.currCell = cellView;
})
this.paper.on('link:pointerup', (cellView: any, evt: any, x: number, y: number) => {
    this.currCell = null;
})

    // 点击画布空白处
    this.paper.on('blank:pointerclick', function() {
      VueEvent.emit("blank");
    });

  // 点击图形节点
  this.paper.on('cell:pointerclick', function(cellView: any) {
   const cell = cellView.model

   VueEvent.emit("navbarSetting", cell);
   VueEvent.emit("selectColor");
  });

  // 点击连线节点
  this.paper.on('link:pointerclick', function(cellView: any) {
    const cell = cellView.model
    VueEvent.emit("navbarSetting", cell);
   });  


    this.paper.on('element:mouseenter', function(elementView: any) {
      var boundaryTool = new joint.elementTools.Boundary();
      var removeButton = new joint.elementTools.Remove();
      var toolsView = new joint.dia.ToolsView({
        name: 'basic-tools',
        tools: [boundaryTool, removeButton],
    });
    elementView.addTools(toolsView)
  });    

  this.paper.on('link:mouseenter', (linkView: any) => {
    var boundaryTool = new joint.elementTools.Boundary();
    var removeButton = new joint.elementTools.Remove();
    var toolsView = new joint.dia.ToolsView({
      name: 'basic-tools',
      tools: [boundaryTool, removeButton],
  });
  linkView.addTools(toolsView)
});

this.paper.on('link:mouseleave', (linkView: any) => {
    linkView.removeTools();
});

  }

  // 设置背景色
  setBackground(color: any){
    this.paper.drawBackground({color: color})
   
  }

  svgPanZooms() {
    let _this = this
    debugger
    let svgZoom = svgPanZoom('#myholder svg', {

      /** 是否可拖拽 */
      panEnabled: true,
      /** 是否可缩放 */
      zoomEnabled: false,
      /** 双击放大 */
      dblClickZoomEnabled: false,
      /** 可缩小至的最小倍数 */
      minZoom: 1,
      /** 可放大至的最大倍数 */
      maxZoom: 1,
      /** 是否自适应画布尺寸 */
      fit: false,
      /** 图是否居中 */
      center: true,
      /** 判断是否是节点的拖拽 */
      beforePan: (oldPan: any, newPan: any) => {
        if (_this.currCell) {
          return false;
        }
      }

    });

    svgZoom.setZoomScaleSensitivity(0.5);
    /** fit:true 元素数量较少时，会引起元素过度放大，当缩放率大于1时，将图像缩小为1；小于等于1时，为体现出边距更显美观，整体缩放至0.9 */
    let {
      sx,
      sy
    } = _this.paper.scale();
    if (sx > 1) {
      svgZoom.zoom(1 / sx);
    } else {
      svgZoom.zoom(0.8);
    }
  }

  svgPanZooms2() {
    let _this = this
    debugger
    let svgZoom = svgPanZoom('#paper-multiple-papers-small svg', {

      /** 是否可拖拽 */
      panEnabled: true,
      /** 是否可缩放 */
      zoomEnabled: true,
      /** 双击放大 */
      dblClickZoomEnabled: false,
      /** 可缩小至的最小倍数 */
      minZoom: 0.01,
      /** 可放大至的最大倍数 */
      maxZoom: 100,
      /** 是否自适应画布尺寸 */
      fit: true,
      /** 图是否居中 */
      center: true,
      /** 判断是否是节点的拖拽 */
      beforePan: (oldPan: any, newPan: any) => {
        if (_this.currCell) {
          return false;
        }
      }

    });

    svgZoom.setZoomScaleSensitivity(0.5);
    /** fit:true 元素数量较少时，会引起元素过度放大，当缩放率大于1时，将图像缩小为1；小于等于1时，为体现出边距更显美观，整体缩放至0.9 */
    let {
      sx,
      sy
    } = _this.paper.scale();
    if (sx > 1) {
      svgZoom.zoom(1 / sx);
    } else {
      svgZoom.zoom(0.8);
    }
  }  

  // 设置属性
  setAttrs(param: any){
    debugger
    const cell = this.graph.getCell(param.id)
    cell.setAttr(param)
  }



  // 撤销和恢复

  // 操作记录
  undoStackPush(action:any, type: any, data: any, isClear: any){
    this.undoStack.push({
      action: action,
      type: type,
      data: data
    })
    if(isClear){
      this.redoStack = [] // 创建的时候清除撤销以前的部分
    }
  }

  // 撤销方法
  revertCommand(cell: any){
    if(cell.action === 'add'){
      if(cell.type === 'node'){
        this.graph.getCell(cell.data.id).remove()
      }else{
        let links: any[] = this.graph.getLinks();
        let cellObj = links.filter((item: any) => {
          return item.id === cell.data.model.id
        })
        cellObj[0].remove()
      }
    }else if(cell.action === 'delete'){
      if(cell.type === 'node'){
        cell.data.map((item: any) => {
          if(item.attributes.ftype === 'Link' && item.attributes.ftype === 'IntentLink'){
            this.graph.addCell(item)
          }else{
            item.addTo(this.graph)
          }
        })
      }else{
        this.graph.addCell(cell.data.model)
      }      
    }
    else if(cell.action === 'move' || cell.action === 'edit'){
      let cellObj = []
      if(cell.type === 'node'){
        let nodes: any = this.graph.getCells();
        cellObj = nodes.filter((item: any) => {
          return item.id === cell.data.id
        })
        
      }else{
        let links: any[] = this.graph.getLinks();
        let cellObj = links.filter((item: any) => {
          return item.id === cell.data.model.id
        })
        
      }      
      let newCell = cloneDeep(cellObj[0])
        cellObj[0].attributes = cell.data.attributes
        cell.data.attributes = newCell.attributes
      // this.updateGraph() // 重新渲染
    }
    cell && this.redoStack.push(cell)
  }

  // 恢复方法
  applyCommand(cell: any){
    if(cell.action === 'add'){
      if(cell.type === 'node'){
        cell.data.addTo(this.graph)
      }else{
        this.graph.addCell(cell.data.model)
      }
    }else if(cell.action === 'delete'){
      if(cell.type === 'node'){
        cell.data.map((item: any) => {
          if(item.attributes.ftype === 'Link' && item.attributes.ftype === 'IntentLink'){
            this.graph.getCell(item.id).remove()
          }
        })
      }else{
        let links: any[] = this.graph.getLinks();
        let cellObj = links.filter((item: any) => {
          return item.id === cell.data.model.id
        })
        cellObj[0].remove()
      }      
    }
    else if(cell.action === 'move' || cell.action === 'edit'){
      let cellObj = []
      if(cell.type === 'node'){
        let nodes: any = this.graph.getCells();
        cellObj = nodes.filter((item: any) => {
          return item.id === cell.data.id
        })
        
      }else{
        let links: any[] = this.graph.getLinks();
        let cellObj = links.filter((item: any) => {
          return item.id === cell.data.model.id
        })
      }      
      let newCell = cloneDeep(cellObj[0])
      cellObj[0].attributes = cell.data.attributes
      cell.data.attributes = newCell.attributes
      
      // this.updateGraph() // 重新渲染
    }
    cell && this.undoStack.push(cell)
  }

  // this.undoStackPush('delete', 'node', cell, true)
  // 撤销操作
  undo(){
    debugger
    if(this.undoStack.length === 0){
      return
    }

    let cell = this.undoStack.pop()
    this.revertCommand(cell)
  }

 // 撤销操作
 redo(){
  debugger
  if(this.redoStack.length === 0){
    return
  }

  let cell = this.redoStack.pop()
  this.applyCommand(cell)
}  


}

export default graphs

function dragmove(evt: any): any {
  throw new Error('Function not implemented.')
}
function evt(evt: any, any: any) {
  throw new Error('Function not implemented.')
}

