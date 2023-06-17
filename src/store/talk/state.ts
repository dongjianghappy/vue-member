export interface State {
  talkList: any;
  talkCollect: any;
  talkComment: any;
  talkPraise: any;
  talkForwarding: any;
  downloadList: any;
  notesList: any;
  websiteList: any
  blogList: any
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
  downloadList: [],
  notesList: [],
  websiteList: [],
  blogList: []
}

export default initState;