/*
    画图的插件
*/
function Chart(target, opt) {

    this.config = {
        width: 500,
        height: 500,
        type: 'column'
    };

    for (var key in opt) {
        this.config[key] = opt[key];
    };

    // 获取到我们的容器
    this.targetEl = document.querySelector(target);
    this.targetEl.style.cssText = "width: " + this.config.width + "px; height: " + this.config.height + "px; border: 1px solid #000";
    // 创建canvas
    this.canvasEl = document.createElement('canvas');
    this.canvasEl.width = this.config.width;
    this.canvasEl.height = this.config.height;
    // 插入
    this.targetEl.appendChild(this.canvasEl);
    // 获取画笔
    this.ctx = this.canvasEl.getContext('2d');

    // 自定义一个单位值   1vw = 我宽的百分之一
    this.vw = this.config.width * 0.01;

    this.init();
}


Chart.prototype = {

    // 初始化
    init: function() {
        var ctx = this.ctx;
        var vw = this.vw;

        // 3个点
        var pos = {
            one: {
                x: 10 * vw,
                y: 5 * vw
            },
            two: {
                x: 10 * vw,
                y: this.config.height - 10 * vw
            },
            three: {
                x: this.config.width - 5 * vw,
                y: this.config.height - 10 * vw
            },
            width: this.config.width - 15 * vw,
            height: this.config.height - 15 * vw
        };

        this.pos = pos;

        // 根据你传过来的图的类型  type 来调用相应的方法就行
        if (this['draw' + this.config.type]) {
            this['draw' + this.config.type]();
        } else {
            alert('按我的规则来写 type ');
        }
    },
   
    // 画背景
    drawBg: function() {
        var ctx = this.ctx;
        var vw = this.vw;
        var pos = this.pos;

        ctx.beginPath();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.moveTo(pos.one.x, pos.one.y);
        ctx.lineTo(pos.two.x, pos.two.y);
        ctx.lineTo(pos.three.x, pos.three.y);
        ctx.stroke();
    },
    // 画背景上的虚线
    drawBgLine: function() {
        var ctx = this.ctx;
        var vw = this.vw;
        var pos = this.pos;

        // 虚线之间的间隙
        var gap = Math.floor(pos.height / 5);

        // 获取数据的最大值
        var dataMax = this.getDataMax();
        var numGap = Math.floor(dataMax / 5);

        ctx.lineWidth = 1;
        var linear =  ctx.createLinearGradient(0, 0, this.config.width, 0);
        linear.addColorStop(0, 'black');
        linear.addColorStop(0.1, 'white');
        linear.addColorStop(0.2, 'black');
        linear.addColorStop(0.3, 'white');
        linear.addColorStop(0.4, 'black');
        linear.addColorStop(0.5, 'white');
        linear.addColorStop(0.6, 'black');
        linear.addColorStop(0.7, 'white');
        linear.addColorStop(0.8, 'black');
        linear.addColorStop(0.9, 'white');
        linear.addColorStop(1, 'black');
        ctx.strokeStyle = linear;

        // 写一个0
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText('0', pos.two.x - 10, pos.two.y);
        // 画5根虚线
        for (var i = 0; i < 5; i++) {
            ctx.beginPath();
            ctx.moveTo(pos.one.x, pos.one.y + gap * i + 0.5);
            ctx.lineTo(pos.three.x, pos.one.y + gap * i + 0.5);
            ctx.stroke();

            ctx.beginPath();
            ctx.fillText(dataMax - numGap * i, pos.one.x - 10, pos.one.y + gap * i + 0.5);
        }
    },
    // 获取数据最大值
    getDataMax: function() {
        var arr = [];
        for (var i = 0; i < this.config.data.length; i++) {
            arr.push(this.config.data[i].num);
        }

        return Math.max.apply(null, arr);
    },
    // 画折线图的方法
    drawline: function() {
         var ctx = this.ctx;
        var pos = this.pos;
        // 画背景
        this.drawBg();
        // 画背景上的虚线
        this.drawBgLine();

        // 要画的数量
        var nums = this.config.data.length;

        // 下面柱状的间隙  宽度
        var gap = Math.floor(pos.width / (nums * 2));

        // 最大的数据在我的这个最大的高度下的一个比例
        var dataMax = this.getDataMax();

        // 不要取整  1px的高度  =  多少数据
        var vh = pos.height / dataMax;
		var arr = [];
        for (var i = 0; i < nums; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.config.data[i].color;
            ctx.rect(pos.two.x + (2 * i + 1) * gap, pos.two.y, gap, -this.config.data[i].num * vh);
			ctx.fillText(this.config.data[i].title+' '+this.config.data[i].num,pos.two.x + (2 * i + 1) * gap+gap/2,pos.two.y+10);
			ctx.textAlign = 'center';
			//console.log(pos.two.x + (2 * i + 1) * gap, pos.two.y, gap, -this.config.data[i].num * vh);
			ctx.fill();
			ctx.beginPath();
			//console.log(i)
			arr.push(i);
        }
		//console.log(arr);
		console.log(pos.two.x + (2 * arr[0]+2) * gap);
		console.log(pos.two.x + (2 * arr[1]+2) * gap);
		console.log(pos.two.x + (2 * arr[2]+2) * gap);
		console.log(pos.two.x + (2 * arr[3]+2) * gap);
		
		ctx.moveTo(pos.two.x + (2 * arr[0]+1) * gap+gap/2,500+( -this.config.data[0].num * vh)-50);
		//console.log(500+( -this.config.data[arr[0]+1].num * vh)-50);
		//console.log(500+( -this.config.data[arr[1]+1].num * vh)-50);
		//console.log(500+( -this.config.data[arr[2]+1].num * vh)-50);
		//console.log(500+( -this.config.data[arr[3]+1].num * vh)-50);
		for(var j = 0;j<arr.length;j++){
			ctx.lineTo(pos.two.x + (2 * arr[j]+2)*gap+(gap+gap/2),500+( -this.config.data[arr[j]+1].num * vh)-50);
			//console.log(ctx.lineTo(pos.two.x + (2 * arr[j]+2)*gap+gap+40,500+( -this.config.data[arr[j]+1].num * vh)-50))
			ctx.lineWidth = 2;
			ctx.strokeStyle = 'pink'; 
			ctx.stroke();	
		}
    },
	 
    // 画柱状图的方法
    drawcolumn: function() {
        var ctx = this.ctx;
        var pos = this.pos;
        // 画背景
        this.drawBg();
        // 画背景上的虚线
        this.drawBgLine();

        // 要画的数量
        var nums = this.config.data.length;

        // 下面柱状的间隙  宽度
        var gap = Math.floor(pos.width / (nums * 2));

        // 最大的数据在我的这个最大的高度下的一个比例
        var dataMax = this.getDataMax();

        // 不要取整  1px的高度  =  多少数据
        var vh = pos.height / dataMax;


        for (var i = 0; i < nums; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.config.data[i].color;
            ctx.rect(pos.two.x + (2 * i + 1) * gap, pos.two.y, gap, -this.config.data[i].num * vh);
            ctx.fill();
        }

    },
	// 画饼图的方法
    drawpie: function() {
    },
}