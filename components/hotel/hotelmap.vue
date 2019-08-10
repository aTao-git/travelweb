<template>
  <div class="map">
    <div id="container" />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    data () {
      this.map()
    }
  },
  mounted () {
    this.map()
  },
  methods: {
    map () {
      let centerlatitude = 0
      let centerlongitude = 0
      let mark = []
      setTimeout(() => {
        centerlatitude = this.data[0].latitude
        centerlongitude = this.data[0].longitude
        mark = this.data
      }, 300)
      window.onLoad = function () {
        const map = new AMap.Map('container', {
          zoom: 11, // 级别
          center: [centerlongitude, centerlatitude], // 中心点坐标
          viewMode: '3D'// 使用3D视图
        })
        const markerarr = []
        mark.forEach((item, index) => {
          const marker = new AMap.Marker({
            position: new AMap.LngLat(item.longitude, item.latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: item.name
          })
          markerarr.push(marker)
        })
        map.add(markerarr)
      }
      const url = 'https://webapi.amap.com/maps?v=1.4.15&key=078e5bb6a791fbd84b633173d462ad32&callback=onLoad'
      const jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.src = url
      document.head.appendChild(jsapi)
    }
  }
}
</script>

<style lang="stylus" scoped>
#container
  width 415px
  height 300px
  .markicon
    display block
    background: url('https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png');
    width 22px
    height 200px
</style>
