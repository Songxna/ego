export default {
  namespaced: true,
  state: {
    userinfo: {
      token: '',
      user: ''
    }
  },
  mutations: {
    setUser(state, payload) {
      state.userinfo = payload
    },
    clearUser(state) {
      state.userinfo = {
        token: '',
        user: ''
      }
    }
  },
  actions: {
    // 登录的网络请求
  }
}