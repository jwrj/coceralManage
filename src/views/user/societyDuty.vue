<template>
	
	<div>
		
		
		<xw-table
		:tableColumns="tableColumns"
		:tableData="societyDutyList"
		:headerShow="false"
		:footerShow="false"
		>
			
		</xw-table>
		
		<Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="80">
	        <FormItem label="机构名称" prop="organName">
	            <Input v-model="formData.organName"></Input>
	        </FormItem>
	        <FormItem label="职务名称" prop="duty">
	            <Input v-model="formData.duty"></Input>
	        </FormItem>
	        <FormItem label="职务级别" prop="rank">
	            <Input v-model="formData.rank"></Input>
	        </FormItem>
	        <FormItem label="届次名称" prop="jie">
	            <Input v-model="formData.jie"></Input>
	        </FormItem>
	        <FormItem label="备注" prop="remark">
	            <Input v-model="formData.remark"></Input>
	        </FormItem>
	    </Form>
	    
	    <Button type="primary" @click="addSocietyDuty('formInstance')">添加社会职务</Button>
		
	</div>
	
</template>

<script>

export default {
	name: '',
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
        	
        	formData: {
        		organName: '',//机构名称
        		duty: '',//职务名称
        		rank: '',//职务级别
        		jie: '',//届次名称
        		remark: '',//备注
        	},
        	
        	ruleData: {
                organName: [
                    { required: true, message: '请输入机构名称', trigger: 'blur' }
                ],
                duty: [
                    { required: true, message: '请输入职务名称', trigger: 'blur' }
                ],
                rank: [
                    { required: true, message: '请输入职务级别', trigger: 'blur' }
                ],
                jie: [
                    { required: true, message: '请输入届次名称', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '请输入备注', trigger: 'blur' }
                ],
           },
           
           tableColumns:[
    			{
    				title: 'ID',
    				key: 'id'
    			},
    			{
    				title: '机构名称',
    				key: 'org'
    			},
    			{
    				title: '职务',
    				key: 'dudy'
    			},
    			{
    				title: '职务级别',
    				key: 'lev'
    			},
    			{
    				title: '届次',
    				key: 'jie'
    			},
    			{
    				title: '备注',
    				key: 'remark'
    			},
           ],
           
           societyDutyList: [],
        	
        }
    },
    methods: {//方法
    	
    	setSubmitData(){
    		$ax.getAjaxData('user.Comm/dutyAdd', {
    			org: this.formData.organName,
    			dudy: this.formData.duty,
    			lev: this.formData.rank,
    			jie: this.formData.jie,
    			remark: this.formData.remark,
    		}, res => {
    			if(res.code == 0){
    				this.$refs['formInstance'].resetFields();
    				this.$Message.success('添加成功');
    			}
    		});
    	},
    	
    	addSocietyDuty(name){//添加社会职务
    		this.$refs[name].validate((valid) => {
    			if(valid){
    				this.setSubmitData();
    			}
    		});
    	},
    	
    	getSocietyDutyList(){//获取社会职务列表
    		$ax.getAjaxData('user.Comm/dutyList', {}, res => {
    			if(res.code == 0){
    				this.societyDutyList = res.data;
    			}
    		});
    	},
    	
    },
    computed: {//计算属性
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	this.getSocietyDutyList();
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
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
				
			} catch(err) {
				console.log(err);
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>