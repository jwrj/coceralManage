<template>
	
	<div>
		
		<Card dis-hover :bordered="false">
			
			<h1 slot="title">会员列表</h1>
			
			<table-list
			:tableColumns="tableColumns"
			:tableData="memberDataList"
			>
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>
import tableList from '@/components/tableList/table-list.vue';
let isCarryOutHook = false;
export default {
	name: 'memberList',
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
    		],
        	
        	memberDataList: [],
        	
        }
    },
    methods: {//方法
    	
    	getMemberData(){//获取会员列表
    		$ax.getAjaxData('member.Do/memberList', {}, res => {
    			if(res.code == 0){
    				this.memberDataList = res.data;
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
    		this.getMemberData();
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
				
				//获取会员列表
				let memberData = await $ax.getAsyncAjaxData('member.Do/memberList', {});
				
				next(vm => {
					if(memberData.code == 0){
						vm.memberDataList = memberData.data;
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