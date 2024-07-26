<template>
	<view class="content">
		<view class="speed-chart-bg">
			<view class="title">duducanvas vue2.0 写法应用</view>
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
	import SpeedChart from '@/components/SpeedChart/SpeedChart.vue'
	export default {
		components: {
			SpeedChart,
		},
		data() {
			return {
				width: 375,
				height: 360,
				score: 100,
				ratio: 1,
			}
		},
		onLoad() {
			const res = uni.getSystemInfoSync()
			const ratio = res.windowWidth / 375
			this.ratio = ratio
		}
	}
</script>

<style>
	.title{
		padding: 20upx;
		color: white;
	}
	.speed-chart-bg{
		width: 750upx;
		height: 720upx;
		background: radial-gradient(130% 300.26% at -10% -100%, #11AAFF 10%, #796AFF 100%);
	}
</style>
