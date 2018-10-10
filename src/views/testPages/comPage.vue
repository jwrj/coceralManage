<template>
	
	<div>
		
		<Card style="margin-bottom: 16px;">
	    	
	    	<h1 slot="title">岗位选择器</h1>
	    	
    		<transition-group name="fade" tag="div" style="display: flex;align-items: center;">
		    	<div v-for="(item, index) in newPostData" :key="index" style="margin-right: 6px;display: flex;flex-direction: column;">
		    		<div v-for="child in item" @click="postClick(child, index)" :class="{active: child.value === selected[index]}" style="background: #ccc;padding: 6px 8px;margin: 4px 0;cursor: pointer;">{{child.label}}</div>
		    	</div>
			</transition-group>
		    	
	    </Card>
		
		<!--表格列表-->
		<Card style="position: initial;">
			
			<h1 slot="title">表格列表</h1>
			
			<table-list :tableColumns="tableColumns" :tableData="tableData" @select-change="selectChange" @on-btn-click="onBtnClick">
		
				<div slot="header" slot-scope="{ slotEvent }" style="width: 100%;display: flex;align-items: center;margin-right: 10px;">
					
					<Button @click="slotEvent('我是传入的参数abc')">点击执行插槽传出的事件</Button>
					
				    <industry-casc v-model="industryData" @on-change style="margin-right: 10px;"></industry-casc>
				    
				    <post-casc style="margin-right: 10px;"></post-casc>
				    
				    <al-cascader v-model="res_c" style="width: 240px;"/>
		    
				</div>
				
				<div slot="modalContent">
					弹窗内容
				</div>
		
			</table-list>
			
		</Card>
		
		<!--岗位配置-->
		<Card style="margin-top: 16px;">
			
			<h1 slot="title">岗位配置</h1>
			
			<post-config></post-config>
			
		</Card>
		
		<!--文件管理-->
		<Card style="margin-top: 16px;height: 600px;">
			
			<h1 slot="title">文件管理</h1>
			
			<file-manage currentRouteName="comPage"></file-manage>
			
		</Card>
		
	    <Card style="margin-top: 16px;">
	    	
	    	<h1 slot="title">富文本编辑器</h1>
	    	
	    	{{editor_content}}
	    	
	    	<UEditor :configs='editor_config' @up_editor_content="upEditorContent"></UEditor>
	    	
	    </Card>
	    
	</div>
	
</template>

<script>

import tableList from '@/components/tableList/table-list.vue';//表格列表组件

import industryCasc from '@/components/industry/industry-casc.vue';//行业级联

import postCasc from '@/components/post/post-casc.vue';//岗位级联

import postConfig from '@/components/postConfig/post-config.vue';//岗位配置

import fileManage from '@/components/fileManage/file-manage.vue';//文件管理

import UEditor from '@/components/richTextEditor/UEditor.vue';//富文本编辑器

export default {
	name: 'comPage',
	components:{//组件模板
		tableList,
		industryCasc,
		postCasc,
		postConfig,
		fileManage,
		UEditor,
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
        	
        	selected: [],
        	
        	selectedData: [],
        	
        	newPostData: [],
        	
        	postData: [
        	
        		{
        			label: '广西湖北商会',
	        		value: '0',
	        		children: [
	        			{
		        			label: '会员大会',
		        			value: '1',
		        			children: [
		        				{
		        					label: '名誉会长',
		        					value: '2',
		        				},
		        				{
		        					label: '理事大会',
		        					value: '3',
		        					children: [
		        						{
		        							label: '秘书长',
		        							value: '4',
		        						},
		        						{
		        							label: '监事委员会',
		        							value: '5',
		        						},
		        						{
		        							label: '常委执委会',
		        							value: '6',
		        						},
		        						{
		        							label: '理事长',
		        							value: '7',
		        						},
		        					]
		        				},
		        				{
		        					label: '总顾问',
		        					value: '8',
		        				},
		        			]
		        		},
	        		]
        		}
        		
        	],
        	
        	
        	
        	
        	
        	
        	res_c: [],
        	
        	industryData: [],
        	
        	tableColumns: [
        		{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
				{
			        title: 'ID',
			        key: 'id'
			    },
			    {
			        title: '名称',
			        key: 'name'
			    },
			    {
			        title: '日期',
			        key: 'date'
			    },
			    {
			    	align: 'center',
			    	width: 130,
			        title: '操作',
			        handle: [
			        	{
			        		name: '申请加入',
			        		key: 0,
			        		modalShow: true,
			        		props: {
			        			loading: false
			        		}
			        	}
			        ],
			    }
			],
			
			tableData: [
				{
					id: 1,
			        name: 'John Brown',
			        date: '2016-10-03'
			    },
			    {
			    	id: 2,
			        name: 'Jim Green',
			        date: '2016-10-01'
			    },
			    {
			    	id: 3,
			        name: 'Joe Black',
			        date: '2016-10-02'
			    },
			    {
			    	id: 4,
			        name: 'Jon Snow',
			        date: '2016-10-04'
			    },
			    {
			    	id: 5,
			        name: 'Jon Snow',
			        date: '2016-10-04'
			    },
			],
			
			editor_config:{
		    	width:'100%',
		    	height:'500px'
		   },
		   
		   editor_content: '',
        	
        }
    },
    methods: {//方法
    	
    	postClick(item, index){
    		
    		if(item.children && item.children.length > 0){
    			
    			this.newPostData.splice(index+1,this.newPostData.length-(index+1));
    			
		    	this.newPostData.splice(index+1, 0, item.children);
		    	
    		}else{
    			
    			this.newPostData.splice(index+1,this.newPostData.length-(index+1));
    			
    		}
    		
    		this.selectedData.splice(index+1, this.selectedData.length-(index+1));
    		
    		this.selectedData.splice(index, 1, {label: item.label,value: item.value});
    		
    		this.selected.splice(index+1, this.selected.length-(index+1));
    		
    		this.selected.splice(index, 1, item.value);
    		
    		console.log(this.newPostData);
    		console.log(this.selected);
    		console.log(this.selectedData);
	    	
    	},
    	
    	upEditorContent(value){
    		this.editor_content = value;
    	},
    	
    	onBtnClick(val){
    		console.log(val);
    	},
    	
    	selectChange(checked){//选择改变时触发
    		console.log(checked);
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
    	
    	let newArr = [];
    	
    	this.postData.forEach(item => {
    		
    		newArr.push([item]);
    		
    	});
    	
    	this.newPostData = newArr;
    	
	},
	
}
</script>

<style scoped lang="less">

.fade-enter-active,.fade-leave-active {
	transition: opacity .5s;
}

.fade-enter,.fade-leave-to{
	opacity: 0;
}
.active{
	background: yellow !important;
}
</style>