<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    background-color="#304156"
    text-color="#fff"
    active-text-color="#409EFF"
    router
    :collapse='isCollapse'
  >
   <el-menu-item >
     <span>易购后台管理系统</span>
   
    </el-menu-item>
    <el-menu-item index="/product">
      <i class="el-icon-menu"></i>
      <!-- <span slot="title">商品管理</span> -->
      <span slot="title">{{$t('home.product')}}</span>

    </el-menu-item>
     <el-menu-item index="/params">
      <i class="el-icon-document"></i>
      <!-- <span slot="title">规格参数</span> -->
      <span slot="title">{{$t('home.params')}}</span>

    </el-menu-item>
     <el-menu-item index="/advert">
      <i class="el-icon-setting"></i>
      <span slot="title">广告分类</span>
    </el-menu-item>
     <el-menu-item index="/center">
      <i class="el-icon-s-custom"></i>
      <span slot="title">个人中心</span>
    </el-menu-item>
    <el-submenu index="">
    <template slot="title">
        <i class="el-icon-menu"></i>
        <span>我的工作台</span>
    </template>
    <el-menu-item index="2-1">选项1</el-menu-item>
    <el-menu-item index="2-2">选项2</el-menu-item>
    <el-menu-item index="2-3">选项3</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
  </el-menu>
</template>

<script>
export default {   
     props:{
       isCollapse:{
         type:Boolean,
         default:false
       }
     }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo{
    .is-active{
        background: pink !important;
    }
}
</style>