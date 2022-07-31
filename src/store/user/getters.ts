const getters = {
  loginuser: (state: any) => state.user.login.userInfo || {},
  userInfo: (state: any) => state.user.basic.userInfo || {},
  config: (state: any) => state.user.login.config || {},
  config_talk: (state: any) => state.user.login.config && state.user.login.config.talk || {},
  currentUser: (state: any) => (state.user.login.userInfo && state.user.login.userInfo.account) === (state.user.basic.userInfo && state.user.basic.userInfo.account) ? true : false, 

  userInfos: (state: any) => state.userInfo || {},
  hobby: (state: any) => state.hobby || {},
  blogInfo: (state: any) => state.blogInfo || {},
  

  

}

export default getters;