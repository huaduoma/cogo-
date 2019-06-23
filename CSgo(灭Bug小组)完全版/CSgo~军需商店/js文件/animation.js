/**
* @description: 1.匀速动画封装
* @param {type}: ele:要移动的元素
* @param {type}: target:要移动的目标距离
* @return: 
*/
function animationMove(ele, target) {
    //1.清除之前的定时器以本次移动为准
    clearInterval(ele.timeID);
    //2.开始本次移动
    ele.timeID = setInterval(function () {
        //2.1 获取元素当前位置
        var currentLeft = ele.offsetLeft;
        //2.2 开始移动 true:从左往右 false：从右往左
        var isLeft = currentLeft < target ? true : false;
        isLeft ? currentLeft += 10 : currentLeft -= 10;
        ele.style.left = currentLeft + 'px';
        //2.3 边界检测
        if (isLeft ? currentLeft >= target : currentLeft <= target) {
            //(1)清除定时器
            clearInterval(ele.timeID);
            //(2)元素复位
            ele.style.left = target + 'px';
        }
    }, .5);
};


/**
     * @description: 2.缓动动画封装
     * @param {type} ele:要移动的元素
     * @param {type} target:要移动的目标位置
     * @return: 
     */
    function animationSlow(ele,target){
        //1.清除以前的定时器，以本次为准
        clearInterval(ele.timeID);
        //2.开始本次移动
        ele.timeID = setInterval(function(){
            //2.1 获取元素当前位置
             var currentLeft = ele.offsetLeft;
            //2.2 计算本次移动的距离 = (目标位置-当前位置)/10
            var step = (target - currentLeft)/10;
            //取整: 从左往右：向上取整  从右往左：向下取整 Math.floor(-0.9) = -1
            step =  step > 0 ? Math.ceil(step) : Math.floor(step);
            //2.3 开始移动
            currentLeft += step;
            ele.style.left = currentLeft + 'px';
            //2.4 终点检测
            // if(currentLeft == target){
            //     clearInterval(ele.timeID);
            // };
        },50);
    };