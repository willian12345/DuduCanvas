// getImageInfo, 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单
import { getImageInfo } from './config'

const total  = Symbol('total')
const loaded  = Symbol('loaded')
const load  = Symbol('load')
const loadProgressCallback  = Symbol('loadProgressCallback')
const imageMap = Symbol('imageMap')
const PATH_REG = /^http*/

/**
 * 预加载图片
 * 
 */
export default class ImgLoader {
	constructor(imgArr, loadProgressCallback){
		this[total] = imgArr.length
		this[loaded] = 0
		this[loadProgressCallback] = loadProgressCallback
		this[imageMap] = new Map()
		
		// 直接返回一个 Promise
		return new Promise((resolve) => {
			this[load](imgArr, resolve)
		})
	}
	get(id){
		return this[imageMap].get(id)
	}
	[load](imgArr, resolve){
		imgArr.forEach( v => {
			getImageInfo({
        src: v.src,
        success: res => {
					// 为本地图片地址最前主动加上 '/' , 以符合绘图接口的路径规则
          if(!PATH_REG.test(v.src)){
          	res.path = '/' + res.path
          }
          this[imageMap].set(v.id, {
          	path: res.path,
          	width: res.width,
          	height: res.height,

          })
					this[loaded]++
					const progress = this[loaded] / this[total]
					if(this[loadProgressCallback]){
						this[loadProgressCallback](p)
					}
          if(progress >= 1){
						resolve(this)
          }
        }
      })
		})
		return this
	}
}
