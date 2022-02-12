const getters = {
  loginuser: (state: any) => state.user.login.userInfo || {},
  userInfo: (state: any) => state.user.basic.userInfo || {},
  groups: (state: any) => state.user.login.groups || {},
  talkList: (state: any) => state.talkList || [],  
  talkCollect: (state: any) => state.talkCollect || [],   
  talkComment: (state: any) => state.talkComment || [],   
  talkPraise: (state: any) => state.talkPraise || [], 
  talkForwarding: (state: any) => state.talkForwarding || [], 
  recommendUser: (state: any) => state.recommendUser || [],   
  hotTalk: (state: any) => state.hotTalk || [], 
  lastestVisitor: (state: any) => state.lastestVisitor || [], 
  appstore: (state: any) => state.appstore || [], 
  integration: (state: any) => state.integration || [], 
  signList: (state: any) => state.signList || [],   
  messageBoard: (state: any) => state.messageBoard || [],   
  recentJournal: (state: any) => state.recentJournal || [],   
  recentPhotos: (state: any) => state.recentPhotos || [],   
  tripsStatus: (state: any) => state.tripsStatus || [], 
  activityList: (state: any) => state.activityList || [], 
  activity: (state: any) => state.activity.basic || {},
  vote: (state: any) => state.activity.vote || {},  
  activityData: (state: any) => state.activity.list || [], 
  concernList: (state: any) => state.concernList || [], 
  albumList: (state: any) => state.albumList || [], 
  currentUser: (state: any) => (state.user.login.userInfo && state.user.login.userInfo.account) === (state.user.basic.userInfo && state.user.basic.userInfo.account) ? true : false, 

  

}

export default getters;