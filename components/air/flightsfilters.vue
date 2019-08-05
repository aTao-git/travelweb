<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select v-model="airport" size="mini" placeholder="起飞机场" @change="handleAirport">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="flightTimes" size="mini" placeholder="起飞时间" @change="handleFlightTimes">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="company" size="mini" placeholder="航空公司" @change="handleCompany">
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select v-model="airSize" size="mini" placeholder="机型" @change="handleAirSize">
          <el-option
            v-for="(item,index) in airSizeList"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          info: {},
          options: {}
        }
      }
    }
  },
  data () {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小
      airSizeList: [
        { label: '大', value: 'L' },
        { label: '中', value: 'M' },
        { label: '小', value: 'S' }
      ]
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport (value) {
      if (value) {
        const arr = this.data.flights.filter((item) => {
          return item.org_airport_name === value
        })
        this.$emit('returnflights', arr)
      }
    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {
      if (value) {
        const [from, to] = value.split(',')
        const arr = this.data.flights.filter((item) => {
          const start = item.dep_time.split(':')[0]
          return start >= from && start < to
        })
        this.$emit('returnflights', arr)
      }
    },

    // 选择航空公司时候触发
    handleCompany (value) {
      if (value) {
        const arr = this.data.flights.filter((item) => {
          return item.airline_name === value
        })
        this.$emit('returnflights', arr)
      }
    },

    // 选择机型时候触发
    handleAirSize (value) {
      if (value) {
        const arr = this.data.flights.filter((item) => {
          return item.plane_size === value
        })
        this.$emit('returnflights', arr)
      }
    },

    // 撤销条件时候触发
    handleFiltersCancel () {
      this.airport = '' // 机场
      this.flightTimes = '' // 出发时间
      this.company = '' // 航空公司
      this.airSize = '' // 机型大小
      this.$emit('returnflights', this.data.flights)
    }
  }
}
</script>

<style scoped lang="stylus">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>
