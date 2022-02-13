import NavigationUtil from '../../navigator/NavigationUtil'
import { getBoarding } from '../../util/BoardingUtil'
import Constants from './Constants'

export function get(api: string) {
	return async (params?: {}) => {
		const boarding = await getBoarding()
		const { headers, url } = Constants
		return handleData(
			fetch(buildParams(url + api, params), {
				headers: {
					...headers,
					'boarding-pass': boarding || ''
				},
			})
		)
	}
}

export function post(api: string) {
	/**
	 * 第一个参数是作为body参数，第二个参数作为URL,path或者查询参数
	 */
	return (params: {}) => {
		return async (queryParams?: {} | string) => {
			const boarding = await getBoarding()
			const {headers, url} = Constants;
			let data = params instanceof FormData ? params : JSON.stringify(params);
			return handleData(
				fetch(buildParams(url + api, queryParams), {
					method: 'POST',
					body: data,
					headers: {
						'Content-Type': 'application/json',
						...headers,
						'boarding-pass': boarding || ''
					}
				})
			)
		}
	}
}

/**
 * 处理接口返回数据
 */
function handleData(doAction: Promise<any>) {
	return new Promise((resolve, reject) => {
		doAction
			.then(res => {
				const type = res.headers.get('Content-Type')
				if ((type || '').indexOf('json') !== -1) {
					return res.json()
				}
				return res.text()
			})
			.then(result => {
				if(typeof result === 'string') {
					throw new Error(result);
				}
				const {code, msg, data: {list = undefined} = {}} = result;
				if(code === 401) {
					// todo 跳转至登录页
					NavigationUtil.login();
					return
				}
				resolve(list || result)
			})
			.catch(error => {
				reject(error)
			})
	})
}

/**
 * 构建url参数
 */
function buildParams(url: string, params?: {} | string): string {
	let newUrl = new URL(url),
		finalUrl
	if (typeof params === 'object') {
		for (const [key, value] of Object.entries(params)) {
			newUrl.searchParams.append(key, value as string)
		}
		finalUrl = newUrl.toString()
	} else if (typeof params === 'string') {
		finalUrl = url.endsWith('/') ? url + params : url + '/' + params
	} else {
		finalUrl = newUrl.toString()
	}
	console.log('------buildParams', finalUrl)
	return finalUrl
}
