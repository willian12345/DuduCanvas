/**
 * 私有方法名
 * 使用 Symbol 对象作为私有方法名
 */
export declare const draw: unique symbol;
export declare const drawImage: unique symbol;
export declare const getAlpha: unique symbol;
export declare const append: unique symbol;
export declare const remove: unique symbol;
export declare const instructions: unique symbol;
export declare const drawGraphics: unique symbol;
export declare const prefix: any;
/**
 * 获取图片信息
 * 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单
 * https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html
 */
export declare const getImageInfo: any;
export declare const createSelectorQuery: any;
export declare const createCanvasContext: any;
