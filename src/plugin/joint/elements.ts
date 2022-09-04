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


// 坐席节点
export const question = shapes.custom.question =(basicNode as any).define('custom.question', {
  ftype: 'question',
  size: {
   width: 100,
   height: 50
  },attrs: {
   body: {
       width: 'calc(w)',
       height: 'calc(h)',
       strokeWidth: 2,
       stroke: config.question.borderColor,
       strokeDasharray: 'none',
       fill: config.question.color
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

 // 多边形节点
export const polygon = shapes.custom.polygon =(basicNode as any).define('custom.polygon', {
  ftype: 'polygon',
  size: {
   width: 100,
   height: 100
  },attrs: {
   body: {
       width: 'calc(w)',
       height: 'calc(h)',
       strokeWidth: 2,
       stroke: config.polygon.borderColor,
       strokeDasharray: 'none',
       refPoints: '0,10 10,0 20,10 10,20',
       fill: config.polygon.color
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

// 结束节点
export const end = shapes.custom.end =(basicNode as any).define('custom.end', {
  ftype: 'end',
  size: {
   width: 50,
   height: 50
  },attrs: {
   body: {
       width: 'calc(w)',
       height: 'calc(h)',
       strokeWidth: 2,
       stroke: config.end.borderColor,
       strokeDasharray: 'none',
       fill: config.end.color,
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

// 大圆形节点
export const circle = shapes.custom.circle =(basicNode as any).define('custom.circle', {
  ftype: 'circle',
  size: {
   width: 100,
   height: 100
  },attrs: {
   body: {
       width: 'calc(w)',
       height: 'calc(h)',
       strokeWidth: 2,
       stroke: config.circle.borderColor,
       strokeDasharray: 'none',
       fill: config.circle.color,
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

 // 大圆形节点
export const ellipse = shapes.custom.ellipse =(basicNode as any).define('custom.ellipse', {
  ftype: 'ellipse',
  size: {
   width: 100,
   height: 60
  },attrs: {
   body: {
       width: 'calc(w)',
       height: 'calc(h)',
       strokeWidth: 2,
       stroke: config.ellipse.borderColor,
       strokeDasharray: 'none',
       fill: config.ellipse.color,
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
 
 // 大圆形节点
 export const check = shapes.custom.check =(basicNode as any).define('custom.check', {
  ftype: 'check',
  size: {
   width: 30,
   height: 30
  },attrs: {
   body: {
       width: 'calc(w)',
       height: 'calc(h)',
       strokeWidth: 2,
       stroke: config.check.borderColor,
       strokeDasharray: 'none',
       fill: config.check.color,
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

 // 连接线
export const link = shapes.custom.link =(basicLink as any).define('custom.link', {
  ftype: 'link'
}
 )

 // 意图线
 export const intentionLink = shapes.custom.intentionLink =(basicLink as any).define('custom.intentionLink', {
  ftype: 'intentionLink',
  attrs: {
    line: {
        stroke: '#fe854f',
        strokeDasharray: 'none',
        // 双向箭头这里线注释
        // sourceMarker: {
        //     'fill': '#fe854f',
        //     'stroke': 'none',
        //     'd': 'M 5 -10 L -15 0 L 5 10 Z'
        // },

        // 监听属性
        targetMarker: {
            'fill': '#fe854f',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
        }
    },
    label: {
      fill: ""
    },
    // 文本设置
    text: {
      text: '意图线',
      fill: "#999", // 文本颜色
  }
  }
}
 )
 