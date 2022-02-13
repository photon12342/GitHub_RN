import { StackActions } from '@react-navigation/native'
/**
 * 全局导航跳转工具类
 */
export default class NavigationUtil {
  /**
   * 跳转到制定页面
   * @param {*} params 要传递的参数
   * @param {*} page 要跳转的页面名
   */

  static goPage(params, page) {
    const navigation = NavigationUtil.navigation || (params || {}).navigation
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null')
      return
    }
    navigation.navigate(page, {
      ...params,
      navigation: undefined,
    })
  }
  // 返回上一页
  static goBack(navigation) {
    navigation.goBack()
  }
  // 重置到首页
  static resetToHomePage(params) {
    const { navigation } = params
    navigation.dispatch(StackActions.replace('HomePage', {}))
  }
  // 重置到登录页
  static login(params = {}) {
    const { navigation } = params
    if(!navigation) {
      navigation = NavigationUtil.navigation
    }
    navigation.dispatch(StackActions.replace('LoginPage', {}))
  }
  // 重置到注册页
  static registration(params = {}) {
    const { navigation } = params
    if(!navigation) {
      navigation = NavigationUtil.navigation
    }
    navigation.dispatch(StackActions.replace('RegistrationPage', {}))
  }

}
