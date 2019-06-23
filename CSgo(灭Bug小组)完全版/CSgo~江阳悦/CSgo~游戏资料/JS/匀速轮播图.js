// 封装需求
// 






// 封装匀速动画
function animationMove(ele, target) {
    //清除之前的定时器
    clearInterval(ele.timeID) ;
    //开始本次移动
    ele.timeID = setInterval(function () {
        // 获取元素现在的位置
        var current = ele.offsetLeft ;
        // 判断移动方向 
        var isLeft = current <=  target ? true : false ;
        // 设定一定距离
        isLeft ? current += 10 : current -= 10 ;
        //给元素位置赋值
        ele.style.left = current +'px' ;
        //边界检测
        if (isLeft ?  current >= target : current <= target ) {
            //清除定时器
            clearInterval(ele.timeID) ;
            //复位位置
            ele.style.left = target + 'px' ;
        }
    } , 1)
}
function animationSlow(ele,target) {
    //清除之前的定时器
    clearInterval(ele.timeID) ;
    //开始本次移动
    ele.timeID = setInterval(function() {
        //获取现在位置
        var current =ele.offsetLeft ;
        // 计算每次要移动的距离
        var step = ( target - current ) / 10 ;
        // 判断当从左往右 像上取整  从右往左 想下取整
        step > 0 ? Math.ceil(step) : Math.ceil(step);
        //计算现在的位置的值 并赋值
        current += step ;
        ele.style.left = current + 'px' ;
        //边界检车
        if (target == current) {
            clearInterval(ele.timeID)
        }
    } ,20) 
}

