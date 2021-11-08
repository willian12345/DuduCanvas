/**
 * 私有方法名
 * 使用 Symbol 对象作为私有方法名
 */
export const draw = Symbol('draw')
export const drawImage = Symbol('drawImage')
export const getAlpha = Symbol('getAlpha')
export const append = Symbol('append')
export const remove = Symbol('remove')
export const instructions = Symbol('instructions')
export const drawGraphics = Symbol('drawGraphics')




/**
 * 兼容各小程序平台
 */
function getPrefix(){
  let prefix = ''
  if(typeof uni !== 'undefined'){
    // uniapp
    prefix = uni
  }else if(typeof wx  !== 'undefined'){
    // 微信小程序
    prefix = wx
  }else if(typeof my  !== 'undefined'){
    // 支付宝小程序
    prefix = my
  }else if(typeof tt  !== 'undefined'){
    // 字节跳动
    prefix = tt
  }
  return prefix
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