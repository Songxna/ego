import base from './config'
import axios, { get, post } from "../utils/request";

/**
 * 请求方法
 */
const api = {
    // 登录接口
    getLogin(params) {
        // return axios.post(base.login,params)
        return post(base.login, params)
    },

    // 商品列表接口
    getProductList(params) {
        return get(base.projectList, params)
    },

    // 注册接口
    gatRegister(params) {
        return post(base.register, params)
    },

    //搜索接口
    getSearch(params) {
        return axios.get(base.search, {
            params
        })
    },

    // 类目接口
    getSelectCategory(params) {
        return get(base.selectCategory, params)
    },

    // 类目数据
    getCategoryData(params) {
        return get(base.categoryData, params)
    },

    // 添加商品
    getAddProduct(params) {
        return get(base.insertTbItem, params)
    },
    // 删除商品
    getDeleteProduct(params) {
        return get(base.deleteItemById, params)
    },
    // 批量删除
    getBatchDelete(params) {
        return get(base.batchDelete, params)
    },

    // 修改商品
    getUpdateTbItem(params) {
        return get(base.updateTbItem, params)
    },

    // 商品参数列表
    getItemParam(params) {
        return get(base.itemParam, params)
    },

    // 添加规格参数
    getInsertItemParam(params) {
        return get(base.insertItemParam, params)
    },

    // 规格删除
    getParamsDelete(params) {
        return get(base.paramsDelete, params)
    },
    // 修改规格参数
    getUpdateCategory(params) {
        return get(base.updateCategory, params)
    },
    // 参数查询
    getParamsSearch(params) {
        return get(base.paramsSearch, params)
    },

    // 广告分类内容
    getAdvertList(params) {
        return get(base.advertList, params)
    },
    // 增加子广告分类
    addAdvertChild(params) {
        return get(base.addAdvertChild, params)
    },
    // 增加广告内容
    addAdvertContent(params) {
        return get(base.addAdvertContent, params)
    },
    // 删除广告内容
    deleteAdvertContent(params) {
        return get(base.deleteAdvertContent, params)
    },
    //修改广告 
    updateAdvert(params) {
        return get(base.updateAdvert, params)
    }
}

export default api;