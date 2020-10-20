




const state = {
  isBlue: JSON.parse(window.sessionStorage.getItem('isBlue')) || false
}

const mutations = {
  Change_Color(state){
    
    state.isBlue = !state.isBlue
    window.sessionStorage.setItem('isBlue', JSON.stringify(state.isBlue) )
  }
}

const actions = {
  changecolor({commit}){
   commit('Change_Color')    
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
