// 更新保存
 const selection = {
  mouseup: function (e: any, wordsList: any){
    let Objiect = this.getSelectionContent(e)
      let con = Objiect.selectedText
      let i = Objiect.rangePos
      let o: any = this.calculateStr(con)
      if (76 >= o) {
        this.selectSearchShow(con, i, e.target, wordsList)
      }
  },
  getSelectionContent: function(e: any){
    let Obj: any = {}
    let text = window.getSelection()
    let ob: any = {}
    let i = "";

    if (text && 0 !== text.rangeCount) {
      Obj = text.getRangeAt(0)
      ob = Obj && Obj.getBoundingClientRect()
      i = text.toString()
    }
    return {
      rangePos: ob,
      selectedText: i
    }
  },
  selectSearchShow: function(con: any, i: any, e: any, wordsList: any) {
    if (con.length === 0) {
      return
    }

    if (wordsList.indexOf(con) === -1) {
      wordsList.push(con)
    }
  },
  calculateStr: function(con: any) {

    let str = 0
    for (let i = 0; i < con.length; i++) {
      let text = con.charAt(i);
      if (null !== text.match(/[^\x00-\xff]/gi)) {
        str = str + 2

      } else {
        str = str + 1
      }

      if (str > 76) {
        break
      }

    }

    return str
  }
}

export default selection
      