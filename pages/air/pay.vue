<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{ price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="pay-qrcode"
        >
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage" />
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcode'
export default {
  data () {
    return {
      price: '',
      timer: null
    }
  },
  mounted () {
    setTimeout(() => {
      const { id } = this.$route.query
      const { user: { userinfo } } = this.$store.state
      this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: `Bearer ${userinfo.token}`
        }
      }).then((res) => {
        const { payInfo, price } = res.data
        this.price = price
        const state = document.querySelector('#qrcode-stage')
        QRCode.toCanvas(state, payInfo.code_url, {
          width: 200
        })
        this.timer = setInterval(async () => {
          const pay = await this.isPay(payInfo, id)
          if (pay) {
            this.$message.success(' 订单支付成功')
            clearInterval(this.timer)
          }
        }, 3000)
      }).catch((err) => {
        console.log(err)
      })
    }, 200)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    isPay (data, id) {
      const { user: { userinfo } } = this.$store.state
      return this.$axios({
        url: '/airorders/checkpay',
        method: 'POST',
        data: {
          id,
          nonce_str: data.nonce_str,
          out_trade_no: data.order_no
        },
        headers: {
          Authorization: `Bearer ${userinfo.token}`
        }
      }).then((res) => {
        const { statusTxt } = res.data

        if (statusTxt === '支付完成') {
          return true
        } else {
          return false
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>
