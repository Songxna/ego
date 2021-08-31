import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
// 引入自定义语言环境
import enLocale from './enLocale'
import zhLocale from './zhLocale'
// 引入element语言包
import eleenLocale from 'element-ui/lib/locale/lang/en'
import elezhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n)

// 语法环境
const messages = {
    en: {//英语
        ...enLocale,//导出时包裹对象了
        ...eleenLocale,
    },
    zh: {//汉语
        ...zhLocale,
        ...elezhLocale
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    // 存储语言
    locale: localStorage.getItem('lang') || 'zh',
    messages,//设置地区信息
})

// 配置element支持i18n
Element.i18n((key, value) => i18n.t(key, value))

export default i18n;