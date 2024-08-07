/**
 * 文本类
 */
import { CubeTextureLoader } from 'XrFrame/loader'
import DisplayObject from './DisplayObject'
import { FillText, needRotation } from './text/FillText'
import SetFillStyle from './text/SetFillStyle'
import SetTextAlign from './text/SetTextAlign'
import SetTextBaseline from './text/SetTextBaseline'

const defaultFontSize = 10

/**
 * Text 文本类
 * 显示文本，支持横、竖排文字，换行
 */
export type TTextParams = { text?: string, font?: string, color?: string, fontSize?: number, fontFamily?: string, fontStretch?: string, fontVariant?: string, fontStyle?: string, fontWeight?: string|number, letterSpace?: number };
export type TTextBlock = {
  lineNum: number,
  rowNumber: number,
  text: string,
  width: number,
  height: number,
  lineGap: number,
  letterSpace: number,
}
// font: font-stretch font-variant font-style font-weight font-size font-family
// 
export default class Text extends DisplayObject {
  name = 'Text'
  // 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
  font = `${defaultFontSize}px sans-serif`
  // 暂时只支持 px 为单位
  protected _fontSize: number = 12
  protected _height = 0
  protected _width = 0
  protected _wrapHeight = -1
  protected _wrapWidth = -1
  protected _writeMode: 'vertical-lr' | 'vertical-rl' | '' = ''
  protected _text = ''
  protected _fontStretch?: string = ''
  protected _fontVariant?: string = ''
  protected _fontStyle?: string  = ''
  protected _fontWeight?: string|number  = ''
  protected _lineGap = 0;
  protected _letterSpace = 0;
  textBlocks: TTextBlock[][] = []
  textAlign: WechatMiniprogram.CanvasRenderingContext.CanvasTextAlign = 'left'
  textBaseline: WechatMiniprogram.CanvasRenderingContext.CanvasTextBaseline = 'top'
  color = '#000'
  private _fontFamily = 'sans-serif';
  constructor(t?: TTextParams) {
    super()
    this._drawGraphics = super._drawGraphics
    this.init(t ?? {})
  }
  init(t: TTextParams) {
    let { text, font, color } = t
    if(t.fontStretch){
      this._fontStretch = t.fontStretch
    }
    if(t.fontVariant){
      this._fontVariant = t.fontVariant
    }
    if(t.fontStyle){
      this._fontStyle = t.fontStyle
    }
    if(t.fontSize){
      this._fontSize = t.fontSize;
    }
    if(t.fontFamily){
      this._fontFamily = t.fontFamily;
    }
    if(t.letterSpace){
      this._letterSpace = t.letterSpace;
    }
    // 如果传入了简写的 font 则直接使用 font 
    if (font) {
      this.font = font
      const _fontSize = font.match(/\d+/)?.[0]
      if (_fontSize) {
        this._fontSize = parseInt(_fontSize)
        this._height = this._fontSize + this.lineGap
      }
    }else{
      this.font = this.getComposedFont();
    }

    this._height = this.fontSize + this.lineGap

    if (!this.fontSize) {
      this.fontSize = defaultFontSize
    }
    if (color) {
      this.color = color
    }
    this.textAlign = 'left'
    this.textBaseline = 'top'
    // 初始化就设置文本
    if (text) {
      this.text = text
    }
  }
  // 凑成 font 减写
  // font: font-stretch font-variant font-style font-weight font-size font-family
  private getComposedFont(){
    return `${this._fontStretch} ${this._fontVariant} ${this._fontStyle} ${this._fontWeight} ${this._fontSize}px ${this._fontFamily}`.trim();
  }
  get text() {
    return this._text
  }
  set text(t) {
    t = String(t)
    this._text = t
    this._height = this.fontSize
  }
  get width() {
    // 设置竖排模式后需要重新计算尺寸
    if (this._writeMode.length > 0) {
      this.calcVerticalSize()
    }else{
      // 如果是横排，则需要计算一下高度
      this._height = this.getTotalHeight();
    }
    return this._width
  }
  set width(w) {
    this._width = w
  }
  get height() {
    return this._height
  }
  set height(h) {
    this._height = h
  }
  get lineGap() {
    return this._lineGap
  }
  set lineGap(h) {
    this._lineGap = h
  }
  get letterSpace() {
    return this._letterSpace
  }
  set letterSpace(v: number) {
    this._letterSpace = v
  }
  /**
   * 限制文本框高度
   * 超过设置的高度则文本换行
   */
  get wrapHeight() {
    return this._wrapHeight
  }
  set wrapHeight(v) {
    this._wrapHeight = v
    this._height = v
  }
  /**
   * 限制文本框宽度
   * 超过设置的宽度则文本换行
   */
  get wrapWidth() {
    return this._wrapWidth
  }
  set wrapWidth(v) {
    this._wrapWidth = v
    this._width = v
    this._height = this.getTotalHeight();
  }
  /**
   * 设置字体大小
   */
  get fontSize() {
    return this._fontSize
  }
  set fontSize(v) {
    this._fontSize = v
    this.font = this.getComposedFont();
    // 设置竖排模式后需要重新计算尺寸
    if (this._writeMode.length > 0) {
      this.calcVerticalSize()
    }else{
      // 如果是横排，则需要计算一下高度
      this._height = this.getTotalHeight();
    }
    // this._width = this.measureWidth(this.text, v)
  }
  get fontFamily(){
    return this._fontFamily
  }
  set fontFamily(v: string){
    this._fontFamily = v
    this.font = this.getComposedFont();
    this._width = this.measureWidth(this.text, this.fontSize)
    this._height = this.fontSize + this.lineGap
  }
  /**
   * 文本横排与竖排模式
   */
  get writeMode() {
    return this._writeMode
  }
  set writeMode(v) {
    this._writeMode = v
    // 设置竖排模式后需要重新计算尺寸
    if (v.length > 0) {
      this.calcVerticalSize()
    }
  }
  assembleOneLine(textArr: string[]){
    const ctx = DisplayObject.getContext()
    this.textBlocks[0] = this.textBlocks[0] ?? [];
    for(let i=0, l=textArr.length;i < l; i++){
      // 测宽度前必须先设置字体大小
      ctx.font = this.font
      let w = ctx.measureText(textArr[i]).width
      this.textBlocks[0].push({
        lineNum: 0,
        rowNumber: i,
        text: textArr[i],
        width: w,
        height: w,
        lineGap: 0,
        letterSpace: 0,
      })
    }
    console.log(this.textBlocks)
  }
  assembleRowText(){
    let textArr = this._text.split('');
    if(this._wrapWidth > -1){

    }else{
      this.assembleOneLine(textArr);
    }
  }
  assembleVerticalText(){
    let textArr = this._text.split('');

    for(let i=0, l=textArr.length;i < l; i++){

    }
  }
  /**
   * 整理文本状态
   */
  collectStatus() {
    // if (this.fontSize) {
    //   this._height = this.fontSize + this.lineGap
    // }
    this._setTextAlign(this.textAlign)
    this._setTextBaseline(this.textBaseline)
    this._setFillStyle(this.color)
    // 收集竖写模式
    if(this._writeMode.length){
      this.assembleVerticalText();
    }else{
      this.assembleRowText();
    }
    
    // this._fillText()
  }
  // 执行指令集
  _draw(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D) {
    this.collectStatus()
    // 优先执行 graphics 指令
    this._drawGraphics(ctx)
    
    this._fillText(ctx)
    if (this.mask && this.mask.name === 'Shape') {
      // this.mask.masked = this
      this._mask?._draw(ctx, true)
    }
  }
  /**
   * setFillStyle 设置文本颜色
   * @param {String} color [description]
   */
  private _setFillStyle(color = 'black') {
    this.color = color
    this._append(new SetFillStyle(color))
    return this
  }
  // fillStyle(color: string) {
  //   return this._setFillStyle(color)
  // }
  /**
   * fillText 绘制文本
   * @param  {String} text 
   * @param  {Number} x    
   * @param  {Number} y    
   */
  private _fillText(ctx) {
    // this._text = text
    // this.x += x
    // this.y += y
    // this._width = this.measureWidth(this._text, this.fontSize)
    // 如果之前有fillText,则需要先清一下之前填文本的命令
    this._remove('FillText')
    // !! 注意 fillText 方法不能放在 setTimeout 或 setInterval 内
    // !! 因为会错过画布更新
    this.textBlocks.forEach(row => {
      row.forEach(_textBlock => {
        console.log( this.x + (_textBlock.rowNumber * _textBlock.width), this.y +  (_textBlock.lineNum * _textBlock.height))
        ctx.fillText(_textBlock.text, this.x + (_textBlock.rowNumber * _textBlock.width), this.y +  (_textBlock.lineNum * _textBlock.height))
        // this._append(new FillText()
      })
    })
    
    return this
  }
  
  /**
   * setTextBaseline 设置文字垂直对齐方式，推荐 top 顶部对齐比较好算
   * @param { String } textBaseline top	顶部对齐	 bottom	底部对齐	middle	居中对齐	normal 默认（基线对齐）
   */
  private _setTextBaseline(textBaseline: WechatMiniprogram.CanvasRenderingContext.CanvasTextBaseline) {
    this.textBaseline = textBaseline
    this._append(new SetTextBaseline(textBaseline))
    return this
  }
  /**
   * [setTextAlign 设置文本水平对齐方式]
   * @param { String } textAlign [left, center, right]
   */
  private _setTextAlign(textAlign: WechatMiniprogram.CanvasRenderingContext.CanvasTextAlign) {
    this.textAlign = textAlign
    this._append(new SetTextAlign(textAlign))
    return this
  }
  
  /**
   * 计算文本宽度
   * @param {*} text 
   * @param {*} fontSize 
   */
  measureWidth(text: string, fontSize: number) {
    let w
    if (!text) {
      return 0
    }
    if (this.writeMode.length) {
      w = fontSize
    } else {
      const ctx = DisplayObject.getContext()
      // 测宽度前必须先设置字体大小
      ctx.font = this.font
      w = ctx.measureText(text).width
    }
    if(this._letterSpace > 0 && text.length > 1){
      w += ( text.length - 1 )  * this._letterSpace;
    }
    return w
  }
  // 初始化竖排文本时的整体宽与高属性
  calcVerticalSize() {
    if (this.text.length) {
      const { width, height } = this.getVerticalSize()
      this._width = width
      this._height = height
    }
  }
  // 计算竖排文本时的整体文本宽,高
  getVerticalSize() {
    const fontSize = this._fontSize
    // 如果
    const lineGap = this._lineGap
    // 单个字的行间距，如果竖写模式则不需要垂直间距，设为 0
    const charLineGap = this._writeMode.length ? 0 : this._lineGap
    const wrapHeight = this._wrapHeight
    const halfFont = fontSize * .5
    let  h = 0
    let height = this._height
    let width = this._width
    let offset = 0
    // 二维数组存放每个字文本与文本高度信息
    let arr: { text: string, height: number }[][] = []
    // 二维数组游标，可代表当前指向哪一行
    let arrIndex = 0
    // 计算每个字高度
    this.text.split('').map((v) => {
      let charHeight = 0
      if (needRotation(v)) {
        charHeight = halfFont + charLineGap + this._letterSpace
      } else {
        charHeight = fontSize + charLineGap + this._letterSpace
      }
      h += charHeight
      offset += charHeight
      
      if (wrapHeight !== -1 && (offset) > wrapHeight) {
        arrIndex++
        offset = 0
      }
      if(offset > 0){
        charHeight += this._letterSpace
      }
      arr[arrIndex] = arr[arrIndex] || []
      arr[arrIndex].push({ text: v, height: charHeight })
    })
    
    if (wrapHeight === -1) {
      width = fontSize
      height = h
    }else{
      height = wrapHeight
      width = (arr.length * fontSize) + (arr.length * lineGap - lineGap)
    }
    // 可优化点，此处计算出的文本单字可以直接用于 fillText 类内
    return { width, height }
  }
  // 获取受限宽度下的文本整体高度，因为有可能会换行
  getTotalHeight() {
    const ctx = DisplayObject.getContext()
    const wrapWidth = this._wrapWidth
    const fontSize = this._fontSize
    const text = this._text
    // i 列 colomn， j 为行(row)
    let i = 0, j = 0, t = null, lineWidth = 0
    let arr = []
    while (t = text[i]) {
      // 根据每个单字计算字符宽度 !! 需要优化
      ctx.font = this.font
      lineWidth += ctx.measureText(t).width
      //  * (fontSize / defaultFontSize)
      if (lineWidth <= wrapWidth) {
        arr[j] ? arr[j] += text[i] : arr[j] = text[i]
      } else {
        lineWidth = 0
        j++
      }
      i++
    }

    // todo: 可优化点，此处计算出的文本单字可以直接用于 fillText 类内
    // 高度 = 文本行数 * 字体大小 + 行间距
    const h = arr.length * fontSize + (arr.length * this.lineGap - this.lineGap)
    return h
  }
  addChild() {
    throw new Error('不能给 Text 类添加子元素')
  }
}