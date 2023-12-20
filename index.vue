<template>
  <div class="block-chain">
    <header class="block-chain__header">
      <login-nav
        :platform-name="$root.projectInfo.chapter_name"
        :is-login="isLogin"
        :user-name="userName"
        :user-type="userType"
        @login="handleLogin"
        @logout="handleLogout"
      >
        <el-dialog
          :visible.sync="showLoginDialog"
          :close-on-click-modal="false"
          :append-to-body="true"
          width="30%"
        >
          <login-box @login="login"></login-box>
        </el-dialog>
      </login-nav>
    </header>
    <main class="block-chain__main">
      <div class="block-chain__switchmode">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <img
        style="width: 100%"
        src="/static/images/wdBlockChain/index-downpart.jpg"
        alt=""
      />
      <div
        class="block-chain__step1"
        @click="startExp(1)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-1.png"
          alt=""
        />
        <p>1-1<br />区块链组网</p>
      </div>
      <div
        class="block-chain__step2"
        @click="startExp(2)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-2.png"
          alt=""
        />
        <p>2-1<br />网络嗅探<br />与窃听</p>
      </div>
      <div
        class="block-chain__step2-2"
        @click="startExp(3)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-2-2.png"
          alt=""
        />
        <p>2-2<br />网络分割<br />设计</p>
      </div>
      <div
        class="block-chain__step3-1"
        @click="startExp(4)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-3-1.png"
          alt=""
        />
        <p>3-1<br />P2P路由污染</p>
      </div>
      <div
        class="block-chain__step3-2"
        @click="startExp(5)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-3-2.png"
          alt=""
        />
        <p>3-2<br />BGP劫持</p>
      </div>
      <div
        class="block-chain__step4-1"
        @click="startExp(6)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-4-1.png"
          alt=""
        />
        <p>4-1<br />双花建立于<br />恶意分叉</p>
      </div>
      <div
        class="block-chain__step4-2"
        @click="startExp(7)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-4-2.png"
          alt=""
        />
        <p>4-2<br />延迟阻碍</p>
      </div>
      <div
        class="block-chain__step4-3"
        @click="startExp(8)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-4-3.png"
          alt=""
        />
        <p>4-3<br />算例吞食<br />与吞并</p>
      </div>
      <div
        class="block-chain__step5-1"
        @click="startExp(9)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-5-1.png"
          alt=""
        />
        <p>5-1<br />威胁探测与<br />应急响应</p>
      </div>
      <div
        class="block-chain__step5-2"
        @click="startExp(10)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-5-2.png"
          alt=""
        />
        <p>5-2<br />双模架构与<br />信用体系</p>
      </div>
      <div
        class="block-chain__step5-3"
        @click="startExp(11)"
        @mouseenter="showDetail"
        @mouseleave="noShowDetail"
      >
        <img
          style="width: 100%"
          src="/static/images/wdBlockChain/circle-5-3.png"
          alt=""
        />
        <p>5-3<br />区块链安全<br />前沿技术</p>
      </div>
    </main>
    <dialog-detail ref="detail"></dialog-detail>
  </div>
</template>

<script>
import loginNav from "./loginNav";
import LoginBox from "@/components/loginBox";
import DialogDetail from "./detail";
import { getRole, removeRole } from "@/utils/role";
import { logout } from "@/api/login";
import { removeToken } from "@/utils/auth";
import { debounce } from "lodash";
let navbarActionIncepterHandler;

export default {
  name: "block-chain",
  data() {
    const userInfo = getRole();
    const isLogin = !!userInfo;
    return {
      isLogin,
      userType: userInfo && userInfo.user_type,
      userName: userInfo && userInfo.fullname,
      showLoginDialog: false,
      value: 1,
      options: [
        {
          label: "练习模式",
          value: 1,
        },
        {
          label: "竞赛模式",
          value: 2,
        },
        {
          label: "体验模式",
          value: 3,
        },
      ],
    };
  },
  components: {
    loginNav,
    LoginBox,
    DialogDetail,
  },
  methods: {
    login(data) {
      this.$message.success("登陆成功");
      this.userType = data.user_type;
      this.userName = data.fullname;
      window.sessionStorage.setItem("user_img", JSON.stringify(data.image));
      this.showLoginDialog = false;
      this.isLogin = true;
      this.$root.$emit("change-expStutus");
      navbarActionIncepterHandler();
      navbarActionIncepterHandler = null;
    },
    handleLogin(done) {
      this.showLoginDialog = true;
      navbarActionIncepterHandler = done;
      done();
    },
    async handleLogout(done) {
      await logout();
      removeRole();
      removeToken();
      this.isLogin = false;
      this.userName = undefined;
      done();
    },
    startExp(index) {
      if (!this.isLogin) {
        this.$message.info("请先登录");
        return;
      }
      let mode;
      if (this.value === 1) {
        // 练习模式
        mode = "train";
      } else if (this.value === 2) {
        // 竞赛模式
        mode = "competition";
      } else {
        mode = "experience";
      }
      this.$router.push({
        path: `/experiment/${mode}`,
        query: { index: index },
      });
      this.$root.activeExp = this.$route.query.index
        ? this.$root.taskList[parseInt(this.$route.query.index) - 1]
        : this.$root.taskList[0];
    },
    showDetail: debounce(function () {
      this.$refs.detail.setSourceData({});
    }, 500),
    noShowDetail() {
      this.$refs.detail.setSourceData(undefined);
    },
  },
};
</script>

<style lang="scss">
@keyframes spinning {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

%circle {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  cursor: pointer;

  & > img {
    z-index: 0;
  }

  p {
    font-size: 14px;
    z-index: 1;
    position: absolute;
    text-align: center;
    color: #fff;
  }

  &:hover {
    & > img {
      animation: spinning 2s linear infinite;
    }
  }
}

// 激活时使用该类进行旋转
.is-spnning {
  & > img {
    animation: spinning 2s linear infinite;
  }
}

.block-chain {
  display: grid;
  background: url(/static/images/wdBlockChain/index-background.png);
  background-position: center center;
  background-size: cover;
  grid-template:
    "header" 85rem
    "main" auto;

  &__header {
    grid-area: header;
    background: rgba(0, 0, 0, 0.3);
  }

  &__main {
    grid-area: main;
    position: relative;
  }

  &__step1 {
    @extend %circle;
    top: 178rem;
    left: 178rem;
    width: 211rem;
    height: 211rem;
  }

  &__step2 {
    @extend %circle;
    top: 418rem;
    left: 331rem;
    width: 146rem;
    height: 146rem;
  }

  &__step2-2 {
    @extend %circle;
    top: 622rem;
    left: 185rem;
    width: 126rem;
    height: 126rem;
  }

  &__step3-1 {
    @extend %circle;
    top: 685rem;
    left: 459rem;
    width: 197rem;
    height: 197rem;
  }
  &__step3-2 {
    @extend %circle;
    top: 750rem;
    left: 723rem;
    width: 126rem;
    height: 126rem;
  }

  &__step4-1 {
    @extend %circle;
    top: 730rem;
    left: 962rem;
    width: 157rem;
    height: 157rem;
  }

  &__step4-2 {
    @extend %circle;
    top: 674rem;
    left: 1241rem;
    width: 126rem;
    height: 126rem;
  }

  &__step4-3 {
    @extend %circle;
    top: 591rem;
    right: 246rem;
    width: 142rem;
    height: 142rem;
  }

  &__step5-1 {
    @extend %circle;
    top: 398rem;
    right: 382rem;
    width: 147rem;
    height: 147rem;
  }

  &__step5-2 {
    @extend %circle;
    top: 199rem;
    right: 380rem;
    width: 126rem;
    height: 126rem;
  }

  &__step5-3 {
    @extend %circle;
    top: 190rem;
    right: 142rem;
    width: 142rem;
    height: 142rem;
  }
  @keyframes switchmode {
    0% {
      transform: scale(1); /*开始为原始大小*/
    }
    25% {
      transform: scale(0.5); /*放大1.1倍*/
    }
    50% {
      transform: scale(0.8);
    }
    75% {
      transform: scale(1);
    }
  }
  &__switchmode:hover {
    animation-name: switchmode;
    animation-duration: 4s;
  }
  &__switchmode {
    position: absolute;
    top: 70rem;
    right: 50rem;
    width: 220px;
    height: 70px;
    background: url("/static/images/wdBlockChain/u330.png") center center
      no-repeat;
    background-size: cover;
    line-height: 70px;
    text-align: center;
    .el-select {
      border: 0;
      width: 170px;
      background: transparent;
    }
    .el-input__inner {
      padding-right: 30px;
      background: transparent;
      border: 0;
      color: #00ffff;
      text-align: center;
      font-size: 18px;
    }
    .el-input__suffix {
      top: -4px;
    }
    .el-select .el-input .el-select__caret {
      color: #00ffff;
    }
  }
}
</style>
