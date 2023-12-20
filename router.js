import { Message } from "element-ui";
import { IS_LAST_STEP, TRAIN_MODE } from "./constant";
const index = () => import("@/views/blockchain");
const expGuide = () => import("@/views/blockchain/components/expGuide");
const trainTopo = () => import("@/views/blockchain/experiment/topo");
const report = () => import("@/views/blockchain/components/report");
const trainMode = () => import("@/views/blockchain/experiment");
const question = () => import("@/views/blockchain/components/question");
const evaluate = () => import("@/views/blockchain/components/evaluate");

import test from "./test";

const router = [
  {
    path: "/",
    component: index,
    name: "武大区块链首页",
  },
  {
    path: "/experiment/:mode",
    component: test,
  },
  {
    path: "/blockChain/:mode",
    component: trainMode,
    beforeEnter: (to, from, next) => {
      if (to.params.mode === TRAIN_MODE && to.query.index === IS_LAST_STEP) {
        Message({
          type: "warning",
          message: "机器学习与算法优化不对学习模块开放",
        });
        next(from);
      } else {
        next();
      }
    },
    name: "实验练习模式",
    children: [
      {
        path: "guide",
        component: expGuide,
        name: "武大区块链实验指导",
      },
      {
        path: "experiment",
        component: trainTopo,
        name: "拓扑图",
      },
      {
        path: "report",
        component: report,
        name: "报告",
      },
      {
        path: "question",
        component: question,
        name: "问答",
      },
      {
        path: "evaluate",
        component: evaluate,
        name: "评价",
      },
    ],
  },
];

export default router;
