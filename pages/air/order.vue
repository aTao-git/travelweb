<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <div class="main">
        <OrderForm @sendAirData="sendAirData" @sendPrice="sendPrice" />
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <OrderAside :data="airdata" :pricelist="pricelist" />
      </div>
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderform'
import OrderAside from '@/components/air/orderaside'
export default {
  components: {
    OrderForm,
    OrderAside
  },
  data () {
    return {
      airdata: {
        seat_infos: {}
      },
      pricelist: {
        allPrice: 0,
        amount: 0
      }
    }
  },
  methods: {
    sendAirData (data) {
      this.airdata = data
    },
    sendPrice (data) {
      this.pricelist = data
    }
  }
}
</script>

<style lang="stylus" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }

    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>
