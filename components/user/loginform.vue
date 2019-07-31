<template>
  <div class="login">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="form"
    >
      <el-form-item class="form-item" prop="username">
        <el-input
          v-model="form.username"
          placeholder="用户名/手机"
        />
      </el-form-item>

      <el-form-item class="form-item" prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          type="password"
        />
      </el-form-item>

      <p class="form-text">
        <nuxt-link to="#">
          忘记密码
        </nuxt-link>
      </p>

      <el-button
        class="submit"
        type="primary"
        @click="submitLoginForm"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitLoginForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$axios({
            url: '/accounts/login',
            method: 'POST',
            data: this.form
          })
            .then((res) => {
              this.$store.commit('user/setuserinfo', res.data)
              this.$store.commit('user/setstates', true)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.form{
    padding:25px;
}

.form-item{
    margin-bottom:20px;
}

.form-text{
    font-size:12px;
    color:#409EFF;
    text-align: right;
    line-height: 1;
}

.submit{
    width:100%;
    margin-top:10px;
}
</style>
