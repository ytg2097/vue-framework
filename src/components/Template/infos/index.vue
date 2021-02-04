<template>
  <div class="info">
    <el-row v-for="info in infos" :key="info.title" class="title-row">
      <el-row v-if="info.title">
        <span class="title">{{ info.title }}</span>
      </el-row>
      <el-row v-if="info.haveLine" style="margin: 10px 10px 0 10px;height:1px;background-color:black;" />
      <el-row v-for="(detail,index) in info.details" :key="index" class="detail">
        <el-row style="display: inline-block">
          <span v-if="detail.title" class="sub-title">{{ detail.title }}</span>
          <span v-if="detail.tip" class="tip" />
        </el-row>
        <span class="value">{{ detail.value }}</span>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Infos',
  props: {
    infos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectValue: ''
    }
  },
  watch: {
    value(newValue) {
    }
  }
}
</script>

<style scoped>
  .title{
    font-weight: bold;
    margin-left: 10px;
  }
  .detail{
    display: inline-block;
    width: 25%;
    margin-top: 20px;
  }
  .detail span{
    margin-top: 10px;
    margin-left: 10px;
  }
  .sub-title{
    color: #aaaaaa;
  }
  .value{
    font-size: 15px;
    display: block;
  }
  .title-row{
    margin-top: 20px;
  }
  .tip {
    border-radius: 7px;
    width: 14px;
    height: 14px;
    display: inline-block;
    background-color: red;
    margin-top: 3px;
  }
  .info {
    background-color: #ffffff;
    padding: 20px 10px 20px 10px;
  }
</style>
