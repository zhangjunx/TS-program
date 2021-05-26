//使用npm init -y 在项目中生成package.json文件
//使用npm i -D webpack webpack-cli typescript ts-loader安装一些包，-D表示开发环境
//npm i -D html-webpack-plugin  下载自动生成html文件的插件
//npm i -D webpack-dev-server 自动刷新浏览器  热更新
//npm i -D clean-webpack-plugin 打包之前删除之前的打包文件
//babel是一个工具，可以把新语法转换成旧语法,解决浏览器兼容性问题
//npm i -D @babel/core @babel/preset-env babel-loader core-js
//npm i -D less less-loader css-loader style-loader  安装less
//npm i -D postcss postcss-loader postcss-preset-env   对css做兼容性处理


//引入一个包
const path=require('path');
//引入html插件
const HTMLWebpackPlugin=require('html-webpack-plugin');
//引入cleanWebpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


//webpack中所有的配置信息都应该写在module.exports中
module.exports={
	
	//入口文件
	entry:'./src/index.ts',
	
	//指定打包文件所在目录
	output:{
		//指定打包文件的目录
		path:path.resolve(__dirname,'dist'),
		//打包后文件的名字
		filename:"bundle.js",
		//告诉webpack不使用箭头函数
		environment:{
			arrowFunction:false,
			const:false
		}
	},
	
	//指定webpack打包时要使用的模块
	module:{
		//指定要加载的规则
		rules:[
			{
				//test指定的是规则生效的文件
				test:/\.ts$/,
				//要使用的loader
				use:[
					//配置babel
					{
						//指定加载器
						loader:"babel-loader",
						//设置babel
						options:{
							//设置预定义的环境
							presets:[
								[
									//指定环境的插件
									"@babel/preset-env",
									//配置信息
									{
										targets:{
											//指定浏览器的版本
											"chrome":"88"
										},
										"corejs":"3",//代表用corejs的哪个版本
										//使用corejs的方式  "usage"表示按需加载
										"useBuiltIns":"usage"
									}
								]
							]
						}
					},
					'ts-loader'
				],
				//要排除编译的文件
				exclude:/node-modules/
			},
			{
				//设置less文件的处理
				test:/\.less$/,
				use:[
					"style-loader",
					"css-loader",
					//引入postcss
					{
						loader:"postcss-loader",
						options:{
							postcssOptions:{
								plugins:[
									[
										"postcss-preset-env",
										{
											browsers:'last 2 versions'	
										}
									]
								]
							}
						}
					},
					"less-loader",
					//从下往上执行
				]
			}
			
		]
	},
	//配置webpack插件
	plugins:[
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({
			//title:"这是一个自定义的title",
			template:"./src/index.html"
		}),//打包之后的文件自动生成html文件，并自动引入相关的css,js文件
	],
	//用来设置哪些文件可以作为模块被引用
	resolve:{
		extensions:['.ts','.js']
	},
	mode:"development"
}