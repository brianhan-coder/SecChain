<template>
  <vm
    ref="vm"
    :tunnel="guacTunnel"
    :token="guacToken"
    :show-progress.sync="showProgress"
    @service-created="handleVmServiceCreated"
  ></vm>
</template>
<script>
import Vm from "@/components/experimentCommon/vm";

import apiMixin from "./apiMixin";
import roleMixin from "@/components/experimentCommon/roleMixin";
import bootstrapMixin from "@/components/experimentCommon/bootstrap";
import { createLifeTunnelMixin } from "@/components/experimentCommon/lifeTunnel";

import { VM_RUNNING, VM_CLOSED } from "@/components/experimentCommon/vmState";

export default {
  props: ["projectId", "experimentId", "courseId", "projectType"],
  mixins: [
    roleMixin,
    createLifeTunnelMixin("expInitStates"),
    bootstrapMixin,
    apiMixin,
  ],
  components: {
    Vm,
  },
  data() {
    return {
      activeItemName: "mission",
      showProgress: false,
      activeVmIndex: undefined,
      // 实验初始状态
      expState: undefined,
      /**
       * 有关初始状态的其他信息
       * can_switching_experiment_vm: "1"
       * is_completed: 0
       * mock_id: "asp_experiment_bj_nzoQJV5b07ikGSaOsger"
       * operate_vm_total_time: "0.00"
       * socket_url: "192.168.101.235:8282"
       */
      expInitStates: undefined,
    };
  },
  computed: {
    module() {
      // 1组内对抗,2组内协同,3单人模式
      switch (this.projectType) {
        case 1:
          return 8;
        case 2:
          return 7;
        case 3:
          return 5;
      }

      return undefined;
    },
  },
  methods: {
    handleVmServiceCreated(vmIndex, wrap) {
      wrap
        .bindKeyboard()
        .bindMouse()
        .bindAutoResize(document.getElementsByClassName("vm-wrap__mounted")[0]);
    },
  },
  created() {
    this.$on("bootstrap-refresh", (vmInfoList, activeVmIndex) => {
      this.vmInfoList = vmInfoList;
      this.activeVmInfo = vmInfoList[activeVmIndex];
      this.activeVncInfo = this.activeVmInfo.vnc;
      this.activeVmIndex = activeVmIndex;
    });

    this.$on("bootstrap-connect", () => {
      this.expState = VM_RUNNING;
      this.establishedWebSocketService();
    });
  },
  async mounted() {
    const { exp_status: expState, ...rest } = await this.getExperimentState();

    this.expState = expState;
    this.expInitStates = rest;
    // 如果关机则自动开机
    if (expState === VM_CLOSED) {
      await this.requestOpenVm(this.expInitStates.mock_id);

      this.showProgress = true;

      this.establishedWebSocketService();

      return this.establishConnect(
        this.activeVmIndex ||
          sessionStorage.getItem(`${this.courseId}${this.experimentId}`) ||
          "0",
        rest.mock_id,
        true
      );
    } else if (expState === VM_RUNNING) {
      this.showProgress = true;
      return this.establishConnect(
        sessionStorage.getItem(`${this.courseId}${this.experimentId}`) || "0",
        rest.mock_id
      );
    }
  },
};
</script>
