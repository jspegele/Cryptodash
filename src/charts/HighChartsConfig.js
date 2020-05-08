export default function (series, title, chartHeight, yAxisVisible, chartMargin) {
  return {
    chart: {
        type: 'line',
        height: chartHeight,
        margin: chartMargin
    },
    title: {
      text: title
    },
    yAxis: {
      title: {
        text: 'Price'
      },
      visible: yAxisVisible
    },
    xAxis: {
      type: 'datetime'
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 2010
      }
    },
    series,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 800
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };
}
