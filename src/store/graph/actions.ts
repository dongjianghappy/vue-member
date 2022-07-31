import { Commit } from 'vuex'
import api from '../../api/index'

const actions = {
  NodeDataAction: async (context: { commit: Commit; state: any}, params: any = {}) => {
    context.commit("setNodeData" , params);
  },
}

export default actions;