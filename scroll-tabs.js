/**
 * 头部tab栏，用来切换页面,可高度定制
 * Created by Lee Sure on 2017/2/8.
 */
//传入的tab的text内容数组
var divTextList;
//需要创建的div数组
var divTabArray;
//需要创建的page数组
var divPageArray;
//窗口高度
var windowHeight=window.screen.height;
//需要添加tab的父node
var mNode;
//下划线颜色
var indicatorColor="blue";
//下划线高度
var indicatorHeight=window.screen.height/640;
//tab高度
var tabHeight=window.screen.height/10;
//tab颜色
var tabColor="red";
//是否有下划线
var bl=true;
//tab离窗口的margin-top值
var marginTop;
//当前页面
var currentPage=0;
/**
 * 初始化tab参数 可覆盖默认值
 * @param mTabHeight         tab高度
 * @param mTabColor          tab颜色
 * @param mIndicatorHeight   下划线高度
 * @param mIndicatorColor    下划线颜色
 * @param mBl                是否有下划线
 */
function initTabs(mTabHeight,mTabColor,mIndicatorHeight,mIndicatorColor,mBl) {
    indicatorColor=mIndicatorColor;
    indicatorHeight=mIndicatorHeight;
    tabHeight=mTabHeight;
    tabColor=mTabColor;
    bl=mBl;
}
/**
 * 动态创建tab
 * @param node 传入的父node
 * @param list 内容数组
 */
function createTabs(node,list) {
    divTextList = list;
    mNode=node;
    //获取tab的数量
    var size = divTextList.length;
    divTabArray=new Array;
    for (var i = 0; i < size; i++) {
        //循环放置tab的文本内容
        var tab_t='tab'+i;
        divTabArray[i]=$("<div class='tab-txt'></div>").text(divTextList[i]);
        divTabArray[i].attr('id',tab_t);
    }
    //在传入的node基础上添加这些div
    node.append(divTabArray);
    //定义每个div的宽度
    var width=100/size+"%";
    var height=tabHeight;
    //根据id循环设置每个div的css参数
    for(var m=0;m<size;m++){
        var tab_m="#tab"+m;
        var margin_left=(m==0?0:100/size)+"%";
        //默认css属性
        $(tab_m).css({"background-color":tabColor,"position":"absolute","height":height,
            "text-align":"center","width":width,"margin-left":margin_left});
    }
    //tab离窗口的margin-top值
    marginTop=Math.abs(parseInt($(".tab-txt").css("margin-top")));
    var mHeight=indicatorHeight;
    createPages(size);
    if(bl){
        createTabIndicator(node,mHeight);
    }
}

/**
 * 需要添加的页面
 * @param size 页面数量
 */
function createPages(size) {
    divPageArray=new Array;
    var pager="<div class='pager'></div>";
    mNode.append(pager);
    var $viewPager=$(".pager");
    for (var i = 0; i < size; i++) {
        //循环放置tab的文本内容
        var page_t='page'+i;
        divTabArray[i]=$("<div class='page'></div>").text(i+"");
        divTabArray[i].attr('id',page_t);
    }
    $viewPager.append(divTabArray);
    //定义每个div的宽度
    var width="100%";
    var height=windowHeight-tabHeight-indicatorHeight;
    //根据id循环设置每个div的css参数
    for(var m=0;m<size;m++){
        var page_m="#page"+m;
        var margin_left=100*m+"%";
        //默认css属性
        var h=tabHeight+indicatorHeight+marginTop;
        $(page_m).css("margin-top",h);
        $(page_m).css({"background-color":"green","position":"absolute","height":height,
            "text-align":"center","width":width,"margin-left":margin_left});
    }
}

/**
 * 给tab添加下划线
 * @param node 父node
 * @param mHeight indicator的高度
 */
function createTabIndicator(node,mHeight) {
    var size=divTextList.length;
    var width=100/size+"%";
    var height=tabHeight+marginTop;
    node.append("<div class='div-tab-indicator'></div>");
    node.append("<div class='tab-indicator'></div>");
    //默认css属性
    $(".div-tab-indicator").css({"height":mHeight,"width":"100%","background-color":tabColor,"margin-top":height,
        "position":"absolute"});
    $(".tab-indicator").css({"height":mHeight,"width":width,"background-color":indicatorColor,"margin-top":height,
        "position":"absolute"});
}

/**
 * 设置tab是否包含下划线
 * @param bl
 */
function setIndicator(bl) {
    $(".tab-indicator").css("display",bl?"block":"none");
}

/**
 * 设置tab的css属性，可以自定义
 * @param json
 */
function setTabCss(json) {
    var size=divTextList.length;
    var width=100/size+"%";
    for(var m=0;m<size;m++){
        var tab_m="#tab"+m;
        var margin_left=100/size*m+"%";
        //默认css属性
        var $tab_m=$(tab_m);
        $tab_m.css(json);
        //一些重要参数覆写，保证布局不错乱
        $tab_m.css({"position":"absolute", "width":width,"margin-left":margin_left});
    }
    //一些重要参数覆写，保证布局不错乱
    var $div_tab_indicator=$(".div-tab-indicator");
    var $tab_indicator=$(".tab-indicator");
    //获取tab的高度
    var $tab_txt=$(".tab-txt");
    var height=$tab_txt.css("height");
    //获取tab的颜色
    var color=$tab_txt.css("background-color");
    $div_tab_indicator.css("background-color",color);
    $div_tab_indicator.css({"position":"absolute", "width":"100%","margin-top":height});
    $tab_indicator.css({"position":"absolute", "width":width,"margin-top":height});
}

/**
 * 设置tab-indicator的color，可以自定义
 * @param mColor
 */
function setTabIndicatorColor(mColor) {
    //默认css属性
    var $tab_indicator=$(".tab-indicator");
    $tab_indicator.css("background-color",mColor);
}

/**
 * 设置tab-indicator的height，可以自定义
 * @param mHeight
 */
function setTabIndicatorHeight(mHeight) {
    //默认css属性
    var $tab_indicator=$(".tab-indicator");
    var $div_tab_indicator=$(".div-tab-indicator");
    $tab_indicator.css("height",mHeight);
    $div_tab_indicator.css("height",mHeight);
}

function getCurrentPage() {
    return currentPage;
}
/**
 * 添加点击事件
 */
$(document).ready(function(){
    $(".tab-txt").click(function () {
        //首先添加下划线滑动效果
        var id=this.id;
        var id_num=id.substring(3,4);
        // alert(id_num);
        var size=divTextList.length;
        var width=100/size*id_num+"%";
        $(".tab-indicator").animate({left:width});
        //接着添加page的页面转换
        // var page_t='#page'+id_num;
        // var $page_t=$(page_t);
        var $viewPager=$(".pager");
        var pages=currentPage-id_num;
        $viewPager.animate({marginLeft:(pages<0?("-=100%"):("+=100%"))});
    });
});