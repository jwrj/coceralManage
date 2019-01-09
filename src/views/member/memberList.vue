<template>
	
	<div>
		
		<Card dis-hover :bordered="false">
			
			<h1 slot="title">会员列表</h1>
			
			<xw-table
			:okBtnHide="true"
			modalCancelBtnName="关闭"
			@on-btn-click="tabBtnClick"
			:modalTitle="modalTitle"
			:tableColumns="tableColumns"
			:tableData="memberDataList"
			>
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
					
					<Divider orientation="left" style="font-size: 16px;">社会职务</Divider>
					
					<Table stripe :columns="societyDutyColumns" :data="societyDutyList"></Table>
					
				</div>
			</xw-table>
			
		</Card>
		
	</div>
	
</template>

<script>
let isCarryOutHook = false;
export default {
	name: 'memberList',
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
        	
        	modalTitle: '',//对话框标题
        	
        	personInfo: {},//身份资料
        	
        	companyInfo: {},//公司信息
        	
        	showData: [
        		{
        			label: '姓名',
        			value: 'person_name',
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
        	
        	memberDataList: [],
        	
        	societyDutyColumns: [
    			{
    				title: 'ID',
    				key: 'id'
    			},
    			{
    				title: '机构名称',
    				key: 'org'
    			},
    			{
    				title: '职务',
    				key: 'dudy'
    			},
    			{
    				title: '职务级别',
    				key: 'lev'
    			},
    			{
    				title: '届次',
    				key: 'jie'
    			},
    			{
    				title: '备注',
    				key: 'remark'
    			}
    		],
    		
    		societyDutyList: [],
        	
        }
    },
    methods: {//方法
    	
    	tabBtnClick(val){
    		if(val.key === 'details'){//详情
    			this.modalTitle = '（'+ val.params.row.person_info.truest_name +'）详细资料';
    			$ax.getAjaxData('member.Do/memberInfo', {
    				mid: val.params.row.id,
    			}, res => {
    				if(res.code == 0){
    					this.personInfo = res.data.person_info;
    					this.companyInfo = res.data.company_info;
    					this.societyDutyList = res.data.duty_list;
    				}
    			});
    		}
    	},
    	
    	getMemberData(){//获取会员列表
    		$ax.getAjaxData('member.Do/memberList', {}, res => {
    			if(res.code == 0){
    				this.memberDataList = res.data;
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
	.my-form .ivu-form-item{
		margin-bottom: 0px !important;
	}
</style>