const getters = {
  recommendUser: (state: any) => state.recommendUser || [],   
  hotTalk: (state: any) => state.hotTalk || [], 
  ranking: (state: any) => state.ranking || [], 
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
  

  

}

export default getters;