<template>

	<div class="createCham">
		<p class="title">创建商会/协会 <span class="zero"></span>
			<span>步骤：创建商会/协会</span>>
			<span>
				岗位配置
			</span>><span>
				岗位任职
			</span></p>
		<hr>
		性质：<span class="zero"></span>
		<RadioGroup v-model="nature">
			<Radio label="商会" @click.native="view='chamber'"></Radio>
			<Radio label="协会" @click.native="view='society'"></Radio>
		</RadioGroup>
		<p class="cham" :is="view" keep-alive></p>

		<div style="margin-top: 5%;">
			<p class="space"><span class="tt">联系人：</span>
				<Input v-model="chamberName" placeholder="请输入联系人" style="width: 400px" />
			</p>
			<p class="space"><span class="tt">联系人电话：</span>
				<Input v-model="chamberName" placeholder="请输入联系人电话" style="width: 400px" />
			</p>
			<p class="space"><span class="tt">商会网址：</span>
				<Input v-model="chamberName" placeholder="请输入商会网址" style="width: 400px" />
			</p>
			<p class="space"><span class="tt">商会公众号：</span>
				<Input v-model="chamberName" placeholder="请输入商会公众号" style="width: 400px" />
			</p>
			<p class="space"><span class="tt">商会介绍</span>
				<textarea name="" id="" cols="55" rows="10"></textarea>
			</p>
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
				view: 'chamber'
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
		}

		.zero {
			display: inline-block;
			width: 30px;
		}
	}
</style>
