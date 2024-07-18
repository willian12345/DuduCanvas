import DisplayObject from './DisplayObject.js'
import { draw, createSelectorQuery } from './config'
const render = Symbol('render')
/**
 * Stage
 * 舞台对象
 * 所有显示对象都在舞台对象下，舞台通过渲染函数 
 * Stage 的 render 发起所有子元素的 draw 方法调用
 * 子元素自身再递归调用子元素 draw 方法
 */
export default class Stage extends DisplayObject {
	/**
	 * 
	 * @param {*} id canvas id
	 * @param {*} callback 初始化舞台后的回调
	 * @param {*} componentInstance 如果是在自定义组件内，则需要将组件实例 this 传进来
	 */
	constructor(id, {width, height}, componentInstance) {
	  super()
    return new Promise((resolve) => {
      const query = componentInstance ? createSelectorQuery().in(componentInstance) : createSelectorQuery()
      query.select(id) 
      .node(async ({node}) => {
        const canvas = node;
          const context = canvas.getContext('2d')
          const canvasWidth = width;
          const canvasHeight = height;
          context.canvas.width = canvasWidth;
          context.canvas.height = canvasHeight
          this.width = canvasWidth
          this.height = canvasHeight
          this.context = context
          this.canvas = canvas;
          
          DisplayObject.setContext(this.context)	
          // await callback(this, canvas, this.context)
          // // 自动调用一次渲染
          // this[render]()
          resolve(this)
      })
      .exec()
    })
	}
	name = 'Stage'
	canvas = null
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
		this[render]()
	}
	[render](){
		this.context.clearRect(0, 0, this.width, this.height)
		// 调用 canvas draw 方法渲染图像
		this[draw]()
	}
}
