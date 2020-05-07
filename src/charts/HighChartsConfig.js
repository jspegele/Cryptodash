export default function (series, tickInterval) {
  return {
    chart: {
        type: 'line'
    },
    title: {
      text: 'Chart Title'
    },
    yAxis: {
      title: {
        text: 'Price'
      }
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
