# Report HW4 20210318 Web_Flask

[TOC]

### Project Structure

```
│  hotel.csv
│
├─.idea
│  │  .gitignore
│  │  misc.xml
│  │  modules.xml
│  │  web_flask.iml
│  │  workspace.xml
│  │
│  └─inspectionProfiles
│          profiles_settings.xml
│
├─apps
│  │  app.py
│  │  settings.py
│  │
│  ├─static
│  │  ├─css
│  │  │      style.css
│  │  │
│  │  ├─js
│  │  │      jquery.js
│  │  │
│  │  └─jslib
│  │          jquery.min.js
│  │
│  ├─templates
│  │      index.html
│  │
│  └─__pycache__
│          settings.cpython-38.pyc
│
└─__pycache__
```

### Functions

**All functions are shown in my `demo.mp4`**

**Choose a `.csv` file and upload it:**

```js
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
```

* features:
  * declare `thead` so the head can have a unique color
  * declare `tr` in odd row and even row separately to make rows with different index in different color
  * not only the given `.csv` file can be displayed correctly, the js code can be suitable for the `.csv` files with different number of columns or rows

**Add a new row to the html page:**

```js
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
```

* feature:
  * the new added row can also be identified as odd row or even row, then we can render them in different color

**Delete row:**

```js
    $("body").on("click", "#deleteRow", function () {
        var rowIndex = $(this).parent().parent().parent().find("tr").index($(this).parent().parent());
        document.getElementById("data_table").deleteRow(rowIndex);
    });
```

**Save current table to `.csv` file:**

```js
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
```

* feature:
  * just a single click can we download the file, without the burden of redirect to another page or choose local directory or rename the file