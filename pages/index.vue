<template>
  <div class="container">
    <div class="index-main">
      <div class="rule-logo">
        <h1>Rule<span>Api</span></h1>
      </div>
      <div class="rule-version">
        <p>当前版本：{{versionText}}</p>
        <p class="new-version">最新版本：<a href="javascript:;" @click="update">{{newVersion}}</a></p>
      </div>
      <div class="rule-btn">
        <el-row>
          <el-button type="danger" icon="el-icon-s-opportunity" @click="Install()">安装及更新</el-button>
          <el-button type="primary" icon="el-icon-s-tools" @click="goSystem = true">管理中心</el-button>
          <el-button type="success" icon="el-icon-question" @click="goHelp()">帮助教程</el-button>
        </el-row>
      </div>
    </div>

    <a href="https://github.com/buxia97/RuleApi" class="github-corner" aria-label="View source on GitHub"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
    <el-dialog
      title="进入管理中心"
      :visible.sync="goSystem"
      :close-on-click-modal="false"
      width="400px">
      <div class="dialog-form">
        <el-input v-model="key" placeholder="请输入管理Key" type="password"></el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="goSystem = false">取 消</el-button>
        <el-button type="primary" @click="loginSystem()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="安装及更新"
      :visible.sync="goInstall"
      :close-on-click-modal="false"
      width="400px">
      <div class="dialog-form" v-if="installStatus==0">
        <p class="dialog-tips">在完成API安装或更新后，请在此处验证，并完成数据库升级！</p>
        <el-input v-model="key" placeholder="请输入管理Key" type="password"></el-input>
      </div>
      <div class="install-loading" v-if="installStatus==1">
        <p>正在执行，请勿关闭窗口或刷新页面！</p>
      </div>
      <div class="install-data" v-if="installStatus==2">
        <div class="install-data-text">
          {{installData}}
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goInstall = false" v-if="installStatus==0">取 消</el-button>
        <el-button type="primary" @click="goInstallStart()" v-if="installStatus==0">确 定</el-button>
        <el-button type="primary" :loading="true" v-if="installStatus==1">执行中</el-button>

        <el-button type="danger" @click="installStatus = 0" v-if="installStatus==2">重 试</el-button>
        <el-button type="primary" @click="goInstall = false" v-if="installStatus==2">完 成</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="Typecho未安装"
      :visible.sync="isTypecho"
      width="400px"
      :close-on-click-modal="false">
      <template v-if="!goInstallTypecho">
        <span>Typecho未安装或者数据表前缀不正确，请检查您的API配置。</span>
      </template>
      <template v-if="goInstallTypecho">
        <div class="dialog-form" v-if="installStatus==0">
          <p class="dialog-tips">此操作将放弃链接typecho数据库，让API独立运行！</p>
          <el-input v-model="key" placeholder="请输入管理Key" type="password"></el-input>
          <el-input v-model="name" placeholder="请输入管理用户账号" type="text"></el-input>
          <el-input v-model="password" placeholder="请输入管理用户密码" type="text"></el-input>
        </div>
        <div class="install-loading" v-if="installStatus==1">
          <p>正在执行，请勿关闭窗口或刷新页面！</p>
        </div>
        <div class="install-data" v-if="installStatus==2">
          <div class="install-data-text">
            {{installData}}
          </div>
        </div>
      </template>
      <span slot="footer" class="dialog-footer">
        <template v-if="!goInstallTypecho">
          <el-button type="danger" @click="goTypecho()">我不想安装Typecho</el-button>
          <el-button type="primary" @click="isTypecho = false">我知道了</el-button>
        </template>
        <template v-if="goInstallTypecho">
          <el-button @click="isTypecho = false" v-if="installStatus==0">取 消</el-button>
          <el-button type="primary" @click="installTypecho()" v-if="installStatus==0">确 定</el-button>
          <el-button type="primary" :loading="true" v-if="installStatus==1">执行中</el-button>

          <el-button type="danger" @click="installStatus = 0" v-if="installStatus==2">重 试</el-button>
          <el-button type="primary" @click="isTypecho = false" v-if="installStatus==2">完 成</el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  layout: "no",
  head() {
    return {
     title: "RuleApi",
     titleTemplate:  '%s - 开启你的自由社区',
    }
  },
  data() {
    return {
      version:10,
      versionText:"V1.3.0",
      key:"",
      goSystem:false,
      newVersion:"",
      newVersionCode:0,

      installStatus:0,
      goInstall:false,
      installData:"",

      isTypecho:false,
      goInstallTypecho:false,
      name:"",
      password:"",
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
      that.$axios.$get(that.$api.apiNewVersion(),{ progress: false }).then(function (res) {
        if(res.code == 1){
          that.newVersion = res.data.ruleapiVersion;
          that.newVersionCode = res.data.ruleapiVersionCode;
        }
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
      if(that.newVersionCode > that.version){
        that.$confirm('更新后将获得更高的安全性、更多的功能和更好的体验！', '有新的版本推送！', {
          confirmButtonText: '前往升级',
          cancelButtonText: '我再想想',
          type: 'success'
        }).then(() => {
          window.open();
        }).catch(() => {

        });
      }else{
        that.$message({
          message: "当前为最新版本！",
          type: 'success'
        })
      }

    },
    goHelp(){
      const that = this;
      that.$message({
        message: "暂未开放！",
        type: 'warning'
      })
    },
    isInstall(){
      const that = this;
      that.$axios.$get(that.$api.isInstall()).then(function (res) {
          if(res.code == 1){

          }
          if(res.code == 100){
            that.$alert('Redis连接失败或未安装！请检查您的API配置或Redis安装状态。', 'API警告', {
              confirmButtonText: '我知道了',
              type: 'warning'
            });
          }
          if(res.code == 101){
            that.isTypecho=true;
          }
          if(res.code == 102){
            that.$alert('Mysql数据库连接失败或未安装，请检查您的API配置或Mysql安装状态。', 'API警告', {
              confirmButtonText: '我知道了',
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
    },
    goTypecho(){
      const that = this;
      that.installData = "";
      that.installStatus = 0;
      that.name = "";
      that.password = "";
      that.goInstallTypecho  = true;
    },
    installTypecho(){
      const that = this;
      var key = that.key;
      if(that.name==""||that.password==""){
        that.$message({
          message: "请输入正确的参数",
          type: 'error'
        })
      }
      var data = {
        "webkey":that.key,
        "name":that.name,
        "password":that.password,
      }
      that.installStatus = 1;
      that.$axios.$post(that.$api.typechoInstall(),this.qs.stringify(data),{progress: false }).then(function (res) {
        that.installStatus = 2;
        that.installData = res.msg;
      })
      .catch(function (error) {
        that.installStatus = 2;
        that.installData = "网络错误，请重试！"
      })
    },
    Install(){
      const that = this;
      that.installStatus = 0;
      that.goInstall = true;
    },
    goInstallStart(){
      const that = this;
      var key = that.key;
      var data = {
        "webkey":that.key
      }
      that.installStatus = 1;
      that.$axios.$post(that.$api.newInstall(),this.qs.stringify(data),{progress: false }).then(function (res) {
        that.installStatus = 2;
        that.installData = res;
      })
      .catch(function (error) {
        that.installStatus = 2;
        that.installData = "网络错误，请重试！"
      })
    },
    loginSystem(){
      const that = this;
      var key = that.key;
      var data = {
        "webkey":that.key
      }
      that.$axios.$post(that.$api.isKey(),this.qs.stringify(data)).then(function (res) {
          if(res.code == 1){
            that.$message({
              message: res.msg,
              type: 'success'
            });
            that.goSystem = false;
            localStorage.setItem('webkey',that.key);
            that.$router.push({path:'/system/home'});
          }else{
            that.$message({
              message: res.msg,
              type: 'error'
            })
          }
      })
      .catch(function (error) {
        console.log(error)
          that.$message({
            message: "接口请求异常，请检查网络！",
            type: 'error'
          })
      })

    },
  }
}
</script>
<style>
body{
  background-color: #fff;
}
</style>
