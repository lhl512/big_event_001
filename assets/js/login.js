$(function () {
    // 去注册账号 点击事件 
    $("#link-reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });
    // 去登录 点击事件
    $("#link-login").on("click", function () {
        $(".reg-box").hide();
        $(".login-box").show();
    });

    // 自定义验证规则
    // console.log(layui);

    let form = layui.form;
    // verfiy()的参数时一个对象
    form.verify({
        // 属性是校验规则名称，值是函数或者数组
        //  密码规则
        pwd: [
            /^[\S]{6,16}$/,
            "密码必须6-16位，且不能输入空格"
        ],
        // 确认密码规则
        repwd: function (value) {
            let pwd = $(".reg-box input[name=password]").val();
            if (value != pwd) {
                return "两次密码输入不一致,请重新输入!"
            }
        }
    })

    // 注册功能
    let layer = layui.layer;
    $("#form_reg").on("submit", function (e) {
        // 阻止表单提交
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $(".reg-box input[name=username]").val(),
                password: $(".reg-box input[name=password]").val(),
            },

            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                // 提交成功后处理代码
                layer.msg("恭喜您,注册成功!", {
                    icon: 6
                });
                // 手动切换到登录表单
                $("#link-login").click();
                // 重置form表单
                $("#form_reg")[0].reset();
            }
        })
    })


    // 登录功能
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    });
                }
                layer.msg("恭喜您,登录成功!", {
                    icon: 6
                });
                // 保存token
                localStorage.setItem("token", res.token);
                // 跳转

                location.href = "/idnex.html";

            }
        })
    })


})