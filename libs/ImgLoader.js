const isloaded  = Symbol('isloaded')
const total  = Symbol('total')
const loaded  = Symbol('loaded')
const loadingCallbacks  = Symbol('loadingCallbacks')
const doneCallbacks  = Symbol('doneCallbacks')
const imageMap = Symbol('imageMap')
const PATH_REG = /^http*/

export default class ImgLoader {
	constructor(imgArr){
		this[total] = imgArr.length
		this[loaded] = 0
		this[loadingCallbacks] = []
		this[doneCallbacks] = []
		this[isloaded] = false
		this[imageMap] = new Map()
		this.load(imgArr)
		return this
	}
	get(id){
		return this[imageMap].get(id)
	}
	load(imgArr){
		imgArr.forEach( v => {
			wx.getImageInfo({
        src: v.src,
        success: res => {
          // console.log(res)
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
		this[doneCallbacks].push(f)
		return this
	}
}
