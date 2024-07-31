const mutations = {
  setData: (state: any, params: any) => {
    state[params.state] = params.data
  }, 
  setComprehensiveList: (state: any, params: any) => {
    let data = params.data
    if(data.page == '1'){
      state.channel[params.state] = data.list
    }else{
      state.channel[params.state] = state.channel[params.state].concat(data.list)
    }
    state.channel.page = data.page
    state.channel.pages = data.pages
    state.channel.checked_num = data.checked_num
    // state.talkList = params
  },  
  setRecommendTalk: (state: any, params: any) => {
    let data = params.data
    state.channel[params.state] = data.list
    state.channel.page = data.page
    state.channel.pages = data.pages
    // state.talkList = params
  }, 
  setArchive: (state: any, params: any) => {
    state.archive = params
  }, 
  setSearchList: (state: any, params: any) => {
    let data = params.data
    if(data.page == '1'){
      state.search[params.state] = data.list
    }else{
      state.search[params.state] = state.search[params.state].concat(data.list)
    }
    state.search.page = data.page
    state.search.pages = data.pages
    state.search.related = data.related || []
    // state.talkList = params
  },     
  setTalkList: (state: any, params: any) => {
    // if(params.page === 2){
    //   state.talkList.list = params.list
    // }else{
    //   state.talkList.list = state.talkList.list.concat(params.list)
    // }
    state.talkList.list = params.list
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
  setTechList: (state: any, params: any) => {
    state.techList = params
  },
  setNotesList: (state: any, params: any) => {
    state.notesList = params
  },
  setWebsiteList: (state: any, params: any) => {
    state.websiteList = params
  },
  setBlogList: (state: any, params: any) => {
    state.blogList = params
  },
  setwordsList: (state: any, params: any) => {
    state.wordsList = params
  },
  setQuestionsCate: (state: any, params: any) => {
    let index = {id: '', name: "综合", icon: 'home'}
    params.unshift(index)
    state.questionCate = params
  },
  setQuestionsList: (state: any, params: any) => {
    state.questionsList = params
  },
  setCommentStatus: (state: any, params: any) => {
    state.commentStatus = params
  },
  setBarrageSetting: (state: any, params: any) => {
    state.barrageSetting.item.barrage = params
  },
  setBarrageStatus: (state: any, params: any) => {
    state.barrageStatus = params
  },



}

export default mutations
