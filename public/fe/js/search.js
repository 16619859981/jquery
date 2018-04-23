//页面载入之后，加载搜索关键字列表
//在点击搜索按钮的时候，在输入框中的信息如果是空那么提示，不为空就添加到历史记录中，跳转

//在关键字列表中点击某一个关键字，d会跳转到搜索结果页面
//点击删除按钮，会把关键字从历史记录中删除，b并重新渲染到关键字列表到页面
//点击清空按钮。清空历史记录。
$(function(){
    //载入的时候。显示历史记录
    showHistoryList();
    //点击搜索按钮的时候，判断，空提示，不空添加到历史记录，渲染到页面
    $('.btn').on('click',function(){
        //获取对应的input的内容
        var inputMsg = $('input').val();
        if(!inputMsg.trim()){
            //mui的弹窗
            mui.alert("请输入查询内容！！")
        } else {
            //调用函数
            setHistoryList(inputMsg);
            showHistoryList();
        }
        //点击跳转到对应的商品列表
        location.href = "./searchList.html?kwd="+inputMsg;
        //清空输入框
        $('input').val("");
    });
    //点击关键字就跳转到搜索页面
    $(".hh").on("click",'.font',function(){
        //获取对应文本框的内容以便于发送给后台
        var text = $(this).text();
        // console.log(text);
        //传送数据
        location.href = "./searchList.html?kwd="+text;
    })
    //点击删除按钮，删除历史记录，页面重新渲染
    $('.hh').on('click','.del',function(){
        var text  = $(this).siblings().text();
        delHistoryList(text);
        showHistoryList();
    })
    //清空按钮
    $('.clear').on('click',function(){
        clearHistoryList();
        showHistoryList();
    })


})

//获取历史记录数据  返回数组或者对象

var getHistoryList = function() {
    return JSON.parse(window.localStorage.getItem('History')||'[]');
//此时返回的是一个数组
}

//测试
// console.log(getHistoryList());

//设置历史记录数据
var setHistoryList = function(kwd){

    //先获取历史记录。遍历，去重。push。然后重新渲染历史记录和页面。
    var HistoryData = getHistoryList();
    HistoryData.forEach(function(item,index){
        //去重
        if(item==kwd){
            //那么就splice
            HistoryData.splice(index,1);
        }
    })
    HistoryData.push(kwd);
    //把数组转成字符串
    window.localStorage.setItem('History', JSON.stringify(HistoryData));

}
//测试
// setHistoryList('nike');
// setHistoryList('lining');
// setHistoryList('aaaa');

//删除历史记录数据
var delHistoryList = function(kwd) {
    //获取历史记录
    var HistoryData = getHistoryList();
    //遍历。删掉对应的数据
    HistoryData.forEach(function(item,index){
        if(kwd==item) {
            HistoryData.splice(index,1)
        }
    })
    window.localStorage.setItem('History', JSON.stringify(HistoryData));

}
// delHistoryList('aaaa');
//清除历史记录
var clearHistoryList = function() {
    window.localStorage.removeItem('History');
}

//显示在页面上
var showHistoryList = function () {
    // 获取历史记录
    var historyData = getHistoryList();
    // 模板
  
    // 使用template方法渲染模板
    var historyResult = template('history-temp', { data: historyData });
    // 把渲染好的数据添加的列表中
    // console.log(historyResult);
    $('.history').html(historyResult);
  }
//   showHistoryList();
  
