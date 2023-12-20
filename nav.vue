<template>
  <nav class="exp-nav">
    <div class="nav-left">
      <span class="goback" @click="goBack">
        <i class="el-icon-back"></i> 返回
      </span>
      <el-popover placement="top-start" trigger="hover">
        <template #reference>
          <span class="exp-name"
            >当前任务 :{{
              `${$root.activeExp.index} ${$root.activeExp.task_name}`
            }}</span
          >
        </template>
        <el-timeline class="exp-nav__progress">
          <el-timeline-item
            v-for="item of $root.taskList"
            :key="item.id"
            :hide-timestamp="true"
            :type="getTimeLineType(item.num)"
          >
            {{ item.task_name }}
          </el-timeline-item>
        </el-timeline>
      </el-popover>
      <div class="tab-menu">
        <div
          :class="[
            'tab-item',
            $route.path === `/blockChain/${$route.params.mode}/guide`
              ? 'active'
              : '',
          ]"
          @click="goPage(`/blockChain/${$route.params.mode}/guide`)"
        >
          介绍
        </div>
        <div
          :class="[
            'tab-item',
            $route.path === `/blockChain/${$route.params.mode}/experiment` &&
              'active',
          ]"
          @click="
            goPage(
              `/blockChain/${$route.params.mode}/experiment?index=${$root.activeExp.num}`
            )
          "
        >
          操作
        </div>
        <div
          :class="[
            'tab-item',
            $route.path === `/blockChain/${$route.params.mode}/report` &&
              'active',
          ]"
          @click="goPage(`/blockChain/${$route.params.mode}/report`)"
        >
          报告
        </div>
        <div
          :class="[
            'tab-item',
            $route.path === `/blockChain/${$route.params.mode}/question` &&
              'active',
          ]"
          @click="goPage(`/blockChain/${$route.params.mode}/question`)"
        >
          问答
        </div>
        <div
          :class="[
            'tab-item',
            $route.path === `/blockChain/${$route.params.mode}/evaluate` &&
              'active',
          ]"
          @click="goPage(`/blockChain/${$route.params.mode}/evaluate`)"
        >
          评价
        </div>
      </div>
    </div>
    <div class="nav-right">
      <!-- <el-button type="primary" class="btn" @click="handleGuide"
        >实验指导</el-button
      > -->
      <!-- <el-button
        type="warning"
        v-if="$route.params.mode === 'experience'"
        class="btn"
        @click="help"
        >帮助</el-button
      > -->
      <el-button
        type="primary"
        class="btn"
        @click="handleOpenVm"
        :loading="vmLoading"
        >打开虚拟机</el-button
      >
      <el-button type="primary" class="btn" @click="handleCloseVm"
        >关闭虚拟机</el-button
      >
      <el-button
        type="warning"
        class="btn"
        @click="handleSubmit"
        :loading="submitLoading"
        >提交成果</el-button
      >
    </div>
  </nav>
</template>

<script>
function inTopoPage(self) {
  return self.$route.path.includes("experiment");
}
export default {
  inject: ["eventBus"],
  data() {
    return {
      vmLoading: false,
      submitLoading: false,
    };
  },
  mounted() {
    this.eventBus.$on("vm-loading", (val) => {
      this.vmLoading = val;
    });
    this.eventBus.$on("submit-loading", (val) => {
      this.submitLoading = val;
    });
  },
  methods: {
    help() {
      this.eventBus.$emit("help");
    },
    getTimeLineType(num) {
      if (num > this.$root.activeExp.num) {
        return undefined;
      } else if (num < this.$root.activeExp.num) {
        return "success";
      } else {
        return "primary";
      }
    },
    goBack() {
      this.$router.push({
        path: "/",
      });
    },
    goPage(path) {
      if (path === this.$route.path) return;
      this.$router.push(path);
    },
    handleOpenVm() {
      if (!inTopoPage(this)) {
        return this.$message({
          type: "info",
          message: "请在操作页面打开虚机",
        });
      }
      this.eventBus.$emit("open-vm");
    },
    handleSubmit() {
      if (!inTopoPage(this)) {
        return this.$message({
          type: "info",
          message: "请在拓扑图页面提交成果",
        });
      }
      const eventName = "submit-experiment";
      this.eventBus.$emit(eventName);
    },
    showStep() {},
    openTopoEnviroment() {},
    handleCloseVm() {
      this.eventBus.$emit("shutdown-vm");
    },
  },
};
</script>

<style lang="scss" scoped>
$navHeight: 42px;
.exp-nav {
  font-size: 14px;
  background: #4d4d4d;
  height: $navHeight;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  color: #b7b7b7;

  &__progress {
    margin: 20px 8px 0 8px;
  }

  .nav-left {
    display: flex;
    align-items: center;
    .goback {
      cursor: pointer;
    }
    .exp-name {
      user-select: none;
      color: white;
      font-weight: bold;
      margin-left: 26px;
      margin-right: 48px;
    }
    .tab-menu {
      display: flex;
      .tab-item {
        height: $navHeight;
        text-align: center;
        line-height: $navHeight;
        width: 103px;
        cursor: pointer;
        &.active,
        &:hover {
          background: #125686;
          color: #ffffff;
        }
      }
    }
  }
  .nav-right {
    display: flex;
    align-items: center;
    .btn {
      height: 30px;
      line-height: 30px;
      padding: 0 20px;
    }
  }
}
</style>
