$(function () {
  // 分类页 右边的区域回弹
  mui('.mui-srcoll-wrapper').scroll({
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
  });

  // 一级菜单渲染
  getFirstCategory();

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
      console.log(data);
      // 3.获取数据并渲染
      // 3.1 写模板
      var firstResult = template('first-templ', data);
      // 3.2 调用模板方法渲染模板
        console.log(firstResult);
      // 4.把渲染好的数据添加到页面中
        $('.sort-list ul').html(firstResult);
    }
  })

}
