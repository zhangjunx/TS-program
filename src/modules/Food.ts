//定义食物类
class Food{
	//定义一个属性表示食物所对应的元素
	element:HTMLElement;
	
	constructor(){
		this.element=document.getElementById('food')!;//感叹号表示这个food元素肯定可以拿到
	}
	
	//定义一个获取食物X轴坐标的方法
	get X(){
		return this.element.offsetLeft;
	}
	
	//定义一个获取食物Y轴坐标的方法
	get Y(){
		return this.element.offsetTop;
	}
	
	//修改食物位置的方法
	change(){
		//生成一个随机的位置
		//蛇移动一次就是一格，一格的大小就是10，所以就要求食物的坐标必须是10的倍数
		let top=Math.round(Math.random() * 29) * 10;	
		let left=Math.round(Math.random() * 29) * 10;
		this.element.style.left=left+"px";
		this.element.style.top=top+"px";
	}
}

export default Food;