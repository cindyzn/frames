function Clock(opt) {
    this.config = {
        target: '',
        width: 600,
        height: 500
    };

    for (var key in this.config) {
        this.config[key] = opt[key];
    };

    this.cvs = document.getElementById(this.config.target);  // 画布
    // 设置宽与高
    this.cvs.width = this.config.width;
    this.cvs.height = this.config.height;
    this.ctx = this.cvs.getContext('2d');                   // 画笔

    this.init();
}

Clock.prototype = {
    init: function() {
        this.move();
    },
    // 画表盘
    drawBlock: function() {
        var ctx = this.ctx;

        ctx.save();
        ctx.beginPath();
        // 平移
        ctx.translate(this.config.width / 2, this.config.height / 2);

        ctx.strokeStyle = '#999';
        ctx.fillStyle = '#eee';
        ctx.lineWidth = 5;
        // 求一下半径
        var r = this.config.width > this.config.height ? this.config.height / 2 - 10 : this.config.width / 2 - 10;
        this.r = r;
        ctx.arc(0, 0, r, 0, 2 * Math.PI);

        ctx.stroke();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(0, 0, 10, 0, 2 * Math.PI);
        ctx.fill();
    },

    // 画刻度
    drawKd: function() {
        var ctx = this.ctx;
        // 先做一个平移的操作
        ctx.beginPath();
        for (var i = 0; i < 60; i++) {
            ctx.beginPath();
            ctx.fillStyle = '#000';

            if ( i % 5 == 0) {
                ctx.rect(-2, -(this.r - 2), 4, 14);
            } else {
                ctx.rect(-2, -(this.r - 2), 4, 8);
            }
            ctx.fill();
            ctx.rotate(6 * Math.PI / 180);
        }
    },

    // 画文字
    drawText: function() {
        var ctx = this.ctx;

        ctx.beginPath();
        ctx.font = '28px 微软雅黑';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';


        for (var i = 1; i <= 12; i++) {
            var x = Math.sin(30 * Math.PI / 180 * i) * (this.r - 30);
            var y = Math.cos(30 * Math.PI / 180 * i) * (this.r - 30);
            ctx.fillText(i, x, -y);
        }
    },

    // 画指针
    drawZz: function(code, time) {
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();

        var h = time.getHours() % 12;
        var m = time.getMinutes();
        var s = time.getSeconds();

        ctx.rotate(- 90 * Math.PI / 180);

        switch(code) {
            case 'h':
                ctx.rotate(h * 30 * Math.PI / 180 + m * 0.5 * Math.PI / 180);
                ctx.rect(-20, -3, this.r / 2, 6);
                ctx.fill();
                break;
            case 'm':
                ctx.rotate(m * 6 * Math.PI / 180 + s * 0.1 * Math.PI / 180);
                ctx.rect(-30, -2, this.r / 1.4, 4);
                ctx.fill();
                break;
            case 's':
                ctx.rotate(s * 6 * Math.PI / 180);
                ctx.fillStyle = 'red';
                ctx.rect(-40, -1, this.r / 1.1, 2);
                ctx.fill();
                break;
        }

        ctx.restore();
    },

    // 动画
    move: function() {
        var ctx = this.ctx;

        var time = new Date();

        this.drawBlock();
        this.drawKd();
        this.drawText();

        this.drawZz('h', time);
        this.drawZz('m', time);
        this.drawZz('s', time);

        ctx.restore();


        var that = this;
        setInterval(function() {
            ctx.clearRect(0, 0, that.config.width, that.config.height);
            that.move();
        }, 1000);
    }
}