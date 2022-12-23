<template>
  <div class="page-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="data-box">
          <div class="page-title">
            <h4>内容模块配置</h4>
            <p>配置内容模块相关参数和功能开关。</p>
          </div>
          <div class="page-form">
            <el-form ref="form" :model="form" label-position="top" label-width="80px">

              <el-form-item>
                <p slot="label" class="form-label">评论审核等级<span>管理人员发布无需审核</span></p>
                <el-select v-model="form.auditlevel" placeholder="请选择评论审核等级">
                  <el-option label="直接发布" value="0"></el-option>
                  <el-option label="第一次评论审核" value="1"></el-option>
                  <el-option label="违禁词匹配审核" value="2"></el-option>
                  <el-option label="违禁词匹配拦截" value="3"></el-option>
                  <el-option label="默认全部审核" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">内容审核等级<span>管理人员发布无需审核</span></p>
                <el-select v-model="form.contentAuditlevel" placeholder="请选择内容审核等级">
                  <el-option label="直接发布" value="0"></el-option>
                  <el-option label="违禁词匹配审核" value="1"></el-option>
                  <el-option label="默认全部审核" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">违禁词<span>违禁词将用于评论审核，个性签名拦截。根据英文逗号”,“进行分割，不要存在换行或者空格。</span></p>
                <el-input type="textarea" v-model="form.forbidden" placeholder="请输入违禁词"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">文章自定义字段<span>输入字段的名称，根据英文逗号”,“进行分割。配置后，可通过自定义字段接口为文章设置自定义字段。</span></p>
                <el-input v-model="form.fields"  placeholder="请输入文章自定义字段"></el-input>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">敏感代码禁用模式<span>开启后，则发布文章，商品，评论，都将禁用js或者嵌套代码</span></p>
                <el-switch v-model="form.disableCode"></el-switch>
              </el-form-item>
              <el-form-item>
                <p slot="label" class="form-label">用户删除权限<span>允许用户删除自己的内容（评论，文章）</span></p>
                <el-switch v-model="form.allowDelete"></el-switch>
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
      title: "内容模块配置",
    }
  },
  data() {
    return {
      key:"",
      form:{
        auditlevel: '',
        contentAuditlevel: '',
        forbidden: '',
        fields: '',
        disableCode: false,
        allowDelete: false,
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
      if(that.form.disableCode){
        post.disableCode==1;
      }else{
        post.disableCode==0;
      }
      if(that.form.allowDelete){
        post.allowDelete==1;
      }else{
        post.allowDelete==0;
      }
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
            if(res.data.auditlevel){
              that.form.auditlevel = res.data.auditlevel+"";
            }
            
            if(res.data.contentAuditlevel){
              that.form.contentAuditlevel = res.data.contentAuditlevel+"";
            }
            
            that.form.forbidden = res.data.forbidden;
            that.form.fields = res.data.fields;
            if(res.data.disableCode==1){
              that.form.disableCode = true;
            }else{
              that.form.disableCode = false;
            }
            if(res.data.allowDelete==1){
              that.form.allowDelete = true;
            }else{
              that.form.allowDelete = false;
            }
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
