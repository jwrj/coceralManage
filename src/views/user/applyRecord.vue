<template>
	
	<div>
		
		<table-list
		:tableColumns="tableColumns"
		:tableData="applyRecordList"
		:headerShow="false"
		:footerShow="false"
		@on-poptip-ok="tabBtnClick">
		</table-list>
		
	</div>
	
</template>

<script>
import tableList from '@/components/tableList/table-list.vue'
export default {
	name: 'applyRecord',
	components:{//组件模板
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
					width: 60,
			        title: 'OID',
			        key: 'oid'
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
			        title: '审核状态',
			        key: 'status_str'
			    },
			    {
			    	align: 'center',
			    	width: 130,
			        title: '操作',
			        handle: [
			        	{
			        		name: '撤回申请',
			        		key: 'cancel',
			        		poptipOpen: true,
			        		poptip_props: {
    							title: '您确定要撤回吗？'
    						},
			        		button_props: {
			        			loading: false
			        		},
			        		callback: (params, btnParams) => {
			        			if(params.row.status != 0){
			        				btnParams.button_props.disabled = true;
			        			}else{
			        				btnParams.button_props.disabled = false;
			        			}
			        		}
			        	}
			        ],
			    }
			],
        	
        	applyRecordList: [],
        	
        }
    },
    methods: {//方法
    	
    	getApplyRecord(){//获取申请记录数据
    		$ax.getAjaxData('user.Comm/myApplyList', {}, res => {
    			if(res.code == 0){
    				this.applyRecordList = res.data;
    			}
    		});
    	},
    	
    	tabBtnClick(val){//表格按钮点击触发
    		if(val.key === 'cancel'){//撤回申请
    			$ax.getAjaxData('user.Comm/applyRevoke', {
    				apply_id: Number(val.params.row.id)
    			}, res => {
    				if(res.code == 0){
    					this.$Message.success('成功撤回申请');
    				}
    				this.getApplyRecord();
    			});
    		}
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	this.getApplyRecord();
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