// 私有方法名 draw
export const draw = Symbol('draw')

export const getAlpha = Symbol('getAlpha')



/**
 * 获取图片信息
 * 如果要获取网络图片的信息，需要预先在开发者平台配置 download 的域名白名单
 * https://developers.weixin.qq.com/miniprogram/dev/api/media/image/wx.getImageInfo.html
 */
let getImageInfoFunction = null
const _getImageInfo = function(){
  if(getImageInfoFunction) return getImageInfoFunction

  try{
    return getImageInfoFunction = uni.getImageInfo
  }catch(e){}

  try{
    return getImageInfoFunction = wx.getImageInfo
  }catch(e){}

  try{
    return getImageInfoFunction = my.getImageInfo
  }catch(e){}

  try{
    return getImageInfoFunction = tt.getImageInfo
  }catch(e){}
}
export const getImageInfo = _getImageInfo()