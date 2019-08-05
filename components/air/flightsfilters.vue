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
      ],
      filters: {
        company: { value: '', key: 'airline_name' },
        airport: { value: '', key: 'org_airport_name' },
        airsize: { value: '', key: 'plane_size' },
        time: { value: '', key: 'dep_time' }
      }
    }
  },
  methods: {
    handleChange () {
      const arr = this.data.flights.filter((item) => {
        let pass = true
        Object.keys(this.filters).forEach((item2) => {
          if (!this.filters[item2].value) {
            return
          }
          if (Array.isArray(this.filters[item2].value)) {
            const [from, to] = this.filters[item2].value
            const start = item[this.filters[item2].key].split(':')[0]
            if (+start < +from || +start >= +to) {
              pass = false
            }
          } else if (item[this.filters[item2].key] !== this.filters[item2].value) {
            pass = false
          }
        })
        return pass
      })
      return arr
    },
    // 选择机场时候触发
    handleAirport (value) {
      this.filters.airport.value = value
      const arr = this.handleChange()
      this.$emit('returnflights', arr)
      // if (value) {
      //   const arr = this.data.flights.filter((item) => {
      //     return item.org_airport_name === value
      //   })
      //   this.$emit('returnflights', arr)
      // }
    },

    // 选择出发时间时候触发
    handleFlightTimes (value) {
      this.filters.time.value = value.split(',')
      const arr = this.handleChange()
      this.$emit('returnflights', arr)
      // if (value) {
      //   const [from, to] = value.split(',')
      //   console.log(typeof from)
      //   const arr = this.data.flights.filter((item) => {
      //     const start = item.dep_time.split(':')[0]
      //     console.log(to)
      //     return +start >= +from && +start < +to
      //   })
      //   this.$emit('returnflights', arr)
      // }
    },

    // 选择航空公司时候触发
    handleCompany (value) {
      this.filters.company.value = value
      const arr = this.handleChange()
      this.$emit('returnflights', arr)
      // if (value) {
      //   const arr = this.data.flights.filter((item) => {
      //     return item.airline_name === value
      //   })
      //   this.$emit('returnflights', arr)
      // }
    },

    // 选择机型时候触发
    handleAirSize (value) {
      this.filters.airsize.value = value
      const arr = this.handleChange()
      this.$emit('returnflights', arr)
      // if (value) {
      //   const arr = this.data.flights.filter((item) => {
      //     return item.plane_size === value
      //   })
      //   this.$emit('returnflights', arr)
      // }
    },

    // 撤销条件时候触发
    handleFiltersCancel () {
      this.airport = '' // 机场
      this.flightTimes = '' // 出发时间
      this.company = '' // 航空公司
      this.airSize = '' // 机型大小
      this.filters = {
        company: { value: '', key: 'airline_name' },
        airport: { value: '', key: 'org_airport_name' },
        airsize: { value: '', key: 'plane_size' },
        time: { value: '', key: 'dep_time' }
      }
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
