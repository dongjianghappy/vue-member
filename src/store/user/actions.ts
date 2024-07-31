import { Commit } from 'vuex'
import api from '../../api/index'
import VueEvent from '../../utils/event'
import {
  getUid,
  writeNewStyle
} from '../..//utils'

const actions = {
  Detect: async (context: { commit: Commit; state: any}, params: any = {uid: getUid()}) => {
    const { result }:any = await api.Detect({
      ...params 
    })
    if(result.result.status != '2'){
      sessionStorage.setItem("userInfo", JSON.stringify(result.result.userInfo))
      sessionStorage.setItem("theme", JSON.stringify(result.result.userInfo.theme))
    }
    writeNewStyle(result.result.userInfo.theme.theme[0])
    context.commit("setUserInfo" , result.result);
   
    return result
  },
  OtherUserInfo: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.OtherUserInfo({
      ...params 
    })
    // sessionStorage.setItem("otherUser", JSON.stringify(result.result.userInfo))
    sessionStorage.setItem("userInfo", JSON.stringify(result.result.userInfo))
    sessionStorage.setItem("theme", JSON.stringify(result.result.userInfo.theme))    
    writeNewStyle(result.result.userInfo.theme.theme[0])
    context.commit("setOtherUser" , result.result);
    VueEvent.emit("setTheme")   
    return result.result
  },
  Login: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.login({
      ...params 
    })
   
    return result
  },  
  UserBaiscInfo: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.UserBaiscInfo({
      ...params 
    })
    context.commit("setUserBaiscInfo" , result.result);
    return result
  }, 

  UserHobby: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.UserHobby({
      ...params 
    })
    context.commit("setHobby" , result.result);
    return result
  },  
  
  BlogInfo: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.BlogInfo({
      ...params 
    })
    context.commit("setBlogInfo" , result.result);
    return result
  },    
  
  
}

export default actions;