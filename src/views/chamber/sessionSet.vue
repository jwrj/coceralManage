<template>

	<div>
		
		<Card>
			
			<div slot="title" class="cardTitle">
				<h1>{{`给${coceralName}配置届次`}}</h1>
				<post-casc v-model="postId" @on-change="postChange" style="margin-left: 10px;"></post-casc>
			</div>
			
			<div>
				
			    <Form ref="formInstance" :model="formData" :rules="formRules" :label-width="80">
					
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
						
						<Col span="12">
							<FormItem prop="standard" label="会费标准">
								<InputNumber v-model="formData.standard" :max="10000000" :min="0" style="width: 240px;"></InputNumber>
							</FormItem>
						</Col>
						
					</Row>
					
				</Form>
				
				<div style="text-align: center;padding-bottom: 16px;">
					<Button type="primary" @click="addJieCi('formInstance')">添加届次</Button>
				</div>
				
			</div>
			
			
			<Divider orientation="left" style="font-size: 16px;">
				
				<span>届次列表</span>
			</Divider>
			
			<div style="margin-bottom: 10px;">
				<Tag color="geekblue">
					<span v-for="(item, i) in postTextArr" style="display: inline-block;">
						<Icon v-if="i != 0" type="md-arrow-forward" />
						<span>{{item}}</span>
					</span>
				</Tag>
			</div>
			
			<table-list
			:headerShow="false"
			:tableColumns="tableColumns"
			:tableData="JieCiDataList">
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
			
			coceralName: sessionStorage.chamberName || '',//商会名称
			
			postId: [],//岗位ID
			
			postTextArr: ['未选择岗位'],//当前岗位文本
			
			formData: {
				name: '',
				startTime: '',
				endTime: '',
				standard: null,
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
				standard: [
					{ type: 'number', required: true, message: '请输入会费标准', trigger: 'blur' }
				],
			},
			
			tableColumns: [
				{
					width: 60,
					title: 'ID',
					key: 'id'
				},
				{
					title: '届次',
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
					title: '会费标准(元)',
					render: (h, params) => {//这里要除回100才是正确的数
						let feeNum = Number(params.row.fee);
						let newFeeNum = feeNum/100;
						return h('span', newFeeNum)
					}
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
			
			JieCiDataList: [],
		}
	},
	methods: { //方法
		
		startTime(date){//开始时间
			this.formData.startTime = date;
		},
		
		endTime(date){//到期时间
			this.formData.endTime = date;
		},
		
		addJieCi(name){//添加届次
			if(this.postId.length <= 0){
				this.$Message.info('必须选择岗位');
			}else{
				this.$refs[name].validate((valid) => {
					if(valid){
						this.addJieCiAjax();
					}
				});
			}
		},
		
		addJieCiAjax(){//提交数据接口
			$ax.getAjaxData('manage.Organize/jieAdd', {
				gw_id: this.postId && this.postId.length > 0 ? this.postId[this.postId.length-1] : '',//岗位ID
				jie_name: this.formData.name,//届次名
				begin_time: this.formData.startTime,//开始时间
				end_time: this.formData.endTime,//结束时间
				fee: this.formData.standard*100 //会费,单位分 整数提交需要转化数据,乘100
			}, res => {
				if(res.code == 0){
					this.getJieCiData(this.postId);
					this.$Message.success('添加成功');
				}
			});
		},
		
		postChange(postId, postData){//岗位选择改变时
			this.getJieCiData(postId);
			let newArr = [];
			postData.forEach(item => {
				newArr.push(item.label);
			});
			this.postTextArr = newArr;
		},
		
		getJieCiData(postId){//获取届次数据
			$ax.getAjaxData('manage.Organize/jieList', {
				gw_id: postId && postId.length > 0 ? postId[postId.length-1] : '',//岗位ID
			}, res => {
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
</style>
