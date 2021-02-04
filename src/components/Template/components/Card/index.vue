<template>
  <div class="info">
    <el-row v-for="item in items" :key="item.title" class="title-row">
      <el-row v-if="item.title">
        <span class="title">{{ item.title }}</span>
      </el-row>
      <el-row v-if="item.haveLine" style="margin: 10px 10px 0 10px;height:1px;background-color:black;" />
      <el-row style="margin-left: 10px; margin-right: 10px">
        <el-form ref="item" :model="item" label-position="top" :inline="true">
          <el-row v-for="(detail,index) in item.details" :key="index" class="detail">
            <el-form-item :label="detail.title">
              <el-input
                v-if="detail.type=='input' && detail.func"
                v-model="detail.value"
                :placeholder="detail.placeholder"
                :disabled="detail.readonly"
                :class="[{'width-unit': detail.unit}, {'width-not-unit': !detail.unit}]"
                @focus="detail.func"
              />
              <el-input
                v-else-if="detail.type=='input' && !detail.func"
                v-model="detail.value"
                :placeholder="detail.placeholder"
                :disabled="detail.readonly"
                :class="[{'width-unit': detail.unit}, {'width-not-unit': !detail.unit}]"
              />
              <span v-if="detail.unit" style="margin-left: 5px" class="sub-title">{{ detail.unit }}</span>
              <el-select v-else-if="detail.type == 'select' && detail.func" v-model="detail.value" @change="detail.func">
                <el-option v-for="option in detail.options" :key="option.value" :label="option.label" :value="option.value" />
              </el-select>
              <el-select v-else-if="detail.type == 'select' && !detail.func" v-model="detail.value">
                <el-option v-for="option in detail.options" :key="option.value" :label="option.label" :value="option.value" />
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'XCard',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    const checkNumber = (rule, value, callback) => {
      if (Number(value)) {
        return callback()
      }
      else {
        return callback(new Error('please input number'))
      }
    }
    return {
      settingRules: {
        ssid: [
          { required: true, message: 'SSID Format is required', trigger: 'blur' },
          { min: 0, max: 120, message: 'You can enter up to 120 characters.', trigger: ['blur', 'change'] }
        ],
        authTime: [
          { required: true, message: 'Authentication Time is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        accessCodePrice: [
          { required: true, message: 'Access Code Price is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        accessCodePriceDuration: [
          { required: true, message: 'Access Code Price Duration is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        defaultDownSpeed: [
          { required: true, message: 'Default Down Speed is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        rateLimitTraffic: [
          { required: true, message: 'Rate Limit Traffic is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        limitDownSpeed: [
          { required: true, message: 'Limit Down Speed is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        rateLimitTime: [
          { required: true, message: 'Rate Limit Time is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        totalDownSpeed: [
          { required: true, message: 'Total Down Speed is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        floatingPercentage: [
          { required: true, message: 'Floating Percentage is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ],
        lowestDownSpeed: [
          { required: true, message: 'Lowest Down Speed is required', trigger: 'blur' },
          { validator: checkNumber, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    validateForm() {
      let flag = null
      this.$refs['item'].validate(valid => {
        console.log(valid)
        if (valid) {
          flag = true
        }
        else {
          flag = false
        }
      })
      return flag
    }
  }
}
</script>
<style lang="scss" scoped>
  .title{
    font-weight: bold;
    margin-left: 10px;
  }
  .detail{
    display: inline-block;
    width: 25%;
    margin-top: 10px;
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
  .select{
    display: block;
    margin: 10px 15px 0 15px;
  }
  .input{
    margin-left: 15px;
    /*display: inline-block;*/
    margin-top: 10px;
  }
  .width-unit{
    width: 50%;
  }
  .width-not-unit{
    width: 100%;
  }
  .info {
    background-color: #ffffff;
    padding: 20px 10px 20px 10px;
  }
</style>
