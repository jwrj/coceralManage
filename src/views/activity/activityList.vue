<template>

	<div>
		
		<Card>
			
			<div slot="title" class="cardTitle">
				<h1>活动/会议列表</h1>
				<Button style="margin-left: 10px;" type="primary" size="small" to="/activity/createActivity">创建活动/会议</Button>
			</div>
			
			<table-list @on-btn-click="btnClick" :tableColumns="tableColumns" :tableData="ActivityDataList" :modalTitle="modalTitle">
				<div slot="modalContent">
					<activity-details v-if="openType === 'details' || openType === 'edit'" :dataInfo="dataInfo"></activity-details>
					<invitation v-if="openType === 'invite'" :dataInfo="dataInfo"></invitation>
				</div>
			</table-list>
			
		</Card>
		
	</div>

</template>

<script>
import tableList from '@/components/tableList/table-list.vue'
import activityDetails from '@/views/activity/activityDetails.vue'
import invitation from '@/views/activity/invitation.vue'
let isCarryOutHook = false;
export default {
	name: 'activityList',
	components: { //组件模板,
		tableList,
		activityDetails,
		invitation
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
			
			modalTitle: '标题',
			
			openType: '',
			
			dataInfo: {},
			
			tableColumns: [
				{
					align: 'center',
					width: 60,
					title: 'ID',
					key: 'id'
				},
				{
					title: '名称',
					key: 'title'
				},
				{
					title: '开始时间',
					render: (h, params) => {
						return h('span', getTimeMinute(params.row.begin_time))
					}
				},
				{
					title: '结束时间',
					render: (h, params) => {
						return h('span', getTimeMinute(params.row.end_time))
					}
				},
				{
					align: 'center',
					title: '报名人数',
					render: (h, params) => {
						return h('span', '100')
					}
				},
				{
					align: 'center',
					width: 200,
					title: '操作',
					handle: [
						{
							name: '详情',
							key: 'details',
							modalShow: true,
						},
						{
							name: '编辑',
							key: 'edit',
							modalShow: true,
						},
						{
							name: '邀请人员',
							key: 'invite',
							modalShow: true,
						},
					],
				}
			],
			
			ActivityDataList: [],
			
		}
	},
	methods: { //方法
		
		btnClick(val){//表格按钮点击触发
			this.dataInfo = val.params.row;
			this.openType = val.key;
			this.modalTitle = val.params.row.title + '（'+ val.name +'）';
		},
		
		getActivityData(){//获取活动会议列表
			$ax.getAjaxData('manage.Action/actionList', {}, res => {
				if(res.code == 0){
					this.ActivityDataList = res.data;
				}
			});
		},
		
	},
	computed: { //计算属性

	},
	watch: { //监测数据变化

	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		if(!isCarryOutHook){
			this.getActivityData();
		}
	},
	mounted() { //模板被渲染完毕之后执行

	},
	destroyed(){//Vue 实例销毁后调用
		isCarryOutHook = false;
	},

	//=================组件路由勾子==============================

	beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）
		
		isCarryOutHook = true;
		
		(async () => { //执行异步函数

			//async、await错误处理
			try{
				
				//获取活动会议列表
				let activityData = await $ax.getAsyncAjaxData('manage.Action/actionList', {});
				
				next(vm => {
					if(activityData.code == 0){
						vm.ActivityDataList = activityData.data;
					}
				});

			}catch (err) {
				console.log(err);
			}
			
			next();

		})();

	},

}
</script>

<style scoped lang="less">
</style>
