<template>

	<div style="padding-bottom: 200px;">
		
		<h1 style="text-align: center;margin-bottom: 16px;">{{dataInfo.title}}</h1>
		
		<div style="text-align: center;">
			<Tag color="default">类型：会议</Tag>
			<Tag color="default">会议地址：{{dataInfo.address}}</Tag>
			<Tag color="default">开始时间：{{beginTime}}</Tag>
			<Tag color="default">结束时间：{{endTime}}</Tag>
			<Tag color="default">是否住宿：{{dataInfo.isz == 1 ? '是' : '否'}}</Tag>
			<Tag color="default">住宿地址：{{dataInfo.zaddress}}</Tag>
		</div>
		
		<Divider orientation="left" style="font-size: 16px;">会议说明</Divider>
		
		<div class="describe" ref="describe"></div>
		
	</div>

</template>

<script>
export default {
	name: 'memberActivityDetails',
	components: { //组件模板,
	},
	props: { //组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
		dataInfo: {
			type: Object,
		}
	},
	data() { //数据
		return {
			
		}
	},
	methods: { //方法
		
	},
	computed: { //计算属性
		
		beginTime(){
			return getTimeMinute(this.dataInfo.begin_time);
		},
		
		endTime(){
			return getTimeMinute(this.dataInfo.end_time);
		},
		
	},
	watch: { //监测数据变化

	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		
		this.$nextTick(() => {
			this.$refs.describe.innerHTML = this.dataInfo.text;
		});
		
	},
	mounted() { //模板被渲染完毕之后执行
		
	},

	//=================组件路由勾子==============================

	beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）

		(async () => { //执行异步函数

			//async、await错误处理
			try {

				/*
				 * 
				 * ------串行执行---------
				 * console.log(await getAjaxData());
				 * ...
				 * 
				 * ---------并行：将多个promise直接发起请求（先执行async所在函数），然后再进行await操作。（执行效率高、快）----------
				 * let abc = getAjaxData();//先执行promise函数
				 * ...
				 * console.log(await abc);
				 * ...
				 */
				next(vm => {

				});

			} catch (err) {
				console.log(err);
			}

		})();

	},

}
</script>

<style scoped lang="less">
	.describe{
		padding: 16px 0 40px;
		font-size: 16px;
	}
</style>
