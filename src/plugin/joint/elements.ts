import * as joint from 'jointjs'
import * as ports from './ports'
import { basicLink } from './link'

import config from './config'

let shapes = joint.shapes as any
shapes.custom = {}
const defaultLink = {
  attrs: {
    line: {
        stroke: '#fe854f',
        // 双向箭头这里线注释
        // sourceMarker: {
        //     'fill': '#fe854f',
        //     'stroke': 'none',
        //     'd': 'M 5 -10 L -15 0 L 5 10 Z'
        // },
        targetMarker: {
            'fill': '#fe854f',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
        }
    }
  }
}

// 基本节点
export const basicNode = joint.dia.Element.define('custom.basic.Node', {
    ports: {
      groups: ports.PortGroups,
      items: [
        ports.anchorPort
      ],
      z: 1
    }
  },
  {
    // 设置节点数据
    setAttr(param: any): void{
      debugger
      if(param.islabel){
        this.prop(`attrs/label/${param.attr}`, param.value); // Set presentation attribute
      }else{
        this.prop(`attrs/body/${param.attr}`, param.value); // Set presentation attribute
      }
    },

    // 设置节点数据
    setData(data: any, value?: any): void{
      // 创建节点设置节点名称
      this.attr().label.text = data.name
      this.prop('data', data)
    },

    // 获取节点数据
    getData(key?: String): any {

    },

    // 设置节点数据
    render(param: any, value?: any): void{
      this.attributes.attrs.body = {...this.attributes.attrs.body, ...param.attrs.body}
      this.attributes.attrs.label = {...this.attributes.attrs.label, ...param.attrs.label}
      this.prop('data', param.data)
    },    

    setText(text: string){
      let setting = {}
      
    }
  }
)

// 开始节点
export const start = shapes.custom.start =(basicNode as any).define('custom.start', {
 ftype: 'start',
 size: {
  width: 50,
  height: 50
 },attrs: {
  body: {
      width: 'calc(w)',
      height: 'calc(h)',
      strokeWidth: 2,
      stroke: config.start.borderColor,
      strokeDasharray: 'none',
      fill: config.start.color,
      refCx: 0.5,
      refCy: 0.5,
      refR: 0.5
  },
  label: {
      textVerticalAnchor: 'middle',
      textAnchor: 'middle',
      x: 'calc(0.5*w)',
      y: 'calc(0.5*h)',
      fontSize: 14,
      fill: '#333333',
      text: 'Hello',
  }
}
}, {
markup: [{
  tagName: 'circle',
  selector: 'body',
}, {
  tagName: 'text',
  selector: 'label'
}]

},
)

// 矩形节点
export const rect = shapes.custom.rect =(basicNode as any).define('custom.rect', {
  ftype: 'rect',
  size: {
   width: 100,
   height: 50
  },attrs: {
   body: {
       width: 'calc(w)',
       height: 'calc(h)',
       strokeWidth: 2,
       stroke: config.rect.borderColor,
       strokeDasharray: 'none',
       fill: config.rect.color
   },
   label: {
       textVerticalAnchor: 'middle',
       textAnchor: 'middle',
       x: 'calc(0.5*w)',
       y: 'calc(0.5*h)',
       fontSize: 14,
       fill: '#333333',
       text: 'Hello',
   }
 }
 }, {
 markup: [{
   tagName: 'rect',
   selector: 'body',
 }, {
   tagName: 'text',
   selector: 'label'
 }]
 
 },
 )

 // 矩形节点
export const link = shapes.custom.link =(basicLink as any).define('custom.link', {
  ftype: 'link'
}
 )
