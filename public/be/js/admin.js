$(function () {
  // 0.进度条(nprogress)
  NProgress.configure({ showSpinner: false }); //关闭进度圈
  // 问题: 你们能不能检测ajax的开始和结束
  // 解决方案: ajax全局事件
  // 内容:
  // .ajaxStart() 开始   需要的
  // .ajaxstop() 停止
  // .ajaxError() 错误
  // .ajaxSuccess()请求成功完成时执行。
  // .ajaxComplete()请求完成调用。 需要的  
  // .ajaxSend()

  $(document).ajaxStart(function () {
    // console.log("ajax开始");
    NProgress.start();

  })

  $(document).ajaxComplete(function () {
    // console.log("ajax完成");
    NProgress.done();
  })


  // 1.顶部导航折叠功能
  // 1.1 获取元素 加点击事件
  $('[data-menu]').on('click', function () {
    // 1.2 获取左侧菜单 让左侧菜单切换显示和隐藏
    $('.ad_aside').toggle();
    // 1.3 获取右侧菜单 让右侧菜单切换类名
    $('.ad_section').toggleClass('menu');
  })



  // 2.左侧菜单切换折叠
  // 2.1 获取到点击的按钮 添加事件
  $('.menu [href="javascript:;"]').on('click', function () {
    // 2.2 获取到点击按钮的兄弟元素 block

    // 徐徐展开
    $(this).siblings('.child').slideToggle();
  })

  // 3.退出
  // 3.1 找到退出按钮 添加事件
  $('[data-logout]').on('click', function () {

    // console.log(1);
    // 3.2 把模态框添加到body闭合标签的前面
    var html = `<div class="modal fade" id="exit-modal" tabindex="-1" >
        <div class="modal-dialog modal-sm" role="document">
          <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">温馨提示</h4>
      </div>
      <div class="modal-body alert-danger">
       <i class="glyphicon glyphicon-info-sign"></i> 您确定要退出后台管理系统吗?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary exit-user">确定</button>
      </div>
    </div>
  </div>
</div>`;

    // console.log(html);
    $('body').append(html);
    // 让模态框显示
    $('#exit-modal').modal('show');
  })

  // 点击 退出
  $('body').on('click','.exit-user',function(){
     // 3.3 调用ajax 退出
     $.ajax({
      type: 'GET',
      url: '/employee/employeeLogout',
      data: null,
      success: function(result){
        // console.log(result);
        if(result.success == true) {
          // 3.4 退出之后跳转到登陆页
          location.href = './login.html';
        }
      }

    })
    
  })

})