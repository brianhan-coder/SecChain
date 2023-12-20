<template>
  <div class="tool-list">
    <div
      v-for="item in list"
      :key="item.name"
      :class="[activeTool === item.type && 'active']"
      @click="useTool(item.type)"
    >
      <el-tooltip
        placement="top"
        :manual="true"
        :content="item.tips"
        v-model="item.showTip"
        popper-class="exp-tips"
      >
        <div
          class="tool-item"
          :style="{ 'z-index': item.showTip ? 2003 : 1000 }"
          :title="item.description"
        >
          <img :src="item.imgSrc" width="80" height="80" />
          {{ item.name }}
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
// import toolList from "./tools";
export default {
  data() {
    return {
      activeTool: "",
      visible: true,
      list: this.toolList,
    };
  },
  props: ["toolList"],
  watch: {
    toolList() {
      this.list = this.toolList;
    },
  },
  inject: ["eventBus"],
  mounted() {
    this.eventBus.$on("show-tip", this.showTip);
    this.eventBus.$on("hide-tip", this.hideTip);
  },
  beforeDestroy() {
    this.eventBus.$off("show-tip");
    this.eventBus.$off("hide-tip");
  },
  methods: {
    showTip(type) {
      this.list.find((item) => item.type === type).showTip = true;
      this.eventBus.$emit("show-mask", true);
    },
    hideTip(type) {
      this.toolList.find((item) => item.type === type).showTip = false;
      this.eventBus.$emit("show-mask", false);
    },
    useTool(type) {
      this.activeTool = type;
      this.$emit("useTool", type);
    },
  },
};
</script>

<style lang="scss">
.tool-list {
  position: absolute;
  bottom: 10px;
  right: 0;
  display: flex;
  justify-content: flex-end;
  .tool-item {
    width: 100px;
    height: 100px;
    align-items: center;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    color: #dcdcdc;
    cursor: pointer;
    position: relative;
    margin-right: 13px;
    &.active,
    &:hover {
      background: rgba(207, 247, 124, 0.2);
    }
  }
}
</style>
