import DisplayObject from './DisplayObject.js'
import Container from './Container.js'
import Shape from './Shape.js'
import Stage from './Stage.js'
import Text from './Text.js'
let context = null
export default {
	Stage: (id, callback, page) => {
		return new Stage(id, (ctx, stage)=>{
			context = ctx
			callback(ctx, stage)
		}, page)
	},
	Shape: () => {
		return new Shape()
	},
	Container: () => {
		return new Container()
	},
	Text: (t) => {
		return new Text(t)
	}
}
