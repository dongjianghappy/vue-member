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
  comprehensive: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.comprehensive({
      ...data 
    })
    context.commit("setComprehensiveList" , {state: params.state, data: result.result});
    return result
  },
  recommendTalk: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.recommendTalk({
      ...data 
    })
    context.commit("setRecommendTalk" , {state: params.state, data: result.result});
    return result
  },
  Archive: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.Calendar({
      ...data 
    })
    context.commit("setArchive" , result.result);
    return result
  },
  search: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.search({
      ...data 
    })
    context.commit("setSearchList" , {state: params.state, data: result.result});
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
    const data = params.data || {}
    const { result }:any = await api.TalkComment({
      ...data 
    })
    context.commit("setTalkComment" , result.result);
    return result
  },  
  TalkPraise: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.TalkPraise({
      ...data 
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
  TalkDownload: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.TalkDownload({
      ...data 
    })
    context.commit("setTalkDownload" , result.result);
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
  questionCate: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.select({
      ...data 
    })
    context.commit("setQuestionsCate" , result.result);
    return result
  }, 
  questions: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.questionsList({
      ...data 
    })
    context.commit("setQuestionsList" , result.result);
    return result
  },    
  
}

export default actions;