<template>
	
	<div>
		<!--{{postValue}}
		<Card style="margin-bottom: 16px;">
	    	
	    	<h1 slot="title">岗位选择器</h1>
	    	
    		<post-casc v-model="postValue" type="cascader"></post-casc>
    		
    		<post-casc v-model="postValue"></post-casc>
		    	
	    </Card>
		
		<Card style="position: initial;">
			
			<h1 slot="title">表格列表</h1>
			
			<table-list :tableColumns="tableColumns" :tableData="tableData" @select-change="selectChange" @on-btn-click="onBtnClick">
		
				<div slot="header" slot-scope="{ slotEvent }" style="width: 100%;display: flex;align-items: center;margin-right: 10px;">
					
					<Button @click="slotEvent('我是传入的参数abc')">点击执行插槽传出的事件</Button>
					
				    <industry-casc v-model="industryData" @on-change style="margin-right: 10px;"></industry-casc>
				    
				    <al-cascader v-model="res_c" style="width: 240px;"/>
		    
				</div>
				
				<div slot="modalContent">
					弹窗内容
				</div>
		
			</table-list>
			
		</Card>
		
		<Card style="margin-top: 16px;">
			
			<h1 slot="title">岗位配置</h1>
			
			<post-config></post-config>
			
		</Card>-->
		
		<Card style="margin-top: 16px;">
			
			<h1 slot="title">文件管理</h1>
			
			<file-manage actionId="21"></file-manage>
			
		</Card>
		
	    <Card style="margin-top: 16px;">
	    	
	    	<h1 slot="title">富文本编辑器</h1>
	    	
	    	{{editor_content}}
	    	
	    	<UEditor :defaultContent="UEdefaultContent" :configs='editor_config' @up_editor_content="upEditorContent"></UEditor>
	    	
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
        	
        	UEdefaultContent: '<p style="color:silver">文明发言,如有违反，后果将由您个人自行承担。</p>',
        	
        	postValue: [],
        	
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
    	
	},
	
}
</script>

<style scoped lang="less">
</style>