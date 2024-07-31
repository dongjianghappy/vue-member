<template>
  <div class="tips-wrap info fadeIn "
       style="z-index: 1111111111111">{{msg}}</div>
</template>


<style scoped>
  .info {
    background: #4caf50e0;
    position: fixed;
    border-radius: 4px;
    width: 200px;
    height: 40px;
    line-height: 40px;
    -webkit-background-clip: padding;
    top: 70px;
    left: 50%;
    margin-left: -100px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    z-index: 1024;
  }
</style>