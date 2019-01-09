<template>
	
	<div>
		
		<Card dis-hover :bordered="false">
			
			<h1 slot="title">我的缴费记录</h1>
			
			<xw-table
			:tableColumns="tableColumns"
			:tableData="paymentRecordsList"
			>
			</xw-table>
			
		</Card>
		
	</div>
	
</template>

<script>
let isCarryOutHook = false;
export default {
	name: 'myPaymentRecords',
	components:{//组件模板
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
					title: 'ID',
					key: 'id'
				},
				{
					title: '缴费条目',
					key: 'name'
				},
				{
					title: '应缴金额(元)',
					render: (h, params) => {//这里要除回100才是正确的数
						let shouldPayNum = Number(params.row.should_pay);
						let newShouldPayNum = shouldPayNum/100;
						return h('span', newShouldPayNum)
					}
				},
				{
					title: '实缴金额(元)',
					render: (h, params) => {//这里要除回100才是正确的数
						let payedNum = Number(params.row.payed);
						let newPayedNum = payedNum/100;
						return h('span', newPayedNum)
					}
				},
				{
					title: '缴费方式',
					key: 'pay_type'
				},
				{
					title: '缴费时间',
					render: (h, params) => {
						return h('span', getLocalTime(params.row.pay_time))
					}
				},
        	],
        	
        	paymentRecordsList: [],
        	
        }
    },
    methods: {//方法
    	
    	getPaymentRecords(){
    		$ax.getAjaxData('member.Do/myFee', {}, res => {
    			if(res.code == 0){
    				this.paymentRecordsList = res.data;
    			}
    		});
    	}
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	if(!isCarryOutHook){
    		this.getPaymentRecords();
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
		
		(async() => {//执行异步函数
			
			//async、await错误处理
			try {
				
				let getPaymentRecords = await $ax.getAsyncAjaxData('member.Do/myFee');//获取缴费记录列表
				
				next(vm => {
					if(getPaymentRecords.code == 0){
						vm.paymentRecordsList = getPaymentRecords.data;
					}
				});
				
			} catch(err) {
				console.log(err);
			}
			
			next();
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>