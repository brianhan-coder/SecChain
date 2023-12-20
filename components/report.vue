<template>
  <div class="wdblockchain-report">
    <quill-editor
      class="wdblockchain-report__editor"
      :options="quillOptions"
      v-model="content"
      ref="editor"
    ></quill-editor>
    <el-button @click="save" style="float: right; margin-top: 20px"
      >保存</el-button
    >
  </div>
</template>

<script>
export default {
  name: "wdblockchain-report",
  data() {
    return {
      content: ``,
      quillOptions: {
        placeholder: "在线编写实验报告",
        modules: {
          toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["clean"],
          ],
        },
      },
    };
  },
  methods: {
    save() {
      if (this.content) {
        this.$message.success("恭喜你完成整个项目");
      }
    },
  },
  computed: {
    editor() {
      return this.$refs.editor.quill;
    },
  },
};
</script>

<style lang="scss">
.wdblockchain-report {
  margin: 35px auto 0 auto;
}

.wdblockchain-report__editor {
  background-color: #fff;

  .ql-container {
    background: inherit;
  }
}
</style>
