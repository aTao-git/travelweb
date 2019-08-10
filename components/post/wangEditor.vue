<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;" />
  </div>
</template>
<script>
export default {
  name: 'Editor',
  props: {
    wangeditorcontent: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  }, // 接收父组件的方法
  watch: {
    wangeditorcontent (newString, oldString) {
      this.editorContent = newString
      this.editor.txt.html(this.editorContent)
    }
  },
  mounted () {
    if (process.browser) {
      const E = require('wangeditor')
      this.editor = new E(this.$refs.editorElem)
      this.editor.customConfig.uploadFileName = 'files'
      this.editor.customConfig.uploadImgMaxLength = 5
      this.editor.customConfig.uploadImgServer = 'http://157.122.54.189:9095/upload'
      // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.$emit('sendeditorcontent', this.editorContent)
      }

      this.editor.customConfig.uploadImgHooks = {
        customInsert (insertImg, result, editor) {
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
          console.log(result)
          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          let url = result[0].url
          url = 'http://157.122.54.189:9095' + url
          insertImg(url)

          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }
      this.editor.customConfig.menus = [
      // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      this.editor.create() // 创建富文本实例
    }
  }
}
</script>
<style lang="stylus">

.w-e-text-container
    height 450px !important
</style>
