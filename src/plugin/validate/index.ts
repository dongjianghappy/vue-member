const install = (Vue:any) => {
  Vue.config.globalProperties.$form = {

    validate(data: any, checkField: any, callback: Function){
      let checkFlag = false
      let message = ""
      for(let i = 0; i < checkField.length; i++){
        debugger
        if(data[checkField[i].name] === undefined || data[checkField[i].name] === ""){
          message = checkField[i].message
          checkFlag = true
          break;
        }
      }
      return callback(checkFlag, message)
    }

  }
}


export default install
