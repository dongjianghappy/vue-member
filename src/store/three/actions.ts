import { Commit } from 'vuex'
import api from '../../api/index'
import VueEvent from '../../utils/event'
import {
  getUid,
  writeNewStyle
} from '../..//utils'

const actions = {
  config: async (context: { commit: Commit; state: any}, params: any = {}) => {
    const data = params.data || {}
    const { result }:any = await api.threeConfig({
      ...data 
    })
    context.commit("setConfig" , result.result);
    sessionStorage.setItem('threeConfig', JSON.stringify(result.result))
    return result
  },    
  
  
}

export default actions;