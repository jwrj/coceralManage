<template>

	<div>
		<script ref="editor" type="text/plain" :style="{width:configs.width,height:configs.height}"></script>
	</div>

</template>

<script>
import "../../../public/UEditor/ueditor.config.js";
import "../../../public/UEditor/ueditor.all.js";
import "../../../public/UEditor/lang/zh-cn/zh-cn.js";
export default {
	name: "UEditor",
	props: {
		
		configs: {//配置
			type: Object,
		},
		
		defaultContent: {//默认内容
			type: String,
			default: ''
		},
		
	},
	data() {
		return {
			editor: null //要来保存实例用的,
		};
	},

	mounted() {

		let config = {
			toolbars: [
				[
					// "anchor", //锚点
					"source", //源代码
					"undo", //撤销
					"redo", //重做
					"preview", //预览
					"print", //打印
					"|",
					"formatmatch", //格式刷
					"removeformat", //清除格式
					"autotypeset", //自动排版

					"time", //时间
					"date", //日期
					"link", //超链接
					"unlink", //取消链接
					"horizontal", //分隔线
					"|",

					"inserttable", //插入表格
					"edittable", //表格属性
					"edittd", //单元格属性
					"insertrow", //前插入行
					"insertcol", //前插入列
					"mergeright", //右合并单元格
					"mergedown", //下合并单元格
					"deleterow", //删除行
					"deletecol", //删除列
					"splittorows", //拆分成行
					"splittocols", //拆分成列
					"splittocells", //完全拆分单元格
					"deletecaption", //删除表格标题
					"inserttitle", //插入标题
					"mergecells", //合并多个单元格
					"deletetable", //删除表格
					"insertparagraphbeforetable", //"表格前插入行"
				],
				[
					"fontfamily", //字体
					"fontsize", //字号
					"paragraph", //段落格式

					"forecolor", //字体颜色
					"backcolor", //背景色

					"bold", //加粗
					// "snapscreen", //截图
					"italic", //斜体
					"underline", //下划线
					"strikethrough", //删除线
					"subscript", //下标
					"superscript", //上标
					"fontborder", //字符边框
					"indent", //首行缩进

					"lineheight", //行间距

					// "blockquote", //引用
					// "pasteplain", //纯文本粘贴模式
					// "selectall", //全选

					// "cleardoc", //清空文档

					// "insertcode", //代码语言

					// "emotion", //表情
					// "spechars", //特殊字符
					// "searchreplace", //查询替换
					// "map", //Baidu地图
					// "gmap", //Google地图
					// "insertvideo", //视频
					// "help", //帮助
					"justifyleft", //居左对齐
					"justifyright", //居右对齐
					"justifycenter", //居中对齐
					"justifyjustify", //两端对齐
					"insertorderedlist", //有序列表
					"insertunorderedlist", //无序列表
					// "fullscreen", //全屏
					// "directionalityltr", //从左向右输入
					// "directionalityrtl", //从右向左输入
					// "rowspacingtop", //段前距
					// "rowspacingbottom", //段后距
					// "pagebreak", //分页
					// "insertframe", //插入Iframe
					// "imagenone", //默认
					// "imageleft", //左浮动
					// "imageright", //右浮动
					"imagecenter", //居中
					"attachment", //附件
					// "wordimage", //图片转存
					// "edittip ", //编辑提示
					// "customstyle", //自定义标题
					// "webapp", //百度应用
					// "touppercase", //字母大写
					// "tolowercase", //字母小写
					// "background", //背景
					// "template", //模板
					// "scrawl", //涂鸦
					// "music", //音乐
					// "drafts", // 从草稿箱加载
					// "charts" // 图表

					// "simpleupload", //单图上传
					"insertimage" //多图上传
				]
			]
		};

		if(this.configs.config) { //如果父组件传递有configs.config过来,将会覆盖本地的config

			config = this.configs.config;

		}

		let _this = this;
		
		window.UE.delEditor(this.$refs.editor);//解决二次渲染不显示的问题
		
		this.editor = window.UE.getEditor(this.$refs.editor, config);

		this.editor.addListener("ready", () => {//编辑器准备就绪后会触发该事件
			
			this.editor.setContent(_this.defaultContent);//默认显示的内容
			
		});

		this.editor.addListener("contentChange", () => {//编辑内容时触发

			_this.$emit('up_editor_content', _this.editor.getContent());//发出监听事件

		});
		
	},
	methods: {

	},
	destroyed() {

		//this.editor.destroy();

	},
};
</script>

<style scoped>

</style>