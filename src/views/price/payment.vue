<template>

	<div>
		
		<Divider orientation="left">会员信息</Divider>
		
		<Form class="my-form" :label-width="100">
			<Row>
				<Col :xs="24" :sm="12" :md="8" :lg="6">
					<FormItem label="姓名：">
						{{info.memberInfo ? info.memberInfo.person_name : ''}}
			        </FormItem>
		        </Col>
				<Col :xs="24" :sm="12" :md="8" :lg="6">
					<FormItem label="岗位：">
						{{info.gw_info ? info.gw_info.name : ''}}
			        </FormItem>
		        </Col>
				<Col :xs="24" :sm="12" :md="8" :lg="6">
					<FormItem label="届次：">
						{{info.jie_info ? info.jie_info.jie_name : ''}}
			        </FormItem>
		        </Col>
				<Col :xs="24" :sm="12" :md="8" :lg="6">
					<FormItem label="届次开始时间：">
						{{info.jie_info ? getLocalTime(info.jie_info.begin_time) : ''}}
			        </FormItem>
		        </Col>
				<Col :xs="24" :sm="12" :md="8" :lg="6">
					<FormItem label="届次到期时间：">
						{{info.jie_info ? getLocalTime(info.jie_info.end_time) : ''}}
			        </FormItem>
		        </Col>
				<Col :xs="24" :sm="12" :md="8" :lg="6">
					<FormItem label="岗位会费：">
						{{`${info.jie_info ? Number(info.jie_info.fee)/100 : ''}元`}}
			        </FormItem>
		        </Col>
			</Row>
		</Form>
		
		<Divider orientation="left">缴费记录</Divider>
		
		<xw-table
		:tableColumns="tableColumns"
		:tableData="recordData"
		@on-btn-click="tabBtnClick"
		@on-poptip-ok="tabPoptipOk">
			<div slot="header" style="width: 100%;display: flex;align-items: center;">
				<Select v-model="pay" placeholder="请选择缴费类别" style="width: 200px;">
					<Option value="both">全部</Option>
					<Option value="work">岗位会费</Option>
					<Option value="special">特殊会费</Option>
					<Option value="fund">基金会费</Option>
				</Select>
				<Button style="margin-left: 10px;" type="primary" @click="addRecordBtn">添加缴费记录</Button>
			</div>
		</xw-table>
			
		<Modal v-model="modalShow" width="450">
			
			<p slot="header" v-if="showType === 'add'">添加缴费记录</p>
			
			<p slot="header" v-if="showType === 'edit'">编辑缴费记录</p>
			
			<Form :model="paying" ref="paying" :rules="ruleValidate" :label-width="90">

				<FormItem label="缴费名称" prop="name">
				    <Input v-model="paying.name"></Input>
				</FormItem>
				
				<FormItem label="应缴金额(元)" prop="should_pay">
					<InputNumber :max="100000" :min="0" v-model="paying.should_pay" style="width: 100%;"></InputNumber>
				</FormItem>
				
				<FormItem label="实缴金额(元)" prop="price">
					<InputNumber :max="100000" :min="0" v-model="paying.price" style="width: 100%;"></InputNumber>
				</FormItem>
				
				<FormItem label="缴费时间" prop="time">
					<DatePicker type="date" @on-change="dateChange" :value="paying.time" style="width: 100%;"></DatePicker>
				</FormItem>
				
				<FormItem label="缴费方式" prop="way">
					<Input v-model="paying.way"></Input>
				</FormItem>
			</Form>
				
			<div slot="footer" style="text-align: center;">
				<Button type="primary" @click="addSubmit('paying')">
					{{showType === 'add' ? '添加记录' : '保存编辑'}}
				</Button>
				<Button @click="modalShow = false">取消</Button>
			</div>
			
		</Modal>
			
	</div>

</template>

<script>
const getLocalTime = (nS) => {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/上午([\d\:]*)/g, "");
}
export default {
	name: 'payMent',
	components: { //组件模板,
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
				should_pay: null,
				way: '',
				time: '',
			},
			
			editId: '',//编辑ID
			
			showType: 'add',//对话框显示类型
			
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
				{
					align: 'center',
					width: 130,
					title: '操作',
					handle: [
						{
							name: '编辑',
							key: 'edit',
						},
						{
							name: '删除',
							key: 'del',
							poptipOpen: true,
    						poptip_props: {
    							title: '您确定要删除吗？'
    						}
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
					message: '请填写已缴金额',
					trigger: 'change'
				}],
				should_pay: [{
					type: 'number',
					required: true,
					message: '请填写应缴金额',
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
		
		tabPoptipOk(val){
			if(val.key === 'del'){//删除
				$ax.getAjaxData('manage.Fee/feeDel', {
					id: val.params.row.id,
				}, res => {
					if(res.code == 0){
						this.getRecordList();
						this.$Message.success('删除成功');
					}
				});
			}
		},
		
		tabBtnClick(val){
			if(val.key === 'edit'){//编辑
				this.$refs['paying'].resetFields();
				this.paying = {
					name: val.params.row.name,
					price: Number(val.params.row.payed)/100,
					should_pay: Number(val.params.row.should_pay)/100,
					way: val.params.row.pay_type,
					time: getLocalTime(val.params.row.pay_time),
				};
				this.editId = val.params.row.id;
				this.showType = 'edit';
				this.modalShow = true;
			}
		},
		
		addRecordBtn(){//打开添加缴费记录对话框
			this.$refs['paying'].resetFields();
			this.modalShow = true;
			this.showType = 'add';
		},
		
		dateChange(date){
			this.paying.time = date;
		},
		
		setSubmitData(){//设置提交数据
			$ax.getAjaxData('manage.Fee/addFee', {
				gw_id: this.info.gw_id,//岗位ID
				mid: this.info.memberInfo.id,//会员ID
				jie_id: this.info.jie_id,//届ID
				name: this.paying.name,//费用名
				should_pay: this.paying.should_pay*100,//应交，单位分
				pay_time: this.paying.time,//最近交费时间
				end_time: -1,//到期时间
				payed: this.paying.price*100,//已交，单位分
				pay_type: this.paying.way,//交费方式
			}, res => {
				if(res.code == 0){
					this.getRecordList();
					this.$refs['paying'].resetFields();
					this.modalShow = false;
					this.$Message.success('添加成功');
				}
			});
		},
		
  		addSubmit(name) {//提交数据
			this.$refs[name].validate((valid) => {
				if (valid) {
					if(this.showType === 'add'){
						this.setSubmitData();
					}else if(this.showType === 'edit'){
						$ax.getAjaxData('manage.Fee/feeEdit', {
							id: this.editId,
							name: this.paying.name,//费用名
							should_pay: this.paying.should_pay*100,//应交，单位分
							pay_time: this.paying.time,//最近交费时间
							end_time: -1,//到期时间
							payed: this.paying.price*100,//已交，单位分
							pay_type: this.paying.way,//交费方式
						}, res => {
							if(res.code == 0){
								this.getRecordList();
								this.$refs['paying'].resetFields();
								this.modalShow = false;
								this.$Message.success('保存成功');
							}
						});
					}
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
		
		getLocalTime(nS){//时间戳转字符到日期
			return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/[上午|下午]([\d\:]*)/g, "");
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
	.my-form{
		.ivu-form-item{
			margin-bottom: 0px !important;
		}
	}
</style>

<style lang="less">
	
</style>
