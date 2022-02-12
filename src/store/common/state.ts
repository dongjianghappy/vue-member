export interface State {
  user: any;
  talkList: any;
  talkCollect: any;
  talkComment: any;
  talkPraise: any;
  talkForwarding: any;
  recommendUser: any;
  hotTalk: any;
  lastestVisitor: any
  appstore: any
  integration: any,
  signList: any
  messageBoard: any
  recentJournal: any
  recentPhotos: any
  tripsStatus: boolean,
  activityList: any,
  activity: any,
  concernList: any,
  albumList: any
}


const initState: State = {
  user: {
    login: {},
    basic: {}
  },

  talkList: {
    list: [],
    page: 1,
    pageNum: 0
  },
  talkCollect: [],
  talkComment: [],
  talkPraise: [],
  talkForwarding: [],
  recommendUser: [],
  hotTalk: [],
  lastestVisitor:[],
  appstore: [],
  integration: [],
  signList: [],
  messageBoard: [],
  recentJournal: [],
  recentPhotos: [],
  tripsStatus: false,
  activityList: [],
  activity: {},
  concernList: [],
  albumList: []
}

export default initState;