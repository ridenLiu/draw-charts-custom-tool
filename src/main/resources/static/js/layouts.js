var autoHeight = 0;//auto 自动等高高度
var fixedHeight = 1;//固定高度 单位：px
var proportionHeight = 2;//百分比高度 单位：%

var curColList = null;
var curHeightListh = [];
var curHeightComputeType = autoHeight;
var istsxs = false;
var topHeight = 0;
var selectorDivHeight = 0;
var showSelector = '否';


function createLayout(divId, colList, heightList, heightComputeType, isShowSelector, selectorHeight, topHeight) {
    var mainDiv = document.getElementsByClassName("light");
    this.topHeight = topHeight;
    showSelector = isShowSelector;
    if (isShowSelector == '是') {
        selectorDivHeight = parseInt(selectorHeight) + 10;
    } else {
        selectorDivHeight = 0;
    }
    if (mainDiv == null || mainDiv == undefined || (mainDiv.length == 0)) {
        istsxs = true;
    } else if (mainDiv[0].className == "light") {
        istsxs = false;
    } else {
        istsxs = true;
    }
    if (colList != null && colList != undefined) {
        curColList = colList;
        curHeightListh = heightList.slice();
        curHeightComputeType = heightComputeType;
        var heightList_tmp = heightList.slice();
        var clientHeight = document.body.clientHeight - topHeight;
        var rowHeight = 100;
        var splitHeight = 10;
        var rowCount = colList.length;
        var tmpClientH = (clientHeight - (rowCount + 1) * splitHeight - selectorDivHeight);
        if (istsxs) {
            tmpClientH -= rowCount * 2;
        }
        switch (heightComputeType) {
            case "autoHeight":
                rowHeight = (clientHeight - (rowCount + 1) * splitHeight - selectorDivHeight) / rowCount;
                break;
            case "fixedHeight":
                heightList_tmp = heightList.slice();
                break;
            case "proportionHeight":

                for (var i = 0; i < heightList.length; i++) {
                    try {
                        heightList_tmp[i] = tmpClientH * (parseInt(heightList[i].replace('%', '')) / 100);
                    } catch (e) {
                    }
                }
                break;

        }
        var layoutStr = "<div class=\"box\">";
        var divCounts = 0;
        for (var i = 0; i < colList.length; i++) {
            layoutStr += '<div id="rowIndex' + (i + 1) + '" class="group">';
            var colNum = colList[i];
            var tmpRowHeight = rowHeight;
            switch (heightComputeType) {
                case "autoHeight":
                    tmpRowHeight = rowHeight;
                    break;
                default:
                    tmpRowHeight = heightList_tmp[i];
                    break;
            }

            for (var j = 0; j < colNum; j++) {
                divCounts++;
                if (istsxs) {
                    layoutStr = layoutStr + '<div id="div' + divCounts + '" class="item1" style="height:' + tmpRowHeight + 'px">';//
                    layoutStr += '<div class="main_border "  style="height:' + tmpRowHeight + 'px">';
                    layoutStr += '<div class="corner1" >';
                    layoutStr += '<img src="./img/2.png" width="37" height="37" />';
                    layoutStr += '</div>';
                    layoutStr += '<div class="echartsBox">';
                    layoutStr += '</div>';
                    layoutStr += '</div>';
                    layoutStr += '</div>';


                } else {
                    layoutStr = layoutStr + '<div id="div' + divCounts + '" class="item" style="height:' + tmpRowHeight + 'px"></div>';
                }


            }
            layoutStr += '</div>';
        }
        layoutStr += "</div>";

        if (showSelector == "是") {
            layoutStr = '<div class="group_select"> ' +
                '<div class="selector" style="height:' + parseInt(selectorDivHeight - 10) + 'px">选择器区域</div> ' +
                '</div> ' + layoutStr;
        }
        document.getElementById(divId).innerHTML = layoutStr;
        var itemList = istsxs == false ? document.getElementsByClassName("item") : document.getElementsByClassName("item1");
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i] == null || itemList[i] == undefined) continue;

            // 初始化模板,默认都为bar曲线
            chartOptionMap[itemList[i].id] = chartOptionTemplate['pie'];

            itemList[i].onclick = function (param) {
                var selectDiv = document.getElementsByClassName("select");
                if (selectDiv != null && selectDiv != undefined && selectDiv.length > 0) {
                    for (var j = 0; j < selectDiv.length; j++) {
                        selectDiv[j].classList.remove('select');
                    }
                }
                this.classList.add('select');
                setPropertyValue("对象ID", this.id);
            }
        }
    }
}


function computeSize(colList, heightList, heightComputeType, topHeight) {
    var heightList_tmp = heightList.slice();
    var clientHeight = document.body.clientHeight - topHeight;
    var rowHeight = 100;
    var splitHeight = 10;
    var rowCount = colList.length;
    var tmpClientH = (clientHeight - (rowCount + 1) * splitHeight - selectorDivHeight);
    if (istsxs) {
        tmpClientH -= rowCount * 2;
    }
    switch (heightComputeType) {
        case "autoHeight":
            rowHeight = (clientHeight - (rowCount + 1) * splitHeight - selectorDivHeight) / rowCount;
            break;
        case "fixedHeight":
            heightList_tmp = heightList;
            break;
        case "proportionHeight":

            for (var x = 0; x < heightList.length; x++) {
                try {
                    heightList_tmp[x] = tmpClientH * (parseInt(heightList[x].replace('%', '')) / 100);
                } catch (e) {
                }
            }
            break;

    }
    var groupList = document.getElementsByClassName("group");
    var itemList = document.getElementsByClassName("item");
    var main_borders = null;
    if (istsxs) {
        main_borders = document.getElementsByClassName("main_border");
    }

    if (groupList != null && groupList != undefined) {
        for (var i = 0; i < groupList.length; i++) {
            var colNum = colList[i];
            var tmpRowHeight = rowHeight;
            switch (heightComputeType) {
                case "autoHeight":
                    tmpRowHeight = rowHeight;
                    break;
                default:
                    tmpRowHeight = heightList_tmp[i];
                    break;
            }

            var itemList = istsxs == false ? groupList[i].getElementsByClassName("item") : groupList[i].getElementsByClassName("item1");
            if (itemList != null && itemList != undefined) {
                for (var j = 0; j < itemList.length; j++) {
                    itemList[j].style.height = tmpRowHeight + 'px';
                    if (istsxs) {
                        var main_borders = itemList[j].getElementsByClassName("main_border");
                        if (main_borders != null && main_borders != undefined && main_borders.length > 0) {
                            main_borders[0].style.height = itemList[j].style.height;
                        }
                    }

                }
            }
        }
    }

}

window.onload = function (e) {

}

window.onresize = function () {
    if (curColList != null) {
        computeSize(curColList, curHeightListh, curHeightComputeType, topHeight);
    }
}
