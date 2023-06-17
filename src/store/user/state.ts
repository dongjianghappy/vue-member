export interface State {
  user: any;
  basicInfo: any;
  hobby: any;
  blogInfo: any
 
}


const initState: State = {
  user: {
    login: {},
    basic: {}
  },
  basicInfo: {},
  hobby: {},
  blogInfo: {}
}

export default initState;