<template>
  <div class="draft">
    <p class="title">
      草稿箱&nbsp;(&nbsp;1&nbsp;)
    </p>
    <span class="nickname">霍比特人</span><i class="el-icon-edit" />
    <p class="data">
      2019-08-06
    </p>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.draft
  border 1px solid #ccc
  padding 10px 13px
  margin-bottom 30px
  &:hover
    cursor pointer
    color #ffa500
    .title,.nickname
      text-decoration underline
  .title
    margin-bottom 8px
  .nickname
    font-size 14px
  .data
    margin-top 5px
    font-size 14px
    color #cccccc
</style>
