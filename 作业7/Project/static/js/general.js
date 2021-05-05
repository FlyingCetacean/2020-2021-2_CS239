let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function gender_histogram(table) {
    let tp = "Gender";
    var data_legend = [
        {
            "name": "female",
            "color": "lightpink"
        },
        {
            "name": "male",
            "color": "lightblue"
        }
    ];
    if (!d3.select("body").selectAll("svg").empty()) {
        d3.select("body").selectAll("svg").remove();
        // console.log("Remove pie chart...");
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
    for (var i = 0; i < data[0].length; i++) {

        mpt.push(100 - data[0][i])
    }
    data[1] = mpt;


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


    let rectWidth = 15;
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

    }).attr('fill', 'lightpink').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', 'lightcoral')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//'click to know more');//"female: " + i + "%");
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightpink').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend, tp);
            // console.log(mon);
        })

        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(0);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    ;


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

    }).attr('fill', 'lightblue').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', 'lightseagreen')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//'click to know more');//"male: " + i + "%");
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightblue').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend, tp);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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
        b[0] = xScale(x + 1) + 60 + 15
        b[1] = height - marge.bottom - yScale(100 - data[0][x])
        lines[x] = b;
    }
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
            return height - marge.bottom - yScale(100 - d);
        })
        .attr("r", 4)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 6); d3.select(this).append("title").text(i + "%");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 4);
        })
        ;


    var legend = svg.selectAll(".legend")
        .data(data_legend)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-30," + (i * 20 + 30) + ")"; });  //transform属性便是整个图例的坐标


    legend.append("rect")

        .attr("x", (width / 40) * 33 + 20)
        .attr("y", 100)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) {
            return d.color
        });

    //绘制图例文字
    legend.append("text")
        .attr("x", (width / 40) * 30)
        .attr("y", 110)
        .style("text-anchor", "head") //样式对齐
        .attr("fill", "lightslategray")
        .text(function (d) {
            return d.name;
        });
    let title_text = "Gender Analysis";
    console.log(title_text);
    svg.append("text")
        .text(title_text)
        .style("font-size", "1vw").attr('fill', 'lightslategray')
        .attr("x", (width / 3))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 25));

    var t = document.body.clientHeight;

    window.scroll({ top: t, left: 0, behavior: 'smooth' });
}

function group_histogram(table) {
    let tp = "Group";
    if (!d3.select("body").selectAll("svg").empty()) {
        d3.select("body").selectAll("svg").remove();
        // console.log("Remove pie chart...");
    }
    var data_legend = [
        {
            "name": "bussinessman",
            "color": "orangered"
        },
        {
            "name": "tourist",
            "color": "#ffd900"
        }
    ];
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.4;
    height *= 0.5;
    let marge = { top: 60, bottom: 60, left: 60, right: 260 };
    // var tableObj = document.getElementById("data_table");
    var data = new Array(12);

    for (var m = 0; m < 2; m++) {
        var tmp = new Array();
        for (var i = 0; i < 12; i++) {
            tmp.push(parseFloat(get_table_data(table)[m + 7][i]))
        }
        data[m] = tmp;

    }
    console.log(data[0])


    var svg = d3.select("body").append("svg")
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


    let rectWidth = 15;
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

    }).attr('fill', 'orangered').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', '#ff7449')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//"Bussinessman: " + i + "%");
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'orangered').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend, tp);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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

    }).attr('fill', '#ffd900').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition().duration(100)
                .attr('fill', '#fffc49')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//"tourists: " + i + "%");
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#ffd900').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend, tp);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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
        b[0] = xScale(x + 1) + 75
        b[1] = height - marge.bottom - yScale(100 - data[0][x])
        lines[x] = b;
    }
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
            return height - marge.bottom - yScale(100 - d);
        })
        .attr("r", 4)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 6); d3.select(this).append("title").text('click to know more');//i + "%");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 4);
        })
        ;


    var legend = svg.selectAll(".legend")
        .data(data_legend)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-30," + (i * 20 + 30) + ")"; });  //transform属性便是整个图例的坐标


    legend.append("rect")

        .attr("x", (width / 40) * 33 + 20)
        .attr("y", 100)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) {
            return d.color
        });

    //绘制图例文字
    legend.append("text")
        .attr("x", (width / 40) * 30)
        .attr("y", 110)
        .style("text-anchor", "head") //样式对齐
        .attr("fill", "lightslategray")
        .text(function (d) {
            return d.name;
        });



    let title_text = "Group Analysis";
    console.log(title_text);
    svg.append("text")
        .text(title_text)
        .style("font-size", "1vw").attr('fill', 'lightslategray')
        .attr("x", (width / 3))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 25));

    var t = document.body.clientHeight;

    window.scroll({ top: t, left: 0, behavior: 'smooth' });
}

function area_histogram(table) {
    let tp = "Area";
    // var mon = 1;
    let title_text = "Area Analysis";
    if (!d3.select("body").selectAll("svg").empty()) {
        d3.select("body").selectAll("svg").remove();
        // console.log("Remove pie chart...");
    }
    var data_legend = [
        {
            "name": "Local",
            "color": "#FFA07A"
        },
        {
            "name": "USA",
            "color": "#FFE4B5"
        },
        {
            "name": "SA",
            "color": "#90EE90"
        },
        {
            "name": "EU",
            "color": "#AFEEEE"
        },
        {
            "name": "MEA",
            "color": "#DDA0DD"
        },
        {
            "name": "ASIA",
            "color": "#FFC0CB"
        }
    ];
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.4;
    height *= 0.5;
    let marge = { top: 60, bottom: 60, left: 60, right: 260 };
    // var tableObj = document.getElementById("data_table");
    var data = new Array(12);

    for (var m = 0; m < 8; m++) {
        var tmp = new Array();
        for (var i = 0; i < 12; i++) {
            tmp.push(parseFloat(get_table_data(table)[m + 1][i]))
        }
        data[m] = tmp;

    }
    console.log(data[0])


    var svg = d3.select("body").append("svg")
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


    let rectWidth = 15;
    // =============================================
    let Rect_1 = g.selectAll('.rect').data(data[0]).enter().append('g');
    Rect_1.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function () {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#FFA07A')
        .attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition().duration(100)
                .attr('fill', '#ff7449')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//'click to know more');//"Local: " + i + "%");


        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#FFA07A').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend, tp);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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

    }).attr('fill', '#FFE4B5').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition().duration(100)
                .attr('fill', '	#F4A460')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//'click to know more');//"USA: " + i + "%");
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#FFE4B5').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        }).on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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

    let Rect_3 = g.selectAll('.rect').data(data[2]).enter().append('g');
    Rect_3.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#90EE90').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition().duration(100)
                .attr('fill', '#66CDAA')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//'click to know more');//"SA: " + i + "%");
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#90EE90').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(data[0][i] + data[1][i]);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    let Rect_4 = g.selectAll('.rect').data(data[3]).enter().append('g');
    Rect_4.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#AFEEEE').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#87CEEB').attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//'click to know more');//"EU: " + i + "%");
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#AFEEEE').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(data[0][i] + data[1][i] + data[2][i]);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    let Rect_5 = g.selectAll('.rect').data(data[4]).enter().append('g');
    Rect_5
        .append('rect')
        .attr('x', function (d, i) {
            return xScale(monthes[i]) + rectWidth / 4;
        })
        .attr('y', function (d, i) {
            let min = yScale.domain()[0];
            return yScale(min);
        })
        .attr('width', function () {
            return rectWidth;
        })
        .attr('height', function () {
            return 0;
        })
        .attr('fill', '#DDA0DD').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', '#DA70D6')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//'click to know more');//"MEA: " + i + "%");
        })
        .on('mouseout', function (d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', '#DDA0DD')
                .attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });

        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(data[0][i] + data[1][i] + data[2][i] + data[3][i]);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    let Rect_6 = g.selectAll('.rect').data(data[5]).enter().append('g');
    Rect_6.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#FFC0CB').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#DB7093').attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text('click to know more');//'click to know more');//"ASIA: " + i + "%");

        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#FFC0CB').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            console.log((width - marge.left - marge.right) / 12);
            console.log(mon);
            plot_pie_chart(table, mon, data_legend);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(data[0][i] + data[1][i] + data[2][i] + data[3][i] + data[4][i]);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    var lines = [];
    for (var x = 0; x < 12; x++) {
        var b = [];
        b[0] = xScale(x + 1) + 75
        b[1] = height - marge.bottom - yScale(100 - data[0][x])
        lines[x] = b;
    }
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
            return height - marge.bottom - yScale(100 - d);//  ;
        })
        .attr("r", 4)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 6);
            d3.select(this).append("title").text('click to know more');//i + "%");

        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 4);

        })
        ;


    var legend = svg.selectAll(".legend")
        .data(data_legend)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-30," + (i * 20 + 30) + ")"; });  //transform属性便是整个图例的坐标


    legend.append("rect")

        .attr("x", (width / 40) * 33 + 20)
        .attr("y", 100)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) {
            return d.color
        });

    //绘制图例文字
    legend.append("text")
        .attr("x", (width / 40) * 30)
        .attr("y", 110)
        .style("text-anchor", "head") //样式对齐
        .attr("fill", "lightslategray")
        .text(function (d) {
            return d.name;
        });




    console.log(title_text);
    svg.append("text")
        .text(title_text)
        .style("font-size", "1vw").attr('fill', 'lightslategray')
        .attr("x", (width / 3))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 25));

    var t = document.body.clientHeight;

    window.scroll({ top: t, left: 0, behavior: 'smooth' });
}


function age_histogram(table) {
    let tp = "Age";
    if (!d3.select("body").selectAll("svg").empty()) {
        d3.select("body").selectAll("svg").remove();
        // console.log("Remove pie chart...");
    }
    var data_legend = [
        {
            "name": "u20",
            "color": "#FFA07A"
        },
        {
            "name": "20to35",
            "color": "#FFE4B5"
        },
        {
            "name": "35to55",
            "color": "#90EE90"
        },
        {
            "name": "m55",
            "color": "#AFEEEE"
        }
    ];
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.4;
    height *= 0.5;
    let marge = { top: 60, bottom: 60, left: 60, right: 260 };
    // var tableObj = document.getElementById("data_table");
    var data = new Array(12);

    for (var m = 0; m < 4; m++) {
        var tmp = new Array();
        for (var i = 0; i < 12; i++) {
            tmp.push(parseFloat(get_table_data(table)[m + 12][i]))
        }
        data[m] = tmp;

    }
    console.log(data[0])


    var svg = d3.select("body").append("svg")
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


    let rectWidth = 15;
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

    }).attr('fill', '#FFA07A').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#ff7449').attr("transform", 'translate(-2,0)')
            .attr('width', function () {
                return rectWidth * 1.2;
            }); d3.select(this).append("title").text('click to know more');//"u20" + i + "%");
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#FFA07A').attr("transform", 'translate(0,0)')
            .attr('width', function () {
                return rectWidth;
            });
    })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            plot_pie_chart(table, mon, data_legend, tp);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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

    }).attr('fill', '#FFE4B5').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '	#F4A460').attr("transform", 'translate(-2,0)')
            .attr('width', function () {
                return rectWidth * 1.2;
            }); d3.select(this).append("title").text('click to know more');//"20-35: " + i + "%");
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#FFE4B5').attr("transform", 'translate(0,0)')
            .attr('width', function () {
                return rectWidth;
            });
    })
        .on('click', function (d) {
            var mon;
            // var rect = d3.select(this);
            let elem = document.querySelector('rect');
            // let rect = elem.getBoundingClientRect();
            var rx = elem.getBoundingClientRect();

            mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
            plot_pie_chart(table, mon, data_legend, tp);
            // console.log(mon);
        })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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

    let Rect_3 = g.selectAll('.rect').data(data[2]).enter().append('g');
    Rect_3.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#90EE90').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#66CDAA').attr("transform", 'translate(-2,0)')
            .attr('width', function () {
                return rectWidth * 1.2;
            }); d3.select(this).append("title").text('click to know more');//"35-55: " + i + "%");
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#90EE90').attr("transform", 'translate(0,0)')
            .attr('width', function () {
                return rectWidth;
            });
    }).on('click', function (d) {
        var mon;
        // var rect = d3.select(this);
        let elem = document.querySelector('rect');
        // let rect = elem.getBoundingClientRect();
        var rx = elem.getBoundingClientRect();

        mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
        plot_pie_chart(table, mon, data_legend, tp);
        // console.log(mon);
    })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(data[0][i] + data[1][i]);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    let Rect_4 = g.selectAll('.rect').data(data[3]).enter().append('g');
    Rect_4.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#AFEEEE').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#87CEEB').attr("transform", 'translate(-2,0)')
            .attr('width', function () {
                return rectWidth * 1.2;
            }); d3.select(this).append("title").text('click to know more');//"m55: " + i + "%");
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#AFEEEE').attr("transform", 'translate(0,0)')
            .attr('width', function () {
                return rectWidth;
            });
    }).on('click', function (d) {
        var mon;
        // var rect = d3.select(this);
        let elem = document.querySelector('rect');
        // let rect = elem.getBoundingClientRect();
        var rx = elem.getBoundingClientRect();

        mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
        plot_pie_chart(table, mon, data_legend, tp);
        // console.log(mon);
    })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(data[0][i] + data[1][i] + data[2][i]);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    var lines = [];
    for (var x = 0; x < 12; x++) {
        var b = [];
        b[0] = xScale(x + 1) + 75
        b[1] = height - marge.bottom - yScale(100 - data[0][x])
        lines[x] = b;
    }
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
            return height - marge.bottom - yScale(100 - d);//  ;
        })
        .attr("r", 4)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 6); d3.select(this).append("title").text('click to know more');//i + "%");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 4);
        })
        ;


    var legend = svg.selectAll(".legend")
        .data(data_legend)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-30," + (i * 20 + 30) + ")"; });  //transform属性便是整个图例的坐标


    legend.append("rect")

        .attr("x", (width / 40) * 33 + 20)
        .attr("y", 100)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) {
            return d.color
        });

    //绘制图例文字
    legend.append("text")
        .attr("x", (width / 40) * 30)
        .attr("y", 110)
        .style("text-anchor", "head") //样式对齐
        .attr("fill", "lightslategray")
        .text(function (d) {
            return d.name;
        });


    //title
    let title_text = "Age Analysis";
    
    svg.append("text")
        .text(title_text)
        .style("font-size", "1vw")
        .attr('fill', 'lightslategray')
        .attr("x", (width / 3))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 25))
        


    var t = document.body.clientHeight;

    window.scroll({ top: t, left: 0, behavior: 'smooth' });
}

function res_histogram(table) {
    let tp = "Reservation";

    var data_legend = [
        {
            "name": "DR",
            "color": "#FFA07A"
        },
        {
            "name": "agency",
            "color": "#FFE4B5"
        },
        {
            "name": "AC",
            "color": "#90EE90"
        }
    ];

    if (!d3.select("body").selectAll("svg").empty()) {
        d3.select("body").selectAll("svg").remove();
        // console.log("Remove pie chart...");
    }

    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.4;
    height *= 0.5;
    let marge = { top: 60, bottom: 60, left: 60, right: 260 };
    // var tableObj = document.getElementById("data_table");
    var data = new Array(12);

    for (var m = 0; m < 3; m++) {
        var tmp = new Array();
        for (var i = 0; i < 12; i++) {
            tmp.push(parseFloat(get_table_data(table)[m + 9][i]))
        }
        data[m] = tmp;

    }
    console.log(data[0])


    var svg = d3.select("body").append("svg")
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


    let rectWidth = 15;
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

    }).attr('fill', '#FFA07A').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#ff7449').attr("transform", 'translate(-2,0)')
            .attr('width', function () {
                return rectWidth * 1.2;
            }); d3.select(this).append("title").text('click to know more');//"DR: " + i + "%");
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#FFA07A').attr("transform", 'translate(0,0)')
            .attr('width', function () {
                return rectWidth;
            });
    }).on('click', function (d) {
        var mon;
        // var rect = d3.select(this);
        let elem = document.querySelector('rect');
        // let rect = elem.getBoundingClientRect();
        var rx = elem.getBoundingClientRect();

        mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
        plot_pie_chart(table, mon, data_legend, tp);
        // console.log(mon);
    })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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

    }).attr('fill', '#FFE4B5').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '	#F4A460').attr("transform", 'translate(-2,0)')
            .attr('width', function () {
                return rectWidth * 1.2;
            }); d3.select(this).append("title").text('click to know more');//"agency: " + i + "%");
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#FFE4B5').attr("transform", 'translate(0,0)')
            .attr('width', function () {
                return rectWidth;
            });
    }).on('click', function (d) {
        var mon;
        // var rect = d3.select(this);
        let elem = document.querySelector('rect');
        // let rect = elem.getBoundingClientRect();
        var rx = elem.getBoundingClientRect();

        mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
        plot_pie_chart(table, mon, data_legend, tp);
        // console.log(mon);
    })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
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

    let Rect_3 = g.selectAll('.rect').data(data[2]).enter().append('g');
    Rect_3.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#90EE90').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#66CDAA').attr("transform", 'translate(-2,0)')
            .attr('width', function () {
                return rectWidth * 1.2;
            }); d3.select(this).append("title").text('click to know more');//"AC: " + i + "%");
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#90EE90').attr("transform", 'translate(0,0)')
            .attr('width', function () {
                return rectWidth;
            });
    }).on('click', function (d) {
        var mon;
        // var rect = d3.select(this);
        let elem = document.querySelector('rect');
        // let rect = elem.getBoundingClientRect();
        var rx = elem.getBoundingClientRect();

        mon = parseInt((d.x - rx.left) / ((width - marge.left - marge.right) / 12) + 1);
        plot_pie_chart(table, mon, data_legend, tp);
        // console.log(mon);
    })
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(data[0][i] + data[1][i]);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });



    var lines = [];
    for (var x = 0; x < 12; x++) {
        var b = [];
        b[0] = xScale(x + 1) + 75
        b[1] = height - marge.bottom - yScale(100 - data[0][x])
        lines[x] = b;
    }
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
            return height - marge.bottom - yScale(100 - d);//  ;
        })
        .attr("r", 4)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 6); d3.select(this).append("title").text('click to know more');//i + "%");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 4);
        })
        ;


    var legend = svg.selectAll(".legend")
        .data(data_legend)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-30," + (i * 20 + 30) + ")"; });  //transform属性便是整个图例的坐标


    legend.append("rect")

        .attr("x", (width / 40) * 33 + 20)
        .attr("y", 100)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) {
            return d.color
        });

    //绘制图例文字
    legend.append("text")
        .attr("x", (width / 40) * 30)
        .attr("y", 110)
        .style("text-anchor", "head") //样式对齐
        .attr("fill", "lightslategray")
        .text(function (d) {
            return d.name;
        });



    let title_text = "Reservation Analysis";
    console.log(title_text);
    svg.append("text")
        .text(title_text)
        .style("font-size", "1vw").attr('fill', 'lightslategray')
        .attr("x", (width / 3))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 25));
    var t = document.body.clientHeight;

    window.scroll({ top: t, left: 0, behavior: 'smooth' });
}

function occ_histogram(table) {
    if (!d3.select("body").selectAll("svg").empty()) {
        d3.select("body").selectAll("svg").remove();
        // console.log("Remove pie chart...");
    }
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.4;
    height *= 0.5;

    let marge = { top: 60, bottom: 60, left: 60, right: 260 };
    // var tableObj = document.getElementById("data_table");
    var data = new Array();
    for (var i = 0; i < 12; i++) {
        data.push(parseFloat(get_table_data(table)[18][i]))
    }
    console.log(data)

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


    let rectWidth = 15;
    // =============================================
    let Rect_1 = g.selectAll('.rect').data(data).enter().append('g');
    Rect_1.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#ff891b').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', '#ffd782')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text("Occupancy: " + i + "%");
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#ff891b').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(0);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    var lines = [];
    for (var x = 0; x < 12; x++) {
        var b = [];
        b[0] = xScale(x + 1) + 60 + 15
        b[1] = height - marge.bottom - yScale(100 - data[x])
        lines[x] = b;
    }
    var linePath = d3.line()
    svg.append('path')
        .attr('d', linePath(lines))
        .attr('stroke', 'lightslategray')
        .attr('stroke-width', '3px')
        .attr('fill', 'none');

    var circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle");

    circles.attr("cx", function (d, i) {
        return 60 + xScale(i + 1) + 15;
    })
        .attr("cy", function (d, i) {
            return height - marge.bottom - yScale(100 - d);
        })
        .attr("r", 4)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 6); d3.select(this).append("title").text('click to know more');//i + "%");
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 4);
        })
        ;

    var data_legend = [
        {
            "name": "Occupancy",
            "color": "#ff891b"
        }
    ];
    var legend = svg.selectAll(".legend")
        .data(data_legend)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-30," + (i * 20 + 30) + ")"; });  //transform属性便是整个图例的坐标


    legend.append("rect")

        .attr("x", (width / 40) * 33 + 20)
        .attr("y", 100)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) {
            return d.color
        });

    //绘制图例文字
    legend.append("text")
        .attr("x", (width / 40) * 30)
        .attr("y", 110)
        .style("text-anchor", "head") //样式对齐
        .attr("fill", "lightslategray")
        .text(function (d) {
            return d.name;
        });
    let title_text = "Occupancy Analysis";
    console.log(title_text);
    svg.append("text")
        .text(title_text)
        .style("font-size", "1vw").attr('fill', 'lightslategray')
        .attr("x", (width / 3))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 25));
    var t = document.body.clientHeight;

    window.scroll({ top: t, left: 0, behavior: 'smooth' });
}
function price_histogram(table) {
    if (!d3.select("body").selectAll("svg").empty()) {
        d3.select("body").selectAll("svg").remove();
        // console.log("Remove pie chart...");
    }
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    width *= 0.4;
    height *= 0.5;

    let marge = { top: 60, bottom: 60, left: 60, right: 260 };
    // var tableObj = document.getElementById("data_table");
    var data = new Array();
    for (var i = 0; i < 12; i++) {
        data.push(parseFloat(get_table_data(table)[16][i]))
    }
    console.log(data)

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
        .domain([0, d3.max(data)+10])
        .range([height - marge.top - marge.bottom, 0]);
    let yAxis = d3.axisLeft(yScale);



    g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
        .selectAll('text').attr('transform', 'rotate(45 -20 20)');
    g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
        .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
            return width - marge.left - marge.right;
        });


    let rectWidth = 15;
    // =============================================
    let Rect_1 = g.selectAll('.rect').data(data).enter().append('g');
    Rect_1.append('rect').attr('x', function (d, i) {
        return xScale(monthes[i]) + rectWidth / 4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;

    }).attr('fill', '#bb839d').attr('cursor', 'pointer')
        .on('mouseover', function (d, i) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('fill', '#bc654d')
                .attr("transform", 'translate(-2,0)')
                .attr('width', function () {
                    return rectWidth * 1.2;
                });
            d3.select(this).append("title").text("Price: " +"$"+ i );
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#bb839d').attr("transform", 'translate(0,0)')
                .attr('width', function () {
                    return rectWidth;
                });
        })
        
        .transition().duration(800).delay(function (d, i) {
            return i * 50;
        })
        //.ease(d3.easeBack)
        .attr("y", function (d, i) {

            let new_y = yScale(0);
            return new_y - (height - marge.top - marge.bottom - yScale(d));
        })
        .attr("height", function (d, i) {
            return height - marge.top - marge.bottom - yScale(d);
        });

    var lines = [];
    for (var x = 0; x < 12; x++) {
        var b = [];
        b[0] = xScale(x + 1) + 60 + 15
        b[1] = height - marge.bottom - yScale(100 - data[x])
        lines[x] = b;
    }
    var linePath = d3.line()
    svg.append('path')
        .attr('d', linePath(lines))
        .attr('stroke', 'lightslategray')
        .attr('stroke-width', '3px')
        .attr('fill', 'none');

    var circles = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle");

    circles.attr("cx", function (d, i) {
        return 60 + xScale(i + 1) + 15;
    })
        .attr("cy", function (d, i) {
            return height - marge.bottom - yScale(100 - d);
        })
        .attr("r", 4)
        .attr("stroke", "lightslategray")
        .attr("stroke-width", 2)
        .attr("fill", "white")
        .on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 6); d3.select(this).append("title").text("$"+i);
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100)
                .attr('r', 4);
        })
        ;

    var data_legend = [
        {
            "name": "Price",
            "color": "#bb839d"
        }
    ];
    var legend = svg.selectAll(".legend")
        .data(data_legend)
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(-30," + (i * 20 + 30) + ")"; });  //transform属性便是整个图例的坐标


    legend.append("rect")

        .attr("x", (width / 40) * 33 + 20)
        .attr("y", 100)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d) {
            return d.color
        });

    //绘制图例文字
    legend.append("text")
        .attr("x", (width / 40) * 30)
        .attr("y", 110)
        .style("text-anchor", "head") //样式对齐
        .attr("fill", "lightslategray")
        .text(function (d) {
            return d.name;
        });
    let title_text = "Price Analysis";
    console.log(title_text);
    svg.append("text")
        .text(title_text)
        .style("font-size", "1vw").attr('fill', 'lightslategray')
        .attr("x", (width / 3))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("y", (height / 25));
    var t = document.body.clientHeight;

    window.scroll({ top: t, left: 0, behavior: 'smooth' });
}
