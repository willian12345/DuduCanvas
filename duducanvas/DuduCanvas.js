/**
 * 一次引入全部开放类至 DuduCanvas 对象内，方便使用
 * eg:
 * const t1 = DuduCanvas.Text({text: '你好世界'})
 * 
 */
import Group from './Group.js'
import Shape from './Shape.js'
import Stage from './Stage.js'
import Text from './Text.js'
import ImageDudu from './ImageDudu.js'
import ImgLoader from './ImgLoader.js'
import Sprite from './Sprite.js'
import base64src from './base64src.js'

import CreateLinearGradient from './color/CreateLinearGradient'
import CreateRadialGradient from './color/CreateRadialGradient'


export default {
	load: imgArr => {
		return new ImgLoader(imgArr)
	},
	Stage: (id, callback, page) => {
		return new Stage(id, (...args)=>{
			callback(...args)
		}, page)
	},
	Shape: () => {
		return new Shape()
	},
	Group: () => {
		return new Group()
	},
	Text: t => {
		return new Text(t)
	},
	ImageDudu: args => {
		return new ImageDudu(args)
	},
	Sprite: (...args) => {
		return new Sprite(...args)
	},
	base64: str => {
		return base64src(str)
	},
	color: {
		createLinearGradient (...args) {
			return new CreateLinearGradient(...args)
		},
		createRadialGradient (...args) {
			return new CreateRadialGradient(...args)
		}
	}
}
