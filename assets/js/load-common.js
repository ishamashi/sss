$(document).ready(function () {
    $("#user-name").html(name);

    $("#menu_nav").load('navigation.html');
    $("#profile_menu").load('profile_menu.html');
    check_version();
    $(".avatar").prop("src", "assets/images/avatar" + prisma_level + ".png");

 // set endpoint and your access key
var ip = '103.78.81.226'
var access_key = 'AIzaSyDYljKup01xzKCuslZtlkmLXZjQE26d25g';

// get the API result via jQuery.ajax
// $.ajax({
//     url: 'https://www.googleapis.com/geolocation/v1/geolocate?key='+access_key,   
//     success: function(json) {

//         // output the "capital" object inside "location"
//         alert(json);
        
//     }
// });

// $.ajax({
//     url: 'https://www.googleapis.com/geolocation/v1/geolocate?key='+access_key,
//     data: JSON.stringify({ "considerIp": "true" }),
//     type: 'POST',
//     contentType: 'application/json',
//     success: function(data) {
//       if(data.location) {
//         alert(data.location.lat + ', ' + data.location.lng);
//       } else {
//         alert('not found');
//       }
//     }
//   });

// function MY_FUNCTION () {
//       }

    $("#jalan").autocomplete({
        source: function (request, response) {
            console.log(request.term);
            $.ajax({
                type: "GET",
                cache: false,
                url: APIURL + "data/filterarea",
                headers: { "Ip-Addr": IP, token: "Bearer " + token },
                dataType: "json",
                data: {
                    province: $("#province").val(),
                    district: $("#city").val(),
                    address: request.term,
                },
                success: function (data) {
                    var dataddr = [];
                    $.each(data.data, function (k, v) {
                        dataddr.push(v[0]);
                    });
                    response(dataddr);
                },
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $("#jalan").val(ui.item.value);
        },
        open: function () {
            $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
        },
        close: function () {
            $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
        },
    });

    function check_version() {
        $.ajax({
            url: APIURL + "data/version",
            headers: {
                token: token_type + " " + token,
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            processData: false,
            cache: false,
            timeout: 600000,
            success: function (data, textStatus, jqXHR) {
                var version = data.data;
                document.getElementById("current_version").innerHTML =
                    "Versi : " + version[0]["version"];
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorHandler(jqXHR);
            },
        });
    }
});
