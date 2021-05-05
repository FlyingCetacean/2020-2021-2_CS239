// HeatmapPlot.js

function plot_heatmap(table) {

    // 删除旧的SVG，若无svg，selectAll()方法会创建一个空选择集并返回
    if (!d3.select("body").selectAll("svg").empty()) {
        d3.select("body").selectAll("svg").remove();

    }
    // 设置幕布尺寸
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.6;
    height *= 0.6;
    // 创建SVG
    let svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .classed("myHeatmapSVG", true);

    // 数据处理
    // get_table_data(table) 函数返回数据类型为string，需要转化为double，否则在比较大小时会把9判定为大于23
    // 注意若为空，则在画图时默认为0
    let dataset = get_table_data(table);
    for (let i = 0; i < dataset.length; i++) {
        for (let j = 0; j < dataset[0].length; j++) {
            if (dataset[i][j] !== "") {
                dataset[i][j] = parseFloat(dataset[i][j]);
            } else {
                dataset[i][j] = 0;
            }
        }
    }
    // 添加类名列表
    let type_name_array = [];
    for (let i = 1; i < table.getElementsByTagName("tr")[0].cells.length; i++) {
        // 读取类名并记录
        let type_name = table.getElementsByTagName("tr")[0].cells[i].innerHTML;
        type_name_array.push(type_name);
    }

    console.log(type_name_array);
    console.log(dataset)

    // 颜色级别
    let colors = ["#fcffd9", "#f8f7b1", "#fff280", "#ffd17d", "#ffb547", "#ff8513", "#ff5a0e", "#ff3c00", "#b8160a", "#860000", "#570303", "#360b0b"];
    // 图例，月份
    let months = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."]

    // 绘制矩形
    let heatmap = svg.selectAll("rect");

    for (let i = 0; i < dataset.length; i++) {
        heatmap.data(dataset[i])
            .enter()
            .append("rect")
            .attr("x", function (d, j) { return 15 + (j + 1) * (width / (dataset[0].length + 5)); })
            .attr("y", function (d) { return (i + 1) * (height / (dataset.length)) * (13 / 15) + height / 15; })
            .attr("width", (width / (dataset[0].length + 5)) * 0.8)
            .attr("height", (height * (13 / 15) / dataset.length) * 0.8)
            .on("mouseover", function (d, j) {
                d3.select(this)
                    .attr("width", (width / (dataset[0].length + 5)))
                    .attr("height", (height * (13 / 15) / dataset.length))
                    .attr('transform', 'translate(-5,-2)');
                d3.selectAll("rect").attr('opacity', 0.3);
                // d3.selectAll("rect").attr('opacity', 0.3);
                d3.select(this).attr('opacity', 1);
                if (i < 16 || i == 18) {
                    if (!d3.select("body").selectAll("text").filter(".message").empty()) {
                        d3.select("body").selectAll("text").filter(".message").remove();

                    }
                    svg
                        .append("text")
                        .classed("message", true)
                        .text(type_name_array[i])
                        // .text(title_text)
                        .style("font-size", "2vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.88))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.3);
                    svg
                        .append("text")
                        .classed("message", true)
                        .text(j + "%")
                        // .text(title_text)
                        .style("font-size", "5vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.88))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.5);

                }
                else if (i == 16) {
                    if (!d3.select("body").selectAll("text").filter(".message").empty()) {
                        d3.select("body").selectAll("text").filter(".message").remove();

                    }
                    svg
                        .append("text")
                        .classed("message", true)
                        .text(type_name_array[i])
                        // .text(title_text)
                        .style("font-size", "2vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.88))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.3);


                    svg
                        .append("text")
                        .classed("message", true)
                        .text("$ " + j)
                        // .text(title_text)
                        .style("font-size", "4vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.86))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.5);

                }
                else if (i == 17) {
                    if (!d3.select("body").selectAll("text").filter(".message").empty()) {
                        d3.select("body").selectAll("text").filter(".message").remove();

                    }
                    svg
                        .append("text")
                        .classed("message", true)
                        .text(type_name_array[i])
                        // .text(title_text)
                        .style("font-size", "2vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.88))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.3);


                    svg
                        .append("text")
                        .classed("message", true)
                        .text(j)
                        // .text(title_text)
                        .style("font-size", "4.5vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.85))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.5);
                    svg
                        .append("text")
                        .classed("message", true)
                        .text("days")
                        // .text(title_text)
                        .style("font-size", "2vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.85 + 100))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.55);

                }
                else if (i == 19) {
                    if (!d3.select("body").selectAll("text").filter(".message").empty()) {
                        d3.select("body").selectAll("text").filter(".message").remove();

                    }
                    svg
                        .append("text")
                        .classed("message", true)
                        .text(type_name_array[i])
                        // .text(title_text)
                        .style("font-size", "2vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.88))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.3);


                    svg
                        .append("text")
                        .classed("message", true)
                        .text(j)
                        // .text(title_text)
                        .style("font-size", "4vw").attr('fill', 'lightslategray')
                        .attr("x", (width * 0.86))
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("y", height * 0.5);

                }
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .attr("width", (width / (dataset[0].length + 5)) * 0.8)
                    .attr("height", (height * (13 / 15) / dataset.length) * 0.8)
                    .attr('transform', 'translate(0,0)');

                d3.selectAll("rect").attr('opacity', 1);

                if (!d3.select("body").selectAll("text").filter(".message").empty()) {
                    d3.select("body").selectAll("text").filter(".message").remove();
                }

            })
            .attr("fill", "#ffffd9")
            .classed("myHeatmap", true)
            .attr("stroke", "#A1A1A1")
            // .attr("stroke", "black")
            .transition()               // 动画效果
            .duration(800)
            .attr("fill", function (d, j) {
                let idx = search_rank_pos(dataset[i][j], dataset[i]);
                // console.log("dataset["+i+"]["+j+"], dataset["+i+"]"+dataset[i][j], dataset[i])
                // console.log("idx"+idx);
                return colors[idx];
            })
    }

    let month_legend = svg.selectAll(".month_legend")
        .data(months)
        .enter()
        .append("g")
        .classed("month_legend", true)
        .append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, j) { return 10 + (j + 1.2) * (width / (dataset[0].length + 5)); })
        .attr("y", height / 10)
        .attr('fill', 'lightslategray')
        .style("font-size", 13);


    let type_name_legend = svg.selectAll(".type_name_legend")
        .data(type_name_array)
        .enter()
        .append("g")
        .classed("type_name_legend", true)
        .attr("width", "auto")
        .append("text")
        .attr('fill', 'lightslategray')
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, j) { return (j + 1.2) * (height / (dataset.length)) * (13 / 15) + height / 15; })
        .attr("dy", "1em")
        .style("font-size", 10)

    // 创建表格名称
    let header_text = "Heatmap for Hotel California";
    svg.append("text")
        .text(header_text)
        .style("font-size", "1.5vw")
        .attr("x", (width * 0.4))
        .attr('fill', 'lightslategray')
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 30));

    var t = document.body.clientHeight;

    window.scroll({ top: t, left: 0, behavior: 'smooth' });
}