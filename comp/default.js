/*
 * @Author: momokara
 * @description: 默认组件模板
 * @Date: 2020-01-03 10:30:23
 * @LastEditTime: 2020-02-28 10:43:18
 */
module.exports = {
	tsx: `/*
  * @Author: @{author}@
  * @description: @{description}@
  * @Date: @{creatDate}@
  * @LastEditTime : 2020-01-04 17:56:47
  */
 import { ComponentClass } from 'react'
 import Taro, { Component } from '@tarojs/taro'
 import { View } from '@tarojs/components'

 import './index.scss'

 interface @{fileName}@ {
   props: compProps;
   state: compState;
 }

 // 理论上用大写字母开头的 组件表示自定义组件dom以与小写字母开头的原生dom 区分
 class @{fileName}@ extends Component {
   static options = {
     addGlobalClass: true // 组件是否使用全局样式生效
   }

   public state: compState = {
     defaultConfig: {}
   }

   /**
    * react 推崇函数式组件,计算应该在高级组件或者页面中完成
    */
   render() {
     // 可以在render 方法中处理
     return (
       <View className='@{fileName}@-comp-contant'>
         组件
         <View className='@{fileName}@-contrl-btn' onClick={(event) => this.props.handlerTapItem({ data: '发信息', event })} >
           事件
         </View>
       </View>
     )
   }
 }

 // 导出类需要定义确定输入接口 和组件状态
 export default @{fileName}@ as ComponentClass<compProps, compState>
 declare type compProps = {
  //  基本配置
  config: {},
  data?: Array<any>,
  // 事件处理
  handlerTapItem(parmas: eventParmas): void,
}

declare type compState = {
  // 默认配置
  defaultConfig: {}
}
`,
	scss: `.@{fileName}@-comp-contant{
    width: 100%;
  }`
};
