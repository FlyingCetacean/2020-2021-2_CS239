$(document).ready(function () {
    $("#displayFile").click(function () {

        var reader = new FileReader();
        reader.onload = function (e) {
            var table = $("<table id='data_table'/>");
            var datas = e.target.result.split("\n");
            // alert(datas.length)
            for (var i = 0; i < datas.length; ++i) {
                var row_datas = datas[i].split(",");

                var row = $("<tr />");
                if (i % 2 == 0) {
                    row = $("<tr class='treven' />");
                } else {
                    row = $("<tr class='trodd' />");
                }
                if (i == 0) {
                    row = $("<tr class='title' />");
                }

                if (i != 0) {
                    var cell = $('<td>');
                    cell.html(i);
                    row.append(cell);
                } else {
                    row.append('<td>month</td>');
                }


                for (var j = 0; j < row_datas.length; ++j) {
                    var column = $("<td contenteditable='true' />");
                    column.html(row_datas[j]);
                    row.append(column);
                }

                // }

                if (i != 0) {
                    row.append('<td><input type="button" value="Delete" id="deleteRow"></td>');
                } else {
                    row.append('<td>Operation</td>');
                }
                table.append(row);
            }
            $("#display").html('').append(table);
            document.getElementById("gender").style.backgroundColor = "lightpink";
        document.getElementById("area").style.backgroundColor = "lightcoral";
        document.getElementById("age").style.backgroundColor = "lightpink";
        document.getElementById("occ").style.backgroundColor = "lightpink";
        document.getElementById("res").style.backgroundColor = "lightpink";
        document.getElementById("group").style.backgroundColor = "lightpink";
        var width = 800;
        var height = 500;
        let marge = { top: 60, bottom: 60, left: 60, right: 260 };
        var tableObj = document.getElementById("data_table");
        var data = new Array(12);

        for (var m = 0; m < 8; m++) {
            var tmp = new Array();
            for (var i = 1; i < 13; i++) {
                tmp.push(parseFloat(tableObj.rows[i].cells[m + 2].innerText))
            }
            data[m] = tmp;

        }
        // // for (var m = 0; m < 6; m++){
        //     alert("area" + m + " " + data[m]);
        // // }

        let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append('g')
            .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');


        let xScale = d3.scale.ordinal()
            .domain(monthes)
            .rangeRoundBands([0, width - marge.left - marge.right]);

        // let xAxis = d3.axisBottom(xScale);
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        let yScale = d3.scale.linear()
            .domain([0, 100])
            .range([height - marge.top - marge.bottom, 0]);
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");




        g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
            .selectAll('text').attr('transform', 'rotate(45 -20 20)');
        g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
            .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
                return width - marge.left - marge.right;
            });


        let rectWidth = 30;
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
        }).attr('fill', '#22A7F2').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#2C81F3');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#22A7F2');
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
        }).attr('fill', '#DEC56C').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#CB7730');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#DEC56C');
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
        }).attr('fill', 'lightpink').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'darksalmon');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightpink');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
        }).attr('fill', 'lightgreen').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'darkgreen');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightgreen');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
        Rect_5.append('rect').attr('x', function (d, i) {
            return xScale(monthes[i]) + rectWidth / 4;
        }).attr('y', function (d, i) {
            let min = yScale.domain()[0];
            return yScale(min);
        }).attr('width', function () {
            return rectWidth;
        }).attr('height', function () {
            return 0;
        }).attr('fill', '#f85959').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#ff0303');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#f85959');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
        }).attr('fill', '#9e69ca').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#c403ff');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#9e69ca');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
            })
            //.ease(d3.easeBack)
            .attr("y", function (d, i) {

                let new_y = yScale(data[0][i] + data[1][i] + data[2][i] + data[3][i] + data[4][i]);
                return new_y - (height - marge.top - marge.bottom - yScale(d));
            })
            .attr("height", function (d, i) {
                return height - marge.top - marge.bottom - yScale(d);
            });
        // alert(data[0][0]);

        var lines = [];
        for (var x = 0; x < 12; x++) {
            var b = [];
            b[0] = xScale(x + 1) + 80
            b[1] = height - 60 - (380 * data[0][x] / 100)
            lines[x] = b;
        }
        // alert(lines[0])
        // alert(lines);
        var linePath = d3.svg.line()
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
            return 60 + xScale(i + 1) + 20;
        })
            .attr("cy", function (d, i) {
                return height - 60 - (380 * d / 100);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;

        var data_legend = [
            {
                "name": "LOCAL",
                "color": "#22A7F2"
            },
            {
                "name": "USA",
                "color": "#DEC56C"
            },
            {
                "name": "SA",
                "value": data[2],
                "color": "lightpink"
            },
            {
                "name": "EU",
                "value": data[3],
                "color": "lightgreen"
            },
            {
                "name": "MEA",
                "value": data[4],
                "color": "#f85959"
            },
            {
                "name": "ASIA",
                "value": data[5],
                "color": "#9e69ca"
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
        };
        reader.readAsText($("#uploadFile")[0].files[0]);
    });

    $("#gender").click(function () {
        document.getElementById("gender").style.backgroundColor = "lightcoral";
        document.getElementById("area").style.backgroundColor = "lightpink";
        document.getElementById("age").style.backgroundColor = "lightpink";
        document.getElementById("occ").style.backgroundColor = "lightpink";
        document.getElementById("res").style.backgroundColor = "lightpink";
        document.getElementById("group").style.backgroundColor = "lightpink";
        d3.select("svg").remove();//清除之前画过的图表
        // document.getElementById("title").innerHTML = "sex ratio";
        var width = 800;
        var height = 500;
        let marge = { top: 60, bottom: 60, left: 60, right: 260 };
        var tableObj = document.getElementById("data_table");
        var data = new Array(12);


        var tmp = new Array();
        var mpt = new Array();
        for (var i = 1; i < 13; i++) {
            tmp.push(parseFloat(tableObj.rows[i].cells[1].innerText))
        }
        data[0] = tmp;
        for (var i = 0; i < data[0].length; i++) {

            mpt.push(100 - data[0][i])
        }
        data[1] = mpt;
        // alert(data[0],data[1])
        // // for (var m = 0; m < 6; m++){
        //     alert("area" + m + " " + data[m]);
        // // }

        let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append('g')
            .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');


        let xScale = d3.scale.ordinal()
            .domain(monthes)
            .rangeRoundBands([0, width - marge.left - marge.right]);

        // let xAxis = d3.axisBottom(xScale);
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        let yScale = d3.scale.linear()
            .domain([0, 100])
            .range([height - marge.top - marge.bottom, 0]);
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");




        g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
            .selectAll('text').attr('transform', 'rotate(45 -20 20)');
        g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
            .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
                return width - marge.left - marge.right;
            });


        let rectWidth = 30;
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
        }).attr('fill', '#22A7F2').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#2C81F3');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#22A7F2');
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
        }).attr('fill', '#DEC56C').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#CB7730');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#DEC56C');
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
            b[0] = xScale(x + 1) + 80
            b[1] = height - 60 - (380 * data[0][x] / 100)
            lines[x] = b;
        }
        // alert(lines[0])
        // alert(lines);
        var linePath = d3.svg.line()
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
            return 60 + xScale(i + 1) + 20;
        })
            .attr("cy", function (d, i) {
                return height - 60 - (380 * d / 100);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;

        var data_legend = [
            {
                "name": "female",
                "color": "#22A7F2"
            },
            {
                "name": "male",
                "color": "#DEC56C"
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



    });
    $("#area").click(function () {
        d3.select("svg").remove();//清除之前画过的图表
        document.getElementById("gender").style.backgroundColor = "lightpink";
        document.getElementById("area").style.backgroundColor = "lightcoral";
        document.getElementById("age").style.backgroundColor = "lightpink";
        document.getElementById("occ").style.backgroundColor = "lightpink";
        document.getElementById("res").style.backgroundColor = "lightpink";
        document.getElementById("group").style.backgroundColor = "lightpink";
        var width = 800;
        var height = 500;
        let marge = { top: 60, bottom: 60, left: 60, right: 260 };
        var tableObj = document.getElementById("data_table");
        var data = new Array(12);

        for (var m = 0; m < 8; m++) {
            var tmp = new Array();
            for (var i = 1; i < 13; i++) {
                tmp.push(parseFloat(tableObj.rows[i].cells[m + 2].innerText))
            }
            data[m] = tmp;

        }
        // // for (var m = 0; m < 6; m++){
        //     alert("area" + m + " " + data[m]);
        // // }

        let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append('g')
            .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');


        let xScale = d3.scale.ordinal()
            .domain(monthes)
            .rangeRoundBands([0, width - marge.left - marge.right]);

        // let xAxis = d3.axisBottom(xScale);
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        let yScale = d3.scale.linear()
            .domain([0, 100])
            .range([height - marge.top - marge.bottom, 0]);
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");




        g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
            .selectAll('text').attr('transform', 'rotate(45 -20 20)');
        g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
            .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
                return width - marge.left - marge.right;
            });


        let rectWidth = 30;
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
        }).attr('fill', '#22A7F2').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#2C81F3');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#22A7F2');
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
        }).attr('fill', '#DEC56C').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#CB7730');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#DEC56C');
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
        }).attr('fill', 'lightpink').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'darksalmon');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightpink');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
        }).attr('fill', 'lightgreen').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'darkgreen');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightgreen');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
        Rect_5.append('rect').attr('x', function (d, i) {
            return xScale(monthes[i]) + rectWidth / 4;
        }).attr('y', function (d, i) {
            let min = yScale.domain()[0];
            return yScale(min);
        }).attr('width', function () {
            return rectWidth;
        }).attr('height', function () {
            return 0;
        }).attr('fill', '#f85959').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#ff0303');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#f85959');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
        }).attr('fill', '#9e69ca').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#c403ff');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#9e69ca');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
            })
            //.ease(d3.easeBack)
            .attr("y", function (d, i) {

                let new_y = yScale(data[0][i] + data[1][i] + data[2][i] + data[3][i] + data[4][i]);
                return new_y - (height - marge.top - marge.bottom - yScale(d));
            })
            .attr("height", function (d, i) {
                return height - marge.top - marge.bottom - yScale(d);
            });
        // alert(data[0][0]);

        var lines = [];
        for (var x = 0; x < 12; x++) {
            var b = [];
            b[0] = xScale(x + 1) + 80
            b[1] = height - 60 - (380 * data[0][x] / 100)
            lines[x] = b;
        }
        // alert(lines[0])
        // alert(lines);
        var linePath = d3.svg.line()
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
            return 60 + xScale(i + 1) + 20;
        })
            .attr("cy", function (d, i) {
                return height - 60 - (380 * d / 100);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;

        var data_legend = [
            {
                "name": "LOCAL",
                "color": "#22A7F2"
            },
            {
                "name": "USA",
                "color": "#DEC56C"
            },
            {
                "name": "SA",
                "value": data[2],
                "color": "lightpink"
            },
            {
                "name": "EU",
                "value": data[3],
                "color": "lightgreen"
            },
            {
                "name": "MEA",
                "value": data[4],
                "color": "#f85959"
            },
            {
                "name": "ASIA",
                "value": data[5],
                "color": "#9e69ca"
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



    });
    $("#group").click(function () {
        d3.select("svg").remove();//清除之前画过的图表
        document.getElementById("gender").style.backgroundColor = "lightpink";
        document.getElementById("area").style.backgroundColor = "lightpink";
        document.getElementById("age").style.backgroundColor = "lightpink";
        document.getElementById("occ").style.backgroundColor = "lightpink";
        document.getElementById("res").style.backgroundColor = "lightpink";
        document.getElementById("group").style.backgroundColor = "lightcoral";
        var width = 800;
        var height = 500;
        let marge = { top: 60, bottom: 60, left: 60, right: 260 };
        var tableObj = document.getElementById("data_table");
        var data = new Array(12);

        for (var m = 0; m < 2; m++) {
            var tmp = new Array();
            for (var i = 1; i < 13; i++) {
                tmp.push(parseFloat(tableObj.rows[i].cells[m + 8].innerText))
            }
            data[m] = tmp;

        }
        // // for (var m = 0; m < 6; m++){
        //     alert("area" + m + " " + data[m]);
        // // }

        let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append('g')
            .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');


        let xScale = d3.scale.ordinal()
            .domain(monthes)
            .rangeRoundBands([0, width - marge.left - marge.right]);

        // let xAxis = d3.axisBottom(xScale);
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        let yScale = d3.scale.linear()
            .domain([0, 100])
            .range([height - marge.top - marge.bottom, 0]);
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");




        g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
            .selectAll('text').attr('transform', 'rotate(45 -20 20)');
        g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
            .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
                return width - marge.left - marge.right;
            });


        let rectWidth = 30;
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
        }).attr('fill', '#22A7F2').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#2C81F3');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#22A7F2');
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
        }).attr('fill', '#DEC56C').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#CB7730');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#DEC56C');
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

        
        var lines = [];
        for (var x = 0; x < 12; x++) {
            var b = [];
            b[0] = xScale(x + 1) + 80
            b[1] = height - 60 - (380 * data[0][x] / 100)
            lines[x] = b;
        }
        // alert(lines[0])
        // alert(lines);
        var linePath = d3.svg.line()
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
            return 60 + xScale(i + 1) + 20;
        })
            .attr("cy", function (d, i) {
                return height - 60 - (380 * d / 100);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;

        var data_legend = [
            {
                "name": "bussinessman",
                "color": "#22A7F2"
            },
            {
                "name": "tourist",
                "color": "#DEC56C"
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



    });
    $("#res").click(function () {
        d3.select("svg").remove();//清除之前画过的图表
        document.getElementById("gender").style.backgroundColor = "lightpink";
        document.getElementById("area").style.backgroundColor = "lightpink";
        document.getElementById("age").style.backgroundColor = "lightpink";
        document.getElementById("occ").style.backgroundColor = "lightpink";
        document.getElementById("res").style.backgroundColor = "lightcoral";
        document.getElementById("group").style.backgroundColor = "lightpink";
        var width = 800;
        var height = 500;
        let marge = { top: 60, bottom: 60, left: 60, right: 260 };
        var tableObj = document.getElementById("data_table");
        var data = new Array(12);

        for (var m = 0; m < 3; m++) {
            var tmp = new Array();
            for (var i = 1; i < 13; i++) {
                tmp.push(parseFloat(tableObj.rows[i].cells[m + 10].innerText))
            }
            data[m] = tmp;

        }
        // // for (var m = 0; m < 6; m++){
        //     alert("area" + m + " " + data[m]);
        // // }

        let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append('g')
            .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');


        let xScale = d3.scale.ordinal()
            .domain(monthes)
            .rangeRoundBands([0, width - marge.left - marge.right]);

        // let xAxis = d3.axisBottom(xScale);
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        let yScale = d3.scale.linear()
            .domain([0, 100])
            .range([height - marge.top - marge.bottom, 0]);
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");




        g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
            .selectAll('text').attr('transform', 'rotate(45 -20 20)');
        g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
            .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
                return width - marge.left - marge.right;
            });


        let rectWidth = 30;
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
        }).attr('fill', '#22A7F2').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#2C81F3');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#22A7F2');
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
        }).attr('fill', '#DEC56C').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#CB7730');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#DEC56C');
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
        }).attr('fill', 'lightpink').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'darksalmon');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightpink');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
            b[0] = xScale(x + 1) + 80
            b[1] = height - 60 - (380 * data[0][x] / 100)
            lines[x] = b;
        }
        // alert(lines[0])
        // alert(lines);
        var linePath = d3.svg.line()
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
            return 60 + xScale(i + 1) + 20;
        })
            .attr("cy", function (d, i) {
                return height - 60 - (380 * d / 100);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;

        var data_legend = [
            {
                "name": "DR",
                "color": "#22A7F2"
            },
            {
                "name": "agency",
                "color": "#DEC56C"
            },
            {
                "name": "AC",
                "color": "lightpink"
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



    });
    $("#age").click(function () {
        d3.select("svg").remove();//清除之前画过的图表
        document.getElementById("gender").style.backgroundColor = "lightpink";
        document.getElementById("area").style.backgroundColor = "lightpink";
        document.getElementById("age").style.backgroundColor = "lightcoral";
        document.getElementById("occ").style.backgroundColor = "lightpink";
        document.getElementById("res").style.backgroundColor = "lightpink";
        document.getElementById("group").style.backgroundColor = "lightpink";
        var width = 800;
        var height = 500;
        let marge = { top: 60, bottom: 60, left: 60, right: 260 };
        var tableObj = document.getElementById("data_table");
        var data = new Array(12);

        for (var m = 0; m < 4; m++) {
            var tmp = new Array();
            for (var i = 1; i < 13; i++) {
                tmp.push(parseFloat(tableObj.rows[i].cells[m + 13].innerText))
            }
            data[m] = tmp;

        }
        // // for (var m = 0; m < 6; m++){
        //     alert("area" + m + " " + data[m]);
        // // }

        let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append('g')
            .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');


        let xScale = d3.scale.ordinal()
            .domain(monthes)
            .rangeRoundBands([0, width - marge.left - marge.right]);

        // let xAxis = d3.axisBottom(xScale);
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        let yScale = d3.scale.linear()
            .domain([0, 100])
            .range([height - marge.top - marge.bottom, 0]);
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");




        g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
            .selectAll('text').attr('transform', 'rotate(45 -20 20)');
        g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
            .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
                return width - marge.left - marge.right;
            });


        let rectWidth = 30;
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
        }).attr('fill', '#22A7F2').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#2C81F3');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#22A7F2');
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
        }).attr('fill', '#DEC56C').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#CB7730');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#DEC56C');
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
        }).attr('fill', 'lightpink').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'darksalmon');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightpink');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
        }).attr('fill', 'lightgreen').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'darkgreen');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', 'lightgreen');
        }).on('click', function (d) {
            alert(d);
        })
            .transition().duration(1000).delay(function (d, i) {
                return i * 100;
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
            b[0] = xScale(x + 1) + 80
            b[1] = height - 60 - (380 * data[0][x] / 100)
            lines[x] = b;
        }
        // alert(lines[0])
        // alert(lines);
        var linePath = d3.svg.line()
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
            return 60 + xScale(i + 1) + 20;
        })
            .attr("cy", function (d, i) {
                return height - 60 - (380 * d / 100);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;

        var data_legend = [
            {
                "name": "u20",
                "color": "#22A7F2"
            },
            {
                "name": "20to35",
                "color": "#DEC56C"
            },
            {
                "name": "35to55",
                "value": data[2],
                "color": "lightpink"
            },
            {
                "name": "m55",
                "value": data[3],
                "color": "lightgreen"
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



    });
    $("#occ").click(function () {
        d3.select("svg").remove();//清除之前画过的图表
        document.getElementById("gender").style.backgroundColor = "lightpink";
        document.getElementById("area").style.backgroundColor = "lightpink";
        document.getElementById("age").style.backgroundColor = "lightpink";
        document.getElementById("occ").style.backgroundColor = "lightcoral";
        document.getElementById("res").style.backgroundColor = "lightpink";
        document.getElementById("group").style.backgroundColor = "lightpink";
        var width = 800;
        var height = 500;
        let marge = { top: 60, bottom: 60, left: 60, right: 260 };
        var tableObj = document.getElementById("data_table");
        var data = new Array(12);

        for (var m = 0; m < 1; m++) {
            var tmp = new Array();
            for (var i = 1; i < 13; i++) {
                tmp.push(parseFloat(tableObj.rows[i].cells[m + 19].innerText))
            }
            data[m] = tmp;

        }
        // // for (var m = 0; m < 6; m++){
        //     alert("area" + m + " " + data[m]);
        // // }

        let monthes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];


        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        let g = svg.append('g')
            .attr('transform', 'translate(' + marge.top + ',' + marge.left + ')');


        let xScale = d3.scale.ordinal()
            .domain(monthes)
            .rangeRoundBands([0, width - marge.left - marge.right]);

        // let xAxis = d3.axisBottom(xScale);
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom");

        let yScale = d3.scale.linear()
            .domain([0, 100])
            .range([height - marge.top - marge.bottom, 0]);
        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left");




        g.append('g').attr('transform', 'translate(' + 0 + ',' + (height - marge.bottom - marge.top) + ')').call(xAxis)
            .selectAll('text').attr('transform', 'rotate(45 -20 20)');
        g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
            .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
                return width - marge.left - marge.right;
            });


        let rectWidth = 30;
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
        }).attr('fill', '#22A7F2').attr('cursor', 'pointer').on('mouseover', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#2C81F3');
        }).on('mouseout', function (d, i) {
            d3.select(this).transition().duration(100).attr('fill', '#22A7F2');
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


        var lines = [];
        for (var x = 0; x < 12; x++) {
            var b = [];
            b[0] = xScale(x + 1) + 80
            b[1] = height - 60 - (380 * data[0][x] / 100)
            lines[x] = b;
        }
        // alert(lines[0])
        // alert(lines);
        var linePath = d3.svg.line()
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
            return 60 + xScale(i + 1) + 20;
        })
            .attr("cy", function (d, i) {
                return height - 60 - (380 * d / 100);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;

        var data_legend = [
            {
                "name": "occuoancy",
                "color": "#22A7F2"
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



    });
    function createAndDownloadFile(fileName, content) {
        var aTag = document.createElement('a');
        var blob = new Blob([content]);
        aTag.download = fileName;
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
    }
});
