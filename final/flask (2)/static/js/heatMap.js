var csv_data = []
var index_to_proto = []
var max_value = [250, 420, 1600, 565, 30, 200]

var start_date = new Date()
var end_date = new Date()
var timing_type
var chosen_geo = {province:"浙江省",city:"杭州市"}

var myChart

function load(filename) {
  var url = 'http://localhost:5000/loadFile?fileName=' + filename

  var flag = true
  d3.csv(url, function (csvdata) {
    if (csvdata) {
      csv_data.push(csvdata)
      if (flag) {
        flag = false
        for (x in csvdata) {
          index_to_proto.push(x)
        }
      }
    }
  })
}

function Heatmap(all_data, index, start_date, end_date, timing_type) {
  // all_data means for all rows, index means the row we using(0->lon,1->lat,2->value)
  // start_date is a Date object, and timing_type using true(1) for one day counting and false(0) for one hour counting
  var list = []
  var st_year = start_date.getFullYear()
  var st_month = start_date.getMonth() + 1
  var st_day = start_date.getDate()
  var st_hour = start_date.getHours()
  var time_unit
  if (timing_type) {
    time_unit = 1000 * 3600 * 24
  } else {
    time_unit = 1000 * 3600
  }
  var time_count = (end_date - start_date) / time_unit

  var date = new Date()
  date.setDate(st_day)
  date.setMonth(st_month - 1)
  date.setFullYear(st_year)
  date.setHours(st_hour)

  var time_step = all_data.length / (time_count + 1)

  for (var i = 0; i < all_data.length; i += time_step) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()

    var new_series = {
      time: '' + year + '-' + month + '-' + day,
      type: 'heatmap',
      coordinateSystem: 'bmap',
      pointSize: 5,
      blurSize: 6,
      data: [],
    }

    if (timing_type) {
      date.setDate(date.getDate() + 1)
    } else {
      new_series.time += hour
      date.setHours(date.getHours() + 1)
    }

    for (var j = 0; j < time_step; j++) {
      var one_point = []
      for (var k = 0; k < 3; k++) {
        one_point.push(parseFloat(all_data[i + j][index_to_proto[index[k]]]))
      }
      new_series.data.push(one_point)
    }
    list.push({ series: new_series })
  }

  var time_range = []
  for (var i = 0; i < list.length; i++) {
    time_range.push(list[i].series.time)
  }

  var chartDom = document.getElementById('main')
  myChart = echarts.init(chartDom)
  var option

  myChart.setOption(
    (option = {
      baseOption: {
        timeline: {
          axisType: 'time',
          // realtime: false,
          // loop: false,
          autoPlay: false,
          // currentIndex: 2,
          playInterval: 1000,
          controlStyle: {
            stopIcon:
              'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAGpJREFUWAntlkEKwDAIBKP+/znt82xrD6FIpSSHXDpCQBeXDXOyNQoCBQEz21T1eL7QivUuj/qkO1MTwUm6R3cvPbEw6tO3kJUaH4AABCAAAQhAAAIQgEBJQET2fJxe2udZPuvLWcz/IXACuUMWMJDzUAgAAAAASUVORK5CYII=',
            playIcon:
              'path://M41.365908,29.4271388 L41.3664843,29.4265626 L26.3794329,19.1497136 L26.3747509,19.1541315 C26.0642269,18.8592621 25.6429678,18.677793 25.1786824,18.677793 C24.2236284,18.677793 23.4494433,19.4443188 23.4494433,20.3905371 C23.4494433,20.910214 23.4270417,21.9276946 23.4494433,21.9056292 L23.4494433,30.6673861 L23.4494433,39.8901629 C23.4494433,39.8977982 23.4494433,40.4825908 23.4494433,40.9444991 C23.4494433,41.8901412 24.2236284,42.656691 25.1786824,42.656691 C25.6447205,42.656691 26.0677564,42.4740454 26.3782564,42.1764869 L26.3794329,42.1770872 L41.3664843,31.9005503 L41.3659081,31.8996379 C41.6917266,31.5882735 41.894997,31.1514078 41.894997,30.6670739 C41.894997,30.6658974 41.894997,30.6650091 41.894997,30.6635444 C41.894997,30.6623679 41.894997,30.6609273 41.894997,30.6600389 C41.894997,30.175657 41.6917265,29.7384792 41.365908,29.4271388 Z',
          },
          replaceMerge: 'series',
          data: time_range,
          bottom: '10%',
        },
        animation: false,
        bmap: {
          center: [105, 30],
          zoom: 6,
          roam: true,
        },
        visualMap: {
          show: true,
          type: 'continuous',
          top: 'top',
          min: 0,
          max: max_value[index[2]],
          calculable: true,
          inRange: {
            color: ['blue', 'blue', 'green', 'yellow', 'red'],
          },
        },
        series: [],
      },
      options: list,
    }),
  )

  // 添加百度地图插件
  var bmap = myChart.getModel().getComponent('bmap').getBMap()
  bmap.addControl(new BMap.MapTypeControl())

  option && myChart.setOption(option)

  bmap.addEventListener('click', function (e) {
    var gc = new BMap.Geocoder()
    gc.getLocation(e.point, function (rs) {
      var addComp = rs.addressComponents
      chosen_geo.province = addComp.province
      chosen_geo.city = addComp.city
      histogram(get_geo(),get_time())
    })
  })
}

function set_start_date(year, month, date) {
  start_date.setDate(date)
  start_date.setMonth(month - 1)
  start_date.setFullYear(year)
}

function set_end_date(year, month, date) {
  end_date.setDate(date)
  end_date.setMonth(month - 1)
  end_date.setFullYear(year)
}

function set_timing_type(type) {
  timing_type = type
}

// 返回对象，内部包含三个成员：年、月、日
function get_time() {
  var option = myChart.getOption().timeline[0]
  var time = option.data[option.currentIndex].split('-')

  return {
    year: parseInt(time[0]),
    month: parseInt(time[1]),
    day: parseInt(time[2]),
  }
}

function parseTime(str) {
  var time = str.split('-')
  for (var i = 0; i < time.length; i++) {
    time[i] = parseInt(time[i])
  }

  return time
}

function get_geo() {
  return chosen_geo;
}

