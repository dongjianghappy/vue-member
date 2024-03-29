import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'


const graph = {
  namespaced: true,
	state,
	actions,
	mutations,
	getters,
}

export default graph