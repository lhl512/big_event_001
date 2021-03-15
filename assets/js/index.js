$(function () {
    (function () {
        getUserInfo();

        // 退出
        let layer = layui.layer;
        $("#btnLogout").on("click", function () {
            // 框架提供的询问框
            layer.confirm("是否确认退出?", {
                icon: 3,
                title: '提示'
            }, function (index) {
                // 清空本地token
                localStorage.removeItem("token");
                // 页面跳转
                location.href = '/login.html';
                // 关闭询问框
                layer.close(index);
            })
        })
    })();
});

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',

        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        success: (res) => {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染头像
            renderAvatar(res.data)
        }

    })
}

function renderAvatar(user) {
    // 渲染用户名
    let name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    // 渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        // 渲染文字头像
        $(".layui-nav-img").hide();
        let text = name[0].toUpperCase();
        $(".text-avatar").show().html(text)
    }
}