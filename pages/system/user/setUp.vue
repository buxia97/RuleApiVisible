<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>用户参数设置</h4>
            <p>在这里设置配置用户积分体系，VIP等资产相关功能</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">积分充值比例<span>必须为整数，一元钱等于多少积分</span></p>
                <el-input v-model="form.scale" type="number"  placeholder="请输入积分充值比例"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">签到最高赠送积分<span>必须为整数，为0或小于1则关闭签到功能</span></p>
                <el-input v-model="form.clock" type="number"  placeholder="请输入签到最高赠送积分"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">一天VIP价格<span>必须为整数</span></p>
                <el-input v-model="form.vipPrice" type="number" placeholder="请输入一天VIP价格"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">多少天VIP等于永久<span>必须为整数，当用户购买VIP时间超过指定天数时，将变为永久VIP</span></p>
                <el-input v-model="form.vipDay" type="number" placeholder="请输入多少天VIP等于永久"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">VIP折扣<span>商品价格乘以该折扣，为0.0则免费购买商品，为1.0则为原价购买。注意，商品可单独设置折扣，权重高于此设置。</span></p>
                <el-input v-model="form.vipDiscount" placeholder="请输入VIP折扣"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="save()">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  layout: 'layout',
   head() {
    return {
      title: "用户参数设置",

    }
  },
  data() {
    return {
      key:"",
      form:{
        scale: '',
        clock: '',
        vipPrice: '',
        vipDay: '',
        vipDiscount: '',
      }
    }
  },
  beforeDestroy(){

  },
  created() {

  },
  mounted(){
    let that = this;
    if(localStorage.getItem('webkey')){
      that.key = localStorage.getItem('webkey');
    }else{
      that.$message({
        message: "认证失效！",
        type: 'error'
      })
      that.$router.push({path:'/'});
    }

    that.getConfig();
  },
  methods: {
    save() {
      const that = this;
      var post=that.form;
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      var data = {
        "webkey":that.key,
        "params":JSON.stringify(post)
      }
      that.$axios.$post(that.$api.apiConfigUpdate(),this.qs.stringify(data)).then(function (res) {
        loading.close();
        if(res.code == 1){
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.getConfig();
        }else{
          that.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
      .catch(function (error) {
        loading.close();
        console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
      })
    },
    getConfig(){
        const that = this;
        var data = {
          "webkey":that.key,
        }
        that.$axios.$post(that.$api.getApiConfig(),this.qs.stringify(data)).then(function (res) {
          if(res.code==1){
            that.form.scale = res.data.scale;
            that.form.clock = res.data.clock;
            that.form.vipPrice = res.data.vipPrice;
            that.form.vipDay = res.data.vipDay;
            that.form.vipDiscount = res.data.vipDiscount;
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
        })
    }
  }
}
</script>

<style>
</style>
