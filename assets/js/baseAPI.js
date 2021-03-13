// $.ajaxPrefilter()可以在调用$.get()  $.post $.ajax()时触发这个方法

// 收到ajax响应以后，也会触发这个方法;

// 开发环境服务器路径地址
let baseURL = 'http://api-breakingnews-web.itheima.net';

// 测试环境服务器路径地址
// let baseURL ='http://api-breakingnews-web.itheima.net';

// 生产环境服务器路径地址
// let baseURL ='http://api-breakingnews-web.itheima.net';

$.ajaxPrefilter(function (options) {
    // 手动为URL添加路径前缀
    options.url = baseURL + options.url;
})