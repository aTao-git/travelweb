<template>
  <transition leave-active-class="animated zoomOut">
    <div class="draft" @click="showdraftdata(draftdata.id)">
      <p class="title">
        草稿箱
      </p>
      <i class="el-icon-circle-close" @click="removedraft(draftdata.id)" />
      <span class="nickname">{{ draftdata.title }}</span><i class="el-icon-edit" />
      <p class="data">
        2019-08-06
      </p>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    draftdata: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    removedraft (id) {
      this.$store.commit('post/removeDraft', id)
    },
    showdraftdata (id) {
      this.$store.commit('post/sendDraft', id)
      this.$emit('showDraftData', this.$store.state.post.showdraft)
    }
  }
}
</script>

<style lang="stylus" scoped>
.draft
  border 1px solid #ccc
  padding 10px 13px
  margin-bottom 30px
  position relative
  &:hover
    cursor pointer
    color #ffa500
    .title,.nickname
      text-decoration underline
  .el-icon-circle-close
    position absolute
    right -30px
  .title
    margin-bottom 8px
  .nickname
    font-size 14px
  .data
    margin-top 5px
    font-size 14px
    color #cccccc
</style>
