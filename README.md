
## 安装依赖
1. vue-router -vuex
2. vue add element
3. npm i axios --save
4. npm i jwt-decode --save
5. 



## 初始化项目配置
1. 删除无用的组件
2. 初始化css


## 布局试图 layout

## 路由守卫

## 登录界面
1. element-ui 选项卡 tab组件
2. form组件
3. 登录一个界面 注册一般都是一个单独的组件（在一起 ）

## 后台
1. ego.sql 导入你的数据库里面
2. 创建一个后台的文件服务  server 依赖安装在项目下
3. 后台依赖
    1. npm i express mysql --save
    2. npm i jsonwebtoken --save
    

## 前后台接口访问（联调）
1. 配置网络请求信息



## Element自定义主题
1. 在线主题修改  下载 导入
2. 在项目中盖面 SCSS 变量
    1. element-variables.scss   (位置： src里面)
    2. 参考官网
    

## 商品管理 -点击添加商品弹框
1. 组件Dialog组件使用  创建ProductDialog组件
2. 控制子组件显示 --
    1. props 传递参数 控制弹框组件显示 (注意：单向传递 子组件不能直接修改)
    2. ref 操作子组件实例



## 上传图片 --后台配置
1. 后台安装 multer 模块   同时引入fs模块
2. router.js入口文件导入模块
       const fs=require('fs')
        const multer=require('multer')
3. 上传图片 不能跨域  需要配置cors  index.js导入文件 并配置cors跨域

4. 静态资源托管-- （前台访问后台的文件--上传的图片-回显）


## 富文本编译器
1. wangEditor
2. 百度编译器（后面）


## wangEditor
wangEditor ——轻量级 web 富文本编译器，配置方便，使用简单。
1. npm 安装 npm i wangeditor --save
2. 创建容器： 编译器 <div id="main"></div>
3. 引入 import E from 'wangeditor'
4. 创建实例 使用编译器
    const editor =new E('#div1')
    //或者 const editor =new E (document.getElementById('div1'))
    editor.create()

5. 获取输入的编译信息
    配置 onchange 回调函数
    配置 onchange 函数之后，用户操作（鼠标点击、键盘打字等）导致的内容变化之后，
    会自动触发 onchange 函数执行。


## i18n 国际化
官网：https://kazupon.github.io/vue-i18n/

## 安装i18n
1. npm install vue-i18n
2. 引入 
    import Vue from 'vue'
    import VueI18n from 'vue-i18n'
    Vue.use(VueI18n)
3. 准备翻译的语言环境
const messages = {
  en: {
    message: {
      hello: 'hello world'
    }
  },
  zh: {
    message: {
      hello: '你好、世界'
    }
  }
}
4.  通过选项创建 VueI18n 实例
const i18n = new VueI18n({
  locale: 'zh', // 设置地区
  messages, // 设置地区信息
})
5. 通过 `i18n` 选项创建 Vue 实例
new Vue({ i18n }).$mount('#app')
6. 使用 组件试图
<p>{{ $t("message.hello") }}</p>


## element 国际化
1. 国际化 位置组件
2. 兼容i18n "vue-i18n": "^8.24.4", (兼容i18n 6x)
步骤
    1. import Element from 'element-ui'
    2. import enLocale from 'element-ui/lib/locale/lang/en'
       import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
    3.引入语言环境
         ...enLocale
    4. Vue.use(Element, {
       i18n: (key, value) => i18n.t(key, value)
       })   

## git
仓库 代码共享仓库

1. 克隆项目 git clone 网址( https://gitHub.xxx)
2. 常见指令
    1. git add 文件名
    2. git commit -m '注释'
    3. git pull
    4. git push
    5. 先更新 再上传

## vue-PDF 
参考： gitHub ：https://github.com/FranckFreiburger/vue-pdf
步骤：
1. npm install --save vue-pdf
2. import pdf from 'vue-pdf'
3. export default {
  components: {
    pdf
  }
}
4. <pdf src="./static/relativity.pdf"></pdf>


问题：
    pdf打印的时候 视图是乱码的中文
 vue-pdf解决乱码的网址 ： https://github.com/FranckFreiburger/vue-pdf/pull/130/commits/253f6186ff0676abf9277786087dda8d95dd8ea7




## 前后台联调接口
1. 后台语言：java php node.js
2. 联调：
  1. 同时开发：
      1.  静态页面  
      2.  本地模拟接口(定义 接口字段  arr=[{title:'',img:'',id:''}])
  2. 先有接口再开发
      1. 测试接口： 根据后台给的接口地址 测试接口(注意：接口参数格式)
      2. 请求后 看下数据 返回数据 (对接的后台)


## 研发管理平台
1. bug统计
    1. 问题 -未解决问题 --查看bug--回到vscode修改 --修改完毕--打开平台--工作流--
    修改bug状态(修改完成--测试人员收到信息--测试bug--测试完毕(继续提bug))

2. 项目进度
    1. 


## 公司流程
1. 办入职
2. 申请企业邮箱 (账号和用户名)
3. 发送邮箱 --申请账号权限 --回复邮箱：1. 权限账号  2. gitHub地址
4. 安装依赖 启项目(配电脑--配环境 node  postman) 
5. 熟悉项目(2-3天  1-2周 咨询同事)
6. 老项目迭代更新(熟悉项目--开发新功能) (新项目搭建) 
7. git仓库管理代码 (sourceTree工具)
8. 晨会 (任务) 周会--总结本周 技术分享
9. 测试(1.测试人员 2.无测试人员)
10. 开发：本地研发环境  发布线上环境 (本地研发环境---测试环境---线上环境)
11. 联调接口 (测试接口 参数传递 格式)
12. 发布 (加班:等待发布 测试是否有问题)
13. 任务分配 (注意：前两个月  好好表现)


