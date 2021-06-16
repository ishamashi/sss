$(document).ready(function(){
    $('#user-name').html(name);

    $('.avatar').prop("src","assets/images/avatar"+ prisma_level +".png");


    $( "#jalan" ).autocomplete({
        source: function( request, response ) {
            console.log(request.term);
          $.ajax({
            type: 'GET',
            cache: false,
            url: APIURL + 'data/filterarea',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            dataType: "json",
            data: {"province":$("#province").val(), "district": $("#city").val(), address: request.term},
            success: function( data ) {
              var dataddr = [];
              $.each(data.data, function(k,v){
                  dataddr.push(v[0]);
              });
              response( dataddr );
            }
          });
        },
        minLength: 3,
        select: function( event, ui ) {
          $('#jalan').val(ui.item.value); 
        },
        open: function() {
          $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        close: function() {
          $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
      }); 
      
})