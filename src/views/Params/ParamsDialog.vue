<template>
  <el-dialog
    title="商品类目选择规格参数"
    :visible.sync="dialogVisible"
    width="60%"
  >
    <ProductTree @changeTree="changeTree" />
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" :disabled="flag" @click="innerVisible = true"
        >确 定并添加分组</el-button
      >
    </span>

    <!-- 内弹框 -->
    <el-dialog
      width="50%"
      title="商品规格参数配置"
      :visible.sync="innerVisible"
      append-to-body
    >
      <div class="title">当前选择的商品:{{ treeData.name }}</div>
      <el-button @click="addDomain">新增规格列表</el-button>
      <hr />
      <el-form :model="goodsForm" ref="goodsForm" label-width="100px">
        <el-form-item
          v-for="(good, index) in goodsForm.goods"
          :label="good.title + index"
          :key="good.key"
          :prop="good.title"
        >
          <div class="item">
            <el-input v-model="good.title"></el-input>
            <el-button @click.prevent="addItem(index)">添加子组</el-button>
            <el-button @click.prevent="removeDomain(index)">删除组</el-button>
          </div>
          <!--内层--- el- el-form-item -->
          <el-form-item
            v-for="(item, i) in good.children"
            :label="item.title + i"
            :key="item.key"
            :prop="item.title"
          >
            <div class="item">
              <el-input v-model="item.title"></el-input>
              <el-button @click.prevent="removeItem(index, i)">删除</el-button>
            </div>
          </el-form-item>
          <!-- /内层 -- el- el-form-item -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('goodsForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('goodsForm')">重置</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template> 

<script>
import ProductTree from "../Product/ProductTree";
export default {
  components: {
    ProductTree,
  },
  data() {
    return {
      dialogVisible: false,
      innerVisible: false,
      flag: true,
      treeData: {},
      goodsForm: {
        //表单数据
        goods: [
          //   {
          //     value: "",
          //     title: "",
          //     children: [
          //       {
          //         value: "",
          //         title: "",
          //       },
          //       {
          //         value: "",
          //         title: "",
          //       },
          //     ],
          //   },
          //   {
          //     value: "",
          //     title: "",
          //     children: [
          //       {
          //         value: "",
          //         title: "",
          //       },
          //     ],
          //   },
        ],
      },
    };
  },
  methods: {
    changeTree(val) {
      console.log("===", val);
      this.treeData = val;
      this.flag = false;
    },
    submitForm(formName) {
      console.log("提交----", this.goodsForm.goods); //[{title:'',value:'',children:[]},{}]
      // itemCatId, paramsContent, specsName
      this.$api
        .insertItemParam({
          itemCatId: this.treeData.cid,
          content: JSON.stringify(this.goodsForm.goods),
          specsName: this.treeData.name,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            //隐藏弹框
            this.innerVisible = false;
            this.dialogVisible = false;
            //清空数据
            this.goodsForm.goods = []; //清空
            this.$notify({ title: "成功", message: "这是一条成功的提示信息", type: "success" });

            //视图更新
            this.$parent.http(1);
          } else {
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //添加子组--
    addItem(index) {
      this.goodsForm.goods[index].children.push({
        value: "",
        title: "",
      });
    },
    //删除组---
    removeDomain(index) {
      this.goodsForm.goods.splice(index, 1);
    },
    //删除子内容
    removeItem(index, i) {
      console.log(index, i);
      this.goodsForm.goods[index].children.splice(i, 1);
    },
    //新增列表参数
    addDomain() {
      this.goodsForm.goods.push({
        value: "",
        title: "",
        children: [],
      });
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  margin-top: 10px;
  button {
    margin-left: 10px;
  }
}
</style>