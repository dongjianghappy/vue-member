<template>
<div class="relative shortcut flex">
  <i class="iconfont icon-shortcut font20"></i>
  <div class="shortcut-wrap absolute cl-999 ">
    <div class="flex">
      <div class="pt15" style="width: 45px">
        <i class="iconfont icon-folder-open font24" />
      </div>
      <div style="flex: 1">
        <div class="mb10 font14">添加网页收藏夹</div>
        <div class="font12">「Ctrl+D」添加博客至收藏夹</div>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="less">
.shortcut {
  display: block;
  padding-top: 50%;
  height: 100%;

  .shortcut-wrap {
    display: none;
    top: 60px;
    right: 0;
    z-index: 100;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
    padding: 15px;
    width: 250px;
    height: auto;
    line-height: normal;

    .music-header {
      border-bottom: 1px solid var(--default-border);
      height: 40px;
      line-height: normal;
    }
  }

  &:hover {
    .shortcut-wrap {
      background: var(--module-background);
      display: block;
    }

  }
}
</style>
