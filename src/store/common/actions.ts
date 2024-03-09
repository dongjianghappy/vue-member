import { Commit } from 'vuex'
import api from '../../api/index'

const actions = {
  Fetch: async (context: { commit: Commit; state: any}, params: any = {}) => {
    debugger
    const data = params.data || {}
    const { result }:any = await api[params.api || "select"]({
      ...data
    })

    if(params.state){
      context.commit("setData" , {state: params.state, data: result.result});      
  }    
debugger
    return result
  },
  
  Talk: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.talk({
      ...params 
    })
    context.commit("setTalkList" , result.result);
    return result
  },
  TalkCollect: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.TalkCollect({
      ...params 
    })
    context.commit("setTalkCollect" , result.result);
    return result
  },
  TalkComment: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.TalkComment({
      ...params 
    })
    context.commit("setTalkComment" , result.result);
    return result
  },  
  TalkPraise: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.TalkPraise({
      ...params 
    })
    context.commit("setTalkPraise" , result.result);
    return result
  },  
  TalkForwarding: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.TalkForwarding({
      ...params 
    })
    context.commit("setTalkForwarding" , result.result);
    return result
  },  
  RecommendUser: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.RecommendUser({
      ...params 
    })
    context.commit("setRecommendUser" , result.result);
    return result
  },  
  HotTalk: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.HotTalk({
      ...params 
    })
    context.commit("setHotTalk" , result.result);
    return result
  },  
  LastestVisitor: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.LastestVisitor({
      ...params 
    })
    context.commit("setLastestVisitor" , result.result);
    return result
  }, 
  Appstore: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.Appstore({
      ...params 
    })

    context.commit("setAppstore" , result.result);
    return result
  }, 
  Integration: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.Integration({
      ...params 
    })

    context.commit("setIntegration" , result.result);
    return result
  },   
  Goldcoin: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.Goldcoin({
      ...params 
    })

    context.commit("setGoldcoin" , result.result);
    return result
  }, 
  SignList: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.SignList({
      ...params 
    })

    context.commit("setSignList" , result.result);
    return result
  },   
  MessageBoard: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.MessageBoard({
      ...params 
    })

    context.commit("setMessageBoard" , result.result);
    return result
  },   
  RecentJournal: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.RecentJournal({
      ...params 
    })

    context.commit("setRecentJournal" , result.result);
    return result
  },   
  RecentPhotos: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.RecentPhotos({
      ...params 
    })

    context.commit("setRecentPhotos" , result.result);
    return result
  },
  uploadImg: async (context: { commit: Commit; state: any}, params: any = {}) => {
    debugger
    const {result}:any = await api.uploadImage({
      ...params 
    })
    return result.result
  } ,
  TripsStatus: async (context: { commit: Commit; state: any}, params: any = {}) => {
    context.commit("setTripsStatus" , params);
    
  },
  ActivityList: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.ActivityList({
      ...params 
    })
    context.commit("setactivityList" , result.result);
    return result
    
  },   
  Activity: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.Activity({
      ...params 
    })
    context.commit("setactivity" , result.result);
    return result
    
  }, 
  Attribute: async (context: { commit: Commit; state: any}, params: any = {}) => {
    context.commit("setAttribute" , params);
    
  },
  ConcernList: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.ConcernList({
      ...params 
    })
    context.commit("setConcernList" , result.result);
    return result
    
  }, 
  AlbumList: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const { result }:any = await api.talkAlbum({
      ...params 
    })
    context.commit("setAlbumList" , result.result);
    return result
    
  }, 
  
}

export default actions;