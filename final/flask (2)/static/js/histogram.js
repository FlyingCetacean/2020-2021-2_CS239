function histogram(geo, t) {
  console.log(geo,t)
  var times = []
  times[0] = t.year + '-' + t.month + '-' + t.day
  
  

  var app = {}

  var chartDom = document.getElementById('main2')
  var myChart = echarts.init(chartDom, 'dark')

  var option

  var posList = [
    'left',
    'right',
    'top',
    'bottom',
    'inside',
    'insideTop',
    'insideLeft',
    'insideRight',
    'insideBottom',
    'insideTopLeft',
    'insideTopRight',
    'insideBottomLeft',
    'insideBottomRight',
  ]

  app.configParameters = {
    rotate: {
      min: -90,
      max: 90,
    },
    align: {
      options: {
        left: 'left',
        center: 'center',
        right: 'right',
      },
    },
    verticalAlign: {
      options: {
        top: 'top',
        middle: 'middle',
        bottom: 'bottom',
      },
    },
    position: {
      options: posList.reduce(function (map, pos) {
        map[pos] = pos
        return map
      }, {}),
    },
    distance: {
      min: 0,
      max: 100,
    },
  }

  app.config = {
    rotate: 90,
    align: 'left',
    verticalAlign: 'middle',
    position: 'insideBottom',
    distance: 15,
    onChange: function () {
      var labelOption = {
        normal: {
          rotate: app.config.rotate,
          align: app.config.align,
          verticalAlign: app.config.verticalAlign,
          position: app.config.position,
          distance: app.config.distance,
        },
      }
      myChart.setOption({
        series: [
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
          {
            label: labelOption,
          },
        ],
      })
    },
  }

  var labelOption = {
    show: true,
    position: app.config.position,
    distance: app.config.distance,
    align: app.config.align,
    verticalAlign: app.config.verticalAlign,
    rotate: app.config.rotate,
    formatter: '{c}  {name|{a}}',
    fontSize: 16,
    rich: {
      name: {},
    },
  }
  var ser = []
  for (var i = 0; i < pollutants.length; i++) {
    var dir = {
      name: pollutants[i],
      type: 'bar',
      barGap: 0,
      label: labelOption,
      emphasis: {
        focus: 'series',
      },
      data: data[i],
    }
    ser[i] = dir
  }

  option = {
    title: {
      text: geo.province,
      subtext: geo.city,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: pollutants,
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: times,
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: ser,
  }

  option && myChart.setOption(option)
}
