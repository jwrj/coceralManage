<template>

	<div>
		
		<Card dis-hover :bordered="false">
			
			<h1 slot="title">会议活动列表</h1>
			
			<xw-table
			ref="xwTable"
			:okBtnHide="true"
			modalCancelBtnName="关闭"
			@on-btn-click="btnClick"
			:tableColumns="tableColumns"
			:tableData="ActivityDataList"
			:modalTitle="modalTitle">
				<div slot="header">
					<Button type="primary" to="/meeting/createActivity">创建会议活动</Button>
				</div>
				<div slot="modalContent">
					<activity-details v-if="openType === 'details'" :dataInfo="dataInfo"></activity-details>
					<activity-edit v-if="openType === 'edit'" :dataInfo="dataInfo" @on-edit-succeed="editSucceed"></activity-edit>
					<activity-adjunct v-if="openType === 'adjunct'" :dataInfo="dataInfo"></activity-adjunct>
					<invitation v-if="openType === 'invite'" :dataInfo="dataInfo"></invitation>
				</div>
			</xw-table>
			
		</Card>
		
	</div>

</template>

<script>
import tableList from '@/components/tableList/table-list.vue'
import activityDetails from '@/views/activity/activityDetails.vue'
import activityEdit from '@/views/activity/activityEdit.vue'
import activityAdjunct from '@/views/activity/activityAdjunct.vue'
import invitation from '@/views/activity/invitation.vue'
let isCarryOutHook = false;
export default {
	name: 'activityList',
	components: { //组件模板,
		tableList,
		activityDetails,
		activityEdit,
		activityAdjunct,
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
					width: 220,
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
							name: '附件',
							key: 'adjunct',
							modalShow: true,
						},
						{
							name: '人员',
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
		
		editSucceed(){//编辑成功触发
			this.getActivityData();
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
