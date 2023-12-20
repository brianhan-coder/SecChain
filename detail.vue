<template>
  <div class="float-detail" v-show="innerData">
    <img
      style="width: 100%"
      src="/static/images/wdBlockChain/detail-background.png"
      alt=""
    />
    <span class="el-icon-close" @click="innerData = undefined"></span>
    <div class="float-detail__content">
      <h2>
        <img src="/static/images/wdBlockChain/u340.svg" alt="" /><span
          >1-1 区块链组网</span
        >
      </h2>
      <p>
        <el-tag size="normal">区块链</el-tag>
        <el-tag size="normal">以太坊</el-tag>
        <el-tag size="normal">ICO</el-tag>
      </p>
      <p>区块链构建模块主要帮助实验者学习理解区块链的基本知识</p>
    </div>
  </div>
</template>

<script>
/**
 * 调用 setSourceData 方法来向该组件传入数据, 传入后自动显示模态框.
 * 手动传入空数据来关闭.
 */

export default {
  name: "float-detail",
  data() {
    return {
      innerData: undefined,
    };
  },
  methods: {
    setSourceData(data) {
      this.innerData = data;
    },
  },
};
</script>

<style lang="scss">
.float-detail {
  position: fixed;
  z-index: 1;

  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  transform: translateX(-50%) translateY(-50%);

  &__content {
    position: absolute;
    padding: 60rem;
    top: 0;
    z-index: 1;
    color: #fff;
    width: 100%;
    box-sizing: border-box;

    h2 {
      display: flex;
      align-items: center;
      color: #4ffffe;

      span {
        margin-left: 1em;
      }
    }

    .el-tag {
      border-color: #797979;
      border-radius: 10px;
      color: #fff;
      background: #ffffff4c;
    }

    p {
      margin: 1em 0;
    }
  }

  & > img {
    z-index: 0;
  }

  .el-icon-close {
    position: absolute;
    top: 5%;
    right: 5%;
    z-index: 2;
    color: #fff;
    padding: 1em;
    cursor: pointer;
  }
}
</style>
