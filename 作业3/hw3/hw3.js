function unique(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {      
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}



function test() {
    document.getElementById("demo").innerHTML = "结果:"+unique( stringToArray(document.getElementById("data").value) );
}

function stringToArray(str) {
    var array = [];
    var arr = str.split(',');
    for (var i = 0; i < arr.length; i++) {
        array.push(parseFloat(arr[i]));
    }
    return array;
}