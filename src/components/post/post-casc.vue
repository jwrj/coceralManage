<template>
	
	<div>
		
		<!--<Cascader v-model="cascaderValue" @on-change="cascaderChange" change-on-select filterable placeholder="选择岗位" :data="postData" style="width: 240px;"></Cascader>-->
		
		<transition-group name="fade" tag="div" style="display: flex;align-items: center;">
	    	<div
	    		v-for="(item, index) in newPostData"
	    		:key="index"
	    		class="main-box">
	    		<div
	    			v-for="child in item"
	    			@click="postClick(child, index)"
	    			class="main-box-btn"
	    			:class="{active: child.value === selected[index]}">
	    			{{child.label}}
	    		</div>
	    	</div>
		</transition-group>
		
	</div>
	
</template>

<script>

export default {
	name: 'postCasc',
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
        	
        	selected: [],//只获取value值
        	
        	selectedData: [],//获取label，value值
        	
        	newPostData: [],//新的数据结构
        	
        	postData: [//这个数据是从外部传入的
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
        	],
        	
        }
    },
    methods: {//方法
    	
    	cascaderChange(value, selectedData){//点击cascader岗位时触发
    		
    		this.$emit('input', value);
    		
    		this.$emit('on-change', value, selectedData);
    		
    	},
    	
    	postClick(item, index){//点击岗位时触发
    		
    		if(item.children && item.children.length > 0){
    			
    			this.newPostData.splice(index+1,this.newPostData.length-(index+1));
    			
		    	this.newPostData.splice(index+1, 0, item.children);
		    	
    		}else{
    			
    			this.newPostData.splice(index+1,this.newPostData.length-(index+1));
    			
    		}
    		
    		//这里的代码相似，可以整合
    		this.selectedData.splice(index+1, this.selectedData.length-(index+1));
    		
    		this.selectedData.splice(index, 1, {label: item.label,value: item.value});
    		
    		this.selected.splice(index+1, this.selected.length-(index+1));
    		
    		this.selected.splice(index, 1, item.value);
    		
    		this.$emit('input', this.selected);
    		
    		this.$emit('on-change', this.selected, this.selectedData);
	    	
    	},
    	
    	init(){//初始化数据
    		
    		let newArr = [];
    	
	    	this.postData.forEach(item => {
	    		
	    		newArr.push([item]);
	    		
	    	});
	    	
	    	this.newPostData = newArr;
	    	
	    	this.$emit('input', this.selected);
    		
    	},
    	
    },
    computed: {//计算属性
        
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	this.init();
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
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
	background-color: #2d8cf0 !important;
	color: #fff;
}
.main-box{
	margin-right: 6px;
	display: flex;
	flex-direction: column;
	.main-box-btn{
		border-radius: 4px;
		background-color: #c5c8ce;
		padding: 6px 8px;
		margin: 4px 0;
		cursor: pointer;
		transition: background-color .3s;
		&:hover{
			background-color: #dcdee2;
		}
	}
}

</style>