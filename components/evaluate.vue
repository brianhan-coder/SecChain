<template>
  <div class="wdblockchain-evaluate">
    <evaluate
      :course_id="$root.projectInfo.course_id"
      :experiment_id="$root.activeExp.chapter_id"
    ></evaluate>
  </div>
</template>

<script>
import evaluate from "@/components/experimentCommon/tabItem/evaluate";
export default {
  components: {
    evaluate,
  },
};
</script>
