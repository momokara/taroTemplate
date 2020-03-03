/*
 * @Author: momokara
 * @description: 默认页面模板
 * @Date: 2020-01-03 10:30:23
 * @LastEditTime: 2020-02-28 10:45:05
 */
module.exports = {
  tsx: `/*
 * @Author: @{author}@
 * @description: @{description}@
 * @Date: @{creatDate}@
 * @LastEditTime : @{creatDate}@
 */
import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import { connect } from '@tarojs/redux';

// 引入样式
import './index.scss';
// 使用修饰器
import { pullDownFresh, doShare } from '@/~/unit/Decorators';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

declare interface Index {
  props: PageProps;
  state: PageState
}

// 混入redux数据
@connect(({ user }) => ({
  user
}))
@doShare({})
@pullDownFresh()
class Index extends Component {
	public $shareData = {
		title: '@{pageTitle}@'
  };

  // 初始化数据
  public state:PageState = {
    pageState: '你好啊',
    options:{}
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
    config: Config = {
      navigationBarTitleText: '@{pageTitle}@',
      // 是否开启当前页面的下拉刷新
      enablePullDownRefresh: true
    }

  /**
   * @description:  修改state 状态
   * @param {Object<any>} 要修改的state
   * @return {Promise<PageState>} 修改后的页面state
   */
  setPageState = async (data = {}) => {
    return new Promise(resolve => {
      this.setState(data, () => {
        resolve(this.state);
      });
    });
  };

  /**
   * 生命周期 如果页面不需要应该删除不需要的生命周期
   * 参考地址 https://nervjs.github.io/taro/docs/tutorial.html
   */

  /**
   * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 onLaunch
   * 监听程序初始化,初始化完成时触发（全局只触发一次）
   * 在此生命周期中通过 this.$router.params,可以访问到程序初始化参数
   */
  componentWillMount() { }

  /**
   * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 app 的 onLaunch,在 componentWillMount 后执行
   * 监听程序初始化,初始化完成时触发（全局只触发一次）
   * 在此生命周期中也可以通过 this.$router.params,访问到程序初始化参数,与 componentWillMount 中一致
   */
  componentDidMount() { }

  /**
   * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 onShow,在 H5/RN 中同步实现
   * 程序启动,或从后台进入前台显示时触发,微信小程序中也可以使用 Taro.onAppShow 绑定监听
   * 在此生命周期中通过 this.$router.params,可以访问到程序初始化参数,参数与 componentWillMount 中获取的基本一致
   */
  componentDidShow() {
    this.setPageState({
      options:Object.assign(
        {},
        this.state.options,
        this.$router.params
      )
    })
    Taro.$request.ajax({ url: 'home_data.json', cos: true }).then(
      res => {
        console.log('home', res)
      }
    )
  }

  /**
   * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 onHide,在 H5/RN 中同步实现
   * 程序从前台进入后台时触发,微信小程序中也可以使用 Taro.onAppHide 绑定监听
   */
  componentDidHide() { }

  // 页面事件处理函数

  /**
   * 监听用户下拉刷新事件
   * 需要在全局配置的 window 选项中或页面配置中开启 enablePullDownRefresh
   * 可以通过 Taro.startPullDownRefresh 触发下拉刷新,调用后触发下拉刷新动画,效果与用户手动下拉刷新一致。
   * 当处理完数据刷新后,Taro.stopPullDownRefresh 可以停止当前页面的下拉刷新
   */
  onPullDownRefresh() { }

  /**
   * 监听用户滑动页面事件
   * 注意:请只在需要的时候才在 page 中定义此方法,不要定义空方法。以减少不必要的事件派发对渲染层-逻辑层通信的影响。
   * 注意:请避免在 onPageScroll 中过于频繁的执行 this.setState() 等引起逻辑层-渲染层通信的操作。尤其是每次传输大量数据,会影响通信耗时
   * @param {number} scrollTop 页面在垂直方向已滚动的距离（单位px）
   */
  // onPageScroll({ scrollTop }) {
  //   console.log(scrollTop)
  // }

  /**
   * 监听用户上拉触底事件
   * 可以在全局配置的 window 选项中或页面配置中设置触发距离 onReachBottomDistance
   * 在触发距离内滑动期间,本事件只会被触发一次
   */
  onReachBottom() { }

  /**
   * 监听用户点击页面内转发按钮（Button 组件 openType='share'）或右上角菜单“转发”按钮的行为,并自定义转发内容。
   * 注意:只有定义了此事件处理函数,右上角菜单才会显示“转发”按钮
   * @param {string} from 转发事件来源。button:页面内转发按钮;menu:右上角转发菜单
   * @param {Object} target 如果 from 值是 button,则 target 是触发这次转发事件的 button,否则为 undefined
   * @param {string} webViewUrl 页面中包含 组件时,返回当前 的url
   */
  onShareAppMessage({ from, target, webViewUrl }) {
    console.log('onShareAppMessage', { from, target, webViewUrl })
    return {
      title: '',
      path: '',
      imageUrl: ''
    }
  }
  render() {
    let { tokenData:ttd } = this.props.user
    return (
      <View className='@{fileName}@-page-contant'>
        <View>{JSON.stringify(ttd)}</View>
        <Button onClick={() => { Taro.switchTab({ url: '/pages/index/index' }) }}>Button</Button>
      </View>
    )
  }
}

export default Index as ComponentClass<PageProps, PageState>
declare type PageProps = {
  user: {
    tokenData: {
      token: string
    }
  }
}

declare type PageState = {
  pageState: string;
  options?: any;
}
`,
  scss: `.@{fileName}@-page-contant {
  flex-direction: column;
  width: 100%;
  color: #555;
}
`}
