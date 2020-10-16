import { getImageInfo } from './config'

const isloaded  = Symbol('isloaded')
const total  = Symbol('total')
const loaded  = Symbol('loaded')
const loadingCallbacks  = Symbol('loadingCallbacks')
const doneCallbacks  = Symbol('doneCallbacks')
const imageMap = Symbol('imageMap')
const PATH_REG = /^http*/

/**
 * getImageInfo, 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单
 */
export default class ImgLoader {
	constructor(imgArr){
		this[total] = imgArr.length
		this[loaded] = 0
		this[loadingCallbacks] = []
		this[doneCallbacks] = []
		this[isloaded] = false
		this[imageMap] = new Map()

		setTimeout(()=>{
			this.load(imgArr)
		}, 0)
		return this
	}
	get(id){
		return this[imageMap].get(id)
	}
	load(imgArr){
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
          let p = this[loaded] / this[total]
          this[loadingCallbacks].forEach(v => {
          	v(p)
					})
          if(p >= 1){
						this[isloaded] = true
          	this[doneCallbacks].forEach(v => {
	          	v(this)
	          })
          }
        }
      })
		})
		return this
	}
	loading(f){
		this[loadingCallbacks].push(f)
		return this
	}
	done(f){
		if(f && this[isloaded]){
			f(this)
		}
		this[doneCallbacks].push(f)
		return this
	}
}
