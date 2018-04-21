$(function () {
  // 功能:
  // 1.分页展示用户信息
  getUserList();

  // 2.用户的禁用和启用
  // 2.1 点击按钮
  $('table').on('click', '.btn', function () {
    // 2.2 获取当前的状态(1代表正常 0代表禁用)
    // 现在用户都是1  但是 按钮是danger 
    // 意味着 点击按钮 是要去禁用用户的
    var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    var id = $(this).data('id');
    console.log(isDelete, id);

    // 1.让模态框出现
    $('#optionModal').modal('show');
    // 2.改变字样
    $('#optionModal').find('strong').text($(this).text() + $(this).data('username'));


    // 2.3 切换状态
    $('#optionModal').on('click', '.btn-yes', function () {
      $.ajax({
        type: 'POST',
        url: '/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete,
        },
        success: function (result) {
          // console.log(result);
          if (result.success == true) {
            getUserList();
            $("#optionModal").modal('hide');
          }
        }
      })
    })
  })
})






// 
function getUserList(pageNum, pageSize) {
  $.ajax({
    type: 'GET',
    url: '/user/queryUser',
    data: {
      page: pageNum || 1,
      pageSize: pageSize || 10
    },
    success: function (result) {
      console.log(result);
      var userResult = template('user-template', result);

      // 把页面添加到html中去
      $('tbody').html(userResult);

      // 分页展示
      // element.bootstrapPaginator(options);  

      $('.pagination').bootstrapPaginator({
        // 固定写法  但是不能不写 代表了bootstrap的版本   Bootstrap v3.3.7 
        bootstrapMajorVersion: 3,
        //当前页面  page当前第几页
        currentPage: result.page,
        //一页显示几个按钮（在ul里面生成5个li）  
        // numberOfPages: 5,
        //总页数 total 代表 数据总条数  size代表一页显示几个
        totalPages: Math.ceil(result.total / result.size),
        // 你要去第几页 那么就点击 要获取currentPage
        onPageChanged: function (event, originalEvent, typePage, currentPage) {
          var page = currentPage;
          // 让页面重新渲染到某一页
          getUserList(page);
        }
      })
    }
  })
}