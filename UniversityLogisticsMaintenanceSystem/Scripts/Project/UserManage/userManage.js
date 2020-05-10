'use strict'

layui.config({
    base: '/Scripts/Project/UserManage/' //静态资源所在路径
}).use(['form', 'table', 'upload'], function () {
    var form = layui.form
        , upload = layui.upload
        , table = layui.table;

    //上传图片功能
    upload.render({
        elem: '#btn_selectPic',
        url: '/UserManage/UploadPic',
        auto: false,//不自动上传
        accept: 'images',
        acceptMime: 'image/*',
        bindAction: '#btn_uploadPic', //触发上传的按钮
        before: function () {
            layer.load();
        },
        done: function (res) {
            layer.closeAll('loading');
            $('#btn_selectPic').html("<i class=''layui-icon layui-icon-upload-drag'></i>重新选择");
            if (res.code === 200) {
                layer.msg(res.msg);
                $('#userPic').html("<i class='layui-icon layui-icon-file'></i> <a href='" + res.photoPath + "'>" + res.photoName + "<a/>");
                $('#picPath').val(res.photoPath);
            } else {
                layer.msg(res.msg);
                $('#userPic').html("");
                $('#picPath').val("");
            }
        },
    });

    //用户列表数据表格
    table.render({
        elem: '#table_user',
        height: 600,
        width: 1200,
        url: '/UserManage/GetUser', //数据接口
        page: true,//开启分页
        where: { userPower: $('#user_power', parent.document).val() },//异步数据接口参数
        cols: [[
            { field: "Id", title: "编号/工号", sort: "true" },
            { field: "Account", title: "账号" },
            { field: "Password", title: "密码" },
            { field: "Name", title: "名字" },
            { field: "Power", title: "权限",sort:"true" },
            { fixed: 'right', align: 'center', toolbar: '#toolbar', width: 200 }
        ]]
    });

    //监听"新增用户"按钮
    window.btn_addUser = function () {
        $('#userId').val(0);
        $('#userAccount').attr("readonly", false);
        layer.open({
            type: 1, //页面层
            title: "新增用户",
            area: ['600px', '500px'],
            btn: ['保存', '取消'],
            btnAlign: 'c', //按钮居中
            content: $('#div_addUser'),
            success: function (layero, index) {// 弹出layer后的回调函数,参数分别为当前层DOM对象以及当前层索引
                // 解决按回车键重复弹窗问题
                $(':focus').blur();
                // 为当前DOM对象添加form标志
                layero.addClass('layui-form');
                // 将保存按钮赋予submit属性
                layero.find('.layui-layer-btn0').attr({
                    'lay-filter': 'btn_saveUserAdd',
                    'lay-submit': ''
                });
                // 表单验证
                form.verify();
                // 刷新渲染(否则开关按钮不会显示)
                form.render();
            },
            yes: function (index, layero) {// 确认按钮回调函数,参数分别为当前层索引以及当前层DOM对象
                form.on('submit(btn_saveUserAdd)', function (data) {//data按name获取
                    if (data.field.password != data.field.pwAgain) {
                        layer.msg("两次密码不一致，请重新输入!");
                        return false;
                    }
                    $.ajax({
                        type: 'post',
                        url: '/UserManage/AddUser',
                        dataType: 'json',
                        data: data.field,
                        success: function (res) {
                            if (res.code === 200) {
                                layer.alert("新增成功!", function (index) {
                                    window.location.reload();
                                });
                            }
                            else if (res.code === 402) {
                                layer.alert("已存在该账号!");
                            }
                        }
                    });
                    return false;
                });
            }
        });
    }

    //监听表格工具栏
    table.on('tool(table_user)', function (obj) {
        var data = obj.data;
        if (obj.event === 'edit') {
            if (data.Power === "超级管理员") {
                layer.alert("禁止修改超级管理员账户！");
                return false;
            }
            $('#userId').val(data.Id);
            $('#userName').val(data.Name);
            $('#userPw').val(data.Password);
            $('#userPwAgain').val(data.Password);
            $('#userAccount').val(data.Account);
            $('#picPath').val(data.PhotoPath);
            $('#userAccount').attr("readonly", true);
            var select = document.getElementsByName("power");
            for (let i = 0; i < select.length; i++) {
                if (select[i].value === data.Power) {
                    select[i].checked = true;
                    break;
                }
            }
            layer.open({
                type: 1, //页面层
                title: "修改用户信息",
                area: ['600px', '400px'],
                btn: ['保存', '取消'],
                btnAlin: 'c', //按钮居中
                content: $('#div_addUser'),
                success: function (layero, index) {// 弹出layer后的回调函数,参数分别为当前层DOM对象以及当前层索引
                    // 解决按回车键重复弹窗问题
                    $('focus').blur();
                    // 为当前DOM对象添加form标志
                    layero.addClass('layui-form');
                    // 将保存按钮赋予submit属性
                    layero.find('.layui-layer-btn0').attr({
                        'lay-filter': 'btn_saveUserEdit',
                        'lay-submit': ''
                    });
                    // 表单验证
                    form.verify();
                    // 刷新渲染(否则开关按钮不会显示)
                    form.render();
                },
                yes: function (index, layero) {// 确认按钮回调函数,参数分别为当前层索引以及当前层DOM对象
                    form.on('submit(btn_saveUserEdit)', function (data) {//data按name获取
                        if (data.field.password != data.field.pwAgain) {
                            layer.msg("两次密码不一致，请重新输入!");
                            return false;
                        }
                        var user = {
                            id: data.field.id,
                            account: data.field.account,
                            password: data.field.password,
                            name: data.field.name,
                            power: data.field.power,
                            photoPath: data.field.photoPath,
                        };
                        $.ajax({
                            type: 'post',
                            url: '/UserManage/EditUser',
                            dataType: 'json',
                            data: user,
                            success: function (res) {
                                if (res.code === 200) {
                                    layer.alert("修改成功!", function (index) {
                                        window.location.reload();
                                    });
                                }
                            }
                        });
                    });
                }
            });
        }
        else if (obj.event === 'del') {
            if (data.Power === "超级管理员") {
                layer.alert("禁止删除超级管理员账户！");
            } else {
                layer.confirm('确认删除该账户?', function () {
                    $.getJSON('/UserManage/DelUser', { userId: data.Id }, function (res) {
                        if (res.code === 200) {
                            layer.alert("删除成功!", function success() {
                                window.location.reload();
                            });
                        }
                        else {
                            layer.alert("删除失败!");
                        }
                    });
                });
            }
        }
    });

    //监听查询按钮
    $("#search").click(function () {
        table.reload('table_user', {
            where: { userId: $('#user_id', parent.document).val(), search: $('#input').val() }
        });
    });
});