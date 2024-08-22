/**
 * 文本类
 */
import DisplayObject, { TContext2d } from './DisplayObject'
import { FillText } from './text/FillText'
import SetFillStyle from './text/SetFillStyle'
import SetTextAlign from './text/SetTextAlign'
import SetTextBaseline from './text/SetTextBaseline'

const defaultFontSize = 10
// const ROTATE_90DEG = 1.5707963267948966
/**
 * Text 文本类
 * 显示文本，支持横、竖排文字，换行
 * 单字宽高直接使用 fontSize 所以非中文字体会有问题
 */
export type TTextParams = { text?: string, font?: string, color?: string, fontSize?: number, fontFamily?: string, fontStretch?: string, fontVariant?: string, fontStyle?: string, fontWeight?: string | number, letterSpace?: number };
export type TTextBlock = {
  rowNum: number,
  columnNum: number,
  text: string,
  width: number,
  height: number,
  lineGap: number,
  letterSpace: number,
}

export type TElementListItem = {
  value: string;
  style: {
    width: number;
    height: number;
    ascent: number;
    descent: number;
  };
}
export type TRow = {
  width: number,
  height: number,
  originHeight: number,
  elementList: TElementListItem[]
}
// font: font-stretch font-variant font-style font-weight font-size font-family
// 
export default class Text extends DisplayObject {
  name = 'Text'
  // 当前字体样式的属性。符合 CSS font 语法 的 DOMString 字符串，至少需要提供字体大小和字体族名。默认值为 10px sans-serif
  font = `${defaultFontSize}px sans-serif`
  // 暂时只支持 px 为单位
  protected _fontSize: number = 12
  protected _width = 0
  protected _height = 0
  protected _wrapHeight = -1
  protected _wrapWidth = -1
  protected _writeMode: 'vertical-lr' | 'vertical-rl' | '' = ''
  protected _text = ''
  protected _fontStretch?: string = ''
  protected _fontVariant?: string = ''
  protected _fontStyle?: string = ''
  protected _fontWeight?: string | number = ''
  protected _lineGap = 0;
  protected _letterSpace = 0;
  private _lineHeight = 1.5
  test: string[] = []
  rows: TRow[] = []
  textBlocks: TTextBlock[][] = []
  textAlign: WechatMiniprogram.CanvasRenderingContext.CanvasTextAlign = 'left'
  textBaseline: WechatMiniprogram.CanvasRenderingContext.CanvasTextBaseline = 'top'
  color = '#000'
  private _fontFamily = 'sans-serif';
  get width(): number {
    return this._width;
  }
  get height(): number {
    if (this._needComposeText()) {
      this._assembleText();
    }
    return this._height;
  }
  set height(v: number) {
    this._height = v;
  }
  constructor(t?: TTextParams) {
    super()
    this._drawGraphics = super._drawGraphics
    this.init(t ?? {})
    this.test.push('hellworld');
  }
  init(t: TTextParams) {
    let { text, font, color } = t
    if (t.fontStretch) {
      this._fontStretch = t.fontStretch
    }
    if (t.fontVariant) {
      this._fontVariant = t.fontVariant
    }
    if (t.fontStyle) {
      this._fontStyle = t.fontStyle
    }
    if (t.fontSize) {
      this._fontSize = t.fontSize;
      this._height = t.fontSize;
    }
    if (t.fontFamily) {
      this._fontFamily = t.fontFamily;
    }
    if (t.letterSpace) {
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
    } else {
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
      this._width = this.getWidth()
    }
  }
  private getWidth() {
    const ctx = DisplayObject.getContext()
    // 测宽度前必须先设置字体大小
    ctx.font = this.font
    let w = ctx.measureText(this._text).width
    return w;
  }
  // 凑成 font 减写
  // font: font-stretch font-variant font-style font-weight font-size font-family
  private getComposedFont() {
    return `${this._fontStretch} ${this._fontVariant} ${this._fontStyle} ${this._fontWeight} ${this._fontSize}px ${this._fontFamily}`.trim();
  }
  get text() {
    return this._text
  }
  set text(t) {
    t = String(t)
    this._text = t
    this.textBlocks = [];
    this._width = this.getWidth();
    // console.log(this._width)
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
    this.height = v
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
    this._height = this._fontSize;
  }
  get fontFamily() {
    return this._fontFamily
  }
  set fontFamily(v: string) {
    this._fontFamily = v
    this.font = this.getComposedFont();
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
      // this._assembleText();
    }
  }
  assembleOneLine(textArr: string[]) {
    this.textBlocks = [];
    this.textBlocks[0] = this.textBlocks[0] ?? [];
    let sumWidth = 0;
    for (let i = 0, l = textArr.length; i < l; i++) {
      // 测宽度前必须先设置字体大小
      // ctx.font = this.font
      // let w = ctx.measureText(textArr[i]).width
      let w = this._fontSize
      sumWidth += w + this._letterSpace;
      this.textBlocks[0].push({
        rowNum: 0,
        columnNum: i,
        text: textArr[i],
        width: w,
        height: w,
        lineGap: this._lineGap,
        letterSpace: this._letterSpace,
      })
    }
    this._width = sumWidth - this._letterSpace;
    this._height = this._fontSize + this._lineGap;
  }
  assembleMultiLine(textArr: string[]) {
    this.textBlocks = [];
    this.textBlocks[0] = this.textBlocks[0] ?? [];
    let widthSum = 0;
    let widthBound = this._wrapWidth;
    let rowNum = 0;
    let columnNum = 0;

    for (let i = 0, l = textArr.length; i < l; i++) {
      let w = this._fontSize;
      // 留出
      if (widthSum + w > widthBound) {
        rowNum++;
        widthSum = 0;
        columnNum = 0;
      }
      this.textBlocks[rowNum] = this.textBlocks[rowNum] ?? [];
      this.textBlocks[rowNum].push({
        rowNum: rowNum,
        columnNum: columnNum,
        text: textArr[i],
        width: w,
        height: w,
        lineGap: this._lineGap,
        letterSpace: this._letterSpace,
      })
      widthSum += w + this._letterSpace;
      columnNum++;
    }
    this._width = this._wrapWidth;
    this._height = (this._fontSize + this._lineGap) * this.textBlocks.length;
  }
  assembleMultiLineVertical(textArr: string[]) {
    this.textBlocks = [];
    this.textBlocks[0] = this.textBlocks[0] ?? [];
    let heightSum = 0;
    let heightBound = this._wrapHeight;

    let rowNum = 0;
    let columnNum = 0;
    // 最大列数
    let maxColumnNum = columnNum;
    for (let i = 0, l = textArr.length; i < l; i++) {
      let w = this._fontSize;
      if (heightSum > heightBound) {
        columnNum++;
        heightSum = 0;
        rowNum = 0;
      }
      if (columnNum > maxColumnNum) {
        maxColumnNum = columnNum
      }

      this.textBlocks[rowNum] = this.textBlocks[rowNum] ?? [];
      this.textBlocks[rowNum].push({
        rowNum: rowNum,
        columnNum: columnNum,
        text: textArr[i],
        width: w,
        height: w,
        lineGap: this._lineGap,
        letterSpace: this._letterSpace,
      })
      heightSum += this._fontSize + this._lineGap;
      rowNum++;
    }
    // 如果是从右向左写，则需要将 textBlocks 数组内每行数组内容反一反，且重新调整 columnNum 值
    if (this._writeMode === 'vertical-rl') {
      this.textBlocks = this.textBlocks.map(textBlockRow => {
        textBlockRow.forEach((textBlock, index) => {
          textBlock.columnNum = maxColumnNum - index
        })
        return textBlockRow.reverse();
      })
    }
    this._width = (this._fontSize + this._letterSpace) * (maxColumnNum + 1);
    this._height = this._wrapHeight
  }
  assembleRowText() {
    let textArr = this._text.split('');
    if (this._wrapWidth > -1) {
      this.assembleMultiLine(textArr)
    } else {
      this.assembleOneLine(textArr);
    }
  }
  assembleOneLineVertical(textArr: string[]) {
    this.textBlocks = [];
    this.textBlocks[0] = this.textBlocks[0] ?? [];
    for (let i = 0, l = textArr.length; i < l; i++) {
      let w = this._fontSize;
      this.textBlocks[0].push({
        rowNum: i,
        columnNum: 0,
        text: textArr[i],
        width: w,
        height: w,
        lineGap: 0,
        letterSpace: 0,
      })
    }
    this._width = this._fontSize;
    this._height = (this._fontSize + this._lineGap) * this.text.length;
  }
  assembleVerticalText() {
    let textArr = this._text.split('');
    if (this.wrapHeight > -1) {
      this.assembleMultiLineVertical(textArr);
    } else {
      this.assembleOneLineVertical(textArr)
    }
  }
  /**
   * 整理文本状态
   */
  collectStatus() {
    this._setTextAlign(this.textAlign)
    this._setTextBaseline(this.textBaseline)
    this._setFillStyle(this.color)
    if (!this._needComposeText()) {
      this._fillText();
    }
  }
  // 是否需要进行文本组装
  private _needComposeText() {
    return this._letterSpace > 0 || this._writeMode.length > 0 || this._wrapWidth > -1;
  }
  _assembleText() {
    // 收集竖写模式
    if (this._writeMode.length) {
      this.assembleVerticalText();
    } else {
      this.assembleRowText();
    }
  }

  // 计算行渲染数据
  computeRows(ctx: TContext2d) {
    // 实际内容可用宽度
    let contentWidth = this._wrapWidth

    // 行数据
    this.rows.push({
      width: 0,
      height: 0,
      originHeight: 0,
      elementList: [],
    })

    this.text.split('').forEach(value => {
      ctx.font = this.font
      let { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
        ctx.measureText(value)
      // 尺寸信息
      let style = {
        width,
        height: actualBoundingBoxAscent + actualBoundingBoxDescent,
        ascent: actualBoundingBoxAscent,
        descent: actualBoundingBoxDescent
      }
      // 完整数据
      let element = {
        value,
        style,
      }

      // 判断当前行是否能容纳
      let curRow = this.rows[this.rows.length - 1]
      if (curRow.width + style.width <= contentWidth && value !== '\n') {
        curRow.elementList.push(element)
        curRow.width += style.width
        // 保存加上 lineGap 后的高度
        curRow.height = Math.max(curRow.height, style.height + this._lineGap)
        // 保存原始最高的文本高度
        curRow.originHeight = Math.max(curRow.originHeight, style.height) 
      } else {
        this.rows.push({
          width: style.width,
          height: style.height + this._lineGap,
          originHeight: style.height,
          elementList: [element]
        } )
      }
    })
    console.log(this.rows);
  }
  renderRows(ctx: TContext2d) {
    let renderHeight = this.y;
    this.rows.forEach((row) => {
      let renderWidth = this.x;
      // 辅助线
      ctx.moveTo(this.x, renderHeight + row.height)
      ctx.lineTo(400, renderHeight + row.height)
      ctx.stroke()
      row.elementList.forEach((item: TElementListItem) => {
        // 跳过换行符
        if (item.value === '\n') {
          return
        }
        ctx.save()
        // 渲染文字
        ctx.font = this.font
        ctx.fillText(item.value, renderWidth, renderHeight + (row.height - row.originHeight) / 2)
        // 更新当前行绘制到的宽度
        renderWidth += item.style.width
        ctx.restore()
      })
      renderHeight += row.height
    })
  }
  // 执行指令集
  _draw(ctx: TContext2d) {
    this.collectStatus()
    // 优先执行 graphics 指令
    this._drawGraphics(ctx)
    // 如果需要排版则需要进行文本组装
    if (this._needComposeText()) {
      this.computeRows(ctx);
      this.renderRows(ctx);
      // this._assembleText();
      // this._composeText(ctx)
    }

    if (this.mask && this.mask.name === 'Shape') {
      this.mask.masked = this
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
  /**
  * fillText 绘制文本
  * @param  {String} text 
  * @param  {Number} x    
  * @param  {Number} y    
  */
  private _fillText() {
    // 如果之前有fillText,则需要先清一下之前填文本的命令
    this._remove('FillText');
    this._append(new FillText(this._text, this.x, this.y))
    return this
  }

  private _composeText(ctx: WechatMiniprogram.CanvasRenderingContext.CanvasRenderingContext2D) {

    // 如果是复杂排版,则 textAlign 不起作用,直接默认为左侧
    ctx.textAlign = 'left'
    let maxColumn = 0;
    let minColumn = 0;
    this.textBlocks.forEach(tb => {
      const l = tb.length;
      if (minColumn === 0) {
        minColumn = l;
      }
      if (l > maxColumn) {
        maxColumn = l;
      }
      if (l < minColumn) {
        minColumn = l;
      }
    })

    const maxColumnRows = this.textBlocks.filter((tb) => {
      return tb.length > minColumn
    })


    this.textBlocks.forEach(row => {
      let extraX = 0
      let extraY = 0;
      // console.log((maxColumnNum - row.length) )
      if (this.textAlign === 'center') {
        if (!this._writeMode.length && row.length < maxColumn) {
          extraX = (maxColumn - row.length) * (this._fontSize + this._letterSpace) * .5;
        }
      }
      row.forEach((_textBlock, column) => {
        if (this._writeMode.length) {
          if (column === maxColumn - 1) {
            const diff = this.textBlocks.length - maxColumnRows.length
            extraY = diff * (this._fontSize + this._lineGap) * .5;
          } else {
            extraY = 0;
          }
        }
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        const left = this.x + (_textBlock.columnNum * (_textBlock.width + this._letterSpace)) + extraX;
        const top = this.y + (_textBlock.rowNum * (_textBlock.height + this._lineGap)) + extraY;
        ctx.font = this.font
        ctx.fillText(_textBlock.text, left, top)
        ctx.restore();
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
  addChild() {
    throw new Error('不能给 Text 类添加子元素')
  }
}