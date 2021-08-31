// 基础路径
const base = {
    host: 'http://localhost:3000',
    login: '/api/login',//登录接口
    projectList: '/api/projectList',//商品列表接口
    register: '/api/register',//注册接口
    search: '/api/search',//搜索接口
    selectCategory: '/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    categoryData: '/api/category/data',//类目数据
    upload: '/upload',//上传图片
    insertTbItem:'/api/backend/item/insertTbItem',//添加商品
    deleteItemById:'/api/backend/item/deleteItemById',//删除商品
    batchDelete:'/api/batchDelete',//批量删除
    updateTbItem:'/api/backend/item/updateTbItem',//修改商品
    itemParam:'/api/backend/itemParam/selectItemParamAll',//规格参数列表
    paramsSearch:'/api/params/search',//参数查询
    insertItemParam:'/api/backend/itemParam/insertItemParam',//添加规格参数
    paramsDelete:'/api/params/delete',//规格删除
    updateCategory:'/api/update/category',//修改规格参数
    advertList:'/api/content/selectContentCategoryByParentId',//广告分类内容
    addAdvertChild:'/api/content/insertContentCategory',//增加子广告分类
    addAdvertContent:'/api/content/selectTbContentAllByCategoryId',//增加广告分类
    deleteAdvertContent:'/api/content/deleteContentCategoryById',//删除广告内容
    updateAdvert:'/api/content/updateContentCategory',//修改广告
    
}

export default base;