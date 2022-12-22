<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>OSS上传配置</h4>
            <p>OSS为阿里云对象存储，和其它上传方式三选一配置即可。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">地域节点Endpoint<span>地域节点域名：如oss-cn-beijing.aliyuncs.com</span></p>
                <el-input v-model="form.aliyunEndpoint"  placeholder="请输入地域节点Endpoint"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">AccessKeyId</p>
                <el-input v-model="form.aliyunAccessKeyId"  placeholder="请输入AccessKeyId"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">AccessKeySecret</p>
                <el-input v-model="form.aliyunAccessKeySecret"  placeholder="请输入地域节点Bucket"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">存储桶名称BucketName</p>
                <el-input v-model="form.aliyunAucketName"  placeholder="请输入存储桶名称BucketName"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">访问地址<span>对象存储外网访问地址</span></p>
                <el-input v-model="form.aliyunUrlPrefix"  placeholder="请输入对象存储外网访问地址"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">文件夹名称</p>
                <el-input v-model="form.aliyunFilePrefix"  placeholder="请输入文件夹名称"></el-input>
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
      title: "OSS上传配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        aliyunEndpoint: '',
        aliyunAccessKeyId: '',
        aliyunAccessKeySecret: '',
        aliyunAucketName: '',
        aliyunUrlPrefix: '',
        aliyunFilePrefix: '',
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
            that.form.aliyunEndpoint = res.data.aliyunEndpoint;
            that.form.aliyunAccessKeyId = res.data.aliyunAccessKeyId;
            that.form.aliyunAccessKeySecret = res.data.aliyunAccessKeySecret;
            that.form.aliyunAucketName = res.data.aliyunAucketName;
            that.form.aliyunUrlPrefix = res.data.aliyunUrlPrefix;
            that.form.aliyunFilePrefix = res.data.aliyunFilePrefix;

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
