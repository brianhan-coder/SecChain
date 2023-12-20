<template>
  <div class="topo-content">
    <canvas height="577" id="canvas"></canvas>
    <node-tip ref="nodeTip"></node-tip>
  </div>
</template>

<script>
import NodeTip from "./nodTip.vue";
import Wtopo from "./topo.js";
// import nodeJson from "./nodeJson";
import { getTopoJson } from "@/api/blockChain";
let topo;

export default {
  components: { NodeTip },
  data() {
    return {
      dialogVisible: false,
    };
  },
  mounted() {
    this.initCanvas();
    // this.initTopo();
  },
  methods: {
    getTopo() {
      return topo;
    },
    initCanvas() {
      var canvas = document.getElementById("canvas");
      var wraper = window.getComputedStyle(
        document.getElementsByClassName("exp-content")[0]
      );
      canvas.height = parseInt(wraper.height) - 72;
      canvas.width = parseInt(wraper.width) - 120;
      topo = new Wtopo(canvas);
    },
    initTopo() {
      return getTopoJson({
        project_id: this.$root.projectInfo.project_id,
      }).then((nodeJson) => {
        topo.JSONtoTopo(nodeJson, false, this.addNodeEvent);
        this.addSceneEvent();
        topo.stage.centerAndZoom(1);
        return topo;
      });
    },
    addSceneEvent() {
      topo.scene.mousedown(() => {
        this.$refs.nodeTip.show = false;
      });
    },
    addNodeEvent(node) {
      if (
        this.$root.activeExp.num === 2 ||
        (this.$root.activeExp.num === 3 && node.deviceInfo.type !== "attack")
      ) {
        node.mouseup((e) => {
          if (e.button === 2) {
            this.showNodeInfo(e, node);
            node.alarm = null;
          }
        });
      }
    },
    showNodeInfo(event, node) {
      this.$refs.nodeTip.x = event.offsetX + 10;
      this.$refs.nodeTip.y = event.offsetY + 10;
      this.$refs.nodeTip.node = node;
      this.$refs.nodeTip.showTip();
    },
  },
};
</script>
<style lang="scss" scoped>
.topo-content {
  padding: 10px;
}
</style>
