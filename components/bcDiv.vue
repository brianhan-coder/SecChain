<template>
  <div class="blockchian-box">
    <div class="blockchian-box-top-left"></div>
    <div class="blockchian-box-top-right"></div>
    <div class="blockchian-box-bottom-left"></div>
    <div class="blockchian-box-bottom-right"></div>
    <div v-if="title" class="blockchian-box-title">
      {{ title }}
    </div>
    <div class="blockchian-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style lang="scss" scoped>
$color: #199efc;
$length: 10px;
.blockchian-box {
  position: relative;
  background: rgba(1, 67, 149, 0.6);
  display: flex;
  flex-direction: column;
  &-title {
    color: $color;
    text-align: center;
    height: 20px;
    line-height: 20px;
    border-bottom: 1px solid #199efc;
    padding: 5px 0;
  }
  &-content {
    flex: 1;
    padding: 10px;
    overflow: auto;
  }
  &-top-left {
    border-top: 1px solid $color;
    border-left: 1px solid $color;
    position: absolute;
    top: 0;
    left: 0;
    width: $length;
    height: $length;
  }
  &-top-right {
    border-top: 1px solid $color;
    border-right: 1px solid $color;
    width: $length;
    height: $length;
    position: absolute;
    top: 0;
    right: 0;
  }
  &-bottom-left {
    border-bottom: 1px solid $color;
    border-left: 1px solid $color;
    position: absolute;
    width: $length;
    height: $length;
    bottom: 0;
    left: 0;
  }
  &-bottom-right {
    border-bottom: 1px solid $color;
    border-right: 1px solid $color;
    position: absolute;
    width: $length;
    height: $length;
    bottom: 0;
    right: 0;
  }
}
</style>
