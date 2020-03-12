let isloaded  = Symbol('isloaded')
let total  = Symbol('total')
let loaded  = Symbol('loaded')
const loadingCallbacks  = Symbol('loadingCallbacks')
const doneCallbacks  = Symbol('doneCallbacks')

export default class ImgLoader {
	loadedImages = []
	constructor(imgArr){
		this[total] = imgArr.length
		this[loaded] = 0
		this[loadingCallbacks] = []
		this[doneCallbacks] = []
		this[isloaded] = false
		
		this.load(imgArr)
	}
	load(imgArr){
		imgArr.forEach( v => {
			wx.getImageInfo({
        src: v,
        success: res => {
          console.log(res)
          this.loadedImages.push({
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
	          	v()
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
