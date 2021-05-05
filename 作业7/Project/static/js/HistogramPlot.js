// HistogramPlot.js

function plot_histogram(table) {
    // column_index为当前选中的列数，全局变量，定义在Utils.js
    if (column_index <= 0) {
        console.log("Invalid Index Error. The column index is:", column_index);
        return 0;
    }

    // 删除旧的SVG，若无svg，selectAll()方法会创建一个空选择集并返回
    if (!d3.select("body").selectAll("svg").filter(".myHistogramSVG").empty()) {
        d3.select("body").selectAll("svg").filter(".myHistogramSVG").remove();
        console.log("Remove histogram...");
    }
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.4;
    height *= 0.5;
    // var width = 800;
    // var height = 500;
    let marge = { top: 60, bottom: 60, left: 60, right: 260 };
    // var tableObj = document.getElementById("data_table");
    var data = new Array(12);


    var tmp = new Array();
    var mpt = new Array();
    for (var i = 0; i < 12; i++) {
        tmp.push(parseFloat(get_table_data(table)[0][i]))
    }
    data[0] = tmp;
    // alert(data[0]);
    for (var i = 0; i < data[0].length; i++) {

        mpt.push(100 - data[0][i])
    }
    data[1] = mpt;
    // alert(data[0],data[1])
    // // for (var m = 0; m < 6; m++){
    //     alert("area" + m + " " + data[m]);
    // // }

    let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


    var svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .classed("myHistogramSVG", true);
    let g = svg.append('g')
        .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');


    let xScale = d3.scaleBand()
        .domain(monthes)
        .rangeRound([0, width - marge.left - marge.right]);
    let xAxis = d3.axisBottom(xScale);
    //Y轴比例尺
    let yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height - marge.top - marge.bottom, 0]);
    let yAxis = d3.axisLeft(yScale);



    g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
        .selectAll('text').attr('transform', 'rotate(45 -20 20)');
    g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
        .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
            return width - marge.left - marge.right;
        });


    let rectWidth = 20;
    // =============================================
    let Rect_1 = g.selectAll('.rect').data(data[0]).enter().append('g');
    Rect_1.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;
    }).attr('fill', 'orangered').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#ff7449');
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', 'orangered');
    }).on('click', function (d) {
        alert(d);
    })
        .transition().duration(1000).delay(function (d, i) {
            return i * 100;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d) {
            return yScale(d);
        })
        .attr("height", function (d) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    let Rect_2 = g.selectAll('.rect').data(data[1]).enter().append('g');
    Rect_2.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;
    }).attr('fill', '#ffd900').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#fffc49');
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#ffd900');
    }).on('click', function (d) {
        alert(d);
    })
        .transition().duration(1000).delay(function (d, i) {
            return i * 100;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(data[0][i]);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    ;

    var lines = [];
    for (var x = 0; x < 12; x++) {
        var b = [];
        b[0] = xScale(x + 1) + 60+ 15
        b[1] = height - 60 - (270 * data[0][x] / 100)
        lines[x] = b;
    }
    // alert(lines[0])
    // alert(lines);
    var linePath = d3.line()
    svg.append('path')
        .attr('d', linePath(lines))
        .attr('stroke', 'lightslategray')
        .attr('stroke-width', '3px')
        .attr('fill', 'none');

    var circles = svg.selectAll("circle")
        .data(data[0])
        .enter()
        .append("circle");

    circles.attr("cx", function (d, i) {
        return 60 + xScale(i + 1) + 15;
    })
        .attr("cy", function (d, i) {
            return height - 60 - (270 * d / 100);
        })
        .attr("r", 4)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        ;

    var data_legend = [
        {
            "name": "female",
            "color": "orangered"
        },
        {
            "name": "male",
            "color": "#ffd900"
        }
    ];
    var legend = svg.selectAll(".legend")
        .data(data_legend)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-30," + (i * 20 + 30) + ")"; });  //transform属性便是整个图例的坐标


    legend.append("rect")

        .attr("x", (width / 40) * 39 + 20)
        .attr("y", 100)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) {
            return d.color
        });

    //绘制图例文字
    legend.append("text")
        .attr("x", (width / 40) * 35)
        .attr("y", 110)
        .style("text-anchor", "head") //样式对齐
        .attr("fill", "lightslategray")
        .text(function (d) {
            return d.name;
        });
    // 设置幕布尺寸
    // let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    // let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // width *= 0.32;
    // height *= 0.5;
    // // 创建SVG
    // let svg = d3.select("body")
    //     .append("svg")
    //     .attr("width", width)
    //     .attr("height", height)
    //     .classed("myHistogramSVG", true);

    // // 数据，类型为string，需要转化为int，否则在比较大小时会把9判定为大于23
    // // 注意若为空，则在画图时默认为0
    // let dataset = get_table_data(table)[column_index - 1];
    // for(let i = 0; i < dataset.length; i++) {
    //     // dataset[i] = parseInt(dataset[i]);
    //     if (dataset[i] !== "") {
    //         dataset[i] = parseFloat(dataset[i]);
    //     } else {
    //         dataset[i] = 0;
    //     }
    // }
    // // console.log(dataset)
    // // console.log(d3.max(dataset))

    // // x坐标轴设置
    // // 比例尺
    // let x_scale = d3.scaleLinear()
    //     .domain([0, dataset.length])
    //     .range([(width / (dataset.length + 2)), width - (width / (dataset.length + 2))]);

    // let x_axis = d3.axisBottom()            // axisBottom表示数字显示在坐标轴的下方
    //     .scale(x_scale)
    //     .ticks(dataset.length);
    // // SVG添加坐标轴
    // svg.append("g")
    //     .attr("class", "x_axis")
    //     .attr('transform', `translate(0, ${height - (height / 15)})`)           // 访问变量
    //     .call(x_axis);
    // // y坐标轴设置
    // // 比例尺
    // let y_scale = d3.scaleLinear()
    //     .domain([0, d3.max(dataset)])
    //     // .range([(height / 20), height * (19 / 20)]);
    //     .range([height * (14 / 15), (height / 15)]);

    // let y_axis = d3.axisLeft()            // axisBottom表示数字显示在坐标轴的下方
    //     .scale(y_scale)
    //     .ticks(10);
    // // SVG添加坐标轴
    // svg.append("g")
    //     .attr("class", "y_axis")
    //     .attr('transform', `translate(${(width / (dataset.length + 2))}, 0)`)           // 访问变量
    //     .call(y_axis);

    // // 绘制矩形
    // let histogram = svg.selectAll("rect")
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //     .attr("x", function (d, i) { return (i + 1.6) * (width / (dataset.length + 2)); })
    //     .attr("y", function (d) { return height * (14 / 15); })
    //     .attr("width", (width / (dataset.length + 2)) * 0.8)
    //     .attr("height", 0)
    //     .attr("fill", function (d, i) { return 'rgba(160, 102, 211)'; })
    //     .on("mouseover", function (d) {
    //         d3.select(this)
    //             .attr("fill", function (d, i) { return 'rgba(65, 105, 225)'; });
    //     })
    //     .on("mouseout", function (d) {
    //         d3.select(this)
    //             .attr("fill", function (d, i) { return 'rgba(160, 102, 211)'; });
    //     })
    //     .transition()               // 动画效果
    //     .duration(1000)
    //     .ease(d3.easeCubicInOut)
    //     .attr("height", function (d) { return Math.abs((d / d3.max(dataset)) * (13 / 15) * height); })
    //     .attr("y", function (d) { return height - (d / d3.max(dataset)) * (13 / 15) * height - (height / 15); });

    // // 绘制折线
    // // 重新构造数据数组
    // let new_dataset = new Array(dataset.length - 1);
    // for (let i = 0; i < new_dataset.length; i++) {
    //     new_dataset[i] = [];
    //     new_dataset[i].push(dataset[i]);
    //     new_dataset[i].push(dataset[i + 1]);
    // }
    // // 绘制线段
    // for(let i = 0; i < new_dataset.length; i++) {

    //     svg.append("line")
    //         .attr("x1",  (i + 2) * (width / (new_dataset.length + 3)))
    //         .attr("y1", (height - (new_dataset[i][0] / d3.max(dataset)) * (13 / 15) * height) - (height / 15))
    //         .attr("x2", (i + 3) * (width / (new_dataset.length + 3)))
    //         .attr("y2", (height - (new_dataset[i][1] / d3.max(dataset)) * (13 / 15) * height) - (height / 15))
    //         .attr("stroke", 'rgba(128, 42, 42)')
    //         .attr("stroke-width", 3);
    // }
    // // 绘制数据点圆圈
    // svg.selectAll("circle")
    //     .data(dataset)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", function (d, i) { return (i + 2) * (width / (dataset.length + 2)); })
    //     .attr("cy", function (d) { return (height - (d / d3.max(dataset)) * (13 / 15) * height) - (height / 15); })
    //     .attr("r", 5)
    //     .attr("fill", "white")
    //     .attr("stroke", function (d, i) { return 'rgba(128, 42, 42)'; })
    //     .attr("stroke-width", 1.5);

    // // 创建表格名称
    // let cur_text = table.rows[0].cells[column_index].innerHTML;
    // // console.log(cur_text);
    // svg.append("text")
    //     .text(cur_text)
    //     .style("font-size", "1vw")
    //     .attr("x", (width / 2))
    //     .attr("text-anchor", "middle")
    //     .attr("dominant-baseline", "middle")
    //     .attr("y", (height / 25));
}