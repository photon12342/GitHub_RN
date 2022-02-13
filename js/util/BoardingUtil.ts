import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_BOARDING_PASS = 'boarding-pass';

// 保存登录态
export function saveBoarding(data: string) {
  AsyncStorage.setItem(KEY_BOARDING_PASS, data);
}
// 获取登录态
export async function getBoarding() {
  return await AsyncStorage.getItem(KEY_BOARDING_PASS);
}
