<style scoped lang="less">
	.layout {
		background: #f5f7f9;
		position: relative;
		overflow: hidden;
		height: 100vh;
	}
	.layout-header-bar {
		position: relative;
		padding: 0 !important;
		height: auto !important;
		line-height: initial !important;
		background: #001529;
	}
	.main-content-box{
		width: 100%;
		height: 100%;
		padding: 30px 20px 300px;
		box-sizing: border-box;
		overflow: auto;
		position: absolute;
		top: 0;
		left: 0;
	}
	.menu-collapsed-icon {
		text-align: center;
		width: 40px;
		height: 40px;
		line-height: 40px;
		position: absolute;
		right: -19px;
		margin: auto;
		top: 0;
		bottom: 0;
		border-radius: 100px;
		background-color: rgba(0,0,0,.4);
		cursor: pointer;
		z-index: 99;
	}
	.rotate-icon {
		transform: rotate(-180deg);
	}
</style>

<template>

	<div style="height: 100%;">

		<Layout style="height: 100%;">
			
			<!--头部菜单-->
			<Header class="layout-header-bar">
				<header-menu :menuList="menuList" @on-header-click-btn="headerClickBtn" @on-coceral-change="coceralChange"></header-menu>
			</Header>
			<!--头部菜单-->
			
			<!--下侧-->
			<Layout style="overflow: hidden;height: 100%;">
				
				<!--菜单-->
				<Sider ref="siderInstance" hide-trigger collapsible :collapsed-width="64" v-model="isCollapsed" style="height: 100%;position: relative;">
					<Icon
					color="#fff"
					@click.native="collapsedSider"
					:class="{'rotate-icon': isCollapsed}"
					class="menu-collapsed-icon"
					type="ios-arrow-back"
					size="28">
					</Icon>
					<div style="color: #fff;text-align: center;padding: 8px 0;margin-bottom: 10px;background: #133F66;">
						<div style="font-size: 16px;">账号 {{userName}}</div>
					</div>
					<menu-sider ref='sideMenu' :menuList="$store.state.app.menuChildrenList" :isCollapsed="isCollapsed"></menu-sider>
					<div v-if="!isCollapsed" style="position:absolute;bottom: 20px;width: 100%;padding: 10px;">
						<p>客服电话：400-800-000</p>
						<p style="margin-top: 6px;">Copyright © 广西南宁八阵图科技有限公司</p>
					</div>
				</Sider>
				<!--菜单-->
				
				<!--内容-->
				<Content style="position: relative;">
					<div class="main-content-box">
						<router-view :style="{width: isHome == 'home' ? '' : '70%'}" v-if="isRouterAlive" />
					</div>
				</Content>
				<!--内容-->
				
			</Layout>
			<!--下侧-->
			
		</Layout>

	</div>

</template>

<script>
	
import menuSider from './menu/menu-sider.vue'

import headerMenu from './header/header-menu.vue'

import { mapMutations } from 'vuex';

export default {
	name: 'Main',
	components: { //组件模板
		menuSider,
		headerMenu,
	},
	props: { //组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
	},
	data() { //数据
		return {
			
			userName: sessionStorage.userName,
			
			isCollapsed: false,
			
			isRouterAlive: true,
			
			isHome: '',
			
		}
	},
	methods: { //方法
		
		...mapMutations([
	      	'getMenuList'
		]),
		
		collapsedSider() {//展开或收起左侧菜单
			this.$refs.siderInstance.toggleCollapse();
		},
		
		headerClickBtn(){//点击头部导航按钮
			this.$refs.sideMenu.updateMenu();
		},
		
		reload(){//重载路由
	    	this.isRouterAlive = false
	    	this.$nextTick(() => (this.isRouterAlive = true));
	   	},
		
		coceralChange(){//切换商会时触发
	   		this.reload();
	   	},
		
	},
	computed: { //计算属性
		
		menuList(){//菜单列表
			return this.$store.state.app.menuList;
		},
		
	},
	watch: { //监测数据变化
		
		'$route'(to){
			this.isHome = to.name;
		},
		
	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		
		this.getMenuList();//获取菜单列表
		
		this.isHome = this.$route.name;
		
	},
	mounted() { //模板被渲染完毕之后执行
		
	},

}
</script>