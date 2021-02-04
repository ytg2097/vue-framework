<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :width="width"
    top="30vh"
    :close-on-click-modal="false"
  >
    <template v-slot:default>
      <slot />
    </template>
    <template v-slot:footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '20%'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/variables.scss";

  .el-dialog__wrapper /deep/{
    .el-dialog__header {
      background-color: $dialogTitleBg;
      padding: 10px;
      .el-dialog__title{
        font-size: $titleSizeLv1;
      }
      .el-dialog__headerbtn{
        top: 12px;
      }
    }
  }

</style>
