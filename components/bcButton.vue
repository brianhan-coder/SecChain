<template>
  <div class="blockchian-botton">
    <div class="blockchian-botton-top-left"></div>
    <div class="blockchian-botton-top-right"></div>
    <div class="blockchian-botton-bottom-left"></div>
    <div class="blockchian-botton-bottom-right"></div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
$color: white;
$length: 10px;
.blockchian-botton {
  user-select: none;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: $color;
  background: red;
  padding: 10px 20px;
  transition: 0.6s;
  &-top-left {
    position: absolute;
    border-top: 1px solid $color;
    border-left: 1px solid $color;
    position: absolute;
    top: 0;
    left: 0;
    width: $length;
    height: $length;
  }
  &-top-right {
    position: absolute;
    border-top: 1px solid $color;
    border-right: 1px solid $color;
    width: $length;
    height: $length;
    top: 0;
    right: 0;
  }
  &-bottom-left {
    position: absolute;
    border-bottom: 1px solid $color;
    border-left: 1px solid $color;
    width: $length;
    height: $length;
    bottom: 0;
    left: 0;
  }
  &-bottom-right {
    position: absolute;
    border-bottom: 1px solid $color;
    border-right: 1px solid $color;
    width: $length;
    height: $length;
    bottom: 0;
    right: 0;
  }
  // &:hover{
  //   zoom: 0.8;
  // }
}
</style>
