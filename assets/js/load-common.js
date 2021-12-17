$(document).ready(function () {
    $("#user-name").html(name);

    $("#menu_nav").load('navigation.html');
    $("#profile_menu").load('profile_menu.html');
    check_version();
    // getLocation();
    $(".avatar").prop("src", "assets/images/avatar" + prisma_level + ".png");

    // var x = document.getElementById("demo");

    // function getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition);
    //   } else { 
    //     x.innerHTML = "Geolocation is not supported by this browser.";
    //   }
    // }
    
    // function showPosition(position) {
    //     posisi = "Latitude: " + position.coords.latitude + 
    //     "<br>Longitude: " + position.coords.longitude;
    //     alert(posisi)
    // }

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
