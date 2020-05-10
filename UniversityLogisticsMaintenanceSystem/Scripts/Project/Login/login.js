'use strict'

layui.config({
    base: '/Scripts/Project/Login/'
}).use(['layer', 'upload','form'], function () {
    var upload = layui.upload
        ,form  = layui.form;

    //监听登录按钮
    $("#login").click(function () {
        $.ajax({
            url: "/Login/Check",
            dataType: "json",
            type: "post",
            data: {
                account: $('#account').val(),
                password: $('#password').val(),
            },
            success: function (res) {
                if (res.code === 200) {
                    layer.open({
                        title: '欢迎~'
                        , content: '登录成功!'
                        , end: function () {
                            location.href = "/Home/Home";
                        }
                    });
                }
                else if (res.code === 401) {
                    layer.open({
                        title: 'Fail'
                        , content: '请输入账号及密码!'
                    });
                }
                else if (res.code === 404) {
                    layer.open({
                        title: 'Fail'
                        , content: '账号或密码错误，请重新输入!'
                    });
                    $('#password').val("");
                }
            },
        });
    });


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

    //监听"注册"按钮
    window.btn_addUser = function () {
        $('#userId').val(0);
        $('#userAccount').attr("readonly", false);
        layer.open({
            type: 1, //页面层
            title: "注册",
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
                                layer.alert("注册成功!", function (index) {
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

    //监听“回车键”
    $(document).keyup(function (event) {
        if (event.keyCode === 13) {
            $("#login").click();
        }
    });
});