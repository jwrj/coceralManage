<template>
	
	<div>
		<p  class="space">商会名称：
					<Input v-model="chamberName" placeholder="请输入商会名称" style="width: 400px" />
				</p>
				<p class="space">上级商会：{{highCham}}</p>
				<p class="selector space">
					注册地：
					<Select size="small" class="select">
						<Option v-model="itema">国家</Option>
					</Select>
					<Select size="small" class="select">
						<Option v-model="itemb">省/自治区/直辖市</Option>
					</Select>
					<Select size="small" class="select">
						<Option v-model="itemc">市</Option>
					</Select>
					<Select size="small" class="select">
						<Option v-model="itemd">县</Option>
					</Select>
				</p>
				<p class="selector space">
					归属地：
					<Select size="small" class="select">
						<Option v-model="itema">国家</Option>
					</Select>
					<Select size="small" class="select">
						<Option v-model="itemb">省/自治区/直辖市</Option>
					</Select>
					<Select size="small" class="select">
						<Option v-model="itemc">市</Option>
					</Select>
					<Select size="small" class="select">
						<Option v-model="itemd">县</Option>
					</Select>
				</p>
		<p class="space signImg"><div style="float: left;" >协会标志：</div>	
			<img :src="img" alt="sign" @click="openCoc">
			<p style="clear: both;"></p>
		</p>
		
	</div>
	
</template>

<script>
import defaultImg from '@/assets/img/default-img/u710.png'
export default {
	name: 'chamber',
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
        	chamberName: '',
        	highCham: '上级商会1',
        	itema: '国家',
        	itemb: '省/自治区/直辖市',
        	itemc: '市',
        	itemd: '县',
			img:defaultImg
        }
    },
    methods: {//方法
    	openCoc(){
    		alert('waiting to open coc')
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
		span {
			margin: 0 5px;
		}
        
		.selector {
			padding-top: 5px;

			.select {
				margin: 0 0 0 13px;
				width: 100px;
			}
		}
		.space{
			margin-top: 5px;
		}
</style>
