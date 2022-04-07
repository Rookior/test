//1.封装时将js写在一个自执行的函数里面
(function(){
    //2.创建一个构造函数
    var verifyCode = function(options){
       //用$.extend({})定义默认值
       this.options = $.extend({
         dom:'canvas',
         width:138,
         height:36 
       },options);
       this.num = [];
	   this.code = this.options.num.split("");
       //4.执行初始化函数
       this.init()
    };
    //5.定义初始化函数
    verifyCode.prototype.init = function(){
        this.drawVerifyCode();
    };
    verifyCode.prototype.drawVerifyCode = function(){
        
        var canvas_width = this.options.width;
    
        var canvas_height = this.options.height;

        var canvas = document.getElementById(this.options.dom);//获取到canvas的对象，演员

        var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台

        canvas.width = canvas_width;

        canvas.height = canvas_height;

        var sCode = "A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,U,V,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";

        var aCode = sCode.split(",");

        var aLength = aCode.length;//获取到数组的长度

        for (var i = 0; i <= 3; i++) {

            var j = Math.floor(Math.random() * aLength);//获取到随机的索引值

            var deg = Math.random() * 15 * Math.PI / 180;//产生0~30之间的随机弧度

            var txt = this.code[i];//得到随机的一个内容

            //num[i] = txt.toLowerCase(); toUpperCase()

            this.num[i] = txt;

            var x = 20 + i * 30;//文字在canvas上的x坐标

            var y = 20 + Math.random() * 8;//文字在canvas上的y坐标

            context.font = "bold 23px 微软雅黑";

            context.translate(x, y);

            context.rotate(deg);

            context.fillStyle = this.drawVerifyCodeRandomColor();

            context.fillText(txt, 0, 0);

            context.rotate(-deg);

            context.translate(-x, -y);

        }

        for (var i = 0; i <= 5; i++) {//验证码上显示线条

            context.strokeStyle = this.drawVerifyCodeRandomColor();

            context.beginPath();

            context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);

            context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);

            context.stroke();

        }

        for (var i = 0; i <= 30; i++) {//验证码上显示小点

            context.strokeStyle = this.drawVerifyCodeRandomColor();

            context.beginPath();

            var x = Math.random() * canvas_width;

            var y = Math.random() * canvas_height;

            context.moveTo(x, y);

            context.lineTo(x + 1, y + 1);

            context.stroke();

        }
    }
    verifyCode.prototype.drawVerifyCodeRandomColor = function(){
        var r =Math.floor(Math.random() *256);
    
        var g =Math.floor(Math.random() *256);
        
        var b =Math.floor(Math.random() *256);
        
         return "rgb(" +r +"," +g +"," +b +")";
    }
    verifyCode.prototype.refreshDrawVerifyCode = function(){   
        this.drawVerifyCode();
    }
    verifyCode.prototype.verifyCodeResult = function(){
        alert(this.num.join().replace(/,/g,''))
    }
    //3.将函数暴露给外部
    window.verifyCode=verifyCode;
}()) 

