<template>
  <div class="device">
    <el-row class="bind">
      <span>{{ bindInfo.title }}</span>
      <el-button
        type="primary"
        :disabled="bindInfo.bind"
        class="bind-button"
        @click="handleBind"
      >
        Bind
      </el-button>
    </el-row>
    <el-row v-show="bindInfo.bind">
      <el-table
        :data="bindInfo.datas"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="sn"
          label="SN"
        />
        <el-table-column
          prop="bindTime"
          label="Bind Date"
        />
        <el-table-column
          prop="Action"
          label="Action"
        >
          <template>
            <el-button size="small" type="primary" :disabled="!bindInfo.bind" @click="unbindDialogVisible=true">Unbind</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row v-show="!bindInfo.bind" class="outer-unbind">
      <div class="unbind">
        <i class="el-icon-warning" />
        <span>No binding data, please click in the upper right corner to bind.</span>
      </div>
    </el-row>
    <!--bind dialog-->
    <device-dialog
      right-button-title="Save"
      title="Change Speed Measuring"
      width="500px"
      :dialog-visible="bindDialogVisible"
      @leftClick="bindDialogVisible = false"
      @rightClick="handleBindSure"
      @dialogClose="bindDialogVisible = false"
    >
      <el-row>
        <el-select
          v-model.lazy="bindInfo.selectValue"
          placeholder="Please Select"
          @change="handleSelectChange"
        >
          <el-option
            v-for="item in select"
            :key="item.id"
            :label="item.sn"
            :value="item.id"
          />
        </el-select>
      </el-row>
    </device-dialog>
    <!--unbind dialog-->
    <device-dialog
      right-button-title="Save"
      title="Change Speed Measuring"
      width="500px"
      :dialog-visible="unbindDialogVisible"
      @leftClick="unbindDialogVisible = false"
      @rightClick="handleUnbindSure"
      @dialogClose="unbindDialogVisible = false"
    >
      <el-row>
        <span>Are you sure to unbind from vehicle?</span>
        <el-row class="unbind-tap">
          <i class="el-icon-warning" style="font-size: 40px;margin-top: 10px" />
          <span style="color: mediumvioletred; margin-bottom: 20px;">Unbind operation is irreversible, please make decision cautiously.</span>
        </el-row>
      </el-row>
    </device-dialog>
  </div>
</template>

<script>
import DeviceDialog from '../dialog/index'
import * as vehicleApi from '../../../api/vehicle'
export default {
  name: 'DeviceBind',
  components: { DeviceDialog },
  props: {
    bindInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      unbindDialogVisible: false,
      bindDialogVisible: false,
      select: []
    }
  },
  methods: {
    /**
     * select 选择值改变
     * @param value
     */
    handleSelectChange(value) {
      this.$emit('selectChange', value, this.bindInfo.type)
    },
    /**
     * 绑定是sure 按钮点击
     */
    handleBindSure() {
      this.$emit('bindSure', this.bindInfo.type, this.bindInfo.selectValue)
      this.bindDialogVisible = false
    },
    /**
     * 解绑sure 按钮点击
     */
    handleUnbindSure() {
      console.log(this.bindInfo)
      this.$emit('unbindSure', this.bindInfo.type, this.bindInfo.datas[0].id)
      this.unbindDialogVisible = false
    },
    /**
     * 点击绑定按钮事件
     */
    handleBind() {
      this.bindDialogVisible = true
      console.log(this.bindInfo)
      const params = {
        customerId: this.bindInfo.ownerId,
        deviceType: this.bindInfo.type
      }
      console.log(params)
      vehicleApi.unbindList(params).then(response => {
        this.select = response.result
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .device{
    margin-top: 20px;
  }
  .outer-unbind{
    margin-top: 10px;
    width: 100%;
    height: 100px;
    background-color: #304156;
    color: #000;
    position: relative;
  }
  .unbind{
    text-align: center;
    position: absolute;
    top: 25%;
    left: 25%;
  }
  .unbind span{
    font-size: 20px;
  }
  .unbind i{
    font-size: 40px;
  }
  .unbind-tap{
    height: 60px;
    margin: 10px 0 10px 0;
    background-color: #e6a23c;
    border: 1px orange solid;
  }
  .bind{
    margin-bottom: 10px;
  }
  .bind-button{
    margin-left: 10px;
  }
</style>
