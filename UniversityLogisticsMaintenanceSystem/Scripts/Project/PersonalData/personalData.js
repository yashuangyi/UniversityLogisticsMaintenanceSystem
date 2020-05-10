'use strict'

// 初始化信息
window.onload = function () {
    $.ajax({
        type: 'get',
        url: '/PersonalData/GetMyData',
        dataType: 'json',
        data: { userId: $('#user_id', parent.document).val()},
        success: function (res) {
            if (res.code === 200) {
                $('#userId').val(res.data.id);
                $('#userName').val(res.data.name);
                $('#userPw').val(res.data.password);
                $('#userPwAgain').val(res.data.password);
                $('#userAccount').val(res.data.account);
                $('#picPath').val(res.data.photoPath);
                if (res.data.photoPath != null) {
                    $('#user_photo').attr("src", res.data.photoPath);
                }
            }
        }
    });
}

layui.config({
    base: '/Scripts/Project/PersonalData/' //静态资源所在路径
}).use(['form', 'upload'], function () {
    var form = layui.form
        , upload = layui.upload;

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

    //监听修改按钮
    $("#btn_submit").click(function () {
        if ($('#userPw').val() != $('#userPwAgain').val()) {
            layer.msg("两次密码不一致，请重新输入!");
            return false;
        }
        $.ajax({
            url: "/UserManage/EditUser",
            dataType: "json",
            type: "post",
            data: {
                user: {
                    password: $('#userPw').val(),
                    name: $('#userName').val(),
                    id: $('#userId').val(),
                    photoPath: $('#picPath').val(),
                    account: $('#userAccount').val(),
                    power: $('#user_power', parent.document).val(),
                },
            },
            success: function (res) {
                if (res.code === 200) {
                    layer.alert("修改成功!", function (index) {
                        window.location.reload();
                    });
                }
                else if (res.code === 402) {
                    layer.alert("修改失败!");
                }
            },
        });
    });
});