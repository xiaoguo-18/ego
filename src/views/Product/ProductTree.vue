<template>
  <el-tree :props="props" :load="loadNode" lazy @node-click="nodeClick">
  </el-tree>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
    };
  },
  methods: {
    /**
     * 点击node节点
     */
    nodeClick(data) {
      this.$emit("changeTree", data);
    },
    loadNode(node, resolve) {
      //   console.log(node.level, node); //点击tree级别 默认自动执行node.level=0
      if (node.level === 0) {
        //[{title:''},{}]
        this.$api.selectItemCategory().then((res) => {
          //   console.log("--tree--", res);
          if (res.status === 200) {
            return resolve(res.result); //[{name:''}]
          }
        });
      }
      if (node.level >= 1) {
        this.$api
          .selectItemCategory({
            id: node.data.cid,
          })
          .then((res) => {
            // console.log("--tree2--", res);
            if (res.status === 200) {
              return resolve(res.result); //[{name:''}]
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>