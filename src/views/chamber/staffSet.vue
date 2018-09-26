<template>
	
	<div>
		<Card style="margin-top: 16px;position: initial;">
			
	<div slot="title" class="title">
							<h1>给{{chamber}}的岗位配置人员</h1>
							<Button class="btnSmall" size="small" type="info" @click="addStaff">添加/追加人员</Button>
						</div>
			<table-list></table-list>
				<staff-modal :modalShow="modalShow" @closeModal="closeModal"  @okModal="okModal"></staff-modal>
		</Card>
		
	</div>
	
</template>

<script>
	import tableList from '@/components/tableList/table-list.vue'
	import staffModal from '@/views/chamber/component/staffModal'
export default {
	name: 'staffSet',
	components:{//组件模板,
		tableList,
		staffModal
	},
	props:{//组件道具（参数）
		/* ****属性用法*****
		 * 
		 * 传递类型 type: Array | Number | String | Object
		 * 为必传 required: true
		 * 默认值 default: ''
		 * 
		 */
		chamber:{
			type:String,
			default:'广西湖北商会'
		},
		staffs:{
			type:Array,
			default: () => ['1','2','3']
		}
	},
    data () {//数据
        return {
        	modalShow:false
        }
    },
    methods: {//方法
    	addStaff(){
			this.modalShow=true;
      console.log(this.modalShow);
		},
		closeModal(){
			this.modalShow=false;
			console.log('xianzai')
		},
		okModal(){
			this.modalShow=!this.modalShow;
			console.log('okkk')
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
    	
	},
	
	//=================组件路由勾子==============================
	
	beforeRouteEnter (to, from, next) {//在组件创建之前调用（放置页面加载时请求的Ajax）
		
		(async() => {//执行异步函数
			
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
				
			} catch(err) {
				console.log(err);
			}
			
		})();
		
	},
	
}
</script>

<style scoped lang="less">
		.btnSmall {
     margin-left: auto;
		}
		.title{
			display: flex;
			align-items: center;
		}
</style>
