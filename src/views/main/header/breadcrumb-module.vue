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
				<Select v-model="chamberId" @on-change="chamberSele" filterable size="small" placeholder="选择商会">
	                <Option v-for="item in chamberData" :value="item.value" :key="item.value">{{ item.label }}</Option>
	            </Select>
			</div>
			
			<div style="flex-shrink: 0;">
				<Dropdown @on-click="dropdownClick" placement="bottom-end">
			        <a class="user-menu">
		           		<Avatar icon="ios-person" />
		           		<span style="padding-left: 2px;">{{identityTxt}}</span>
		           		<Icon size="20" type="md-arrow-dropdown" />
			        </a>
			        <DropdownMenu slot="list">
			            <DropdownItem name="identity">切换身份</DropdownItem>
			            <DropdownItem name="logOut">退出登录</DropdownItem>
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
			
			chamberId: Number(sessionStorage.chamberId),
			
			chamberData: [],
			
			identityType: Number(sessionStorage.identityType),
			
		}
	},
	methods: { //方法
		
		collapsedSider() {
			this.$emit('clickIcon');
		},
		
		chamberSele(val){//切换商会
			
			if(this.identityType === 1){//会员身份登录
				$ax.getAjaxData('user.Comm/logoutMember', {}, res => {
					if(res.code == 0){
						$ax.getAjaxData('user.Comm/loginMember', {
							mid: val
						}, res => {
							if(res.code == 0){
								sessionStorage.chamberId = val;
								this.$Message.success('商会更换成功');
							}
						});
					}
				});
			}else if(this.identityType === 2){//管理者身份登录
				$ax.getAjaxData('user.Comm/logoutManage', {}, res => {
					if(res.code == 0){
						$ax.getAjaxData('user.Comm/loginManage', {
							oid: val
						}, res => {
							if(res.code == 0){
								sessionStorage.chamberId = val;
								this.$Message.success('商会更换成功');
							}
						});
					}
				});
			}
			
		},
		
		getChamberData(){//商会列表数据
			
			let newArr = [];
			
			if(this.identityType === 1){//我加入的商会列表
				$ax.getAjaxData('user.Comm/myJoinOrganize', {
					company_id: -1
				}, res => {
					res.data.forEach(item => {
						newArr.push({
							label: item.org_name,
							value: Number(item.mid),
						});
					});
				});
			}else if(this.identityType === 2){//我创建的商会列表
				$ax.getAjaxData('user.Comm/myCreateOrganize', {}, res => {
					res.data.forEach(item => {
						newArr.push({
							label: item.name,
							value: Number(item.id),
						});
					});
				});
			}
			
			this.chamberData = newArr;
			
		},
		
		dropdownClick(name){
			if(name === 'identity'){//切换身份
				
				if(this.identityType === 1){//退出会员登录
					$ax.getAjaxData('user.Comm/logoutMember', {}, res => {
						if(res.code == 0){
							sessionStorage.removeItem('identityType');
							sessionStorage.removeItem('chamberId');
							this.$router.replace({name: 'login'});
							this.$Message.success('退出会员登录成功');
						}
					});
				}else if(this.identityType === 2){//退出管理者登录
					$ax.getAjaxData('user.Comm/logoutManage', {}, res => {
						if(res.code == 0){
							sessionStorage.removeItem('identityType');
							sessionStorage.removeItem('chamberId');
							this.$router.replace({name: 'login'});
							this.$Message.success('退出管理者登录成功');
						}
					});
				}
			}else if(name === 'logOut'){//退出登录
				
			}
		},
		
	},
	computed: { //计算属性
		
		identityTxt(){
			let txt = '';
			if(this.identityType === 1){
				txt = '会员';
			}else if(this.identityType === 2){
				txt = '管理者';
			}
			return txt;
		},
		
	},
	watch: { //监测数据变化
		
	},

	//===================组件钩子===========================

	created() { //实例被创建完毕之后执行
		this.getChamberData();
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
	.user-menu{
		display: flex;
		align-items: center;
	}
</style>