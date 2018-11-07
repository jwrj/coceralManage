<template>
	
	<div @click="outermostClick">
		
		<div>
			<Button type="primary" size="small" icon="md-add" @click.stop="open">新建文件夹</Button>
		</div>
		
		<div class="file-breadcrumb">
			<Button @click="returns" v-if="hideRetu" size="small" type="text" icon="md-return-left" style="margin-right: 10px;">
				返回上级
			</Button>
			
			<Breadcrumb>
				<template v-for="(item,index) in breadcrumb">
			        <BreadcrumbItem :to="index != breadcrumb.length-1 ? '?path='+item.path : ''">{{item.name}}</BreadcrumbItem>
				</template>
			</Breadcrumb>
		</div>
		
		<div>
			
			<Row class="fileList">
				<Col span="10">名称</Col>
				<Col span="7">大小</Col>
				<Col span="7">日期</Col>
			</Row>
			
			<div style="overflow-y: auto;height: 400px;padding-bottom: 100px;">
				<Row
				v-for="item in newFileData"
				:key="item.name"
				@click.native.stop="clickFolder(item,$event)"
				@dblclick.native="dblclickFolder(item)"
				class="fileList"
				:class="{active: item.name === activeName}"
				>
					<Col span="10" class="fileList-name">
						<Icon style="margin-right: 8px;" :type="iconType(item.type).icon || ''" size="28" :color="iconType(item.type).color || ''" />
						<span>{{item.name}}</span>
					</Col>
					<Col span="7">200 KB</Col>
					<Col span="7">2018-9-27 2:20</Col>
				</Row>
			</div>
			
		</div>
		
		<Modal v-model="modal">
			<p slot="header">新建文件夹</p>
			<Form ref="formInstance" :model="formData" :rules="ruleData" :label-width="90">
				<FormItem label="文件夹名称" prop="folderName">
			        <Input v-model="formData.folderName" placeholder="输入名称" />
				</FormItem>
			</Form>
	        <div slot="footer">
	            <Button type="primary" @click="addFolder('formInstance')">确定</Button>
	        </div>
	    </Modal>
	    
	</div>
	
</template>

<script>

export default {
	name: 'fileManage',
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
		currentRouteName: {
			type: String,
			required: true
		},
		
		value: {
			type: Object,
			default: () => {return {}}
		},
		
	},
    data () {//数据
        return {
        	
        	fileData: {//文件夹数据
        		children: [],
        		files: [],
        	},
        	
        	formData: {
        		folderName: '',
        	},
        	
        	ruleData: {
				folderName: [
					{ required: true, message: '请输入文件夹名称', trigger: 'blur' }
				]
			},
        	
        	modal: false,//新建文件夹弹窗
        	
        	currentFolder: {},//当前选中的文件夹数据
        	
        	currentFile: {},//当前选中的文件数据
        	
        	pathHistory: [''],//路径记录
        	
        	breadcrumb: [//面包屑导航
        		{
        			name: '全部文件',
        			path: '/'
        		}
        	],
        	
        	newFileData: [],//新的文件数据
        	
        	activeName: '',//选中的文件名称
        	
        	hideRetu: true,//返回上级按钮是否显示
        	
        }
    },
    methods: {//方法
    	
    	outermostClick(){//最外边的点击事件
    		this.activeName = '';
    		//this.currentFolder = {};
    	},
    	
    	returns(){//返回上级
    		this.$router.go(-1);
    	},
    	
    	open(){//打开弹窗
    		this.modal = true;
    	},
    	
    	addFolder(name){//新建文件夹
    		this.$refs[name].validate((valid) => {
    			if(valid){
    				let publicFn = (data) => {
    					let children = data.children;
		    			children.push({
		    				name: this.formData.folderName,
		        			type: 'folder',
		        			children: [],
		        			files: []
		    			});
		    			this.$set(data, 'children', children);
		    			this.init(this.$route);
    				}
		    		if(Object.keys(this.currentFolder).length <= 0){//根目录
		    			publicFn(this.fileData);
		    		}else{
		    			publicFn(this.currentFolder);
		    		}
    			}
    		});
    	},
    	
    	clickFolder(current,e){//单击事件
    		if(current.children && current.files){//单击了文件夹
    			
    			this.getFileData(21, current.id, current);
    			
    			this.currentFolder = current;
	    		this.pathHistory.push(current.name);//记录路径
				this.$router.push({
		    		name: this.currentRouteName,
		    		query: {
		    			path: this.pathHistory.join('/')
		    		}
		    	});
    		}else{//单击了文件
    			this.currentFile = current;
    			this.activeName = current.name;//选中样式
    		}
    		this.$emit('input', [this.currentFolder, this.currentFile]);
    	},
    	
    	dblclickFolder(current){//双击事件
    		
    		if(current.children && current.files){//双击了文件夹
    			
    		}else{//双击了文件
    			
    		}
	    	
    	},
    	
    	iconType(type){
    		
    		let obj = {};
    		
    		if(type === 'folder'){
    			obj = {
    				icon: 'md-folder',
    				color: '#ffcd1b'
    			}
    		}else if(type === 'txt'){
    			obj = {
    				icon: 'md-document',
    				color: '#19be6b'
    			}
    		}else if(type === 'jpg' || type === 'png'){
    			obj = {
    				icon: 'md-image',
    				color: '#5cadff'
    			};
    		}
    		
        	return obj;
        	
        },
        
        init(_route){//初始化
        	let newArr = [];
    	
	    	if(!_route.query.path || _route.query.path === '/'){//根目录
	    		
	    		this.hideRetu = false;
	    		
	      		newArr.push(...this.fileData.children,...this.fileData.files);
	      		
	      		this.currentFolder = {};
	    		
	    	}else{
	    		
	    		this.hideRetu = true;
	    		
	    		newArr = this.setShowFileData(_route.query, this.fileData);
	    		
	    	}
	    	
	    	this.newFileData = newArr;
	    	
	    	this.$emit('input', this.currentFolder, this.currentFile);
        },
        
        routeChange(_route){//路由改变时
        	let newArr = [];
    		
    		if(!_route.query.path || _route.query.path === '/'){//根目录
    			
    			this.hideRetu = false;
    			
    			newArr.push(...this.fileData.children,...this.fileData.files);
    			
    			this.pathHistory = [''];
    			
    			this.currentFolder = {};
    			
    		}else{
    			
    			this.hideRetu = true;
    			
    			newArr = this.setShowFileData(_route.query, this.fileData);
    			
	      		this.pathHistory = _route.query.path.split('/');
	      			
    		}
    		
      		this.newFileData = newArr;
      		
      		this.$emit('input', this.currentFolder, this.currentFile);
        },
        
        setShowFileData(routeQuery, fileData){//设置要显示的文件数据
        	
        	let newArr = [];
        	
        	if(routeQuery.path && routeQuery.path != ''){
        		
	        	let pathArr = routeQuery.path.split('/');
	    		
	    		let currentOpenFolder = pathArr[pathArr.length-1];
	    		
	    		let isFolder1 = false;
	    		
	    		let isFolder2 = true;
	    		
	    		let recursion = (obj) => {
	      			
	      			if(obj.children && obj.children.length > 0){
	      				
	      				obj.children.forEach((item, i, oldArr) => {
	      					
	      					if(item.name === currentOpenFolder){
	      						
	      						isFolder1 = true;
	      						
	        					newArr.push(...item.children,...item.files);
	        					
	        					this.currentFolder = oldArr[i];
	        					
	      					}else{
	      						
	      						isFolder2 = false;
	      						
	      					}
	      					
	      					recursion(item);
	      				
	      				});
	      				
	      			}
	      			
	      		}
	      		
	      		recursion(fileData);
	      		
	      		if(!isFolder1 && !isFolder2){
	      			console.log('文件夹不存在');
	      		}
        		
        	}
      		
      		return newArr;
        	
        },
        
        getFileData(action_id, folder_id, current_file_data){//获取文件数据
        	$ax.getAllAjaxData([
	    		{
	    			url: 'manage.Action/folderList',
	    			data: {
	    				action_id: action_id,//活动ID
	        			fid: folder_id,//文件夹父ID，没有就写0
	    			}
	    		},
	    		{
	    			url: 'manage.Action/attachmentList',
	    			data: {
	    				action_id: action_id,//活动ID
	        			folder_id: folder_id,//文件夹ID，没有就写0
	    			}
	    		}
	    	], (folderData, fileData) => {
	    		
	    		let newChildren = [];
	    		
	    		let newFiles = [];
	    		
	    		folderData.data.forEach(item => {
	    			newChildren.push({
						id: item.id,
						fid: item.fid,
						name: item.folder_name,
	    				type: 'folder',
	        			children: [],
	        			files: []
					});
				});
	    		
	    		fileData.data.forEach(item => {
					newFiles.push({
						id: item.id,
						name: item.url,
						url: item.url,
	    				folder_id: item.folder_id,
	    				type: 'txt',
					});
				});
				
				current_file_data.children = newChildren;
				
				current_file_data.files = newFiles;
				
				this.init(this.$route);
	    		
	    	});
        },
        
    },
    computed: {//计算属性
    	
    },
    watch: {//监测数据变化
    	
    	'$route'(to){
    		this.routeChange(to);
    	},
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	this.getFileData(21, 0, this.fileData);
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
}
</script>

<style scoped lang="less">
.fileList{
	display: flex;
	align-items: center;
	height: 50px;
	padding: 0 10px;
	border-bottom: 1px solid #e8eaec;
	cursor: pointer;
	-moz-user-select:none;
	-webkit-user-select: none;
	-ms-user-select: none;
	.fileList-name{
		display: flex;
		align-items: center;
	}
}
.fileList:hover{
	background-color: #ebf7ff;
	border-bottom: 1px solid #cfecff;
}
.active{
	background-color: #ebf7ff;
	border-bottom: 1px solid #cfecff;
}
.file-breadcrumb{
	margin: 10px 0;
	padding: 4px 0;
	display: flex;
	align-items: center;
}
</style>