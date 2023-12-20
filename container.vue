<template>
  <article :class="containerClass">
    <aside class="container__sidebar">
      <slot name="sidebar"></slot>
    </aside>
    <main class="container__main">
      <slot name="main"></slot>
    </main>
    <div class="mask" v-show="showMask"></div>
    <question-dialog
      ref="questionDialog"
      @done="submitQuestion"
      :problem="question"
    ></question-dialog>
  </article>
</template>

<script>
import QuestionDialog from "@/views/blockchain/components/questionDialog";
import { mapState, mapMutations } from "vuex";
import { getSteps, answerQuestion } from "@/api/blockChain";
export default {
  name: "container",
  provide() {
    return {
      eventBus: this,
    };
  },
  components: {
    QuestionDialog,
  },
  computed: {
    ...mapState(["layoutMode", "stepList"]),
    containerClass() {
      switch (this.layoutMode) {
        case "expand":
          return ["container"];
        case "collapse":
          return ["container--collapse"];
      }
      return undefined;
    },
    question() {
      if (this.questionList && this.questionList.length) {
        return this.questionList[this.questionIndex];
      }
      return undefined;
    },
  },
  data() {
    return {
      showMask: false,
      questionList: [],
      questionIndex: 0,
      activeStep: undefined,
    };
  },
  created() {
    this.$on("show-mask", (bool) => {
      this.showMask = bool;
    });
    this.$on("show-question", (data) => {
      this.$refs.questionDialog.showDialog = true;
      this.questionIndex = 0;
      this.questionList = data;
    });
    this.$root.$on("exp-loaded", () => {
      this.getSteps();
    });
    this.$root.$on("get-activeStep", (data) => {
      this.activeStep = data;
    });
  },
  watch: {
    "$route.query.index": {
      handler() {
        this.getSteps();
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations(["setStepList"]),
    getSteps() {
      return getSteps({ task_id: this.$root.activeExp.id }).then((res) => {
        // this.stepList = res.data;
        // this.$root.$emit("get-steps", res.data);
        this.setStepList(res.data);
      });
    },
    submitQuestion(answer) {
      answerQuestion({
        step_id: this.stepList[this.activeStep].id,
        question_id: answer.id,
        answer: answer.result,
      });
      if (this.questionIndex < this.questionList.length - 1) {
        this.questionIndex++;
      } else {
        this.$refs.questionDialog.showDialog = false;
        this.$message.success("答案已提交");
      }
    },
  },
};
</script>

<style lang="scss">
.container {
  display: grid;
  grid-template: "sidebar main" 100vh / 560rem 1fr;

  &--collapse {
    @extend .container;
    grid-template: "sidebar main" 100vh / 100rem 1fr;
  }

  &__sidebar {
    grid-area: sidebar;
  }

  &__main {
    grid-area: main;
  }

  .mask {
    z-index: 2000;
    position: fixed;
    background: rgba(0, 0, 0, 0.4);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
