import { Message, MessageBox } from 'element-ui'
export default ({ $axios, store }) => {
  $axios.onError((res) => {
    const { statusCode, message } = res.response.data
    if (statusCode === 401 || statusCode === 403) {
      MessageBox.confirm('由于您未登录,暂时不能进行此操作,将跳转到登陆页面,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Message({
          type: 'success',
          message: '请登录!'
        })
        store.commit('user/setstates', true)
      }).catch(() => {
        Message({
          type: 'info',
          message: '已取消该操作!'
        })
      })
    } else if (statusCode === 400) {
      Message.warning(message)
    }
  })
}
