/**
 * 渲染曲线
 * @param chartDom ECharts对应dom
 * @param chartOption ECharts对应option
 */
function drawChart(chartDom, chartOption) {
    var ChartObj = echarts.init(chartDom);
    ChartObj.setOption(chartOption);
}

function drawChartByDomId(domId, chartOption) {
    drawChart(getDomObj(domId), chartOption);
}

/**
 * 修改定制面板和选中的曲线的类型
 * @param type
 */
function changeType(type) {
    changeChartType(type);
    // setGlobalGridData(type);
}

/**
 * 修改选中的曲线类型
 * @param type
 */
function changeChartType(type) {
    // 获取选中曲线对应的dom
    var selectedDom = getSelectedDom();
    var cTemplate = chartOptionTemplate[type]; // 获取ECharts option模板
    var gTemplate = chartGridData[type]; // 获取datagrid值
    // 渲染曲线
    drawChart(selectedDom, cTemplate);
}

/**
 * 获取选中曲线对应的dom
 * @returns {undefined|null|Element}
 */
function getSelectedDom() {
    var selectDiv = document.getElementsByClassName("select");
    var domId = selectDiv[0].id;
    return getDomObj(domId);
}

/**
 * 通过id获取曲线的dom
 * @param objId
 * @returns {HTMLElement|null}
 */
function getDomObj(objId) {
    if (objId == null || objId == undefined || objId == "") return;
    var dom = document.getElementById(objId);
    var bjys = getPropertyValue("布局样式");
    var subDom = null;
    switch (bjys) {
        case "dark":
            subDom = dom.getElementsByClassName("echartsBox");
            if (subDom != null) dom = subDom[0];
            break
        case "light":
            break;
    }
    if (dom == null || dom == undefined) return null;
    return dom;
}

/**
 * 监视器
 */
var monitor = {};
Object.defineProperties(monitor, {
    globalGridDataType: {
        configurable: true,
        get: function () {
            return globalGridDataType
        },
        set: function (newValue) {
            globalGridDataType = newValue;
            console.log('set: ', a)
        }
    },
    b: {
        configurable: true,
        get: function () {
            console.log('get: ', b)
            return b;
        },
        set: function (newValue) {
            b = newValue;
            console.log('set: ', b)
        }
    }
});

var barTemplate = {
    title: {
        text: '曲线标题',
        left: 'middle'
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(98,243,229,0.8)'
        }
    }]
};
var pieTemplate = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
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
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ]
        }
    ]
};

// domId和对应option的映射表,key: domId,value: EchartOption
var chartOptionMap = {};
// 曲线的默认模板
var chartOptionTemplate = {
    bar: barTemplate,
    pie: pieTemplate
};

