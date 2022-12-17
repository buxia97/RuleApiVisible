<template>
  <div class="page-container">
    <div class="data-box">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="all-data-box">
            <h4>待审核文章</h4>
            <p>300<span>/篇</span></p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="all-data-box">
            <h4>待审核商品</h4>
            <p style="color: #67C23A;">300<span>/个</span></p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="all-data-box">
            <h4>待审核评论</h4>
            <p style="color: #E6A23C;">300<span>/条</span></p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="all-data-box">
            <h4>有效充值</h4>
            <p style="color: #F56C6C;">300<span>/笔</span></p>
          </div>
        </el-col>

      </el-row>
    </div>

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
      version:10,
    }
  },
  beforeDestroy(){

  },
  created() {

  },
  mounted(){
    let that = this;
  },
  methods: {

  }
}
</script>

<style>
</style>
