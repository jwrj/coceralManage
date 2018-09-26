<template>
	
	<div>
		
		<header class="header">
			<slot name="header" :binEvent="selectChange"></slot>
			<Input v-if="seekShow" :search="true" enter-button clearable placeholder="搜索..." class="seek" />
		</header>
		
		<Table
		stripe
		:columns="tableColumns"
		:data="tableData"
		@on-select-all="tabSelectAll"
		@on-select="tabSelect"
		@on-selection-change="tabSelectionChange"
		@on-select-cancel="tabSelectCancel"
		>
		</Table>
		
		<footer class="footer">
			<slot name="footer"></slot>
			<Page v-if="pageShow" :total="100" show-total show-sizer show-elevator style="margin-left: auto;" />
		</footer>
			
		<!--弹窗-->
		<Modal class-name="my-ivu-modal-wrap" v-model="modalShow" :mask="false" :transfer="false" fullscreen>
	    	<p slot="header">标题</p>
	        <div>
	        	内容
	        </div>
	        <div slot="footer">
	        	<Button @click="modalShow = false">取消</Button>
	        	<Button type="primary" @click="modalShow = false">确定</Button>
	        </div>
	    </Modal>
		{{tableData}}
	</div>
	
</template>

<script>

/**
 * slot-scope
 */

import { edit, details } from './handleButton.js'

import { tableColumns, tableData } from './data.js'

export default {
	name: 'tableList',
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
		
//		tableColumns: {//表头数据
//			type: Array,
//			required: true
//		},
//		
//		tableData: {//表格数据
//			type: Array,
//			default: () => []
//		}
		filterShow: {
			type: Boolean,
			default: true
		},
		seekShow: {//搜索框控件
			type: Boolean,
			default: true
		},
		pageShow: {//分页控件
			type: Boolean,
			default: true
		},
		
	},
    data () {//数据
        return {
        	
        	modalShow: false,
        	
        	tableColumns: tableColumns,
        	
        	tableData: tableData,
        	
        	checkedData: [],
        	
        }
    },
    methods: {//方法
    	
    	selectChange(val){
    		console.log(val);
    	},
    	
    	initColumns(){//初始化表头数据
    		
    		this.tableColumns.forEach(item => {
    		
	    		if(item.handle){
	    			
	    			item.render = (h,params) => {
	    				
	    				let children = [];
	    				
	    				item.handle.forEach(btnItem => {
	    					
	    					if(btnItem === 'edit'){
	    						children.push(edit(this, h, params));
	    					}else if(btnItem === 'details'){
	    						children.push(details(this, h, params));
	    					}
	    					
	    				})
	    				
	    				return h('div',children);
	    				
	    			}
	    			
	    		}
	    		
	    	});
    		
    	},
    	tabSelectAll(selection){//全选
    		console.log('全选');
    		this.checkedData = selection;
    		this.tableData.forEach(item => {
    			selection.forEach(item2 => {
    				if(item.id === item2.id){
    					console.log(item.id);
    					this.$set(item, '_checked', true);
    				}
    			});
    		});
    	},
    	tabSelect(selection, row){//单选
    		console.log('单选');
    		this.tableData.forEach(item => {
    			if(item.id === row.id){
      				this.$set(item, '_checked', true);
    			}
    		});
    	},
    	tabSelectionChange(selection){//勾选改变时
    		
    		if(selection.length === 0){
    			console.log('取消全选');
    			this.tableData.forEach(item => {
    				this.$set(item, '_checked', false);
    			});
    		}else{
    			
    			
    			
    		}
    		
//  		console.log('选择改变时');
//  		this.checkedData = selection;
//  		this.$emit('selectChange', this.checkedData);
    	},
    	tabSelectCancel(selection, row){//单个取消选择
    		console.log('单个取消选择');
    		this.tableData.forEach(item => {
    			if(item.id === row.id){
      				this.$set(item, '_checked', false);
    			}
    		});
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	modalShow(newBoolean){
//  		console.log(this.$parent.$parent.$parent);
//  		if(newBoolean){
//	    		this.$parent.$parent.$parent.$el.lastChild.style.overflow = 'hidden';
//	    	}else{
//	    		this.$parent.$parent.$parent.$el.lastChild.style = '';
//	    	}
    	},
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	this.initColumns();
    	
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
	.public(){
		display: flex;
		align-items: center;
	}
	.header{
		.public();
		margin-bottom: 14px;
	}
	.footer{
		.public();
		margin-top: 14px;
	}
	.seek{
		max-width: 400px;
		margin-left: auto;
	}
</style>

<style lang="less">
	.my-ivu-modal-wrap{
		/*width: 1251px;
		height: 845px;*/
		/*position: absolute !important;*/
		top: 91px !important;
		left: 200px !important;
		/*right: initial !important;*/
		/*bottom: initial !important;*/
	}
	.seek{
		.ivu-input-icon-clear{
			right: 50px !important;
		}
	}
</style>