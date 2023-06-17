export interface State {
  recommendUser: any;
  announcement: any;
  hotTalk: any;
  ranking: any;
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
  recommendUser: [],
  announcement: [],
  hotTalk: [],
  ranking: [],
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