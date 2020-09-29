/**
 *  文本绘制命令
 */
export default class FillText {
	constructor (text, x, y) {
		this.text = text
		this.x  = x
		this.y = y
	}
	exec(ctx, instance){
		const [x, y] = instance.getPosition()
		// let x = _x + this.x - instance.regX
		// let y = _y + this.y - instance.regY
		// let x = _x + this.x - instance.regX
		// let y = _y + this.y - instance.regY
		// console.log(_x, _y, this.x, this.y)
		ctx.font = instance.font
		// 如果设置了文本框宽度，则需要判断是否显示成多行
		if(instance.wrapWidth > -1){
			let textArr = this.getTextArr(ctx, instance, this.text)
			let h = 0
			for(let i=0,l=textArr.length; i<l; i++){
				h = y + (i * (instance.fontSize + instance.lineDistance))
				ctx.fillText(textArr[i], x, h)
			}
		}else{
			ctx.fillText(this.text, x, y)
		}
	}
	/**
	 * getTextArr 多行时计算每行显示多少个字符
	 */
	getTextArr(ctx, instance, text){
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
}
