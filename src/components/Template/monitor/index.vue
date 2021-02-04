<template>
  <div>
    <div>
      <span>{{ monitor.name }}</span>
      <el-button icon="el-icon-caret-bottom" />
      <el-button icon="el-icon-download" />
    </div>
    <div>
      <span>Date Range</span>
      <el-date-picker
        v-if="monitor.dateType=='date'"
        v-model="dateValue"
        type="daterange"
        range-separator="to"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-date-picker
        v-if="monitor.dateType=='dateTime'"
        v-model="dateValue"
        type="datetimerange"
        range-separator="to"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <button type="primary">Search</button>
    </div>
    <div v-if="monitor.type=='lineScale'" />
    <div v-if="monitor.type==lineAll" />
    <div v-if="monitor.type=='table'" />
  </div>
</template>

<script>
export default {
  name: 'Monitor',
  props: {
    monitor: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dateValue: ''
    }
  }
}
</script>

<style scoped>

</style>
