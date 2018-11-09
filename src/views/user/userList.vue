<template>
	
	<div>
		
		<Card dis-hover :bordered="false" :padding="styleShow ? 16 : 0">
			
			<h1 v-if="titleShow" slot="title">会员列表</h1>
			
			<table-list
			@on-btn-click="tabBtnClick"
			:modalTitle="modalTitle"
			:tableColumns="tableColumns"
			:tableData="memberList"
			@select-change="tabSelectChange"
			>
				<div slot="header" style="width: 100%;display: flex;align-items: center;">
					<post-casc></post-casc>
				</div>
				<div slot="modalContent">
					
					<Divider orientation="left" style="font-size: 16px;">个人信息</Divider>
					
					<Form class="my-form" :label-width="80">
						<Row>
							<Col v-for="item in showData" :key="item.value" :xs="24" :sm="12" :md="8" :lg="6">
								<FormItem :label="item.label+'：'">
										<p v-if="item.value === 'brithday'">
											{{getLocalTime(personInfo[item.value])}}
										</p>
										<div v-else-if="item.select">
											<p v-for="seleItem in item.select" v-if="seleItem.value == personInfo[item.value]">
												{{seleItem.label}}
											</p>
										</div>
										<p v-else>
											{{personInfo[item.value]}}
										</p>
						        </FormItem>
					        </Col>
						</Row>
					</Form>
					
					<Divider orientation="left" style="font-size: 16px;">公司信息</Divider>
					
					<Form v-if="companyInfo" class="my-form" :label-width="80">
						<Row>
							<Col v-for="item in companyField" :key="item.value" :xs="24" :sm="12" :md="8" :lg="6">
								<FormItem :label="item.label+'：'">
										<div v-if="item.select">
											<p v-for="seleItem in item.select" v-if="seleItem.value == companyInfo[item.value]">
												{{seleItem.label}}
											</p>
										</div>
										<p v-else>
											{{companyInfo[item.value]}}
										</p>
						        </FormItem>
					        </Col>
						</Row>
					</Form>
					
					<div v-else style="text-align: center;font-size: 16px;color: #c5c8ce;">暂无信息</div>
					
				</div>
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>
import postCasc from '@/components/post/post-casc.vue';
import tableList from '@/components/tableList/table-list.vue';
let isCarryOutHook = false;
export default {
	name: 'userList',
	components:{//组件模板,
		postCasc,
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
		titleShow: {//标题显示
			type: Boolean,
			default: true
		},
		
		selectShow: {//表格多选显示
			type: Boolean,
			default: false
		},
		
		styleShow: {//卡片样式
			type: Boolean,
			default: true
		},
		
	},
    data () {//数据
    	return {
    		
    		modalTitle: '',//对话框标题
        	
        	personInfo: {},//身份资料
        	
        	companyInfo: {},//公司信息
        	
        	showData: [
        		{
        			label: '真实姓名',
        			value: 'truest_name',
        		},
        		{
        			label: '性别',
        			value: 'sex',
        			select: [
        				{
        					label: '男',
        					value: '1'
        				},
        				{
        					label: '女',
        					value: '2'
        				}
        			],
        		},
        		{
        			label: '出生年月',
        			value: 'brithday',
        		},
        		{
        			label: '证件类型',
        			value: 'card_type',
        			select: [
        				{
        					label: '身份证',
        					value: '1'
        				},
        				{
        					label: '居住证',
        					value: '2'
        				},
        				{
        					label: '单身证',
        					value: '3'
        				},
        			],
        		},
        		{
        			label: '证件号码',
        			value: 'card_num',
        		},
        		{
        			label: '国籍',
        			value: 'nation',
        			select: [
        				{
        					label: '中国',
        					value: '80'
        				},
        				{
        					label: '美国',
        					value: '81'
        				},
        				{
        					label: '英国',
        					value: '82'
        				},
        			],
        		},
        		{
        			label: '民族',
        			value: 'mz',
        			select: [
        				{
        					label: '汉族',
        					value: '1'
        				},
        				{
        					label: '壮族',
        					value: '2'
        				},
        				{
        					label: '苗族',
        					value: '3'
        				},
        			],
        		},
        		{
        			label: '籍贯',
        			value: 'hometown',
        		},
        		{
        			label: '工作电话',
        			value: 'work_phone',
        		},
        		{
        			label: '手机号码',
        			value: 'touch_phone',
        		},
        		{
        			label: '微信账号',
        			value: 'wechat',
        		},
        		{
        			label: 'QQ账号',
        			value: 'qq',
        		},
        		{
        			label: '现在住址',
        			value: 'address',
        		},
        		{
        			label: '学历',
        			value: 'education',
        			select: [
        				{
        					label: '本科',
        					value: '1'
        				},
        				{
        					label: '专科',
        					value: '2'
        				},
        				{
        					label: '研究生',
        					value: '3'
        				},
        			],
        		},
        		{
        			label: '政治面貌',
        			value: 'politics',
        			select: [
        				{
        					label: '群众',
        					value: '1'
        				},
        				{
        					label: '团员',
        					value: '2'
        				},
        				{
        					label: '党员',
        					value: '3'
        				},
        			],
        		},
        		{
        			label: '婚姻状况',
        			value: 'marriage',
        			select: [
        				{
        					label: '已婚',
        					value: '1'
        				},
        				{
        					label: '未婚',
        					value: '2'
        				}
        			],
        		},
        		{
        			label: '身高(cm)',
        			value: 'height',
        		},
        		{
        			label: '体重(kg)',
        			value: 'weigh',
        		},
        	],
        	
        	companyField: [
        		{
        			label: '公司名称',
        			value: 'name'
        		},
        		{
        			label: '公司行业',
        			value: 'industry',
        			select: ['hx1', 'hx2']
        		},
        		{
        			label: '国家',
        			value: 'nation',
        			select: [
        				{
        					label: '中国',
        					value: '80'
        				},
        				{
        					label: '美国',
        					value: '81'
        				},
        				{
        					label: '英国',
        					value: '82'
        				},
        			]
        		},
        		{
        			label: '公司地址',
        			value: 'address',
        			select: ['provice', 'city', 'county']
        		},
        		{
        			label: '企业官网',
        			value: 'website'
        		},
        		{
        			label: '主营业务',
        			value: 'business'
        		},
        	],
    		
    		tableColumns: [
    			{
    				width: 60,
    				type: 'selection'
    			},
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
    			{
    				align: 'center',
    				width: 100,
    				title: '操作',
    				handle: [
    					{
    						name: '详细资料',
    						key: 'details',
    						modalShow: true,
    					},
    				],
    			}
    		],
    		
    		memberList: [],
    		
    	}
    },
    methods: {//方法
    	
    	tabBtnClick(val){
    		if(val.key === 'details'){//详情
    			this.modalTitle = '（'+ val.params.row.person_info.truest_name +'）详细资料';
    			$ax.getAjaxData('manage.Member/memberInfo', {
    				mid: val.params.row.id,
    			}, res => {
    				if(res.code == 0){
    					this.personInfo = res.data[0].person_info;
    					this.companyInfo = res.data[0].company_info;
    				}
    			});
    		}
    	},
    	
    	tabSelectChange(data){//勾选改变时
    		this.$emit('on-select-change', data);
    	},
    	
    	getMemberDataList(){//获取会员列表数据
    		$ax.getAjaxData('manage.Member/memberList', {}, res => {
    			if(res.code == 0){
    				this.memberList = res.data;
    			}
    		});
    	},
    	
    	getLocalTime(nS){//时间戳转字符到日期
			return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/[上午|下午]([\d\:]*)/g, "");
		},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	if(!isCarryOutHook){
    		this.getMemberDataList();
    	}
	},
    mounted () {//模板被渲染完毕之后执行
    	
    	if(!this.selectShow){
    		this.tableColumns.splice(0, 1);
    	}
    	
	},
	destroyed(){//Vue 实例销毁后调用
		isCarryOutHook = false;
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		isCarryOutHook = true;
		
		(async () => { //执行异步函数
			
			try{
				
				//获取会员列表数据
				let getMemberData = await $ax.getAsyncAjaxData('manage.Member/memberList', {});
				
				next(vm => {
					if(getMemberData.code == 0){
						vm.memberList = getMemberData.data;
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
	.my-form .ivu-form-item{
		margin-bottom: 0px !important;
	}
</style>
