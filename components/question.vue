<template>
  <div class="wdblockchain-question">
    <question
      :course_id="$root.projectInfo.course_id"
      :experiment_id="$root.activeExp.chapter_id"
    ></question>
  </div>
</template>

<script>
import question from "@/components/experimentCommon/tabItem/question";
export default {
  components: {
    question,
  },
};
</script>
