import vue from "vue";
import vuex from "vuex";
vue.use(vuex);

const initialState = {
  layoutMode: "expand",
  experimentId: undefined,
  courseId: undefined,
  markdownOnGuide: undefined,
  // 用户名称
  userName: undefined,
  // 头像地址
  avatarSrc: undefined,
  stepList: [],
  activeStep: undefined,
};

import { Store } from "vuex";

const store = new Store({
  state: {
    // 为了区别原有对象和当前对象
    // 进行浅拷贝状态对象
    // Vuex 会把这个位置的对象进行深度观察
    ...initialState,
  },
  mutations: {
    setStepList(state, stepList) {
      state.stepList = stepList;
    },
    setGuideMarkdown(state, markdown) {
      state.markdownOnGuide = markdown;
    },
    setExperimentInfo(state, { experimentId, courseId }) {
      // 只接收 experimentId 和 courseId
      Object.assign(state, { experimentId, courseId });
    },
    expandSidebar(state) {
      state.layoutMode = "expand";
    },
    collapseSidebar(state) {
      state.layoutMode = "collapse";
    },
    resetState(state) {
      Object.assign(state, initialState);
    },
    setAvatarSrc(state, img) {
      state.avatarSrc = img;
    },
  },
});

export default store;
