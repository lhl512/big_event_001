$(function () {
    // 页面渲染
    initArtCateList();

    // 封装函数
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            success: (res) => {
                let str = template("tpl-art-cate", res);
                $("tbody").html(str);
            }
        })
    }

    // 添加文章分类弹出层
    let layer = layui.layer;
    $("#btnAdd").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html(),
        })
    });

    // 添加文章分类
    let indexAdd = null;
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                }
                // 添加成功 重新渲染
                initArtCateList();
                layer.msg("恭喜您,文章类别添加成功!", {
                    icon: 6
                })
                // 关闭弹出层 
                layer.close(indexAdd);
            }
        })
    })




    // 修改文章分类
    let indexEdit = null;
    let form = layui.form;
    $("tbody").on("click", "#btn-edit", function () {


        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
        });

        let Id = $(this).attr("data-id");
        console.log(Id);

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: (res) => {
                console.log(res);

                form.val("form-edit", res.data)
            }
        })
    });

    // 修改提交
    $("body").on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, {
                        icon: 5
                    })
                }
                // 重新渲染
                initArtCateList();
                layer.msg("恭喜您，文章分类更新成功!", {
                    icon: 6
                })
                layer.close(indexEdit);
            }
        })
    });

    // 删除
    $("tbody").on("click", "#btn-delete", function () {
        let Id = $(this).attr("data-id");
        layer.confirm('是否确认删除!', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                type: 'GET',
                data: {},
                success: (res) => {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList();
                    layer.msg("恭喜您,文章分类删除成功!");
                    layer.close(index)
                }
            })
        })
    })
})