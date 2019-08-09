<template>
  <div class="hotel">
    <!-- 面包屑部分 -->
    <el-breadcrumb style="margin: 20px 0" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/hotel' }">
        酒店
      </el-breadcrumb-item>
      <el-breadcrumb-item>{{ hotelssearch.string }}酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框部分 -->
    <el-row>
      <!-- 目的地搜索框 -->
      <el-col :span="5">
        <el-autocomplete
          v-model="destination"
          :fetch-suggestions="querySearchDest"
          placeholder="目的地"
          @select="handleSelect"
        />
      </el-col>
      <el-col :span="9">
        <!-- 日期选择框 -->
        <el-date-picker
          v-model="chosedata"
          type="daterange"
          range-separator="-"
          start-placeholder="入住日期"
          end-placeholder="离店日期"
        />
      </el-col>
      <el-col :span="4">
        <!-- 人数选择框 -->
        <div class="peoplenum" style="line-height: 40px">
          <el-input-number v-model="peoplenum" :min="1" size="mini" style="width: 110px" />
          <span>&nbsp;成人</span>
        </div>
      </el-col>
      <el-col :span="4">
        <!-- 人数选择框 -->
        <div class="peoplenum" style="line-height: 40px">
          <el-input-number v-model="childnum" :min="0" size="mini" style="width: 110px" />
          <span>&nbsp;儿童</span>
        </div>
      </el-col>
      <el-col :span="2">
        <!-- 查看价格 -->
        <el-button type="primary" @click="searchhotel">
          查看价格
        </el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;margin-bottom: 30px">
      <!-- 地图左边介绍部分 -->
      <el-col :span="14">
        <div class="cityinfo">
          <div class="infotitle">
            <p>区域:</p>
          </div>
          <div class="infomain">
            <span class="check" @click="cheackallhotel">全部</span>
            <span v-for="(item,index) in hotelssearch.hotelarea" v-show="index<showarealist" :key="index" class="check" @click="checkareaid(item.id)">{{ item.name }}</span>
            <p class="check" @click="showallarea">
              <i style="color: #ff9900" :class="{'el-icon-arrow-down': !showallareaclass,'el-icon-arrow-up':showallareaclass}" />等{{ hotelssearch.hotelarea.length }}个区域
            </p>
          </div>
        </div>
        <div class="cityinfo">
          <div class="infotitle">
            <p>攻略:</p>
          </div>
          <div class="infomain">
            <span>
              北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
            </span>
          </div>
        </div>
        <div class="cityinfo">
          <div class="infotitle">
            <p>
              均价:
              <el-tooltip class="item" effect="dark" content="等级均价由平日价格计算得出，节假日价格会有上浮。" placement="top-start">
                <i style="color: #cccccc" class="el-icon-question" />
              </el-tooltip>
            </p>
          </div>
          <div class="infomain">
            <el-tooltip class="item" effect="dark" content="等级评定是针对房价，设施和服务等各方面水平的综合评估。" placement="bottom-end">
              <span>
                <el-rate
                  v-model="cityrate"
                  style="display: inline-block"
                  :icon-classes="iconClasses"
                  void-icon-class="icon-vimeo"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
                <h4 style="display: inline-block">&yen;521</h4>
                <el-rate
                  v-model="cityrate2"
                  style="display: inline-block"
                  :icon-classes="iconClasses"
                  void-icon-class="icon-vimeo"
                  :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                />
                <h4 style="display: inline-block">&yen;668</h4>
              </span>
            </el-tooltip>
          </div>
        </div>
      </el-col>
      <!-- 地图组件部分 -->
      <el-col :span="10">
        <HotelMap v-loading="loadingmap" :data="hotellocation" />
      </el-col>
    </el-row>
    <!-- 搜索酒店表格部分 -->
    <div class="searchhotel">
      <el-row>
        <el-col :span="7">
          <div class="slider">
            <div style="display: flex;justify-content:space-between">
              <p>价格</p>
              <p>0-{{ changeprice * 40 }}</p>
            </div>
            <el-slider v-model="changeprice" :format-tooltip="formatTooltip" @change="changeslider" />
          </div>
        </el-col>
        <el-col :span="4" :offset="1">
          <div class="slider" style="margin-left: 30px">
            <p style="margin-left: 6px;margin-top: -20px">
              住宿等级
            </p>
            <el-cascader
              style="margin-top: 15px"
              :options="stayoptions"
              :props="{ checkStrictly: true }"
              clearable
              @change="changelevel"
            />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="slider" style="margin-left: 30px">
            <p style="margin-left: 6px;margin-top: -20px">
              住宿类型
            </p>
            <el-cascader
              style="margin-top: 15px"
              :options="hoteltype"
              :props="{ checkStrictly: true }"
              clearable
              @change="changehoteltype"
            />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="slider" style="margin-left: 30px">
            <p style="margin-left: 6px;margin-top: -20px">
              酒店设施
            </p>
            <el-cascader
              style="margin-top: 15px"
              :options="hotelasset"
              :props="{ checkStrictly: true }"
              clearable
              @change="changehotelasset"
            />
          </div>
        </el-col>
        <el-col :span="4">
          <div class="slider" style="margin-left: 30px">
            <p style="margin-left: 6px;margin-top: -20px">
              酒店品牌
            </p>
            <el-cascader
              style="margin-top: 15px"
              :options="hotelbrands"
              :props="{ checkStrictly: true }"
              clearable
              @change="changehotelbrands"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-if="hotellist.length > 0">
      <HotelList v-for="(item,index) in hotellist" :key="index" :hotel="item" />
      <!-- 分页功能 -->
      <el-pagination
        style="margin-left: 600px"
        :current-page.sync="pagenum"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
    <div v-else>
      <h2 class="nohotel">
        暂无符合条件的酒店
      </h2>
    </div>
  </div>
</template>

<script>
import HotelMap from '@/components/hotel/hotelmap'
import HotelList from '@/components/hotel/hotellist'
export default {
  components: {
    HotelMap,
    HotelList
  },
  data () {
    return {
      loadingmap: true,
      destination: '',
      chosedata: '',
      changeprice: 100,
      currentValue: 1,
      showallareaclass: false,
      showarealist: 11,
      hotellocation: [],
      peoplenum: 1,
      childnum: 0,
      pagenum: 1,
      total: 0,
      stayoptions: [{
        value: 1,
        label: '1星'
      },
      {
        value: 2,
        label: '2星'
      },
      {
        value: 3,
        label: '3星'
      },
      {
        value: 4,
        label: '4星'
      }, {
        value: 5,
        label: '5星'
      }],
      hoteltype: [
        {
          value: 1,
          label: '经济型'
        }, {
          value: 2,
          label: '舒适型'
        }, {
          value: 3,
          label: '高档型'
        }, {
          value: 4,
          label: '豪华型'
        }, {
          value: 5,
          label: '度假村'
        }, {
          value: 6,
          label: '公寓式酒店'
        }
      ],
      hotelasset: [
        {
          value: 1,
          label: 'wifi'
        }, {
          value: 2,
          label: '热水壶'
        }, {
          value: 3,
          label: '吹风机'
        }, {
          value: 4,
          label: '外币兑换服务'
        }, {
          value: 5,
          label: '洗衣服务'
        }, {
          value: 6,
          label: '电梯'
        }
      ],
      hotelbrands: [],
      cityrate: 4,
      cityrate2: 5,
      iconClasses: ['icon-vimeo', 'icon-vimeo', 'icon-vimeo'],
      hotelssearch: {
        string: '',
        cityid: 74,
        hotelarea: []
      },
      hotellist: []
    }
  },
  watch: {
    // 监听路由变化改变发送请求修改数据
    $route () {
      document.documentElement.scrollTop = 0
      const { page, hotellevel, hoteltype, hotelasset, hotelbrand, ...query } = this.$route.query
      if (page) {
        query._start = (page - 1) * 10
      }
      if (hotellevel) {
        query.hotellevel_in = hotellevel
      }
      if (hoteltype) {
        query.hoteltype_in = hoteltype
      }
      if (hotelasset) {
        query.hotelasset_in = hotelasset
      }
      if (hotelbrand) {
        query.hotelbrand_in = hotelbrand
      }
      this.$axios({
        url: 'http://157.122.54.189:9095/hotels',
        params: {
          ...query
        }
      }).then((res) => {
        const locationarr = []
        res.data.data.forEach((item) => {
          locationarr.push({ ...item.location, name: item.name })
        })
        this.hotellist = res.data.data
        this.hotellocation = locationarr
        this.loadingmap = false
        this.total = res.data.total
        if (!res.data.data.length) {
          this.hotelssearch.hotelarea = []
          this.hotelssearch.string = ''
          this.destination = ''
        } else {
          this.hotelssearch.hotelarea = res.data.data[0].scenic
          this.hotelssearch.string = res.data.data[0].city.name
          this.destination = res.data.data[0].city.name
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    document.documentElement.scrollTop = 0
    if (!this.$route.query.city) {
      this.$router.push({
        path: '/hotel',
        query: {
          city: 74
        }
      })
    }
    const { page, hotellevel, hoteltype, hotelasset, hotelbrand, ...query } = this.$route.query
    if (page) {
      query._start = (page - 1) * 10
    }
    if (hotellevel) {
      query.hotellevel_in = hotellevel
    }
    if (hoteltype) {
      query.hoteltype_in = hoteltype
    }
    if (hotelasset) {
      query.hotelasset_in = hotelasset
    }
    if (hotelbrand) {
      query.hotelbrand_in = hotelbrand
    }
    this.$axios({
      url: 'http://157.122.54.189:9095/hotels',
      params: {
        ...query
      }
    }).then((res) => {
      const locationarr = []
      res.data.data.forEach((item) => {
        locationarr.push({ ...item.location, name: item.name })
      })
      this.hotellist = res.data.data
      this.hotellocation = locationarr
      this.loadingmap = false
      this.total = res.data.total
      this.hotelssearch.hotelarea = res.data.data[0].scenic
      this.hotelssearch.string = res.data.data[0].city.name
    }).catch((err) => {
      console.log(err)
    })
    this.$axios({
      url: '/hotels/options'
    }).then((res) => {
      const hotelbrandsarr = []
      res.data.data.brands.forEach((item) => {
        hotelbrandsarr.push({ value: item.id, label: item.name })
      })
      this.hotelbrands = hotelbrandsarr
    }).catch((err) => {
      console.log(err)
    })
  },
  methods: {
    showallarea () {
      if (!this.showallareaclass) {
        this.showarealist = this.hotelssearch.hotelarea.length
        this.showallareaclass = true
      } else {
        this.showarealist = 11
        this.showallareaclass = false
      }
    },
    formatTooltip (val) {
      return val * 40
    },
    changeslider (value) {
      const { query } = this.$route
      this.$router.push({
        path: '/hotel',
        query: {
          ...query,
          price_lt: value * 40
        }
      })
    },
    querySearchDest (string, cb) {
      let newData = []
      if (!string) {
        return cb(newData)
      }
      this.$axios({
        url: '/airs/city',
        params: {
          name: string
        }
      }).then((res) => {
        console.log(res.data)
        const { data } = res.data
        newData = data.map((item) => {
          item.value = item.name.replace('市', '')
          return item
        })
        cb(newData)
      }
      ).catch((err) => {
        console.log(err)
      })
    },
    handleSelect (value) {
      this.hotelssearch.cityid = value.id
      this.$router.push({
        path: '/hotel',
        query: {
          city: this.hotelssearch.cityid
        }
      })
    },
    handleChange (value) {
      console.log(value)
    },
    searchhotel () {
      this.$router.push({
        path: '/hotel',
        query: {
          city: this.hotelssearch.cityid
        }
      })
    },
    cheackallhotel () {
      this.$router.push({
        path: '/hotel',
        query: {
          city: this.hotelssearch.cityid
        }
      })
    },
    // 根据地区id查询酒店
    checkareaid (scenic) {
      this.$router.push({
        path: '/hotel',
        query: {
          city: this.$route.query.city,
          scenic
        }
      })
    },
    handleCurrentChange (val) {
      this.$router.push({
        path: '/hotel',
        query: {
          ...this.$route.query,
          page: val
        }
      })
    },
    // 筛选部分函数
    changelevel (level) {
      console.log(level[0])
      this.$router.push({
        path: '/hotel',
        query: {
          ...this.$route.query,
          hotellevel: level[0]
        }
      })
    },
    changehoteltype (type) {
      this.$router.push({
        path: '/hotel',
        query: {
          ...this.$route.query,
          hoteltype: type[0]
        }
      })
    },
    changehotelasset (asset) {
      this.$router.push({
        path: '/hotel',
        query: {
          ...this.$route.query,
          hotelasset: asset[0]
        }
      })
    },
    changehotelbrands (brands) {
      this.$router.push({
        path: '/hotel',
        query: {
          ...this.$route.query,
          hotelbrand: brands[0]
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.hotel
  width 1000px
  margin 0 auto
  font-size 14px
.cityinfo
  display flex
  margin-bottom 15px
  .infotitle
    p
      display block
      width 60px
      margin-right 30px
  .infomain
    .check
      cursor pointer
      &:hover
        text-decoration underline
        color #66b1ff
    span
      margin 0 10px 0 0
      i
        color #ff9900
.searchhotel
  border 1px solid #ccc
  padding 30px 20px
  .slider
    flex-direction column
.nohotel
  height 60px
  line-height 60px
  font-weight normal
  text-align center
</style>
