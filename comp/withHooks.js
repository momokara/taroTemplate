/*
 * @Author: momokara
 * @description: 组件模板 带钩子的
 * @Date: 2020-01-03 10:30:23
 * @LastEditTime: 2020-02-28 10:44:31
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

 // 理论上用大写字母开头的 组件表示自定义组件dom以与小写字母开头的原生dom 区分
 class @{fileName}@ extends Component {
   static options = {
     addGlobalClass: true // 组件是否使用全局样式生效
   }

   public state: compState = {
     defaultConfig: {}
   }

   // 生命周期 根据情况选用,不需要的可以删除

   // 组件加载时触发,一个组件只会调用一次,此时组件 DOM 尚未准备好,还不能和视图层进行交互
   componentWillMount() { }

   // 组件初次渲染完成时触发,一个组件只会调用一次,代表组件已经准备妥当,可以和视图层进行交互
   componentDidMount() { }

   // 已经装载的组件接收到新属性前调用
   componentWillReceiveProps(nextProps) { }

   // 组件是否需要更新，返回 false 不继续更新，否则继续走更新流程
   // shouldComponentUpdate(nextProps, nextState) {
   //   return true
   //  }

   // 组件即将更新
   componentWillUpdate(nextProps, nextState) { }

   // 组件更新完毕
   componentDidUpdate(prevProps, prevState) { }

   // 组件卸载时触发
   componentWillUnmount() { }

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

declare interface @{fileName}@ {
  props: compProps;
  state: compState;
}`,
  scss: `.@{fileName}@-comp-contant{
    width: 100%;
  }`
}
