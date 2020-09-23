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
	exec(ctx){
		ctx.fillStyle = this.style
	}
}