import Text from "../Text"

// 旋转 90 弧度 直接得出常数 (90 * Math.PI / 180) 免于实时计算
// const ROTATE_90DEG = 1.5707963267948966
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
	instance!: Text
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
    ctx.font = instance.font
    ctx.fillText(this.text, 0, 0)
	}
}
