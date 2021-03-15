$(function () {
    // 自定义验证规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/, '密码必须6-16位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return '原密码和旧密码不能相同!';
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次新密码输入不一致!";
            }
        }
    })

    // 表单提交
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg("修改密码成功!", {
                    icon: 6
                })
                $(".layui-form")[0].reset();
            }
        })
    })
})