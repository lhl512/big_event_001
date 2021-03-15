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

    // 身份验证
    if (options.url.indexOf("/my/") != -1) {

        options.headers = {
            Authorization: localStorage.getItem("token") || ''
        }

    }
    // 拦截所有响应，判断身份认证信息
    options.complete = function (res) {
        // console.log(res.responseJSON);
        let obj = res.responseJSON;
        if (obj.status == 1 && obj.message == '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem("token");
            // 页面跳转
            location.href = '/login.html';
        }

    }

})