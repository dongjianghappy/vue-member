import VueEvent from '../../utils/event'

const mutations = {
  setUserInfo: (state: any, params: any) => {
    state.user.login = params
    if(params.account){
      state.user.basic = params
    }
    state.music.list = params.userInfo.music.list
    state.music.setting = params.userInfo.music.setting
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
  setEnergy: (state: any, params: any) => {
    state.user.login.userInfo.energy = params.energy
    state.user.login.userInfo.energy_ball = params.energy_ball
  },
  setMusicList: (state: any, params: any) => {
    state.music.list = params
  },   
  setCurrentMusic: (state: any, params: any) => {
    state.music.currentMusic = params
  },    
  setPlaySetting: (state: any, params: any) => {
    state.music.setting[params.name] = params.value
  },
  setIsThree: (state: any, params: any) => {
    state.isThree = params
    sessionStorage.setItem("isThree", params)
  },       
}

export default mutations
