<template>
	
	<div>
		
		<Card dis-hover :bordered="false">
			
			<h1 slot="title">商会列表</h1>
			
			<xw-table
			:tableColumns="tableColumns"
			:tableData="coceralList"
			:modalTitle="modalTitle"
			@on-btn-click="onBtnClick">
				
				<div slot="header" style="margin-right: 10px;display: flex;align-items: center;">
					
					<!--<div style="border: 1px solid #dcdee2;margin-right: 10px;padding: 5px 7px;border-radius: 4px;">
						<RadioGroup>
					        <Radio label="1">全部</Radio>
					        <Radio label="2">商会</Radio>
					        <Radio label="3">协会</Radio>
					    </RadioGroup>
					</div>-->
				    
				    <div style="border: 1px solid #dcdee2;padding: 5px 7px;border-radius: 4px;">
						<RadioGroup v-model="coceralType" @on-change="coceralChange">
					        <Radio :label="1">我创建的商会</Radio>
					        <Radio :label="2">我加入的商会</Radio>
					    </RadioGroup>
					</div>
					
				</div>
				
				<div slot="modalContent">
					
				</div>
				
			</xw-table>
			
		</Card>
		
	</div>
	
</template>

<script>
export default {
	name: 'chamberList',
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
        	
        	coceralType: 1,
        	
        	modalTitle: '',
        	
        	tableColumns: [
        		{
					align: 'center',
					width: 200,
					title: '操作',
					handle: [
						{
							name: '详情',
							key: 'details',
							modalShow: true,
						},
						{
							name: '切换登录',
							key: 'handoverLogin',
						},
						{
							name: '管理',
							key: 'manage',
							modalShow: true,
							callback(params, btnParams){
								if(params.row.org_name){
									btnParams.hideBtn = true;
								}else{
									btnParams.hideBtn = false;
								}
							}
						},
					],
				}
        	],
    		
    		coceralList: [],
        	
        }
    },
    methods: {//方法
    	
    	initTableColumns(){
    		let createData = [
	    		{
					title: 'ID',
					key: 'id'
				},
				{
					title: '名称',
					key: 'name'
				},
				{
					title: '会长',
					key: 'contact'
				},
	    	];
	    	
	    	let joinData = [
				{
					title: '名称',
					key: 'org_name'
				},
				{
					title: '会长',
					key: 'contact'
				},
				{
					title: '加入公司',
					key: 'company_name'
				},
	    	];
	    	this.tableColumns.splice(0, this.tableColumns.length-1);
	    	if(this.coceralType == 1){//我创建的
	    		this.tableColumns.unshift(...createData);
			}else if(this.coceralType == 2){//我加入的
				this.tableColumns.unshift(...joinData);
			}else{}
    	},
    	
    	onBtnClick(val){
    		if(this.coceralType == 1){
    			this.modalTitle = val.params.row.name + '（' + val.name + '）';
    		}else if(this.coceralType == 2){
    			this.modalTitle = val.params.row.org_name + '（' + val.name + '）';
    		}
    		console.log(val.key);
    	},
    	
    	getCreateCoceralList(){//获取我创建的商会列表
    		$ax.getAjaxData('user.Comm/myCreateOrganize', {}, res => {
				if(res.code == 0){
					this.coceralList = res.data;
				}
			});
    	},
    	
    	getJoinCoceralList(){//获取我加入的商会列表
    		$ax.getAjaxData('user.Comm/myJoinOrganize', {
				company_id: -1
			}, res => {
				if(res.code == 0){
					this.coceralList = res.data;
				}
			});
    	},
    	
    	coceralChange(){//切换加入和创建选项
    		this.initTableColumns();
    		if(this.coceralType == 1){//我创建的
    			this.getCreateCoceralList();
    		}else if(this.coceralType == 2){//我加入的
    			this.getJoinCoceralList();
    		}else{}
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	this.initTableColumns();
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
			try {
				
				let getCreateCoceralList = await $ax.getAsyncAjaxData('user.Comm/myCreateOrganize', {});//获取我创建的商会列表
				
				next(vm => {
					if(getCreateCoceralList.code == 0){
						vm.coceralList = getCreateCoceralList.data;
					}
				});
				
			} catch(err) {
				console.log(err);
				next();
			}
			
			next();
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">
</style>