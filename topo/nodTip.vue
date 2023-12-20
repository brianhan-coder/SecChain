<template>
  <div
    v-show="show"
    class="nod-tip"
    :style="{ left: xPosition + 'px', top: yPosition + 'px' }"
  >
    <div class="tip-header">
      <div>节点{{ node.deviceInfo.id }}</div>
    </div>
    <div class="tip-content">
      <div class="header-item" v-show="$root.activeExp.num === 2">
        <span class="header-item-title">IP :</span>
        <el-input v-model="ip"></el-input>
      </div>
      <div class="header-item" v-show="$root.activeExp.num === 3 && !isCrucial">
        <span class="header-item-title">子网 :</span>
        <el-select v-model="net" placeholder="请选择">
          <el-option
            v-for="item in $root.childNets"
            :key="item.id"
            :label="item.subnet_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <el-checkbox v-model="isCrucial" v-show="$root.activeExp.num === 3"
        >标记为关键节点</el-checkbox
      >
    </div>
    <div class="tip-footer">
      <el-button @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      x: 0,
      y: 0,
      node: {
        deviceInfo: {
          childNet: "",
          ip: "",
          id: null,
          isCrucial: false,
          progress: 0,
        },
      },
      ip: "",
      net: "",
      isCrucial: "",
    };
  },
  mounted() {},
  computed: {
    xPosition() {
      let winWidth = window.innerWidth;
      if (this.x > winWidth / 2) {
        return this.x - 290;
      } else {
        return this.x;
      }
    },
    yPosition() {
      let winHeight = window.innerHeight;
      if (this.y > winHeight / 2) {
        return this.y - 230;
      } else {
        return this.y;
      }
    },
  },
  methods: {
    showTip() {
      this.ip = this.node.deviceInfo.ip;
      this.net = this.node.deviceInfo.childNet;
      this.isCrucial = this.node.deviceInfo.isCrucial ? true : false;
      this.show = true;
    },
    submit() {
      if (this.$root.activeExp.num === 2) {
        if (
          !/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(
            this.ip
          )
        ) {
          this.$message.error("请输入正确的ip地址");
          return;
        }
      }
      this.node.deviceInfo.ip = this.ip;
      this.node.deviceInfo.childNet = this.net;
      this.node.deviceInfo.isCrucial = this.isCrucial;
      this.node.resetImage();
      // this.node.paintProgress(this.node.deviceInfo.progress);
      this.node.setText(this.node.deviceInfo.ip);
      this.show = false;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.nod-tip {
  width: 290px;
  position: absolute;
  z-index: 10;
  background: #737373;
  border-radius: 10px;
  color: #ffffff;
  font-size: 12px;
  .tip-header {
    height: 45px;
    line-height: 45px;
    padding: 0 20px;
    border-bottom: 1px solid #4f4f4f;
  }
  .tip-content {
    display: flex;
    flex-direction: column;
    padding: 13px 20px 0px;
    line-height: 24px;
    .header-item {
      display: flex;
      align-items: center;
      white-space: nowrap;
      &-title {
        width: 45px;
      }
      &:last-of-type {
        margin: 10px 0;
      }
    }
  }
  .tip-footer {
    padding: 10px 20px;
    text-align: right;
  }
}
</style>
<style lang="scss">
.nod-tip {
  .el-input__inner {
    background: transparent;
    border: 1px solid #4d4d4d;
    height: 32px;
    margin-left: 10px;
    color: #ffffff !important;
  }
  .el-checkbox__label {
    color: #ffffff;
  }
  .el-input {
    width: 200px;
  }
  .el-button {
    padding: 12px 35px;
    color: white;
    border: none;
    background-color: #2290bf;
    background-image: url("/static/images/pic_btn_texture.png");
    background-size: cover;
  }
}
</style>
