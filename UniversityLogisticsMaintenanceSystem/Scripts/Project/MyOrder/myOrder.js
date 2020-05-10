'use strict'

layui.config({
    base: '/Scripts/Project/MyOrder/' //静态资源所在路径
}).use(['form', 'table'], function () {
    var form = layui.form
        , table = layui.table;

    //我的报修数据表格
    table.render({
        elem: '#table_order',
        height: 600,
        width: 1500,
        url: '/MyOrder/GetOrder', //数据接口
        page: true,//开启分页
        where: { userId: $('#user_id', parent.document).val() },//异步数据接口参数
        cols: [[
            { field: "Id", title: "维修单号", sort: "true" },
            { field: "UserId", title: "报修用户ID", sort: "true" },
            { field: "DamagedName", title: "故障内容" },
            { field: "Address", title: "地址" },
            { field: "Contact", title: "联系方式" },
            { field: "CreateTime", title: "报修时间", width: 165},
            { field: "ReserveTime", title: "预约上门时间", sort: "true", width: 165},
            { field: "Remark", title: "备注" },
            { field: "Status", title: "进度", templet: '#statusbar', sort: "true"},
            { field: "MaintainerId", title: "维修工工号", sort: "true" },
            { field: "Appraise", title: "评价" },
        ]],
        text: {
            none: '您目前暂无工单记录，请再接再厉~' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_order', {
            where: { userId: $('#user_id', parent.document).val(), search: $('#input').val() }
        });
    });
});