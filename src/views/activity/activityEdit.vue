<template>

	<div>
		
		<Form ref="activity" :model="activity" :rules="ruleValidate" :label-width="130">
			
			<Row>
				
				<Col span="24">
					<FormItem label="会议活动标题" prop="name">
						<Input v-model="activity.name"></Input>
					</FormItem>
				</Col>
				
				<Col span="24">
					<FormItem label="会议地址" prop="address">
						<Input v-model="activity.address"></Input>
					</FormItem>
				</Col>
				
				<Col :xs="24" :sm="24" :md="16" :lg="12">
					<FormItem label="开始时间" prop="starting">
						<DatePicker :value="activity.starting" 
						type="datetime"
						:transfer="true"
						@on-change="startChange"
						format="yyyy-MM-dd HH:mm"
						style="width: 100%;">
						</DatePicker>
					</FormItem>
				</Col>
				
				<Col :xs="24" :sm="24" :md="16" :lg="12">
					<FormItem label="结束时间" prop="ending">
						<DatePicker :value="activity.ending" 
						type="datetime"
						:transfer="true"
						@on-change="endChange"
						format="yyyy-MM-dd HH:mm"
						style="width: 100%;">
						</DatePicker>
					</FormItem>
				</Col>
				
				<Col :xs="24" :sm="24" :md="16" :lg="12">
					<FormItem label="是否住宿" prop="live">
						<RadioGroup v-model="activity.live">
							<Radio :label="1">是</Radio>
							<Radio :label="0">否</Radio>
						</RadioGroup>
					</FormItem>
				</Col>
				
				<Col :xs="24" :sm="24" :md="16" :lg="12">
					<FormItem label="住宿地址" prop="zaddress" v-if="activity.live == 1">
						<Input v-model="activity.zaddress"></Input>
					</FormItem>
				</Col>
				
			</Row>

		</Form>
		
		<Divider orientation="left" style="font-size: 16px;">会议说明</Divider>
		
		<UEditor :defaultContent="dataInfo.text" :configs='editor_config' @up_editor_content="upEditorContent"></UEditor>
		
		<div style="text-align: center;margin-top: 16px;">
			<Button type="primary"  @click="handleSubmit('activity')">保存修改</Button>
		</div>
		
	</div>

</template>

<script>
import UEditor from '@/components/richTextEditor/UEditor.vue';//富文本编辑器
export default {
	name: 'activityEdit',
	components: { //组件模板,
		UEditor
	},
	props: { //组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
		dataInfo: {
			type: Object,
		}
	},
	data() { //数据
		return {
			
			editor_content: '<p>无内容</p>',
			
			editor_config:{
				width:'100%',
				height:'500px'
			},
			
			activity: {
				name: this.dataInfo.title,
				starting: getTimeMinute(this.dataInfo.begin_time),
				ending: getTimeMinute(this.dataInfo.end_time),
				address: this.dataInfo.address,
				zaddress: this.dataInfo.zaddress,
				live: Number(this.dataInfo.isz)
			},
			
			ruleValidate: {
				
				name: [{
					required: true,
					message: '请输入会议名称',
					trigger: 'blur'
				}],
				
				starting: [{
					required: true,
					message: '请选择开始时间',
					trigger: 'change'
				}],
				
				ending: [{
					required: true,
					message: '请选择结束时间',
					trigger: 'change'
				}],
				
				live: [{
					type: 'number',
					required: true,
					message: '是否住宿',
					trigger: 'change'
				}],
				
				zaddress: [{
					required: true,
					message: '请输入住宿地址',
					trigger: 'blur'
				}],
				
				address: [{
					required: true,
					message: '请输入会议地址',
					trigger: 'blur'
				}]
				
			},
			
		}
		
	},
	methods: { //方法
		
		setSubmit(){//设置提交数据
			$ax.getAjaxData('manage.Action/adctinEdit', {
				id: this.dataInfo.id,
				title: this.activity.name,//主题
				begin_time: this.activity.starting,//开始时间
				end_time: this.activity.ending,//结束时间
				address: this.activity.address,//会仪地址
				isz: this.activity.live,//是否住宿
				zaddress: this.activity.zaddress,//住宿地址。（不住就不填）
				text: this.editor_content,//会议说明
			}, res => {
				if(res.code == 0){
					this.$emit('on-edit-succeed');//编辑成功回调事件
					this.$parent.$parent.modalShow = false
					this.$Message.success('保存成功');
				}
			});
		},
		
		handleSubmit(name) {//提交修改
			this.$refs[name].validate((valid) => {
				if (valid) {
					this.setSubmit();
				}
			});
		},
		
		upEditorContent(value){//富文本输入时
			if(value){
				this.editor_content = value;
			}else{
				this.editor_content = '<p>无内容</p>';
			}
    	},
    	
		endChange(date){ //日期转换
			this.activity.ending = date;
		},
		
		startChange(date){//日期转换
			this.activity.starting = date;
		},
		
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
	.btnSmall {
		margin-left: auto;
	}

	.title {
		display: flex;
		align-items: center;
	}
</style>
