<template>

	<div>
		{{info}}
		<Card>
			
			<h1 slot="title">会员信息</h1>
			
			<Row>
				<Col span="8" offset="4" class="showForm">
					<label>姓名：</label>
					<span>{{info.memberInfo ? info.memberInfo.person_name : ''}}</span>
				</Col>
				<Col span="8" offset="4" class="showForm">
					<label>岗位：</label>
					<span>普通会员</span>
				</Col>
				<Col span="8" offset="4" class="showForm">
					<label>届次：</label>
					<span>5</span>
				</Col>
				<Col span="8" offset="4" class="showForm">
					<label>届次时间：</label>
					<span>2018-1-1</span>
				</Col>
				<Col span="8" offset="4" class="showForm">
					<label>截至时间：</label>
					<span>2018-1-1</span>
				</Col>
				<Col span="8" offset="4" class="showForm">
					<label>岗位会费：</label>
					<span>100元</span>
				</Col>
			</Row>
				
		</Card>
		
		<Card style="margin-top: 16px;">
			
			<div slot="title" class="cardTitle">
				<h1>缴费记录</h1>
				<Button style="margin-left: 10px;" size="small" type="primary" @click="modalShow = true">添加缴费记录</Button>
			</div>
			
			<table-list :tableColumns="tableColumns" :tableData="recordData">

				<div slot="header" style="width: 100%;display: flex;align-items: center;">
					<p>
						<Select v-model="pay" placeholder="请选择缴费类别" style="width: 200px;">
							<Option value="both">全部</Option>
							<Option value="work">岗位会费</Option>
							<Option value="special">特殊会费</Option>
							<Option value="fund">基金会费</Option>
						</Select>
					</p>
				</div>

			</table-list>
			
			<Modal v-model="modalShow" :footer-hide="true" width="450" class="add-record-modal">
				
				<p slot="header">添加缴费记录</p>
				
				<!--<Button  type="error" size="small" shape="circle" icon="md-close"></Button>-->
				
				<Icon slot="close" size="26" color="#ed4014" type="md-close-circle" />
				
				<div>
					<Form :model="paying" ref="paying" :rules="ruleValidate" :label-width="100">

						<FormItem label="缴费名称:" prop="name">
						    <Input v-model="paying.name"></Input>
						</FormItem>
						
						<FormItem label="缴费金额(元)" prop="price">
							<InputNumber :max="100000" :min="0" v-model="paying.price" style="width: 100%;"></InputNumber>
						</FormItem>
						
						<FormItem label="缴费时间:" prop="time">
							<DatePicker type="date" @on-change="dateChange" :value="paying.time" style="width: 100%;"></DatePicker>
						</FormItem>
						
						<FormItem label="缴费方式:" prop="way">
							<Input v-model="paying.way"></Input>
						</FormItem>
					</Form>
					
					<div style="text-align: center;">
						<Button type="primary" @click="handleSubmit('paying')">添加记录</Button>
					</div>
					
				</div>
				
			</Modal>
			
		</Card>

	</div>

</template>

<script>
import tableList from '@/components/tableList/table-list.vue'; //表格列表组件
const getLocalTime = (nS) => {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/上午([\d\:]*)/g, "");
}
export default {
	name: 'payMent',
	components: { //组件模板,
		tableList
	},
	props: { //组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
		info: {//数据信息
			type: Object,
			default: () => {}
		}
	},
	data() { //数据
		
		return {
			
			pay: '',
			
			paying: {
				name: '',
				price: null,
				way: '',
				time: '',
			},
			
			modalShow: false,
			
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
					title: '时间',
					render: (h, params) => {
						return h('span', getLocalTime(params.row.pay_time))
					}
				},
				{
					align: 'center',
					width: 130,
					title: '操作',
					handle: [
						{
							name: '修改',
							key: 0,
						},
						{
							name: '删除',
							key: 1,
						}
					],
				}
			],
			
			recordData: [],
			
			ruleValidate: {
				time: [{
					required: true,
					message: '请选择缴费日期',
					trigger: 'change'
				}],
				price: [{
					type: 'number',
					required: true,
					message: '请填写缴费金额',
					trigger: 'change'
				}],
				name: [{
					required: true,
					message: '请输入缴费名称',
					trigger: 'blur'
				}],
				way: [{
					required: true,
					message: '请填写缴费方式',
					trigger: 'blur'
				}],
			},
			
		}
	},
	methods: { //方法
		
		dateChange(date){
			this.paying.time = date;
		},
		
		setSubmitData(){//设置提交数据
			$ax.getAjaxData('manage.Fee/addFee', {
				gw_id: this.info.gw_id,//岗位ID
				mid: this.info.memberInfo.id,//会员ID
				jie_id: this.info.jie_id,//届ID
				name: this.paying.name,//费用名
				should_pay: 1,//应交，单位分
				pay_time: this.paying.time,//最近交费时间
				end_time: -1,//到期时间
				payed: this.paying.price*100,//已交，单位分
				pay_type: this.paying.way,//交费方式
			}, res => {
				if(res.code == 0){
					this.modalShow = false;
					this.getRecordList();
					this.$Message.success('添加成功!');
					this.paying = {
						name: '',
						price: null,
						way: '',
						time: '',
					};
				}
			});
		},
		
  		handleSubmit(name) {//提交数据
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.setSubmitData();
				}
			});
		},
		
		getRecordList(){//获取缴费记录列表
			$ax.getAjaxData('manage.Fee/feeList', {
				gw_id: this.info.gw_id,
				jie_id: this.info.jie_id,
				mid: this.info.memberInfo.id
			}, res => {
				if(res.code == 0){
					this.recordData = res.data;
				}
			});
		},
		
	},
	
	computed: { //计算属性
		
	},
	
	watch: { //监测数据变化
		
	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		
		this.getRecordList();
		
	},
	mounted() { //模板被渲染完毕之后执行
	},

	//=================组件路由勾子==============================

	beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）
		
	},

}
</script>

<style scoped lang="less">
	.showForm{
		margin-bottom: 10px;
		label{
			display: inline-block;
			width: 80px;
			text-align: right;
		}
	}
</style>

<style lang="less">
	.add-record-modal{
		.ivu-modal-close{
			top: 13px !important;
		}
	}
</style>
