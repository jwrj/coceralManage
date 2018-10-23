<template>
	
	<div>
		
		<Card>
			
			<h1 slot="title">岗位配置</h1>
			
			<Tree :data="treeData" :render="renderContent" empty-text=""></Tree>
		
			<div style="margin-top: 16px;text-align: center;">
				<Button type="primary" @click="addMaxPost">添加顶级岗位</Button>
			</div>
			
		</Card>
		
		<Modal v-model="modalShow" width="360">
	        <p slot="header">{{text}}</p>
	        <div>
	        	<Form ref="formInline" :model="formInline">
	        		<FormItem prop="name" :rules="ruleInline">
			        	<Input v-model="formInline.name" clearable placeholder="请输入岗位名称" />
	        		</FormItem>
	        	</Form>
	        </div>
	        <div slot="footer">
	            <Button type="primary" size="large" long @click="submit('formInline')">确定</Button>
	        </div>
	    </Modal>
	    
	</div>
	
</template>

<script>
let isCarryOutHook = false;
export default {
	name: 'postSet',
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
        	
        	modalShow: false,
        	
        	formInline: {
        		name: ''
        	},
        	
        	ruleInline: { required: true, message: '请输入名称', trigger: 'blur' },
        	
        	type: 'add',
        	
        	currentData: {},
        	
        	modalTitle: '',
        	
        	treeData: [],
        	
            buttonProps: {
                type: 'default',
                size: 'small',
            }
        	
        }
    },
    methods: {//方法
    	
    	renderContent (h, { root, node, data }) { //渲染方式
            return h('div',{
            	style: {
            		display: 'inline-block',
            		width: '100%',
            		paddingRight: '16px',
                },
            },
			[ 			
            	h('span', {
	                style: {
	                    
	                },
                	class: 'ivu-tree-title my-tree-node'
	            }, 
				[ 
	                h('span', {
	                	class: 'my-tree-title'
	                }, [
	                    h('Icon', {
	                        props: {
	                            type: 'md-people',
	                        },
	                        style: {
	                            marginRight: '8px'
	                        }
	                    }),
	                    h('span', data.title)
	                ]),
	                h('span', {
	                    style: {
	                        marginLeft: 'auto',
	                    }
	                }, [
	                	h('Button', {
	                        props: Object.assign({}, this.buttonProps, {
	                            icon: 'md-create',
	                            type: 'success',
	                            disabled: true
	                        }),
	                        style: {
	                            marginRight: '8px'
	                        },
	                        on: {
	                            click: () => {
	                            	this.type = 'edit';
	                            	this.formInline.name = data.title;
	                            	this.modalShow = true;
	                                this.currentData = data;
	                            }
	                        }
	                    }),
	                    h('Button', {
	                        props: Object.assign({}, this.buttonProps, {
	                            icon: 'md-add',
	                            type: 'primary',
	                        }),
	                        style: {
	                            marginRight: '8px'
	                        },
	                        on: {
	                            click: () => {
	                            	this.type = 'add';
	                            	this.modalTitle = data.title;
	                            	this.formInline.name = '';
	                            	this.modalShow = true;
	                                this.currentData = data;
	                            }
	                        }
	                    }),
	                    h('Button', {
	                        props: Object.assign({}, this.buttonProps, {
	                            icon: 'md-remove',
	                            type: 'error',
	                            disabled: true
	                        }),
	                        on: {
	                            click: () => {
	                            	this.remove(root, node, data)
	                            }
	                        }
	                    })
	                ])
	            ])
            ]);
        },
        
        addMaxPost(){//添加顶级岗位
    		this.type = 'addMaxPost';
    		this.modalShow = true;
    	},
        
        edit(data, title){//编辑
        	data.title = title;
        },
        
        append (data, title, id) {//添加方法
            const children = data.children || [];
            children.push({
                title: title,
                expand: true,
                id: id
            });
            this.$set(data, 'children', children);
        },
        
        remove (root, node, data) {//删除岗位
        	if(node.nodeKey === 0 && !node.parent){//删除最顶级
        		this.treeData = [];
        	}else{
	        	const parentKey = root.find(el => el === node).parent;
	            const parent = root.find(el => el.nodeKey === parentKey).node;
	            const index = parent.children.indexOf(data);
	            parent.children.splice(index, 1);
        	}
        	
        },
        
        submit(name){//添加岗位
        	
        	this.$refs[name].validate((valid) => {
        		
        		if(valid){
        			
		        	if(this.type === 'add'){
		        		
		        		$ax.getAjaxData('manage.Organize/gangweiAdd', {
			        		name: this.formInline.name,
			        		fid: this.currentData.id
			        	}, res => {
			        		if(res.code == 0){
			        			this.append(this.currentData, this.formInline.name, res.data.id);
			        			this.formInline.name = '';
		        				this.modalShow = false;
			        		}
			        	});
			        	
			        	//this.$emit('on-add', this.formInline.name, this.currentData.nodeKey);
			        	
		        	}else if(this.type === 'edit'){
		        		
		        		this.edit(this.currentData, this.formInline.name);
		        		this.modalShow = false;
		        		
		        	}else if(this.type === 'addMaxPost'){
		        		
		        		$ax.getAjaxData('manage.Organize/gangweiAdd', {
			        		name: this.formInline.name,
			        		fid: 0
			        	}, res => {
			        		if(res.code == 0){
			        			this.treeData.push({
			        				title: this.formInline.name,
					                expand: true,
					                id: res.data.id
			        			});
					    		this.formInline.name = '';
		        				this.modalShow = false;
			        		}
			        	});
		        		
			    		//this.$emit('on-add', this.formInline.name, 0);
			    		
		        	}
		        	
        		}
        		
        	});
        	
        },
        
        getTreeData(){//获取岗位树
    		
    		$ax.getAjaxData('manage.Organize/gangweiAll', {}, res => {
    			if(res.code == 0){
    				let recursion = (ajaxData) => {//递归
    					let newArr = [];
	    				ajaxData.forEach(item => {
	    					let obj = {
		    					title: item.name,
		    					expand: true,
				    			id: Number(item.id),
		    				}
	    					if(item.son && item.son.length > 0){
	    						obj.children = recursion(item.son);
	    					}
	    					newArr.push(obj);
	    				});
	    				return newArr
    				}
    				this.treeData = recursion(res.data);
    			}
	    	});
	    	
    	},
    	
    },
    computed: {//计算属性
        
        text(){
        	let txt = '';
        	if(this.type === 'add'){
        		txt = '给（' + this.modalTitle + '）添加岗位';
        	}else if(this.type === 'edit'){
        		txt = '编辑岗位';
        	}else if(this.type === 'addMaxPost'){
        		txt = '添加顶级岗位';
        	}
        	return txt;
        },
        
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	if(!isCarryOutHook){
    		this.getTreeData();
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
		
		(async () => { //执行异步函数
			
			try{
				
				//获取岗位树
				let getTreeData = await $ax.getAsyncAjaxData('manage.Organize/gangweiAll', {});
				
				next(vm => {
					if(getTreeData.code == 0){
						let recursion = (ajaxData) => {//递归
    						let newArr = [];
	    					ajaxData.forEach(item => {
		    					let obj = {
			    					title: item.name,
			    					expand: true,
					    			id: Number(item.id),
			    				}
		    					if(item.son && item.son.length > 0){
		    						obj.children = recursion(item.son);
		    					}
		    					newArr.push(obj);
		    				});
		    				return newArr
	    				}
	    				vm.treeData = recursion(getTreeData.data);
					}
				});

			}catch (err) {
				console.log(err);
			}
			
			next();

		})();
		
	},
	
}
</script>

<style scoped lang="less">

</style>

<style lang="less">
	.my-tree-node{
		width: 100%;
		display: flex;
		align-items: center;
		cursor: pointer;
	}
	.my-tree-title{
		display: flex;
		align-items: center;
	}
</style>