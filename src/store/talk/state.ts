export interface State {
  talkList: any;
  talkCollect: any;
  talkComment: any;
  talkPraise: any;
  talkForwarding: any;
  sourceList: any
  downloadList: any;
  pictureList: any;
  funnyList: any;
  techList: any;
  notesList: any;
  websiteList: any
  blogList: any
  wordsList: any
}


const initState: State = {
  talkList: {
    list: [],
    page: 1,
    pageNum: 0
  },
  talkCollect: [],
  talkComment: [],
  talkPraise: [],
  talkForwarding: [],
  sourceList: [],
  downloadList: [],
  pictureList: [],
  funnyList: [],
  techList: [],
  notesList: [],
  websiteList: [],
  blogList: [],
  wordsList: []
}

export default initState;