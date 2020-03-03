/*
 * @Author: momokara
 * @description: 页面模板入口
 * @Date: 2020-01-04 09:34:08
 * @LastEditTime : 2020-01-09 18:21:19
 */
let { mapDir } = require('momokaralistfiles')
let path = require('path')
let _d = path.join(__dirname,'.')
module.exports = mapDir(_d)