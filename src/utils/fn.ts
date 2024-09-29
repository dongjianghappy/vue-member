// 图片上传
export const image = (a: any, param: any) => {
  param.img = a
}

// 选择表情或话题
export const chooseTalk = (detail: any, param: any) => {
  let word_arr = detail.summary.split('#')
  let arr2 = detail.summary.split('@')

  if (param[0] === '@' || (param.indexOf("@") > -1 && arr2[arr2.length - 1].indexOf(" ") === -1)) {
    if (detail.summary[detail.summary.length - 1] === '@') {
      let str = detail.summary.substring(0, detail.summary.length - 1)
      detail.summary = str + param
    } else if (arr2[arr2.length - 1].indexOf(" ") === -1) {
      let index = detail.summary.lastIndexOf('@' + arr2[arr2.length - 1])
      let str = detail.summary.substr(0, index)
      detail.summary = str + param
    } else {
      detail.summary = detail.summary + param
    }
  } else if (param[0] === '#' || (param.indexOf("#") > -1 && word_arr[word_arr.length - 1].indexOf(" ") === -1)) {
    if (detail.summary[detail.summary.length - 1] === '#') {
      let str = detail.summary.substring(0, detail.summary.length - 1)
      detail.summary = str + param
    } else if (word_arr[word_arr.length - 1].indexOf(" ") === -1) {
      let index = detail.summary.lastIndexOf('#' + word_arr[word_arr.length - 1])
      let str = detail.summary.substr(0, index)
      detail.summary = str + param
    } else {
      detail.summary = detail.summary + param
    }
  } else {
    detail.summary = detail.summary + param
  }
}

// 播报
export const handleBroadcast = (param: any) => {
  const speakMsg = new SpeechSynthesisUtterance()
  let speech: any = param
  speakMsg.text = speech; //文字内容
  speakMsg.lang = "zh-CN"; //使用的语言:中文
  speakMsg.volume = 1;
  //声音音量:0-1
  speakMsg.rate = 1;
  //语速:0-10
  speakMsg.pitch = 10;
  //音高:0-1
  window.speechSynthesis.speak(speakMsg)
}

// 复制
export const handleCopy = (e: any, param: any) => {
  if (navigator.clipboard && window.isSecureContext) {
    // proxy.$hlj.message({
    //   msg: "复制成功"
    // })
    return navigator.clipboard.writeText(param)
  } else {
    let copy = e.target
    let divParent = copy.parentNode; //获取该div的父节点
    let input = document.createElement('input');
    divParent.insertBefore(input, copy);
    input.focus();
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    input.blur();
    // proxy.$hlj.message({
    //   msg: "复制成功"
    // })
    input.remove();
  }
}


export const downloadBlob = (param: any) => {
  try {
    let blob = new Blob([param], { type: 'image/jpeg' })

    // const fileReader = new FileReader()
    // fileReader.onload = function(event: any){
    //   debugger
    //   const text = event.target.result.replace(/\s+/g, '')
    // }
    // fileReader.readAsText(blob)
              // 创建a标签，通过a标签实现下载
              const dom = document.createElement('a')
              dom.href = URL.createObjectURL(blob)
              dom.download = 'image.jpg'
              dom.style.display = 'none'
              document.body.appendChild(dom)

              // 触发点击事件
              dom.click()

              // 释放资源
              URL.revokeObjectURL(dom.href)
    // const blob = param //创建下载的链接
    // let blob = new Blob([param], { type: 'image/jpeg' })
    // let blob = new Blob([param], { type: 'audio/mpeg' })
    // // 谷歌浏览器 创建a标签 添加download属性下载
    // const downloadElement = document.createElement('a')
    // downloadElement.href = URL.createObjectURL(blob)
    // // downloadElement.href = blob
    
    // downloadElement.target = '_blank'
    // downloadElement.download = "13.mp4"
    // document.body.appendChild(downloadElement)
    // downloadElement.click() // 点击下载
    // document.body.removeChild(downloadElement) // 下载完成移除元素
    // window.URL.revokeObjectURL(blob) // 释放掉blob对象
  } catch (e) {
    console.log('下载失败')
  }
}


// 播报
export const move = (param: any) => {
  let isDrag: any = false
  let el: any = document.getElementById('move-music')
  el.addEventListener('mousedown', (ev: any) => {
     let els = ev.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
    isDrag = true
    ev.preventDefault()
    // ev.stopPropagation()
    let oevent = ev || event
    let distanceX = oevent.clientX //鼠标点击位置
    let distanceY = oevent.clientY //鼠标点击位置

    document.onmousemove = function (e: any) {

      if (!isDrag) {
        return
      }

      els.style.top = e.clientY - ev.layerY + "px"
      els.style.left = e.clientX - ev.layerX + "px"
    }
  })

  el.addEventListener('mouseup', (ev: any) => {
    isDrag = false

  })
}


// Dom元素显示与隐藏
export const domIsShow: any = {
  showDom: (param: any = {}) => {
    let theme: any = document.getElementsByClassName('theme')
    let energy: any = document.getElementById('energy-wrap')
    let themeAlbum: any = document.getElementById('theme-album')
    let timeClock: any = document.getElementById('time-clock')

    let theme_status = param.theme && param.theme.theme_album == '1'
    
    if(energy) energy.style.display = "block"
    if(themeAlbum && theme_status) themeAlbum.style.display = "block"
    if(timeClock) timeClock.style.display = "block"
    if (theme.length) {
      theme[0].style.zIndex = "10000"
    }
  },
  hideDom: () => {
    let theme: any = document.getElementsByClassName('theme')
    let energy: any = document.getElementById('energy-wrap')
    let themeAlbum: any = document.getElementById('theme-album')
    let timeClock: any = document.getElementById('time-clock')

    if (theme.length) {
      theme[0].style.zIndex = "-1"
    }
    energy.style.display = "none"
    if(themeAlbum) themeAlbum.style.display = "none"
    if(timeClock) timeClock.style.display = "none"
  }
}