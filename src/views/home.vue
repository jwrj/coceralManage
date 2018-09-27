<template>
	
	<div>
		
		<Card style="height: 600px;">
			
			<Button type="primary" @click="open">新建文件夹</Button>
			
			<div style="padding: 10px 0;">
				
				<Breadcrumb>
					<template v-for="(item,index) in breadcrumb">
				        <BreadcrumbItem :to="index != breadcrumb.length-1 ? '?path='+item : ''">{{item}}</BreadcrumbItem>
					</template>
				</Breadcrumb>
				
			</div>
			
			<Row class="fileList">
				<Col span="10">名称</Col>
				<Col span="7">大小</Col>
				<Col span="7">日期</Col>
			</Row>
			
			<Row
			v-for="item in newFileData"
			@click.native="clickFolder(item.id,$event)"
			@dblclick.native="dblclickFolder(item)"
			class="fileList"
			:class="{active: item.id === activeId}"
			>
				<Col span="10" class="fileList-name">
					<Icon style="margin-right: 8px;" :type="iconType(item.type).icon || ''" size="28" :color="iconType(item.type).color || ''" />
					<span>{{item.name}}</span>
				</Col>
				<Col span="7">200 KB</Col>
				<Col span="7">2018-9-27 下午 2:20</Col>
			</Row>
			
		</Card>
		
		<Modal v-model="modal">
			<p slot="header">新建文件夹</p>
	        <Input v-model="folderName" placeholder="文件夹名称" />
	        <div slot="footer">
	            <Button type="primary" @click="addFolder">确定</Button>
	        </div>
	    </Modal>
	    
	</div>
	
</template>

<script>

export default {
	name: 'home',
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
        	
        	modal: false,
        	
        	count: 1,
        	
        	folderName: '',
        	
        	currentPid: 0,
        	
        	pathHistory: [''],//路径记录
        	
        	breadcrumb: [''],//面包屑导航
        	
        	fileData: [
        		{
        			id: 1,
        			pid: 0,
        			name: '文件夹1',
        			type: 'folder',
        			children: [
        				{
        					id: 2,
        					pid: 1,
	        				name: '子文件夹1',
	        				type: 'folder',
		        			children: []
        				},
        				{
        					id: 3,
        					pid: 1,
	        				name: '子文件夹2',
	        				type: 'folder',
		        			children: [
		        				{
		        					id: 8,
		        					pid: 3,
			        				name: '子文件夹2-1',
			        				type: 'folder',
				        			children: []
		        				}
		        			]
        				}
        			]
        		},
        		{
					id: 4,
					pid: 0,
					name: '文件夹2',
					type: 'folder',
	    			children: []
				},
        		{
					id: 5,
					pid: 0,
					name: '图片1.png',
					type: 'png',
				},
        		{
					id: 6,
					pid: 0,
					name: '图片2.jpg',
					type: 'jpg',
				},
        		{
					id: 7,
					pid: 0,
					name: '文本.txt',
					type: 'txt',
				},
        	],
        	
        	newFileData: [],
        	
        	activeId: null,
        	
        }
    },
    methods: {//方法
    	
    	open(){//打开弹窗
    		
    		this.modal = true;
    		
    	},
    	
    	addFolder(){//新建文件夹
    		
    		//this.count++;
    		//this.modal = false;
    		console.log(this.folderName);
    	},
    	
    	clickFolder(id,e){//单击文件
//  		console.log('单击');
//  		console.log(e);
			this.currentPid = id;
    		this.activeId = id;
    	},
    	
    	dblclickFolder(current){//双击文件
    		
    		this.pathHistory.push(current.name);
    		
    		this.breadcrumb.push(current.name);
    		
    		this.$router.push({
	    		name: 'home',
	    		query: {
	    			path: this.pathHistory.join('/')
	    		}
	    	});

			console.log(this.$route);
    		
    		let arr = [];
    		
    		let recursion = (fileData) => {
    			
    			fileData.forEach(item => {
	    		
    				if(item.pid === current.id){
    					arr.push(item);
    				}
	    		
    				if(item.children && item.children.length > 0){
	    				recursion(item.children);
    				}
	    		
    			});
    			
    		}
    		
    		recursion(this.fileData);
	    	
	    	this.newFileData = arr;
    		
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
    	
    },
    computed: {//计算属性
        
    },
    watch: {//监测数据变化
    	'$route'(to){
    		
      		let query = to.query.path.split('/');
      		
      		console.log(query);
      		
      		let newBreadcrumb = [''];
      		
      		this.breadcrumb.forEach(item => {
      			query.forEach(itemName => {
      				if(item === itemName){
      					newBreadcrumb.push(item);
      				}
      			});
      		});
      		this.breadcrumb = newBreadcrumb;
      		
      		console.log(to);
      		
      		
      		//console.log(query[query.length-1]);
      		
      		
    	},
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	let arr = [];
    	
    	this.fileData.forEach(item => {
    		
    		if(item.pid === 0){
    			
    			arr.push(item);
    			
    		}
    		
    	});
    	
    	this.newFileData = arr;
    	
//  	this.$router.push({
//  		name: 'home',
//  		query: {
//  			path: 'all'
//  		}
//  	});
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
			//async、await错误处理
			try {
				
				/**
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
</style>