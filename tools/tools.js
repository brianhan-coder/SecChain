/*
 * @Description: 工具
 * @Author: Lihang
 * @Date: 2020-10-26 11:42:21
 * @LastEditTime: 2020-12-29 18:24:38
 * @LastEditors: lihang
 */
const NODE_CREATE = "create";
const NODE_SEARCH = "search";
const NODE_SNIFF = "sniff";
const NODE_LINK = "link";
const LINK_SEARCH = "linkSearch";

export let toolType = {
  NODE_CREATE,
  NODE_SEARCH,
  NODE_LINK,
  NODE_SNIFF,
  LINK_SEARCH,
};
export default [
  {
    name: "节点创建工具",
    type: NODE_CREATE,
    status: "Y",
    imgSrc: "/static/images/wdBlockChain/tool-1.png",
    background:
      "linear-gradient(180deg, #6CD7FA 0%, #6BC7F4 36.55%, #6EAAEA 71.64%, #648DDF 100%)",
    tips: "点击创建节点",
    description: "点击创建节点",
  },
  {
    name: "节点查询工具",
    type: NODE_SEARCH,
    status: "Y",
    imgSrc: "/static/images/wdBlockChain/tool-2.png",
    background:
      "linear-gradient(180deg, #FD98AD 0%, #F98AA1 36.55%, #ED708B 71.64%, #F4597A 100%)",
    tips: "点击查询节点信息",
    description: "点击查询节点信息",
  },
  // {
  //   name: "嗅探工具",
  //   type: NODE_SNIFF,
  //   status: "Y",
  //   imgSrc: "/static/images/wdBlockChain/tool-3.png",
  //   background:
  //     "linear-gradient(180deg, #9685F8 0%, #8E7AF8 36.55%, #8771F8 71.64%, #866EF9 100%)",
  //   tips: "嗅探节点",
  //   description: "嗅探节点",
  // },
  {
    name: "连接工具",
    type: NODE_LINK,
    status: "Y",
    imgSrc: "/static/images/wdBlockChain/tool-5.png",
    background:
      "linear-gradient(180deg, #FCCC9E 0%, #FCA5A4 36.55%, #ED8DB1 71.64%, #FD77AA 100%)",
    tips: "点击连接剩余节点",
    description: "点击连接节点",
  },
  // {
  //   name: "完整拓扑图",
  //   type: NODE_LINK,
  //   status: "N",
  //   imgSrc: "/static/images/wdBlockChain/tool-3.png",
  //   background:
  //     "linear-gradient(180deg, #9685F8 0%, #8E7AF8 36.55%, #8771F8 71.64%, #866EF9 100%)",
  // },
  // {
  //   name: "链长查询工具",
  //   type: LINK_SEARCH,
  //   status: "Y",
  //   imgSrc: "/static/images/wdBlockChain/tool-4.png",
  //   background:
  //     "linear-gradient(180deg, #FFDDAB 0%, #F0AF70 39.58%, #EBB96E 71.64%, #E6A442 100%)",
  //   tips: "查询区块链长",
  //   description: "查询区块链长",
  // },
];
