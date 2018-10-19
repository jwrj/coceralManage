<template>
	
	<div>
		
		<Row :gutter="16" type="flex">
			<Col span="12">
				<Card>
					<h1 slot="title">申请加入商协会</h1>
					<join-chamber :isModule="true"></join-chamber>
				</Card>
			</Col>
			<Col span="12">
				<Card style="height: 100%;">
					<h1 slot="title">我的申请记录</h1>
					<apply-record></apply-record>
				</Card>
			</Col>
		</Row>
		
		
	</div>
	
</template>

<script>
import joinChamber from '@/views/user/joinChamber.vue';
import applyRecord from '@/views/user/applyRecord.vue';
export default {
	name: 'home',
	components:{//组件模板
		joinChamber,
		applyRecord
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
        	
        }
    },
    methods: {//方法
    	
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
		
		(async() => {//执行异步函数
			
			//async、await错误处理
			try {
				
				/**
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