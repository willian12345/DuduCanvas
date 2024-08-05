import Text from "../Text"

// 旋转 90 弧度 直接得出常数 (90 * Math.PI / 180) 免于实时计算
const ROTATE_90DEG = 1.5707963267948966
// 需要旋转的 Unicode 码范围, 如中、日、韩文字
export const NO_ROTATION_RANGE = [
  [0x2E80, 0x2FEF],
  [0x3040, 0x9FFF],
  [0xAC00, 0xD7FF],
  [0xF900, 0xFAFF],
  [0x1D300, 0x1D35F],
  [0x20000, 0x2FA1F]
]

export function needRotation (char: string) {
  let codePoint: number = char.codePointAt(0) ?? -1
  for (let [lowerBound, upperBound] of NO_ROTATION_RANGE) {
    if (lowerBound <= codePoint && codePoint <= upperBound) {
      return false
    }
  }
  return true
}
/**
 *  文本绘制命令
 */
export class FillText {
	instance: Text|null = null
  name = 'FillText'
  text = ''
  x: number
  y: number
	constructor (text: string, x: number, y: number) {
		this.text = text
		this.x  = x
		this.y = y
	}
	exec(ctx:  WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: Text){
    this.instance = instance
    if(!this.instance){
      return;
    }
    
		const [x, y] = instance.getPosition()
		
		ctx.font = instance.font
		if(instance.writeMode === 'vertical-rl' || instance.writeMode === 'vertical-lr' ){
			// 文字竖排从右向左
			this.vertical(ctx, x, y)
		}else if(instance.wrapWidth > -1){
			// 如果设置了文本框宽度，则需要判断是否显示成多行
			let textArr = this.getTextArr(ctx, instance, this.text)
			let h = 0
			for(let i=0,l=textArr.length; i<l; i++){
				h = y + (i * (instance.fontSize + instance.lineGap))
				ctx.fillText(textArr[i], x, h)
			}
		}else{
			ctx.fillText(this.text, x, y)
		}
	}
	/**
	 * getTextArr 多行时计算每行显示多少个字符
	 */
	getTextArr(ctx:  WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance:Text, text: string){
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
	// 文本竖排
	vertical(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, x: number, y: number){
    if(!this.instance){
      return;
    }
		const textArr = this.text.split('')
		const verticalLineWidth = this.instance.fontSize + this.instance.lineGap
		const lineWidth = this.instance.writeMode === 'vertical-rl' ? -verticalLineWidth : verticalLineWidth
		const fontSize = this.instance.fontSize
		const fontSizeHalf = fontSize * .5
		let offsetY = 0
		let offsetX = 0
		const wrapHeight = this.instance.wrapHeight
		
		textArr.map( (t) => {
			if(needRotation(t)){	
				// 如果竖直文本大于限制高度，x 轴则向左或向右移一行
				if(wrapHeight > -1 && offsetY + y + fontSizeHalf > wrapHeight + y){
					offsetX += lineWidth
					offsetY = 0
				}
				
				const left = x + offsetX + fontSizeHalf
				const top = y + offsetY + fontSizeHalf
				ctx.save()
				ctx.translate(left , top)
				ctx.rotate(ROTATE_90DEG)
				ctx.translate(-left, -top)	
				// x 和 y 此处要和正常没旋转时的文本一样对待
				ctx.fillText(t, x + offsetX,  y + offsetY)
				offsetY += fontSizeHalf
				ctx.restore()
			}else{
				// 如果竖直文本大于限制高度，x 轴则向左移一行
				if(wrapHeight > -1 && offsetY + y + fontSize > wrapHeight + y){
					offsetX += lineWidth
					offsetY = 0
				}
				ctx.fillText(t, x + offsetX, y + offsetY)
				offsetY += fontSize
			}
		})
	}
}
