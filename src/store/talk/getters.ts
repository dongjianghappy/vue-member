const getters = {
 
  talkList: (state: any) => state.talkList || [],  
  talkCollect: (state: any) => state.talkCollect || [],   
  talkComment: (state: any) => state.talkComment || [],   
  talkPraise: (state: any) => state.talkPraise || [], 
  talkForwarding: (state: any) => state.talkForwarding || [], 
  downloadList: (state: any) => state.downloadList || [], 
  notesList: (state: any) => state.notesList || [], 
  websiteList: (state: any) => state.websiteList || [], 
  blogList: (state: any) => state.blogList || [], 
}

export default getters;