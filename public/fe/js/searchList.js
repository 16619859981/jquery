//商品渲染页面
$(function(){
    //根据关键字查询含有关键字的商品
    //获取url中的kwd的值

    var url = new URLSearchParams(location.search);
    //把关键字传给后台
    var kwd = url.get('kwd');
    getProductList(1,kwd);
    //在搜索页面也可以搜索商品
    $('.btn').on('click',function(){
        //获取搜索框中的关键字
        var inputMsg = $('.inp').val();
        // alert(inputMsg);
        //判断是不是为空
        if(!inputMsg.trim()){
            mui.alert("请输入查询内容！！");
        }else {
            getProductList(1,inputMsg);

        }

    })
})





//工具函数  商品渲染
var getProductList = function(pageNum,proName,price,num){
    $.ajax({
        type:"GET",
        data:{
            //页数
            page:pageNum||1,
            //每页有几条数据
            pageSize:3,
            //名称
            proName:proName||null,
            //价格
            price:price||null,
            //销量
            num:num||null
        },
        url:"/product/queryProduct",
        success:function(data){
            // console.log(data)
            //进行判断返回的数据是不是为空
            if(data.data.length==0) {
                mui.alert("没有相关商品");
            }
            //模板
                //   console.log(data);
      // 写模板
      var searchListResult = template('temp', data);
    //   console.log(searchListResult);
      // 渲染模板
      $('.sports ul').html(searchListResult);

        }
    })

}

//测试
// getProductList(1,'nike');