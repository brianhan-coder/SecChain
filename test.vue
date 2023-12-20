<template>
  <container class="blockchain-exp-index">
    <template #sidebar>
      <sidebar></sidebar>
    </template>
    <template #main>
      <div class="blockchain-exp-index-container">
        <header class="blockchain-exp-index-top">
          <h1>
            <img src="/static/images/wdBlockChain/u595.svg" />
            {{ $root.activeExp.task_name }}
          </h1>
        </header>
        <ul class="blockchain-exp-index__list">
          <li
            class="blockchain-exp-index__item--active"
            @click="handleFoldClick"
          >
            <span
              :class="[
                layoutMode === 'expand' ? 'el-icon-s-fold' : 'el-icon-s-unfold',
              ]"
            ></span>
          </li>
          <li
            :class="[
              activeItem === 'expContent'
                ? 'blockchain-exp-index__item--active'
                : 'blockchain-exp-index__item',
            ]"
            @click="handleContentClick"
          >
            实验内容
          </li>
          <li
            :class="[
              activeItem === 'operation'
                ? 'blockchain-exp-index__item--active'
                : 'blockchain-exp-index__item',
            ]"
            @click="handleOperationClick"
          >
            实验操作
          </li>
          <li
            :class="[
              activeItem === 'report'
                ? 'blockchain-exp-index__item--active'
                : 'blockchain-exp-index__item',
            ]"
            @click="handleReportClick"
          >
            实验报告
          </li>
        </ul>
        <div class="blockchain-exp-index-content exp-content">
          <keep-alive>
            <component :is="activeItem"></component>
          </keep-alive>
        </div>
      </div>
    </template>
  </container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Container from "./container";
import Sidebar from "./sidebar";
import Report from "@/views/blockchain/views/expReport";
import Operation from "@/views/blockchain/views/expOperation";
import ExpContent from "@/views/blockchain/views/expContent";
// import Content from "@/views/blockchain/views/expContent";
export default {
  components: {
    Container,
    Sidebar,
    Report,
    Operation,
    ExpContent,
  },
  data() {
    return {
      // expContent(实验内容) operation(实验操作) report(实验报告)
      activeItem: "expContent",
    };
  },
  mounted() {
    this.$root.$on("change-tab", (data) => {
      this.activeItem = data;
    });
  },
  computed: {
    ...mapState(["layoutMode"]),
  },
  methods: {
    ...mapMutations(["expandSidebar", "collapseSidebar"]),
    handleFoldClick() {
      switch (this.layoutMode) {
        case "expand":
          this.collapseSidebar();
          break;
        case "collapse":
          this.expandSidebar();
          break;
      }
    },
    handleContentClick() {
      this.activeItem = "expContent";
      // TODO: 响应事件进行切换
    },
    handleOperationClick() {
      this.activeItem = "operation";
      // TODO: 响应事件进行切换
    },
    handleReportClick() {
      this.activeItem = "report";
      // TODO: 响应事件进行切换
    },
  },
};
</script>
<style lang="scss">
.blockchain-exp-index {
  position: relative;
  .el-button {
    color: #0ff;
    background-color: #014395;
    border: 1px solid #0ff;
  }
  .el-dialog__wrapper {
    position: static;
  }
  .el-dialog {
    background: rgba(1, 67, 149, 0.9);
    border: 1px soild #199efc !important;

    .el-dialog__title {
      color: white;
    }
    .el-dialog__body {
      color: white;
    }
    .tip-dialog__highlight {
      color: #199efc;
    }
  }
}
</style>
<style lang="scss" scoped>
.blockchain-exp-index {
  &-container {
    background: #132867;
    position: relative;
    height: 100vh;
  }
  &-top {
    position: relative;
    height: 160rem;
    color: white;
    background: url(/static/images/wdBlockChain/operation-title.png) center top
      no-repeat;

    h1 {
      position: absolute;
      top: 55rem;
      left: 50%;
      transform: translateX(-50%);
    }

    img {
      margin-right: 10rem;
      vertical-align: middle;
      width: 40rem;
    }
  }
  &-side {
    z-index: 10000;
    position: absolute;
    left: 0;
  }
  &-content {
    margin: 10rem 20rem 0 60rem;
    & > div:first-child {
      height: calc(100vh - 150px);
    }
  }

  &-container {
    position: relative;
    background: url(/static/images/wdBlockChain/background-operation.jpg) center
      center no-repeat;
    background-size: cover;
  }

  &__list {
    position: absolute;
    top: 90rem;
    left: 0;
  }

  &__item {
    width: 1em;
    padding: 12rem;
    border-left: none;
    border-radius: 0 4px 4px 0;
    background-color: #014395;
    cursor: pointer;
    border: 1px solid #199efc;
    color: #199efc;

    & + & {
      margin-top: 1em;
    }

    &--active,
    &:hover {
      @extend .blockchain-exp-index__item;
      color: #0ff;
      border: 1px solid #0ff;
    }
  }
}
</style>
