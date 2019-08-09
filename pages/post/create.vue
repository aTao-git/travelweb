<template>
  <div class="create">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="title">
          <h2>发表新攻略</h2>
          <p>分享你的个人游记，让更多人看到！</p>
          <el-input
            v-model="article.title"
            style="margin-top: 13px"
            placeholder="请输入标题"
            clearable
          />
        </div>
        <div class="editor">
          <wangEditor @sendeditorcontent="sendeditorcontent" />
        </div>
        <div class="chosecity">
          <h3>选择城市</h3>
          <el-autocomplete
            v-model="city"
            :fetch-suggestions="querySearchAsync"
            placeholder="请搜索游玩城市"
            @select="handleSelectcity"
          />
        </div>
        <el-button style="margin-right: 15px" type="success" @click="publisharticle">
          发布
        </el-button>
        <i style="font-style: normal">或者</i>
        <span>保存到草稿</span>
      </el-col>
      <el-col :span="6">
        <Draft />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import wangEditor from '@/components/post/wangEditor'
import Draft from '@/components/post/draft'
export default {
  components: {
    wangEditor,
    Draft
  },
  data () {
    return {
      article: {
        title: '',
        content: '',
        city: ''
      },
      city: ''
    }
  },
  methods: {
    sendeditorcontent (data) {
      this.article.content = data
    },
    querySearchAsync (string, cb) {
      let newData = []
      if (!string) {
        return cb(newData)
      }
      this.$axios({
        url: '/airs/city',
        params: {
          name: string
        }
      }).then((res) => {
        const { data } = res.data
        newData = data.map((item) => {
          item.value = item.name
          return item
        })
        cb(newData)
        if (newData.length > 0) {
          setTimeout(() => {
            this.city = newData[0].value
            this.article.city = newData[0].id
          }, 1000)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSelectcity (value) {
      this.city = value.name
      this.article.city = value.id
    },
    publisharticle () {
      if (!this.article.title) {
        this.$message({
          type: 'error',
          message: '必须输入标题！'
        })
        return
      }
      if (!this.article.content) {
        this.$message({
          type: 'error',
          message: '必须输入内容！'
        })
        return
      }
      if (!this.article.city) {
        this.$message({
          type: 'error',
          message: '必须选择城市！'
        })
        return
      }
      this.$axios({
        url: 'http://157.122.54.189:9095/posts',
        method: 'POST',
        data: this.article
      }).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.create
  width 1000px
  margin 20px auto
  .title
    h2
      font-weight normal
    p
      margin-top 10px
      font-size 14px
      color #c0c4cc
  .editor
    margin-top 20px
  .chosecity
    margin-top 30px
    margin-bottom 30px
    display flex
    h3
      text-align center
      margin-right 20px
      line-height 40px
      font-weight normal
      font-size 14px
  i
    font-size 14px
    font-style normal
  span
    cursor pointer
    font-size 14px
    color #ffa500
    text-decoration underline
</style>
