$(document).ready(function() {
    var withqr = 0;
    var withoutqr = 0;
    console.log($('#shortlink').val());

    $.get('/stats/withqr/' + $('#shortlink').val(), function(data) {
        if (data != null) {
            withqr = data.count;
        }
        $.get('/stats/noqr/' + $('#shortlink').val(), function(data2) {
            if (data2 != null) {
                withoutqr = data2.count;
            }
            console.log(withqr + " " + withoutqr);
            var total = withoutqr + withqr;
            $('#total').html("Gesamt: " + total);
            //Container with circle
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

            // Table
            $('#container2').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Klicks'
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Ohne QR Code',
                    data: [withoutqr]
                }, {
                    name: 'Über QR Code',
                    data: [withqr]
                }]
            });
        });
    });
});
