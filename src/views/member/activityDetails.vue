<template>

	<div style="padding-bottom: 200px;">
		
		<h1 style="text-align: center;margin-bottom: 16px;">广西湖北商会2018迎新春抽奖晚会</h1>
		
		<div style="text-align: center;">
			<Tag color="default">类型：会议</Tag>
			<Tag color="default">会议地址：广西南宁市青秀区</Tag>
			<Tag color="default">开始时间：2018-10-22</Tag>
			<Tag color="default">结束时间：2018-10-23</Tag>
			<Tag color="default">是否住宿：是</Tag>
			<Tag color="default">住宿地址：广西南宁市国际大酒店</Tag>
		</div>
		
		<Divider orientation="left">详细描述</Divider>
		
		<Img :src="photo"></Img>
		
	</div>

</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'; //表格列表组件
	import image from "@/assets/img/default-img/detail.png"
	export default {
		name: '',
		components: { //组件模板,
			tableList
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
				
				photo: image,
				
			}
		},
		methods: { //方法
			
		},
		computed: { //计算属性

		},
		watch: { //监测数据变化

		},

		//===================组件钩子===========================

		created() { //实例被创建完毕之后执行
			
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
	.btnSmall {
		margin-left: auto;
	}

	.title {
		display: flex;
		align-items: center;
	}

</style>
