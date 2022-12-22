<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>Mysql设置</h4>
            <p>设置Mysql链接和基本信息，修改后需重启接口生效。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">Mysql链接串<span>同时包括了地址，端口和数据库名，请注意修改</span></p>
                <el-input v-model="form.dataUrl"  placeholder="请输入Mysql链接串"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">Mysql用户名</p>
                <el-input v-model="form.dataUsername"  placeholder="请输入Mysql用户名"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">Mysql密码</p>
                <el-input v-model="form.dataPassword"  placeholder="请输入Mysql密码"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">数据表前缀<span>数据表前缀，默认就是typecho</span></p>
                <el-input v-model="form.dataPrefix"  placeholder="请输入数据表前缀"></el-input>
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
      title: "Mysql设置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        dataUrl: '',
        dataUsername: '',
        dataPassword: '',
        dataPrefix: '',
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
      that.$axios.$post(that.$api.setupMysql(),this.qs.stringify(data)).then(function (res) {
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
            that.form.dataUrl = res.data.dataUrl;
            that.form.dataUsername = res.data.dataUsername;
            that.form.dataPassword = res.data.dataPassword;
            that.form.dataPrefix = res.data.dataPrefix;
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
