<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        Rule<span>Api</span>
      </div>
      <div class="header-operate">
        <el-button type="danger" icon="el-icon-question">退出面板</el-button>
      </div>
    </div>
    <div class="main">
      <div class="menu">
        <div class="menu-box">
          <div class="menu-text">
            <nuxt-link to="/system/home"><i class="el-icon-s-home"></i>首页</nuxt-link>
          </div>
        </div>
        <div class="menu-box">
          <div class="menu-text">
            <nuxt-link to="/system/home"><i class="el-icon-s-home"></i>系统管理</nuxt-link>
          </div>
          <div class="menu-sub">
            <div class="menu-sub-box">
              <nuxt-link to="/system/home">基本设置</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="page-main">
        <Nuxt />
        <div class="footer">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu:[
        {
          "name":"首页",
          "icon":"",
          "link":"",
          "subList":[],
          "isShow":false,
        },
        {
          "name":"系统管理",
          "icon":"",
          "link":"",
          "isShow":false,
          "subList":[
            {
              "name":"基本设置",
              "link":"",
            },
            {
              "name":"Mysql设置",
              "link":"",
            },
            {
              "name":"邮箱发信设置",
              "link":"",
            },
            {
              "name":"Redis设置",
              "link":"",
            },
          ]
        },
        {
          "name":"用户模块",
          "icon":"",
          "link":"",
          "isShow":false,
          "subList":[
            {
              "name":"基本参数",
              "link":"",
            },
            {
              "name":"VIP设置",
              "link":"",
            },
          ]
        },
        {
          "name":"存储模块",
          "link":"",
          "icon":"",
          "subList":[
            {
              "name":"基本参数",
              "link":"",
            },
            {
              "name":"COS设置",
              "link":"",
            },
            {
              "name":"OSS设置",
              "link":"",
            },
            {
              "name":"远程FTP设置",
              "link":"",
            },

          ],
          "isShow":false,
        },
        {
          "name":"文章模块",
          "link":"",
          "icon":"",
          "subList":[
            {
              "name":"基本参数",
              "link":"",
            },

          ],
          "isShow":false,
        },
        {
          "name":"商品模块",
          "link":"",
          "icon":"",
          "subList":[
            {
              "name":"基本参数",
              "link":"",
            },

          ],
          "isShow":false,
        },
        {
          "name":"支付模块",
          "icon":"",
          "subList":[
            {
              "name":"支付宝配置",
              "link":"",
            },
            {
              "name":"微信支付配置",
              "link":"",
            },
            {
              "name":"易支付配置",
              "link":"",
            },
            {
              "name":"卡密配置",
              "link":"",
            }
          ],
          "isShow":false,
        },
        {
          "name":"小程序模块",
          "link":"",
          "icon":"",
          "subList":[
            {
              "name":"微信登录",
              "link":"",
            },
            {
              "name":"QQ登录",
              "link":"",
            },
          ],
          "isShow":false,
        },
        {
          "name":"通知模块",
          "link":"",
          "icon":"",
          "subList":[
            {
              "name":"基本参数",
              "link":"",
            },
            {
              "name":"UniPush配置",
              "link":"",
            },
          ],
          "isShow":false,
        },
      ],
      key:"",
    }
  },
  beforeDestroy(){

  },
  created() {

  },
  mounted(){
    const that = this;
    if(localStorage.getItem("webkey")){
      that.key = localStorage.getItem("webkey");
    }else{
      that.$message({
        message: "请先完成Key认证！",
        type: 'error'
      })
      that.$router.push({path:'/'});
    }
  },
  methods: {

  }
}
</script>

<style>
</style>
