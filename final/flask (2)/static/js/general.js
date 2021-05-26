

var pollutants = ['PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3']

var data = []
for (var i = 0; i < pollutants.length; i++) {
  var tmp = [
    (i + 1) 
   
  ]
  data[i] = tmp
}

function draw(type) {
  var index = [12, 11]
  index.push(type)
  histogram({province:"浙江省",city:"杭州市"},{
    year: 2013,
    month: 1,
    day: 1,
  })
  Heatmap(csv_data, index, start_date, end_date, timing_type)
}



  // 返回对象，内部包含两个成员：省份、城市

  