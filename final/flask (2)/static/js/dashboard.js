function dashboard() {
    var dom = document.getElementById("main3");
    var myChart = echarts.init(dom,'dark');
    var app = {};

    var option;



    option = {
        series: [{
            type: 'gauge',
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            splitNumber: 12,
            itemStyle: {
                color: '#FFAB91'
            },
            progress: {
                show: true,
                width: 30
            },

            pointer: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    width: 30
                }
            },
            axisTick: {
                distance: -45,
                splitNumber: 5,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            splitLine: {
                distance: -52,
                length: 14,
                lineStyle: {
                    width: 3,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: -20,
                color: '#999',
                fontSize: 20
            },
            anchor: {
                show: false
            },
            title: {
                show: false
            },
            detail: {
                valueAnimation: true,
                width: '60%',
                lineHeight: 40,
                height: '15%',
                borderRadius: 8,
                offsetCenter: [0, '-15%'],
                fontSize: 60,
                fontWeight: 'bolder',
                formatter: '{value} °C',
                color: 'auto'
            },
            data: [{
                value: 20
            }]
        },

        {
            type: 'gauge',
            center: ["50%", "60%"],
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 60,
            itemStyle: {
                color: '#FD7347',
            },
            progress: {
                show: true,
                width: 8
            },

            pointer: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show: false
            },
            detail: {
                show: false
            },
            data: [{
                value: 20,
            }]

        }
        ],
    };

    setInterval(function () {
        let random = (Math.random() * 60).toFixed(2) - 0;
        option.series[0].data[0].value = random;
        option.series[1].data[0].value = random;
        myChart.setOption(option, true);
    }, 2000);

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}