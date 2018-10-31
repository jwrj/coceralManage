<template>
	
	<div>
		
		<Cascader v-if="false" v-model="selected" @on-change="cascaderChange" change-on-select filterable placeholder="选择岗位" :data="postData" style="width: 240px;"></Cascader>
		
		<Poptip placement="bottom-start">
			
			<Button long :style="{color: checkedText ? '' : '#c5c8ce', textAlign: 'left', padding: '5px 7px 6px', overflow: 'hidden'}">
				{{checkedText ? checkedText : '选择岗位'}}
			</Button>
			
			<div slot="content" style="overflow-x: auto;">
				
				<transition-group name="fade" tag="div" class="postCasc-box">
					
			    	<div
		    		v-for="(item, index) in newPostData"
		    		:key="index"
		    		class="main-box">
			    		
			    		<div
			    			v-for="child in item"
			    			@click="postClick(child, index)"
			    			class="main-box-btn"
			    			:class="{active: child.value === selected[index]}">
			    			<span>{{child.label}}</span>
			    			<Icon v-if="child.children && child.children.length > 0" class="icon" type="ios-arrow-forward" />
			    		</div>
			    		
			    	</div>
			    	
				</transition-group>
				
			</div>
			
	    </Poptip>
		
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
        	
        	modalShow: false,
        	
        	selected: [],//只获取value值
        	
        	selectedData: [],//获取label，value值
        	
        	newPostData: [],//新的数据结构
        	
        	postData: [],//岗位数据
        	
        }
    },
    methods: {//方法
    	
    	init(){//初始化数据
    		
    		this.getPostData();
    		
	    	this.$emit('input', this.selected);
    		
    	},
    	
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
    		
    		//这里的代码相似，可以整合（未合并）
    		this.selectedData.splice(index+1, this.selectedData.length-(index+1));
    		
    		this.selectedData.splice(index, 1, {label: item.label,value: item.value});
    		
    		this.selected.splice(index+1, this.selected.length-(index+1));
    		
    		this.selected.splice(index, 1, item.value);
    		
    		this.$emit('input', this.selected);
    		
    		this.$emit('on-change', this.selected, this.selectedData);
	    	
    	},
    	
    	getPostData(){//获取岗位数据
    		
    		$ax.getAjaxData('manage.Organize/gangweiAll', {}, res => {
    			if(res.code == 0){
    				let recursion = (ajaxData) => {//递归
    					let newArr = [];
	    				ajaxData.forEach(item => {
	    					let obj = {
		    					label: item.name,
				    			value: Number(item.id),
		    				}
	    					if(item.son && item.son.length > 0){
	    						obj.children = recursion(item.son);
	    					}
	    					newArr.push(obj);
	    				});
	    				return newArr
    				}
    				this.postData = recursion(res.data);
    			}
	    	});
	    	
    	},
    	
    },
    computed: {//计算属性
        
        checkedText(){
        	
        	let txt = '';
        	
        	if(this.selectedData && this.selectedData.length > 0){
        		let newArr = [];
        	
        		this.selectedData.forEach(item => {
        			newArr.push(item.label);
        		});
        	
        		txt = newArr.join(' / ');
        	}
        	
        	return txt
        	
        }
        
    },
    watch: {//监测数据变化
    	
    	postData(newVal){
    		
    		let newArr = [];
    		
	    	newArr.push([...newVal]);
	    	
	    	this.newPostData = newArr;
	    	
    	}
    	
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
	background-color: #5cadff !important;
	color: #fff;
}
.postCasc-box{
	display: flex;
}
.main-box{
	padding: 4px 6px 4px 0;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	background: #fff;
	.main-box-btn{
		flex-shrink: 0;
		border-radius: 4px;
		background-color: #e8eaec;
		padding: 2px 16px;
		margin: 4px 0;
		cursor: pointer;
		font-size: 12px;
		transition: background-color .3s;
		position: relative;
		&:hover{
			background-color: #dcdee2;
		}
		.icon{
			position: absolute;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			display: flex;
			align-items: center;
		}
	}
}

</style>

<style lang="less">

</style>
