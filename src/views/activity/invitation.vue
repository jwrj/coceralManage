<template>
	
	<div>
		
		<table-list
		@on-btn-click="btnClick"
		@on-poptip-ok="poptipOk"
		:tableColumns="tableColumns"
		:tableData="inviteList">
			<div slot="header">
				<Button type="primary" @click="modal = true">邀请人员</Button>
			</div>
		</table-list>
		
		
		<Modal v-model="modal" width="80%">
	        <p slot="header">会员列表</p>
	        <div>
	        	<user-list
		    	ref="userListInstance"
		    	:titleShow="false"
		    	:selectShow="true"
		    	:styleShow="false"
		    	@on-select-change="memberSelect"
		    	></user-list>
	        </div>
	        <div slot="footer">
	            <Button @click="modal = false">取消</Button>
	            <Button type="primary" @click="submitInvite">发送邀请</Button>
	        </div>
	    </Modal>
		
	</div>
	
</template>

<script>
import tableList from '@/components/tableList/table-list.vue';
import userList from '@/views/user/userList.vue';
export default {
	name: 'invitation',
	components:{//组件模板
		userList,
		tableList
	},
	props:{//组件道具（参数）
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
    data () {//数据
        return {
        	
        	modal: false,
        	
        	checkedMembers: [],//选中的会员
        	
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
    methods: {//方法
    	
    	btnClick(){
			this.$Message.success('通知成功');
		},
		
		poptipOk(){
			this.$Message.success('删除成功');
		},
    	
    	memberSelect(data){//选择会员时触发
    		this.checkedMembers = data;
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
    	
    	submitInvite(){//提交邀请
    		if(this.checkedMembers && this.checkedMembers.length > 0){
    			let newIds = [];
    			this.checkedMembers.forEach(item => {
    				newIds.push(item.id);
    			});
    			$ax.getAjaxQsStringify('manage.Action/addMember', {
    				mid: newIds,//会员ID。（多个，数组形式）
    				action_id: this.dataInfo.id,//活动id
    			}, res => {
    				if(res.code == 0){
    					this.modal = false;
    					this.$Message.success('邀请成功');
    				}
    			});
    		}else{
    			this.$Message.info('请选勾选需要邀请的人员');
    		}
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	this.getInviteData();
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
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
				
			} catch(err) {
				console.log(err);
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>