import CreateLinearGradient from "../color/CreateLinearGradient"
import CreateRadialGradient from "../color/CreateRadialGradient"
import DisplayObject from "../DisplayObject"

/**
 * 设置样式类
 * 样式可以是 颜色 或 Pattern
 */
export type TStyle = string | CreateLinearGradient | CreateRadialGradient
export default class SetFillStyle{
	/**
	 * @param {*} style 颜色值，或 Pattern
	 */
    style: TStyle
	constructor(style: TStyle){
		this.style = style
	}
	exec(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D, instance: DisplayObject){
        if(typeof this.style === 'string'){
            return ctx.fillStyle = this.style
        }
        return ctx.fillStyle = this.style.exec(ctx, instance)
	}
}