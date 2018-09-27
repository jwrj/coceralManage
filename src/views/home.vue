<template>
	
	<div>
		
		<Card style="height: 600px;">
			
			<Button type="primary" @click="open">新建文件夹</Button>
			
			<div style="padding: 10px 0;">
				
				<Breadcrumb>
					<template v-for="(item,index) in breadcrumb">
				        <BreadcrumbItem :to="index != breadcrumb.length-1 ? '?path='+item.path : ''">{{item.name}}</BreadcrumbItem>
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
			@click.native="clickFolder(item,$event)"
			@dblclick.native="dblclickFolder(item)"
			class="fileList"
			:class="{active: item.name === activeName}"
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
        	
        	fileData: {
        		children: [
        			{
	        			name: '文件夹1',
	        			type: 'folder',
	        			children: [
	        				{
		        				name: '子文件夹1',
		        				type: 'folder',
			        			children: [],
			        			files: []
	        				},
	        				{
		        				name: '子文件夹2',
		        				type: 'folder',
			        			children: [
			        				{
				        				name: '子文件夹2-1',
				        				type: 'folder',
					        			children: [],
					        			files: []
			        				}
			        			],
			        			files: []
	        				}
	        			],
	        			files: [
			        		{
								id: 1,
								name: '图片123.jpg',
								type: 'jpg',
							},
			        		{
								id: 2,
								name: '文本666.txt',
								type: 'txt',
							},
	        			],
	        		},
	        		{
						name: '文件夹2',
						type: 'folder',
		    			children: [],
		    			files: [
		    				{
								id: 2,
								name: '文本888.txt',
								type: 'txt',
							}
		    			]
					},
        		],
        		files: [
    				{
						id: 1,
						name: '图片1.png',
						type: 'png',
					},
	        		{
						id: 2,
						name: '图片2.jpg',
						type: 'jpg',
					},
	        		{
						id: 3,
						name: '文本.txt',
						type: 'txt',
					},
    			],
        	},
        	
        	modal: false,
        	
        	count: 1,
        	
        	folderName: '',
        	
        	currentName: 0,
        	
        	pathHistory: [''],//路径记录
        	
        	breadcrumb: [{name: '全部文件', path: '/'}],//面包屑导航
        	
        	newFileData: [],
        	
        	activeName: '',
        	
        }
    },
    methods: {//方法
    	
    	open(){//打开弹窗
    		
    		this.modal = true;
    		
    	},
    	
    	addFolder(){//新建文件夹
    		console.log(this.folderName);
    	},
    	
    	clickFolder(current,e){//单击文件
			this.currentName = current.name;
    		this.activeName = current.name;
    	},
    	
    	dblclickFolder(current){//双击文件
    		
    		this.pathHistory.push(current.name);//记录路径
//  		
//  		this.breadcrumb.push({
//  			name: current.name,
//  			path: this.pathHistory.join('/')
//  		});
//  		
    		this.$router.push({
	    		name: 'home',
	    		query: {
	    			path: this.pathHistory.join('/')
	    		}
	    	});

			console.log(this.pathHistory);

    		if(current.children && current.files){
    			
    			//console.log('双击了文件夹');
    			
//  			let newArr = [];
//  			
//  			newArr.push(...current.children,...current.files);
//  			
//  			this.newFileData = newArr;
    			
    		}else{
    			
    			//console.log('双击了文件');
    			
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
    	
    },
    computed: {//计算属性
        
    },
    watch: {//监测数据变化
    	
    	'$route'(to){
    		
      		let query = to.query.path.split('/');
      		
      		let currentOpenFolder = query[query.length-1];
      		
      		let newArr = [];
      		
      		let recursion = (obj) => {
      			
      			if(obj.children && obj.children.length > 0){
      				
      				obj.children.forEach(item => {
      					
      					if(item.name === currentOpenFolder){
      						
        					newArr.push(...item.children,...item.files);
        					
      					}
      					
      					recursion(item);
      				
      				});
      				
      			}
      			
      		}
      		
      		recursion(this.fileData);
      		
      		this.newFileData = newArr;
      		
//    		query.forEach((item,index,arr) => {
//    			
//				abc.push({
//					name: item,
//					path: ''
//				});
//    			
//    			
//    		});
      		
      		
//    		let newBreadcrumb = [{name: '全部文件', path: '/'}];
//    		
//    		this.breadcrumb.forEach(item => {
//    			query.forEach(itemName => {
//    				if(item.name === itemName){
//    					newBreadcrumb.push(item);
//    				}
//    			});
//    		});
//    		this.breadcrumb = newBreadcrumb;
//    		
//    		console.log(this.breadcrumb);
      		
      		
    	},
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	let newArr = [];
    	
    	if(this.$route.query.path){
    		
    		let query = this.$route.query.path.split('/');
    		
    		let currentOpenFolder = query[query.length-1];
    		
    		let recursion = (obj) => {
      			
      			if(obj.children && obj.children.length > 0){
      				
      				obj.children.forEach(item => {
      					
      					if(item.name === currentOpenFolder){
      						
        					newArr.push(...item.children,...item.files);
        					
      					}
      					
      					recursion(item);
      				
      				});
      				
      			}
      			
      		}
      		
      		recursion(this.fileData);
    		
    	}else{
    		newArr.push(...this.fileData.children,...this.fileData.files);
    	}
    	
    	this.newFileData = newArr;
    	
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