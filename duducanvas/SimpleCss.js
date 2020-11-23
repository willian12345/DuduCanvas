import DisplayObject from './DisplayObject.js'
import { draw } from './config'
import Shape from './Shape.js'

const extendsClassDraw = Symbol('extendsClassDraw')

/**
 * 解构圆角矩形值生成:  { tl: 0, tr: 0, br: 0, bl: 0 }
 * @param {*} value 
 */
function getChangedBorderRadiusValue(value){
	let borderRadiusValue
  const roundCorner = { tl: 0, tr: 0, br: 0, bl: 0 }
	value = String(value).split(' ').map(v => parseFloat(v))
	const valueLength = value.length
	if(valueLength === 1){
		borderRadiusValue = value[0]
	}else if(valueLength === 2){
		roundCorner.tl = roundCorner.br = value[0]
		roundCorner.tr = roundCorner.bl = value[1]
		borderRadiusValue = roundCorner
	}else if(valueLength === 3){
		roundCorner.tl = value[0]
		roundCorner.br = value[2]
		roundCorner.tr = roundCorner.bl = value[1]
		borderRadiusValue = roundCorner
	}else if(valueLength === 4){
		roundCorner.tl = value[0]
		roundCorner.tr = value[1]
		roundCorner.br = value[3]
		roundCorner.bl = value[4]
		borderRadiusValue = roundCorner
	}
	return borderRadiusValue
}

// 仅支持二种风格的边框
const BORDER_STYLES = ['solid', 'dashed']

/**
 * SimpleCss 
 * 样式类
 */
export default class SimpleCss extends DisplayObject {
	backgroundColor = ''
	border = ''
	borderTop = ''
	borderRight = ''
	borderBottom = ''
	borderLeft = ''
  borderRadiusValue = ''
	/**
	 * 1、borderRadius值设置请参与 css3 的 border-radius 属性;
	 * eg1: 10
	 * eg2: '10 20'
	 * eg3: '10 20 10'
	 * eg4: '10, 20, 30, 40'
	 * 
	 * 2、borderRadius设置为 '100%'，则认为是圆形遮罩
	 * eg: '100%'
	 */
	get borderRadius(){
		return this.borderRadiusValue
	}
	set borderRadius(value){
		if(!value) return
		if(value != '100%'){
			this.borderRadiusValue = getChangedBorderRadiusValue(value)
		}else{
			this.borderRadiusValue = value
		}
  }
  constructor(){
    super()
    this[extendsClassDraw] = super[draw]
	}
	/**
	 * 绘制接口
	 * @param {*} ctx 
	 */
  [draw](ctx){
		
    // 如果设置了 borderRadius 值则需要使用遮罩实现圆角
		if(this.borderRadiusValue){
			this.initBorderRadiusMask()
    }
		
		// 绘制背景
    if(this.backgroundColor){
      this.initBackgroundColor()
		}

		// 绘制边框
		if(this.border || this.borderTop || this.borderRight || this.borderBottom || this.borderLeft){
			this.initBorder()
		}

		// 遮罩，主要用于显示圆角及圆
		if(this.mask){
			if(this.mask.name === 'Shape'){
				// 遮罩层不参与显示所以也没有父级元素
        this.mask.masked = this
        this.mask[draw](ctx, true)
			}
    }
		// 重载 DisplayObject draw 
		// 调用 显示对象绘制方法
    this[extendsClassDraw](ctx)
	}
	/**
	 * 解构边框线值字符串
	 * @param {*} border 
	 */
	getBorderAttr(border){
		let [ borderWidth, borderStyle, borderColor] = border.split(' ')
		borderWidth = parseFloat(borderWidth)
		if(BORDER_STYLES.indexOf(borderStyle) < 0){
			console.warn('不支持的边框样式')
		}
		
		return [ borderWidth, borderStyle, borderColor ]
	}
	/**
	 * 设置边框样宽，样式，颜色
	 * @param {*} borderWidth 
	 * @param {*} borderStyle 
	 * @param {*} borderColor 
	 */
	setBorderStyles(borderWidth, borderStyle, borderColor){
		this.graphics.beginPath()
		if(borderStyle === 'dashed'){
			this.graphics.setLineDash([borderWidth,borderWidth])
		}
		// 边框都是向内画
		this.graphics.lineWidth(borderWidth)
		.strokeStyle(borderColor)
	}
	/**
	 * 生成水平半圆角矩形路径
	 * 当 borderRadius 值超过元素高度 height 时，表示左右显示成半圆
	 * @param {*} width 
	 * @param {*} height 
	 */
	getHorizontalRoundRectPath(width, height){
		const s = new Shape()
		const radius = height * .5
		s.graphics.beginPath()
		.fillStyle('#ff00ff')
		.arc(radius, radius, radius, Math.PI * .5, Math.PI * 1.5)
		.lineTo(width - radius, 0)
		.arc(width - radius, radius, radius, Math.PI * 1.5, Math.PI * 2.5)
		.lineTo(radius, height)
		return s
	}
	/**
	 * 生成垂直半圆角矩形路径
	 * 当 borderRadius 值超过元素宽度 width 时，表示上高显示成半圆
	 * @param {*} width 
	 * @param {*} height 
	 */
	getVerticalRoundRectPath(width, height){
		const s = new Shape()
		const radius = width * .5
		s.graphics.beginPath()
		.arc(radius, radius, radius, Math.PI, Math.PI * 2)
		.lineTo(width, height - radius)
		.arc(radius, height - radius, radius, 0, Math.PI)
		.lineTo(0, radius)
		return s
	}
	/**
	 * 初始化边框线
	 */
	initBorder(){
		// 四边都有边框
		if(this.border){
			const [ borderWidth, borderStyle, borderColor ] = this.getBorderAttr(this.border)
			this.setBorderStyles(borderWidth, borderStyle, borderColor)
			const halfBorderWidth = borderWidth * .5
			// 如果有圆角属性，则需要画圆角边框
			if(this.borderRadius){
				let s
				// 值为100%或值等于宽高值，且宽高相等时 表示显示想要显示成圆形
				if((this.borderRadius === '100%' || this.borderRadius === this.width) && (this.width === this.height)){
					s = new Shape()
					const radius = this.width * .5
					s.graphics.strokeCircle(radius, radius, radius)
				}else if(this.borderRadius >= this.height){
					s = this.getHorizontalRoundRectPath(this.width, this.height)
					s.graphics.stroke()
				}else if(this.borderRadius >= this.width){
					s = this.getVerticalRoundRectPath(this.width, this.height)
					s.graphics.stroke()
				}else{
					s = new Shape()
					s.graphics.strokeRoundRect(0, 0, this.width, this.height, this.borderRadius)
				}
				this.addChild(s)
			}else{
				this.graphics.strokeRect(halfBorderWidth, halfBorderWidth, this.width - borderWidth, this.height - borderWidth)
			}
		} else {
			if(this.borderTop){
				this.setBorderStyles(...this.getBorderAttr(this.borderTop))
				this.graphics.moveTo(0, 0)
				.lineTo(this.width, 0)
				.stroke()
			}else if(this.borderRight){
				this.setBorderStyles(...this.getBorderAttr(this.borderRight))
				this.graphics.moveTo(this.width, 0)
				.lineTo(this.width, this.height)
				.stroke()
			}else if(this.borderBottom){
				this.setBorderStyles(...this.getBorderAttr(this.borderBottom))
				this.graphics.moveTo(0, this.height)
				.lineTo(this.width, this.height)
				.stroke()
			}else if(this.borderLeft){
				this.setBorderStyles(...this.getBorderAttr(this.borderLeft))
				this.graphics.moveTo(0, 0)
				.lineTo(0, this.height)
				.stroke()
			}
		}
	}
	/**
	 * 初始化圆角
	 * 为图像元素添加遮罩以实现 borderRadius 圆角
	 */
	initBorderRadiusMask(){
		let s
		if((this.borderRadiusValue === '100%' || this.borderRadiusValue === this.width) && (this.width === this.height)){
			const radius = this.width * .5
			s = new Shape()
			s.graphics.fillCircle(radius,  radius, radius)
		}else if(this.borderRadiusValue >= this.height){
			s = this.getHorizontalRoundRectPath(this.width, this.height)
			s.graphics.clip()
			.fill()
		}else if(this.borderRadiusValue >= this.width){
			s = this.getVerticalRoundRectPath(this.width, this.height)
			s.graphics.clip()
			.fill()
		}else{
			s = new Shape()
			s.graphics.fillRoundRect(0, 0, this.width, this.height, this.borderRadiusValue)
		}
		this.mask = s
	}
	/**
	 * 初始化背景颜色
	 */
  initBackgroundColor(){
    this.graphics.beginPath()
    .fillStyle(this.backgroundColor)
    .fillRect(0, 0, this.width, this.height)
  }
}