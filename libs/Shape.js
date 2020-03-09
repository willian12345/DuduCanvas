import DisplayObject from './DisplayObject.js'

export default class Shape extends DisplayObject{
	constructor(context){
		super()
		this.context = context
	}
	draw(context){
		const l = this.actions.length
		let parent = this.parent
		while(parent && parent.name != 'Stage'){
			this.x = this.x + parent.x
			this.y = this.y + parent.y
			parent = parent.parent
		}

		console.log(this.x, this.y)

		if(l){
			for(let i=0; i<l; i++){
				let action = this.actions[i]
				let f = action[0]
				let args = action.length > 1 ? action.slice(1) : null;
				
				if(typeof(context[f]) == "function") {
					if(f == 'arc'){
						args[0] = this.x + args[0]
						args[1] = this.y + args[1]
					}
					context[f].apply(context, args);
				}
			}
		}
	}
	actions = []
	graphics = {
		beginFill: (color)=>{
			this.actions.push(['setFillStyle', color])
			return this.graphics
		},
		drawCircle: (x=0, y=0, radius=20) => {
			this.actions.push(['save'])
			this.actions.push(['beginPath'])
			this.actions.push(['arc', x, y, radius, 0, 2 * Math.PI])
			this.actions.push(['fill'])
			this.actions.push(['restore'])
			return this.graphics
		}
	}
}

 