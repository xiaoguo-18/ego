<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <!-- 1.表单 -->
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="类目选择" prop="category">
        <el-button type="primary" @click="innerVisible = true"
          >选择类目</el-button
        >
        {{ ruleForm.category }}
      </el-form-item>
      <el-form-item label="商品名称" prop="title">
        <el-input v-model="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品卖点" prop="sellPoint">
        <el-input v-model="ruleForm.sellPoint"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image">
        <el-button type="primary" @click="innerVisibleImage = true"
          >上传图片</el-button
        ><img
          :src="ruleForm.image"
          alt=""
          style="width: 140px; vertical-align: top; margin-left: 20px"
        />
      </el-form-item>

      <el-form-item label="商品描述" prop="desc">
        <ProductWangeditor ref="wangEditor" @wangeditorData="wangeditorData" />
      </el-form-item>
      <template v-if="isShow">
        <el-form-item label="类目参数配置">
          <el-form-item
            v-for="(good, index) in paramsList"
            :label="good.title + index"
            :key="good.key"
            :prop="good.value"
          >
            <div class="item">
              <el-input v-model="good.value"></el-input>
            </div>
            <!--内层--- el- el-form-item -->
            <el-form-item
              v-for="(item, i) in good.children"
              :label="item.title + i"
              :key="item.key"
              :prop="item.value"
            >
              <div class="item">
                <el-input v-model="item.value"></el-input>
              </div>
            </el-form-item>
            <!-- /内层 -- el- el-form-item -->
          </el-form-item>
        </el-form-item>
      </template>
    </el-form>

    <!-- 2.内弹框---类目选择 -->
    <el-dialog
      width="40%"
      title="选择类目"
      :visible.sync="innerVisible"
      append-to-body
    >
      <ProductTree @changeTree="changeTree" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="treeDataShow">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 3. 内弹框 --上传图片 -->
    <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="innerVisibleImage"
      append-to-body
    >
      <ProductUpload @uploadImage="uploadImage" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="innerVisibleImage = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 4. 弹框 --按钮 -->
    <span slot="footer" class="dialog-footer">
      <!-- <el-button @click="closeDialog">取 消</el-button> -->
      <el-button @click="resetForm('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import ProductTree from "./ProductTree";
import ProductUpload from "./ProductUpload";
import ProductWangeditor from "./ProductWangeditor";
export default {
  components: {
    ProductTree,
    ProductUpload,
    ProductWangeditor,
  },
  // props:{
  //     dialogVisible:{
  //         type:Boolean,
  //         default:false
  //     }
  // },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false, //类目弹框
      innerVisibleImage: false, //图片弹框
      isShow: false, //是否显示类目选择配置
      treeData: {},
      paramsList: [], //规格参数配置
      ruleForm: {
        // paramsInfo
        title: "",
        price: "",
        num: "",
        sellPoint: "",
        cid: "", //类目cid
        category: "", //类目
        imagu: "", //图片地址
        desc: "", //编译信息
        id: "",
      },
      rules: {
        title: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
      },
    };
  },
  props: {
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    title: {
      type: String,
      default: "标题",
    },
  },
  //监听数据变化---
  watch: {
    rowData(val) {
      this.$nextTick(() => {
        console.log("监听", val);
        this.ruleForm = val;
        this.ruleForm.desc = val.descs;
        //设置编译器的值
        this.$refs.wangEditor.editor.txt.html(val.descs);
      });

      // 设置值---执行顺序--延迟加载 this.$nextTick(dd=>{})
      // this.$refs.wangEditor.editor.txt.html(val.descs);
    },
  },
  methods: {
    /**
     * 点击tree 获取的数据
     */
    changeTree(val) {
      console.log(val);
      this.treeData = val;
    },
    /**
     * 确定按钮--显示tree
     */
    treeDataShow() {
      this.ruleForm.category = this.treeData.name;
      this.ruleForm.cid = this.treeData.cid;
      //隐藏弹框
      this.innerVisible = false;
      //显示规格参数----
      this.$api
        .categoryList({
          cid: this.treeData.cid,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.isShow = true;
            //规格参数配置 --result
            console.log(res.result[0]);
            this.paramsList = JSON.parse(res.result[0].paramData);

            console.log(this.paramsList);
          } else {
            this.isShow = false;
          }
        });
      // this.isShow=true
    },
    /**
     * 点击上传图片--回显
     */
    uploadImage(val) {
      console.log(val);
      this.ruleForm.image = val;
    },
    /**
     * 获取富文本编译内容
     */
    wangeditorData(val) {
      console.log("wang---", val);
      this.ruleForm.desc = val;
    },
    /**
     * 弹框--确定按钮
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          //请求--商品添加接口
          // title cid  category sellPoint price num desc paramsInfo image
          let {
            title,
            image,
            sellPoint,
            price,
            cid,
            category,
            num,
            desc,
            id,
          } = this.ruleForm;
          if (this.title == "添加商品") {
            this.$api
              .insertTbItem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  // 1.隐藏弹框
                  // this.dialogVisible = false;
                  // 2.提示信息
                  this.$message({
                    message: "恭喜你,添加商品成功",
                    type: "success",
                  });
                  //3.更新列表--
                  this.$parent.http(1);
                  //清空表单 隐藏弹框
                  this.resetForm(formName);
                } else {
                  this.$message.error("错了哦,这是一条错误消息");
                }
              });
          } else {
            console.log("编辑商品");
            this.$api
              .updateTbItem({
                title,
                image,
                sellPoint,
                price,
                cid,
                category,
                num,
                desc,
                id,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  this.$message({
                    message: "恭喜你,修改商品成功",
                    type: "success",
                  });
                  //3.更新列表--
                  this.$parent.http(1);
                  //清空表单 隐藏弹框
                  this.resetForm(formName);
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 清空表单操作
     * 4. 清空表单-- 方法1：直接初始化 this.rulForm={title:''} 方法2： 使用element清空表单
     */
    resetForm(formName) {
      // 1.隐藏弹框

      this.dialogVisible = false;
      this.$refs[formName].resetFields();
      //清空wang编译
      this.$refs.wangEditor.editor.txt.clear();
      // 初始化
      //  this.ruleForm= {
      //   // paramsInfo
      //   title: "",
      //   price: "",
      //   num: "",
      //   sellPoint: "",
      //   cid: "", //类目cid
      //   category: "", //类目
      //   imagu: "", //图片地址
      //   desc: "", //编译信息
      // }
    },
    /**
     * 关闭弹框--关闭按钮
     */
    handleClose(done) {
      this.resetForm("ruleForm");
    },
  },
};
</script>

<style lang="less" scoped>
</style>