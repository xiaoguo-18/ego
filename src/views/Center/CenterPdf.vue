<template>
  <el-dialog title="查看合同PDF格式" :visible.sync="dialogVisible" width="70%">
    <!-- <span>这是一段信息</span> -->
    <!-- 1.引入pdf地址 展示第一页-->
    <!-- <pdf src='./js.pdf' :page='2'></pdf> -->
    <!-- 2. -->
    <!-- <p>{{currentPage}}/{{pageCount}}</p>
    <pdf
      src="./js.pdf"
      @num-pages="pageCount = $event"
      @page-loaded="currentPage = $event"
    ></pdf> -->

    <!-- 3.展示所有的pdf 页面 -->
    <!-- <pdf
      v-for="i in numPages"
      :key="i"
      :src="src"
      :page="i"
      style="display: inline-block; width: 25%"
    ></pdf> -->

    <!-- 4. 分页展示 -->
    <!-- 打印按钮 -->
    <el-button type='primary' @click='printPdf'>打印合同</el-button>
    <br>
    <p>{{num}}/{{total}}</p>
    <pdf ref='myPDF' :src="src" :page="num" />
    <!-- 分页器 -->
    <Pagination
      :total="total"
      :pageSize="pageSize"
      @currentPage="currentPage"
    />

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import pdf from "vue-pdf";
import Pagination from "../../components/Pagination";
var loadingTask = pdf.createLoadingTask("./js.pdf");
export default {
  components: {
    pdf,
    Pagination,
  },
  data() {
    return {
      dialogVisible: false,
    //   currentPage: 0,
      pageCount: 0,
      src: loadingTask,
      numPages: undefined,
      pageSize: 1,
      total: 10,
      num: 1,
    };
  },
  methods: {
    currentPage(val) {
      //val页码 点击的分页
      this.num = val;
    },
    printPdf(){
        this.$refs.myPDF.print()
    }
  },
  mounted() {
    this.src.promise.then((pdf) => {
      this.numPages = pdf.numPages;
      this.total = pdf.numPages;
    });
  },
};
</script>

<style lang="less" scoped>
</style>