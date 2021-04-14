$(document).ready(function () {
    $("#displayFile").click(function () {

        document.getElementById("addRow").style.opacity = 100;
        document.getElementById("saveFile").style.opacity = 100;

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

                if (i == 0) {

                    for (var j = 0; j < row_datas.length; ++j) {
                        var bt = document.createElement("input");
                        bt.type = "button";
                        var val = row_datas[j];
                        bt.value = val;
                        bt.id = j;
                        var headerCell = $('<td/>');//bug here
                        headerCell.html(bt);
                        row.append(headerCell);
                    }
                }
                else {
                    for (var j = 0; j < row_datas.length; ++j) {
                        var column = $("<td contenteditable='true' />");
                        column.html(row_datas[j]);
                        row.append(column);
                    }

                }

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

    $("body").on("click", "#0,#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#15,#16,#17,#18,#19", function () {

        d3.select("svg").remove();//清除之前画过的图表

        var width = 600;
        var height = 600;

        var tableObj = document.getElementById("data_table");
        var dataset = new Array();
        var title = this.value;
        // alert(title);
        for (var i = 1; i < tableObj.rows.length; i++) {
            var num = parseFloat(this.id) + 1;
            dataset.push(parseFloat(tableObj.rows[i].cells[num].innerText))
        }


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
            .attr("x", width / 2)
            .attr("y", 0)
            .attr("dx", -50)
            .attr("dy", 20)
            .attr("text-anchor", "begin")
            .attr("font-size", 24)
            .attr("fill", "lightcoral")
            .text(title)
            ;
        // .attr("x", function (d, i) {
        //     return 30 + xScale(i);
        // })
        // .attr("y", function (d, i) {
        //     return 60 + 500 - yScale(d);
        // })
        // .attr("dx", function (d, i) {
        //     return xScale.rangeBand() / 3;
        // })
        // .attr("dy", -25)
        // .attr("text-anchor", "begin")
        // .attr("font-size", 14)
        // .attr("fill", "lightcoral")
        // .text(function (d, i) {
        //     return d;
        // });

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
            .attr('stroke', 'lightcoral')
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
            .attr("stroke", "lightcoral")
            .attr("stroke-width", 2)
            .attr("fill", "white")
            ;
        
        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(30,550)")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(30,50)")
            .call(yAxis);


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

