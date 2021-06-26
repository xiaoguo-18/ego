import { get, post } from '../utils/request';
import base from './base';

const api = {
    /**
     * 登录  username  password
     */
    getLogin(params) {
        return post(base.login, params)
    },
    /**
     * 注册接口
     */
    register(params) {
        return post(base.register, params)
    },
    /** 
     * 商品列表
     */
    productList(params) {
        return get(base.productList, params)
    },
    /**
     * 商品搜索  search
     */
    search(params) {
        return get(base.search, params)
    },
    /**
     * 类目选择 id (传递：cid)
     */
    selectItemCategory(params){
        return get(base.selectItemCategory,params)
    },
    /**
     * 商品添加
     *  title cid  category sellPoint price num desc paramsInfo image
     */
    insertTbItem(params){
        return get(base.insertTbItem,params)
    },
    /**
     * 删除商品
     */
    deleteItemById(params){
        return get(base.deleteItemById,params)
    },
    /**
     * 批量删除 idArr=[]
     */
    batchDelete(params){
        return get(base.batchDelete,params)
    },
    /**
     * 修改商品
     * title, sellPoint, price, cid, category, num, desc, paramsInfo, image, id
     */
    updateTbItem(params){
        return get(base.updateTbItem,params)
    },
    /**
     * 规格参数 page=
     */
    selectItemParamAll(params){
        return get(base.selectItemParamAll,params)
    },
    /**
     * 规格参数 添加 itemCatId, content, specsName
     */
    insertItemParam(params){
        return get(base.insertItemParam,params)
    },
    /**
     * 商品关联规格参数
     */
    categoryList(params){
        return get(base.categoryList,params)
    },
}

export default api