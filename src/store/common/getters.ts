const getters = {
  mode: (state: any) => state.mode || 'sun', 
  isEditTheme: (state: any) => state.isEditTheme,
  recommendUser: (state: any) => state.recommendUser || [],   
  hotTalk: (state: any) => state.hotTalk || [], 
  ranking: (state: any) => state.ranking || [], 
  visitor: (state: any) => state.visitor || [], 
  appstore: (state: any) => state.appstore || [], 
  integration: (state: any) => state.integration || [], 
  goldcoin: (state: any) => state.goldcoin || [], 
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
  announcement: (state: any) => state.announcement || [],
  slideshow: (state: any) => state.slideshow || []
  

}

export default getters;