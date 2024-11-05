import DisplayObject from './DisplayObject'
import SimpleCss from './SimpleCss';
/**
 * Stage
 * 舞台对象
 * 所有显示对象都在舞台对象下，舞台通过渲染函数 
 * Stage 的 render 发起所有子元素的 draw 方法调用
 * 子元素自身再递归调用子元素 draw 方法
 */
export default class Stage extends SimpleCss {
	/**
	 * 
	 * @param {*} id canvas id
	 * @param {*} callback 初始化舞台后的回调
	 * @param {*} componentInstance 如果是在自定义组件内，则需要将组件实例 this 传进来
	 */
  context!: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D
	constructor(canvas: WechatMiniprogram.Canvas, {width, height}: {width: number, height: number}) {
    super()
    this.context = canvas.getContext('2d')!;
    const canvasWidth = width;
    const canvasHeight = height;
    this.context.canvas.width = canvasWidth;
    this.context.canvas.height = canvasHeight
    this.width = canvasWidth
    this.height = canvasHeight
    this.canvas = canvas;
    DisplayObject.setContext(this.context)
	}
	name = 'Stage'
	canvas: WechatMiniprogram.Canvas
	/**
	 * 获取 canvas 上下文
	 */
	getContext(){
		return this.context
	}
	/**
	 * 重新渲染舞台
	 */
	update(){
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.save()
    this.updateContext(this.context)
    this._render()
    this.context.restore();
    
	}
	private _render(){
		this.context.clearRect(0, 0, this.width, this.height)
    // 调用 canvas draw 方法渲染图像
    this.draw(this.context)
    
	}
}
