const mutations = {
  setUserInfo: (state: any, params: any) => {
    state.user.login = params
    state.user.basic = params
  },
  setOtherUser: (state: any, params: any) => {
    state.user.basic = params
  },    
  setUserBaiscInfo: (state: any, params: any) => {
    state.userInfo = params
  },
  setHobby: (state: any, params: any) => {
    state.hobby = params
  }, 
  setBlogInfo: (state: any, params: any) => {
    state.blogInfo = params
  },   
  
}

export default mutations
