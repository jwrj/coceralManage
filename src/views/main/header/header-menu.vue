<template>
	
	<div class="header-menu-box">
		
		<div class="left-box">
			<p class="nowrap-ellipsis" style="font-size: 14px;">{{coceralName}}</p>
			<p style="margin-top: 4px;font-size: 18px;">信息管理平台</p>
		</div>
		
		<div class="menu-btn-mainBox">
			<div class="menu-btn-box">
				<div
				v-for="item in menuList"
				@click="clickBtn(item)"
				:class="{active: item.name === activeName}"
				class="navBtn">
					{{item.meta.title || item.children[0].meta.title}}
				</div>
			</div>
		</div>
	    
		<div class="right-box">
			<div>
				<Select v-model="chamberId" :label-in-value="true" @on-change="chamberSele" @on-open-change="coceralOpenChange" filterable size="small" placeholder="选择商会">
	                <Option v-for="item in chamberData" :value="item.value" :key="item.value">{{ item.label }}</Option>
	            </Select>
			</div>
			<div style="margin-left: 16px;flex-shrink: 0;">
				<Dropdown :transfer="true" trigger="click" @on-click="dropdownClick" placement="bottom-end">
			        <a style="display: inline-block;">
		           		<Avatar icon="ios-person" />
		           		<Icon size="20" type="md-arrow-dropdown" />
			        </a>
			        <DropdownMenu slot="list">
			            <DropdownItem name="handover">切换用户类型</DropdownItem>
			            <DropdownItem name="logOut">退出用户中心</DropdownItem>
			        </DropdownMenu>
			    </Dropdown>
	        </div>
		</div>
		
	</div>
		
</template>

<script>

export default {
	name: 'headerMenu',
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
		
		menuList: {
		 	type: Array,
		 	default: () => []
		},
		
	},
    data () {//数据
        return {
        	
        	activeName: '',
        	
        	chamberId: Number(sessionStorage.chamberId),
        	
        	chamberData: [],
			
			identityType: Number(sessionStorage.identityType),
			
			coceralName: sessionStorage.chamberName,
        	
        }
    },
    methods: {//方法
    	
    	clickBtn(current){//点击导航按钮
    		
    		this.activeName = current.name;
    		
    		if(current.href){
    			window.open(current.href);
    		}else{
    			
    			this.$store.state.app.menuChildrenList = [];
    			
	    		if(current.children && current.children.length <= 1){
	    			this.$router.push({
	    				name: current.children[0].name
	    			});
	    		}else{
	    			
	    			this.menuList.forEach(item => {
						if(item.name == current.name){
							this.$store.state.app.menuChildrenList = item.children;
						}
					});
	    			
	    		}
    		}
    		
    		this.$emit('on-header-click-btn');
    		
    	},
    	
    	coceralOpenChange(_boolean){//商会下拉框展开或收起时触发
    		
		},
    	
    	chamberSele(obj){//切换商会
			if(this.identityType === 1){//会员
				$ax.getAjaxData('user.Comm/logoutMember', {}, res => {//会员身份退出登录
					if(res.code == 0){
						$ax.getAjaxData('user.Comm/loginMember', {//会员身份登录
							mid: obj.value
						}, res => {
							if(res.code == 0){
								this.coceralName = obj.label;
								sessionStorage.chamberId = obj.value;
								sessionStorage.chamberName = obj.label;
								this.$emit('on-coceral-change');
								this.$Message.success('商会更换成功');
							}
						});
					}
				});
			}else if(this.identityType === 2){//管理者
				$ax.getAjaxData('user.Comm/logoutManage', {}, res => {//管理者身份退出登录
					if(res.code == 0){
						$ax.getAjaxData('user.Comm/loginManage', {//管理者身份登录
							oid: obj.value
						}, res => {
							if(res.code == 0){
								this.coceralName = obj.label;
								sessionStorage.chamberId = obj.value;
								sessionStorage.chamberName = obj.label;
								this.$emit('on-coceral-change');
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
    	
    	handoverLogin(){//切换登录
    		if(this.identityType === 1){//退出会员登录
				$ax.getAjaxData('user.Comm/logoutMember', {}, res => {
					if(res.code == 0){
						sessionStorage.removeItem('identityType');
						sessionStorage.removeItem('chamberId');
						sessionStorage.removeItem('chamberName');
						sessionStorage.removeItem('userAccess');
						sessionStorage.removeItem('tagNaveList');
						this.$router.replace({name: 'login'});
						this.$Message.success('退出会员登录成功');
					}
				});
			}else if(this.identityType === 2){//退出管理者登录
				$ax.getAjaxData('user.Comm/logoutManage', {}, res => {
					if(res.code == 0){
						sessionStorage.removeItem('identityType');
						sessionStorage.removeItem('chamberId');
						sessionStorage.removeItem('chamberName');
						sessionStorage.removeItem('userAccess');
						sessionStorage.removeItem('tagNaveList');
						this.$router.replace({name: 'login'});
						this.$Message.success('退出管理者登录成功');
					}
				});
			}
    	},
    	
    	logOut(){
    		$ax.getAjaxData('Oauth/logout', {}, res => {
    			if(res.code == 0){
    				sessionStorage.removeItem('userLogin');
					sessionStorage.removeItem('identityType');
					sessionStorage.removeItem('chamberId');
					sessionStorage.removeItem('chamberName');
					sessionStorage.removeItem('tagNaveList');
					sessionStorage.removeItem('userAccess');
					sessionStorage.removeItem('myCompanyList');
					sessionStorage.removeItem('userName');
					this.$router.replace({name: 'mainLogin'});
    				this.$Message.success('退出用户中心登录成功');
    			}
    		});
    	},
    	
    	dropdownClick(name){//功能菜单下拉
			if(name === 'handover'){//切换登录
				this.handoverLogin();
			}else if(name === 'logOut'){//退出登录
				this.logOut();
			}
		},
    	
    },
    computed: {//计算属性
        
    },
    watch: {//监测数据变化
    	
    	'$route'(newRoute){
    		
    		let openNamesArr = newRoute.path.slice(1).split('/');
    		
    		this.$store.state.app.menuChildrenList = [];
    	
	    	this.activeName = openNamesArr[0] === 'home' ? '_home' : openNamesArr[0];
	    	
	    	this.menuList.forEach(item => {
				if(item.name == openNamesArr[0]){
					if(item.children && item.children.length > 1){
						this.$store.state.app.menuChildrenList = item.children;
					}
				}
			});
    		
    	},
    	
	},
    
    //===================组件钩子===========================
    
    created () {//实例被创建完毕之后执行
    	
    	let openNamesArr = this.$route.path.slice(1).split('/');
    	
    	this.$store.state.app.menuChildrenList = [];
    	
    	this.activeName = openNamesArr[0] === 'home' ? '_home' : openNamesArr[0];
    	
    	this.menuList.forEach(item => {
			if(item.name == openNamesArr[0]){
				if(item.children && item.children.length > 1){
					this.$store.state.app.menuChildrenList = item.children;
				}
			}
		});
		
		this.getChamberData();
    	
	},
    mounted () {//模板被渲染完毕之后执行
    	
	},
	
}
</script>

<style scoped lang="less">
	.header-menu-box{
		overflow: hidden;
		height: 60px;
		display: flex;
		align-items: center;
		.left-box{
			width: 200px;
			padding: 0 8px;
			text-align: center;
			color: #fff;
			flex-shrink: 0;
			p{
				color: #fff;
			}
		}
		.right-box{
			display: flex;
			align-items: center;
			margin: 0 16px 0 10px;
			color: #fff;
			flex-shrink: 0;
		}
		.menu-btn-mainBox{
			width: 100%;
			display: flex;
			overflow: hidden;
			.menu-btn-box{
				display: flex;
				margin-left: -10px;
				.navBtn{
					background-color: #3C4656;
					padding: 6px 12px;
					color: #fff;
					margin-left: 10px;
					cursor: pointer;
					flex-shrink: 0;
				}
				.active{
					background-color: #2d8cf0;
				}
			}
		}
	}
</style>