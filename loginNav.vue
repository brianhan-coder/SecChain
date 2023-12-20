<template>
  <nav class="navbar">
    <ul class="navbar__container">
      <!-- <li><img src="/static/images/wdBlockChain/logo.svg" alt="" /></li> -->
      <li class="navbar__platform">
        <img src="/static/images/wdBlockChain/logo.svg" alt="" />
        <span>{{ platformName }}</span>
      </li>
      <slot></slot>
      <li class="navbar__button">
        <span class="navbar__welcome" v-show="isLogin"
          >欢迎回来，{{ userName }}</span
        >
        <template v-if="isLogin">
          <a class="navbar__entry" :href="managementHref">管理</a>
          <button
            class="navbar__entry"
            type="primary"
            size="mini"
            @click="!interceptAction && handleLogout()"
          >
            登出
          </button>
        </template>
        <button
          class="navbar__entry"
          type="primary"
          size="mini"
          v-else
          @click="!interceptAction && handleLogin()"
        >
          登录
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "navbar",
  props: ["isLogin", "userName", "platformName", "userType"],
  data() {
    return {
      interceptAction: false,
    };
  },
  computed: {
    managementHref() {
      const STUDENT_TYPE = 1;

      switch (this.userType) {
        case STUDENT_TYPE:
          return "/studentcenter/project";
        default:
          return "/teachercenter";
      }
    },
  },
  methods: {
    async handleLogin() {
      // 如果父元素监听了
      // login 事件则触发事件
      // 等到父元素调用异步回调后
      // 在继续执行逻辑
      if (this.$listeners["login"]) {
        this.interceptAction = true;
        await new Promise((resolve) => this.$emit("login", resolve));
        this.interceptAction = false;
      }
    },
    async handleLogout() {
      // 如果父元素监听了
      // login 事件则触发事件
      // 等到父元素调用异步回调后
      // 在继续执行逻辑
      if (this.$listeners["logout"]) {
        this.interceptAction = true;
        await new Promise((resolve) => this.$emit("logout", resolve));
        this.interceptAction = false;
      }
    },
  },
};
</script>

<style lang="scss">
// @import "../common.scss";

.navbar {
  height: 100%;
  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: inherit;
    color: white;
  }
  &__platform {
    font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: #f2f2f2;
    display: flex;
    width: 590px;
    align-items: center;
    justify-content: space-around;
    margin-left: 120rem;
    span {
      display: inline-block;
      width: 520px;
    }
  }
  &__button {
    margin-right: 38rem;
    display: flex;
    align-items: center;
    a {
      display: block;
      text-align: center;
      line-height: 40px;
      margin-right: 10px;
    }
    // :hover {
    //   background: url("/static/images/wdBlockChain/login.svg") no-repeat;
    //   color: #5bc0de;
    // }
  }
  &__welcome {
    margin-right: 1em;
    vertical-align: middle;
  }

  &__management {
    text-decoration: none;
  }
  &__entry {
    width: 90px;
    height: 40px;
    background: url("/static/images/wdBlockChain/login.svg") no-repeat;
    font-size: 16px;
    color: #5bc0de;
    border: 0;
    outline: none;
    cursor: pointer;
  }
}
</style>
