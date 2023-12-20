<template>
  <div>
    <bc-div class="exp-operation">
      <component :is="$root.activeExp && $root.activeExp.component"></component>
    </bc-div>
    <vm-dialog ref="vmDialog"></vm-dialog>
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
      "
    >
      <el-button @click="openVM" :loading="vmLoading"> 打开虚拟机 </el-button>
      <el-button @click="submit" :loading="submitLoading"> 提交成果 </el-button>
    </div>
  </div>
</template>

<script>
import vmDialog from "../vm/dialog";
import Report from "@/views/blockchain/components/report";
import BcDiv from "@/views/blockchain/components/bcDiv";
import BcButton from "@/views/blockchain/components/BcButton";
export default {
  inject: ["eventBus"],
  data() {
    return {
      vmLoading: false,
      submitLoading: false,
    };
  },
  components: {
    vmDialog,
    Report,
    BcDiv,
    BcButton,
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
    openVM() {
      this.vmLoading = true;
      this.eventBus.$emit("open-vm");
    },
    submit() {
      this.submitLoading = true;
      const eventName = "submit-experiment";
      this.eventBus.$emit(eventName);
    },
  },
};
</script>
