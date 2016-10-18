$(document).ready(function () {
    $http({
      method: 'POST',
      url: '/detail/'+$('#shortlink').val()
    }).then(function successCallback(response) {
        console.log("test");
      }, function errorCallback(response) {
        console.log("error");
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    
    
    
    
    
    
$(function () {
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Ohne QR Code',
                y: 56.33
            }, {
                name: 'Mit QR Code',
                y: 24.03,
                sliced: true,
                selected: true
            }]
        }]
    });
});
        
});