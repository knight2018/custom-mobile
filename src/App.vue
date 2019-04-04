<template>
  <div id="app">
     <keep-alive  v-if="$route.meta.keepAlive">
       <navTab></navTab>
     </keep-alive>
    <router-view/>
  </div>
</template>

<script>
import navTab from './components/fixation/navTab';
export default {
  components: { navTab }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  width 100vw
  height 100vh
*
  margin 0
  padding 0
</style>

<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
