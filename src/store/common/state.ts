export interface State {
  mode: any
  isEditTheme: any;
  recommendUser: any;
  announcement: any;
  hotTalk: any;
  ranking: any;
  visitor: any
  appstore: any
  integration: any,
  goldcoin: any,
  signList: any
  messageBoard: any
  recentJournal: any
  recentPhotos: any
  tripsStatus: boolean,
  activityList: any,
  activity: any,
  concernList: any,
  albumList: any,
  slideshow: any,
}


const initState: State = {
  mode: 'sun',
  isEditTheme: false,
  recommendUser: [],
  announcement: [],
  hotTalk: [],
  ranking: [],
  visitor:{
    today: 0,
    total: 0,
    list: []
  },
  appstore: [],
  integration: [],
  goldcoin: [],
  signList: [],
  messageBoard: [],
  recentJournal: [],
  recentPhotos: [],
  tripsStatus: false,
  activityList: [],
  activity: {
    basic: {},
    vote: {},
    list: []
  },
  concernList: [],
  albumList: [],
  slideshow: []
}

export default initState;