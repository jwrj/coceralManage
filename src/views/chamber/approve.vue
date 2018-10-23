<template>
	
	<div>
		
		<Card>
			
			<div slot="title" class="title">
				<h1>会员审批</h1>
			</div>
			
			<table-list
			@on-poptip-ok="poptipOk"
			:tableColumns="tableColumns"
			:tableData="approveList">
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>
import tableList from '@/components/tableList/table-list.vue';
let isCarryOutHook = false;

export default {
	name: 'approve',
	components:{//组件模板,
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
	},
    data () {//数据
        return {
        	
        	tableColumns: [
    			{
    				width: 60,
    				title: 'ID',
    				key: 'id'
    			},
    			{
    				title: '姓名',
    				key: 'person_name'
    			},
    			{
    				title: '公司',
    				key: 'company_name'
    			},
    			{
    				title: '状态',
    				key: 'status_name'
    			},
    			{
    				title: '申请时间',
    				key: 'addtime'
    			},
    			{
    				align: 'center',
    				width: 200,
    				title: '操作',
    				handle: [
    					{
    						name: '详细资料',
    					},
    					{
    						name: '通过',
    						key: 'pass',
    						poptipOpen: true,
    						poptip_props: {
    							title: '您确认通过吗？'
    						}
    					},
    					{
    						name: '拒绝',
    						key: 'reject',
    						poptipOpen: true,
    						button_props: {
    							type: 'error',
    						},
    						poptip_props: {
    							title: '您确认拒绝吗？'
    						}
    					},
    				],
    			}
    		],
    		
    		approveList: [],
        	
        }
    },
    methods: {//方法
    	
    	getApproveData(){//获取审批数据列表
    		$ax.getAjaxData('manage.Member/applyList', {}, res => {
    			if(res.code == 0){
    				this.approveList = res.data;
    			}
			});
    	},
    	
    	poptipOk(val){//拒绝或通过
    		if(val.key === 'pass'){//成功通过
      			this.setApplyDo(Number(val.params.row.id), 1);
    		}else if(val.key === 'reject'){//拒绝通过
    			this.setApplyDo(Number(val.params.row.id), 0);
    		}
    	},
    	
    	setApplyDo(apply_id, accept){//设置拒绝或通过接口
    		$ax.getAjaxData('manage.Member/applyDo', {
    			apply_id: apply_id,//申请ID
    			accept: accept,//是否接受：0拒绝、1接受
    		}, res => {
				if(res.code == 0){
					if(accept === 1){
						this.$Message.success('成功通过');
					}else if(accept === 0){
						this.$Message.error('成功拒绝');
					}
					getApproveData((res) => {
						if(res.code == 0){
							this.approveList = res.data;
						}
					});
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
    		this.getApproveData();
    	}
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	destroyed(){//Vue 实例销毁后调用
		isCarryOutHook = false;
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		isCarryOutHook = true;
		
		(async () => { //执行异步函数
			
			try{
				
				//获取审批数据列表
				let approveData = await $ax.getAsyncAjaxData('manage.Member/applyList', {});
				
				next(vm => {
					if(approveData.code == 0){
						vm.approveList = approveData.data;
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
