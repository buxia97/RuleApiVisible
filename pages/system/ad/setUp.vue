<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>广告基本配置</h4>
            <p>在这里设置付费广告位的价格和数量，为了用户体验考虑，请设置为推荐的数量。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">
              <el-form-item>
                <p slot="label" class="form-label">文章推流广告价格（积分/天）</p>
                <el-input v-model="form.pushAdsPrice"  placeholder="请输入文章推流广告价格"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">文章推流广告位数量<span>随机在文章列表加载刷新时显示，建议数量为10</span></p>
                <el-input v-model="form.pushAdsNum"  placeholder="请输入文章推流广告位数量"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">横幅广告价格（积分/天）</p>
                <el-input v-model="form.bannerAdsPrice"  placeholder="请输入横幅广告价格"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">横幅广告数量<span>在APP不同位置随机展现（代码可自己添加），建议数量为5</span></p>
                <el-input v-model="form.bannerAdsNum"  placeholder="请输入横幅广告数量"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">启动图广告价格（积分/天）</p>
                <el-input v-model="form.startAdsPrice"  placeholder="请输入启动图广告价格"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">启动图广告数量<span>会消耗用户流量进行缓存，建议数量为1</span></p>
                <el-input v-model="form.startAdsNum"  placeholder="请输入启动图广告数量"></el-input>
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
      title: "广告基本配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        pushAdsPrice: '',
        pushAdsNum: '',
        bannerAdsPrice: '',
        bannerAdsNum: '',
        startAdsPrice: '',
        startAdsNum: '',
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
            that.form.pushAdsPrice = res.data.pushAdsPrice;
            that.form.pushAdsNum = res.data.pushAdsNum;
            that.form.bannerAdsPrice = res.data.bannerAdsPrice;
            that.form.bannerAdsNum = res.data.bannerAdsNum;
            that.form.startAdsPrice = res.data.startAdsPrice;
            that.form.startAdsNum = res.data.startAdsNum;
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
