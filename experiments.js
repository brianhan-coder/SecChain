import build from "./experiment/build/index";
import sniff from "./experiment/sniff/index";
import divide from "./experiment/divide/index";
import eclipse from "./experiment/eclipse/index";
import BGP from "./experiment/BGP/index";
import dbFlower from "./experiment/dbFlower/index";
import attack51 from "./experiment/attack51/index";
import delayAttack from "./experiment/delayAttack/index";
import threaten from "./experiment/threaten/index";
import dualMode from "./experiment/dualMode/index";
import machineLearning from "./experiment/machineLearning/index";

let components = [
  build,
  sniff,
  divide,
  eclipse,
  BGP,
  dbFlower,
  delayAttack,
  attack51,
  threaten,
  dualMode,
  machineLearning,
];

export default function getMenu(taskList) {
  taskList.forEach((task) => {
    task.component = components[task.num - 1];
  });
  let build = taskList.slice(0, 1);
  let analysis = taskList.slice(1, 3);
  let net = taskList.slice(3, 5);
  let attack = taskList.slice(5, 8);
  let defend = taskList.slice(8, 11);
  build.forEach((item, idx) => {
    item.index = `1-${idx + 1}`;
  });
  analysis.forEach((item, idx) => {
    item.index = `2-${idx + 1}`;
  });
  net.forEach((item, idx) => {
    item.index = `3-${idx + 1}`;
  });
  attack.forEach((item, idx) => {
    item.index = `4-${idx + 1}`;
  });
  defend.forEach((item, idx) => {
    item.index = `5-${idx + 1}`;
  });
  return {
    menuList: {
      区块链组网: build,
      数据层分析: analysis,
      网络层提权: net,
      共识层威胁: attack,
      防御部署与优化: defend,
    },
    taskList: [...build, ...analysis, ...net, ...attack, ...defend],
  };
}
