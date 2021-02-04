<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      :width="width"
    >
      <el-dialog
        width="30%"
        :title="title"
        :visible.sync="innerVisible"
        append-to-body
      >
        <el-row>
          <el-row style="height: 30px;position:relative;">
            <i class="el-icon-circle-check icon-success" />
            <span class="tip">{{ innerTip }}</span>
          </el-row>
          <el-row class="innerBottom">
            <el-link type="primary" :href="href">{{ innerLinkTitle }}</el-link>
            <el-button type="primary" class="innerButton" @click="handleInner">{{ innerButtonTitle }}</el-button>
          </el-row>
        </el-row>
      </el-dialog>
      <el-row>
        <slot />
        <div class="buttons">
          <el-button type="primary" plain @click="handleLeft">Cancel</el-button>
          <el-button type="primary" @click="handleRight">{{ rightButtonTitle }}</el-button>
        </div>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'NestedDialog',
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      default: ''
    },
    rightButtonTitle: {
      type: String,
      default: 'Save'
    },
    dialogVisible: {
      type: Boolean
    },
    width: {
      type: String,
      default: '350px'
    },
    isSuccess: {
      type: Boolean
    },
    innerTip: {
      type: String,
      default: 'Successful mission issued'
    },
    innerLinkTitle: {
      type: String,
      default: 'View in the task'
    },
    innerButtonTitle: {
      type: String,
      default: 'Confirm'
    },
    href: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      innerVisible: false
    }
  },
  methods: {
    /**
     * 点击左侧按钮事件
     */
    handleLeft() {
      this.$emit('leftClick')
    },
    /**
     * 点击右侧按钮事件
     */
    handleRight() {
      this.$emit('rightClick')
    },
    /**
     * dialog 关闭事件
     */
    handleClose() {
      this.$emit('dialogClose')
    },
    /**
     *inner 按钮点击事件
     */
    handleInner() {
      this.$emit('innerClick')
      this.innerVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
  .buttons{
    float: right;
  }
  .innerBottom{
    float: right;
  }
  .innerButton{
    margin-left: 10px;
  }
  .icon-success{
    color: lawngreen;
    font-size: 30px;
  }
  .tip{
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    margin-left: 10px;
  }
</style>
