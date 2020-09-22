
import DisplayObject from './DisplayObject'


/**
 * getTextArr 多行时计算每行显示多少个字符
 */
const getTextArr = function(ctx, instance, text){
	const wrapWidth = instance.wrapWidth

	let i = 0, j= 0, t = null, lineWidth = 0
	let arr = []
	while(t=text[i]){
		// 根据每个单字计算字符宽度
		lineWidth += ctx.measureText(t).width
		if(lineWidth <= wrapWidth){
			arr[j] ? arr[j] += text[i] : arr[j] = text[i]
		}else{
			lineWidth = 0
			j++
		}
		i++
	}
	return arr
}



class FillText {
	constructor (text, x, y) {
		this.text = text
		this.x  = x
		this.y = y
	}
	exec(ctx, instance){
		const [_x, _y] = instance.getPosition()
		let x = _x + this.x
		let y = _y + this.y
		ctx.font = instance.font
		// 如果设置了文本框宽度，则需要判断是否显示成多行
		if(instance.wrapWidth > -1){
			let textArr = getTextArr(ctx, instance, this.text)
			let h = 0
			for(let i=0,l=textArr.length; i<l; i++){
				h = y + (i * (instance.fontSize + instance.lineDistance))
				ctx.fillText(textArr[i], x, h)
			}
		}else{
			ctx.fillText(this.text, x, y)
		}
	}
}



const defaultFontSize = 10


/**
 * 文本类
 */
export default class Text extends DisplayObject {
	name = 'Text'
	// 文本宽度，如果设置后文本超过此宽度，则文本换行
	wrapWidth = -1
	// 多行文本时的行距
	lineDistance = 0
	// 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
	font = `${defaultFontSize}px sans-serif`
	fontSize = defaultFontSize
	height = defaultFontSize
	constructor(t = {}){
		super()
		
		let { text, font, color, fontSize } = t
		
		if(font){
			this.font = font
			let fontSize = font.match(/\d+/)[0]
			if(fontSize){
				this.fontSize = parseInt(fontSize)
				this.height = this.fontSize
			}
		}else if(fontSize){
			this.fontSize = fontSize
			this.font = `${fontSize}px sans-serif`
			this.height = fontSize
		}
		
		if(color){
			this.color = color
		}
		this.textAlign = 'left'
		this.textBaseline = 'top'

		if(text){
			this.text = text
			this.fillText(this.text)
			this.width = this.measureWidth(this.text, this.fontSize)
		}
		console.log(this.fontSize)
	}
	// 指令集
	_instruction = []
	// 添加至指令集
	_append(instructionsObject) {
		this._instruction.push(instructionsObject)
	}
	// 执行指令集
	draw(context){
		context.setTextAlign(this.textAlign)
		context.setTextBaseline(this.textBaseline)
		context.setFillStyle(this.color)
		this._instruction.map((instruction) => {
			instruction.exec(context, this)
		})
	}
	/**
	 * setFillStyle 设置文本颜色
	 * @param {String} color [description]
	 */
	setFillStyle(color='black'){
		this.color = color
		return this
	}
	fillStyle(color){
		return this.setFillStyle(color)
	}
	/**
	 * fillText 绘制文本
	 * @param  {String} text 
	 * @param  {Number} x    
	 * @param  {Number} y    
	 */
	fillText(text, x = 0, y = 0) {
		this.text = text
		this.x += x
		this.y += y
		// !! 注意 fillText 方法不能放在 setTimeout 或 setInterval 内
		// !! 因为会错过画布更新
		this._append(new FillText(text, this.x, this.y))	
		return this
	}
	/**
	 * setFont 设置字体样式
	 * @param { String } font 填单独某一项无效，必须填字号与字体family
	 * eg1: 'italic 12px sans-serif'
	 * eg2: '12px sans-serif'
	 */
	setFont(font){
		this.font = font
		return this
	}
	/**
	 * setFontSize 设置字体大小
	 * @param {Number} size 不带单位，全部按 px 算
	 */
	setFontSize(size) {
		this.fontSize = size
		this.font = this.font.replace(/\d+/, size)
		return this
	}
	/**
	 * setTextBaseline 设置文字垂直对齐方式，推荐 top 顶部对齐比较好算
	 * @param { String } textBaseline top	顶部对齐	 bottom	底部对齐	middle	居中对齐	normal 默认（基线对齐）
	 */
	setTextBaseline(textBaseline) {
		this.textBaseline = textBaseline
		return this
	}
	/**
	 * [setTextAlign 设置文本水平对齐方式]
	 * @param { String } textAlign [left, center, right]
	 */
	setTextAlign(textAlign) {
		this.textAlign = textAlign
		return this
	}
	/**
	 * setLineDistance 设置多文本时文本行垂直间距
	 * @param { Number } h 相比使用行距，直接使用间距设置比较方便计算
	 */
	setLineDistance(h){
		this.lineDistance = h
		return this
	}
	setWrapWidth(w){
		this.wrapWidth = w
		this.width = w
		this.height = (this.measureWidth(this.text, this.fontSize) / w >> 0) * this.fontSize
		return this
	}
	measureWidth(text, fontSize){
		const ctx = DisplayObject.getContext()
		return ctx.measureText(text).width * (fontSize / defaultFontSize)
	}
}