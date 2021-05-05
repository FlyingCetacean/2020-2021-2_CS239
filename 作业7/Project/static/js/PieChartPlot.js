



function plot_pie_chart(table, i, data_legend, tp) {
    // 删除旧的SVG，若无svg，selectAll()方法会创建一个空选择集并返回
    if (!d3.select("body").selectAll("svg").filter('.myPieChartSVG').empty()) {
        d3.select("body").selectAll("svg").filter('.myPieChartSVG').remove();
        // console.log("Remove pie chart...");
    }
    var date_index = i;
    console.log("mon: " + i + '  ' + "type: " + tp);
    // 设置幕布尺寸
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.3;
    height *= 0.2;


    // 创建SVG
    let svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .classed("myPieChartSVG", true);

    let ori_dataset = get_table_data(table);
    let dataset = [];
    let dataset_type_name = [];
    let amount = 0;

    if (tp == "Area") {
        for (let i = 1; i < table.getElementsByTagName("tr")[0].cells.length; i++) {
            let type_name = table.getElementsByTagName("tr")[0].cells[i].innerHTML;
            if (type_name === "USA" || type_name === "SA" || type_name === "EU" || type_name === "MEA" || type_name === "ASIA" || type_name === "Local") {
                // 符合条件的类名入列
                dataset_type_name.push(type_name);
                // 创建一个空列表
                dataset[amount] = [];
                // 数据拷贝
                for (let j = 0; j < ori_dataset[i - 1].length; j++) {
                    dataset[amount][j] = ori_dataset[i - 1][j];
                    // 类型转化
                    if (dataset[amount][j] !== "") {
                        dataset[amount][j] = parseFloat(dataset[amount][j]);
                    } else {
                        dataset[amount][j] = 0;
                    }
                }
                amount += 1;
            }
        }

    }
    if (tp == "Age") {
        for (let i = 1; i < table.getElementsByTagName("tr")[0].cells.length; i++) {
            let type_name = table.getElementsByTagName("tr")[0].cells[i].innerHTML;
            if (type_name === "U20" || type_name === "20-35" || type_name === "35-55" || type_name === "M55") {
                // 符合条件的类名入列
                dataset_type_name.push(type_name);
                // 创建一个空列表
                dataset[amount] = [];
                // 数据拷贝
                for (let j = 0; j < ori_dataset[i - 1].length; j++) {
                    dataset[amount][j] = ori_dataset[i - 1][j];
                    // 类型转化
                    if (dataset[amount][j] !== "") {
                        dataset[amount][j] = parseFloat(dataset[amount][j]);
                    } else {
                        dataset[amount][j] = 0;
                    }
                }
                amount += 1;
            }
        }

    }
    if (tp == "Reservation") {
        for (let i = 1; i < table.getElementsByTagName("tr")[0].cells.length; i++) {
            let type_name = table.getElementsByTagName("tr")[0].cells[i].innerHTML;
            if (type_name === "DR" || type_name === "Agency" || type_name === "AC") {
                // 符合条件的类名入列
                dataset_type_name.push(type_name);
                // 创建一个空列表
                dataset[amount] = [];
                // 数据拷贝
                for (let j = 0; j < ori_dataset[i - 1].length; j++) {
                    dataset[amount][j] = ori_dataset[i - 1][j];
                    // 类型转化
                    if (dataset[amount][j] !== "") {
                        dataset[amount][j] = parseFloat(dataset[amount][j]);
                    } else {
                        dataset[amount][j] = 0;
                    }
                }
                amount += 1;
            }
        }

    }
    if (tp == "Group") {
        for (let i = 1; i < table.getElementsByTagName("tr")[0].cells.length; i++) {
            let type_name = table.getElementsByTagName("tr")[0].cells[i].innerHTML;
            if (type_name === "Businessmen" || type_name === "Tourists") {
                // 符合条件的类名入列
                dataset_type_name.push(type_name);
                // 创建一个空列表
                dataset[amount] = [];
                // 数据拷贝
                console.log(ori_dataset[i - 1].length)
                for (let j = 0; j < ori_dataset[i - 1].length; j++) {

                    dataset[amount][j] = ori_dataset[i - 1][j];
                    // 类型转化
                    if (dataset[amount][j] !== "") {
                        dataset[amount][j] = parseFloat(dataset[amount][j]);
                    } else {
                        dataset[amount][j] = 0;
                    }
                }
                amount += 1;
            }
        }

    }
    if (tp == "Gender") {
        amount = 2;
        // for (let i = 1; i < table.getElementsByTagName("tr")[0].cells.length; i++) {
        //     let type_name = table.getElementsByTagName("tr")[0].cells[i].innerHTML;
        //     if (type_name === "Female") {
        // 符合条件的类名入列
        dataset_type_name.push("Female");
        dataset_type_name.push("Male");
        // 创建一个空列表
        dataset[0] = [];
        dataset[1] = [];
        // 数据拷贝
        for (let j = 0; j < ori_dataset[i - 1].length; j++) {
            dataset[0][j] = ori_dataset[i - 1][j];
            // 类型转化
            if (dataset[0][j] !== "") {
                dataset[0][j] = parseFloat(dataset[0][j]);
            } else {
                dataset[0][j] = 0;
            }
            dataset[1][j] = 100 - dataset[0][j]
        }
        //     }
        // }

    }

    let ori_data = [];
    for (let i = 0; i < amount; i++) {
        let info = { key: dataset_type_name[i], value: dataset[i][date_index - 1] };
        ori_data.push(info);
    }
    console.log(ori_data);

    let pie_chart = svg.append("g").attr("transform", `translate(${(width / 5)}, ${(height / 5)})`);

    // 饼图相关尺寸
    // 半径
    let radius = Math.min(width, height) * 0.6 / 2;
    // 弧
    let arc = d3.arc()
        .innerRadius(20)
        .cornerRadius(5);

    let draw_data = d3.pie()
        .value(function (d) { return d.value; })
        .sort(null)
        .sortValues(null)
        .startAngle(0)
        .endAngle(Math.PI * 2)
        .padAngle(0.05)(ori_data)
    console.log(draw_data)

    // 颜色块设置
    let color_scale = d3.scaleOrdinal()
        .domain(d3.range(0, ori_data.length))
        .range(d3.schemeSet1);

    // path标签：可以组成任何形状的形状
    pie_chart.append("g")
        .attr("transform", `translate(${radius}, ${radius})`)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 1)
        .selectAll("path")
        .data(draw_data)
        .enter()
        .append("path")
        .attr('class', "pie")
        .attr("fill", function (d) { return data_legend[d.index].color })
        .attr("d", function (d) {
            d.outerRadius = radius;
            return arc(d);
        })
        // .on("mouseover",  arcTween(radius + 10, 0) )
        // .on("click", arcTween(radius + 10, 0))
        .on("mouseover", function (d, i) {

            d3.selectAll("path").filter(".pie").attr('opacity', 0.5);
            d3.select(this)
                .attr('opacity', 1)
                .attr("d", function (d) {
                    d.outerRadius = radius + 10;
                    return arc(d);
                });
            if (!d3.select("body").selectAll("text").filter(".message").empty()) {
                d3.select("body").selectAll("text").filter(".message").remove();
            }
            svg
                .append('text')
                .classed("message", true)
                .text(i.value + "%")
                .attr('x', width / 5 + radius - 10)
                .attr('fill', 'lightslategray')
                .attr('font-size', '14px')
                .attr('y', height / 5 + radius + 4);
        })
        .on('mouseout', function () {
            d3.select(this)
                .transition().delay(100)
                .attr("d", function (d) {
                    d.outerRadius = radius;
                    return arc(d);
                });
            d3.selectAll("path").filter(".pie")

                .attr('opacity', 1);
        })
        // .on("mouseout", arcTween(radius, 150))
        .transition()
        .duration(500)
        .attrTween("d", function (d) {
            //初始加载时的过渡效果
            let fn = d3.interpolate({ endAngle: d.startAngle }, d)
            return function (t) { return arc(fn(t)) }
        })

    // function arcTween(outerRadius, delay) {

    //     console.log("#")
    //     return function () {
    //         let subPart = d3.select(this)
    //             .transition()
    //             .delay(delay)
    //             .attrTween('d', function (d) {
    //                 let i = d3.interpolate(d.outerRadius, outerRadius)
    //                 return function (t) { d.outerRadius = i(t); return arc(d) }
    //             });
    //     }
    // }



    // 图例，容器
    let legend = pie_chart.append("g")
        .attr("transform", `translate(${radius * 2}, 0)`)
        .selectAll("g")
        .data(draw_data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) { return `translate(${width / 10}, ${i * height / 10})` });

    // 图例中的颜色条
    legend.append("rect")
        .attr("width", height / 17)
        .attr("height", height / 17)
        .attr("fill", function (d) { return data_legend[d.index].color });

    // 图例中的文字
    legend.append("text")
        .text(function (d) { return d.data.key })
        .style("font-size", 13)
        .attr("y", "1em")
        .attr("x", "3em")
        .attr('fill', 'lightslategray')
        .attr("dy", -3)

    let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

    // 创建表格名称
    let cur_text =tp+ " Distribution in  " + months[date_index - 1];
    console.log(cur_text);
    svg.append("text")
        .text(cur_text)
        .style("font-size", "1vw")
        .attr("x", (width / 2.5))
        .attr("text-anchor", "middle")
        .attr('fill', 'lightslategray')
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 20));

}