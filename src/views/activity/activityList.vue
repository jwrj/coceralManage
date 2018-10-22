<template>

	<div>
		
		<Card>
			
			<div slot="title" class="cardTitle">
				<h1>活动/会议列表</h1>
				<Button style="margin-left: 10px;" type="primary" size="small" to="/activity/createActivity">创建活动/会议</Button>
			</div>
			
			<table-list @on-btn-click="btnClick" :tableColumns="tableColumns" :tableData="ActivityDataList" :modalTitle="modalTitle">
				<div slot="modalContent">
					<activity-details v-if="openType === 'details' || openType === 'edit'"></activity-details>
					<invitation v-if="openType === 'invite'"></invitation>
				</div>
			</table-list>
			
		</Card>

	</div>

</template>

<script>
import tableList from '@/components/tableList/table-list.vue'
import activityDetails from '@/views/activity/activityDetails.vue'
import invitation from '@/views/activity/invitation.vue'
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
		
		btnClick(val){
			this.openType = val.key;
			this.modalTitle = val.params.row.title + '（'+ val.name +'）';
		},
		
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

		$ax.getAjaxData('manage.Action/actionList', {}, res => {//获取活动列表
			if(res.code == 0){
				next(vm => {
					vm.ActivityDataList = res.data;
				});
			}else{
				next();
			}
		});

	},

}
</script>

<style scoped lang="less">
</style>
