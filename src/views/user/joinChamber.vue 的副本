<template>

	<div class="joinCb">
		<!--商会header开始-->
		<div class="header">
			 <Card>
                <h1 slot="title">选择商会</h1>
				<table-list>
					<div slot="header" slot-scope="selectChange">12321</div>
				</table-list>
			</Card>
		</div>
		<!--商会header结束-->
		<!--商会center开始-->
		<div class="center">
			<Card>			 
			<div slot="title" class="title">
				<h1>个人资料</h1>
				<Button class="btnSmall" size="small" type="info" @click="changeData">修改资料</Button>
      </div>
			<p class="personal">
				<Row>
					<Col span="5">姓名：</Col>
					<Col span="7">张三</Col>
					<Col span="5">性别：</Col>
					<Col span="7">男</Col>
					<Col span="5">出生年月:</Col>
					<Col span="7">1970-01-01</Col>
					<Col span="5">组件导入:</Col>
					<Col span="7">导入取代</Col>
				</Row>

			</p>
			</Card>
		</div>
		<!--商会center结束-->
		<div class="footer">
			 <Card>
						<div slot="title" class="title">
							<h1>选择公司(非必填)</h1>
							<Button class="btnSmall" size="small" type="info" @click="manageCompany">管理公司</Button>
						</div>
			<p class="comList">
				<RadioGroup v-model="company">
					<Radio v-for="(com,index) in companyList" :key="index" :label="com"></Radio>
				</RadioGroup>
			</p>
			<p class="comList">
				<Button  type="primary" @click="submitApp">提交申请</Button>
			</p>
			</Card>
		</div>
	</div>

</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'
	export default {
		name: 'joinChamber',
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
			 * 		
			 */

			columns1: {
				type: Array,
				default: () => [{
						title: '商会名称',
						key: 'cham_name',
						align: 'center'
					},
					{
						title: '商会ID',
						key: 'cham_id',
						align: 'center'
					},
					{
						title: '会长',
						key: 'chairman',
						align: 'center'
					},
					{
						title: '秘书长',
						key: 'secre',
						align: 'center'
					}
				]
			},
			rowData: {
				type: Array,
				default: () => [{
						cham_name: '广西湖北商会',
						cham_id: 14245000042000000128,
						chairman: '张三',
						secre: '李四'
					},
					{
						cham_name: '广西湖北商会',
						cham_id: 14245000042000000138,
						chairman: '王五',
						secre: '徐六'
					}
				]
			},
			person: {
				type: Array,
				default: () => [{
						'姓名': '张三'
					}, '男', '身份证', '450112199705840987', '中国', '汉族', '广西南宁市', '0771-1231231', '13812344321', 'dklfjdf', '1234561213',
					'广西南宁市民族大道123号-1', '本科', '党员', '中国共产党', '已婚', '173', '65KG'
				]
			}
		},
		data() { //数据
			return {
				chamber: '',
				company: '',
				companyList: ['公司1', '公司2', '公司3'],
			}
		},
		methods: { //方法
			manageCompany() {
				alert('to manage company')
			},
			changeData() {
				alert('to change data')
			},
			submitApp() {
				alert('to submit application')
			},
			choiceRow(currentRow, oldCurrentRow) {
				alert(currentRow.chairman)
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

	}
</script>

<style scoped lang="less">
	.joinCb {
		padding: 5px;

		.title {
			font-size: 18px;
			font-weight: 700;
			color: black;
		}

		.choice {
			padding-top: 15px;
		}

		.btn {
			margin: 0 10px;
			width: 80px;
			padding: 5px;

		}

		.inputG {
			margin: 8px 0;
		}

		.personal,
		.comList {
			margin: 10px 15px;
			width: 500px;
		}

		.center {
			margin-top: 3em;
		}

		.btnSmall {
     margin-left: auto;
		}

		.center-header {
			display: flex;
			justify-content: space-between;
		}

		.footer {
			margin: 30px 0;
		}
		.title{
			display: flex;
			align-items: center;
		}
	}
</style>
