$(document).ready(function () {
    var withqr=0;
    var withoutqr=0;
    console.log($('#shortlink').val());
    
    $.get( '/stats/withqr/'+$('#shortlink').val(), function( data ) {
        withqr= data.count;
        $.get( '/stats/noqr/'+$('#shortlink').val(), function( data2 ) {
            withoutqr= data2.count;
            console.log(withqr+" "+withoutqr);
            $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Klicks'
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
                y: withoutqr
            }, {
                name: 'Mit QR Code',
                y: withqr
            }]
        }]
    });

        });
    });
   
       //$http.get('/stats/withqr/'+$('#shortlink').val()).then(function(data){console.log(data);}, errorCallback);
       // $http.get('/stats/noqr/'+$('#shortlink').val()).then(function(data){console.log(data);}, errorCallback);
       


    
        
});

