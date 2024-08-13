export interface State {
  user: any;
  basicInfo: any;
  hobby: any;
  blogInfo: any,
  music: any,
  playSetting: any
}


const initState: State = {
  user: {
    login: {},
    basic: {},
    userSetting: {}
  },
  basicInfo: {},
  hobby: {},
  blogInfo: {},
  music: {
    list: [],
    currentMusic: {},
    setting: {}
  },
  playSetting: {}
}

export default initState;