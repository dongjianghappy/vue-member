export interface State {
  user: any;
  userInfos: any;
  hobby: any;
  blogInfo: any
 
}


const initState: State = {
  user: {
    login: {},
    basic: {}
  },
  userInfos: {},
  hobby: {},
  blogInfo: {}
}

export default initState;