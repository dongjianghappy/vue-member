import { Commit } from 'vuex'
import api from '../../api/index'

const actions = {
  Module: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.module({
      ...data 
    })
    context.commit("setData" , {state: params.state, data: result.result});
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
  download: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.downloadList({
      ...data 
    })
    context.commit("setDownloadList" , result.result);
    return result
  },  
  tech: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.techList({
      ...data 
    })
    context.commit("setTechList" , result.result);
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
  blog: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.blogList({
      ...data 
    })
    context.commit("setBlogList" , result.result);
    return result
  }, 
  commonSenseQuotes: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.commonSenseQuotes({
      ...data 
    })
    context.commit("sethanyuList" , result.result);
    return result
  },     
  
  
}

export default actions;