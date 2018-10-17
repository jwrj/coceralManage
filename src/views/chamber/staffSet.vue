<template>
	
	<div>
		
		<Card>
			
			<div slot="title" class="title">
				
				<h1>给广西湖北商会的岗位配置人员</h1>
				
				<post-casc v-model="postId" @on-change="postChange" style="margin-left: 10px;"></post-casc>
				
				<Select v-model="jieCiId" placeholder="选择届次" not-found-text="当前岗位还没有届次" style="width:100px;margin-left: 10px;">
			        <Option v-for="item in jieCiData" :value="item.value" :key="item.value">{{item.label}}</Option>
			    </Select>
			    
			</div>
			
			<div>
				
			    <Form ref="formInstance" :model="formData" :rules="formRules" :label-width="80">
					
					<Row>
						
						<Col span="12">
							<FormItem prop="takeOfficeTime" label="任职时间">
								<DatePicker @on-change="takeOfficeTime" :value="formData.takeOfficeTime" placeholder="选择时间" type="date" style="width: 240px;"></DatePicker>
							</FormItem>
						</Col>
						
						<Col span="12">
							<FormItem label="相关附件">
								<Input placeholder="(没用到)比如任命通知/coc云盘的附件链接等等" style="width: 240px;"></Input>
							</FormItem>
						</Col>
						
						<Col span="24">
							<FormItem label="已选会员">
								<div style="width: 240px;">
									<Poptip placement="bottom-start">
										<Button type="primary" size="small">从会员列表选择</Button>
										<userList slot="content"></userList>
									</Poptip>
								</div>
								<div>
									<Tag closable>张三</Tag>
									<Tag closable>李四</Tag>
									<Tag closable>王五</Tag>
									<Tag closable>张三</Tag>
									<Tag closable>李四</Tag>
									<Tag closable>王五</Tag>
								</div>
							</FormItem>
						</Col>
						
					</Row>
					
					<div style="text-align: center;padding-bottom: 16px;">
						<Button type="primary" @click="addPersonnel('formInstance')">添加人员</Button>
					</div>
					
				</Form>
				
			</div>
			
			
			<Divider orientation="left">
				<Tag color="geekblue">
					会员大会
					<Icon type="md-arrow-forward" />
					理事大会
					<Icon type="md-arrow-forward" />
					秘书长
				</Tag>
				<Tag color="geekblue">第1届</Tag>
				<span>人员列表（根据上面选择的岗位和届次列出对应数据，默认列出全部数据）</span>
			</Divider>
			
			<table-list
			:headerShow="false"
			:tableColumns="tableColumns"
			:tableData="tableData"
			@on-poptip-ok="poptipOk">
			</table-list>
			
		</Card>
		
	</div>
	
</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'
	import postCasc from '@/components/post/post-casc.vue';
	import userList from '@/views/user/userList.vue';
export default {
	name: 'staffSet',
	components:{//组件模板,
		tableList,
		postCasc,
		userList
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
        	
        	postId: [],//岗位id
        	
        	jieCiId: null,//届次ID
        	
        	jieCiData: [],//届次数据
				
			formData: {
				takeOfficeTime: ''
			},
			
			formRules: {
				takeOfficeTime: [
					{ required: true, message: '请选择任职时间', trigger: 'change' }
				],
			},
        	
        	tableColumns: [
    			{
    				title: 'ID',
    				key: 'id'
    			},
    			{
    				title: '姓名',
    				key: 'name'
    			},
    			{
    				title: '手机号',
    				key: 'mobilePhone'
    			},
    			{
    				title: '任职时间',
    				key: 'takeOfficeTime'
    			},
    			{
    				title: '交接时间',
    				key: 'connectTime'
    			},
    			{
    				title: '相关链接',
    				key: 'link'
    			},
    			{
    				align: 'center',
    				width: 180,
    				title: '操作',
    				handle: [
    					{
    						name: '卸任',
    						poptipOpen: true,
    						poptip_props: {
    							title: '您确定要卸任此人？'
    						}
    					},
    				],
    			}
    		],
    		
    		tableData: [
    			{
    				id: 1,
    				name: '张三',
    				mobilePhone: '13800138000',
    				takeOfficeTime: '2018-10-09',
    				connectTime: '2018-10-09',
    				link: '查看'
    			},
    			{
    				id: 1,
    				name: '张三',
    				mobilePhone: '13800138000',
    				takeOfficeTime: '2018-10-09',
    				connectTime: '2018-10-09',
    				link: '查看'
    			},
    			{
    				id: 1,
    				name: '张三',
    				mobilePhone: '13800138000',
    				takeOfficeTime: '2018-10-09',
    				connectTime: '2018-10-09',
    				link: '查看'
    			},
    		],
    		
			columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ]
        	
        }
    },
    methods: {//方法
    	
    	takeOfficeTime(date){//任职时间
    		this.formData.takeOfficeTime = date;
    	},
    	
		poptipOk(){//卸任
			this.$Message.success('卸任成功');
		},
		
		addPersonnel(name){//添加人员
			if(this.postData.length <= 0 && !this.jieCiData){
				this.$Message.info('必须选择岗位和届次');
			}else{
				this.$refs[name].validate((valid) => {
					if(valid){
						this.$Message.success('添加成功');
					}
				});
			}
		},
		
		postChange(postId){//岗位选择改变时
			this.getJieCiData(postId);
		},
		
		getJieCiData(postId){//获取届次数据
			$ax.getAjaxData('manage.Organize/jieList', {
				gw_id: postId && postId.length > 0 ? postId[postId.length-1] : '',//岗位ID
			}, res => {
				if(res.code == 0){
					let newArr = [];
					res.data.forEach(item => {
						newArr.push({
							label: item.jie_name,
							value: Number(item.id)
						})
					});
					this.jieCiData = newArr;
					this.jieCiId = null;
					if(this.jieCiData.length > 0){
						this.jieCiId = this.jieCiData[0].value;
					}
				}
			});
		}
		
    },
    computed: {//计算属性
        
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	if(this.postId && this.postId.length > 0){
    		console.log(this.postId[postId.length-1]);
    		
    	}
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
		.btnSmall {
     margin-left: auto;
		}
		.title{
			display: flex;
			align-items: center;
		}
		.demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>
