<template>
    <div>
        个人中心
        <el-button @click="look">查看合同</el-button>
        <CenterPdf ref='myPdf'/>
    </div>
</template>

<script>
import CenterPdf from './CenterPdf'
    export default {
        components:{
            CenterPdf
        },
        methods:{
            look(){
                this.$refs.myPdf.dialogVisible=true
            }
        }
    }
</script>

<style lang="less" scoped>

</style>