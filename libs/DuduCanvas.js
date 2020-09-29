import Group from './Group.js'
import Shape from './Shape.js'
import Stage from './Stage.js'
import Text from './Text.js'
import Image from './Image.js'
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
	Image: args => {
		return new Image(args)
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
