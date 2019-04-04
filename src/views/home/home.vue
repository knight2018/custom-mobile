<template>
    <div>
        <canvas id = "bubble" ref="bubble"></canvas>
    </div>
</template>

<script>
export default {
    name: 'home',
    data (){
        return {
            canvas: ''
        }
    },
    mounted (){
        let canvas = this.$refs.bubble;
        this.canvas = canvas;
        let w=window.innerWidth;
		let h=window.innerHeight;
		canvas.width=w;
		canvas.height=h;
		window.onresize=function(){//当窗口大小发生变化
			w=window.innerWidth;
			h=window.innerHeight;
			canvas.width=w;
			canvas.height=h;
		}
		let canCon=canvas.getContext("2d");
		function random(min,max){
			return Math.random()*(max-min)+min;
		}
		let colorArry = ["#e08031","#c7ceb2","#199475","#0b6e48","#044d22"];
		function Bubble(){
			/*var Bubble =new Bublle();*/
		};
		Bubble.prototype={
			init:function(){//所有的小泡泡的基本零件
				this.x=random(0,w);//浏览器的最左边到最右边
				this.y=random(0,h);//浏览器的最左边到最右边
				this.r=random(0,3);//默认圆的大小
				this.color=colorArry[Math.floor(random(0,5))];
				this.xr=random(-1,1);//正值
				this.yr=random(-1,1);//正值
				this.D=30;//鼠标周围50个px的小泡泡
			},
			draw:function(){
				canCon.beginPath();//提笔重画
				canCon.fillStyle=this.color;//拿起一只红色的笔
				canCon.arc(this.x,this.y,this.r,0,Math.PI*2)//脑海里构思我们要花什么
				canCon.fill();
			},
			update:function(){
				this.x+=this.xr;
				this.y+=this.yr;
				if(this.x-this.r<0||this.x+this.r>w){
					this.xr = -this.xr;
				}
				if(this.y-this.r<0||this.y+this.r>h){
					this.yr = -this.yr;
				}
				this.xD =(positionX-this.x)<0?-(positionX-this.x):(positionX-this.x);
				this.yD =(positionY-this.y)<0?-(positionY-this.y):(positionY-this.y);
				if(this.xD<this.D&&this.yD<this.D&&this.r<50){
					this.r+=1;
				}
				else if(this.r>4&&this.xD>this.D&&this.yD>this.D){
					this.r-=1;
				}
				this.draw();
			}
		}
		let bubbleArry=[];
		function create(){
			let bubble =new Bubble();
			bubble.init();
			bubble.draw();
			bubbleArry.push(bubble);
		}
		for(let i = 0;i<300;i++){
		   	create();
		}
		setInterval(function(){
            canCon.clearRect(0,0,w,h);
            for(let b of bubbleArry){
                b.update();
            }
		},1000/60);
		let positionX,positionY;
		canvas.onmousemove=function(){
				let ev=ev||window.event;
				positionX=ev.clientX;
				positionY=ev.clientY;
		}
    },
    beforeDestroy (){
        if(this.canvas)this.canvas.onmousemove = null;
    }
}
</script>

<style lang="stylus" scoped>
#bubble
	display block;
</style>
