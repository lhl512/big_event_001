$(function () {
    function initForm() {
        let id = location.search.split("=")[1];
        $.ajax({
            url: '/my/article/' + id,

            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit', res.data);

                tinyMCE.activeEditor.setContent(res.data.content);

                if (!res.data.cover_img) {
                    return layer.msg("用户未上传图片!")
                }
                let newImgURL = baseURL + res.data.cover_img;
                $image.cropper('destroy').attr("src", newImgURL).cropper(options)
            }
        })
    }

    let form = layui.form;
    let layer = layui.layer;

    initCate();
    //  封装
    function initCate() {
        $.ajax({
            url: '/my/article/cates',

            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template("tpl-cate", res);
                $("[name=cate_id]").html(htmlStr)
                form.render();
                initForm();
            }
        })
    }

    // 初始化富文本编辑器
    initEditor();

    let $image = $("#image");
    let options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $image.cropper(options);

    // 选择图片
    $("#btnChooseImage").on("click", function () {
        $("#coverFile").click();
    })

    // 设置图片
    $("#coverFile").change(function (e) {
        let file = e.target.files[0];

        if (file == undefined) {
            return;
        }

        let newImgURL = URL.createObjectURL(file);

        $image.cropper('destroy').attr('src', newImgURL).cropper(options)
    })

    // 设置状态
    let state = "已发布";
    $("#btnSave2").on("click", function () {
        state = '草稿';
    })

    // 添加文章
    $("#form-pub").on("submit", function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 创建FormData对象，收集数据
        let fd = new FormData(this);
        // 放入状态
        fd.append("state", state);
        $image.cropper('getCroppedCanvas', {
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                fd.append('cover_img', blob);
                console.log(...fd);
                publishArticle(fd)
            })
    })

    // 封装 添加文章方法
    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/edit',
            type: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("恭喜您,修改文章成功!", {
                    icon: 6
                })
                // location.href = '/article/art_list.html'


                setTimeout(function () {
                    window.parent.document.getElementById("art_list").click();
                }, 1000)
            }
        })
    }
})