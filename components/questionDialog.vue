<template>
  <el-dialog
    class="question-dialog"
    :visible="showDialog"
    :show-close="false"
    :close-on-click-modal="false"
    width="50%"
  >
    <el-tabs type="border-card" v-model="tabName">
      <el-tab-pane label="阅读材料" v-if="question.question" name="read">
        <div
          v-if="question.question"
          class="question-dialog__description"
          v-html="question.question"
        ></div
      ></el-tab-pane>
      <el-tab-pane label="答题" name="answer">
        <div class="question-dialog-question">
          <div>{{ question.title }}</div>
          <!-- <span>分值: {{ question.score }}</span> -->
        </div>
        <div class="question-dialog__input">
          <!-- 单选 -->
          <el-radio-group
            v-model="question.result"
            v-if="question.type === 1 && question.choose_option === 'single'"
          >
            <el-radio
              v-for="(item, subIndex) of question.body"
              :key="subIndex"
              :label="subIndex + 1"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
          <!-- 多选 -->
          <el-checkbox-group
            v-model="question.result"
            v-if="question.type === 1 && question.choose_option === 'multi'"
          >
            <el-checkbox
              v-for="(item, subIndex) of question.body"
              :key="subIndex"
              :label="subIndex + 1"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
          <!-- 填空 -->
          <el-input
            v-if="question.type === 2"
            v-model="question.result"
            placeholder="请输入答案"
            clearable
          ></el-input></div
      ></el-tab-pane>
    </el-tabs>

    <el-button
      slot="footer"
      type="primary"
      @click="submit"
      v-if="tabName === 'answer'"
      >提交答案</el-button
    >
  </el-dialog>
</template>

<script>
// TODO: 请求接口和响应接口定义在 http://192.168.50.14:8081/simpleedu/OVE-UI-NEW/wikis/home 中

// import Vm from "@/components/overSeas/wdBlockChain/vm/vm.vue";

export default {
  name: "question-dialog",
  // inject: ["eventBus"],
  data() {
    return {
      showDialog: this.value || false,
      result: undefined,
      question: [],
      tabName: "read",
    };
  },
  props: ["problem"],
  watch: {
    problem: {
      handler(val) {
        if (!val) {
          return;
        }
        this.tabName = "read";
        let result;
        switch (val.type) {
          case 1:
            if (this.problem.choose_option === "multi") {
              result = [];
            } else {
              result = "";
            }
            break;
          case 2:
            result = "";
            break;
        }
        this.question = {
          ...this.problem,
          result,
        };
        if (this.problem.multi_option) {
          this.question.body = JSON.parse(this.problem.multi_option);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    submit() {
      // 收集答案
      // this.showDialog = false;
      let result;
      if (this.problem.type === 1 && this.problem.choose_option === "multi") {
        result = this.question.result.join();
      } else {
        result = this.question.result;
      }
      if (result) {
        this.$emit("done", { id: this.question.id, result });
      } else {
        this.$message.error("请答题后在提交");
      }
    },
  },
};
</script>

<style lang="scss">
.question-dialog {
  &-question:not(:last-child) {
    margin-bottom: 20px;
  }
  &__description {
    margin: 1em;
    padding: 1em;
    color: #199efc;
    max-height: 40vh;
    overflow: auto;
  }

  section + section {
    margin-top: 3em;
  }
  .el-tabs__header {
    background: rgba(1, 67, 149, 0.9);
    color: white;
  }
  .el-tabs--border-card {
    background: rgba(1, 67, 149, 0.9);
  }
  .el-radio-group {
    display: block;
  }

  .el-radio {
    display: inline-block;
  }
  .el-radio__label {
    color: white;
  }
  .el-checkbox__label {
    color: white;
  }
  &__input {
    margin: 0 1em;
  }
}
</style>
