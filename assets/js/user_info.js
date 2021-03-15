$(function () {
    // 自定义验证规则
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为1-6位之间!';
            }
        }
    });
    // 用户渲染
    initUserInfo();
    let layer = layui.layer;
    // 封装用户渲染
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.msessage);
                }
                form.val('formUserInfo', res.data);

            }
        })
    }

    // 重置按钮
    $("#btnReset").on("click", function (e) {
        // 阻止重置
        e.preventDefault();
        // 重新 用户渲染
        initUserInfo();
    })

    // 修改用户信息
    $('.layui-form').on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("用户信息修改失败!");
                }
                layer.msg("恭喜您,用户信息修改成功!");
                window.parent.getUserInfo();
            }
        })
    })
});