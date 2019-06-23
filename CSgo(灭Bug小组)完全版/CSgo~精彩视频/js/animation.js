//获取元素的id
function id(id) {
    return document.getElementById(id);
}

/**匀速动画封装
 * @param: ele:元素
 * @param: target:目标位置
 */
function animationMove(ele, target) {
    //1.清除之前的定时器
    clearInterval(ele.timeId);
    //2.添加定时器
    ele.timeId = setInterval(function () {
        var current = ele.offsetLeft;
        var step = 10;
        step = target > current ? step : -step;
        current += step;
        //3.判断元素是否快到达目标位置
        if (Math.abs(target - current) > Math.abs(step)) {
            //还没到
            ele.style.left = current + 'px';
        } else {
            //快到了停止定时器
            clearInterval(ele.timeId);
            ele.style.left = target + 'px';
        }

    }, 10);
};

/*获取属性值封装
    @parma： ele：元素
    @parma: attribute:属性名(带字符串)
    @return: 属性值 
 */
function getStyle(ele, attribute) {
    return window.getComputedStyle ? window.getComputedStyle(ele, null)[attribute] : ele.currentStyle[attribute]; //字符串语法取attribute变量中对应字符串属性值
}



/**缓动动画封装(属性不限)
 * @param: ele:元素
 * @param: target:目标位置
 * @param: attribute:属性名
 */

// function animationSlow(ele, target, attribute) {
//     //1.清除之前的定时器
//     clearInterval(ele.timeId);
//     //2.添加定时器
//     ele.timeId = setInterval(function () {
//         var current = parseInt(getStyle(ele, attribute)); //返回属性值---转number类型
//         var step = (target - current) / 10;   //有小数
//         step = step > 0 ? Math.ceil(step) : Math.floor(step);
//         current += step;
//         ele.style[attribute] = current + 'px';      //对象['属性']=属性值
//         if (target == current) {
//             clearInterval(ele.timeId);
//         }
//     }, 20)
// }



/**缓动动画封装(属性数量不限)
* @param: ele:元素
* @param: attrs:属性对象
* @param: fn:回调函数: 如果传了代码，动画结束之后帮你执行这段代码。没传不执行
*/

function animate(ele, attrs, fn) {
    //1.清除之前定时器
    clearInterval(ele.timeId);
    //2.添加定时器
    ele.timeId = setInterval(function () {
        //3.开关思想
        var flag = true;
        //遍历对象        
        for (var key in attrs) {          //key = attribute
            var target = attrs[key];
            if (key == 'zIndex' || key == 'backgroundColor') {      //3.1 层级和背景颜色
                ele.style[key] = target;
            } else if (key == 'opacity') {                          //3.2 透明度
                var current = parseFloat(getStyle(ele, key)) * 100;
                target*=100;  //出错点
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                ele.style[key] = current / 100;
                if (current != target) {           
                    flag = false;
                }
            } else {                                                //3.3 其他属性
                var current = parseInt(getStyle(ele, key));
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                ele.style[key] = current + 'px';
                if (target != current) {
                    flag = false;
                }
            };
        }
        if(flag){                            //3.4回调函数,所有动画都执行完才执行
            clearInterval(ele.timeId);
            if(fn){
                fn();
            }
        }
    }, 20);
};