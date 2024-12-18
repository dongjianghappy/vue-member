const getters = {
  loginuser: (state: any) => state.user.login.userInfo || {},
  userInfo: (state: any) => state.user.basic.userInfo || {},
  config: (state: any) => state.user.login.config || {},
  config_talk: (state: any) => state.user.login.config && state.user.login.config.talk || {},
  currentUser: (state: any) => {
    let status = false
    if(state.user.login){
      status = false
    }else if((state.user.login.userInfo && state.user.login.userInfo.account) === (state.user.basic.userInfo && state.user.basic.userInfo.account)){
      status = true
    }

    return status
  },
  // (state.user.login.userInfo && state.user.login.userInfo.account) === (state.user.basic.userInfo && state.user.basic.userInfo.account) ? true : false, 

  basicInfo: (state: any) => state.basicInfo || {},
  hobby: (state: any) => state.hobby || {},
  blogInfo: (state: any) => state.blogInfo || {},
  userSetting: (state: any) => state.user.login.user_setting ? JSON.parse(state.user.login.user_setting) : {},
  system: (state: any) => state.user.login.system || {},
  siteInfo: (state: any) => state.user.login.siteInfo || state.user.basic.siteInfo || {},
  music: (state: any) => state.music || {},
  playSetting: (state: any) => state.playSetting || {},
  isThree: (state: any) => {
      let sessionThree: any = state.isThree
      if(sessionStorage.getItem('isThree')){
        sessionThree = sessionStorage.getItem('isThree')
      }
      return sessionThree
  }
}

export default getters;