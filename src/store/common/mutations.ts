const mutations = {
  setUserInfo: (state: any, params: any) => {
    state.user.login = params
    state.user.basic = params
  },
  setOtherUser: (state: any, params: any) => {
    state.user.basic = params
  },  
  setTalkList: (state: any, params: any) => {
    if(params.page === 2){
      state.talkList.list = params.list
    }else{
      state.talkList.list = state.talkList.list.concat(params.list)
    }
    
    state.talkList.page = params.page
    state.talkList.pageNum = params.pageNum
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
  
  setRecommendUser: (state: any, params: any) => {
    state.recommendUser = params
  },    
  setHotTalk: (state: any, params: any) => {
    const result = [];
    for(let i=0,len=params.length;i<len;i+=5){
      result.push(params.slice(i,i+5));
    }  
    state.hotTalk = result
  },  
  setLastestVisitor: (state: any, params: any) => {
    state.lastestVisitor = params
  },   
  setAppstore: (state: any, params: any) => {
    state.appstore = params
  },   
  setIntegration: (state: any, params: any) => {
    state.integration = params
  }, 
  setSignList: (state: any, params: any) => {
    state.signList = params
  },   
  setMessageBoard: (state: any, params: any) => {
    state.messageBoard = params
  }, 
  setRecentJournal: (state: any, params: any) => {
    state.recentJournal = params
  },   
  setRecentPhotos: (state: any, params: any) => {
    state.recentPhotos = params
  },  
  setTripsStatus: (state: any, params: any) => {
    state.tripsStatus = params
  }, 
  
  setactivityList: (state: any, params: any) => {
    state.activityList = params
  },  
  setactivity: (state: any, params: any) => {
    state.activity = params
  },   
  setAttribute: (state: any, params: any) => {
    state[params.name] = params.value
    // state.activity = params
  },   
  setConcernList: (state: any, params: any) => {
    state.concernList = params
  }, 
  setAlbumList: (state: any, params: any) => {
    state.albumList = params
  },   
  
  
}

export default mutations
