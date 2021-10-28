<template>
	<view class="bg">
		<canvas id="myCanvas" canvas-id="myCanvas" :style="{width: (width * ratio) + 'px', height: (height * ratio) + 'px'}"></canvas>
	</view>
	
</template>

<script>
	import { watch,toRefs, onMounted, reactive, getCurrentInstance } from 'vue'
	import { Stage, Text, Shape } from '../../duducanvas/duducanvas.js'
	const START_DEGREE = 135 // 起始角度（左下角）
	const END_DEGREE = 405 // 终点角度（右下角）
	const DEGREE_RANGE = END_DEGREE - START_DEGREE // 角度区间
	const LINE_COUNT = 100 // 刻度分成 100 份
	export default {
		setup() {
			const state = reactive({
				width: 375,
				height: 360,
				score: 10,
				ratio: 1,
				radius: 80
			})
			
			onMounted(()=> {
				const { ctx } = getCurrentInstance()
				new Stage('#myCanvas', stage => {
					const centerX = stage.width / 2 // x 坐标值
					const centerY = stage.height / 2 // y 坐标值
					console.log(centerX, centerY)
					const step = (DEGREE_RANGE * Math.PI) / 180 / LINE_COUNT // 弧度间隔，每根线间隔多少弧度
					const startAngle = START_DEGREE  * Math.PI / 180 // 起始弧度（左下角）
					const endAngle = END_DEGREE  * Math.PI / 180 // 终点弧度（右下角）
					let angle = startAngle
					const radius = state.radius // 圆半径
					
					// 生成刻度
					for(let i=0; i<101; i++){
						let path = new Shape()
						path.graphics.beginPath()
						
						const gutter = (i % 5 === 0) ? 10 : 0 // 间隔 5 线就长一点
						// 小圆旋转点
						const moveX = centerX + Math.cos(angle) * (radius - gutter)
						const moveY = centerY + Math.sin(angle) * (radius - gutter)
						// 大圆旋转点
						const endX = centerX + Math.cos(angle) * (radius + 10)
						const endY = centerY + Math.sin(angle) * (radius + 10)
						angle = angle + step 
						// 圆由内向外绘制
						path.graphics.moveTo(moveX, moveY)
						.lineTo(endX, endY)
						.lineWidth(1)
						.strokeStyle('rgba(255,255,255, .5)')
						.stroke()
						stage.addChild(path)
					}
					
					// 圆线顺时钟进度线背景
					const outCircleRadius = radius + 16 // 外圆半径
					const arcLineBg = new Shape()
					arcLineBg.graphics.beginPath()
					.lineWidth(3)
					.strokeStyle('rgba(255,255,255, .5)')
					.arc(centerX, centerY, outCircleRadius, startAngle, endAngle, false)
					.stroke()
					stage.addChild(arcLineBg)
					// 指示圆点
					const pointerCircle = new Shape()
					const pointerCircleDegree = (state.score / 100 * DEGREE_RANGE) + START_DEGREE // 根据百分制得出得分比算出指示圆位置角度
					const pointerCircleAngle = pointerCircleDegree * Math.PI / 180 // 算出对应孤度
					const endX = centerX + Math.cos(pointerCircleAngle) * outCircleRadius
					const endY = centerY + Math.sin(pointerCircleAngle) * outCircleRadius
					pointerCircle.graphics
					.beginPath()
					.fillStyle('white')
					.fillCircle(endX, endY, 8)
					// 圆线顺时钟进度
					const arcLine = new Shape()
					arcLine.graphics.beginPath()
					.lineWidth(3)
					.strokeStyle('white')
					.arc(centerX, centerY, outCircleRadius, startAngle, pointerCircleAngle, false)
					.stroke()
					stage.addChild(arcLine, pointerCircle)
					
					// 文本显示
					// 左下角显示字符 0
					const startPointX = centerX + Math.cos(startAngle) * outCircleRadius
					const startPointY = centerY + Math.sin(startAngle) * outCircleRadius
					const text0 = new Text({
						text: '0',
						fontSize: 16,
						color: 'rgba(255,255,255, .5)'
					})
					text0.x = startPointX - 20
					text0.y = startPointY
					// 右下角显示字符 100
					const endPointX = centerX + Math.cos(endAngle) * outCircleRadius
					const endPointY = centerY + Math.sin(endAngle) * outCircleRadius
					const text100 = new Text({
						fontSize: 16,
						text: '100',
						color: 'rgba(255,255,255, .5)'
					})
					text100.x = endPointX + 6
					text100.y = endPointY
					
					// 得分
					const textScore = new Text({
						font: `normal bold ${56 * state.ratio}px PingFang-SC`,
						text: state.score,
						color: 'white',
					})
					stage.addChild(textScore)
					textScore.x = centerX - (textScore.width * .5)
					textScore.y = centerY - (textScore.height * .5)
					// 综合得分
					const textTips = new Text({
						font: `normal bold ${16 * state.ratio}px PingFang-SC`,
						text: '综合得分',
						color: 'white'
					})
					textTips.x = centerX - 30
					textTips.y = centerY + 76
					// 将4个文本添加至舞台
					stage.addChild(text0, text100, textScore, textTips)
					
					// setTimeout(() => {
					// 	textScore.text = 'oy'
					// 	stage.update()
					// }, 300)
				}, ctx)
			})
			
			return {
				...toRefs(state)
			};
		}
	}
</script>

<style lang="less">
	.bg{
		background-color: #2C405A;
	}
</style>
