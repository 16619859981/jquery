$(function () {/* 文档加载，执行一个函数*/
  // 1.通过选择器 选择到form标签 
  $('#form')
  // 2.调用bootstrapValidator表单校验插件
    .bootstrapValidator({
      // 提示信息(可是删除)
      message: 'This value is not valid',
      // 反馈图标
      feedbackIcons: {/*input状态样式图片*/
        // 合法的 图片
        valid: 'glyphicon glyphicon-ok',
        // 非法的图标 
        invalid: 'glyphicon glyphicon-remove',
        // 校验中  
        validating: 'glyphicon glyphicon-refresh'
      },
      // fields 字段
      fields: {/*验证：规则*/
        // username 必须要和input中的 name属性的值一样
        username: {//验证input项：验证规则
          // mesage 可以删掉
          message: 'The username is not valid',

          // 验证规则器
          validators: {
            notEmpty: {//非空验证：提示消息
              message: '用户名不能为空'
            },
            // 长度验证
            stringLength: {
              min: 4,
              max: 30,
              message: '用户名长度必须在6到30之间'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9_\.]+$/,
              message: '用户名由数字字母下划线和.组成'
            },
            callback: {
              message: "用户名不存在"
            }
          }
        },
        // password 必须要和input中的 name属性的值一样
        password: {
          message: '密码无效',
          validators: {
            notEmpty: {
              message: '密码不能为空'
            },
            stringLength: {
              min: 6,
              max: 30,
              message: '用户名长度必须在6到30之间'
            },
            different: {//不能和用户名相同
              field: 'username',//需要进行比较的input name值
              message: '不能和用户名相同'
            },
            regexp: {
              regexp: /^[a-zA-Z0-9_\.]+$/,
              message: 'The username can only consist of alphabetical, number, dot and underscore'
            },
            callback: {
              message: '密码错误'
            }
          }
        }
      }
    })
    // 当校验成功  就会提交表单 这是一个表单校验的事件 表单校验成功
    .on('success.form.bv', function (e) {//点击提交之后
      // 为什么要写 e.preventDefault(); 
      // 原因是 html中的按钮 <button type="submit" class="btn btn-primary">登录</button>
      // 因为submit有一个自动提交表单的事件 为了把提交表单行为交给bootstrapValidator插件 所以要阻止
      // 用户名: root
      // 密码: 123456
      e.preventDefault();

      // 获取到提交的form标签
      var $form = $(e.target);

      // console.log($form);

      // 获取到  BootstrapValidator 表单校验插件 实例(对象)
      var bv = $form.data('bootstrapValidator');

      // Use Ajax to submit form data 提交至form标签中的action，result自定义
      // $.get(url,data,success,dataType) 和 $.post(url,data,success,dataType) 就是$.ajax()方法的二次封装
      // 以上两种方法  没有ajax的方法完整  尤其没有beforeSend complete方法
      // $.ajax更加灵活
      // $.ajax(对象) 

      // var data = $form.serialize();
      // console.log(data);
      $.ajax({
        type: 'POST',
        url: '/employee/employeeLogin',
        data: $form.serialize(),
        success: function(result){
          console.log(result);

          // 密码错误 更新表单校验状态
          if(result.error == 1001) {
            // 校验密码  INVALID代表不合法
            bv.updateStatus('password','INVALID','callback');
          }
          if(result.error == 1000) {
            bv.updateStatus('username',"INVALID",'callback');
          }

          if(result.success == true) {
            location.href = './index.html';
          }
        }
      })
    });
});