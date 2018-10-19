<template>
	
	<div>
		
		<Card>
			
			<div slot="title" class="title">
				
				<h1>给广西湖北商会的岗位配置人员</h1>
				
				<post-casc v-model="postId" @on-change="postChange" style="margin-left: 10px;"></post-casc>
				
				<Select v-model="jieCiId" @on-change="jieCiChange" @on-clear="jieCiclear" clearable placeholder="选择届次" not-found-text="当前岗位还没有届次" style="width:100px;margin-left: 10px;">
			        <Option v-for="item in jieCiData" :value="item.value" :key="item.value">{{item.label}}</Option>
			    </Select>
			    
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
								<div style="width: 240px;">
									<Button @click="memberListShow = true" type="primary" size="small">从会员列表选择</Button>
								</div>
								<div>
									<Tag v-for="item in checkedMembers" :color="item.color" :name="item.id" closable @on-close="tagClose">{{item.name}}</Tag>
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
					<span v-for="(item, i) in postTextArr" style="display: inline-block;">
						<Icon v-if="i != 0" type="md-arrow-forward" />
						<span :style="{color: i == postTextArr.length-1 ? '#ed4014' : ''}">{{item}}</span>
					</span>
				</Tag>
				<Tag color="geekblue">
					第<span style="color: #ed4014;">{{jieCiId}}</span>届
				</Tag>
				<span>人员列表（根据上面选择的岗位和届次列出对应数据，默认列出全部数据）</span>
			</Divider>
			
			<table-list
			:headerShow="false"
			:tableColumns="tableColumns"
			:tableData="personnelList"
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
		</Drawer>
		
	</div>
	
</template>

<script>
import tableList from '@/components/tableList/table-list.vue'
import postCasc from '@/components/post/post-casc.vue';
import userList from '@/views/user/userList.vue';
import qs from 'qs';
const getLocalTime = (nS) => {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/\//g, "-").replace(/上午([\d\:]*)/g, "");
}
//const qs = require('qs'); axios自带qs插件
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
        	
        	postId: [],//岗位id
        	
        	jieCiId: 0,//届次ID
        	
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
    	
		poptipOk(){//卸任
			this.$Message.success('卸任成功');
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
			
			let obj = {
				gw_id: this.postId[this.postId.length-1],//岗位ID
				jie_id: this.jieCiId,//届的ID
				begin_time: this.formData.startTime,//开始时间
				end_time: this.formData.endTime//结束时间
			}
			
			let membersIds = [];
			
			this.checkedMembers.forEach(item => {
				membersIds.push(Number(item.id));
			});
			
			let member = this.QSStringify({mid: membersIds});
			
			$ax.getAjaxData('manage.Organize/gangweiPersonMore', Object.assign({}, obj, member), res => {
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
						this.$Message.success('已选人员添加成功');
					}else if(tf1 && !tf2){
						this.$Message.error('已选人员重复添加！');
					}else{
						this.$Message.info('部分人员添加成功');
					}
				}
			});
			
		},
		
		postChange(postId, postData){//岗位选择改变时
			this.getJieCiData(postId);
			this.getPersonnelData(postId, 0);
			let newArr = [];
			postData.forEach(item => {
				newArr.push(item.label);
			});
			this.postTextArr = newArr;
		},
		
		jieCiChange(jieId){//选择届次时触发
			if(jieId != undefined){
				this.getPersonnelData(this.postId, jieId);
			}else{
				this.jieCiId = 0;
			}
		},
		
		jieCiclear(){//清空届次时触发
			this.getPersonnelData(this.postId, 0);
		},
		
		getJieCiData(postId){//获取届次数据
			this.jieCiId = 0;
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
		
		QSStringify(params={}){//qs序列化提交数组到后台
			
			let str = '{'+qs.stringify(params, {encoder: function(str){
	    		if(typeof(str) === 'string' && typeof(str) !== 'number'){
	    			return '"'+ str +'"'
	    		}else{
	    			return str
	    		}
	    	}})+'}';
	    	
	    	let jsonStr = str.replace(/\=/g, ':').replace(/\&/g, ',');
	    	
	      	let jsonData = JSON.parse(jsonStr);
	      	
	      	return jsonData;
	      	
		},
		
    },
    computed: {//计算属性
        
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
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
