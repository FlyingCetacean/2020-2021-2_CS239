function postSort() {
    var xhr = new XMLHttpRequest();
    // true，即异步执行，如果为false，则会阻塞直到数据返回
    xhr.open("POST", "/postSort", true);
    // 设置请求头
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("kbn-version", "5.3.0");
    // 发送请求
    xhr.send(JSON.stringify({
        "array" : document.getElementsByTagName("p")[0].innerText
    }));
    // 获取响应
    xhr.onreadystatechange  = function () {
        if(this.readyState == 4 && this.status == 200){
            // 成功返回
            var array = JSON.parse(xhr.responseText).sorted_array;
            var p = document.getElementsByTagName("p")[1];
            p.innerText = array.join(", ");
        }
    }
}

function getSort() {
    var xhr = new XMLHttpRequest();
    var array = document.getElementsByTagName("p")[0].innerText;
    // true，即异步执行，如果为false，则会阻塞直到数据返回
    xhr.open("GET", "/getSort?array=" + array, true);
    // 设置请求头
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("kbn-version", "5.3.0");
    // 发送请求，只有post请求有send(string)
    xhr.send();
    // 获取响应
    xhr.onreadystatechange  = function () {
        if(this.readyState == 4 && this.status == 200){
            // 成功返回
            var array = JSON.parse(xhr.responseText).sorted_array;
            var p = document.getElementsByTagName("p")[2];
            p.innerText = array.join(", ");
        }
    }
}