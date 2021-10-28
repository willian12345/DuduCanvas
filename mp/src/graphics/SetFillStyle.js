/**
 * 设置样式类
 * 样式可以是 颜色 或 Pattern
 */
export default class SetFillStyle{
	/**
	 * @param {*} style 颜色值，或 Pattern
	 */
	constructor(style){
		this.style = style
	}
	exec(ctx, instance){
		if(this.style.name === 'CreateLinearGradient' || this.style.name === 'CreateRadialGradient'){
			ctx.fillStyle = this.style.exec(ctx, instance)
		}else{
			ctx.fillStyle = this.style
		}
	}
}