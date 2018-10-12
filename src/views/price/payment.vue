<template>

	<div id="payment">
		<Card>
			<h1 slot="title">会员信息</h1>
			<Row>
				<Col span="4" style="text-align: right;">
					<p>姓名：</p>
					<p>岗位：</p>
					<p>届次：</p>
				</Col>
				<Col span="6">
					<p>{{username}}</p>
					<p>{{work}}</p>
					<p style="color: red;">{{post_num}}</p>
				</Col>
				<Col span="4" style="text-align: right;">
					<p>届次时间：</p>
					<p>截至时间：</p>
					<p>岗位会费：</p>
				</Col>
				<Col span="6">
					<p>{{post_from}}</p>
					<p>{{post_to}}</p>
					<p>{{price}}</p>
				</Col>
			</Row>
		</Card>
		<Card style="margin-top: 16px;">
			<div slot="title" class="title">
				<h1>缴费记录</h1>
				<Button style="margin-left: 10px;" size="small" type="primary" @click="addRecord">添加缴费记录</Button>
			</div>
			<table-list :tableColumns="tableColumns" :tableData="tableData">

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
			<Modal v-model="modalShow">
				<p slot="header">添加一条记录</p>
				<div>
					<Form :model="paying" ref="paying" :rules="ruleValidate" :label-width="80">

						<FormItem label="缴费类别:" prop="kind">
    <RadioGroup v-model="paying.kind" type="button">
        <Radio :label="item" v-for="item of list" ></Radio>
    </RadioGroup>
						</FormItem>
						<FormItem label="届次:" prop="jc">
							<Input v-model="paying.jc" style="width: 237px;"></Input>
						</FormItem>
						<FormItem label="金额:" prop="price">
							<Input style="width: 237px;" v-model="paying.price">
							<span slot="append">元</span>
							</Input>
						</FormItem>
						
						<FormItem label="时间:" prop="time">
							<DatePicker type="date" @on-change="dateChange" :value="paying.time"style="width: 237px;"></DatePicker>
						</FormItem>
						
						<FormItem label="缴纳方式:" prop="way">
							<Select v-model="paying.way" placeholder="请选择方式" style="width: 237px;">
								<Option value="wayOne">现金缴纳</Option>
								<Option value="wayTwo">对公转账</Option>
								<Option value="wayThree">基金冲减</Option>
							</Select>
						</FormItem>
						</Form>
				</div>
				<div slot="footer">
					<Button @click="modalShow = false">取消</Button>
					<Button type="primary" @click="handleSubmit('paying')">确定</Button>
				</div>
			</Modal>
		</Card>

	</div>

</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'; //表格列表组件
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
		},
		data() { //数据
			return {
				username: '张三',
				work: '普通会员',
				post_num: '5',
				post_from: '2018-1-1',
				post_to: '2019-1-1',
				price: '100元',
				pay: 'both',
				list:['特殊会费','岗位会费','基金会费'],
				paying: {
					price: '',
					kind: '特殊会费',
					way: '',
					time: '',
					jc:''
				},
				modalShow: false,
				tableColumns: [{
						title: 'ID',
						key: 'id'
					},
					{
						title: '缴费条目',
						key: 'clauses'
					},
					{
						title: '实缴金额',
						key: 'paidMoney'
					},
					{
						title: '时间',
						key: 'time'
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
				tableData: [
					{
						id: 1,
						clauses: '会费',
						paidMoney: '100',
						time: '2018-10-09'
					},
					{
						id: 1,
						clauses: '特殊会费1',
						paidMoney: '100',
						time: '2018-10-09'
					},
					{
						id: 1,
						clauses: '基金会费',
						paidMoney: '100',
						time: '2018-10-09'
					},
				],
				ruleValidate: {
					time: [{
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					price: [{
						required: true,
						message: '请填写金额',
						trigger: 'blur'
					}],
					kind: [{
						required: true,
						message: '请选择类别',
						trigger: 'blur'
					}],
					way: [{
						required: true,
						message: '请选择方式',
						trigger: 'blur'
					}],
					jc: [{ 
						required: true, 
						message: '请输入届次', 
						trigger: 'blur' ,
						},
					{ 
						type: 'number', 
						message: '请输入数字格式', 
						trigger: 'blur', 
						transform(value) {
							return Number(value);
						}}
					]
				},
			}
		},
		methods: { //方法
			
			dateChange(date){
				
				this.paying.time = date;
				
			},
			
			addRecord() {
				
				this.modalShow = true;
				
			},
      		handleSubmit(name) {
      			
				this.$refs[name].validate((valid) => {
					
					if (valid) {
						
						this.$Message.success('添加成功!');
						
					    this.modalShow=false;
					    
					    this.tableData.push({
							id: 1,
							clauses: '会费',
							paidMoney: '100',
							time: '2018-10-09'
						})
					    
					} else {
						
						//this.$Message.error('添加失败!');
						
					}	
				})
			}
      		
		},
		computed: { //计算属性
　　pokerHistory() {
　　　　return this.paying.kind
　　}
		},
		watch: { //监测数据变化
        pokerHistory(newValue, oldValue) {
　　　　console.log(newValue)
　　}
		},

		//===================组件钩子===========================

		created() { //实例被创建完毕之后执行

		},
		mounted() { //模板被渲染完毕之后执行
		},

		//=================组件路由勾子==============================

		beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）

			(async () => { //执行异步函数

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

				} catch (err) {
					console.log(err);
				}

			})();

		},

	}
</script>

<style scoped lang="less">
	.btnSmall {
		margin-left: auto;
	}
	.title {
		display: flex;
		align-items: center;
	}
</style>
