<template>
  <div class="hotellist">
    <div class="hotelinfo">
      <el-row>
        <el-col :span="8">
          <div class="imgshow">
            <img style="cursor:pointer" :src="hotel.photos" alt="" @click="jumptodetail(hotel.id)">
          </div>
        </el-col>
        <el-col :span="10">
          <div class="hoteladress">
            <h2 style="cursor:pointer" @click="jumptodetail(hotel.id)">
              {{ hotel.name }}
            </h2>
            <span style="color: #9999b3">{{ hotel.alias }}
              <el-rate
                v-model="hotelhuangguan"
                style="display: inline-block"
                :icon-classes="iconClasses"
                void-icon-class="icon-vimeo"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              />
              {{ hotel.hoteltype.name }}
            </span>
            <span>
              <el-rate
                v-model="hotel.stars"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              />
              <span>{{ hotel.stars }}</span>分
              <span>{{ hotel.very_bad_remarks + hotel.very_good_remarks }}</span> 条评价
              <span>13</span> 篇游记
            </span>
            <p>
              <i class="el-icon-location" />{{ hotel.address }}
            </p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="table">
            <el-table
              :show-header="false"
              :data="hotel.products"
              style="width: 250px"
            >
              <el-table-column
                prop="name"
              />
              <el-table-column>
                <template slot-scope="scope">
                  <span style="margin-left: 30px;color: #f7ba2a;font-size: 16px">&yen;{{ scope.row.price }}</span>起
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotel: {
      type: Object,
      default () {
        return {
          hotellevel: {},
          hoteltype: {}
        }
      }
    }
  },
  data () {
    return {
      hotelhuangguan: 3,
      iconClasses: ['icon-vimeo', 'icon-vimeo', 'icon-vimeo']
    }
  },
  methods: {
    jumptodetail (id) {
      this.$router.push({
        path: '/hotel/detail',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.hotellist
  margin-bottom 30px
  .hotelinfo
    border-bottom 1px solid #ccc
    padding 30px 10px
    .imgshow
      img
        width 300px
        height 200px
    .hoteladress
      h2
        font-weight normal
        font-size 22px
        margin-bottom 10px
      p
        margin-bottom 10px
    .table
      margin-top 30px
</style>
