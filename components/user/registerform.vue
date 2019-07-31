<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="form"
  >
    <el-form-item class="form-item" prop="username">
      <el-input
        v-model="form.username"
        placeholder="用户名手机"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input
        v-model="form.captcha"
        placeholder="验证码"
      >
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input
        v-model="form.nickname"
        placeholder="你的名字"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        v-model="form.password"
        placeholder="密码"
        type="password"
      />
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input
        v-model="form.checkPassword"
        placeholder="确认密码"
        type="password"
      />
    </el-form-item>

    <el-button
      class="submit"
      type="primary"
      @click="handleRegSubmit"
    >
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        captcha: '',
        password: '',
        nickname: '',
        checkPassword: ''
      },
      rules: {
        username: [ { required: true, message: '用户名不能为空', trigger: 'blur' } ],
        captcha: [ { required: true, message: '手机验证码不能为空', trigger: 'blur' } ],
        nickname: [ { required: true, message: '昵称不能为空', trigger: 'blur' } ],
        password: [ { required: true, message: '密码不能为空', trigger: 'blur' } ],
        checkPassword: [ { validator: validatePass, trigger: 'blur' } ]
      }
    }
  },
  methods: {
    handleSendCaptcha () {
      this.$axios({
        url: '/captchas',
        method: 'POST',
        data: { tel: this.form.username }
      }).then((res) => {
        this.$message({
          type: 'success',
          message: '您的验证码是' + res.data.code
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleRegSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { checkPassword, ...temp } = this.form
          this.$axios({
            url: '/accounts/register',
            method: 'POST',
            data: temp
          }).then((res) => {
            this.$store.commit('user/setuserinfo', res.data)
            this.$store.commit('user/setstates', true)
          }).catch((err) => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
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
