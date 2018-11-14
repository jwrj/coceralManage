<template>
	
	<div>
		
		<Card dis-hover :bordered="false">
			
			<div slot="title">
				
				<h1>{{`给${coceralName}的岗位配置人员`}}</h1>
				
				<div class="cardTitle" style="margin-top: 16px;">
					<post-casc v-model="postId" @on-change="postChange"></post-casc>
					
					<Select v-model="jieCiId" :label-in-value="true" @on-change="jieCiChange" @on-clear="jieCiclear" clearable placeholder="选择届次" not-found-text="当前岗位还没有届次" style="width:100px;margin-left: 10px;">
				        <Option v-for="item in jieCiData" :value="item.value" :key="item.value">{{item.label}}</Option>
				    </Select>
				</div>
				
			</div>
			
			<div>
				
			    <Form ref="formInstance" :model="formData" :rules="formRules" :label-width="100">
					
					<Row>
						
						<Col span="12">
							<FormItem prop="startTime" label="任职开始时间">
								<DatePicker @on-change="startTime" :value="formData.startTime" placeholder="选择时间" type="date" style="width: 240px;"></DatePicker>
							</FormItem>
						</Col>
						
						<Col span="12">
							<FormItem prop="endTime" label="任职结束时间">
								<DatePicker @on-change="endTime" :value="formData.endTime" placeholder="选择时间" type="date" style="width: 240px;"></DatePicker>
							</FormItem>
						</Col>
						
						<Col span="12">
							<FormItem label="相关附件">
								<Input placeholder="(没用到)比如任命通知/coc云盘的附件链接等等" style="width: 240px;"></Input>
							</FormItem>
						</Col>
						
						<Col span="24">
							<FormItem label="已选会员">
								<div class="cardTitle">
									<Button @click="memberListShow = true" type="primary" size="small">从会员列表选择</Button>
									<Tooltip max-width="200" :transfer="true" placement="top" style="margin-left: 10px;">
										<Icon type="md-information-circle" size="18" color="#2db7f5" style="cursor: pointer;" />
										<div slot="content">
											<span>标签为</span>
											<span style="color: #19be6b;">绿色</span>
											<span>表示添加成功，标签为</span>
											<span style="color: #ed4014;">红色</span>
											<span>表示添加失败(人员已重复)</span>
										</div>
								    </Tooltip>
								</div>
								<div>
									<Tag v-for="item in checkedMembers" :color="item.color" :name="item.id" closable @on-close="tagClose">{{item.name}}</Tag>
								</div>
							</FormItem>
						</Col>
						
					</Row>
					
					<div style="text-align: center;padding: 16px 0 16px;">
						<Button type="primary" @click="addPersonnel('formInstance')">添加人员</Button>
					</div>
					
				</Form>
				
			</div>
			
			
			<Divider orientation="left" style="font-size: 16px;">
				<span>人员列表</span>
				<Tooltip max-width="200" content="根据上面选择的岗位和届次列出对应数据，默认列出全部数据" :transfer="true" placement="top" style="margin-left: 6px;">
					<Icon type="md-information-circle" size="18" color="#2db7f5" style="cursor: pointer;" />
			    </Tooltip>
			</Divider>
			
			<div style="margin-bottom: 10px;">
				<Tag color="cyan">
					<span v-for="(item, i) in postTextArr" style="display: inline-block;">
						<Icon v-if="i != 0" type="md-arrow-forward" />
						<span>{{item}}</span>
					</span>
				</Tag>
				<Tag color="cyan">
					<span>{{jieName}}</span>
				</Tag>
			</div>
			
			<table-list
			:headerShow="false"
			:tableColumns="tableColumns"
			:tableData="personnelList"
			no-data-text="当前岗位或届次暂无数据"
			@on-poptip-ok="poptipOk">
			</table-list>
			
		</Card>
		
		<Drawer
            title="会员列表"
            v-model="memberListShow"
            width="50%"
        >
        	<userList
        	ref="userListInstance"
        	:titleShow="false"
        	:selectShow="true"
        	:styleShow="false"
        	@on-select-change="memberSelect"
        	></userList>
        	
        	<div style="text-align: center;margin-top: 26px;">
        		<Button type="default" @click="memberListShow = false" icon="md-arrow-round-back">返回</Button>
        	</div>
        	
		</Drawer>
		
	</div>
	
</template>

<script>
let isCarryOutHook = false;
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
        	
        	memberListShow: false,
        	
        	coceralName: sessionStorage.chamberName || '',//商会名称
        	
        	postId: [],//岗位id
        	
        	jieCiId: 0,//届次ID
        	
        	jieName: '未选择届次',//届次名称
        	
        	jieCiData: [],//届次数据
        	
        	checkedMembers: [],//选中的会员
        	
        	postTextArr: ['未选择岗位'],//当前岗位文本
        	
			formData: {
				startTime: '',
				endTime: '',
			},
			
			formRules: {
				startTime: [
					{ required: true, message: '请选择开始时间', trigger: 'change' }
				],
				endTime: [
					{ required: true, message: '请选择结束时间', trigger: 'change' }
				],
			},
        	
        	tableColumns: [
    			{
    				width: 60,
    				title: 'ID',
    				key: 'id'
    			},
    			{
    				title: '姓名',
    				render: (h, params) => {
    					return h('span', params.row.memberInfo.person_name)
    				}
    			},
    			{
    				title: '任职开始时间',
    				render: (h, params) => {
						return h('span', getLocalTime(params.row.begin_time))
					}
    			},
    			{
    				title: '任职结束时间',
    				render: (h, params) => {
						return h('span', getLocalTime(params.row.end_time))
					}
    			},
    			{
    				align: 'center',
    				width: 180,
    				title: '操作',
    				handle: [
    					{
    						name: '卸任',
    						key: 'del',
    						poptipOpen: true,
    						poptip_props: {
    							title: '您确定要卸任此人？'
    						}
    					},
    				],
    			}
    		],
    		
    		personnelList: [],
    		
        }
    },
    methods: {//方法
    	
    	memberSelect(data){//选择会员时触发
    		let newArr = [];
    		data.forEach(item => {
    			newArr.push({
    				name: item.person_info.truest_name,
    				id: item.id,
    				color: 'default'
    			});
    		});
    		this.checkedMembers = newArr;
    	},
    	
    	startTime(date){//开始时间
			this.formData.startTime = date;
		},
		
		endTime(date){//结束时间
			this.formData.endTime = date;
		},
		
		tagClose(ev, id){//删除已选会员
			let oldMemberList = this.$refs.userListInstance.memberList;
			oldMemberList.forEach(item => {
				if(item.id == id){
					item._checked = false;
				}
			});
			this.checkedMembers.forEach((item, index, oldArr) => {
				if(item.id == id){
					oldArr.splice(index, 1);
				}
			});
		},
    	
		poptipOk(val){//卸任
			if(val.key === 'del'){
				$ax.getAjaxData('manage.Organize/gangweiMemberDel', {
					id: val.params.row.id,
				}, res => {
					if(res.code == 0){
						this.getPersonnelData(this.postId, this.jieCiId);
						this.$Message.success('卸任成功');
					}
				});
			}
		},
		
		addPersonnel(name){//添加人员
			if(this.postId.length <= 0){
				this.$Message.info('必须选择岗位!');
			}else if(!this.jieCiId){
				this.$Message.info('必须选择届次!');
			}else{
				this.$refs[name].validate((valid) => {
					if(valid && this.checkedMembers.length > 0){
						this.setSubmitAjax();
					}
					if(this.checkedMembers.length <= 0){
						this.$Message.info('请选择会员!');
					}
				});
			}
		},
		
		setSubmitAjax(){//设置提交数据
			
			let membersIds = [];
			
			this.checkedMembers.forEach(item => {
				membersIds.push(Number(item.id));
			});
			
			let obj = {
				gw_id: this.postId[this.postId.length-1],//岗位ID
				jie_id: this.jieCiId,//届的ID
				mid: membersIds,//会员ID
				begin_time: this.formData.startTime,//开始时间
				end_time: this.formData.endTime//结束时间
			}
			
			$ax.getAjaxQsStringify('manage.Organize/gangweiPersonMore', obj, res => {
				if(res.code == 0){
					let tf1 = false;
					let tf2 = false;
					res.data.forEach(item => {
						if(item.result == 0){//有重复人员
							tf1 = true;
							this.checkedMembers.forEach(item2 => {
								if(item2.id == item.mid){
									item2.color = 'error';
								}
							});
						}else{
							tf2 = true;
							this.checkedMembers.forEach(item2 => {
								if(item2.id == item.mid){
									item2.color = 'success';
								}
							});
						}
					});
					if(!tf1 && tf2){
						this.getPersonnelData(this.postId, this.jieCiId);
						this.$Message.success('添加成功，已选人员添加成功');
					}else if(tf1 && !tf2){
						this.$Message.error('添加失败，已选人员重复添加！');
					}else{
						this.getPersonnelData(this.postId, this.jieCiId);
						this.$Message.info('部分人员添加成功，重复人员添加失败');
					}
				}
			});
			
		},
		
		postChange(postId, postData){//岗位选择改变时
			this.getPersonnelData(postId, 0);
			let newArr = [];
			postData.forEach(item => {
				newArr.push(item.label);
			});
			this.postTextArr = newArr;
		},
		
		jieCiChange(obj){//选择届次时触发
			if(obj != undefined){
				this.jieName = obj.label;
				this.getPersonnelData(this.postId, obj.value);
			}else{
				this.jieName = '未选择届次';
				this.jieCiId = 0;
			}
		},
		
		jieCiclear(){//清空届次时触发
			this.getPersonnelData(this.postId, 0);
		},
		
		getJieCiList(){//获取届次列表
			this.jieCiId = 0;
			$ax.getAjaxData('manage.Organize/jieList', {}, res => {
				if(res.code == 0){
					let newArr = [];
					res.data.forEach(item => {
						newArr.push({
							label: item.jie_name,
							value: item.id
						})
					});
					this.jieCiData = newArr;
				}
			});
		},
		
		getPersonnelData(postId, jieId){//获取人员列表数据
			$ax.getAjaxData('manage.Organize/gangweiMemberList', {
				gw_id: postId && postId.length > 0 ? postId[postId.length-1] : '',//岗位ID
				jie_id: jieId//届次ID
			}, res => {
				if(res.code == 0){
					this.personnelList = res.data;
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
    	if(!isCarryOutHook){
    		this.getJieCiList();
    	}
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	destroyed(){//Vue 实例销毁后调用
		isCarryOutHook = false;
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		isCarryOutHook = true;
		
		(async() => {//执行异步函数
			
			try {

				let getJieCiList = await $ax.getAsyncAjaxData('manage.Organize/jieList', {});//获取届次列表
				
				next(vm => {
					if(getJieCiList.code == 0){
						let newArr = [];
						getJieCiList.data.forEach(item => {
							newArr.push({
								label: item.jie_name,
								value: item.id
							})
						});
						vm.jieCiData = newArr;
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
