<template>

	<div class="createCham">
		<Card>
			<h1 slot="title">
				创建商会/协会
				<span class="zero"></span>
				<span>步骤：创建商会/协会</span>>
				<span>岗位配置</span>>
				<span>岗位任职</span>
			</h1> 
     <Form :label-width="80">
			 <FormItem label="性质:">
			 <RadioGroup v-model="nature">
			 	<Radio label="商会" @click.native="view='chamber'"></Radio>
			 	<Radio label="协会" @click.native="view='society'"></Radio>
			 </RadioGroup>
			 </FormItem>
		 </Form>
			<p class="cham" :is="view" keep-alive></p>
</Card>
<Card>
<Form :model="link" :label-width="80">
        <FormItem label="联系人">
            <Input v-model="link.linkman" placeholder="请输入联系人" class="linkIn"></Input>
        </FormItem>
        <FormItem label="联系人电话:">
        	<Input v-model="link.linkphone" placeholder="请输入联系人电话" class="linkIn"></Input>
        </FormItem>
		
		<FormItem label="商会网址:">
			<Input v-model="link.linkweb" placeholder="请输入商会网址" class="linkIn"></Input>
		</FormItem>
		<FormItem label="商会公众号:">
			<Input v-model="link.linknum" placeholder="请输入商会公众号" class="linkIn"></Input>
		</FormItem>
		<FormItem label="商会介绍:">
		 <Input v-model="link.linknote" type="textarea" :autosize="{minRows: 2,maxRows: 7}" class="linkIn"></Input>
		</FormItem>
				<p style="text-align: center;margin-top: 15px;">
					<Button type="primary" size="large">立即创建</Button>
				</p>
				</Form>
			</Card>
		</div>

	</div>

</template>

<script>
	import chamber from '@/views/chamber/component/chamber'
	import society from '@/views/chamber/component/society'
	export default {
		name: 'createChamber',
		components: { //组件模板,
			chamber,
			society
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
				nature: '商会',
				view: 'chamber',
	                link: {
                   linkman:'',
				   linknum:'',
				   linkweb:'',
				   linkphone:'',
				   linknote:''
                }
			}
		},
		methods: { //方法

		},
		computed: { //计算属性

		},
		watch: { //监测数据变化
		},

		//===================组件钩子===========================

		created() { //实例被创建完毕之后执行

		},
		mounted() { //模板被渲染完毕之后执行

		}
	}
</script>

<style scoped lang="less">
	.createCham {
		margin: 5px;
		.title {
			font-size: 18px;
			font-weight: 700;
			color: black;
		}

		.tt {
			text-align: left;
			width: 100px;
			display: inline-block;
		}

		.space {
			margin-top: 5px;
			display: flex;
			align-items: center;
		}

		.zero {
			display: inline-block;
			width: 30px;
		}
		.linkIn{
			width: 300px;
		}
	}
</style>
