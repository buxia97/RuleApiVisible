<template>
  <div class="container">
    <div class="main">
      <div class="rule-logo">
        <h1>Rule<span>Api</span></h1>
      </div>
      <div class="rule-version">
        <p>当前版本：{{versionText}}</p>
        <p class="new-version">最新版本：<a href="javascript:;" @click="update">V1.2.5 beta (2022.11.30)</a></p>
      </div>
      <div class="rule-btn">
        <el-row>
          <el-button type="primary" icon="el-icon-s-tools">管理中心</el-button>
          <el-button type="success" icon="el-icon-question">帮助教程</el-button>
        </el-row>
      </div>
    </div>

    <a href="https://github.com/buxia97/RuleApi" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
  </div>
</template>

<script>
export default {
  layout: 'layout',
  head() {
    return {
     title: "RuleApi - 开启你的自由社区！",
    }
  },
  data() {
    return {
      version:"10",
      versionText:"V1.3.0",

    }
  },
  beforeDestroy(){

  },
  created() {

  },
  mounted(){
    let that = this;
    that.isUpdate();
    that.isInstall();
  },
  methods: {
    isUpdate(){
      const that = this;
      that.$axios.$get(that.$api.apiNewVersion()).then(function (res) {


      })
      .catch(function (error) {
        console.log(error)
          that.$message({
            message: "网络异常！",
            type: 'error'
          })
      })
    },
    update() {
      const that = this;
      that.$confirm('更新后将获得更高的安全性、更多的功能和更好的体验！', '有新的版本推送！', {
        confirmButtonText: '前往升级',
        cancelButtonText: '我再想想',
        type: 'success'
      }).then(() => {
        window.open();
      }).catch(() => {

      });
    },
    isInstall(){
      const that = this;
      that.$axios.$get(that.$api.isInstall()).then(function (res) {
          if(res.code == 1){
            that.$message({
              message: "API载入成功！",
              type: 'success'
            })
          }
          if(res.code == 100){
            that.$alert('Redis连接失败或未安装！请检查您的API配置或Redis安装状态。', 'API警告', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }
          if(res.code == 101){
            that.$alert('Typecho未安装或者数据表前缀不正确，请检查您的API配置。', 'API警告', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }
          if(res.code == 102){
            that.$alert('Mysql数据库连接失败或未安装，请检查您的API配置或Mysql安装状态。', 'API警告', {
              confirmButtonText: '确定',
              type: 'warning'
            });
          }

      })
      .catch(function (error) {
        console.log(error)
          that.$message({
            message: "接口请求异常，请检查数据库连接或设备网络！",
            type: 'error'
          })
      })
    }
  }
}
</script>
<style>
  *{
    padding:0;
    margin:0;
    box-sizing:border-box;
  }
  html{
    box-sizing:border-box;
  }
  body{
    font-size:15px;
    background:#fff;
  }
  .main{
    position: absolute;
    top: 25%;
    text-align: center;
    width: 100%;
  }
  .rule-logo h1{
    font-size: 70px;
  }
  .rule-logo h1 span {
      color: #e61f19;
  }
  .rule-version{
    color: #999;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .new-version{
    margin-top: 8px;
  }
  .new-version a{
    text-decoration: none;
    color: #2299DD;
    margin-left: 5px;
  }
</style>
