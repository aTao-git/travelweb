<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFileters :data="flightsdata" @returnflights="returnflights" />

        <!-- 航班头部布局 -->
        <FlightsLisrHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in flightslist" v-show="(pagenum - 1) * pagesize <= index && pagenum * pagesize > index" :key="index" :data="item" />
        <el-pagination
          :current-page="pagenum"
          :page-sizes="[5, 8, 10, 13]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsLisrHead from '@/components/air/flightsLisrHead'
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsFileters from '@/components/air/flightsfilters'
import FlightsAside from '@/components/air/flightsaside'
export default {
  components: {
    FlightsLisrHead,
    FlightsItem,
    FlightsFileters,
    FlightsAside
  },
  data () {
    return {
      flightsdata: {
        info: {},
        options: {}
      },
      flightslist: [],
      pagenum: 1,
      pagesize: 5,
      total: 0
    }
  },
  watch: {
    $route () {
      this.getData()
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios({
        url: '/airs',
        params: this.$route.query
      }).then((res) => {
        this.flightslist = res.data.flights
        this.flightsdata = { ...res.data }
        this.total = this.flightslist.length
        if (!this.total) {
          this.$message({
            type: 'warning',
            message: '没有查找到数据!'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleSizeChange (value) {
      this.pagesize = value
    },
    handleCurrentChange (value) {
      this.pagenum = value
    },
    returnflights (arr) {
      this.flightslist = arr
      this.total = arr.length
      if (!this.total) {
        this.$message({
          type: 'warning',
          message: '没有查找到数据!'
        })
      }
    }
  }
}
</script>

<style scoped lang="stylus">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    }
</style>
