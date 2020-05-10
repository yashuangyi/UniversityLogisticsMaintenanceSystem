'use strict'

layui.config({
    base: '/Scripts/Project/Home/' //静态资源所在路径
}).use(['element', 'form'], function () {
    var form = layui.form,
        element = layui.element;

    // 初始化信息
    window.onload = function () {
        if ($('#user_id').val() !== "") {
            $.ajax({
                type: "post",
                url: "/Home/ReadState",
                data: { userId: $('#user_id').val() },
                dataType: "json",
                success: function (res) {
                    if (res.code === 200) {
                        $('#user_name').text(res.userName);
                        $('#user_power').val(res.userPower);
                        if (res.userPhoto != null) {
                            $('#user_photo').attr("src", res.userPhoto);
                        }
                        if ($('#user_power').val() === "超级管理员" || $('#user_power').val() === "管理员") {
                            $("#child_one").append('<dd><a onclick="setSrc(\'/MyRepair/MyRepair\')"><i class="layui-icon layui-icon-add-1" style="font-size: 18px; color: #55ffff;"></i>&nbsp 故障登记</a></dd>');
                            $("#child_one").append('<dd><a onclick="setSrc(\'/RepairOrder/RepairOrder\')"><i class="layui-icon layui-icon-form" style="font-size: 18px; color: #55ffff;"></i>&nbsp 维修单管理</a></dd>');
                            $("#child_two").append('<dd><a onclick="setSrc(\'/UserManage/UserManage\')"><i class="layui-icon layui-icon-user" style="font-size: 18px; color: #55ffff;"></i>&nbsp 用户管理</a></dd>');
                            $("#child_two").append('<dd><a onclick="setSrc(\'/PersonalData/PersonalData\')"><i class="layui-icon layui-icon-set-fill" style="font-size: 18px; color: #55ffff;"></i>&nbsp 个人信息</a></dd>');
                        } else if ($('#user_power').val() === "维修人员") {
                            $("#child_one").append('<dd><a onclick="setSrc(\'/MyRepair/MyRepair\')"><i class="layui-icon layui-icon-add-1" style="font-size: 18px; color: #55ffff;"></i>&nbsp 故障登记</a></dd>');
                            $("#child_one").append('<dd><a onclick="setSrc(\'/MyOrder/MyOrder\')"><i class="layui-icon layui-icon-form" style="font-size: 18px; color: #55ffff;"></i>&nbsp 我的工单</a></dd>');
                            $("#child_two").append('<dd><a onclick="setSrc(\'/PersonalData/PersonalData\')"><i class="layui-icon layui-icon-set-fill" style="font-size: 18px; color: #55ffff;"></i>&nbsp 个人信息</a></dd>');
                        } else if ($('#user_power').val() === "学生") {
                            $("#child_one").append('<dd><a onclick="setSrc(\'/MyRepair/MyRepair\')"><i class="layui-icon layui-icon-add-1" style="font-size: 18px; color: #55ffff;"></i>&nbsp 故障登记</a></dd>');
                            $("#child_two").append('<dd><a onclick="setSrc(\'/PersonalData/PersonalData\')"><i class="layui-icon layui-icon-set-fill" style="font-size: 18px; color: #55ffff;"></i>&nbsp 个人信息</a></dd>');
                        }
                        setSrc("/Home/HomePage");
                    } else {
                        layer.msg("账号异常，请联系系统管理员！");
                        location.href = "/Login/Login";
                    }
                }
            });
        } else {
            layer.msg("请重新登录！");
            location.href = "/Login/Login";
        }
    };
});

//修改iframe的读取路径并刷新
function setSrc(path) {
    //此句必须在前面
    $("#iframeMain").get(0).contentWindow.location.reload(true);
    var iframe = $("#iframeMain").get(0);
    iframe.src = path;
}

//刷新按钮
function freshView() {
    var iframe = $("#iframeMain").get(0);
    iframe.src = iframe.src;
}