import DisplayObject from './DisplayObject'


class SetFontSize {
	constructor(size){
		this.size = size
	}
	exec(ctx){
		ctx.setFontSize(this.size)
	}
}
class SetFillStyle {
	constructor(color){
		this.color = color
	}
	exec(ctx){
		ctx.setFillStyle(this.color)
	}
}

class SetFont {
	constructor(font){
		this.font = font
	}
	exec(ctx){
		ctx.font = this.font
	}
}


class FillText {
	constructor (text, x, y) {
		this.text = text
		this.x  = x
		this.y = y
	}
	exec(ctx, textObject){
		let [_x, _y] = textObject.getPosition()
		let x = _x + this.x
		let y = _y + this.y
		ctx.font = textObject.font
		ctx.fillText(this.text, x, y)
	}
}

class SetTextBaseline {
	constructor (textBaseline) {
		this.textBaseline = textBaseline
	}
	exec(ctx){
		ctx.setTextBaseline(this.textBaseline)
	}
}
class SetTextAlign {
	constructor (textAlign) {
		this.textAlign = textAlign
	}
	exec(ctx){
		ctx.setTextAlign(this.textAlign)
	}
}


export default class Text extends DisplayObject {
	name = 'Text'
	constructor(t = {}){
		super()
		
		let {text, font, color} = t
		
		if(font){
			this.font = font
		}else{
			this.font = '10px sans-serif'
		}
		if(color){
			this.color = color
		}
		this.textAlign = 'left'
		this.textBaseline = 'top'

		if(text){
			this.text = text
			this.fillText(this.text)
		}

	}
	_actions = []
	_append(cmdObject) {
		this._actions.push(cmdObject)
	}
	_draw(context){
		context.setTextAlign(this.textAlign)
		context.setTextBaseline(this.textBaseline)
		context.setFillStyle(this.color)

		this._actions.map((cmd) => {
			cmd.exec(context, this)
		})
	}
	getPosition(){
		let parent = this.parent
		let x = 0, y = 0
		while(parent && parent.name != 'Stage'){
			x = this.x + parent.x
			y = this.y + parent.y
			parent = parent.parent
		}

		return [x, y]
	}
	setFillStyle(color){
		this._append(new SetFillStyle(...arguments))
		return this
	}
	fillText(text, x = 0, y = 0) {
		this._append(new FillText(text, x = 0, y = 0))
		return this
	}
	setFont(font){
		this.font = font
		// this._append(new SetFont(font))
		return this
	}
	setFontSize(size) {
		this._append(new SetFontSize(...arguments))
		return this
	}
	/**
	  top	顶部对齐	
    bottom	底部对齐	
		middle	居中对齐	
		normal 默认（比底部对齐更接近底部）
	 */
	setTextBaseline(textBaseline) {
		this.textBaseline = textBaseline
		this._append(new SetTextBaseline(...arguments))
		return this
	}
	/**
	 * 
	 */
	setTextAligne(textAlign) {
		this._append(new SetTextAlign(...arguments))
		return this
	}
	
}