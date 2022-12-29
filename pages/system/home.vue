<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box ">
          <div class="home-title">
            <h3>欢迎使用RuleApi</h3>
            <p>2023全面升级！一款功能全面的综合性社区/内容/知识付费API程序，始终坚持开源免费，为每个有想法的人，提供创建自己应用的最初动力，目前可支持对接Typecho程序网站或独立运行。</p>
            <p>开源不易，如果你觉得好用的话，欢迎通过下方按钮赞助开发者。</p>
          </div>
          <div class="home-operate">
            <el-row>
              <el-button type="primary" icon="el-icon-document" @click="goLinks('https://www.ruletree.club/api/RuleApi.htm#001')">接口文档</el-button>
              <el-button type="success" icon="el-icon-user" @click="goLinks('https://jq.qq.com/?_wv=1027&k=Br1YNqz9')">QQ交流群</el-button>
              <el-button icon="el-icon-view" class="github-bg" @click="goLinks('https://github.com/buxia97/RuleApi')">开源地址</el-button>
              <el-button  class="money-bg" icon="el-icon-thumb" @click="goLinks('https://www.ruletree.club/sponsor.html')">赞助作者</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :lg="12" :md="24">
        <div class="data-box">
          <div class="data-box-title">
            <h4>官方公告和教程
            <a href="https://www.ruletree.club/tag/RuleApi/" target="_blank">查看全部
              <i class="el-icon-arrow-right"></i>
            </a>
            </h4>
          </div>
          <div class="home-news">
            <el-skeleton :rows="6" animated v-if="ruleNews.length==0"/>
            <div class="news-box" v-for="(item,index) in ruleNews" v-if="ruleNews.length>0">
              <a :href="'https://www.ruletree.club/archives/'+item.cid" target="_blank">
                <h5>{{replaceSpecialChar(item.title)}}</h5>
                <p class="news-intro">
                  {{subText(item.text,80)}}
                </p>
                <p class="news-date">{{formatDate(item.created)}}</p>
              </a>

            </div>
          </div>
        </div>
      </el-col>
      <el-col :lg="12" :md="24">
        <div class="data-box">
          <div class="data-box-title">
            <h4>官方及二开应用
            <a href="javascript:;">我要添加？</a>
            </h4>
          </div>
          <div class="home-app">
            <div class="app-box">
              <div class="app-ico">
                <div class="ico-box">
                  Rule<span style="color: #22ac38;">APP</span>
                </div>
              </div>
              <div class="app-text">
                <p><span class="official-tips">官方</span>RuleApp，这是一款开源免费，界面美观的博客/文章/自媒体/新闻资讯/知识付费程序。集VIP会员体系，在线投稿（内置Mardown编辑器），积分商城，付费阅读等模块，基于Typecho开发。</p>
                <el-button size="small"  type="primary" @click="goLinks('https://ext.dcloud.net.cn/plugin?id=6909')">点击前往</el-button>
              </div>
            </div>
            <div class="app-box">
              <div class="app-ico">
                <div class="ico-box">
                  Rule<span style="color: #2299DD;">User</span>
                </div>
              </div>
              <div class="app-text">
                <p><span class="official-tips">官方</span>RuleUser，一款基于Typecho的独立会员中心界面，后端接口采用RuleAPI，集成注册登录，扫码登录，在线投稿，商品发布，消息管理，在线充值和申请提现等。</p>
                <el-button size="small" type="primary" @click="goLinks('https://www.ruletree.club/archives/2979/')">点击前往</el-button>
              </div>
            </div>
            <div class="app-box">
              <div class="app-ico">
                <div class="ico-box">
                 CR应用云控
                </div>
              </div>
              <div class="app-text">
                <p>云控版本为群友二开平台，可以通过第三方平台实时管控APP的各项配置，而无需重新打包。云控版本可以提升各方便便捷性，并在云控平台的支持下增加各种DIY功能。</p>
                <el-button size="small"  type="primary" @click="goLinks('https://godgroup.club/')">点击前往</el-button>
              </div>
            </div>
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
      title: "首页",
    }
  },
  data() {
    return {
      ruleNews:[],
    }
  },
  beforeDestroy(){

  },
  created() {

  },
  mounted(){
    let that = this;
    that.getRuleNews();
  },
  methods: {
    goLinks(link){
      window.open(link);
    },
    getRuleNews(){
      const that = this;
      var post = {
      	"mid":762,
      	"type":"post"
      }
      var data = {
      	"searchParams":JSON.stringify(post),
      	"limit":4,
      	"page":1,
      	"order":"created"
      }
      that.$axios.$post(that.$api.getRuleNews(),this.qs.stringify(data)).then(function (res) {
        that.ruleNews = res.data;
      })
      .catch(function (error) {
        console.log(error)

      })
    },
    formatDate(datetime) {
    	var datetime = new Date(parseInt(datetime * 1000));
    	var year = datetime.getFullYear(),
    		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
    		date = ("0" + datetime.getDate()).slice(-2),
    		hour = ("0" + datetime.getHours()).slice(-2),
    		minute = ("0" + datetime.getMinutes()).slice(-2);
    	var result = year + "-" + month + "-" + date + " " + hour + ":" + minute;
    	return result;
    },
    subText(text,num){
    	if(text.length < null){
    		return text.substring(0,num)+"……"
    	}else{
    		return text;
    	}

    },
    replaceSpecialChar(text) {
      text = text.replace(/&quot;/g, '"');
      text = text.replace(/&amp;/g, '&');
      text = text.replace(/&lt;/g, '<');
      text = text.replace(/&gt;/g, '>');
      text = text.replace(/&nbsp;/g, ' ');
      return text;
    },
  }
}
</script>

<style>
</style>
