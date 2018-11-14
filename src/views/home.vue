<template>
	
	<div>
		
		<Row :gutter="20">
		    <Col v-for="item in infoData" :xs="12" :sm="8" :md="6" :lg="4" class="info-box">
		    	<Card class="info-card" :shadow="true" :padding="0">
	    			<Row class="info-row" type="flex">
	    				<Col class="info-left" span="8" :style="{background: item.bgColor}">
	    					<Icon color="#fff" size="30" :type="item.icon" />
	    					<p class="info-left-text">{{item.title}}</p>
	    				</Col>
	    				<Col class="info-right" span="16">
	    					<p class="info-right-num">{{item.num}}</p>
	    				</Col>
	    			</Row>
		    	</Card>
		    </Col>
	    </Row>
		
		<p>本届会费：200</p>
		<p>应缴：200</p>
		<p>实缴：100</p>
		<p>欠缴：100</p>
		
		<!--<Card dis-hover :bordered="false">
			<h1 slot="title">申请加入商协会</h1>
			<join-chamber :isModule="true"></join-chamber>
		</Card>-->
		
		<!--<Card dis-hover :bordered="false" style="margin-top: 20px;">
			<h1 slot="title">我的申请记录</h1>
			<apply-record></apply-record>
		</Card>-->
		
		<Card>
			
			<h1 slot="title">社会职务列表</h1>
			
			<society-duty></society-duty>
			
		</Card>
		
		
		
	</div>
	
</template>

<script>
import joinChamber from '@/views/user/joinChamber.vue';
import applyRecord from '@/views/user/applyRecord.vue';
import societyDuty from '@/views/user/societyDuty.vue';
export default {
	name: 'home',
	components:{//组件模板
		joinChamber,
		applyRecord,
		societyDuty
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
        	
        	infoData: [
        		{
        			title: '企业',
        			num: 800,
        			icon: 'md-podium',
        			bgColor: '#19be6b',
        		},
        		{
        			title: '人员',
        			num: 400,
        			icon: 'md-people',
        			bgColor: '#2d8cf0',
        		},
        		{
        			title: '新增',
        			num: 200,
        			icon: 'md-person-add',
        			bgColor: '#ff9900',
        		},
        	],
        	
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
	.info-box{
		height: 100px;
		padding-bottom: 10px;
		.info-card{
			height: 100%;
			overflow: hidden;
			.info-row{
				height: 100%;
				.info-left{
					display: flex;
					flex-wrap: wrap;
					align-content: space-around;
					justify-content: center;
					.info-left-text{
						color: #fff;
						text-align: center;
						width: 100%;
						font-size: 14px;
					}
				}
				.info-right{
					text-align: center;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					.info-right-num{
						width: 100%;
						font-size: 50px;
					}
				}
			}
		}
	}
</style>

<style lang="less">
	.info-card{
		.ivu-card-body{
			height: 100%;
		}
	}
</style>