<template>
  <div class="exp-guide">
    <!-- <el-button
      class="exp-guide__operation"
      type="primary"
      @click="
        $router.push(
          `/blockChain/${$route.params.mode}/experiment?index=${$root.activeExp.num}`
        )
      "
      >操作实验</el-button
    > -->
    <viewer
      class="exp-guide-viewer"
      :initial-value="
        $root.projectInfo.os_document ? $root.projectInfo.os_document : ''
      "
    ></viewer>
  </div>
</template>

<script>
import Viewer from "@/components/tui-editor/viewer.vue";
export default {
  components: { Viewer },
};
</script>
<style lang="scss">
.exp-guide {
  position: relative;
  margin: 0 auto;
  background: transparent;
  // border-radius: 10px;
  // margin-top: 35px;
  // padding: 15px;
  color: #ffffff;
  &__operation {
    position: absolute;
    top: 0.5em;
    right: 1em;
    z-index: 1;
  }
  .tui-editor-contents p {
    color: white;
  }
  .tui-editor-contents ul,
  .tui-editor-contents menu,
  .tui-editor-contents ol,
  .tui-editor-contents dir {
    color: white;
  }
  .tui-editor-contents table {
    color: white;
  }

  .tui-editor-contents pre {
    background: transparent;
  }
}
</style>
