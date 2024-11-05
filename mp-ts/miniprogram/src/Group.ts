import DisplayObjectContainer from './DisplayObjectContainer'
/**
 * Group 组
 * 可添加多个显示对象进 Group 内，变成一个显示组，可集中对 Group 组操作
 */
export default class Group extends DisplayObjectContainer{
  name = 'Group'
  _display: string = 'block'
  _alignItems = 'flex-start'
  _justifyContent = 'flex-start'
	constructor(){
		super()
	}
	set width(v: number){
		this._width = v
	}
	get width(){
		return this._width
	}
	set height(v: number){
		this._height = v
	}
	get height(){
		return this._height
	}
	get display(){
		return this._display
	}
	set display(v: string){
		this._display = v
	}
	get alignItems(){
		return this._alignItems
	}
	set alignItems(v: string){
		this._alignItems = v
	}
	get justifyContent(){
		return this._justifyContent
	}
	set justifyContent(v){
		this._justifyContent = v
	}
}

 