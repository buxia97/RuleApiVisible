<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>UniPush配置</h4>
            <p>UniPush是DCloud 联合个推公司推出的集成型统一推送服务，配置后可实现安卓和IOS原生App的推送服务。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">pushAppId</p>
                <el-input v-model="form.pushAppId"  placeholder="请输入pushAppId"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">pushAppKey</p>
                <el-input v-model="form.pushAppKey"  placeholder="请输入pushAppKey"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">pushMasterSecret</p>
                <el-input v-model="form.pushMasterSecret"  placeholder="请输入pushMasterSecret"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">是否开启消息推送<span>开启后，APP状态栏将支持推送信息</span></p>
                <el-switch v-model="form.isPush"></el-switch>
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
      title: "UniPush配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        pushAppId: '',
        pushAppKey: '',
        pushMasterSecret: '',
        isPush: false,
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
      if(that.form.isPush){
        post.isPush==1;
      }else{
        post.isPush==0;
      }
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
            that.form.pushAppId = res.data.pushAppId;
            that.form.pushAppKey = res.data.pushAppKey;
            that.form.pushMasterSecret = res.data.pushMasterSecret;
            if(res.data.isPush==1){
              that.form.isPush = true
            }else{
              that.form.isPush = false;
            }
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
