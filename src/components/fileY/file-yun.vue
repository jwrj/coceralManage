<template>
	
	<div>
		
		<!--<iframe src="http://192.168.2.200:8080/#/fileSelect/" frameborder="0" width="100%" height="400"></iframe>-->
		
	</div>
	
</template>

<script>

export default {
	name: 'fileYun',
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
        	
        }
    },
    methods: {//方法
    	
    	receiveMessage(e) {
		    var origin = e.origin;
		    if (origin !== "http://192.168.2.200:8080") {//消息来自这个域名
		    	return;
		    } else {
		    	let data = e.data;//接收到的数据
		    	this.$emit('input', data);
		    }
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
    	
    	//window.addEventListener("message", this.receiveMessage);//侦听别的窗口发来的消息
    	
	},
	
}
</script>

<style scoped lang="less">

</style>