<template>
  <div class="container">
    <!-- 幻灯片 -->
    <!-- interval: 间隔时间
        arrow：出现箭头 -->
    <el-carousel
      :interval="5000"
      arrow="always"
    >
      <el-carousel-item
        v-for="(item, index) in banners"
        :key="index"
      >
        <div
          class="banner-image"
          :style="`
                background:url(${ $axios.defaults.baseURL + item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        />
      </el-carousel-item>
    </el-carousel>

    <!-- 搜索框，真好看 -->
    <div class="banner-content">
      <Search />
    </div>
  </div>
</template>

<script>

// nuxt默认把 axios 添加到原型
// import axios from "axios";
// Vue.prototype.$axios = axios;
import Search from '@/components/user/searchbar'
export default {
  components: {
    Search
  },
  data () {
    return {
      banners: []
    }
  },
  // 生命周期 hook 函数
  mounted () {
    // $开头的属性是vue实例对象的约定用法
    this.$axios({
      url: '/scenics/banners'
    }).then((res) => {
      // data是一个数组
      const { data } = res.data
      this.banners = data
    })
  }
}
</script>

<style scoped lang="stylus">
.container{
    min-width:1000px;
    margin:0 auto;
    position:relative;

    /deep/ .el-carousel__container{
        height:700px;
    }

    .banner-image{
        width:100%;
        height:100%;
    }

    .banner-content{
        z-index:9;
        width:1000px;
        position:absolute;
        left:50%;
        top:45%;
        margin-left: -500px;
        border-top:1px transparent solid;
    }
}
</style>
