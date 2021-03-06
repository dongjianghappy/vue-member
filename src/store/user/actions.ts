import { Commit } from 'vuex'
import api from '../../api/index'

const actions = {
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