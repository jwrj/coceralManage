<template>
	
	<div>
		
		<Cascader v-model="cascaderValue" @on-change="setvalue" filterable placeholder="选择行业" :data="industryData" style="width: 200px;"></Cascader>
		
	</div>
	
</template>

<script>

export default {
	name: 'industryCasc',
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
		value: {
			type: Array,
			default: () => []
		}
	},
    data () {//数据
        return {
        	
        	cascaderValue: [],
        	
        	industryData: [],
        	
        }
    },
    methods: {//方法
    	
    	setvalue(value, selectedData){
    		
    		this.$emit('input', value);
    		
    		this.$emit('on-change', value, selectedData);
    		
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	$ax.getAjaxData('http://192.168.2.200:802/cdn/hangye.js',{
    		
    	},(response) => {
    		
    		let newArr = [];
    		
    		response.forEach(item => {
    			
    			let newChildren = [];
    			
				item.children.forEach(item => {
					newChildren.push({
						label: item.name,
    					value: item.code,
					})
				})
				
				newArr.push({
    				label: item.name,
        			value: item.code,
        			children: newChildren
    			});
    			
    		});
    		
    		this.industryData = newArr;
    		
    	},{
    		baseURL: ''
    	});
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
    	this.$emit('input', this.cascaderValue);
    	
	},
	
}
</script>

<style scoped lang="less">

</style>