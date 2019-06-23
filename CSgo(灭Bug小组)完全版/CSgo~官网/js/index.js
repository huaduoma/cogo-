///// 自定义 JS

// 1. 单击btNavFr 按钮  (1)设置页面通栏 process_nav_box栏的 margin-top
//                 (2)设置middleBox 的top值  匀速动画   
//                     2.1     设置processNavBox --》display = none
//                      2.2          设置 navBox --》height = 114px

my$('btNavFr').onclick = function () {
    var isOk = window.getComputedStyle(fR, null).getPropertyValue('background-position-y');
    if (isOk == '-7px') {
        my$('navBox').style.overflow = 'hidden';
        // 缓动 动画
        animationSlow(my$('navBox'), {
            height: 114
        });
        my$('fR').style.backgroundPositionY = '0px';
    } else {
        animationSlow(my$('navBox'), {
            height: 332
        });
        my$('fR').style.backgroundPositionY = '-7px';
    }
}


// 2. 鼠标向上滚动出去     (1)则设置顶部通栏的
window.onscroll = function (e) {
    console.log();
    // if ($(window).scrollTop() == 0) {
       
    // }
    my$('navBox').style.overflow = 'hidden';
    my$('fR').style.backgroundPositionY = '0px';
    animationSlow(my$('navBox'), {
        height: 114
    });
}



// 3. 鼠标移入 csGo 显示 cgImg  
//    鼠标移入 wanMei 显示 txzImg
my$('csGo').onmouseover = function () {
    my$('cgImg').style.display = 'block';
}
my$('wanMei').onmouseover = function () {
    my$('txzImg').style.display = 'block';
}
my$('tab_Stem').onmouseover = function () {
    my$('notes_Stem').style.display = 'block';
}

// 4. 鼠标移出 csGo 隐藏 cgImg  
//    鼠标移出 wanMei 隐藏 txzImg
my$('csGo').onmouseout = function () {
    my$('cgImg').style.display = 'none';
}
my$('wanMei').onmouseout = function () {
    my$('txzImg').style.display = 'none';
}
my$('tab_Stem').onmouseout = function () {
    my$('notes_Stem').style.display = 'none';
}



// ***  页面右侧固定定位 

$('.lnk-close').click(function () {
    $('.csgo-side-float').hide('');
})
// **  主体  第2部分  点击切换
$('#panelTab').children().on({
    click: function (e) {

        $(e.target).addClass('active').siblings().removeClass();
        if ($(e.target).index() == 0) {
            $('#mlistA').css('display', 'block')
            $('#mlistB').css('display', 'none')
            $('#mlistC').css('display', 'none')
        } else if ($(e.target).index() == 1) {
            $('#mlistB').css('display', 'block')
            $('#mlistA').css('display', 'none')
            $('#mlistC').css('display', 'none')
        } else if ($(e.target).index() == 2) {
            $('#mlistC').css('display', 'block')
            $('#mlistA').css('display', 'none')
            $('#mlistB').css('display', 'none')
        }
    },
})





//// ******** 主体 第3部分的轮播图
// 1. 获取元素 
var box = my$('box'); // 轮播图最外层的盒子
var screen = box.children[0]; // 轮播图盒子
var ul = screen.children[0]; // 图片列表
var arrLeft = my$('left'); // 上一页
var arrRight = my$('right'); // 下一页

// 2. 动态 克隆ul 第一个子元素  并添加到ul中
var firstLi = ul.firstElementChild;
var newLi = firstLi.cloneNode(true);
ul.appendChild(newLi);

// 4. 鼠标移入box
box.onmouseover = function () {
    // 4.1 清除自动播放
    clearInterval(timeIdd);
}

// 5. 鼠标移出box 
box.onmouseout = function () {
    // 5.1 重新开启自动播放
    timeIdd = setInterval(function () {
        arrRight.click();
    }, 3000)
}

// 6. 鼠标单击下一页
var index = 0; // 声明变量保存当前图片的下标

var flag = true; // 设置开关
arrRight.onclick = function () {
    if (flag) {
        flag = false;
        // 1.1 如果是最后一张图片  (1)则位置设为第一张图片  (2)index = 0;
        if (index == ul.children.length - 1) {
            ul.style.left = '0px';
            index = 0;
        }
        // 2. 下一页
        index++;
        // 3. 开始移动
        animationSlow(ul, {
            left: -screen.offsetWidth * index
        }, function () {
            flag = true
        });
    }

}
// 7. 鼠标单击上一页
arrLeft.onclick = function () {

    if (flag) {
        flag = false;
        // 1.1 如果是第一张图片  (1)则位置设为最后一张图片  (2)index值为最大;
        if (index == 0) {
            ul.style.left = -(ul.children.length - 1) * screen.offsetWidth + 'px';
            index = ul.children.length - 1;
        }
        // 2. 下一页
        index--;
        console.log(index);

        // 3. 开始移动
        animationSlow(ul, {
            left: -screen.offsetWidth * index
        }, function () {
            flag = true;
        });
    }
}

// 9。 自动轮播
var timeIdd = setInterval(function () {
    arrRight.click();
}, 3000);






// *** 主体  第5部分  左侧点击切换

$('#module_Right').children().on('click', function (e) {

    $(e.target).addClass('active').siblings().removeClass();
    if ($(e.target).index() == 0) {
        $('#m_List_A').css('display', 'block')
        $('#m_List_B').css('display', 'none')
        $('#m_List_C').css('display', 'none')
        $('#m_List_D').css('display', 'none')
    } else if ($(e.target).index() == 1) {
        $('#m_List_B').css('display', 'block')
        $('#m_List_A').css('display', 'none')
        $('#m_List_C').css('display', 'none')
        $('#m_List_D').css('display', 'none')
    } else if ($(e.target).index() == 2) {
        $('#m_List_C').css('display', 'block')
        $('#m_List_A').css('display', 'none')
        $('#m_List_B').css('display', 'none')
        $('#m_List_D').css('display', 'none')
    } else if ($(e.target).index() == 3) {
        $('#m_List_D').css('display', 'block')
        $('#m_List_A').css('display', 'none')
        $('#m_List_B').css('display', 'none')
        $('#m_List_C').css('display', 'none')
    }
})

// *** 主体  第5部分  右侧点击切换

$('#module_Top').children().on('click', function (e) {
    $(e.target).addClass('active').siblings().removeClass();
    if ($(e.target).index() == 0) {
        $('#m_List__A').css('display', 'block')
        $('#m_List__B').css('display', 'none')
        $('#m_List__C').css('display', 'none')
    } else if ($(e.target).index() == 1) {
        $('#m_List__B').css('display', 'block')
        $('#m_List__A').css('display', 'none')
        $('#m_List__C').css('display', 'none')
    } else if ($(e.target).index() == 2) {
        $('#m_List__C').css('display', 'block')
        $('#m_List__A').css('display', 'none')
        $('#m_List__B').css('display', 'none')
    }
})