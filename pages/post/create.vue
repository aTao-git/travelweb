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
          <wangEditor :wangeditorcontent="article.content" @sendeditorcontent="sendeditorcontent" />
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
        <span @click="savetodraft">保存到草稿</span>
      </el-col>
      <el-col :span="6">
        <Draft
          v-for="(item, index) in $store.state.post.article"
          :key="index"
          :draftdata="item"
          @showDraftData="showDraftData"
        />
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
      const { id, ...data } = this.article
      this.$axios({
        url: 'http://157.122.54.189:9095/posts',
        method: 'POST',
        data,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userinfo.token} `
        }
      }).then((res) => {
        if (res.status === 200) {
          this.$router.push({
            path: '/post'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    savetodraft () {
      let pass = true
      if (!this.article.title) {
        pass = false
      }
      if (!this.article.content) {
        pass = false
      }
      if (!pass) {
        this.$message({
          type: 'error',
          message: '必须输入标题和内容才可以保存到草稿！'
        })
        return
      }
      if (this.$store.state.post.article.length === 5) {
        this.$message({
          type: 'warning',
          message: '草稿箱最多保存5条数据，请先删除一些再来~'
        })
        return
      }
      this.$store.commit('post/addDraft', { ...this.article })
    },
    showDraftData (data) {
      this.article = { ...data }
      console.log(this.article)
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
