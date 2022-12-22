<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>Redis设置</h4>
            <p>Redis用于验证用户登录状态，缓存低更新率数据，修改后需重启接口生效。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">Redis地址</p>
                <el-input v-model="form.redisHost"  placeholder="请输入Redis地址"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">Redis密码</p>
                <el-input v-model="form.redisPassword"  placeholder="请输入Redis密码"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">Redis端口</p>
                <el-input v-model="form.redisPort"  placeholder="请输入Redis端口"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">Redis数据前缀<span>在同时存在多个RuleApi服务时，防止数据紊乱</span></p>
                <el-input v-model="form.redisPrefix"  placeholder="请输入Redis数据前缀"></el-input>
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
      title: "Redis设置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        redisHost: '',
        redisPassword: '',
        redisPort: '',
        redisPrefix: '',
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
      that.$axios.$post(that.$api.setupRedis(),this.qs.stringify(data)).then(function (res) {
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
        that.$axios.$post(that.$api.allConfig(),this.qs.stringify(data)).then(function (res) {
          if(res.code==1){
            that.form.redisHost = res.data.redisHost;
            that.form.redisPassword = res.data.redisPassword;
            that.form.redisPort = res.data.redisPort;
            that.form.redisPrefix = res.data.redisPrefix;
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
