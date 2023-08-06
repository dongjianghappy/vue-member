const getters = {
 
  talkList: (state: any) => state.talkList || [],  
  talkCollect: (state: any) => state.talkCollect || [],   
  talkComment: (state: any) => state.talkComment || [],   
  talkPraise: (state: any) => state.talkPraise || [], 
  talkForwarding: (state: any) => state.talkForwarding || [], 
  downloadList: (state: any) => state.downloadList || [],
  sourceList: (state: any) => state.sourceList || [], 
  pictureList: (state: any) => state.pictureList || [], 
  funnyList: (state: any) => state.funnyList || [], 
  techList: (state: any) => state.techList || [], 
  notesList: (state: any) => state.notesList || [], 
  websiteList: (state: any) => state.websiteList || [], 
  blogList: (state: any) => state.blogList || [], 
  wordsList: (state: any) => state.wordsList || [], 
}

export default getters;