<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>微信支付配置</h4>
            <p>微信支付是微信官方提供的支付接口，目前采用Native模式生成二维码并唤醒微信，<a href="https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_7_2.shtml" target="_blank">官方文档</a></p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">公众号APP Id</p>
                <el-input v-model="form.wxpayAppId"  placeholder="请输入APP ID"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">商户号</p>
                <el-input v-model="form.wxpayMchId"  placeholder="请输入商户号"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">商户证书序列号</p>
                <el-input v-model="form.mchSerialNo"  placeholder="请输入商户证书序列号"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">支付密钥</p>
                <el-input v-model="form.wxpayKey" type="textarea"  placeholder="请输入支付密钥，证书的***key.pem文件内容"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">API3私钥</p>
                <el-input v-model="form.mchApiV3Key" type="textarea"  placeholder="请输入API3私钥"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">回调地址<span>范例：http://127.0.0.1:8081/pay/wxPayNotify 请将127.0.0.1:8081部分替换为自己的API域名，需要注意区分https和http</span></p>
                <el-input v-model="form.wxpayNotifyUrl"  placeholder="请输入回调地址"></el-input>
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
      title: "微信支付配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        wxpayAppId: '',
        wxpayMchId: '',
        mchSerialNo: '',
        wxpayKey: '',
        mchApiV3Key: '',
        wxpayNotifyUrl: '',
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
            that.form.wxpayAppId = res.data.wxpayAppId;
            that.form.wxpayMchId = res.data.wxpayMchId;
            that.form.mchSerialNo = res.data.mchSerialNo;
            that.form.wxpayKey = res.data.wxpayKey;
            that.form.mchApiV3Key = res.data.mchApiV3Key;
            that.form.wxpayNotifyUrl = res.data.wxpayNotifyUrl;
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
