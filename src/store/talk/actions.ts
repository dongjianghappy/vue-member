import { Commit } from 'vuex'
import api from '../../api/index'

const actions = {
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
  download: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.downloadList({
      ...data 
    })
    context.commit("setDownloadList" , result.result);
    return result
  },  
  notes: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.notesList({
      ...data 
    })
    context.commit("setNotesList" , result.result);
    return result
  },  
  website: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.websiteList({
      ...data 
    })
    context.commit("setWebsiteList" , result.result);
    return result
  },    
  
  
}

export default actions;