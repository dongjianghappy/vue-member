import * as joint from 'jointjs'

const defaultLink = {
  attrs: {
    line: {
        stroke: '#999',
        strokeDasharray: 'none',
        // 双向箭头这里线注释
        // sourceMarker: {
        //     'fill': '#fe854f',
        //     'stroke': 'none',
        //     'd': 'M 5 -10 L -15 0 L 5 10 Z'
        // },

        // 监听属性
        targetMarker: {
            'fill': '#999',
            'stroke': 'none',
            'd': 'M 5 -10 L -15 0 L 5 10 Z'
        }
    },
    label: {
      fill: ""
    },
    // 文本设置
    text: {
      text: '连接线',
      fill: "#999", // 文本颜色
  }
  }
}

export const basicLink = joint.shapes.standard.Link.define('custom.basicLink', {
  ...defaultLink,
  ftype: 'link',
  // editable: true
},  
{
    // 设置节点数据
    setAttr(param: any): void{
      if(param.value === 'link' || param.value === 'intentionLink'){
        this.prop('ftype', param.value)
        return
      }
      if(param.islabel){
        this.prop(`attrs/text/${param.attr}`, param.value); // Set presentation attribute
      }else{
        this.prop(`attrs/line/${param.attr}`, param.value); // Set presentation attribute
        this.prop(`attrs/line/targetMarker/fill`, param.value); // Set presentation attribute
      }
    },

  // 设置节点数据
  setData(data: any, value?: any): void{
    debugger
    this.prop('data', data)
    this.prop('ftype', data.type)
    if(data.type === 'intentionLink'){
      this.prop(`attrs/text/text`, data.name);
    }
    
    this.labels([{
      attrs: {
          text: {
              text: 'Hello, World!'
          }
      }
  }]);
  //   this.appendLabel({
  //     attrs: {
  //         text: {
  //             text: 'Hello, World'
  //         }
  //     }
  // });
  },


    // 设置节点数据
    render(param: any, value?: any): void{

      const {data} = param
  
      this.attributes.attrs.line = {...this.attributes.attrs.line, ...param.attrs.line}
      this.attributes.attrs.label = {...this.attributes.attrs.label, ...param.attrs.label}
      // this.attributes.attrs.text = {...this.attributes.attrs.text, ...param.attrs.text}

      // 线条文本设置
      this.labels([{
        attrs: {
            text: {
                text: data && data.name || ''
            }
        }
      }]);
      this.prop('data', param.data)
    },    

  setText(text: string){
    let setting = {}
    
  }
})