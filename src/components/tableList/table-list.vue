<template>
	
	<div>
		
		<div style="background: #fff;">
			
			<header class="header">
				<slot name="header" :selectChange="selectChange"></slot>
			</header>
			
			<Table stripe :columns="tableColumns" :data="tableData"></Table>
			
			<footer class="footer">
				<slot name="footer"></slot>
				<div style="margin-left: auto;">
					<Page :total="100" show-sizer show-elevator />
				</div>
			</footer>
			
		</div>
			
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
		
	</div>
	
</template>

<script>

import { edit, details } from './handleButton.js'

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
		
		tableColumns: {//表头数据
			type: Array,
			required: true
		},
		
		tableData: {//表格数据
			type: Array,
			default: () => []
		}
		
	},
    data () {//数据
        return {
        	
        	modalShow: false,
        	
        }
    },
    methods: {//方法
    	
    	selectChange(val){
    		console.log(val);
    	},
    	
    	initColumns(){
    		
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
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	modalShow(newBoolean){
    		if(newBoolean){
	    		this.$parent.$parent.$parent.$el.lastChild.style.overflow = 'hidden';
	    	}else{
	    		this.$parent.$parent.$parent.$el.lastChild.style = '';
	    	}
    	}
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
		margin-bottom: 14px;
		.header-content{
			.public();
		}
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
		position: absolute !important;
	}
	.seek{
		.ivu-input-icon-clear{
			right: 50px !important;
		}
	}
</style>