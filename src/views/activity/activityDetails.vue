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
		
		<Divider orientation="left" style="font-size: 16px;">详细说明</Divider>
		
		<div class="describe" ref="describe"></div>
		
		<Divider orientation="left" style="font-size: 16px;">附件</Divider>
		
		<file-manage style="margin: 26px 0 60px;" currentRouteName="activityList"></file-manage>
		
		<Divider orientation="left" style="font-size: 16px;">已邀请人员</Divider>
			
		<table-list
		@on-btn-click="btnClick"
		@on-poptip-ok="poptipOk"
		:tableColumns="tableColumns"
		:tableData="inviteList">
		</table-list>
		
	</div>

</template>

<script>
import fileManage from '@/components/fileManage/file-manage.vue'; //文件管理
import tableList from '@/components/tableList/table-list.vue'; //表格列表组件
export default {
	name: 'activityDetails',
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
		dataInfo: {
			type: Object,
		}
	},
	data() { //数据
		return {
			
			tableColumns: [
				{
					title: 'ID',
					key: 'id'
				},
				{
					title: '姓名',
					render: (h, params) => {
						return h('span', params.row.member_info.person_name)
					}
				},
				{
					title: '性别',
					render: (h, params) => {
						return h('span', '男')
					}
				},
				{
					title: '公司',
					render: (h, params) => {
						return h('span', params.row.member_info.company_name)
					}
				},
				{
					title: '手机号',
					render: (h, params) => {
						return h('span', 13800138000)
					}
				},
				{
					title: '身份证号码',
					render: (h, params) => {
						return h('span', '450803********123')
					}
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
			
			inviteList: [],
			
		}
	},
	methods: { //方法
		
		btnClick(){
			this.$Message.success('通知成功');
		},
		
		poptipOk(){
			this.$Message.success('删除成功');
		},
		
		getInviteData(){//获取已邀请人员列表
			$ax.getAjaxData('manage.Action/actionMemberList', {
				action_id: this.dataInfo.id,//活动ID
			}, res => {
				if(res.code == 0){
					this.inviteList = res.data;
				}
			});
		},
		
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
		
		this.getInviteData();
		
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
