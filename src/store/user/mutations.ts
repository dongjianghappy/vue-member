import VueEvent from '../../utils/event'

const mutations = {
  setUserInfo: (state: any, params: any) => {
    state.user.login = params
    if(params.account){
      state.user.basic = params
    }
    VueEvent.emit("setTheme", params);
  },
  setOtherUser: (state: any, params: any) => {
    state.user.basic = params
  },    
  setUserBaiscInfo: (state: any, params: any) => {
    state.basicInfo = params
  },
  setHobby: (state: any, params: any) => {
    state.hobby = params
  }, 
  setBlogInfo: (state: any, params: any) => {
    state.blogInfo = params
  },   
  
}

export default mutations
