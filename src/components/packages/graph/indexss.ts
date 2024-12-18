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
    
    const namespace = joint.shapes;
    const graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    const paper:any = new joint.dia.Paper(Object.assign({
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

  const paperSmall = new joint.dia.Paper(Object.assign({
    el: document.getElementById('paper-multiple-papers-small'),
    model: graph,
    width: 270,
    height: 200,
    gridSize: 1,
    interactive: false,
    cellViewNamespace: namespace
  }));
  paperSmall.scale(0.25,0.25,0,0)

  const boundaryTool = new joint.elementTools.Boundary();
  const removeButton = new joint.elementTools.Remove();
  const toolsView = new joint.dia.ToolsView({
      tools: [
        boundaryTool,
        removeButton
      ]
  });

  this.setLink()
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
  const _this = this
  paper.on('element:pointermove', function(elementView: any) {
      _this.currCell = cloneDeep(elementView)
  });

  
    paper.on('element:pointerup', function(elementView: any) {
      _this.undoStackPush('add', 'node',  _this.currCell, true)
   });
  }
  

  // 创建节点
  createNode(ftype: any, text: any, position: any, data?: any) {
    // 如果没有数据则表示新创建的节点，否则是通过数据生成
    if(!data){
      data = new dataModel.start({id: 'null', name: text})
    }
    const rect = new (Elements as any)[ftype]({})
    rect.position(position.x, position.y);
    rect.setData(data)
    rect.addTo(this.graph);

    // 创建节点后并显示该节点信息
    VueEvent.emit("navbarSetting", rect);
    VueEvent.emit("selectColor");

    this.undoStackPush('add', 'node', rect, true)
  }

  // 创建线条
  createLink(linkView: any) {
    const currentLinkModel = linkView.model.attributes
    const source = linkView.sourceView
    const target = linkView.targetView
    const sourceFtype = source.model.attributes.ftype
    const targetFtype = target ? target.model.attributes.ftype : ''
    const fontSourceNode = source.model.attributes
    const fontTargetNode = target ? target.model.attributes : null
    const ftype = fontSourceNode.ftype === 'start' || fontTargetNode.ftype === 'end' ? "link" : "intentionLink"

    source && linkView.model.source(source.model)
    target && linkView.model.target(target.model)
    const linkObj: any = {
      id: linkView.id,
      type: ftype,
      source: fontSourceNode.id,
      target: fontTargetNode.id
    }
    if(ftype === 'intentionLink'){
      linkObj.name = "意图线"
    }
    const linkData = new dataModel['linkNode'](linkObj)
    linkView.model.setData(linkData)

    // 创建线条后并显示该节点信息
    VueEvent.emit("navbarSetting", linkView.model);

    this.undoStackPush('add', 'link', linkView, true)
  }

    setLink() {
      const self = this
      this.paper.on('link:pointerdblclick', function(linkView: any) {

      });

    this.paper.on('link:pointerup', function(linkView: any) {
      const source = linkView.sourceView
      const target = linkView.targetView
      
    }); 


    this.paper.on('link:connect', function(linkView: any) {
      const source = linkView.sourceView
      const target = linkView.targetView
      
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

  // 允许拖拽
  draggable(e: any, data: any){
      const ftype: any = data.ftype
      const text: any = data.text
      const offsetX: any = Number(data.offsetX)
      const offsetY: any = Number(data.offsetY)
      const dropPoint: any = this.paper.pageToLocalPoint(e.pageX, e.pageY)
      const x: any = dropPoint.x - offsetX
      const y: any = dropPoint.y - offsetY
      this.createNode(ftype, text, {x, y})
  }

  // 更新节点
  updateCells(cells: any, graph: Object){
    const thisa: any = graph

    if(!cells) return

    const cellsList:any = (typeof cells=='string') ? JSON.parse(cells) : cells
    cellsList.cells && cellsList.cells.map((cell: any) => {

      if(cell.ftype === 'link' || cell.ftype === 'intentionLink'){
        const {id, ftype, source, target, vertices, data} = cell as dataModel.Link
        const sourceCell = thisa.getCell(source.id)
        const targetCell = thisa.getCell(target.id)
        const sss = new (Elements as any)[ftype]({id}) 
        source && sss.source(sourceCell)
        target && sss.target(targetCell)
        vertices && sss.vertices(vertices)
        const linkData: any = new dataModel['linkNode'](data)
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
  }

  // 设置数据
  setGraphData(id: any){
    const cell = this.graph.getCell(id)
    const data = cell.attributes.data
    cell.setData(data)
  }  

  // 重新渲染
  updateGraph(cells: any){
    this.updateCells(cells, this.graph)

  }

  // 设置背景色
  setBackground(color: any){
    this.paper.drawBackground({color: color})
  }

  // 设置属性
  setAttrs(param: any){
    const cell = this.graph.getCell(param.id)
    cell.setAttr(param)
  }    

  // 鼠标事件
  handleMouse(){
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

    // 鼠标经过元素
    this.paper.on('element:mouseenter', function(elementView: any) {
      const boundaryTool = new joint.elementTools.Boundary();
      const removeButton = new joint.elementTools.Remove();
      const toolsView = new joint.dia.ToolsView({
        name: 'basic-tools',
        tools: [boundaryTool, removeButton],
        });
        elementView.addTools(toolsView)
      });    

    // 鼠标经过连线
    this.paper.on('link:mouseenter', (linkView: any) => {
      const boundaryTool = new joint.elementTools.Boundary();
      const removeButton = new joint.elementTools.Remove();
      const toolsView = new joint.dia.ToolsView({
        name: 'basic-tools',
        tools: [boundaryTool, removeButton],
    });

    // 鼠标离开连线
    this.paper.on('link:mouseleave', (linkView: any) => {
      linkView.removeTools();
    });    
  });

}

  svgPanZooms() {
    const _this = this
    const svgZoom = svgPanZoom('#myholder svg', {

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
    const {
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
    const _this = this
    const svgZoom = svgPanZoom('#paper-multiple-papers-small svg', {

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
    const {
      sx,
      sy
    } = _this.paper.scale();
    if (sx > 1) {
      svgZoom.zoom(1 / sx);
    } else {
      svgZoom.zoom(0.8);
    }
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
        const links: any[] = this.graph.getLinks();
        const cellObj = links.filter((item: any) => {
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
        const nodes: any = this.graph.getCells();
        cellObj = nodes.filter((item: any) => {
          return item.id === cell.data.id
        })
        
      }else{
        const links: any[] = this.graph.getLinks();
        const cellObj = links.filter((item: any) => {
          return item.id === cell.data.model.id
        })
        
      }      
      const newCell = cloneDeep(cellObj[0])
        cellObj[0].attributes = cell.data.attributes
        cell.data.attributes = newCell.attributes
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
        const links: any[] = this.graph.getLinks();
        const cellObj = links.filter((item: any) => {
          return item.id === cell.data.model.id
        })
        cellObj[0].remove()
      }      
    }
    else if(cell.action === 'move' || cell.action === 'edit'){
      let cellObj = []
      if(cell.type === 'node'){
        const nodes: any = this.graph.getCells();
        cellObj = nodes.filter((item: any) => {
          return item.id === cell.data.id
        })
        
      }else{
        const links: any[] = this.graph.getLinks();
        const cellObj = links.filter((item: any) => {
          return item.id === cell.data.model.id
        })
      }      
      const newCell = cloneDeep(cellObj[0])
      cellObj[0].attributes = cell.data.attributes
      cell.data.attributes = newCell.attributes
    }
    cell && this.undoStack.push(cell)
  }

  // this.undoStackPush('delete', 'node', cell, true)
  // 撤销操作
  undo(){
    if(this.undoStack.length === 0){
      return
    }

    const cell = this.undoStack.pop()
    this.revertCommand(cell)
  }

 // 撤销操作
 redo(){
  if(this.redoStack.length === 0){
    return
  }

  const cell = this.redoStack.pop()
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

