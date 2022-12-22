<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>系统参数设置</h4>
            <p>在这里设置系统基本信息和功能开关</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">网站名称<span>用于邮件发送等显示名称</span></p>
                <el-input v-model="form.webinfoTitle"  placeholder="请输入网站名称"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">网站地址<span>用于邮件发送等显示地址，为WEB访问地址（非RuleApi）</span></p>
                <el-input v-model="form.webinfoUrl"  placeholder="请输入网站地址"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">本地&ftp图片访问地址<span>本地上传接口或者FTP上传接口的访问地址</span></p>
                <el-input v-model="form.webinfoUploadUrl" placeholder="请输入本地图片访问地址"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">头像源avatar<span>公共头像库的源</span></p>
                <el-input v-model="form.webinfoAvatar" placeholder="请输入公共头像库的源"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">pexelsKey<span>pexel是一个在线图库，可以获取免费无版权风险的高清图片，<a href="https://www.pexels.com/zh-cn/api/" target="_blank">点击此处申请</a></span></p>
                <el-input v-model="form.pexelsKey" placeholder="请输入pexelsKey"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">是否开启邮箱发信<span>0是关闭，1是开启。关闭后，接口将不再支持邮箱发信。</span></p>
                <el-switch v-model="form.isEmail"></el-switch>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">是否开启邀请注册<span class="text-gray">0是关闭，1是开启。开启后，注册将必须填写邀请码。</span></p>
                <el-switch v-model="form.isInvite"></el-switch>
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
      title: "系统参数设置",

    }
  },
  data() {
    return {
      key:"",
      form:{
        webinfoTitle: '',
        webinfoUrl: '',
        webinfoUploadUrl: '',
        webinfoAvatar: '',
        pexelsKey: '',

        isEmail: false,
        isInvite: false,
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
      if(that.form.isEmail){
        post.isEmail==1;
      }else{
        post.isEmail==0;
      }
      if(that.form.isInvite){
        post.isInvite==1;
      }else{
        post.isInvite==0;
      }
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
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var data = {
          "webkey":that.key,
        }
        that.$axios.$post(that.$api.getApiConfig(),this.qs.stringify(data)).then(function (res) {
          loading.close();
          if(res.code==1){
            that.form.webinfoTitle = res.data.webinfoTitle;
            that.form.webinfoUrl = res.data.webinfoUrl;
            that.form.webinfoUploadUrl = res.data.webinfoUploadUrl;
            that.form.webinfoAvatar = res.data.webinfoAvatar;
            that.form.pexelsKey = res.data.pexelsKey;
            if(res.data.isEmail==1){
              that.form.isEmail = true;
            }else{
              that.form.isEmail = false;
            }
            if(res.data.isInvite==1){
              that.form.isInvite = true;
            }else{
              that.form.isInvite = false;
            }
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
