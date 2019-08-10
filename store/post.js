export const state = () => {
  return {
    article: [],
    showdraft: {}
  }
}
export const mutations = {
  addDraft (state, data) {
    data.id = state.article.length + 1
    state.article.push(data)
    console.log(state)
  },
  removeDraft (state, id) {
    state.article.forEach((v, index) => {
      if (v.id === id) {
        state.article.splice(index, 1)
      }
    })
  },
  sendDraft (state, id) {
    state.article.forEach((v) => {
      if (v.id === id) {
        state.showdraft = v
      }
    })
  }
}
