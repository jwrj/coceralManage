<template>

	<div>
		
		<Card>
			
			<div slot="title" class="title">
				<h1>届次配置</h1>
				<Button style="margin-left: 10px;" size="small" type="primary" @click="addSession">添加届次</Button>
			</div>
			
			<table-list :tableColumns="tableColumns" :tableData="tableData">

				<div slot="header" style="width: 100%;display: flex;align-items: center;">
					<post-casc style="margin-right: 10px;"></post-casc>

				</div>

			</table-list>
			
			<Modal 
			v-model="showSess"
			title="添加届次"
			footer-hide>
				<Form :model="formItem" :label-width="80">
					
			        <FormItem label="届次名称:">
			            <Input v-model="formItem.jc" placeholder="Enter something..." style="width: 240px;"></Input>
			        </FormItem>
			        
					<FormItem label="开始时间:">
						<DatePicker 
						:value="formItem.startTime" 
						type="date"
						@on-change="start"
						style="width: 240px;"
						>
						</DatePicker>
					</FormItem>
					
					<FormItem label="到期时间:">
						<DatePicker 
						:value="formItem.expirationTime" 
						type="date"
						@on-change="end"
						style="width: 240px;"
						>
						</DatePicker>
					</FormItem>
					
					<FormItem label="会费标准:">
						<Input v-model="formItem.criterion" placeholder="Enter something..." style="width: 240px;"></Input>
					</FormItem>
					
					<FormItem>
						<Button type="primary" size="large" @click.stop="add">确定添加</Button>
					</FormItem>
					
				</Form>

			</Modal>
			
		</Card>

	</div>

</template>

<script>
	import postCasc from '@/components/post/post-casc.vue'; //岗位级联
	import tableList from '@/components/tableList/table-list.vue';//表格列表组件
	export default {
		name: '',
		components: { //组件模板,
			postCasc,
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
				showSess:false,
				formItem:{
					id:1,
					jc:'',
					startTime:'',
					expirationTime:'',
					criterion:''
				},
				tableColumns: [{
						title: 'ID',
						key: 'id'
					},
					{
						title: '届次',
						key: 'jc'
					},
					{
						title: '开始时间',
						key: 'startTime'
					},
					{
						title: '到期时间',
						key: 'expirationTime'
					},
					{
						title: '会费标准',
						key: 'criterion'
					},
					{
	    				align: 'center',
	    				width: 140,
	    				title: '操作',
	    				handle: [
	    					{
	    						name: '编辑',
	    					},
	    					{
	    						name: '删除',
	    					},
	    				],
	    			}
				],
				
				tableData: [
	    			{
	    				id: 1,
	    				jc: '第一届',
	    				mobilePhone: '13800138000',
	    				startTime: '2018-10-09',
	    				expirationTime: '2018-10-09',
	    				criterion: '200'
	    			},
	    			{
	    				id: 1,
	    				jc: '第一届',
	    				mobilePhone: '13800138000',
	    				startTime: '2018-10-09',
	    				expirationTime: '2018-10-09',
	    				criterion: '200'
	    			},
	    			{
	    				id: 1,
	    				jc: '第一届',
	    				mobilePhone: '13800138000',
	    				startTime: '2018-10-09',
	    				expirationTime: '2018-10-09',
	    				criterion: '200'
	    			},
	    		],
			}
		},
		methods: { //方法
			addSession(){
				this.showSess=true;
			},
			start(date){
				this.formItem.startTime = date;
			},
			end(date){
				this.formItem.expirationTime = date;
			},
			add(){
				console.log(this.formItem);
				this.formItem.id=1;
				let result = Object.assign({}, this.formItem);
				this.tableData.push(result)
				this.showSess=false;
				this.formItem={}
			}
			
		},
		computed: { //计算属性

		},
		watch: { //监测数据变化

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
	.title {
		display: flex;
		align-items: center;
	}
</style>
