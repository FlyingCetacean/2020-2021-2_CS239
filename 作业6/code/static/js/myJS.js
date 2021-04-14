$(document).ready(function () {
    $("#displayFile").click(function () {

        document.getElementById("addRow").style.opacity = 100;
        document.getElementById("saveFile").style.opacity = 100;
        document.getElementById("gender").style.opacity = 100;
        document.getElementById("mons").style.opacity = 100;
        document.getElementById("selectText").style.opacity = 100;
        document.getElementById("area").style.opacity = 100;
        document.getElementById("price").style.opacity = 100;
        document.getElementById("occ").style.opacity = 100;
        // document.getElementById("age").style.opacity = 100;

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

                // if (i == 0) {

                //     for (var j = 0; j < row_datas.length; ++j) {
                //         var bt = document.createElement("input");
                //         bt.type = "button";
                //         var val = row_datas[j];
                //         bt.value = val;
                //         bt.id = j;
                //         var headerCell = $('<td/>');//bug here
                //         headerCell.html(bt);
                //         row.append(headerCell);
                //     }
                // }
                // else {
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
        };
        reader.readAsText($("#uploadFile")[0].files[0]);
    });

    $("body").on("click", "#deleteRow", function () {
        var rowIndex = $(this).parent().parent().parent().find("tr").index($(this).parent().parent());
        document.getElementById("data_table").deleteRow(rowIndex);
    });

    $("#addRow").click(function () {
        var add_datas = prompt("Input new row,split column data with ','");
        if (add_datas.length > 0) {
            if (document.getElementById("data_table")) {
                var cells_num = document.getElementById("data_table").rows[0].cells.length;
                add_datas = add_datas.split(',');
                var new_row = $("<tr />");
                var row_num = $("table tr").size();
                if (row_num % 2 == 0) {
                    new_row = $("<tr class='treven' />");
                } else {
                    new_row = $("<tr class='trodd' />");
                } row_num
                for (var i = 0; i < cells_num - 1; ++i) {
                    var new_col = $("<td contenteditable='true' />");
                    if (add_datas[i]) {
                        new_col.html(add_datas[i]);
                    } else {
                        new_col.html("NULL");
                    }
                    new_row.append(new_col);
                }
                if (row_num != 0) {
                    new_row.append('<td><input type="button" value="Delete" id="deleteRow" ></td>');
                } else {
                    new_row.append('<td>Operation</td>');
                }
                $("#data_table").append(new_row);
            } else {
                alert(" Load a File First!");
            }
        } else {
            alert("Invalid Input!")
        }

    });


    $("#saveFile").click(function () {
        var tableInfo = "";
        var tableObj = document.getElementById("data_table");
        for (var i = 0; i < tableObj.rows.length; i++) {
            for (var j = 0; j < tableObj.rows[i].cells.length; j++) {
                tableInfo += tableObj.rows[i].cells[j].innerText;
                tableInfo += ",";
            }
            tableInfo += "\n";
        }
        createAndDownloadFile("hotel_new.csv", tableInfo);
    });

    $("#price").click(function () {
        d3.select("svg").remove();//清除之前画过的图表

        var width = 600;
        var height = 600;

        var tableObj = document.getElementById("data_table");
        var dataset = new Array();
        var title = "Price Trend";
        // alert(title);
        for (var i = 1; i < tableObj.rows.length; i++) {
            dataset.push(parseFloat(tableObj.rows[i].cells[17].innerText))
        }
        console.log(dataset);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var xAxisScale = d3.scale.ordinal()
            .domain(d3.range(1, dataset.length + 1))
            .rangeRoundBands([0, 500]);

        var yAxisScale = d3.scale.linear()
            .domain([0, d3.max(dataset)])
            .range([500, 0]);

        var xAxis = d3.svg.axis()
            .scale(xAxisScale)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yAxisScale)
            .orient("left");

        var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([0, 500], 0.05);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset)])
            .range([0, 500]);




        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return 30 + xScale(i);
            })
            .attr("y", function (d, i) {
                return 50 + 500 - yScale(d);
            })
            .attr("width", function (d, i) {
                return xScale.rangeBand();
            })
            .attr("height", yScale)
            .attr("fill", "lightblue")
            .on("click", function (d, i) {
                d3.select(this)
                    .attr("fill", "lightcoral");
            })
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("fill", "lightpink");
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill", "lightblue");
            });

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .attr("x", function (d, i) {
                return 30 + xScale(i);
            })
            .attr("y", function (d, i) {
                return 60 + 500 - yScale(d);
            })
            .attr("dx", function (d, i) {
                return xScale.rangeBand() / 3;
            })
            .attr("dy", -25)
            .attr("text-anchor", "begin")
            .attr("font-size", 14)
            .attr("fill", "lightslategray")
            .text(function (d, i) {
                return d;
            });

        var lines = [];
        for (var x = 0; x < 12; x++) {
            var b = [];
            b[0] = 50 + xScale(x);
            b[1] = 50 + 500 - yScale(dataset[x]);
            lines[x] = b;
        }
        // alert(lines);
        var linePath = d3.svg.line()
        svg.append('path')
            .attr('d', linePath(lines))
            .attr('stroke', 'lightslategray')
            .attr('stroke-width', '3px')
            .attr('fill', 'none');

        var circles = svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle");

        circles.attr("cx", function (d, i) {
            return 50 + xScale(i);
        })
            .attr("cy", function (d, i) {
                return 50 + 500 - yScale(d);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(30,550)")
            .attr("fill","lightslategray")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(35,50)")
            .attr("fill","lightslategray")
            .call(yAxis);
    });

   
    $("#occ").click(function () {
        d3.select("svg").remove();//清除之前画过的图表

        var width = 600;
        var height = 600;

        var tableObj = document.getElementById("data_table");
        var dataset = new Array();
        var title = "Price Trend";
        // alert(title);
        for (var i = 1; i < tableObj.rows.length; i++) {
            dataset.push(parseFloat(tableObj.rows[i].cells[19].innerText))
        }
        console.log(dataset);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var xAxisScale = d3.scale.ordinal()
            .domain(d3.range(1, dataset.length + 1))
            .rangeRoundBands([0, 500]);

        var yAxisScale = d3.scale.linear()
            .domain([0, d3.max(dataset)])
            .range([500, 0]);

        var xAxis = d3.svg.axis()
            .scale(xAxisScale)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(yAxisScale)
            .orient("left");

        var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([0, 500], 0.05);

        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset)])
            .range([0, 500]);




        svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return 30 + xScale(i);
            })
            .attr("y", function (d, i) {
                return 50 + 500 - yScale(d);
            })
            .attr("width", function (d, i) {
                return xScale.rangeBand();
            })
            .attr("height", yScale)
            .attr("fill", "lightblue")
            .on("click", function (d, i) {
                d3.select(this)
                    .attr("fill", "lightcoral");
            })
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .attr("fill", "lightpink");
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr("fill", "lightblue");
            });

        svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")

            .attr("x", function (d, i) {
                return 30 + xScale(i);
            })
            .attr("y", function (d, i) {
                return 60 + 500 - yScale(d);
            })
            .attr("dx", function (d, i) {
                return xScale.rangeBand() / 3;
            })
            .attr("dy", -25)
            .attr("text-anchor", "begin")
            .attr("font-size", 14)
            .attr("fill", "lightslategray")
            .text(function (d, i) {
                return d;
            });

        var lines = [];
        for (var x = 0; x < 12; x++) {
            var b = [];
            b[0] = 50 + xScale(x);
            b[1] = 50 + 500 - yScale(dataset[x]);
            lines[x] = b;
        }
        // alert(lines);
        var linePath = d3.svg.line()
        svg.append('path')
            .attr('d', linePath(lines))
            .attr('stroke', 'lightslategray')
            .attr('stroke-width', '3px')
            .attr('fill', 'none');

        var circles = svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle");

        circles.attr("cx", function (d, i) {
            return 50 + xScale(i);
        })
            .attr("cy", function (d, i) {
                return 50 + 500 - yScale(d);
            })
            .attr("r", 4)
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 2)
            .attr("fill","white")
            ;

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(30,550)")
            .attr("fill","lightslategray")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(35,50)")
            .attr("fill","lightslategray")
            .call(yAxis);
    });


    $("#gender").click(function () {
        d3.select("svg").remove();//清除之前画过的图表

        // document.getElementById("title").innerHTML = "sex ratio";
        var width = 600;
        var height = 400;

        var tableObj = document.getElementById("data_table");
        var data = parseFloat(tableObj.rows[document.getElementById("mons").value].cells[1].innerText);
        var dataset = [data, 100 - data];
        var name = ["female", "male"];
        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

        var pie = d3.layout.pie();

        var outerRadius = 100;
        var innerRadius = 25;
        var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        // var color = d3.scale.category10();
        var color = ["lightpink", "lightblue"];
        var arcs = svg.selectAll("g")
            .data(pie(dataset))
            .enter()
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            ;
        arcs.append("path")

            .attr("fill", function (d, i) {
                return color[i];
            })
            .attr("d", function (d) {
                return arc(d);
            })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7)

            ;

        arcs.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("text-anchor", "middle")
            .attr("fill", "lightslategray")
            .text(function (d, i) {
                return d.value + "%";
            });

        var data_legend = [
            {
                "name": "female",
                "value": dataset[0],
                "color": "lightpink"
            },
            {
                "name": "male",
                "value": data[1],
                "color": "lightblue"
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
            .attr("fill", "lightslategray")
            .style("text-anchor", "head") //样式对齐
            .text(function (d) {
                return d.name;
            });



        console.log(dataset);
        console.log(pie(dataset));








    });


    $("#area").click(function () {
        d3.select("svg").remove();//清除之前画过的图表

        // document.getElementById("title").innerHTML = "sex ratio";
        var width = 600;
        var height = 400;

        var tableObj = document.getElementById("data_table");
        var data = new Array();
        for (var i = 2; i < 8; i++) {
            data.push(parseFloat(tableObj.rows[document.getElementById("mons").value].cells[i].innerText))
        }
        var data_legend = [
            {
                "name": "LOCAL",
                "value": data[0],
                "color": "lightblue"
            },
            {
                "name": "USA",
                "value": data[1],
                "color": "lightseagreen"
            },
            {
                "name": "SA",
                "value": data[2],
                "color": "lightcoral"
            },
            {
                "name": "EU",
                "value": data[3],
                "color": "lightgreen"
            },
            {
                "name": "MEA",
                "value": data[4],
                "color": "yellow"
            },
            {
                "name": "ASIA",
                "value": data[5],
                "color": "lightsalmon"
            }
        ];
        // alert(data_legend[3].value);
        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);
        svg.id = "pie";
        var pie = d3.layout.pie();

        var radius = 110;
        var outerRadius = 100;
        var innerRadius = 25;
        var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

        var outerArc = d3.svg.arc()
            .innerRadius(radius * 0.9)
            .outerRadius(radius * 0.9)

        // var color = d3.scale.category10();
        // var color = ["lightpink", "lightblue"];
        var arcs = svg.selectAll("g")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        arcs.append("path")
            .attr("fill", function (d, i) {
                return data_legend[i].color;
            })
            .attr("d", function (d) {
                return arc(d);
            })
            .attr("stroke", "white")
            .style("stroke-width", "2px")
            .style("opacity", 0.7);


        // Another arc that won't be drawn. Just for labels positioning

        arcs.append("line")
            .attr("stroke", "lightslategray")
            .attr("stroke-width", 1)
            // .attr('points', function (d) {
            //     var posA = arc.centroid(d);// line insertion in the slice
            //     var posB = outerArc.centroid(d);// line break: we use the other arc generator that has been built only for that
            //     var posC = outerArc.centroid(d); // Label position = almost the same as posB
            //     var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
            //     posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            //     return [posA, posB, posC];
            // });
            .attr("x1", function (d) {
                return arc.centroid(d)[0] * 1.6
            })
            .attr("y1", function (d) {
                return arc.centroid(d)[1] * 1.6
            })
            .attr("x2", function (d) {
                return arc.centroid(d)[0] * 2.2
            })
            .attr("y2", function (d) {
                return arc.centroid(d)[1] * 2.2
            });
        arcs.append("text")
            .attr("x", function (d) {
                return arc.centroid(d)[0] * 2.5;
            })
            .attr("y", function (d) {
                return arc.centroid(d)[1] * 2.5;
            })
            .attr("text-anchor", "middle")
            .attr("font-size", 12)
            .attr("fill", "lightslategray")
            .text(function (d) {
                return d.value + "%";
            });

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
