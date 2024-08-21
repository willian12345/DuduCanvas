import { getPosAfterRotation, getMaxValue, findNodes } from './utils'
import Graphics from './graphics/index'
import Shape from './Shape'
import Matrix2D from './Matrix'
export type TContext2d = WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D

let context!: TContext2d
let displayObjectId = 0
let debug = false;

/**
 * 显示对象类
 */

export default class DisplayObject extends Graphics {
  _id: number
  protected _mask: Shape | null = null
  name = 'DisplayObject'
  x = 0
  y = 0
  protected _width = 0
  protected _height = 0
  alpha = 1
  regX = 0
  regY = 0
  scaleX = 1
  scaleY = 1
  skewX = 0
  skewY =  0
  rotation = 0
  parent: DisplayObject | null = null
  shadow = ''
  isMask = false
  masked: DisplayObject | null = null
  protected _scale: number
  zIndex = 0
  matrix: Matrix2D
  transformMatrix?: Matrix2D 
  constructor() {
    super()
    this._drawGraphics = super._drawGraphics
    this._scale = 1
    this._id = displayObjectId++
    this.matrix = new Matrix2D();
  }
  get width(): number {
    return this._width;
  }

  set width(value: number) {
    this._width = value;
  }
  get height(): number {
    return this._height;
  }

  set height(value: number) {
    this._height = value;
  }
  get mask() {
    return this._mask
  }
  set mask(s: Shape | null) {

    if (s?.name !== 'Shape') {
      throw new Error('遮罩必须是 Shape 对象')
    }
    s && (s.isMask = true)
    this._mask = s
  }
  get scale() {
    return this._scale
  }
  set scale(s) {
    this.scaleX = s
    this.scaleY = s
    this._scale = s
  }

  /**
   * 保存 Stage 时传入 canvas context
   */
  static setContext(ctx: TContext2d) {
    context = ctx
  }
  static getContext() {
    return context
  }
  static setDebug(_debug: boolean) {
    debug = _debug
  }
  getMatrix(matrix: Matrix2D) {
    var o = this, mtx = matrix || new  Matrix2D();
		return o.transformMatrix ?  mtx.copy(o.transformMatrix) :
			(mtx.identity() && mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.regX, o.regY));
	}
  updateContext(context: TContext2d) {
    let mtx = this.matrix; 
    this.getMatrix(this.matrix);
    // console.log(this.matrix, this)
    var tx = mtx.tx, ty = mtx.ty;
    context.transform(mtx.a, mtx.b, mtx.c, mtx.d, tx, ty);
    context.globalAlpha *= this.alpha;
    
    // 如果有遮罩，需要提前绘制
    if(this._mask){
      const mtx = this.matrix;
      // 复制此显示对象 matrix 至遮罩 matrix
      this._mask.getMatrix(this.matrix);
    	context.transform(mtx.a,  mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
      this._mask._draw(context);
      context.clip();
    }
    // if (this.compositeOperation) { context.globalCompositeOperation = o.compositeOperation; }
  }
  draw(context: TContext2d){
    this._draw(context);
  }
  // 绘制
  protected _draw(_context: TContext2d) { }
  /**
   * setShadow
   * 添加阴影效果， 遮罩(clip)过的对象不支持 shadow 效果
   * @param {*} shadow "10 10 10 black"
   */
  protected _setShadow(el: DisplayObject) {
    const valueArr = el.shadow.split(' ')
    if (el.name === 'Sprite' || el.name === 'Group') {
      throw new Error('Sprite 或 Group 组件对象不允许设置 shadow')
    }
    if (valueArr.length < 4) {
      throw new Error('shadow 需要 4 个值 eg: "10 10 10 black"')
    }
    context.shadowOffsetX = parseFloat(valueArr[0]);
    context.shadowOffsetY = parseFloat(valueArr[1]);
    context.shadowBlur = parseFloat(valueArr[2]);
    context.shadowColor = valueArr[3];
  }
  /**
   * 获取元素透明度
   */
  protected _getAlpha() {
    let parent = this.parent
    let alpha = this.alpha
    while (parent && parent.name != 'Stage') {
      alpha *= parent.alpha
      parent = parent.parent
    }
    return alpha
  }
  /**
   * getPosition 获取实例距画布左上角原点(0,0)的绝对位置
   * @return {[x, y]} 返回数组
   */
  getPosition(): [number, number] {
    let parent
    // 如果自身是 mask 则坐标取被遮罩的对象为父级
    if (this.isMask) {
      parent = this.masked
    } else {
      parent = this.parent
    }
    let x = this.x - this.regX, y = this.y - this.regY
    // console.log(x)
    while (parent && parent.name != 'Stage') {
      x += parent.x - parent.regX
      y += parent.y - parent.regY
      parent = parent.parent
    }
    return [x, y]
  }
  /**
   * 获取旋转角度
   */
  getRotation() {
    // 角度不需要根据父级计算叠加
    // let parent = this.parent
    let rotation = this.rotation
    // while(parent && parent.name != 'Stage'){
    // 	rotation = parent.rotation
    // 	parent = parent.parent
    // }
    return rotation
  }
  /**
   * 获取缩放程度
   */
  getScale() {
    let parent = this.parent
    let scaleX = this.scaleX
    let scaleY = this.scaleY
    while (parent && parent.name != 'Stage') {
      scaleX += parent.scaleX
      scaleY += parent.scaleY
      parent = parent.parent
    }
    return [scaleX, scaleY]
  }
  getRectangleRotatedPosition(rotation: number, w: number, h: number, regX: number, regY: number) {
    // 获取左上、右上、右下，左下绕自身注册点旋转后的坐标
    // left top
    let lt = getPosAfterRotation(rotation, -regX, -regY)
    // right top
    let rt = getPosAfterRotation(rotation, w - regX, -regY)
    // right bottom
    let rb = getPosAfterRotation(rotation, w - regX, h - regY)
    // left bottom
    let lb = getPosAfterRotation(rotation, -regX, h - regY)

    return [lt, rt, rb, lb]
  }
  /**
   * 获取对象形变后的相较于舞台的绝对位置与宽度
   * scale 形变不在 getBounds 计算之内
   * scale 形变后宽高可请自行乘上相应的 scale 倍数
   */
  _getBounds() {

    let [x, y] = this.getPosition()
    let w = this.width
    let h = this.height
    let regX = this.regX
    let regY = this.regY
    if (this.rotation !== 0) {
      let arr = this.getRectangleRotatedPosition(this.rotation, w, h, regX, regY)
      // 相对坐标+原本的 x y 值成为绝对坐标
      arr = arr.map(v => {
        return { ...v, x: v.x + x + regX, y: v.y + y + regY }
      })

      // 获取最左，最右，最上最下 坐标
      let [minX, minY, maxX, maxY] = getMaxValue(arr)
      w = maxX - minX
      h = maxY - minY
      x = minX
      y = minY
    } else {
      // 如果对象没有旋转，则简单获取对象的 x y
      x = x
      y = y
    }

    return { left: x, top: y, right: x + w, bottom: y + h, width: w, height: h }
  }
  // 寻找所有子元素的 bounds 边界宽高并存入数组
  findNodesBounds(node: DisplayObject) {
    return findNodes(node).map(v => {
      return v._getBounds()
    })
  }
  // 获取元素的绝对宽度
  protected getBounds(): {
    left: number;
    top: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
  } | null {
    // 如果没有子元素，则直接返回自身的宽度
    if (this.childs.length === 0) {
      return this._getBounds()
    } else {
      let bounds = this.findNodesBounds(this)

      const l: number[] = []
      const r: number[] = []
      const t: number[] = []
      const b: number[] = []
      bounds.forEach((v) => {
        l.push(v.left)
        r.push(v.right)
        t.push(v.top)
        b.push(v.bottom)
      })

      const left = Math.min(...l)
      const right = Math.max(...r)
      const top = Math.min(...t)
      const bottom = Math.max(...b)

      if (this.name === 'Group') {
        // 计算子元素合并宽高后，再继续计算整体旋转后的大小位置
        const rect = new DisplayObject()
        rect.width = right - left
        rect.height = bottom - top
        rect.x = this.x
        rect.y = this.y
        rect.regX = this.regX
        rect.regY = this.regY
        rect.rotation = this.rotation
        return this._getBounds.call(rect)
      } else {
        return { left, top, right, bottom, width: right - left, height: bottom - top }
      }
    }

  }
}
