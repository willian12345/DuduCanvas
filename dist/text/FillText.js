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
];
export function needRotation(char) {
    var _a;
    let codePoint = (_a = char.codePointAt(0)) !== null && _a !== void 0 ? _a : -1;
    for (let [lowerBound, upperBound] of NO_ROTATION_RANGE) {
        if (lowerBound <= codePoint && codePoint <= upperBound) {
            return false;
        }
    }
    return true;
}
/**
 *  文本绘制命令
 */
export class FillText {
    constructor(text, x, y) {
        this.name = 'FillText';
        this.text = '';
        this.text = text;
        this.x = x;
        this.y = y;
    }
    exec(ctx, instance) {
        this.instance = instance;
        ctx.font = instance.font;
        ctx.fillText(this.text, 0, 0);
    }
}
