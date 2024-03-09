export const colorHex2Rgb = (color: any) => {
  var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  var sColor = color.toLowerCase();

  if(sColor && reg.test(sColor)){
      if(sColor.length === 4){
          var sColorNew = "#";
          
          for(var i=1; i<4; i+=1){
              sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));    
          }
          
          sColor = sColorNew;
      }
      
      var sColorChange = [];
      
      for(var i=1; i<7; i+=2){
          sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));    
      }
      
      return "RGB(" + sColorChange.join(",") + ")";
  }else{
      return sColor;    
  }
};

export const colorRgb2Hex = (color: any) => {
  var reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  var that = color;
  
  if(/^(rgb|RGB)/.test(that)){
      var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
      var strHex = "#";
      
      for(var i=0; i<aColor.length; i++){
          var hex = Number(aColor[i]).toString(16);
      
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
      var aNum = that.replace(/#/,"").split("");
      
      if(aNum.length === 6){
          return that;    
      }else if(aNum.length === 3){
          var numHex = "#";
      
          for(var i=0; i<aNum.length; i+=1){
              numHex += (aNum[i]+aNum[i]);
          }
          
          return numHex.toUpperCase();
      }
  }else{
      return that.toUpperCase();    
  }
};