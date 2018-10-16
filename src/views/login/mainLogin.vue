<template>
	
	<div class="demo-spin-col">
		
		<Spin fix v-if="spinShow">
            <Icon type="ios-loading" size="26" class="demo-spin-icon-load"></Icon>
            <div style="font-size: 16px;">加载中</div>
        </Spin>
        
        <div class="error" v-if="!spinShow">
        	<div style="width: 100%;">
	        	<Icon size="120" color="#c5c8ce" type="md-information-circle" />
        	</div>
        	<div style="width: 100%;">
        		<span>加载失败，请重新加载~</span>
        	</div>
        	<div style="width: 100%;margin-top: 10px;">
        		<Button type="default" @click="refresh">重新加载</Button>
        	</div>
        </div>
		
	</div>
	
</template>

<script>

export default {
	name: '',
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
        	
        	spinShow: true,
        	
        }
    },
    methods: {//方法
    	
    	refresh(){
    		window.location.reload();
    	},
    	
    },
    computed: {//计算属性
        	
    },
    watch: {//监测数据变化
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	setTimeout(() => {
    		this.spinShow = false;
    	},5000);
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		$ax.getAjaxData('user.Comm/myInfo', {}, (response) => {
    		if(response.code === 0){//已登录
    			sessionStorage.login = 'login';
    			next({name: 'login'});
    		}else if(response.code === 81){//未登录跳转到用户中心
    			$ax.getAjaxData('Oauth/getLoginUrl', {}, (response) => {
		    		window.location.href = response.data.url;
		    	}, error => {
		    		next(vm => {
		    			vm.spinShow = false;
		    		});
		    	});
    		}
    	}, error => {
    		next(vm => {
    			vm.spinShow = false;
    		});
    	});
    	
    	next();
    	
	},
	
}
</script>

<style scoped lang="less">
	.demo-spin-col{
        height: 100%;
        position: relative;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .error{
    	text-align: center;
    	position: absolute;
    	width: 100%;
    	height: 100%;
    	left: 0;
    	right: 0;
    	top: 0;
    	bottom: 0;
    	display: flex;
    	align-content: center;
    	flex-wrap: wrap;
    }
</style>