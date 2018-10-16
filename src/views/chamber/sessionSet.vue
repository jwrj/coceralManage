<template>

	<div>
		
		<Card>
			
			<div slot="title" class="title">
				<h1>给广西湖北商会配置届次</h1>
				<post-casc v-model="postData" style="margin-left: 10px;"></post-casc>
			</div>
			
			<div>
				
			    <Form ref="formInstance" :model="formData" :rules="formRules" :label-width="80">
					
					<Row>
						
						<Col span="12">
							<FormItem prop="name" label="届次名称">
								<Input v-model="formData.name" placeholder="届次名称" style="width: 240px;"></Input>
							</FormItem>
						</Col>
						
						<Col span="12">
							<FormItem prop="startTime" label="开始时间">
								<DatePicker @on-change="startTime" :value="formData.startTime" placeholder="选择时间" type="date" style="width: 240px;"></DatePicker>
							</FormItem>
						</Col>
						
						<Col span="12">
							<FormItem prop="finishTime" label="到期时间">
								<DatePicker @on-change="finishTime" :value="formData.finishTime" placeholder="选择时间" type="date" style="width: 240px;"></DatePicker>
							</FormItem>
						</Col>
						
						<Col span="12">
							<FormItem prop="standard" label="会费标准">
								<Input v-model="formData.standard" placeholder="会费标准" style="width: 240px;"></Input>
							</FormItem>
						</Col>
						
					</Row>
					
				</Form>
				
				<div style="text-align: center;padding-bottom: 16px;">
					<Button type="primary" @click="addData('formInstance')">添加届次</Button>
				</div>
				
			</div>
			
			
			<Divider orientation="left">
				<Tag color="geekblue">
					会员大会
					<Icon type="md-arrow-forward" />
					理事大会
					<Icon type="md-arrow-forward" />
					秘书长
				</Tag>
				<span>届次列表</span>
			</Divider>
			
			<table-list
			:headerShow="false"
			:tableColumns="tableColumns"
			:tableData="tableData">
			</table-list>
			
		</Card>
		
	</div>

</template>

<script>
	import postCasc from '@/components/post/post-casc.vue'; //岗位级联
	import tableList from '@/components/tableList/table-list.vue';//表格列表组件
	export default {
		name: 'sessionSet',
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
				
				postData: [],
				
				formData: {
					name: '',
					startTime: '',
					finishTime: '',
					standard: '',
				},
				
				formRules: {
					name: [
						{ required: true, message: '请输入名称', trigger: 'blur' }
					],
					startTime: [
						{ required: true, message: '请选择开始时间', trigger: 'change' }
					],
					finishTime: [
						{ required: true, message: '请选择到期时间', trigger: 'change' }
					],
					standard: [
						{ required: true, message: '请输入会费标准', trigger: 'blur' }
					],
				},
				
				tableColumns: [
					{
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
			
			startTime(date){
				this.formData.startTime = date;
			},
			
			finishTime(date){
				this.formData.finishTime = date;
			},
			
			addData(name){
				if(this.postData.length <= 0){
					this.$Message.info('必须选择岗位');
				}else{
					this.$refs[name].validate((valid) => {
						if(valid){
							this.$Message.success('添加成功');
						}
					});
				}
			},
			
			setAjax(){
				$ax.getAjaxData('user.Organize/jieAdd', {
					gw_id: '',
					jie_name: '',
					begin_time: '',
					end_time: '',
					fee: ''
				}, res => {
					
				});
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
