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
const getApproveData = (fn) => {//获取审批数据列表
	$ax.getAjaxData('manage.Member/applyList', {}, res => {
		fn && fn(res);
	});
}
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
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		getApproveData((res) => {//获取审批数据列表
			if(res.code == 0){
				next(vm => {
					vm.approveList = res.data;
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
