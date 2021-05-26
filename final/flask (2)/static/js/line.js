function lineChart() {

    var chartDom = document.getElementById('main');
        var myChart = echarts.init(chartDom, "dark");
        var option;
        
        var times = [];
        for (var i = 0; i < 12; i++) {
            times[i] = "2018-" + (i+1);
        }
        console.log(times)

        option = {
            title: {
                text: '折线图'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: pollutants
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: times// ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'PM2.5',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134, 90]
                },
                {
                    name: 'PM10',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310,90, 230, 210,120, 132]
                },
                {
                    name: 'SO2',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 232, 201, 154, 190, 191, 234, 290, 330, 310, 330, 410]
                },
                {
                    name: 'NO2',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 191, 234, 290, 330, 310, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'CO',
                    type: 'line',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 932, 901, 191, 234, 290, 330, 310, 934, 1290, 1330, 1320]
                },{
                    name: 'O3',
                    type: 'line',
                    stack: '总量',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [ 191, 820, 932, 901, 310,234, 290, 330, 934, 1290, 1330, 1320]
                }
            ]
        };

        option && myChart.setOption(option);
    
}
