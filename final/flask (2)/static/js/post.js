function postSort() {
    let xhr = new XMLHttpRequest();
    // true，即异步执行，如果为false，则会阻塞直到数据返回
    xhr.open("POST", "/getData", true);
    // 设置请求头
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("kbn-version", "5.3.0");
    // 发送请求
    xhr.send(JSON.stringify({
        "Province" : "江苏省",
        "City" : "南通市",
        "Type" : "N",
        "StartYear" : 2013,
        "StartMon" : 1,
        "StartDay" : 1,
        "EndYear" : 2013,
        "EndMon" : 1,
        "EndDay" : 2,
        "Content" : ["PM25","PM10","NO2","SO2","O3","CO","TEMP","RH","PSFC","lon","lat"]
    }));
    // 获取响应
    xhr.onreadystatechange  = function () {
        if(this.readyState === 4 && this.status === 200){
            // 成功返回
            let data = JSON.parse(xhr.responseText).data;
            console.log(data);
        }
    }
}