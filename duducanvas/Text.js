/**
 * 文本类
 */
import { draw, append, drawGraphics } from './config'
import DisplayObject from './DisplayObject'
import { FillText, needRotation } from './text/FillText'
import SetFillStyle from './text/SetFillStyle'
import SetTextAlign from './text/SetTextAlign'
import SetTextBaseline from './text/SetTextBaseline'

const _text = Symbol('_text')
const _width = Symbol('_width')
const _height = Symbol('_height')
const _fontSize = Symbol('_fontSize')
const _wrapWidth = Symbol('_wrapWidth')
const _wrapHeight = Symbol('_wrapHeight')
const _writeMode = Symbol('_writeMode')

const defaultFontSize = 10

/**
 * Text 文本类
 * 显示文本，支持横、竖排文字，换行
 */
export default class Text extends DisplayObject {
	name = 'Text'
	// 多行文本时的行距
	lineGap = 0
	// 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
	font = `${defaultFontSize}px sans-serif`
	constructor(t){
		super()
		this[drawGraphics] = super[drawGraphics]
		this.init(t)
	}
	init(t = {}){
		let { text, font, color, fontSize } = t
		this[_writeMode] = ''
		if(font){
			this.font = font
			let fontSize = font.match(/\d+/)[0]
			if(fontSize){
				this.fontSize = parseInt(fontSize)
				this[_height] = this.fontSize + this.lineGap
			}
		}
		if(fontSize){
			this.font = `${fontSize}px sans-serif`
			this.fontSize = parseInt(fontSize)
			this[_height] = fontSize  + this.lineGap
		}
		if(!this.fontSize){
			this.fontSize = defaultFontSize
		}
		if(color){
			this.color = color
		}
		this.textAlign = 'left'
		this.textBaseline = 'top'
		this[_text] = ''
		if(text){
			this[_text] = text
		}
	}
	get text(){
		return this[_text]
	}
	set text(t){
		this[_text] = t
		this[_width] = this.measureWidth(t, this.fontSize)
		this.height = this.fontSize
	}
	get width(){
		return this[_width]
	}
	set width(w){
		this[_width] = w
	}
	get height(){
		return this[_height]
	}
	set height(h){
		this[_height] = h
	}
	/**
	 * 限制文本框高度
	 * 超过设置的高度则文本换行
	 */
	get wrapHeight(){
		return this[_wrapHeight]
	}
	set wrapHeight(v){
		this[_wrapHeight] = v
		this[_height] = v
		this.initVerticalSize()
	}
	/**
	 * 限制文本框宽度
	 * 超过设置的宽度则文本换行
	 */
	get wrapWidth(){
		return this[_wrapWidth]
	}
	set wrapWidth(v){
		this[_wrapWidth] = v
		this[_width] = v
		this[_height] = this.getHeightByWrapWidth()
	}
	/**
	 * 设置字体大小
	 */
	get fontSize(){
		return this[_fontSize]
	}
	set fontSize(v){
		this[_fontSize] = v
		this[_width] = this.measureWidth(this.text, v)
		this[_height] = v  + this.lineGap
	}
	/**
	 * 文本横排与竖排模式
	 */
	get writeMode(){
		return this[_writeMode]
	}
	set writeMode(v){
		this[_writeMode] = v
		if(v.length > 0){
			this.initVerticalSize()
		}
	}
	/**
	 * 整理文本状态
	 */
	collectStatus(){
		if(this.fontSize){
			this.font = `${this.fontSize}px sans-serif`
			this[_height] = this.fontSize  + this.lineGap
		}

		this.setTextAlign(this.textAlign)
		this.setTextBaseline(this.textBaseline)
		this.setFillStyle(this.color)
		this.fillText(this[_text])
	}
	// 执行指令集
	[draw](ctx){
		this.collectStatus()
		// 优先执行 graphics 指令
		this[drawGraphics](ctx)
		if(this.mask && this.mask.name === 'Shape'){
			this.mask.masked = this
			this.mask[draw](ctx, true)
		}
	}
	/**
	 * setFillStyle 设置文本颜色
	 * @param {String} color [description]
	 */
	setFillStyle(color='black'){
		this.color = color
		this[append](new SetFillStyle(color))
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
		this[_text] = text
		this.x += x
		this.y += y
		this.width = this.measureWidth(this[_text], this.fontSize)

		// !! 注意 fillText 方法不能放在 setTimeout 或 setInterval 内
		// !! 因为会错过画布更新
		this[append](new FillText(text, this.x, this.y))	

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
		this[append](new SetTextBaseline(textBaseline))
		return this
	}
	/**
	 * [setTextAlign 设置文本水平对齐方式]
	 * @param { String } textAlign [left, center, right]
	 */
	setTextAlign(textAlign) {
		this.textAlign = textAlign
		this[append](new SetTextAlign(textAlign))
		return this
	}
	/**
	 * setlineGap 设置多文本时文本行垂直间距
	 * @param { Number } h 相比使用行距，直接使用间距设置比较方便计算
	 */
	setlineGap(h){
		this.lineGap = h
		return this
	}
	/**
	 * 设置文本框宽度
	 * @param {*} w 
	 */
	setWrapWidth(w){
		this.wrapWidth = w
		this.width = w
		return this
	}
	/**
	 * 设置文本框高度
	 * @param {*} h 
	 */
	setWrapHeight(h){
		this.wrapHeight = h
		return this
	}
	/**
	 * 计算文本宽度
	 * @param {*} text 
	 * @param {*} fontSize 
	 */
	measureWidth(text, fontSize){
		let w
		if(this.writeMode.length){
			w = fontSize
		}else{
			const ctx = DisplayObject.getContext()
			w = ctx.measureText(text).width * (fontSize / defaultFontSize)
		}
		return w
	}
	// 初始化竖排文本时的整体宽与高属性
	initVerticalSize(){
		if(this.text.length){
			const { width,  height} = this.getVerticalSize()
			this[_width] = width
			this[_height] = height
		}
	}	
	// 计算竖排文本时的整体文本宽,高
	getVerticalSize(){
		const fontSize = this.fontSize 
		const lineGap = this.lineGap
		const wrapHeight = this.wrapHeight
		const halfFont = fontSize * .5
		let w = 0, h = 0
		let height = 0
		let width = 0
		let offset = 0
		// 二维数组存放每个字文本与文本高度信息
		let arr = []
		// 二维数组游标，可代表当前指向哪一行
		let arrIndex = 0
		
		// 计算每个字高度
		this.text.split('').map((v)=>{
			let charHeight = 0
			if(needRotation(v)){
				charHeight = halfFont + lineGap
			}else{	
				charHeight = fontSize + lineGap
			}
			h += charHeight
			offset += charHeight
			if(offset > (wrapHeight)){
				arrIndex++
				offset = 0
			}
			arr[arrIndex] = arr[arrIndex] || []
			arr[arrIndex].push({text: v, height: charHeight})
		})
		if(wrapHeight){
			height = wrapHeight
			width = arr.length * fontSize + (arr.length * lineGap - lineGap)
		}else{
			width = fontSize
			height = h
		}
		// 可优化点，此处计算出的文本单字可以直接用于 fillText 类内
		return {width, height}
	}
	// 获取受限宽度下的文本整体高度，因为有可能会换行
	getHeightByWrapWidth(){
		const ctx = DisplayObject.getContext()
		const wrapWidth = this.wrapWidth
		const fontSize = this.fontSize 
		const text = this.text
		let i = 0, j= 0, t = null, lineWidth = 0
		let arr = []
		
		while(t=text[i]){
			// 根据每个单字计算字符宽度
			lineWidth += ctx.measureText(t).width * (fontSize / defaultFontSize)
			if(lineWidth <= wrapWidth){
				arr[j] ? arr[j] += text[i] : arr[j] = text[i]
			}else{
				lineWidth = 0
				j++
			}
			i++
		}
		// todo: 可优化点，此处计算出的文本单字可以直接用于 fillText 类内
		// 高度 = 文本行数 * 字体大小 + 行间距
		return this.height = arr.length * fontSize + (arr.length * this.lineGap - this.lineGap)
	}
	addChild(){
		throw new Error('不能给 Text 类添加子元素')
	}
}