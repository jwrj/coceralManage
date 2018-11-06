<template>
	
	<div>
		
		<Card>
			
			<div slot="title" class="title">
				<h1>会员审批</h1>
			</div>
			
			<table-list
			@on-poptip-ok="poptipOk"
			@on-btn-click="tabBtnClick"
			:tableColumns="tableColumns"
			:tableData="approveList">
				<div slot="modalContent">
					<Row>
						<Col v-for="item in showData" span="8" offset="4" class="showForm">
							<label>{{item.label}}：</label>
							<span>空</span>
						</Col>
					</Row>
				</div>
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>
import tableList from '@/components/tableList/table-list.vue';
let isCarryOutHook = false;

export default {
	name: 'approve',
	components:{//组件模板,
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
        	
        	detailsInfo: {},
        	
        	showData: [
        		{
        			label: '真实姓名',
        			value: 'truest_name',
        		},
        		{
        			label: '性别',
        			value: 'sex',
        			select: [ ['1', '男'], ['2', '女'] ],
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
        			select: [ ['1', '已婚'], ['2', '未婚'] ],
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
        	
        	tableColumns: [
    			{
    				width: 60,
    				title: 'ID',
    				key: 'id'
    			},
    			{
    				title: '姓名',
    				key: 'person_name'
    			},
    			{
    				title: '公司',
    				key: 'company_name'
    			},
    			{
    				title: '状态',
    				key: 'status_name'
    			},
    			{
    				title: '申请时间',
    				key: 'addtime'
    			},
    			{
    				align: 'center',
    				width: 200,
    				title: '操作',
    				handle: [
    					{
    						name: '详细资料',
    						key: 'details',
    						modalShow: true,
    					},
    					{
    						name: '通过',
    						key: 'pass',
    						poptipOpen: true,
    						button_props: {
    							type: 'primary',
    						},
    						poptip_props: {
    							title: '您确认通过吗？'
    						},
    						callback: (params, btnParams) => {
			        			if(params.row.status != 0){
			        				btnParams.button_props.disabled = true;
			        			}else{
			        				btnParams.button_props.disabled = false;
			        			}
			        		}
    					},
    					{
    						name: '拒绝',
    						key: 'reject',
    						poptipOpen: true,
    						button_props: {
    							type: 'error',
    						},
    						poptip_props: {
    							title: '您确认拒绝吗？'
    						},
    						callback: (params, btnParams) => {
			        			if(params.row.status != 0){
			        				btnParams.button_props.disabled = true;
			        			}else{
			        				btnParams.button_props.disabled = false;
			        			}
			        		}
    					},
    				],
    			}
    		],
    		
    		approveList: [],
        	
        }
    },
    methods: {//方法
    	
    	getApproveData(){//获取审批数据列表
    		$ax.getAjaxData('manage.Member/applyList', {}, res => {
    			if(res.code == 0){
    				this.approveList = res.data;
    			}
			});
    	},
    	
    	tabBtnClick(val){
    		if(val.key === 'details'){//详情
    			$ax.getAjaxData('manage.Member/applyInfo', {
    				apply_id: val.params.row.id,
    			}, res => {
    				if(res.code == 0){
    					this.detailsInfo = res.data;
    				}
    			});
    		}
    	},
    	
    	poptipOk(val){//拒绝或通过
    		if(val.key === 'pass'){//成功通过
      			this.setApplyDo(Number(val.params.row.id), 1);
    		}else if(val.key === 'reject'){//拒绝通过
    			this.setApplyDo(Number(val.params.row.id), 0);
    		}
    	},
    	
    	setApplyDo(apply_id, accept){//设置拒绝或通过接口
    		$ax.getAjaxData('manage.Member/applyDo', {
    			apply_id: apply_id,//申请ID
    			accept: accept,//是否接受：0拒绝、1接受
    		}, res => {
				if(res.code == 0){
					this.getApproveData();
					if(accept === 1){
						this.$Message.success('成功通过');
					}else if(accept === 0){
						this.$Message.error('成功拒绝');
					}
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
    		this.getApproveData();
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
				
				//获取审批数据列表
				let approveData = await $ax.getAsyncAjaxData('manage.Member/applyList', {});
				
				next(vm => {
					if(approveData.code == 0){
						vm.approveList = approveData.data;
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
	.showForm{
		margin-bottom: 10px;
		label{
			display: inline-block;
			width: 80px;
			text-align: right;
		}
	}
</style>
