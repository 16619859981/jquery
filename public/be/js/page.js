
// element 是放 分页元素的标签
element.bootstrapPaginator({
  // 固定写法  但是不能不写 代表了bootstrap的版本   Bootstrap v3.3.7 
  bootstrapMajorVersion: 3,
  //当前页面  
  currentPage: page,
  //一页显示几个按钮（在ul里面生成5个li）  
  numberOfPages: 5,
  //总页数 total 代表 数据总条数  size代表一页显示几个
  totalPages: pages, 
  // 你要去第几页 那么就点击 要获取currentPage
  onPageChanged: function (event, originalEvent, typePage, currentPage) {
   
  }

});  