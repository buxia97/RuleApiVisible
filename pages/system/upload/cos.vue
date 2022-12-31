<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>COS上传配置</h4>
            <p>COS为腾讯云对象存储，和其它上传方式三选一配置即可，<a href="https://cloud.tencent.com/document/product/436/7751" target="_blank">官方文档</a></p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">AccessKey</p>
                <el-input v-model="form.cosAccessKey"  placeholder="请输入AccessKey"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">SecretKey</p>
                <el-input v-model="form.cosSecretKey"  placeholder="请输入SecretKey"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">地域节点Bucket<span>地域节点：如ap-guangzhou</span></p>
                <el-input v-model="form.cosBucket"  placeholder="请输入地域节点Bucket"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">存储桶名称BucketName</p>
                <el-input v-model="form.cosBucketName"  placeholder="请输入存储桶名称BucketName"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">访问地址Path<span>对象存储外网访问地址，格式为https://外网域名，末尾不要加斜杆</span></p>
                <el-input v-model="form.cosPath"  placeholder="请输入对象存储外网访问地址"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">文件夹名称<span>直接输入名称，不要加斜杠</span></p>
                <el-input v-model="form.cosPrefix"  placeholder="请输入文件夹名称"></el-input>
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
      title: "COS上传配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        cosAccessKey: '',
        cosSecretKey: '',
        cosBucket: '',
        cosBucketName: '',
        cosPath: '',
        cosPrefix: '',
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
            that.form.cosAccessKey = res.data.cosAccessKey;
            that.form.cosSecretKey = res.data.cosSecretKey;
            that.form.cosBucket = res.data.cosBucket;
            that.form.cosBucketName = res.data.cosBucketName;
            that.form.cosPath = res.data.cosPath;
            that.form.cosPrefix = res.data.cosPrefix;

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
