<template>

	<div class="breadcrumb-box">
			
		<Icon @click.native="collapsedSider" :class="{'rotate-icon': isCollapsed}" class="menu-collapsed-icon" type="md-menu" size="28"></Icon>
		
		<div class="breadcrumb-box-breadcrumb">
	
			<Breadcrumb>
				<template v-for="item in breadCrumbList">
			        <BreadcrumbItem :replace="true" :to="item.to ? '/' : ''">
			        	<Icon :type="item.icon || item.meta.icon"></Icon>
			        	<span>{{item.meta.title}}</span>
			        </BreadcrumbItem>
		        </template>
		    </Breadcrumb>
	
		</div>
		
		<div class="breadcrumb-box-right">
			
			<div style="margin-right: 16px;">
				<Select v-model="chamber" filterable size="small" placeholder="选择商会">
	                <Option value="广西湖北商会">广西湖北商会</Option>
	                <Option value="商会2">商会2</Option>
	                <Option value="商会3">商会3</Option>
	            </Select>
			</div>
			
			<div style="flex-shrink: 0;">
				<Dropdown placement="bottom-end">
			        <a style="display: inline-block;">
		           		<Avatar icon="ios-person" />
		           		<Icon size="20" type="md-arrow-dropdown" />
			        </a>
			        <DropdownMenu slot="list">
			            <DropdownItem>切换身份（当前为管理者）</DropdownItem>
			            <DropdownItem>退出登录</DropdownItem>
			        </DropdownMenu>
			    </Dropdown>
			</div>
		    
        </div>
		
	</div>

</template>

<script>

export default {
	name: 'breadcrumbModule',
	components: { //组件模板
		
	},
	props: {
		
		breadCrumbList: {
			type: Array,
			default: () => []
		},
		
		isCollapsed:{
		 	type: Boolean,
		},
		
	},
	data() { //数据
		return {
			
			chamber: '广西湖北商会',
			
		}
	},
	methods: { //方法
		
		collapsedSider() {
			this.$emit('clickIcon');
		},
		
	},
	computed: { //计算属性
		
	},
	watch: { //监测数据变化
		
	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		
	},
	mounted() { //模板被渲染完毕之后执行
		
	},

}
</script>

<style scoped lang="less">
	.menu-collapsed-icon {
		margin: 0 20px;
		cursor: pointer;
		flex-shrink: 0;
	}
	.rotate-icon {
		transform: rotate(-90deg);
	}
	.breadcrumb-box{
		height: 53px;
		display: flex;
		align-items: center;
		overflow: hidden;
		.breadcrumb-box-breadcrumb{
			white-space:nowrap;
			overflow: hidden;
			margin-right: 16px;
		}
		.breadcrumb-box-right{
			margin: 0 46px 0 auto;
			flex-shrink: 0;
			display: flex;
			align-items: center;
		}
	}
</style>