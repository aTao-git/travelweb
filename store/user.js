export const state = () => {
  return {
    states: false,
    userinfo: {
      token: '',
      user: {
        nickname: ''
      }
    }
  }
}
export const mutations = {
  setuserinfo (state, data) {
    state.userinfo = data
  },
  setstates (state, data) {
    state.states = data
  },
  clearuserinfo (state) {
    state.userinfo = {
      userinfo: {
        token: '',
        user: {
          nickname: ''
        }
      }
    }
  }
}
export const actions = {

}
