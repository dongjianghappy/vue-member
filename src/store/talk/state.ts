export interface State {
  commentStatus: any;
  barrageSetting: any;
  barrageStatus: any;
  comprehensiveList: any;
  archive: any;
  channel: any;
  search: any;
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
  questionCate: any
  questionsList: any
}


const initState: State = {
  comprehensiveList: [],
  commentStatus: false,
  barrageSetting: { item: {barrage: ''}, field: 'barrage'},
  barrageStatus: false,
  archive: [],
  channel: {
    all: [],
    talk: [],
    concern: [],
    friend: [],
    article: [],
    picture: [],
    tech: [],
    notes: [],
    funny: [],
    source: [],
    website: [],
    words: [],
    questions: [],
    recommend: [],
    camera: [],
    vlog: [],
    checked_num: 0,
    page: 1,
    pages: 0
  },
  search: {
    all: [],
    talk: [],
    article: [],
    picture: [],
    tech: [],
    notes: [],
    funny: [],
    source: [],
    website: [],
    words: [],
    questions: [],
    page: 1,
    pages: 0,
    related: []
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
  sourceList: [],
  downloadList: [],
  pictureList: [],
  funnyList: [],
  techList: [],
  notesList: [],
  websiteList: [],
  blogList: [],
  wordsList: [],
  questionCate: [],
  questionsList: []
}

export default initState;