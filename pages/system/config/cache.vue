<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>缓存配置</h4>
            <p>配置API各模块数据的Redis缓存时间。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">用户登录状态持续时间（s）</p>
                <el-input v-model="form.usertime"  placeholder="请输入用户登录状态持续时间"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">内容列表缓存时间（s）</p>
                <el-input v-model="form.contentCache"  placeholder="请输入内容列表缓存时间"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">内容详情缓存时间（s）</p>
                <el-input v-model="form.contentInfoCache"  placeholder="请输入内容详情缓存时间"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">评论列表缓存时间（s）</p>
                <el-input v-model="form.CommentCache"  placeholder="请输入评论列表缓存时间"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">用户列表缓存时间（s）</p>
                <el-input v-model="form.userCache"  placeholder="请输入用户列表缓存时间"></el-input>
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
      title: "缓存配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        usertime: '',
        contentCache: '',
        contentInfoCache: '',
        CommentCache: '',
        userCache: '',
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
        var data = {
          "webkey":that.key,
        }
        that.$axios.$post(that.$api.allConfig(),this.qs.stringify(data)).then(function (res) {
          if(res.code==1){
            that.form.usertime = res.data.usertime;
            that.form.contentCache = res.data.contentCache;
            that.form.contentInfoCache = res.data.contentInfoCache;
            that.form.CommentCache = res.data.CommentCache;
            that.form.userCache = res.data.userCache;
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
