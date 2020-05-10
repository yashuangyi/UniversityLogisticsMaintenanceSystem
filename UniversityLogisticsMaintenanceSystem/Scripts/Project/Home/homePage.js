// 初始化信息
window.onload = function () {
    if ($('#user_power', parent.document).val() === "超级管理员" || $('#user_power', parent.document).val() === "管理员") {
        $("#btn_list").append('<button class="layui-btn" onclick="linkBtn(\'/RepairOrder/RepairOrder\')">维修单管理</button>');
        $("#btn_list").append('<button class="layui-btn" onclick="linkBtn(\'/UserManage/UserManage\')">用户管理</button>');
    } else if ($('#user_power', parent.document).val() === "维修人员") {
        $("#btn_list").append('<button class="layui-btn" onclick="linkBtn(\'/MyOrder/MyOrder\')">我的工单</button>');
    } else if ($('#user_power', parent.document).val() === "学生") {
        $("#btn_list").append('<button class="layui-btn" onclick="linkBtn(\'/MyRepair/MyRepair\')">故障登记</button>');
        $("#btn_list").append('<button class="layui-btn" onclick="linkBtn(\'/PersonalData/PersonalData\')">个人信息</button>');
    }
}

//快速导航按钮事件
function linkBtn(url) {
    window.location.href = url;
}

//echarts饼图，需要注意先让DOM元素加载出来
$(document).ready(function () {
    var chart = echarts.init($('#echarts').get(0));
    var data = [];

    if ($('#user_power', parent.document).val() === "超级管理员" || $('#user_power', parent.document).val() === "管理员") {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['已完成', '进行中', '待分配']
            },
            series: [
                {
                    name: '维修单情况',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
        $.get("/Home/GetEchartsOne", null,
            function (res) {
                if (res.code === 200) {
                    for (let i = 0; i < res.count; i++) {
                        data.push(res.data[i]);
                    }
                    chart.setOption(option);
                }
            },
            "json"
        );
    }

    if ($('#user_power', parent.document).val() === "维修人员") {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['已完成', '进行中']
            },
            series: [
                {
                    name: '我的工单',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
        $.get("/Home/GetEchartsTwo", { userId: $('#user_id', parent.document).val()},
            function (res) {
                if (res.code === 200) {
                    for (let i = 0; i < res.count; i++) {
                        data.push(res.data[i]);
                    }
                    chart.setOption(option);
                }
            },
            "json"
        );
    }

    if ($('#user_power', parent.document).val() === "学生") {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['已完成', '进行中', '待分配']
            },
            series: [
                {
                    name: '我的报修',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: data
                }
            ]
        };
        $.get("/Home/GetEchartsThree", { userId: $('#user_id', parent.document).val() },
            function (res) {
                if (res.code === 200) {
                    for (let i = 0; i < res.count; i++) {
                        data.push(res.data[i]);
                    }
                    chart.setOption(option);
                }
            },
            "json"
        );
    }
});
