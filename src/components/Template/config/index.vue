<template>
  <!--configs-->
  <div style="background-color: #ffffff" class="pd10">
    <!--status and title-->
    <el-row>
      <div
        v-if="showStatus"
        class="status_css mgl5"
        style="padding-top: 3px"
        :class="[{'green': status}, {'red': !status}]"
      />
      <span style="font-size: 20px" :class="[{'mgl16' : !showStatus}]">{{ title }}</span>
    </el-row>
    <!--buttons-->
    <el-row>
      <el-button
        v-for="item in names"
        :key="item.name"
        type="primary"
        class="button_css"
        @click="item.clickCallback"
      >{{ item.name }}</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ConfigList',
  props: {
    names: {
      type: Array,
      required: true
    },
    showStatus: {
      type: Boolean,
      default: true
    },
    status: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {
    console.log('aaa')
  },
  methods: {}
}
</script>

<style scoped>
.green {
	background-color: green;
}
.red {
	background-color: red;
}
.status_css {
	border-radius: 8px;
	width: 16px;
	height: 16px;
	display: inline-block;
}
.button_css {
	margin-top: 10px;
	margin-left: 10px;
	width: 200px;
}
.mgt10 {
	margin-top: 10px;
}
.mgl5 {
	margin-left: 5px;
}
.pd10 {
	padding: 10px;
}
.mg20 {
	margin: 20px;
}
.mgl16 {
	margin-left: 16px;
}
</style>
