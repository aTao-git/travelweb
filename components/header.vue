<template>
  <div class="header">
    <div class="main">
      <el-row type="flex" justify="space-between">
        <div class="logo">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt="">
        </div>
        <div class="menu">
          <nuxt-link to="/">
            首页
          </nuxt-link>
          <nuxt-link to="/post">
            旅游推荐
          </nuxt-link>
          <nuxt-link to="/hotel">
            酒店
          </nuxt-link>
          <nuxt-link to="/air">
            国内机票
          </nuxt-link>
        </div>
        <div class="login">
          <div v-if="false" class="beforelogin">
            <nuxt-link to="/user/login">
              登陆 / 注册
            </nuxt-link>
          </div>
          <div v-else class="islogin">
            <el-dropdown>
              <span class="el-dropdown-link">
                <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt="">
                {{ $store.state.user.userinfo.user.nickname }}<i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$store.state.user.userinfo.user.nickname)
  }
}
</script>

<style lang="stylus" scoped>
$bluecolor = #409eff
.header
  height 60px
  line-height 60px
  border 1px solid #cccccc
  box-shadow 0 3px 3px #eeeeee
  .main
    width 1000px
    margin 0 auto
    .logo
      img
        width 156px
        height 42px
        margin-top 9px
    .menu
      margin-left 20px
      flex 1
      display flex
      .nuxt-link-exact-active
        background $bluecolor
        color #ffffff
        &:hover
          color #ffffff
      a
        display block
        height 60px
        padding 0 20px
        box-sizing border-box
        &:hover
          border-bottom 5px solid $bluecolor
          color $bluecolor
    .login
      a
        &:hover
          color $bluecolor
      .islogin
        .el-dropdown-link
          &:hover
            img
              border 2px solid $bluecolor
          img
            width 36px
            height 36px
            vertical-align middle
            border 2px solid #ffffff
            border-radius 50%
</style>
