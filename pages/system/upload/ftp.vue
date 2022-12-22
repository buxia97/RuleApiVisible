<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>FTP上传配置</h4>
            <p>配置远程FTP上传，部分可能不支持，和其它上传方式三选一配置即可。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">FTP地址<span>填写域名或者IP地址，不需要ftp请求头</span></p>
                <el-input v-model="form.ftpHost"  placeholder="请输入FTP地址"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">FTP端口号</p>
                <el-input v-model="form.ftpPort"  placeholder="请输入FTP端口号"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">FTP用户名</p>
                <el-input v-model="form.ftpUsername"  placeholder="请输入FTP用户名"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">FTP密码</p>
                <el-input v-model="form.ftpPassword"  placeholder="请输入FTP密码"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">FTP根目录<span>暂时只支持一级目录，如/www</span>></p>
                <el-input v-model="form.ftpBasePath"  placeholder="请输入FTP根目录"></el-input>
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
      title: "远程FTP上传配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        ftpHost: '',
        ftpPort: '',
        ftpUsername: '',
        ftpPassword: '',
        ftpBasePath: '',
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
            that.form.ftpHost = res.data.ftpHost;
            that.form.ftpPort = res.data.ftpPort;
            that.form.ftpUsername = res.data.ftpUsername;
            that.form.ftpPassword = res.data.ftpPassword;
            that.form.ftpBasePath = res.data.ftpBasePath;

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
