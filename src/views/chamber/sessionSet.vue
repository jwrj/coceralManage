<template>

	<div>
		
		<Card dis-hover :bordered="false">
			
			<div slot="title">
				<h1>{{`给${coceralName}配置届次`}}</h1>
			</div>
			
			<div>
				
			    <Form ref="formInstance" :model="formData" :rules="formRules" :label-width="90">
					
					<Row>
						
						<Col span="12">
							<FormItem prop="name" label="届次名称">
								<Input v-model="formData.name" clearable placeholder="届次名称" style="width: 240px;"></Input>
							</FormItem>
						</Col>
						
						<Col span="12">
							<FormItem prop="startTime" label="开始时间">
								<DatePicker @on-change="startTime" :value="formData.startTime" placeholder="选择时间" type="date" style="width: 240px;"></DatePicker>
							</FormItem>
						</Col>
						
						<Col span="12">
							<FormItem prop="endTime" label="到期时间">
								<DatePicker @on-change="endTime" :value="formData.endTime" placeholder="选择时间" type="date" style="width: 240px;"></DatePicker>
							</FormItem>
						</Col>
						
					</Row>
					
				</Form>
				
				<div style="text-align: center;padding: 16px 0 16px;">
					<Button type="primary" @click="addJieCi('formInstance')">添加届次</Button>
				</div>
				
			</div>
			
			<Divider orientation="left" style="font-size: 16px;">
				<span>届次列表</span>
				<Tooltip max-width="200" content="根据上面选择的岗位列出对应数据" :transfer="true" placement="top" style="margin-left: 6px;">
					<Icon type="md-information-circle" size="18" color="#2db7f5" style="cursor: pointer;" />
			    </Tooltip>
			</Divider>
			
			<table-list
			:headerShow="false"
			:tableColumns="tableColumns"
			no-data-text="当前岗位暂无数据"
			@on-btn-click="tabBtnClick"
			@on-poptip-ok="tabPoptipOk"
			:tableData="JieCiDataList">
			</table-list>
			
		</Card>
		
		<Modal v-model="editModal" width="500">
	        <p slot="header"></p>
	        <div>
	        	<Form ref="formInstance2" :model="editFormData" :rules="formRules" :label-width="90">
					
					<FormItem prop="name" label="届次名称">
						<Input v-model="editFormData.name" clearable placeholder="届次名称"></Input>
					</FormItem>
				
					<FormItem prop="startTime" label="开始时间">
						<DatePicker @on-change="editStartTime" :value="editFormData.startTime" placeholder="选择时间" type="date" style="width:100%;"></DatePicker>
					</FormItem>
				
					<FormItem prop="endTime" label="到期时间">
						<DatePicker @on-change="editEndTime" :value="editFormData.endTime" placeholder="选择时间" type="date" style="width: 100%;"></DatePicker>
					</FormItem>
				
				</Form>
	        </div>
	        <div slot="footer">
	            <Button @click="editModal = false">取消</Button>
	            <Button type="primary" @click="saveEdit('formInstance2')">保存</Button>
	        </div>
	    </Modal>
		
	</div>

</template>

<script>
let isCarryOutHook = false;
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
			
			editModal: false,//编辑弹窗
			
			editId: '',//需要编辑的数据ID
			
			coceralName: sessionStorage.chamberName || '',//商会名称
			
			formData: {
				name: '',
				startTime: '',
				endTime: '',
			},
			
			editFormData: {
				name: '',
				startTime: '',
				endTime: '',
			},
			
			formRules: {
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				],
				startTime: [
					{ required: true, message: '请选择开始时间', trigger: 'change' }
				],
				endTime: [
					{ required: true, message: '请选择到期时间', trigger: 'change' }
				],
			},
			
			tableColumns: [
				{
					width: 60,
					title: 'ID',
					key: 'id'
				},
				{
					title: '届次名称',
					key: 'jie_name'
				},
				{
					title: '开始时间',
					render: (h, params) => {
						return h('span', getLocalTime(params.row.begin_time))
					}
				},
				{
					title: '到期时间',
					render: (h, params) => {
						return h('span', getLocalTime(params.row.end_time))
					}
				},
				{
    				align: 'center',
    				width: 140,
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
    							title: '您确定删除该数据吗?'
    						}
    					},
    				],
    			}
			],
			
			JieCiDataList: [],
		}
	},
	methods: { //方法
		
		tabBtnClick(val){
			if(val.key === 'edit'){//编辑
				
				this.editId = val.params.row.id;
				
				this.editFormData = {
					name: val.params.row.jie_name,
					startTime: getLocalTime(val.params.row.begin_time),
					endTime: getLocalTime(val.params.row.end_time),
				}
				
				this.editModal = true;
				
			}
		},
		
		tabPoptipOk(val){
			if(val.key === 'del'){//删除届次
				$ax.getAjaxData('manage.Organize/jieDel', {
					id: val.params.row.id
				}, res => {
					if(res.code == 0){
						this.getJieCiData();
						this.$Message.success('删除成功');
					}
				});
			}
		},
		
		saveEdit(name){//保存编辑
			this.$refs[name].validate((valid) => {
				if(valid){
					$ax.getAjaxData('manage.Organize/jieEdit', {
						id: this.editId,
						jie_name: this.editFormData.name,
						begin_time: this.editFormData.startTime,
						end_time: this.editFormData.endTime,
					}, res => {
						if(res.code == 0){
							this.getJieCiData();
							this.editModal = false;
							this.$Message.success('修改成功');
						}
					});
				}
			})
		},
		
		startTime(date){//开始时间
			this.formData.startTime = date;
		},
		
		endTime(date){//到期时间
			this.formData.endTime = date;
		},
		
		editStartTime(date){
			this.editFormData.startTime = date;
		},
		
		editEndTime(date){
			this.editFormData.endTime = date;
		},
		
		addJieCi(name){//添加届次
			this.$refs[name].validate((valid) => {
				if(valid){
					this.addJieCiAjax();
				}
			});
		},
		
		addJieCiAjax(){//提交数据接口
			$ax.getAjaxData('manage.Organize/jieAdd', {
				jie_name: this.formData.name,//届次名
				begin_time: this.formData.startTime,//开始时间
				end_time: this.formData.endTime,//结束时间
			}, res => {
				if(res.code == 0){
					this.$refs['formInstance'].resetFields();
					this.getJieCiData();
					this.$Message.success('添加成功');
				}
			});
		},
		
		getJieCiData(){//获取届次列表
			$ax.getAjaxData('manage.Organize/jieList', {}, res => {
				if(res.code == 0){
					this.JieCiDataList = res.data;
				}
			});
		}
		
	},
	computed: { //计算属性

	},
	watch: { //监测数据变化

	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		if(!isCarryOutHook){
    		this.getJieCiData();
    	}
	},
	mounted() { //模板被渲染完毕之后执行

	},
	destroyed(){//Vue 实例销毁后调用
		isCarryOutHook = false;
	},

	//=================组件路由勾子==============================

	beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）
		
		isCarryOutHook = true;
		
		(async () => { //执行异步函数

			try {

				let getJieCiList = await $ax.getAsyncAjaxData('manage.Organize/jieList', {});//获取届次列表
				
				next(vm => {
					if(getJieCiList.code == 0){
						vm.JieCiDataList = getJieCiList.data;
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
</style>
