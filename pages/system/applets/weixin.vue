<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>微信配置</h4>
            <p>在这里配置微信登录和小程序相关信息。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">微信应用ID<span>可不填，负责微信APP登录</span></p>
                <el-input v-model="form.wxAppId"  placeholder="请输入wxAppId"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">微信应用Secret<span>可不填，负责微信APP登录</span></p>
                <el-input v-model="form.wxAppSecret"  placeholder="请输入wxAppSecret"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">微信小程序APPID<span>可不填，负责微信小程序登录</span></p>
                <el-input v-model="form.appletsAppid"  placeholder="请输入appletsAppid"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">微信小程序Secret<span>可不填，负责微信小程序登录</span></p>
                <el-input v-model="form.appletsSecret"  placeholder="请输入appletsSecret"></el-input>
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
      title: "微信配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        wxAppId: '',
        wxAppSecret: '',
        appletsAppid: '',
        appletsSecret: '',
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
            that.form.wxAppId = res.data.wxAppId;
            that.form.wxAppSecret = res.data.wxAppSecret;
            that.form.appletsAppid = res.data.appletsAppid;
            that.form.appletsSecret = res.data.appletsSecret;
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
