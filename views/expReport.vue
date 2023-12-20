<template>
  <bc-div title="实验报告" class="exp-report">
    <report></report>
  </bc-div>
</template>

<script>
import Report from "@/views/blockchain/components/report";
import BcDiv from "@/views/blockchain/components/bcDiv";
export default {
  components: {
    Report,
    BcDiv,
  },
};
</script>
