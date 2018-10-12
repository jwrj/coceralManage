<template>

	<div>
		<Card>
			<div slot="title" class="title">
				<h1>活动/会议列表</h1>
			</div>
			<div class="content">
           <Row>
			   <Col span="4" style="text-align: right;">
				   <p>类型：</p>
				   <p>开始时间：</p>
				   <p>结束时间：</p>
				   <p>是否住宿：</p>
			   </Col>
			   <Col span="6">
				   <p>会议</p>
				   <p>2018-01-01</p>
				   <p>2018-02-02</p>
				   <p>是</p>
			   </Col>
			   <Col span="4" style="text-align: right;">
				   <p>标题：</p>
				   <p>会议地址：</p>
				   <p>住宿地址：</p>
				   <p>会议说明：</p>
			   </Col>
			   <Col span="6">
				   <p>广西湖北商会2018迎新春抽奖晚会</p>
				   <p>广西南宁市民族大道123号</p>
				   <p>广西南宁市民族大道123号</p>
				   <p>我是会议说明噢噢噢噢</p>
			   </Col>
		   </Row>
			</div>

		</Card>

		<Card style="margin-top:16px ;">
			<div slot="title" class="title">
				<h1>回忆描述</h1>
			</div>
			<Img :src="photo"></Img>
		</Card>
		<Card style="margin-top: 16px;height: 600px;">

			<h1 slot="title">附件</h1>

			<file-manage currentRouteName="activityDetails"></file-manage>

		</Card>
		<Card style="margin-top: 16px;">
			<div slot="title" class="title">
				<h1>邀请人员</h1>
			</div>
			<table-list @on-btn-click="btnClick" @on-poptip-ok="poptipOk" :tableColumns="tableColumns" :tableData="tableData">

				<div slot="modalContent">
					邀请成功
				</div>

			</table-list>
		</Card>
	</div>

</template>

<script>
	import fileManage from '@/components/fileManage/file-manage.vue'; //文件管理
	import tableList from '@/components/tableList/table-list.vue'; //表格列表组件
	import image from "@/assets/img/default-img/detail.png"
	export default {
		name: '',
		components: { //组件模板,
			fileManage,
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
		},
		data() { //数据
			return {
				photo: image,
				tableColumns: [{
						title: 'ID',
						key: 'id'
					},
					{
						title: '姓名',
						key: 'name'
					},
					{
						title: '性别',
						key: 'sex'
					},
					{
						title: '手机号',
						key: 'mobilePhone'
					},
					{
						title: '身份证号码',
						key: 'IDNumber'
					},
					{
						align: 'center',
						width: 180,
						title: '操作',
						handle: [
							{
								name: '再次通知',
								key: 'inform',
							},
							{
								name: '删除名额',
								key: 'del',
								poptipOpen: true,
								poptip_props: {
									title: '您确定要删除该名额？'
								}
							},
						],
					}
				],
				
				tableData: [
					{
						id: 1,
						name: '张三',
						sex: '男',
						mobilePhone: '13800138000',
						IDNumber: '450123*****63541245'
					},
					{
						id: 1,
						name: '张三',
						sex: '男',
						mobilePhone: '13800138000',
						IDNumber: '450123*****63541245'
					},
					{
						id: 1,
						name: '张三',
						sex: '男',
						mobilePhone: '13800138000',
						IDNumber: '450123*****63541245'
					},
					{
						id: 1,
						name: '张三',
						sex: '男',
						mobilePhone: '13800138000',
						IDNumber: '450123*****63541245'
					},
				]
			}
		},
		methods: { //方法
			
			btnClick(){
				
				this.$Message.success('通知成功');
				
			},
			
			poptipOk(){
				
				this.$Message.success('删除成功');
				
			}
			
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
