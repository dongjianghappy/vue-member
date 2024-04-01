const mutations = {
  setMode: (state: any, params: any) => {
    state.mode = params
  }, 
  setTheme: (state: any, params: any) => {
    state.isEditTheme = params
    sessionStorage.setItem('editPendant', params)
  },  
  setData: (state: any, params: any) => {
    debugger
    state[params.state] = params.data
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
    const result = [];
    for(let i=0,len=params.length;i<len;i+=4){
      result.push(params.slice(i,i+4));
    } 
    state.recommendUser = result 
  },    
  setHotTalk: (state: any, params: any) => {
    const result = [];
    for(let i=0,len=params.hotTalk.length;i<len;i+=5){
      result.push(params.hotTalk.slice(i,i+5));
    } 
    state.hotTalk = result
    state.ranking = params.ranking
  },  
  setLastestVisitor: (state: any, params: any) => {
    params.list = params.list || []
    const result = [];
    for(let i=0,len=params.list.length;i<len;i+=9){
      result.push(params.list.slice(i,i+9));
    } 
    state.visitor.today = params.today 
    state.visitor.total = params.total
    state.visitor.list = result   
    // state.lastestVisitor = params
  },   
  setAppstore: (state: any, params: any) => {
    state.appstore = params
  },   
  setIntegration: (state: any, params: any) => {
    state.integration = params
  }, 
  setGoldcoin: (state: any, params: any) => {
    state.goldcoin = params
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
