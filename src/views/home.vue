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
		
		<Card dis-hover :bordered="false" style="margin-top: 16px;">
			<div slot="title" class="cardTitle">
				<h1>本届会费统计</h1>
				
				<Select v-model="jieCiId" size="small" @on-change="jieCiChange" placeholder="选择届次" style="width:100px;margin-left: 20px;">
			        <Option v-for="item in jieCiData" :value="item.value" :key="item.value">{{item.label}}</Option>
			    </Select>
				
			</div>
			
			<div style="display: flex;margin-left: -16px;">
				
				<div v-for="item in membershipDues" style="display: flex;border-radius: 4px;margin-left: 16px;overflow: hidden;">
					<div :style="{background: item.bgColor}" style="display: flex;padding: 0 10px;border-right: 1px solid #fff;color: #fff;">
						<span style="width: 14px;margin: auto;font-size: 14px;">{{item.title}}</span>
					</div>
					<div style="padding: 0 10px;background: #f8f8f9;">
						<span style="font-size: 40px;">{{item.money}}</span>
						<sub>元</sub>
					</div>
				</div>
				
			</div>
			
		</Card>
		
		
		<!--<Card dis-hover :bordered="false">
			<h1 slot="title">申请加入商协会</h1>
			<join-chamber :isModule="true"></join-chamber>
		</Card>-->
		
		<!--<Card dis-hover :bordered="false" style="margin-top: 20px;">
			<h1 slot="title">我的申请记录</h1>
			<apply-record></apply-record>
		</Card>-->
		
		<Card dis-hover :bordered="false" style="margin-top: 16px;">
			
			<div slot="title" class="cardTitle">
				<h1>社会职务列表</h1>
				<Button style="margin-left: 20px;" type="primary" size="small" @click="addSocietyDuty">添加社会职务</Button>
			</div>
			
			<society-duty ref="societyDuty"></society-duty>
			
		</Card>
		
		
		
	</div>
	
</template>

<script>
import joinChamber from '@/views/user/joinChamber.vue';
import applyRecord from '@/views/user/applyRecord.vue';
import societyDuty from '@/views/user/societyDuty.vue';
let abs = (val) => {
	//金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
	let str = (Number(val)/100).toFixed(2) + '';
	let intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
	let dot = str.substring(str.length,str.indexOf("."))//取到小数部分搜索
	let ret = intSum + dot;
	return ret;
}
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
        	
        	jieCiData: [],
        	
        	jieCiId: '',
        	
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
        	
        	membershipDues: [
        		{
        			title: '应缴',
        			money: '0.00',
        			bgColor: '#2d8cf0',
        		},
        		{
        			title: '实缴',
        			money: '0.00',
        			bgColor: '#19be6b',
        		},
        		{
        			title: '欠缴',
        			money: '0.00',
        			bgColor: '#ed4014',
        		},
        	],
        	
        }
    },
    methods: {//方法
    	
    	jieCiChange(jieId){//选择届次时触发
    		this.getMDStatistics(jieId);
    	},
    	
    	getJieCiList(){//获取届次列表
			$ax.getAjaxData('manage.Organize/jieList', {}, res => {
				if(res.code == 0){
					let newArr = [];
					res.data.forEach(item => {
						newArr.push({
							label: item.jie_name,
							value: item.id
						})
					});
					this.jieCiData = newArr;
				}
			});
		},
    	
    	getMDStatistics(jieId){//获取会费统计
    		$ax.getAjaxData('manage.Count/feeCount', {
    			jie_id: jieId,
    		}, res => {
    			if(res.code == 0){
    				this.membershipDues[0].money = abs(res.data.should_pay);
    				this.membershipDues[1].money = abs(res.data.payed);
    				this.membershipDues[2].money = abs(res.data.unpay);
    			}
    		});
    	},
    	
    	addSocietyDuty(){//添加社会职务
    		this.$refs.societyDuty.modalShow = true;
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
		
		(async() => {//执行异步函数
			
			try {

				let getJieCiList = await $ax.getAsyncAjaxData('manage.Organize/jieList', {});//获取届次列表
				
				next(vm => {
					if(getJieCiList.code == 0){
						let newArr = [];
						getJieCiList.data.forEach(item => {
							newArr.push({
								label: item.jie_name,
								value: item.id
							})
						});
						vm.jieCiData = newArr;
						if(vm.jieCiData.length > 0){
							vm.jieCiId = vm.jieCiData[0].value;
							$ax.getAjaxData('manage.Count/feeCount', {
								jie_id: vm.jieCiId
							}, res => {
								if(res.code == 0){
									vm.membershipDues[0].money = abs(res.data.should_pay);
				    				vm.membershipDues[1].money = abs(res.data.payed);
				    				vm.membershipDues[2].money = abs(res.data.unpay);
								}
							});
						}
					}
				});

			} catch (err) {
				console.log(err);
			}
			
			next();
			
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