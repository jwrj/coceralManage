<template>

	<div>
		
		<Card>
			
			<h1 slot="title">创建商/协会</h1>
			
			<Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="100">
				
				<Row :gutter="16">
				
					<Col span="24">
						<FormItem label="性质" prop="nature">
							<RadioGroup v-model="formData.nature" @on-change="RadioGroupChange">
								<Radio :label="1">商会</Radio>
								<Radio :label="2">协会</Radio>
							</RadioGroup>
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'名称'" prop="name">
							<Input v-model="formData.name" clearable placeholder="请输入名称" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="上级商会">
							<Input v-model="formData.superior" placeholder="这个字段为预留字段目前没用到" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="注册地" prop="domicile" >
							<al-cascader v-model="formData.domicile" data-type="code" placeholder="选择注册地" style="max-width: 300px;" />
						</FormItem>
					</Col>
						
					<!--商会-->
					<Col v-if="formData.nature === 1" :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="所属地" prop="originPlace">
							<al-cascader v-model="formData.originPlace" data-type="code" placeholder="选择所属地" style="max-width: 300px;" />
						</FormItem>
					</Col>
					<!--商会-->
						
					<!--协会-->
					<Col v-if="formData.nature === 2" :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="行业" prop="industry">
							<industry-casc v-model="formData.industry" style="width: 300px;"></industry-casc>
						</FormItem>
					</Col>
					
					<Col v-if="formData.nature === 2" :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="成立时间" prop="establishTime">
				       		<DatePicker type="date" 
							@on-change="timeChange" 
							value="formData.establishTime" 
							placeholder="选择日期"
							style="width: 300px;">
							</DatePicker>
						</FormItem>
					</Col>
					<!--协会-->
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="联系人" prop="linkman">
							<Input v-model="formData.linkman" clearable placeholder="请输入联系人" style="max-width: 300px;" />
						</FormItem>
					</Col>
						
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem label="联系人电话" prop="linkmanPhone">
							<Input v-model="formData.linkmanPhone" clearable placeholder="请输入联系人电话" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'网址'">
							<Input v-model="formData.website" clearable placeholder="请输入网址" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'公众号'">
							<Input v-model="formData.vipcn" clearable placeholder="请输入公众号" style="max-width: 300px;" />
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'标志'">
							<Icon type="md-image" @click.native="logoClick" size="60"/>
						</FormItem>
					</Col>
					
					<Col :xs="24" :sm="24" :md="12" :lg="12">
						<FormItem :label="title+'介绍'">
							<Input v-model="formData.introduce" 
							type="textarea" placeholder="请输入介绍..." 
							style="max-width: 300px;"/>
						</FormItem>
					</Col>
						
				</Row>
				
			</Form>
			
			<div style="text-align: center;padding-top: 16px;">
				<Button type="primary" @click="submit('formInstance')">立即创建</Button>
			</div>
			
		</Card>
		
        <Modal v-model="modalShow" width="80%">
	        <p slot="header">选择文件</p>
	        <file-yun v-model="selectFile"></file-yun>
	    </Modal>
	    
	    {{selectFile}}
		
	</div>

</template>

<script>

import industryCasc from '@/components/industry/industry-casc.vue';//行业级联

import fileYun from '@/components/fileY/file-yun.vue';

export default {
	name: 'createChamber',
	components: { //组件模板,
		industryCasc,
		fileYun
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
			
			selectFile: [],
			
			modalShow: false,
			
			title: '商会',
			
			formData: {
				nature: 1,//性质
				name: '',//名称
				superior: '',//上级
				domicile: [],//注册地
				originPlace: [],//所属地
				industry: [],//行业
				establishTime: '',//成立时间
				linkman: '',//联系人
				linkmanPhone: '',//联系人电话
				website: '',//网址
				vipcn: '',//公众号
				introduce: ''//介绍
			},
			
			ruleData: {
				nature: [
					{ type: 'number', required: true, message: '请选择性质', trigger: 'change' }
				],
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur' }
				],
				domicile: [
					{ type: 'array', required: true, message: '请选择注册地', trigger: 'change' }
				],
				originPlace: [
					{ type: 'array', required: true, message: '请选择所属地', trigger: 'change' }
				],
				industry: [
					{ type: 'array', required: true, message: '请选择行业', trigger: 'change' }
				],
				establishTime: [
					{ required: true, message: '请选择成立时间', trigger: 'change' }
				],
				linkman: [
					{ required: true, message: '请输入联系人', trigger: 'blur' }
				],
				linkmanPhone: [
					{ required: true, message: '请输入联系人电话', trigger: 'blur' }
				],
			}
		}
	},
	methods: { //方法
		
		RadioGroupChange(val){
			
			if(val === 1){
				
				this.title = '商会';
				
			}else if(val === 2){
				
				this.title = '协会';
				
			}
			
		},
		
		timeChange(date){
			
			this.formData.establishTime = date;
			
		},
		
		logoClick(){
			
			this.modalShow = true;
			
		},
		
		submit(name){
			
			this.$refs[name].validate((valid) => {
				
                if (valid) {
                	
                	$ax.getAjaxData('user.Comm/addOrganize', {
				
						isshang: this.formData.nature,//商会还是协会
						name: this.formData.name, //名称
						fid: 0, //上级商协会ID
						nation: 86, //国家
						provice: this.formData.domicile[0], //省
						city: this.formData.domicile[1], //市
						county: this.formData.domicile[2], //县
						town: this.formData.domicile[3], //镇
						contact: this.formData.linkman, //联系人
						mobile: this.formData.linkmanPhone, //电话
						website: this.formData.website, //网址
						gzh: this.formData.vipcn, //公众号
						introduce: this.formData.introduce, //介绍
						nation2: 86, //所属地国家
						provice2: this.formData.originPlace[0], //省
						city2: this.formData.originPlace[1], //城市
						county2: this.formData.originPlace[2], //县
						town2: this.formData.originPlace[3], //镇
						hx1: this.formData.industry[0], //一级行业
						hx2: this.formData.industry[1], //二级行业
						setup_time: this.formData.establishTime, //成立时间
						icon: '', //图标
						
					}, res => {
						
					});
                	
                    //this.$Message.success('创建成功!');
                    
                } else {
                	
                    //this.$Message.error('创建失败!');
                    
                }
                
            })
			
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
	
}
</script>

<style scoped lang="less">
</style>