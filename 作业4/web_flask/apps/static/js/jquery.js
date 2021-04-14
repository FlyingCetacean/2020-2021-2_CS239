$(document).ready(function () {
    $("#displayFile").click(function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            var table = $("<table id='data_table' class='pure_table'/>");
            var datas = e.target.result.split("\n");
            for (var i = 0; i < datas.length; ++i) {
                var row_datas = datas[i].split(",");
                var row = $("<tr />");
                if (i % 2 == 0) {
                    row = $("<tr class='treven' />");
                } else {
                    row = $("<tr class='trodd' />");
                }
                if (i == 0) {
                    row = $("<tr class='thead' />");
                }
                for (var j = 0; j < row_datas.length; ++j) {
                    var column = $("<td contenteditable='true' />");
                    column.html(row_datas[j]);
                    row.append(column);
                }
                if (i !== 0 && i % 2 == 1) {
                    row.append('<td><input type="button" value="Delete Row" id="deleteRow" class="deodd"></td>');
                } else if (i !== 0 && i % 2 == 0) {
                    row.append('<td><input type="button" value="Delete Row" id="deleteRow" class="deeven"></td>');
                } else {
                    row.append('<td>Operation</td>');
                }
                table.append(row);
            }
            $("#dpCSV").html('').append(table);
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
                var cells_cnt = document.getElementById("data_table").rows[0].cells.length;
                add_datas = add_datas.split(',');
                var new_row = $("<tr />");
                var row_cnt = $("table tr").size();
                if (row_cnt % 2 == 0) {
                    new_row = $("<tr class='treven' />");
                } else {
                    new_row = $("<tr class='trodd' />");
                }
                for (var i = 0; i < cells_cnt - 1; ++i) {
                    var new_col = $("<td contenteditable='true' />");
                    if (add_datas[i]) {
                        new_col.html(add_datas[i]);
                    } else {
                        new_col.html("NULL");
                    }
                    new_row.append(new_col);
                }
                if (row_cnt % 2 == 1) {
                    new_row.append('<td><input type="button" value="Delete Row" id="deleteRow" class="deodd"></td>');
                } else if (row_cnt % 2 == 0) {
                    new_row.append('<td><input type="button" value="Delete Row" id="deleteRow" class="deeven"></td>');
                } else {
                    new_row.append('<td>Operation</td>');
                }
                $("#data_table").append(new_row);
            } else {
                alert("Please load a file first!");
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

    function createAndDownloadFile(fileName, content) {
        var aTag = document.createElement('a');
        var blob = new Blob([content]);
        aTag.download = fileName;
        aTag.href = URL.createObjectURL(blob);
        aTag.click();
        URL.revokeObjectURL(blob);
    }
});