<template>
  <article :class="sidebarClass">
    <nav class="sidebar__nav">
      <router-link class="sidebar__back" to="/"
        ><span class="el-icon-back">返回</span></router-link
      >
      <ul class="sidebar__list">
        <li class="sidebar__item" @click="$router.push('/')">
          <p><span class="el-icon-back"></span></p>
          <p style="font-size: 20rem">返回</p>
        </li>
        <li class="sidebar__item" @click="handleGuideClick">
          <p><span class="el-icon-guide"></span></p>
          <p style="font-size: 20rem">指导</p>
        </li>
        <li class="sidebar__item" @click="handleFaqClick">
          <p><span class="el-icon-chat-dot-square"></span></p>
          <p style="font-size: 20rem">问答</p>
        </li>
        <li class="sidebar__item" @click="handleCommentClick">
          <p><span class="el-icon-star-off"></span></p>
          <p style="font-size: 20rem">评价</p>
        </li>
      </ul>
      <p class="wdBlockChain-guideBar__duration" v-if="showDuration">
        用时: {{ durationText }}
      </p>
      <div class="sidebar__user">
        <div class="sidebar__info">
          <el-avatar :src="avatarSrc"></el-avatar>
          <span>{{ userName }}</span>
        </div>
        <el-button size="mini" @click="handleLogout">登出</el-button>
      </div>
    </nav>
    <el-tabs v-model="activeItemName" stretch lazy>
      <el-tab-pane label="实验指导" name="guide"></el-tab-pane>
      <el-tab-pane label="问答" name="faq"></el-tab-pane>
      <el-tab-pane label="评价" name="comment"></el-tab-pane>
    </el-tabs>
    <main class="sidebar__main">
      <keep-alive>
        <component
          :is="activeItemName"
          :experiment_id="experimentId"
          :course_id="courseId"
          :initial-value="markdownOnGuide"
        ></component>
      </keep-alive>
    </main>
  </article>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { removeRole } from "@/utils/role";
import { removeToken } from "@/utils/auth";

import Comment from "@/views/blockchain/components/evaluate";
import Guide from "@/views/blockchain/experiment/missionList";
import Faq from "@/views/blockchain/components/question";
import DurationMixin from "@/components/public/durationMixin";
import { COMPETITION_MODE } from "./constant";
export default {
  name: "sidebar",
  components: {
    Comment,
    Guide,
    Faq,
  },
  data() {
    return {
      activeItemName: "guide",
    };
  },
  mixins: [DurationMixin],
  computed: {
    ...mapState([
      "experimentId",
      "courseId",
      "markdownOnGuide",
      "layoutMode",
      "userName",
      "avatarSrc",
    ]),
    sidebarClass() {
      switch (this.layoutMode) {
        case "expand":
          return ["sidebar"];
        case "collapse":
          return ["sidebar--collapse"];
        default:
          return undefined;
      }
    },
    showDuration() {
      return this.$route.params.mode === COMPETITION_MODE;
    },
  },
  methods: {
    ...mapMutations(["expandSidebar", "resetState", "setAvatarSrc"]),
    handleGuideClick() {
      this.activeItemName = "guide";
      this.expandSidebar();
    },
    handleFaqClick() {
      this.activeItemName = "faq";
      this.expandSidebar();
    },
    handleCommentClick() {
      this.activeItemName = "comment";
      this.expandSidebar();
    },
    handleLogout() {
      removeRole();
      removeToken();
      this.resetState();
      this.$router.push("/");
    },
  },
  created() {
    this.startDuration();
    if (window.sessionStorage.getItem("user_img") !== null) {
      this.setAvatarSrc(JSON.parse(window.sessionStorage.getItem("user_img")));
    }
  },
};
</script>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &__list {
    display: none;
    width: 100%;
  }

  &__item {
    text-align: center;
    font-size: 40rem;
    color: rgb(51, 51, 51);
    cursor: pointer;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 90rem;
    border-bottom: 1px solid #e7e7e7;
    box-sizing: border-box;
    padding: 0 20rem;

    .el-icon-back {
      text-align: center;
    }
  }

  .el-tabs {
    margin: 20rem 50rem 0;
    .el-tabs__nav-wrap::after {
      display: none;
    }
  }

  &__user {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__info {
    display: flex;
    align-items: center;
    margin-right: 35rem;
    color: #626262;

    .el-avatar {
      width: 30rem;
      height: 30rem;
    }

    span {
      word-break: break-all;
      text-align: center;
    }
  }

  &__main {
    flex: 1;
    overflow: auto;
    padding: 0 30rem;
    box-sizing: border-box;
  }

  &--collapse {
    height: 100%;

    .el-tabs {
      display: none;
    }

    .sidebar {
      &__main {
        display: none;
      }
      &__back {
        display: none;
      }
      &__nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 40rem 0;
        height: 100%;
        justify-content: unset;
      }

      &__list {
        display: block;
      }

      &__item {
        margin-bottom: 20rem;
      }

      &__user {
        flex-direction: column;
        margin-top: auto;

        .el-button {
          margin-top: 25rem;
        }
      }

      &__info {
        flex-direction: column;
        margin: 0;

        .el-avatar {
          width: 50rem;
          height: 50rem;
        }

        span {
          font-size: 14px;
          color: rgb(98, 98, 98);
        }
      }
    }
  }
}
</style>
