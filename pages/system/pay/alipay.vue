<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>支付宝配置</h4>
            <p>支付宝当面付是个人可用的在线支付接口，在这里配置支付宝当面付的基本信息，<a href="https://opendocs.alipay.com/open/01csp3?ref=api" target="_blank">官方文档</a></p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">APP ID</p>
                <el-input v-model="form.alipayAppId"  placeholder="请输入APP ID"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">应用私钥<span>请不要存在换行</span></p>
                <el-input type="textarea" v-model="form.alipayPrivateKey"  placeholder="请输入应用私钥"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">支付宝公钥<span>不等于应用公钥，请不要存在换行</span></p>
                <el-input type="textarea" v-model="form.alipayPublicKey"  placeholder="请输入支付宝公钥"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">回调地址<span>范例：http://127.0.0.1:8081/pay/notify 请将127.0.0.1:8081部分替换为自己的API域名，需要注意区分https和http</span></p>
                <el-input v-model="form.alipayNotifyUrl"  placeholder="请输入回调地址"></el-input>
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
      title: "支付宝配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        alipayAppId: '',
        alipayPrivateKey: '',
        alipayPublicKey: '',
        alipayNotifyUrl: '',
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
            that.form.alipayAppId = res.data.alipayAppId;
            that.form.alipayPrivateKey = res.data.alipayPrivateKey;
            that.form.alipayPublicKey = res.data.alipayPublicKey;
            that.form.alipayNotifyUrl = res.data.alipayNotifyUrl;
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
