<template>
  <router-view />
</template>

<style lang="less">
@import "./components/public/less/index.less";
@import "./assets/iconfont/iconfont.css";
// @import "http://localhost/source/public/vue/css/member-new.css";
// @import "http://localhost/admincms/public/css/login.css";
// @import "http://localhost/source/plugin/feedback/css/member_feedback.css";
// @import "http://localhost/source/public/css/member_play.css";

// @import "http://localhost/source/public/vue/css/admincms.css";
@import "http://dongblog.com/style/vue/css/member-new.css";
@import "http://dongblog.com/style/css/login.css";
@import "http://dongblog.com/style/css/member_feedback.css";
@import "http://dongblog.com/style/css/member_play.css";


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
