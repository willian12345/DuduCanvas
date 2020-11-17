import DisplayObject from './DisplayObject.js'
import { draw } from './config'
import Shape from './Shape.js'

const extendsClassDraw = Symbol('extendsClassDraw')

const roundCorner = {tl: 0, tr: 0, br: 0, bl: 0}
function getChangedBorderRadiusValue(value){
	let borderRadiusValue
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

/**
 * SimpleCss 
 * 样式类
 */
export default class SimpleCss extends DisplayObject {
  backgroundColor = ''
  borderRadiusValue = ''
	/**
	 * 1、borderRadius值设置请参与 css3 的 border-radius 属性;
	 * eg1: '10'
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
  [draw](ctx){
    // 如果设置了 borderRadius 值则需要使用遮罩实现圆角
		if(this.borderRadiusValue){
			this.initBorderRadiusMask()
    }

    if(this.backgroundColor){
      this.initBackgroundColor()
    }
    
		// 如果有遮罩，只能使用 圆形，矩形，圆角矩形
		if(this.mask){
			if(this.mask.name === 'Shape'){
				// 遮罩层不参与显示所以也没有父级元素
        this.mask.masked = this
        this.mask[draw](ctx, true)
			}
    }
    // 重载 DisplayObject draw 
    this[extendsClassDraw](ctx)
	}
	/**
	 * borderRadius 
	 * 为图像元素添加遮罩以实现圆角
	 */
	initBorderRadiusMask(){
		const s = new Shape()
		if(this.borderRadiusValue === '100%'){
			s.graphics.fillCircle(this.width * .5,  this.height * .5, this.width * .5)
		}else{
			s.graphics.fillRoundRect(0, 0, this.width, this.height, this.borderRadiusValue, '#000')
    }
		this.mask = s
  }
  initBackgroundColor(){
    this.graphics.beginPath()
    .fillStyle(this.backgroundColor)
    .fillRect(0, 0, this.width, this.height)
  }
}