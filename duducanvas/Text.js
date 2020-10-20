/**
 * 文本类
 */
import { draw } from './config'
import DisplayObject from './DisplayObject'
import Shape from './Shape'
import FillText from './text/FillText'
import SetFillStyle from './text/SetFillStyle'
import SetTextAlign from './text/SetTextAlign'
import SetTextBaseline from './text/SetTextBaseline'

const instruction = Symbol('instruction')
const _append = Symbol('_append')
const _text = Symbol('_text')
const _width = Symbol('_width')
const _height = Symbol('_height')
const _fontSize = Symbol('_fontSize')

const defaultFontSize = 10

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
	constructor(t){
		super()
		this[instruction] = []
		this.init(t)
	}
	init(t = {}){
		let { text, font, color, fontSize } = t
		if(font){
			this.font = font
			let fontSize = font.match(/\d+/)[0]
			if(fontSize){
				console.log(this.fontSize)
				this.fontSize = parseInt(fontSize)
				this.height = this.fontSize + this.lineDistance
			}
		}
		if(fontSize){
			this.font = `${fontSize}px sans-serif`
			this.fontSize = parseInt(fontSize)
			this.height = fontSize  + this.lineDistance
		}
		
		if(color){
			this.color = color
		}
		this.textAlign = 'left'
		this.textBaseline = 'top'

		if(text){
			this[_text] = text
		}
	}
	// 添加至指令集
	[_append](instructionsObject){
		this[instruction].push(instructionsObject)
	}
	get text(){
		return this[_text]
	}
	set text(t){
		this[_text] = t
		this[_width] = this.measureWidth(t, this.fontSize)
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
	set height(w){
		this[_height] = w
	}
	get fontSize(){
		return this[_fontSize]
	}
	set fontSize(v){
		this[_fontSize] = v
		this[_width] = this.measureWidth(this.text, v)
		this.height = v  + this.lineDistance
	}
	collectStatus(){
		if(this.fontSize){
			this.font = `${this.fontSize}px sans-serif`
			this.height = this.fontSize  + this.lineDistance
		}

		this.setTextAlign(this.textAlign)
		this.setTextBaseline(this.textBaseline)
		this.setFillStyle(this.color)
		this.fillText(this[_text])
	}
	// 执行指令集
	[draw](context){
		this.collectStatus()

		if(this.mask && this.mask.name === 'Shape'){
			this.mask.masked = this
			this.mask[draw](context, true)
		}
		this[instruction].map((v) => {
			v.exec(context, this)
		})
		
	}
	/**
	 * setFillStyle 设置文本颜色
	 * @param {String} color [description]
	 */
	setFillStyle(color='black'){
		this.color = color
		this[_append](new SetFillStyle(color))
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
		this[_append](new FillText(text, this.x, this.y))	

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
		this[_append](new SetTextBaseline(textBaseline))
		return this
	}
	/**
	 * [setTextAlign 设置文本水平对齐方式]
	 * @param { String } textAlign [left, center, right]
	 */
	setTextAlign(textAlign) {
		this.textAlign = textAlign
		this[_append](new SetTextAlign(textAlign))
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
		this.height = (this.measureWidth(this[_text], this.fontSize) / w >> 0) * (this.fontSize + this.lineDistance)
		return this
	}
	measureWidth(text, fontSize){
		const ctx = DisplayObject.getContext()
		return ctx.measureText(text).width * (fontSize / defaultFontSize)
	}
	addChild(){
		throw new Error('不能给 Text 类添加子元素')
	}
}