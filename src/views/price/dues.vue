<template>

	<div>
		<Card>
			
			<div slot="title">
				<h1>会费情况-查看岗位的缴费情况</h1>
			</div>
			
			<table-list :tableColumns="tableColumns" :seekShow="false" :tableData="personnelList" @on-btn-click="btnClick" :modalTitle="modalTitle">
				
				<div slot="header" style="display: flex;">
					
					<post-casc v-model="postId" @on-change="postChange" style="margin-right: 10px;"></post-casc>
					
					<Select v-model="jieCiId" @on-change="jieCiChange" @on-clear="jieCiclear" clearable placeholder="选择届次" not-found-text="当前岗位还没有届次" style="width:100px;margin-right: 10px;">
				        <Option v-for="item in jieCiData" :value="item.value" :key="item.value">{{item.label}}</Option>
				    </Select>
					
        			<Select v-model="statescreen" placeholder="会费情况" style="width: 150px;margin-right: 10px;">
						<Option value="全部">全部</Option>
						<Option value="欠费">欠费</Option>
						<Option value="缴清">缴清</Option>
        			</Select>
        			
					<Select v-model="modescreen" placeholder="缴纳方式" style="width: 150px;">
						<Option value="全部">全部</Option>
						<Option value="现金缴纳">现金缴纳</Option>
						<Option value="对公转账">对公转账</Option>
						<Option value="基金冲减">基金冲减</Option>
					</Select>
					
				</div>
				
  				<pay-ment slot="modalContent" :info="payInfo"></pay-ment>
  				
			</table-list>
			
		</Card>

	</div>

</template>

<script>
	import postCasc from '@/components/post/post-casc.vue'; //岗位级联
	import tableList from '@/components/tableList/table-list.vue'; //表格列表组件
    import payMent from '@/views/price/payment.vue'
	export default {
		name: 'dues',
		components: { //组件模板,
			postCasc,
			tableList,
			payMent
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
				
				modalTitle: '',
				
				payInfo: {},//详情数据信息
				
				postId: [],//岗位id
        	
	        	jieCiId: 0,//届次ID
	        	
	        	jieCiData: [],//届次数据
				
				modescreen: '',
				
				statescreen: '',
				
				tableColumns: [
					{
	    				width: 60,
	    				title: 'ID',
	    				key: 'id'
	    			},
					{
	    				title: '姓名',
	    				render: (h, params) => {
	    					return h('span', params.row.memberInfo.person_name)
	    				}
	    			},
					{
						title: '手机号',
						key: 'mobilePhone'
					},
					{
						title: '会内职务',
						key: 'duty'
					},
					{
						title: '会费状态',
						key: 'state'
					},
					{
						title: '缴费方式',
						key: 'PayWay'
					},
					{
						title: '应缴金额-本届',
						key: 'payableMoney'
					},
					{
						title: '实缴金额',
						key: 'paidMoney'
					},
					{
						title: '本届到期时间',
						key: 'expirationTime'
					},
					{
						align: 'center',
						width: 130,
						title: '操作',
						handle: [
							{
								name: '查看详情',
								key: 'details',
								modalShow: true,
							}
						],
					}
				],
				
				personnelList: [],
				
			}
		},
		methods: { //方法
			
			btnClick(val){//表格按钮事件
				if(val.key === 'details'){//详情
					this.modalTitle = '（'+ val.params.row.memberInfo.person_name +'）的会费详情';
					this.payInfo = val.params.row;
				}
			},
			
			postChange(postId, postData){//岗位选择改变时
				this.getJieCiData(postId);
				this.getPersonnelData(postId, 0);
				let newArr = [];
				postData.forEach(item => {
					newArr.push(item.label);
				});
				this.postTextArr = newArr;
			},
			
			jieCiChange(jieId){//选择届次时触发
				if(jieId != undefined){
					this.getPersonnelData(this.postId, jieId);
				}else{
					this.jieCiId = 0;
				}
			},
			
			jieCiclear(){//清空届次时触发
				this.getPersonnelData(this.postId, 0);
			},
			
			getJieCiData(postId){//获取届次数据
				this.jieCiId = 0;
				$ax.getAjaxData('manage.Organize/jieList', {
					gw_id: postId && postId.length > 0 ? postId[postId.length-1] : '',//岗位ID
				}, res => {
					if(res.code == 0){
						let newArr = [];
						res.data.forEach(item => {
							newArr.push({
								label: item.jie_name,
								value: Number(item.id)
							})
						});
						this.jieCiData = newArr;
					}
				});
			},
			
			getPersonnelData(postId, jieId){//获取人员列表数据
				$ax.getAjaxData('manage.Organize/gangweiMemberList', {
					gw_id: postId && postId.length > 0 ? postId[postId.length-1] : '',//岗位ID
					jie_id: jieId//届次ID
				}, res => {
					if(res.code == 0){
						this.personnelList = res.data;
					}
				});
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

		//=================组件路由勾子==============================

		beforeRouteEnter(to, from, next) { //在组件创建之前调用（放置页面加载时请求的Ajax）

			(async () => { //执行异步函数

				//async、await错误处理
				try {

					/*
					 * 
					 * ------串行执行---------
					 * console.log(await getAjaxData());
					 * ...
					 * 
					 * ---------并行：将多个promise直接发起请求（先执行async所在函数），然后再进行await操作。（执行效率高、快）----------
					 * let abc = getAjaxData();//先执行promise函数
					 * ...
					 * console.log(await abc);
					 * ...
					 */
					next(vm => {

					});

				} catch (err) {
					console.log(err);
				}

			})();

		},

	}
</script>

<style scoped lang="less">
 .radio{
	margin-right: 6px;
}
</style>
