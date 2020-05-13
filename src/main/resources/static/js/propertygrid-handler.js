/**
 *获取EasyUI Propertygrid的数据
 */
function getGridData(type) {
    var rows = [];
    for (var i = 0; i < layoutGridData.length; i++) {
        rows.push(layoutGridData[i])
    }

    for (var j = 0; j < dataSourceGridData.length; j++) {
        rows.push(dataSourceGridData[j])
    }

    for (var k = 0; k < chartCommonGridData.length; k++) {
        var cItem = chartCommonGridData[k];
        rows.push(cItem);
    }
    var d = chartGridData[type];
    for (var m = 0; m < d.length; m++) {
        rows.push(d[m])
    }
    return rows;
}

/**
 * 需改Propertygrid的数据
 * @param type
 */
function setGlobalGridData(type) {
    debugger
    globalGridData = getGridData(type);
    $('#pg').propertygrid('loadData', globalGridData);
    // $('#pg').propertygrid('reload');
}


// 全局(当前)datagrid的值
var globalGridData = [];
// 布局属性
var layoutGridData = [
    {name: "名称", group: "布局属性", value: "", editor: "text"},
    {
        name: "布局样式",
        value: "dark",
        group: "布局属性",
        field: "Role",
        editor: {
            type: 'combobox',
            options: {
                valueField: 'value',
                textField: 'name',
                data: [{'value': 'light', 'name': 'light'}, {'value': 'dark', 'name': 'dark'}],
                editable: false,
                required: true
            }
        }
    },
    {
        name: "显示选择器行",
        group: "布局属性",
        value: "否",
        editor: {
            type: 'combobox',
            options: {
                valueField: 'value',
                textField: 'name',
                data: [{'value': '是', 'name': '是'}, {'value': '否', 'name': '否'}],
                editable: false,
                required: true
            }
        }
    },
    {name: "选择器行高度", group: "布局属性", value: "40", field: "id", editor: "text"},
    {name: "每行列数", group: "布局属性", value: "1", field: "id", editor: "text"},
    {
        name: "行高计算方式",
        value: "autoHeight",
        group: "布局属性",
        field: "Role",
        editor: {
            type: 'combobox',
            options: {
                valueField: 'value',
                textField: 'name',
                data: [{'value': 'autoHeight', 'name': '自动等高高度'}, {
                    'value': 'fixedHeight',
                    'name': '固定高度'
                }, {'value': 'proportionHeight', 'name': '百分比高度'}],
                editable: false,
                required: true
            }
        }
    },
    {name: "每行行高", group: "布局属性", value: "100%", field: "id", editor: "text"},
];
// 数据绑定属性
var dataSourceGridData = [
    {
        name: "数据库名",
        value: "",
        group: "数据绑定属性",
        field: "Role",
        editor: {
            type: 'combobox',
            options: {
                valueField: 'value',
                textField: 'name',
                data: [{'value': '系统库', 'name': '系统库'}, {'value': '业务库', 'name': '业务库'}],
                editable: false,
                required: true
            }
        }
    },
    {
        name: "数据源ID",
        value: "",
        group: "数据绑定属性",
        field: "Role",
        editor: {
            type: 'combobox',
            options: {
                valueField: 'value',
                textField: 'name',
                data: [{'value': 'B123123123E23423', 'name': '查询数据1'}, {
                    'value': 'B123123123E23424',
                    'name': '查询数据2'
                }],
                editable: false,
                required: true
            }
        }
    }
];
// 曲线通用
var chartCommonGridData = [
    {name: "对象ID", value: "", group: "对象属性", field: "domId"},
    // {name: "绘制对象ID", value: "div1", group: "对象属性", field: "officePhone", editor: "text"}
    {
        name: "图形类型",
        value: "",
        group: "对象属性",
        field: "Role",
        editor: {
            type: 'combobox',
            options: {
                valueField: 'value',
                textField: 'name',
                value: 'pie',
                data:
                    [
                        {value: 'line', name: '曲线图'},
                        {value: 'pie', name: '饼状图', selected: true},
                        {value: 'bar', name: '柱状图'}
                    ],
                editable: false,
                required: true,
                onSelect: function (record) {// 选中后修改类型
                    // changeType(record.value);
                    globalGridDataType = record.value;
                }
            }
        }
    },

];

// 柱状图
var barGridData = [
    {name: "曲线标题", value: "", group: "对象属性", field: "title$text"},
    {name: "曲线背景色", value: "", group: "对象属性", field: "chartBackgroundColor"}
];
// 饼状图
var pieGridData = [
    {name: "曲线标题pie", value: "", group: "对象属性", field: "title$text"},
    {name: "曲线背景色pie1", value: "", group: "对象属性", field: "chartBackgroundColor"},
    {name: "曲线背景色pie2", value: "", group: "对象属性", field: "chartBackgroundColor2"},
    {name: "曲线背景色pie3", value: "", group: "对象属性", field: "chartBackgroundColor3"},
    {name: "曲线背景色pie4", value: "", group: "对象属性", field: "chartBackgroundColor3"}
];
var chartGridData = {
    bar: barGridData,
    pie: pieGridData,
};



