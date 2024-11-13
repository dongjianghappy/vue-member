function Color(color: any) {
    let rgb: any = []
    const hex: any = []
    let hsl: any = []
    let match = null
    if (/^\D*(\d{1,3})[^°\d]+(\d{1,3})[^%\d]+(\d{1,3})\D*$/.test(color)) {
      for (var i = 0; i < 3; i++) {
        if (i == 0) {
          const index = RegExp['$1']
          rgb[i] = index
        }
        if (i == 1) {
          const index = RegExp['$2']
          rgb[i] = index
        }
        if (i == 2) {
          const index = RegExp['$3']
          rgb[i] = index
        }
  
        if (rgb[i] > 255) {
          rgb = []
          break
        }
      }
    } else if (match = /^\s*#?([0-9a-f]{3}([0-9a-f]{3})?)\s*$/i.exec(color)) {
      const hex2 = match[1]
      const len = hex2.length / 3
      let index
      for (var i = 0; i < hex2.length; i += len) {
        let block = hex2.substr(i, len)
        if (len == 1) block += block
        index = i / len
        hex[index] = block
        rgb[index] = parseInt(block, 16)
      }
    } else if (/^\D*(\d+)\D+(\d+(\.\d+)?)%\D+(\d+(\.\d+)?)%\D*$/.test(color)) {
  
      // var H = RegExp.$1 - 0
      // var S = RegExp.$2 - 0
      // var L = RegExp.$4 - 0
      const index = RegExp[`$1`]
      const index2 = RegExp[`$2`]
      const index4 = RegExp[`$4`]
  
  
  
  
      let H: any = index
      let S: any = index2
      let L: any = index4
      if (H <= 360 && S <= 100 && L <= 100) {
        hsl = [H, S, L]
        H /= 360,
          S /= 100,
          L /= 100
        if (S == 0) {
          const r: any = Math.ceil(L * 255)
          const g: any = Math.ceil(L * 255)
          const b: any = Math.ceil(L * 255)
          rgb = [r, g, b]
        } else {
          const t2 = L >= 0.5 ? L + S - L * S : L * (1 + S)
          const t1 = 2 * L - t2
          const tempRGB = [1 / 3, 0, -1 / 3]
          for (var i = 0; i < 3; i++) {
            let t = H + tempRGB[i]
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (6 * t < 1) {
              t = t1 + (t2 - t1) * 6 * t
            } else if (2 * t < 1) {
              t = t2
            } else if (3 * t < 2) {
              t = t1 + (t2 - t1) * (2 / 3 - t) * 6
            } else {
              t = t1
            }
            tempRGB[i] = Math.ceil(t * 255)
          }
          rgb = tempRGB
        }
      }
    }

    return {
        rgb,
        hex,
        hsl
      }
  }
  
  const toString = function (obj: any, style: any) {
    const rgb = obj.rgb;
    let hsl = obj.hsl;
    const hex = obj.obj;
    let str = ''
    if (style) style = style.toLowerCase()
    switch (style) {
      case 'hex':
        if (hex.length != 3 && rgb.length == 3) {
          for (let i = 0; i < rgb.length; i++) {
            let ch = rgb[i].toString(16)
            if (ch.length == 1) ch = '0' + ch
            hex[i] = ch
          }
        }
        if (hex.length == 3) str = '#' + hex[0] + hex[1] + hex[2]
        break
      case 'hsl':
  
        if (hsl.length != 3 && rgb.length == 3) {
          let H, S, L
          const r = rgb[0] / 255
          const g = rgb[1] / 255
          const b = rgb[2] / 255
          const max = Math.max(r, g, b)
          const min = Math.min(r, g, b)
          L = (max + min) / 2
          const diff = max - min
          S = diff == 0 ? 0 : diff / (1 - Math.abs(2 * L - 1))
          if (S == 0) {
            H = 0
          } else if (r == max) {
            H = (g - b) / diff % 6
          } else if (g == max) {
            H = (b - r) / diff + 2
          } else {
            H = (r - g) / diff + 4
          }
          H *= 60
          if (H < 0) H += 360
          hsl = [Math.round(H), (S * 100).toFixed(1), (L * 100).toFixed(1)]
  
        }
        if (hsl.length == 3) {
          str = 'hsl(' + hsl[0] + 'deg,' + hsl[1] + '%,' + hsl[2] + '%)'
        }
        break
      case 'rgb':
      default:
        if (rgb.length == 3) {
          str = 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')'
        }
        break
    }
    return str
  }
  
  // 校验色值
  function isValidRgbColor(color: any){
    return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)
  }

  function set_rgb(color: any) {
    const getColor = color
  
    if (getColor != null) {
      function convertColor(id: any) {
        const str = id
        const color: any = Color(str)
        return toString(color, 'rgb')
      }
      function rgbFn(rgb: any) {
        const val = rgb.split(',')
        return val
      }
      const rgb = convertColor(getColor)
      const r = rgbFn(rgb)[0].split('(')[1]
      const g = rgbFn(rgb)[1]
      const b = rgbFn(rgb)[2].split(')')[0]
      return { r, g, b }
    }
  }
  
  function set_hsl(color: any) {
    const getColor = color
  
    if (getColor != null) {
      function convertColor(id: any) {
        const str = id
        const color = Color(str)
  
        return toString(color, 'hsl')
      }
  
      function hslFn(hsl: any) {
  
        const val = hsl.split(',')
        return val
      }
  
      const hsl = convertColor(getColor)
  
  
  
      const h = hslFn(hsl)[0].split('(')[1].split('d')[0]
      const s = hslFn(hsl)[1].split('%')[0].split('.')[0]
      const l = hslFn(hsl)[2].split('%')[0].split('.')[0]
      return { h, s, l }
    }
  }
  
  export const setColor = (colors: any) => {
    
    const color = isValidRgbColor(colors) ? colors : '#000'

    // 主题颜色处理成rgb格式
    const rgb = set_rgb(color)
    const hsl = set_hsl(color)

    const domRootHtml = document.getElementsByTagName('html')[0]
    if (domRootHtml) {
        if (rgb2gray(rgb?.r, rgb?.g, rgb?.b) < 29) {
        domRootHtml.className = "intelligent themecolor-toodark";
        } else {
        domRootHtml.className = "intelligent";
        }
    }

    function rgb2gray(R: any, G: any, B: any) {
        return Math.round(R * 0.299 + G * 0.587 + B * 0.114);
    }
    
    return{
        rgb: rgb,
        hsl: hsl
    }
  }
  

export const colorHex2Rgb = (color: any) => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  let sColor = color.toLowerCase();

  if(sColor && reg.test(sColor)){
      if(sColor.length === 4){
          let sColorNew = "#";
          
          for(var i=1; i<4; i+=1){
              sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));    
          }
          
          sColor = sColorNew;
      }
      
      const sColorChange = [];
      
      for(var i=1; i<7; i+=2){
          sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
      }
      
      return "RGB(" + sColorChange.join(",") + ")";
  }else{
      return sColor;    
  }
};

export const colorRgb2Hex = (color: any) => {
  const reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  const that = color;
  
  if(/^(rgb|RGB)/.test(that)){
      const aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
      let strHex = "#";
      
      for(var i=0; i<aColor.length; i++){
          let hex = Number(aColor[i]).toString(16);
      
          if(hex === "0"){
              hex += hex;    
          }
          
          strHex += hex;
      }
      
      if(strHex.length !== 7){
          strHex = that;    
      }
      
      return strHex.toUpperCase();
  }else if(reg.test(that)){
      const aNum = that.replace(/#/,"").split("");
      
      if(aNum.length === 6){
          return that;    
      }else if(aNum.length === 3){
          let numHex = "#";
      
          for(var i=0; i<aNum.length; i+=1){
              numHex += (aNum[i]+aNum[i]);
          }
          
          return numHex.toUpperCase();
      }
  }else{
      return that.toUpperCase();    
  }
};

// 校验颜色有效值
// export const isValidRgbColor = (color: any) => {
//   return /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.test(color)
// }