<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div />

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
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsLisrHead from '@/components/air/flightsLisrHead'
import FlightsItem from '@/components/air/flightsItem.vue'
export default {
  components: {
    FlightsLisrHead,
    FlightsItem
  },
  data () {
    return {
      flightslist: [],
      pagenum: 1,
      pagesize: 5,
      total: 0
    }
  },
  mounted () {
    this.$axios({
      url: '/airs',
      params: this.$route.query
    }).then((res) => {
      this.flightslist = res.data.flights
      this.total = this.flightslist.length
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    handleSizeChange (value) {
      this.pagesize = value
    },
    handleCurrentChange (value) {
      this.pagenum = value
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
