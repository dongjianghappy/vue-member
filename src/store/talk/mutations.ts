const mutations = {
  setTalkList: (state: any, params: any) => {
    if(params.page === 2){
      state.talkList.list = params.list
    }else{
      state.talkList.list = state.talkList.list.concat(params.list)
    }
    
    state.talkList.page = params.page
    state.talkList.pageNum = params.pageNum
  },
  pushTalkList: (state: any, params: any) => {
      state.talkList.list.unshift(params[0])
  },
  setTalkCollect: (state: any, params: any) => {
    state.talkCollect = params
  }, 
  setTalkComment: (state: any, params: any) => {
    state.talkComment = params
  },    
  setTalkPraise: (state: any, params: any) => {
    state.talkPraise = params
  },  
  setTalkForwarding: (state: any, params: any) => {
    state.talkForwarding = params
  },

  setDownloadList: (state: any, params: any) => {
    state.downloadList = params
  },

  setNotesList: (state: any, params: any) => {
    state.notesList = params
  },
  setWebsiteList: (state: any, params: any) => {
    state.websiteList = params
  }
}

export default mutations
