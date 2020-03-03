/*
 * @Author: momokara
 * @description: 组件模板入口
 * @Date: 2020-01-04 09:34:08
 * @LastEditTime : 2020-01-09 18:21:44
 */
let { mapDir } = require('momokaralistfiles')
let path = require('path')
let _d = path.join(__dirname,'.')
module.exports = mapDir(_d)