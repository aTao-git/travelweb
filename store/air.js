export const state = () => {
  return {
    history: []
  }
}
export const mutations = {
  setHistory (state, data) {
    state.history.unshift(data)
    if (state.history.length > 5) {
      state.history.length = 5
    }
  }
}
