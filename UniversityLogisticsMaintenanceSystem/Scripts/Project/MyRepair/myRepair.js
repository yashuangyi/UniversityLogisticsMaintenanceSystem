'use strict'

layui.config({
    base: '/Scripts/Project/MyRepair/' //静态资源所在路径
}).use(['form', 'laydate', 'table'], function () {
    var form = layui.form
        , laydate = layui.laydate
        , table = layui.table;

    //我的报修数据表格
    table.render({
        elem: '#table_myRepair',
        height: 600,
        width: 1500,
        url: '/MyRepair/GetMyRepair', //数据接口
        page: true,//开启分页
        where: { userId: $('#user_id', parent.document).val() },//异步数据接口参数
        cols: [[
            { field: "Id", title: "维修单号" },
            { field: "DamagedName", title: "故障内容" },
            { field: "Address", title: "地址" },
            { field: "Contact", title: "联系方式" },
            { field: "CreateTime", title: "报修时间", width: 165 },
            { field: "ReserveTime", title: "预约上门时间", width: 165  },
            { field: "Remark", title: "备注" },
            { field: "Status", title: "进度", templet: '#statusbar' },
            { field: "MaintainerId", title: "维修工工号" },
            { field: "Appraise", title: "评价" },
            { fixed: 'right', align: 'center', toolbar: '#toolbar', width: 200 }
        ]],
        text: {
            none: '您目前暂无报修记录~' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
        },
    });

    //监听"故障登记"按钮
    window.btn_addRepair = function () {
        $('#createTime').val(null);
        $('#maintainerId').val(null);
        $('#repairId').val(0);
        $('#status').val("待分配");
        $('#repair_userId').val($('#user_id', parent.document).val());
        layer.open({
            type: 1, //页面层
            title: "故障登记",
            area: ['600px', '500px'],
            btn: ['保存', '取消'],
            btnAlign: 'c', //按钮居中
            content: $('#div_addRepair'),
            success: function (layero, index) {// 弹出layer后的回调函数,参数分别为当前层DOM对象以及当前层索引
                // 解决按回车键重复弹窗问题
                $(':focus').blur();
                // 为当前DOM对象添加form标志
                layero.addClass('layui-form');
                // 将保存按钮赋予submit属性
                layero.find('.layui-layer-btn0').attr({
                    'lay-filter': 'btn_saveAdd',
                    'lay-submit': ''
                });
                // 表单验证
                form.verify();
                // 刷新渲染(否则开关按钮不会显示)
                form.render();
            },
            yes: function (index, layero) {// 确认按钮回调函数,参数分别为当前层索引以及当前层DOM对象
                form.on('submit(btn_saveAdd)', function (data) {//data按name获取
                    $.ajax({
                        type: 'post',
                        url: '/MyRepair/AddRepair',
                        dataType: 'json',
                        data: data.field,
                        success: function (res) {
                            if (res.code === 200) {
                                layer.alert("报修成功!请在预约时间等待维修人员上门", function (index) {
                                    window.location.reload();
                                });
                            }else {
                                layer.alert(res.msg);
                            }
                        }
                    });
                });
            }
        });
    }

    //监听表格工具栏
    table.on('tool(table_myRepair)', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') {
            $('#repairId').val(data.Id);
            $('#damagedName').val(data.DamagedName);
            $('#address').val(data.Address);
            $('#contact').val(data.Contact);
            $('#reserveTime').val(data.ReserveTime);
            $('#repair_userId').val(data.UserId);
            $('#remark').val(data.Remark);
            $('#status').val(data.Status);
            $('#maintainerId').val(data.MaintainerId);
            $('#createTime').val(data.CreateTime);
            layer.open({
                type: 1, //页面层
                title: "修改故障报修单",
                area: ['600px', '500px'],
                btn: ['保存', '取消'],
                btnAlin: 'c', //按钮居中
                content: $('#div_addRepair'),
                success: function (layero, index) {// 弹出layer后的回调函数,参数分别为当前层DOM对象以及当前层索引
                    // 解决按回车键重复弹窗问题
                    $('focus').blur();
                    // 为当前DOM对象添加form标志
                    layero.addClass('layui-form');
                    // 将保存按钮赋予submit属性
                    layero.find('.layui-layer-btn0').attr({
                        'lay-filter': 'btn_saveEdit',
                        'lay-submit': ''
                    });
                    // 表单验证
                    form.verify();
                    // 刷新渲染(否则开关按钮不会显示)
                    form.render();
                },
                yes: function (index, layero) {// 确认按钮回调函数,参数分别为当前层索引以及当前层DOM对象
                    form.on('submit(btn_saveEdit)', function (data) {//data按name获取
                        console.log(data);
                        $.ajax({
                            type: 'post',
                            url: '/MyRepair/EditRepair',
                            dataType: 'json',
                            data: data.field,
                            success: function (res) {
                                if (res.code === 200) {
                                    layer.alert("修改成功!", function (index) {
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
        else if (obj.event === 'appraise') {
            var data = obj.data;
            if (data.Appraise != null) {
                layer.alert("您已提交过评价了!");
            } else {
                layer.prompt({
                    formType: 0,
                    title: '请完成评价',
                    area: ['800px', '350px'] //自定义文本域宽高
                }, function (value, index, elem) {
                    $.getJSON('/MyRepair/SubmitAppraise', { orderId: data.Id, appraise: value }, function (res) {
                        if (res.code === 200) {
                            layer.alert("评价成功!", function success() {
                                window.location.reload();
                            });
                        }
                        else {
                            layer.alert("评价失败，请联系系统管理员!");
                        }
                    });
                });
            }
        }
        else if (obj.event === 'del') {
            layer.confirm('确认撤销本次报修?', function (index) {
                $.getJSON('/MyRepair/DelRepair', { repairId: data.Id }, function (res) {
                    if (res.code === 200) {
                        layer.alert("撤销成功!", function success() {
                            window.location.reload();
                        });
                    }
                    else {
                        layer.alert("撤销失败，请联系系统管理员!");
                    }
                });
            })
        }
    });

    //限定预约时间的可选日期
    var nowDate = new Date().toLocaleDateString(); //当前日期
    var reserveDate = laydate.render({
        elem: '#reserveTime',
        type: 'datetime',
        min: nowDate,
        max: '2059-3-17',
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_myRepair', {
            where: { userId: $('#user_id', parent.document).val(), search: $('#input').val() }
        });
    });
});