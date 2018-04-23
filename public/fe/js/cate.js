
$(function () {
  // 分类页 右边的区域回弹
  mui('.mui-srcoll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启s用回弹
  });

  // 一级菜单渲染
  getFirstCategory();

  //点击 渲染页面
    $('.ul').on('click','li',function(){
      //排他思想
      //先全部去掉
      $('.ul li').removeClass('active');
      //再对点击的li元素添加类名
      $(this).addClass('active');
      //获取对应的id属性值
      var id = $(this).data('id');
      // console.log(id);
      // 渲染二级菜单
      getSecondCategory(id);
    })

})



 // 一级菜单渲染
// 步骤:
// 1.声明一个函数 专门用来请求数据
var getFirstCategory = function () {
  // 2.发起ajax请求
  $.ajax({
    type: 'GET',
    url: '/category/queryTopCategory',
    data: null,
    success: function (data) {
      // console.log(data);
      // 3.获取数据并渲染
      // 3.1 写模板
      var firstResult = template('first-templ', data);
      // 3.2 调用模板方法渲染模板
        // console.log(firstResult);
      // 4.把渲染好的数据添加到页面中
        $('.ul').html(firstResult);

        //获取数据中的第一条数据的id传给二级分类的函数

        var id = data.rows[0].id;

        getSecondCategory(id);
    }
  })

}


//二级菜单渲染
 var getSecondCategory = function(id) {
   $.ajax({
    type: 'GET',
    url: '/category/querySecondCategory',
    data: {
      id:id
    },
    success: function (data) {
      //测试数据
      console.log(data);
      var secondResult = template('second-templ',data);

      $('.sec-ul').html(secondResult);

   }
 })
}
// 测试获取 到的数据
// getSecondCategory(1);


//添加加载logo
//使用两个函数
// beforeSend 在发送ajax请求前使用的函数
// complete 在ajax请求完成是使用的函数
