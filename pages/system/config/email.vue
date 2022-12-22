<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>邮箱发信设置</h4>
            <p>设置基于SMTP协议的邮箱发信，修改后需重启接口生效。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">邮件Host<span>请根据所选择发件平台获取</span></p>
                <el-input v-model="form.mailHost"  placeholder="请输入邮件Host"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">发信邮箱</p>
                <el-input v-model="form.mailUsername"  placeholder="请输入发信邮箱"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">发信授权码<span>请根据所选择发件平台获取</span></p>
                <el-input v-model="form.mailPassword"  placeholder="请输入发信授权码"></el-input>
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
      title: "邮箱发信设置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        mailHost: '',
        mailUsername: '',
        mailPassword: '',
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
      that.$axios.$post(that.$api.setupEmail(),this.qs.stringify(data)).then(function (res) {
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
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var data = {
          "webkey":that.key,
        }
        that.$axios.$post(that.$api.allConfig(),this.qs.stringify(data)).then(function (res) {
          loading.close();
          if(res.code==1){
            that.form.mailHost = res.data.mailHost;
            that.form.mailUsername = res.data.mailUsername;
            that.form.mailPassword = res.data.mailPassword;
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
    }
  }
}
</script>

<style>
</style>
