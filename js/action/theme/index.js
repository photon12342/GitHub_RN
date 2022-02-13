/*
* action 创建函数
*/
import types from "../types";
/**
 * 主题变更
 * @param theme
 * @returns {{type: string, theme: *}}
 */
export function onThemeChange(theme) {
  return {
    type: types.THEME_CHANGE,
    theme
  }
}