<template>
  <div class="postdetail">
    <el-row>
      <el-col :span="17">
        <div class="header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/post' }">
              旅游攻略
            </el-breadcrumb-item>
            <el-breadcrumb-item>详情攻略</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="title">
          <h2>{{ pageshow.title }}</h2>
        </div>
        <el-divider />
        <p class="date">
          <span>攻略：2019-05-22 10:57</span><span style="margin-left: 30px">阅读：6329</span>
        </p>
        <div class="content" v-html="pageshow.content" />
        <div class="postctrl">
          <el-row type="flex" justify="center">
            <div class="ctrlitem">
              <i class="el-icon-chat-dot-square" />
              <p>评论</p>
            </div>
            <div class="ctrlitem">
              <i class="el-icon-star-off" />
              <p>收藏</p>
            </div>
            <div class="ctrlitem">
              <i class="el-icon-share" />
              <p>分享</p>
            </div>
            <div class="ctrlitem">
              <i class="el-icon-thumb" />
              <p>点赞</p>
            </div>
          </el-row>
        </div>
        <!-- 文章评论模块 -->
        <div class="comment">
          <h4 class="cmt-title">
            评论
          </h4>
          <el-tag
            closable
            type="info"
            class="replyTag"
          >
            回复@
          </el-tag>
          <div ref="cmtInput" class="cmt-input">
            <el-input
              type="textarea"
              resize="none"
              placeholder="说点什么吧..."
            />
          </div>
          <el-row type="flex" justify="space-between" class="cmt-input-ctrls">
            <div class="cmt-pics">
              <el-upload
                action="http://157.122.54.189:9095/upload"
                list-type="picture-card"
                name="files"
                :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" src="" alt="">
              </el-dialog>
            </div>
            <div>
              <el-button
                type="primary"
                size="mini"
                class="cmt-submit"
              >
                提交
              </el-button>
            </div>
          </el-row>
          <div v-if="false" class="cmt-empty">
            暂无评论，赶紧抢占沙发！
          </div>
        </div>
      </el-col>
      <el-col :offset="1" :span="6">
        <DetailAside :asideshow="asideshow" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Moment from 'moment'
import DetailAside from '@/components/post/detailaside'
export default {
  components: {
    DetailAside
  },
  data () {
    return {
      pageshow: {
        tilte: '',
        content: ''
      },
      asideshow: [],
      dialogVisible: false
    }
  },
  mounted () {
    const { id } = this.$route.query
    this.$axios({
      url: 'http://157.122.54.189:9095/posts/',
      params: {
        id
      }
    }).then((res) => {
      const { title, content } = res.data.data[0]
      this.pageshow.title = title
      this.pageshow.content = content
    }).catch((err) => {
      console.log(err)
    })
    this.$axios({
      url: 'http://157.122.54.189:9095/posts/recommend',
      params: {
        id
      }
    }).then((res) => {
      const { data } = res.data
      data.forEach((item) => {
        item.updated_at = Moment(item.updated_at).format('YYYY-MM-DD')
      })
      this.asideshow = data
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    handleSuccess (res, file, fileList) {
      console.log(res)
      console.log(file)
      console.log(fileList)
    },
    handleRemove (file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    handlePictureCardPreview (file) {
      console.log(file)
    }
  }
}
</script>

<style lang="stylus" scoped>
.postdetail
  width 1000px
  margin 0 auto
  .header
    margin 25px 0
  .title
    font-size 22px
  .date
    color #999999
    text-align right
    padding 0 20px
  .content
    margin-top 20px
    /deep/ img
      margin 10px 0
      max-width 730px
  .postctrl
    padding 50px 0 30px
    .ctrlitem
      margin 0 20px
      font-size 20px
      text-align center
      cursor pointer
      i
        display block
        font-size 28px
        color orange
        &:nth-child(2)
        i
          transform scale(1.4)
      p
        margin-top 5px
        font-size 14px
        color #999
  .comment
    margin-bottom 20px
  .replyTag
    margin-bottom 10px
  .cmt-title
    font-weight: normal
    font-size 18px
    margin-bottom 20px
  .cmt-input
    margin-bottom 10px
  .cmt-input-ctrls
    margin-bottom 30px
    /deep/ .el-upload--picture-card
      width 100px
      height 100px
      line-height 100px
    /deep/ .el-upload-list
      li
        width 100px
        height 100px
      img
        object-fit cover
  .cmt-empty
    color #999
    font-size 14px
    text-align center
    padding 30px 0
    border 1px dashed #dddddd
  .cmt-list
    border 1px solid solid
  .cmt-item
    border-bottom 1px dashed #dddddd
    padding 20px 20px 5px
    &:last-child
      border-bottom none
    .cmt-content
      padding 0 0 0 30px
    .cmt-info
      margin-bottom 10px
      font-size 12px
      color #666
      *
        vertical-align top
      img
        width 16px
        height 16px
        border-radius 50%
      i
        color #999
      span
        float right
    .cmt-meaage
      margin-top 10px
    .cmt-pic
      width 80px
      height 80px
      border-radius 6px
      overflow hidden
      margin-right 5px
      margin-top 10px
      padding 5px
      border 1px #dddddd dashed
      img
        display block
        width 100%
        height 100%
        object-fit cover
        cursor pointer
</style>
