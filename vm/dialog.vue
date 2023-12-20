<template>
  <el-dialog
    ref="dialog"
    class="vm-dialog"
    custom-class="vm-dialog__body"
    title="虚拟机"
    :visible.sync="showVmDialog"
    :fullscreen="fullscreen"
    width="700px"
    v-dialogDrag="!fullscreen"
    @close="closeDialog"
  >
    <div :style="{ height: !fullscreen ? '400px' : '100%' }">
      <vm
        :courseId="$root.projectInfo.course_id"
        :experimentId="$root.activeExp.chapter_id"
        :projectType="$root.projectInfo.project_type"
      ></vm>
    </div>
    <!-- <img
      src="/static/images/wdBlockChain/vm.png"
      style="width: 100%; height: 100%"
    /> -->
  </el-dialog>
</template>

<script>
const OPEN_VM = "open-vm";
const CLOSE_VM = "close-vm";
let mockId;
import { getVmOpened, createVm, closeVm } from "@/api/cloud";
import { waitVmReady } from "@/components/experimentCommon/waitVmReady";
import {
  VM_NULL,
  VM_CLOSED,
  VM_RUNNING,
  VM_FAILED,
} from "@/components/experimentCommon/vmState";
import debounce from "lodash/debounce";
import Vm from "./vm";
export default {
  name: "vm-dialog",
  props: ["value"],
  inject: ["eventBus"],
  data() {
    return {
      fullscreen: true,
      showVmDialog: false,
    };
  },
  components: {
    Vm,
  },
  computed: {
    module() {
      // 1组内对抗,2组内协同,3单人模式
      switch (this.$root.projectInfo.project_type) {
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
  directives: {
    dialogDrag: {
      update(el, binding) {
        if (!binding.value) {
          return;
        }
        const dialogHeaderEl = el.querySelector(".el-dialog__header");
        const dragDom = el.querySelector(".el-dialog");
        dialogHeaderEl.style.cursor = "move";

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty =
          dragDom.currentStyle || window.getComputedStyle(dragDom, null);

        dialogHeaderEl.onmousedown = (e) => {
          // 鼠标按下，计算当前元素距离可视区的距离
          const disX = e.clientX - dialogHeaderEl.offsetLeft;
          const disY = e.clientY - dialogHeaderEl.offsetTop;

          // 获取到的值带px 正则匹配替换
          let styL, styT;

          // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
          if (sty.left.includes("%")) {
            styL =
              +document.body.clientWidth * (+sty.left.replace(/%/g, "") / 100);
            styT =
              +document.body.clientHeight * (+sty.top.replace(/%/g, "") / 100);
          } else {
            styL = +sty.left.replace(/\px/g, "");
            styT = +sty.top.replace(/\px/g, "");
          }

          document.onmousemove = function (e) {
            // 通过事件委托，计算移动的距离
            const l = e.clientX - disX;
            const t = e.clientY - disY;

            // 移动当前元素
            dragDom.style.left = `${l + styL}px`;
            dragDom.style.top = `${t + styT}px`;
          };

          document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
          };
        };
      },
    },
  },
  created() {
    this.eventBus.$on(
      "shutdown-vm",
      debounce(() => {
        if (mockId) {
          closeVm({
            course_id: this.$root.projectInfo.course_id,
            experiment_id: this.$root.activeExp.chapter_id,
            mock_id: mockId,
            module: this.module || 5,
          }).then(() => {
            this.$message.success("关闭虚机成功");
          });
        }
      }, 500)
    );
    this.eventBus.$on(
      OPEN_VM,
      debounce(async (isfullscreen = true) => {
        if (this.showVmDialog) {
          return;
        }
        this.eventBus.$emit("vm-loading", true);
        let flag = await this.startVm();
        if (flag) {
          this.open(isfullscreen);
        }
        this.eventBus.$emit("vm-loading", false);
      }, 1000)
    );
  },
  methods: {
    open(isfullscreen) {
      this.showVmDialog = true;
      this.fullscreen = isfullscreen;
      if (isfullscreen) {
        this.$refs.dialog.style.top = 0;
        this.$refs.dialog.style.left = 0;
      }
    },
    async startVm() {
      let course_id = this.$root.projectInfo.course_id;
      let experiment_id = this.$root.activeExp.chapter_id;
      let module = this.module || 5;
      try {
        let data = await getVmOpened({
          course_id,
          experiment_id,
          transfer_to_uuid: "",
          module,
        });
        mockId = data.data.mock_id;
        let status = data.data.exp_status;
        if (status === VM_RUNNING || status === VM_CLOSED) {
          return true;
        }
        if (status === VM_FAILED) {
          this.$message.error("开启虚机失败");
          return false;
        }
        if (status === VM_NULL) {
          try {
            await createVm({
              course_id,
              experiment_id,
              module,
            });
          } catch (err) {
            return false;
          }
        }
        try {
          await waitVmReady(
            async () =>
              await getVmOpened({
                course_id,
                experiment_id,
                transfer_to_uuid: "",
                module,
              }).data.data.exp_status,
            status
          );
          return true;
        } catch (error) {
          this.$message.error(error);
          return false;
        }
      } catch (err) {
        mockId = null;
        return false;
      }
    },
    closeDialog() {
      this.eventBus.$emit(CLOSE_VM);
    },
  },
  beforeDestroy() {
    this.eventBus.$off(OPEN_VM);
  },
};
</script>
<style lang="scss">
.vm-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #767676;
  }

  .el-dialog__title {
    color: #fff;
  }

  .el-dialog__body {
    color: #d2d2d2;
    font-size: 14px;
    line-height: 32px;
    height: calc(100% - 55px);
    box-sizing: border-box;
  }

  .el-dialog__footer {
    height: 70px;
    text-align: center;
    border-radius: initial;
  }

  &__ {
    &body {
      background: #3b4349;
    }
  }
}
</style>
