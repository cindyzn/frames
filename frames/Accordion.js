Accordion.prototype.initUI=function(){
			let htmlStr = "";
			
			htmlStr = "<ul style='position:relative;list-style: none;width:"+this.width+"px;height:"+this.height+"px;overflow: hidden;'>";
			for(let i=0;i<this.count;i++){
				let spanStr= "<span style='background-image:url("+this.titleBgs[i]+");display: block;width: "+(this.titleWidth-2)+"px;height: "+(this.height-2)+"px;border: 1px solid black;'>"+this.titles[i]+"</span>";
				htmlStr +="<li style='background-image:url("+this.imgs[i]+");position: absolute;width: "+(this.width-(this.count-1)*this.titleWidth)+"px;height: "+this.height+"px;left:"+(i*this.titleWidth)+"px;'>"+spanStr+"</li>";				
			}
			htmlStr+="</ul>";
			
			$(this.boxId).append(htmlStr);
			
			var that = this;
			
			$(this.boxId+" ul li span").mouseover(function(){				
				//1、得到当前span的下标
				let index = $(that.boxId+" ul li span").index(this);
				let left = parseInt($(this).parent().css("left"));
				let spaceWidth = that.width-that.titleWidth*that.count;
				if(left==index*that.titleWidth){
					var lis = $(this).parent().nextAll();				
					lis.each(function(i){		
						let left = spaceWidth+(index+i+1)*that.titleWidth;		//index = 1	+1+1		
						$(this).animate({"left":left+"px"},that.speed);
					});					
				}else if(left==spaceWidth+index*that.titleWidth){
					$(that.boxId+" ul li:lt("+(index+1)+")").each(function(i){
					let left =  i*that.titleWidth;
						$(this).animate({"left":left+"px"},that.speed);					
					});
				}				
			});			
		}
		
		
//构造函数
function Accordion(obj){
	this.boxId = obj.boxId;
	this.width = obj.width;
	this.height = obj.height;
	this.speed = obj.speed;
	this.count = obj.count;
	this.titles = obj.titles;//琴键（标题）上的文字；
	this.titleBgs = obj.titleBgs;//琴键（标题）的背景图片；
	this.imgs = obj.imgs;//每个琴键对应的内容图片。
	this.titleWidth = obj.titleWidth;//每个琴键的宽度；
	this.initUI();
}