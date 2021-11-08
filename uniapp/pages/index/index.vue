<template>
	<view class="content">
		<view class="speed-chart-bg">
			<SpeedChart
				:width="width"
				:height="height"
				:ratio="ratio"
				:score="score"
			/>
		</view>
	</view>
</template>

<script>
	import { reactive, toRefs, onMounted, getCurrentInstance } from 'vue'
	import SpeedChart from '@/components/SpeedChart/SpeedChart.vue'
	import { Stage, Text } from '../../duducanvas/duducanvas.js'
	export default {
		components: {
			SpeedChart,
		},
		
		setup() {
			const res = uni.getSystemInfoSync()
			const ratio = res.windowWidth / 375
			const state = reactive({
				width: 375,
				height: 360,
				score: 10,
				ratio: ratio,
			})
			
			const handleClick = () => {
				state.score++
			}
			
			return {
				...toRefs(state),
				handleClick,
			}
		}
	}
</script>

<style>
	.speed-chart-bg{
		width: 750upx;
		height: 720upx;
		background: radial-gradient(130% 300.26% at -10% -100%, #11AAFF 10%, #796AFF 100%);
	}
</style>
