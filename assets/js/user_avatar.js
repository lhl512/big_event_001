$(window).on("load", function () {
    let $image = $("#image");
    let options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options);

    // 选择文件
    $("#btnChooseImage").on("click", function () {
        $("#file").click();
    });

    // 修改裁剪图片
    let layer = layui.layer;
    $("#file").on("change", function (e) {
        let file = e.target.files[0];
        if (file == undefined) {
            return layer.msg("请选择图片!");

        }
        let newImgURL = URL.createObjectURL(file);
        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    });

    // 上传头像
    $("#btnUpload").on("click", function () {
        // 获取base64格式
        let dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png');
        $.ajax({
            url: '/my/update/avatar',
            method: 'post',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜您，更换头像成功!", {
                    icon: 6
                });
                window.parent.getUserInfo();
            }
        })
    })
});