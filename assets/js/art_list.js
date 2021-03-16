$(function () {

    // 为art-template 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date(dtStr);

        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 参数
    let q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: "", //文章分类的 Id
        state: "", //文章的状态，可选值有:已发布、草稿
    }


    let layer = layui.layer;
    // 页面渲染
    initTable()
    // 获取列表数据 封装
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);

                }
                let htmlStr = template("tpl-table", res);
                $("tbody").html(htmlStr);
                renderPage(res.total)
                // console.log(res.total);

            }
        })
    }

    let form = layui.form;
    initCate();

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
                // 对于select标签 赋值之后需要重新渲染
                // 单选 多选 下拉
                form.render();
            }
        })
    }

    // 筛选功能
    $("#form-search").on("submit", function (e) {
        e.preventDefault();
        let state = $('[name=state]').val();
        let cate_id = $('[name=cate_id]').val();
        q.state = state;
        q.cate_id = cate_id;
        initTable();

    })

    // 分页
    let laypage = layui.laypage;

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,

            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            jump: function (obj, first) {
                // console.log(first, obj.curr, obj.limit);

                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable();
                }
            }

        })


    }


    // 删除

    $("tbody").on("click", ".btn-delete", function () {
        let len = $('.btn-delete').length
        let Id = $(this).attr("data-id");
        layer.confirm("是否确认删除?", {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                url: '/my/article/delete/' + Id,

                success: (res) => {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }

                    layer.msg("恭喜您,文章删除成功!", {
                        icon: 6
                    });
                    // if ($("#btn-delete").length == 1 && q.pagenum > 1) q.pagenum--;
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable();
                }

            })

            layer.close(index);
        })
    })
})