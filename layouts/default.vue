<template>
  <div>
    <Header />
    <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
      <Login v-if="$store.state.user.states" />
    </transition>
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/header'
import Footer from '@/components/footer'
import Login from '@/components/user/login'
export default {
  components: {
    Header,
    Footer,
    Login
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,body {
  height: 100%;
}
ul,ol,li {
  list-style: none;
}
a {
  color: inherit;
  text-decoration: none
}
</style>
