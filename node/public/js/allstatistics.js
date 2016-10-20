$(document).ready(function () {
    var categoriesarray =  [];
    var withqr = [];
    var withoutqr = [];
    var b1=false;
    var b2=false;
    $.get( '/all', function( data0 ) {
        if(data0!=null&&data0.length!=0){
            for(var i=0; i<data0.length;i++)
            {
                console.log(data0.length+ data0[1]);
                 $.get( '/stats/withqr/'+data0[i].shortlink, function( data ) {
                    if(data!=null){
                        withqr.push(data.count);
                    }
                    if(data0[data0.length-1].shortlink==data.shortlink)
                    {
                        b1=true;    
                        if(i==data0.length && b2==true && b1==true){
                            createTable();
                        }
                    }
                 });
                $.get( '/stats/noqr/'+data0[i].shortlink, function( data2 ) {
                    if(data2!=null) {
                        withoutqr.push(data2.count);
                    }
                    if(data0[data0.length-1].shortlink==data2.shortlink)
                    {
                        b2=true; 
                        if(i==data0.length && b2==true && b1==true){
                            createTable();
                        }       
                    }
                });
                categoriesarray.push(data0[i].longlink + " über /"+data0[i].shortlink);
                if(i==data0.length && b2==true && b1==true){
                    createTable();
                }
            }
        }
        else
        {
            $('#total').html("Keine Einträge gefunden!");
        }
        
         
         
    });


function createTable(){
    $('#container').highcharts({
             chart: {
                 type: 'bar'
             },
             title: {
                 text: 'Übersicht'
             },
             
             xAxis: {
                 categories: categoriesarray,
             },
             yAxis: {
                 min: 0,
                    title: {
                     text: 'Klicks',
                     align: 'high'
                 },
                 labels: {
                     overflow: 'justify'
                 }
             },
             
             credits: {
                 enabled: false
             },
             series: [{
                 name: 'Über dem QR Code',
                 data: withqr
             }, {
                 name: 'Ohne QR',
                 data: withoutqr
             }]
         });
    
}
    
    });