const base = {
    baseUrl: 'http://localhost:5000',
    login: '/api/api/login',//登录接口
    register: '/api/api/register',//注册接口
    productList: "/api/api/projectList",//商品信息 page
    search: '/api/api/search',//搜索
    selectItemCategory: '/api/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择  id
    upload: '/api/upload',//上传图片接口
    insertTbItem: '/api/api/backend/item/insertTbItem',//商品添加
    deleteItemById:"/api/api/backend/item/deleteItemById",//删除商品
    batchDelete:'/api/api/batchDelete',//批量删除
    updateTbItem:"/api/api/backend/item/updateTbItem",//修改商品
    selectItemParamAll:'/api/api/backend/itemParam/selectItemParamAll',//规格参数
    insertItemParam:'/api/api/backend/itemParam/insertItemParam',//规格参数配置新增
    categoryList:"/api/api/category/data"//商品关联 规格参数--
}

export default base