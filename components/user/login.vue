<template>
  <div class="all">
    <div class="login">
      <el-row type="felx" justify="center" align="center" class="main">
        <div class="form-wrapper">
          <!-- 表单头部tab -->
          <el-row type="flex" justify="center" class="tabs">
            <span v-for="(item,index) in title" :key="index" :class="{ active: currentTab === index }" @click="hadeleChange(index)">
              {{ item }}
            </span>
          </el-row>
          <LoginForm v-if="currentTab === 0" />
          <RegisterForm v-else />
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/user/loginform'
import RegisterForm from '@/components/user/registerform'
export default {
  components: {
    LoginForm,
    RegisterForm
  },
  data () {
    return {
      title: ['登录', '注册'],
      currentTab: 0
    }
  },
  methods: {
    hadeleChange (index) {
      this.currentTab = index
    }
  }
}
</script>

<style lang="stylus">
.all {
  position fixed
  width 100%
  height 100%
  z-index 999
  margin-top -62px
  background rgba(0,0,0,.3)
  .form-wrapper{
    margin-left 40%
    margin-top 18%
    width: 400px;
    background: #fff;
    box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
    overflow: hidden;
    .tabs{
      span{
        display: block;
        width: 50%;
        height: 50px;
        box-sizing: border-box;
        border-top: 2px #eee solid;
        background: #eee;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        color: #666;
        &.active{
          color: orange;
          border-top-color: orange;
          background: #fff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
