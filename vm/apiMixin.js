import CourseMixin from "@/views/course/apiMixin";

const {
  getExperimentState,
  getGuacConnectingToken,
  requestCloseVm,
  requestOpenVm,
  createExperiment,
  requestCompletionExperiment,
  requestDeleteExperiment,
  getUserVmInfoList,
} = CourseMixin.methods;

export default {
  methods: {
    getUserVmInfoList,
    getExperimentState,
    getGuacConnectingToken,
    requestCloseVm,
    requestOpenVm,
    createExperiment,
    requestCompletionExperiment,
    requestDeleteExperiment,
  },
};
