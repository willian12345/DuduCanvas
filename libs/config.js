/**
 * 私有方法名
 * 使用 Symbol 对象作为私有方法名
 */
export const draw = Symbol('draw')
export const getAlpha = Symbol('getAlpha')


/**
 * 获取图片信息
 * 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单
 * https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html
 */

export const getImageInfo = (function(){
  try{
    return uni.getImageInfo
  }catch(e){}

  try{
    return wx.getImageInfo
  }catch(e){}

  try{
    return my.getImageInfo
  }catch(e){}

  try{
    return tt.getImageInfo
  }catch(e){}
})()