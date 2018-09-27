<template>
	
	<div>
		
<Modal v-model="show"
        title="Title"
		@on-cancel="close"
		@on-ok="ok"
        :styles="{top: '20px'}">
<span>已选会员：</span>

    </Modal>
	</div>
	
</template>

<script>

export default {
	name: 'staffModal',
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
  modalShow:{
	  type:Boolean,
	  default:false
  }
	},
    data () {//数据
        return {
			show:false
        }
    },
    methods: {//方法
close(){
	this.$emit('closeModal');
	console.log('modal close')
},
ok(){
	this.$emit('okModal')
}
    },
    computed: {//计算属性

    },
    watch: {//监测数据变化
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
	},
    mounted () {//模板被渲染完毕之后执行
	}
	
}
</script>

<style scoped lang="less">

</style>
