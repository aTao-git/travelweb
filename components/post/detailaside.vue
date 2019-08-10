<template>
  <div class="detailaside">
    <div class="title">
      <h3>相关攻略</h3>
    </div>
    <div v-for="(item,index) in asideshow" :key="index" class="article">
      <img :src="item.images[0]" alt="">
      <div class="info">
        <h4>{{ item.title }}</h4>
        <p>{{ item.updated_at }} 阅读 {{ item.watch }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    asideshow: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.detailaside
  margin-top 25px
  .title
    padding-bottom 20px
    border-bottom 1px solid #dcdfe6
    h3
      font-weight normal
  .article
    display flex
    border-bottom 1px solid #dcdfe6
    padding 24px 0
    img
      width 100px
      height 80px
      margin-right 10px
    h4
      font-weight normal
    p
      margin-top 42px
      font-size 12px
      color #cccccc
</style>
