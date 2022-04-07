(function ($) {

    $.addBall = function (t, options) {
        var p = $.extend({
            rate: 0,                      // 百分比（单位 %）
            radius: false,                // 半径（默认为false，表示自动适应父元素大小变化，设置半径为大于0的数字后不能自动适应父元素大小变化）
            smaller: false,               // 大小约束（width:根据宽，height:根据高）
            foregroundColor: '#1BB236',   // 前景色
            backgroundColor: '#BABABA',   // 背景色
            fontColor: '#FFFFFF',         // 显示文字颜色
            speed: 1200                   // 动画快慢（单位 ms）
        }, options);
        /**
         * 函数集合
         */
        var b = {
            /**
             * 插件执行函数入口
             */
            work: function () {
                b.init();
                b.getRadius();
                b.createBall();
                b.createBallShadow();
                b.createRateText();
                b.createForeground();
                b.createBallTop();
                b.initData();
            },
            init: function () {
                p.selector = $(t).attr('id');
                p.ballShadowID = p.selector + 'BallChartShadow';
                p.foregroundID = p.selector + 'BallChartForeground';
                p.ballTopID = p.selector + 'BallChartTop';
                p.rateTextID = p.selector + 'BallChartRateText';
            },
            getRadius: function () {
                var r = 0;
                if (p.radius && !(isNaN(p.radius) && p.radius > 0)) {
                    r = p.radius;
                } else {
                    p.width = $(t).parent().width();
                    p.height = $(t).parent().height();
                    if (p.width && p.height) {
                        if (parseInt(p.width) > parseInt(p.height)) {
                            p.smaller = 'height';
                            r = parseInt(p.height) / 2;
                        } else {
                            p.smaller = 'width';
                            r = parseInt(p.width) / 2;
                        }
                    } else {
                        r = 38;
                    }
                }
                p.diameter = r * 2;
                p.topHeight = r / 4;
            },
            createBall: function () {
                $('div', $(t)).finish();
                $(t).empty().addClass('BallChart')
                    .css({'z-index': 10, 'width': p.diameter, 'height': p.diameter, 'position': 'relative',
                        'border': '2px ' + p.backgroundColor + ' solid', 'overflow': 'hidden',
                        'background': p.backgroundColor, 'border-radius': '50%'});
                if (p.smaller) {
                    var left = Math.max(0, $(t).parent().width() - p.diameter) / 2;
                    var top = Math.max(0, $(t).parent().height() - p.diameter) / 2;
                    if (p.smaller == 'width') {
                        $(t).css({left: 0, 'top': top});
                    } else {
                        $(t).css({left: left, 'top': 0});
                    }
                }
            },
            createBallShadow: function () {
                if ($('#' + p.ballShadowID).length) {
                    $('#' + p.ballShadowID).remove();
                }
                var div = $('<div/>').addClass('BallChartShadow').attr('id', p.ballShadowID);
                div.css({'z-index': 9, 'width': p.diameter + 2, 'height': p.diameter + 2,
                    'position': 'absolute', top: 0, left: 0,
                    'border-radius': '50%', 'box-shadow': 'inset 0 0 ' + (p.diameter / 2) + 'px rgba(0, 0, 0, .3)'});
                $('#' + p.selector).append(div);
            },
            createForeground: function () {
                if ($('#' + p.foregroundID).length) {
                    $('#' + p.foregroundID).remove();
                }
                var foreground = $('<div/>').attr('id', p.foregroundID);
                foreground.css({'z-index': 4, 'width': p.diameter, 'height': 0,
                    'position': 'absolute', bottom: 0, left: 0, 'background': p.foregroundColor});
                $('#' + p.selector).append(foreground);
            },
            createBallTop: function () {
                if ($('#' + p.ballTopID).length) {
                    $('#' + p.ballTopID).remove();
                }
                var div = $('<div/>').addClass('BallChartTop').attr('id', p.ballTopID);
                div.css({'z-index': 6, 'width': p.diameter, 'height': 0 - p.topHeight, 'background': p.foregroundColor,
                    'position': 'absolute', 'bottom': (p.diameter - p.topHeight / 2), left: 0,
                    'border-radius': '50%', 'box-shadow': 'inset 0 5px ' + p.topHeight + 'px rgba(255, 255, 255, .3)'});
                $('#' + p.selector).append(div);
            },
            createRateText: function () {
                if ($('#' + p.rateTextID).length) {
                    $('#' + p.rateTextID).remove();
                }
                var div = $('<div/>').addClass('BallChartRateText').attr('id', p.rateTextID);
                var fontSize = p.fontSize ? p.fontSize : p.diameter / 6;
                div.css({'z-index': 10, 'width': p.diameter, 'height': p.diameter,
                    'position': 'absolute', top: 0, left: 0,
                    'line-height': p.diameter + 'px',
                    'font-size': fontSize / 12 + 'em', 'color': p.fontColor, 'text-align': 'center'});
                $('#' + p.selector).append(div);
            },
            initData: function () {
                $('#' + p.rateTextID).html(p.rate + '%');
                var rate = parseFloat(p.rate) / 100;
                var height = p.diameter * rate;
                $('#' + p.foregroundID).finish().css('height', 0).animate({
                    height: height
                }, p.speed);
                b.initTop();
            },
            initTop: function () {
                var rate = parseFloat(p.rate) / 100;
                var width = 2 * (Math.sqrt(1 - Math.pow(2 * Math.abs(rate - 0.5), 2)) * (p.diameter / 2)) - 2;
                var height = ((0.5 - Math.abs(rate - 0.5)) * 2) * p.topHeight;
//                if (height < 1) {
//                    height = 0
//                } else if (height < 4) {
//                    height = 4;
//                }
                var left = (p.diameter / 2) - width / 2;
                var bottom = p.diameter * rate - height / 2;
                $('#' + p.ballTopID).finish().stop()
                    .css({'width': 0, 'height': 0, 'bottom': bottom + height / 2, 'left': (p.diameter / 2)}).delay(p.speed * 4 / 5)
                    .animate({
                        'width': width,
                        'height': height,
                        'bottom': bottom,
                        'left': left
                    }, p.speed);
            },
            resize: function () {
                $('div', $(t)).finish();
                b.getRadius();
                $(t).css({'width': p.diameter, 'height': p.diameter});
                if (p.smaller) {
                    var left = Math.max(0, $(t).parent().width() - p.diameter) / 2;
                    var top = Math.max(0, $(t).parent().height() - p.diameter) / 2;
                    if (p.smaller == 'width') {
                        $(t).css({left: 0, 'top': top});
                    } else {
                        $(t).css({left: left, 'top': 0});
                    }
                }
                $('#' + p.ballShadowID).css({'width': p.diameter, 'height': p.diameter,
                    'box-shadow': 'inset 0 0 ' + (p.diameter / 2) + 'px rgba(0, 0, 0, .3)'});
                $('#' + p.foregroundID).css({'width': p.diameter, 'height': 0});
                $('#' + p.ballTopID).css({'width': p.diameter, 'height': 0 - p.topHeight,
                    'box-shadow': 'inset 0 5px ' + p.topHeight + 'px rgba(255, 255, 255, .45)'});
                var fontSize = p.fontSize ? p.fontSize : p.diameter / 6;
                $('#' + p.rateTextID).css({'width': p.diameter, 'height': p.diameter,
                    'line-height': p.diameter + 'px', 'font-size': fontSize / 12 + 'em'});
                b.initData();
            }
        };
        b.work();
        $(t).parent().resize(function () {
            setTimeout(function () {
                b.resize();
            }, 100);
        });
        t.ball = b;
        t.p = p;
        return t;
    };
    var docLoaded = false;
    $(document).ready(function () {
        docLoaded = true;
    });
    $.fn.BallChart = function (p) {
        return this.each(function () {
            if (!docLoaded) {
                $(this).hide();
                var t = this;
                $(document).ready(function () {
                    $.addBall(t, p);
                });
            } else {
                $.addBall(this, p);
            }
        });
    };
    $.fn.BallChartRefresh = function (p) {
        return this.each(function () {
            if (p) {
                this.p.rate = p.rate;
            } else {
                this.p.rate = 0;
            }
            if (this.ball) this.ball.initData();
        });
    };
    $.fn.BallChartOptions = function (p) {
        return this.each(function () {
            if (this.ball) $.extend(this.p, p);
        });
    };

})(jQuery);