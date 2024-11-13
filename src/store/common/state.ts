export interface State {
  mode: any
  isEditTheme: any;
  recommendUser: any;
  announcement: any;
  hot: any;
  hotTalk: any;
  ranking: any;
  visitor: any
  appstore: any
  integration: any,
  goldcoin: any,
  energyList: any,
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
  isSea: any;
}


const initState: State = {
  mode: 'sun',
  isEditTheme: false,
  recommendUser: [],
  announcement: [],
  hot: [],
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
  energyList: [],
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
  slideshow: [],
  isSea: false
}

export default initState;