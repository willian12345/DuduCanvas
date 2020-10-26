/**
 * 私有方法名
 * 使用 Symbol 对象作为私有方法名
 */
export const draw = Symbol('draw')
export const getAlpha = Symbol('getAlpha')





/**
 * 兼容各小程序平台
 */
function getPrefix(){
  let suffix = ''
  if(typeof uni !== 'undefined'){
    // uniapp
    suffix = uni
  }else if(typeof wx  !== 'undefined'){
    // 微信小程序
    suffix = wx
  }else if(typeof my  !== 'undefined'){
    // 支付宝小程序
    suffix = my
  }else if(typeof tt  !== 'undefined'){
    // 字节跳动
    suffix = tt
  }
  return suffix
}


export const prefix = getPrefix()

/**
 * 获取图片信息
 * 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单
 * https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html
 */
export const getImageInfo = prefix['getImageInfo']

export const createSelectorQuery = prefix['createSelectorQuery']

export const createCanvasContext = prefix['createCanvasContext']