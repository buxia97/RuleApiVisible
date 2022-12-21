<template>
  <div class="container">
    <div class="header">
      <div class="logo">
         <nuxt-link to="/">Rule<span>Api</span></nuxt-link>
      </div>
      <div class="header-operate">
        <el-button type="danger" @click="Exit()">退出面板</el-button>
      </div>
    </div>
    <div class="main">
      <div class="menu">
        <el-menu
          default-active="2"
          class="el-menu-vertical"
          @open="handleOpen"
          @close="handleClose">
          <template v-for="(item,index) in menu">
            <el-submenu :index="(index+1).toString()" v-if="item.subList.length>0">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.name}}</span>
              </template>
              <el-menu-item-group>
                <template v-for="(sub,j) in item.subList">
                  <el-menu-item  :index="(index+1).toString()+'-'+j">{{sub.name}}</el-menu-item>
                </template>

              </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="(index+1).toString()" v-else>
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </template>


        </el-menu>
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
          "icon":"el-icon-s-home",
          "link":"/system/home",
          "subList":[],
          "isShow":false,
        },
        {
          "name":"系统管理",
          "icon":"el-icon-s-tools",
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
          "icon":"el-icon-user-solid",
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
          "icon":"el-icon-upload",
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
          "icon":"el-icon-s-management",
          "subList":[
            {
              "name":"基本参数",
              "link":"",
            }
          ],
          "isShow":false,
        },
        {
          "name":"商品模块",
          "link":"",
          "icon":"el-icon-s-shop",
          "subList":[
            {
              "name":"基本参数",
              "link":"",
            }

          ],
          "isShow":false,
        },
        {
          "name":"支付模块",
          "icon":"el-icon-s-finance",
          "subList":[
            {
              "name":"财务管理",
              "link":"",
            },
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
          "icon":"el-icon-s-opportunity",
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
          "icon":"el-icon-s-promotion",
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
    Exit(){
      const that = this;
      localStorage.removeItem("webkey");
      that.$message({
        message: "退出成功！",
        type: 'success'
      })
      that.$router.push({path:'/'});
    },
     handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style>
</style>
