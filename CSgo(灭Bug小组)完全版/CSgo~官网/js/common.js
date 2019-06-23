/*
** Create by 徐伟鹏 on 2019/5/20
* 工具包封装：好处  便于维护/使用很方便,复用性高
* 本文件主要处理浏览器兼容性问题
* 获取元素常用方法
*/

/*
 * 1. 根据id获取元素
 * @param str  id字符串
 * @return {HTMLElement | null}  元素/null
 */
function my$ ( str ) {
    return document.getElementById(str);
}

/**
 * 2.获取元素文本内容兼容性封装
 * @param ele  元素
 * @return {*}   文本内容
 */
function getText ( ele ) {
    //能力检测
    if(ele.innerText == undefined){//获取不到，火狐42之前浏览器
        return ele.textContent;//直接获取textContent
    }else{//如果innerText可以使用（非IE8浏览器）
        return ele.innerText;
    }
}


/**
 * 3.设置元素文本内容兼容性封装
 * @param ele  元素
 * @param text  文本
 * @return {*}   无返回值
 */
function setText ( ele,text ) {
    //能力检测
    if(ele.innerText == undefined){//获取不到，火狐42之前浏览器
        ele.textContent = text;//直接获取textContent
    }else{//如果innerText可以使用（非IE8浏览器）
        ele.innerText = text;
    }
}


/**
 * 4.获取元素的上一个兄弟元素
 * @param ele 元素
 * @return 上一个元素
 */
function getPreviousElementSibling ( ele ) {
    if(ele.previousElementSibling){//只要previousElementSibling不是undeifined，条件成立
        return ele.previousElementSibling;//非IE8浏览器
    }else{
        var node = ele.previousSibling;//获取元素的上一个节点（注释 文本 null ）
        console.log ( node.nodeType );
        /*思路：如果上一个节点类型不是1，说明不是元素，就要继续往上找
        循环特点：（1）次数不固定
        （2）循环结束的条件固定：（2.1）node.nodeType == 1  || node == null
         while小括号，条件成立才会执行循环体： node.nodeType != 1 &&  node != null
         while(条件 true){
             node = node.previousSibling;
         }
         */
        while (node.nodeType != 1  &&  node != null){//如果能够找到上一个节点，并且上一个节点的类型不是1
            node = node.previousSibling;//继续寻找
        }
        return node;
    }
}

/**
 * 5.获取元素的下一个兄弟元素
 * @param ele 元素
 * @return 元素
 */
function getNextElementSibling ( ele ) {
    if(ele.nextElementSibling){//只要previousElementSibling不是undeifined，条件成立
        return ele.nextElementSibling;//非IE8浏览器
    }else{
        //IE8浏览器
        var node = ele.nextSibling;//上一个节点 文本  注释  元素  null
        /*while循环
        结束条件：可以找到节点，并且节点类型是1
         */
        while(node != null && node.nodeType != 1){//只要节点存在并且类型不是1，就说明一定不是元素节点，继续寻找
            node = node.nextSibling;//继续找上一个
        }
        //只要节点的类型是1，就结束寻找，返回找到的节点
        return node;
    }
}

/**
 * 6.获取第一个子元素
 * @param ele  父元素
 * @return {*} 第一个子元素
 */
function getfirstElementChild  ( ele ) {
    if(ele.firstElementChild){
        return ele.firstElementChild;//非IE8浏览器
    }else{
        //IE8 需要通过节点来获取
        var node = ele.firstChild;
        while (node.nodeType != 1 && node != null){
            node = node.nextSibling;
        }
        return node;
    }
}

/**
 * 7.获取元素的最后一个子元素
 * @param ele 元素
 * @return {*} 最后子元素
 */
function getlastElementChild ( ele ) {
    if(ele.lastElementChild){//非IE8
        return ele.lastElementChild;
    }else{//IE
        var node = ele.lastChild;//获取最后一个节点
        while (node.nodeType != 1 && node != null){
            node = node.previousSibling;//找上一个节点
        }
        return node;
    }
}



/* 8. 匀速动画封装
 * @param: ele:元素
 * @param: target:目标位置
 */
function animationMove(ele, target) {
    //1.先清除之前的定时器，以本次为准
    clearInterval(ele.timeID);
    //2.开始本次移动
    ele.timeID = setInterval(function () {
        //2.1 获取元素当前位置
        var currentLeft = ele.offsetTop;
        //2.2 开始移动
        var isLeft = currentLeft <= target ? true : false;
        isLeft ? currentLeft += 15 : currentLeft -= 15;
        ele.style.top = currentLeft + 'px';
        //2.3 边界检测
        if (isLeft ? currentLeft >= target : currentLeft <= target) {
            //(1)停止定时器
            clearInterval(ele.timeID);
            //(2)元素复位
            ele.style.top = target + 'px';
        };
    }, 20);
};




/* 9. 缓动动画封装
        * @param {type} ele:要移动的元素
        * @param {type} attrs:要移动的属性对象
        * @param {type} fn:回调函数   传了：动画结束之后就帮你执行  没传：不执行
        * @return: 
        */
function animationSlow(ele, attrs, fn) {
    //1.清除之前的定时器，以本次移动为准
    clearInterval(ele.timeID);
    //2.开始本次移动
    ele.timeID = setInterval(function () {
        /*开关思想：当某种操作结果只有两种情况，可以使用布尔类型表示两种情况
        1.提出假设 var isAllOk = true;
        2.验证假设
        3.根据开关结果实现需求 
         */
        //一：提出假设
        var isAllOk = true;
        //二：验证假设
        for (var key in attrs) {
            // console.log(key); //属性名
            // console.log(attrs[key]); //属性值
            //分别声明两个局部变量表示属性名：属性值（作用：不用修改原先的形参）
            var attribute = key;
            var target = attrs[key];

            //如果是层级属性，则直接赋值，无需动画
            if (attribute == 'zIndex' || attribute == 'backgroundColor') {
                ele.style[key] = target;
            } else if (attribute == 'opacity') { //透明度单独写逻辑代码
                //2.1 获取元素当前位置
                //注意点：透明底是0-1小数，需要parseFloat取整
                var current = parseFloat(window.getComputedStyle(ele, null)[attribute]);
                current *= 100; //0.8 * 100 = 80
                target *= 100; //0.5*100 = 50
                //2.2 计算本次移动距离 = (目标位置 - 当前位置)/10
                var step = (target - current) / 10;
                //取整： step>0 从左往右： 向上取整   step<0:向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //2.3 开始移动
                current += step;
                ele.style[attribute] = current / 100; //缩小100
                //2.4 终点检测
                //开关思想：只要有任何属性没有到达终点，假设被推翻
                if (current != target) {
                    isAllOk = false;
                };
            } else {
                //2.1 获取元素当前位置
                //注意点： getComputedStyle获取的是string，需要转成number计算
                var current = parseInt(window.getComputedStyle(ele, null)[attribute]);
                //2.2 计算本次移动距离 = (目标位置 - 当前位置)/10
                var step = (target - current) / 10;
                //取整： step>0 从左往右： 向上取整   step<0:向下取整
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //2.3 开始移动
                current += step;
                ele.style[attribute] = current + 'px';
                //2.4 终点检测
                //开关思想：只要有任何属性没有到达终点，假设被推翻
                if (current != target) {
                    isAllOk = false;
                };
            }
        };
        //三：根据开关结果实现需求
        if (isAllOk) {
            clearInterval(ele.timeID);
            //如果用户传递了第三个参数，并且是函数。则执行这个函数，否则不执行
            if (typeof fn == 'function') {
                fn();
            }
        };
    }, 50);
};


 /*获取网页滚动出去的距离：浏览器兼容性封装
            能力检测 
        
        */

       function getPageScroll(){
        //逻辑或： 一真则真
        //运算： 找真。 只要左边的式子可以转为true，无条件返回左边式子的值。反之无条件返回右边式子的值。
        var x = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0
        var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

        // var x = 0;
        // var y = 0;
        // if(window.pageXOffset){//谷歌火狐
        //     x = window.pageXOffset;
        //     y = window.pageYOffset;
        // }else{//如果(window.pageXOffset无法获取，则使用另外两个属性获取
        //     if(document.documentElement.scrollLeft){
        //         x = document.documentElement.scrollLeft;
        //         y = document.documentElement.scrollTop;
        //     }else{
        //         x =  document.body.scrollLeft;
        //         y =  document.body.scrollTop;
        //     }
        // };
        return {
            scrollLeft:x,
            scrollTop:y
        };
    };

