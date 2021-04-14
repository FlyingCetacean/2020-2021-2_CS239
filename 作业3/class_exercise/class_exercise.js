function quicksort(arr) {
    if(arr.length < 2){
         return arr
     }else{
         let pivot = arr[0];
         let left = arr.slice(1).filter(function(value,index){
             return value <= pivot;
         })
         let right = arr.slice(1).filter(function(value,index){
             return value > pivot;
         })
 
         return [...quicksort(left),pivot,...quicksort(right)];
     }
 }


function test() {
    document.getElementById("demo").innerHTML = "结果:"+quicksort( stringToArray(document.getElementById("data").value) );
}

function stringToArray(str) {
    var array = [];
    var arr = str.split(',');
    for (var i = 0; i < arr.length; i++) {
        array.push(parseFloat(arr[i]));
    }
    return array;
}