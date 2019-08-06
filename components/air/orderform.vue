<template>
  <div class="main">
    <div class="air-column">
      <h2>乘机人</h2>
      <el-form class="member-info">
        <div v-for="(item,index) in orderform.users" :key="index" class="member-info-item">
          <el-form-item label="乘机人类型">
            <el-input v-model="item.username" placeholder="姓名" class="input-with-select">
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="成人" value="1" />
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input
              v-model="item.id"
              placeholder="证件号码"
              class="input-with-select"
            >
              <el-select
                slot="prepend"
                value="1"
                placeholder="请选择"
              >
                <el-option label="身份证" value="1" :checked="true" />
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">
        添加乘机人
      </el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div v-for="(item,index) in insurancesList" :key="index" class="insurance-item">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×${orderform.users.length}  最高赔付${item.compensation}`"
            border
            @change="changeCheck(item.id)"
          />
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="orderform.contactName" />
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="orderform.contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha">
                  发送验证码
                </el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="orderform.captcha" />
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">
          提交订单
        </el-button>
        <input type="hidden" :value="allPrice">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      orderform: {
        users: [
          {
            username: '',
            id: ''
          }
        ],
        insurances: [],
        contactName: '',
        contactPhone: '',
        captcha: '',
        invoice: false,
        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      },
      insurancesList: [],
      flightInfoList: {}
    }
  },
  computed: {
    allPrice () {
      let allPrice = 0
      if (!this.flightInfoList.seat_infos) {
        return 0
      }
      allPrice += this.flightInfoList.seat_infos.org_settle_price
      allPrice += this.flightInfoList.airport_tax_audlet
      if (this.orderform.insurances) {
        this.orderform.insurances.forEach((item) => {
          this.insurancesList.forEach((item2) => {
            if (item === item2.id) {
              allPrice += item2.price
            }
          })
        })
      }
      allPrice *= this.orderform.users.length
      this.$emit('sendPrice', { allPrice, amount: this.orderform.users.length })
      return allPrice
    }
  },
  mounted () {
    this.$axios({
      url: `/airs/${this.$route.query.id}`,
      params: {
        seat_xid: this.$route.query.seat_xid
      }
    }).then((res) => {
      this.insurancesList = res.data.insurances
      this.flightInfoList = res.data
      this.$emit('sendAirData', res.data)
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    // 添加乘机人
    handleAddUsers () {
      this.orderform.users.push({
        username: '',
        id: ''
      })
    },

    // 移除乘机人
    handleDeleteUser (index) {
      this.orderform.users.splice(index, 1)
    },

    // 发送手机验证码
    handleSendCaptcha () {
      this.$axios({
        url: '/captchas',
        method: 'POST',
        data: {
          tel: this.orderform.contactPhone
        }
      }).then((res) => {
        this.$alert(`您的验证码是${res.data.code}`, '提示', {
          type: 'warning'
        })
      }).catch((err) => {
        console.log(err)
      })
    },

    // 提交订单
    handleSubmit () {
      // const bl = this.orderform.users.every((v) => {
      //   return !v.username || !v.id
      // })
      // console.log(bl)
      let bl = true
      this.orderform.users.forEach((item) => {
        if (!item.username || !item.id) {
          bl = false
        }
      })
      if (!bl) {
        this.$message({
          type: 'error',
          message: '乘机人信息不能为空'
        })
        return false
      }
      if (!this.orderform.contactName) {
        this.$message({
          type: 'error',
          message: '联系人姓名不能为空'
        })
        return false
      }
      if (!this.orderform.contactPhone) {
        this.$message({
          type: 'error',
          message: '联系人手机号不能为空'
        })
        return false
      }
      if (!this.orderform.captcha) {
        this.$message({
          type: 'error',
          message: '验证码不能为空'
        })
        return false
      }
      this.$axios({
        url: '/airorders',
        method: 'POST',
        data: this.orderform,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userinfo.token} `
        }
      }).then((res) => {
        this.$router.push({
          path: '/air/pay',
          query: {
            id: res.data.data.id
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    // 选择保险
    changeCheck (id) {
      const index = this.orderform.insurances.indexOf(id)
      index > -1 ? this.orderform.insurances.splice(index, 1) : this.orderform.insurances.push(id)
    }
  }
}
</script>

<style scoped lang="stylus">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
