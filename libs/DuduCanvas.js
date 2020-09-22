import Group from './Group.js'
import Shape from './Shape.js'
import Stage from './Stage.js'
import Text from './Text.js'
import Image from './Image.js'
import ImgLoader from './ImgLoader.js'
import Sprite from './Sprite.js'
import base64src from './base64src.js'


export default {
	load: imgArr => {
		return new ImgLoader(imgArr)
	},
	Stage: (id, callback, page) => {
		return new Stage(id, (ctx, stage)=>{
			callback(ctx, stage)
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
	Sprite: (img, sliceBound) => {
		return new Sprite(img, sliceBound)
	},
	base64: str => {
		return base64src(str)
	}
}
