<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>易支付配置</h4>
            <p>易支付接口可支持所有核心程序为彩虹易支付的第三方支付平台。不过，为了财产安全，对于非官方的支付渠道，请谨慎选择。可能不支持部分关闭API支付模式或者魔改的易支付程序。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">易支付接口地址<span>输入易支付平台的接口地址</span></p>
                <el-input v-model="form.epayUrl"  placeholder="请输入易支付接口地址"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">易支付商户ID</p>
                <el-input v-model="form.epayPid"  placeholder="请输入易支付商户ID"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">易支付商户密钥</p>
                <el-input v-model="form.epayKey"  placeholder="请输入易支付商户密钥"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">易支付回调地址<span>根据您的接口域名和访问协议进行填写，如：http://127.0.0.1/pay/EPayNotify</span></p>
                <el-input v-model="form.epayNotifyUrl"  placeholder="请输入易支付回调地址"></el-input>
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
      title: "易支付配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        epayUrl: '',
        epayPid: '',
        epayKey: '',
        epayNotifyUrl: '',
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
      var data = {
        "webkey":that.key,
        "params":JSON.stringify(post)
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
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
            that.form.epayUrl = res.data.epayUrl;
            that.form.epayPid = res.data.epayPid;
            that.form.epayKey = res.data.epayKey;
            that.form.epayNotifyUrl = res.data.epayNotifyUrl;
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
