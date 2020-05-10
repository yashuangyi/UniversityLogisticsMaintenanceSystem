'use strict'

layui.config({
    base: '/Scripts/Project/RepairOrder/' //静态资源所在路径
}).use(['form', 'table'], function () {
    var form = layui.form
        , table = layui.table;

    //我的报修数据表格
    table.render({
        elem: '#table_repair',
        height: 600,
        width: 1500,
        url: '/RepairOrder/GetRepair', //数据接口
        page: true,//开启分页
        cols: [[
            { field: "Id", title: "维修单号", sort: "true" },
            { field: "UserId", title: "报修用户ID", sort: "true", width: 120},
            { field: "DamagedName", title: "故障内容" },
            { field: "Address", title: "地址" },
            { field: "Contact", title: "联系方式" },
            { field: "CreateTime", title: "报修时间", width: 165},
            { field: "ReserveTime", title: "预约上门时间", sort: "true", width: 165},
            { field: "Remark", title: "备注" },
            { field: "Status", title: "进度", templet: '#statusbar' },
            { field: "MaintainerId", title: "维修工工号", sort: "true", width: 130},
            { field: "Appraise", title: "评价" },
            { fixed: 'right', align: 'center', toolbar: '#toolbar', width: 200 }
        ]],
        text: {
            none: '目前暂无报修记录~' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
    });

    //加载选择框选项
    $.getJSON('/RepairOrder/ShowChoice', function (data) {
        if (data.code === 200) {
            $.each(data.choice, function (index, choice) {
                $('#select_man').append(new Option(choice));//往下拉菜单中添加元素
            });
            form.render();//菜单渲染,加载内容
        }
    });

    //监听表格工具栏
    table.on('tool(table_repair)', function (obj) {
        var data = obj.data;
        if (obj.event === 'send') {
            var orderId = data.Id;
            layer.open({
                type: 1, //页面层
                title: "派遣维修",
                area: ['400px', '400px'],
                btn: ['确认', '且慢'],
                btnAlign: 'c', //按钮居中
                content: $('#div_selectMan'),
                success: function (layero, index) {// 弹出layer后的回调函数,参数分别为当前层DOM对象以及当前层索引
                    // 解决按回车键重复弹窗问题
                    $(':focus').blur();
                    // 为当前DOM对象添加form标志
                    layero.addClass('layui-form');
                    // 将保存按钮赋予submit属性
                    layero.find('.layui-layer-btn0').attr({
                        'lay-filter': 'btn_selectMan',
                        'lay-submit': ''
                    });
                    // 表单验证
                    form.verify();
                    // 刷新渲染(否则开关按钮不会显示)
                    form.render();
                },
                yes: function (index, layero) {// 确认按钮回调函数,参数分别为当前层索引以及当前层DOM对象
                    form.on('submit(btn_selectMan)', function (data) {//data按name获取
                        //if ($("#select_man").val() === "请选择维修人员") {
                        //    layer.alert("请先选择维修人员，若无该维修人员信息则先在用户管理处进行添加！");
                        //    return false;
                        //}
                        $.ajax({
                            type: 'post',
                            url: '/RepairOrder/SendOrder',
                            dataType: 'json',
                            data: { manInform: $("#select_man").val(), orderId: orderId },
                            success: function (res) {
                                if (res.code === 200) {
                                    layer.alert("派遣成功！", function (index) {
                                        window.location.reload();
                                    });
                                } else {
                                    layer.alert(res.msg);
                                }
                            }
                        });
                    });
                }
            });
        }
        else if (obj.event === 'finish') {
            layer.confirm('确认已完成?', function (index) {
                $.getJSON('/RepairOrder/FinishOrder', { orderId: data.Id }, function (res) {
                    if (res.code === 200) {
                        layer.alert("登记完成!", function success() {
                            window.location.reload();
                        });
                    }
                    else {
                        layer.alert("登记失败，请联系代码小哥!");
                    }
                });
            })
        }
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_repair', {
            where: { userId: $('#user_id', parent.document).val(), search: $('#input').val() }
        });
    });
});