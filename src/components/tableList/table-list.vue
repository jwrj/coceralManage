<template>
	
	<div>
		
		<!--页眉-->
		<header v-if="headerShow" class="header">
			<slot name="header" :slotEvent="slotEvent"></slot>
			<Input v-if="seekShow" :search="true" enter-button clearable placeholder="搜索..." class="seek" />
		</header>
		
		<!--表格-->
		<Table
		stripe
		:columns="tableColumns"
		:data="tableData"
		:highlight-row="true"
		@on-select-all="tabSelectAll"
		@on-select-all-cancel="tabSelectAllCancel"
		@on-select="tabSelect"
		@on-selection-change="tabSelectionChange"
		@on-select-cancel="tabSelectCancel"
		>
		</Table>
		
		<!--页脚-->
		<footer v-if="footerShow" class="footer">
			<slot name="footer"></slot>
			<Page v-if="pageShow" :total="100" show-total show-sizer show-elevator style="margin-left: auto;" />
		</footer>
			
		<!--弹窗-->
		<Modal
		v-model="modalShow"
		:z-index="900"
		:closable="false"
		:mask="false"
		:transfer="false"
		fullscreen
		:footer-hide="true"
		class="my-modal-box"
		:class-name="$store.state.app.isCollapsed ? 'my-ivu-modal-wrap leftmin' : 'my-ivu-modal-wrap leftmax'"
		>
	    	<div slot="header" style="position: relative;">
	    		<h1>{{modalTitle}}</h1>
		    	<div style="position: absolute;top: -4px;right: 0;">
		    		<Button icon="md-close" size="small" @click="modalShow = false">关闭</Button>
		    		<Button type="success" size="small" icon="md-refresh" style="margin-left: 6px;">刷新</Button>
		    	</div>
	    	</div>
	        <slot name="modalContent" v-if="modalShow"></slot>
	        <div slot="footer">
	        	<Button @click="modalShow = false">取消</Button>
	        	<Button type="primary" @click="modalShow = false">确定</Button>
	        </div>
	    </Modal>
	    
	</div>
	
</template>

<script>

import { buttonItem } from './handleButton.js'

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
		},

		headerShow: {//页眉
			type: Boolean,
			default: true
		},
		
		footerShow: {//页脚
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
		
		modalTitle: {//弹窗标题
			type: String,
			default: '对话框标题'
		},
		
	},
    data () {//数据
        return {
        	
        	modalShow: false,
        	
        	checkedData: [],//已选数据
        	
        }
    },
    methods: {//方法
    	
    	slotEvent(val){//插槽事件
    		
    		console.log(val);
    		console.log('执行了子组件的事件');
    		
    	},
    	
    	initColumns(){//初始化表头数据
    		
    		this.tableColumns.forEach(item => {
    		
	    		if(item.handle){
	    			item.render = (h,params) => {
	    				let children = [];
	    				item.handle.forEach(btnItem => {
	    					children.push(buttonItem(this, h, params, btnItem));
	    				});
	    				return h('div',{
	    					style: {
	    						padding: '4px 0'
	    					}
	    				},children);
	    			}
	    		}
	    		
	    	});
    		
    	},
    	
    	tabSelectAll(selection){//全选
    		
    		this.tableData.forEach(item => {
    			selection.forEach(item2 => {
    				if(item.id === item2.id){
    					this.$set(item, '_checked', true);
    				}
    			});
    		});
    		
    	},
    	
    	tabSelectAllCancel(selection){//取消全选
    		
    		this.tableData.forEach(item => {
				this.$set(item, '_checked', false);
			});
			
    	},
    	
    	tabSelect(selection, row){//单选
    		
    		this.tableData.forEach(item => {
    			if(item.id === row.id){
      				this.$set(item, '_checked', true);
    			}
    		});
    		
    	},
    	
    	tabSelectCancel(selection, row){//单个取消
    		
    		this.tableData.forEach(item => {
    			if(item.id === row.id){
      				this.$set(item, '_checked', false);
    			}
    		});
    		
    	},
    	
    	tabSelectionChange(selection){//勾选改变时
    		
    		this.checkedData = selection;
    		
    		this.$emit('select-change', this.checkedData);
    		
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	this.initColumns();
    	
	},
    mounted () {//模板被渲染完毕之后执行
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
		position: flex !important;
		top: 92px !important;
		transition: left 0.2s ease-in-out;
	}
	.leftmax{
		left: 200px !important;
	}
	.leftmin{
		left: 64px !important;
	}
	.seek{
		.ivu-input-icon-clear{
			right: 50px !important;
		}
	}
	@media (max-width: 768px){
		.my-modal-box .ivu-modal {
		     width: 100% !important;
		     margin: 0 !important; 
		}
	}
	.my-modal-box .ivu-modal-header{
		height: 45px;
	}
</style>