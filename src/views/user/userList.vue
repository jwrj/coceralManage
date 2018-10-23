<template>
	
	<div>
		
		<Card :dis-hover="!styleShow" :bordered="styleShow" :padding="styleShow ? 16 : 0">
			
			<h1 v-if="titleShow" slot="title">会员列表</h1>
			
			<table-list :tableColumns="tableColumns" :tableData="memberList" @select-change="tabSelectChange">
				<div slot="header" style="width: 100%;display: flex;align-items: center;">
					<post-casc></post-casc>
				</div>
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>
import postCasc from '@/components/post/post-casc.vue';
import tableList from '@/components/tableList/table-list.vue';
let isCarryOutHook = false;
export default {
	name: 'userList',
	components:{//组件模板,
		postCasc,
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
		titleShow: {//标题显示
			type: Boolean,
			default: true
		},
		
		selectShow: {//表格多选显示
			type: Boolean,
			default: false
		},
		
		styleShow: {//卡片样式
			type: Boolean,
			default: true
		},
		
	},
    data () {//数据
    	return {
    		
    		tableColumns: [
    			{
    				width: 60,
    				type: 'selection'
    			},
    			{
    				width: 60,
    				title: 'ID',
    				key: 'id'
    			},
    			{
    				title: '姓名',
    				render: (h, params) => {
    					return h('span', params.row.person_info.truest_name)
    				}
    			},
    			{
    				width: 60,
    				title: '性别',
    				render: (h, params) => {
    					return h('span', params.row.person_info.sex)
    				}
    			},
    			{
    				title: '公司',
    				render: (h, params) => {
    					return h('span', params.row.company_info ? params.row.company_info.company_name : '')
    				}
    			},
    			{
    				title: '任职时间',
    				render: (h, params) => {
						return h('span', getLocalTime(params.row.addtime))
					}
    			},
    			{
    				align: 'center',
    				width: 100,
    				title: '操作',
    				handle: [
    					{
    						name: '详细资料',
    					},
    				],
    			}
    		],
    		
    		memberList: [],
    		
    	}
    },
    methods: {//方法
    	
    	tabSelectChange(data){//勾选改变时
    		this.$emit('on-select-change', data);
    	},
    	
    	getMemberDataList(){//获取会员列表数据
    		$ax.getAjaxData('manage.Member/memberList', {}, res => {
    			if(res.code == 0){
    				this.memberList = res.data;
    			}
    		});
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	if(!isCarryOutHook){
    		this.getMemberDataList();
    	}
	},
    mounted () {//模板被渲染完毕之后执行
    	
    	if(!this.selectShow){
    		this.tableColumns.splice(0, 1);
    	}
    	
	},
	destroyed(){//Vue 实例销毁后调用
		isCarryOutHook = false;
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		isCarryOutHook = true;
		
		(async () => { //执行异步函数
			
			try{
				
				//获取会员列表数据
				let getMemberData = await $ax.getAsyncAjaxData('manage.Member/memberList', {});
				
				next(vm => {
					if(getMemberData.code == 0){
						vm.memberList = getMemberData.data;
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
