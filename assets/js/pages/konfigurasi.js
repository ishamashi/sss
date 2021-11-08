$(function () {

    $('#addUser').click(function (e) {
        e.preventDefault();
        addUser();
    });

    filterListUser();

});

function filterListUser() {

    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/version',
        dataType: 'json',
        data: { "all": "bebas" },
        success: function (data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function (k, v) {
                perdata = {
                    "1": no,
                    "2": v['version'],
                    "3": v['created_at'],
                    "4": no==1 ? '<button class="btn btn-success btn-rounded" title="Edit User" onclick="edit_version(\'' + v['v_id'] + '\', \'' + v['version'] + '\')"><span class="fa fa-pencil"></span></button>' : '-'
                };
                dattab.push(perdata);
                no++;
            });
            var colome = [{ data: "1" }, { data: "2" }, { data: "3" }, { data: "4" }]
            setTableContent('#mst_version', colome, dattab);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status != 500) {
                if (jqXHR.status == 400) {
                    window.location = "logout.html";
                }
                var strjson = JSON.parse(jqXHR.responseText);
            } else {
            }
        }
    });
}

function setTableContent(idne, colome, datane) {
    if (!$.fn.DataTable.fnIsDataTable(idne)) {
    } else {
        $(idne).DataTable().destroy();
    }

    $(idne).DataTable({
        columns: colome,
        lengthChange: false,
        data: datane
    });
}

function edit_version(id, version) {
    if (id) {
        addUser(id, version);
    }
}

function addUser(id, pardat) {
    if (id === undefined) { id = ''; }
    if (pardat === undefined) { pardat = ''; }

    if (true) {
        var dathtml = '<div class="col-md-12">'
            + '<h4 style="text-align:left"> <span class="fa fa-plus"></span> ' + (id != "" ? "EDIT" : "ADD") + ' Version</h4>'
            + '<p> Please check the input before save </p> <hr>'
            + '<form id="formadduser">'
            + '<input type="hidden" name="v_id" value="' + id + '" />';

        dathtml += '<div class="row">'
            + '<div class="col-md-12">'
            + '<div class="form-horizontal">'
            + '<div class="panel-body form-group-separated">'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Version</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<input type="text" id="version" name="v_name" class="form-control" value="' + pardat + '" />'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';

        dathtml += '</form>'
            + '</div>'
            + '<div class="col-md-12">'
            + '<div class="col-md-8"></div>'
            + '<div class="col-md-2">'
            + '<button type="button" class="btn btn-warning" id="resetFormUser"> Reset</button>'
            + '</div>'
            + '<div class="col-md-2">'
            + '<button type="button" class="btn btn-success" id="saveUser"><span class="fa fa-save"></span> Save</button>'
            + '</div>';
        +'</div>';
        swal({
            html: dathtml,
            width: 750,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });


        $('#saveUser').click(function (e) {
            e.preventDefault();
            saveUser();
        });

        $('#resetFormUser').click(function (e) {
            e.preventDefault();
            resetFormUser();
        });

    }

}


function saveUser() {
    var form = $("#formadduser")[0];
    var data = new FormData(form);
    var indname = $('#user_login').val();
    var usremail = $('#user_email').val();
    $.ajax({
        url: APIURL + "data/version",
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        type: "POST",
        enctype: 'multipart/form-data',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function (data, textStatus, jqXHR) {
            var result = data.data;
            if (result) {
                swal({
                    title: "Success!",
                    text: "Data Saved",
                    type: "success",
                    confirmButtonText: "OK"
                });
            } else {
                swal({
                    title: "Error!",
                    text: "Duplicate User Login or Email !",
                    type: "error",
                    confirmButtonText: "OK"
                });
            }
            filterListUser();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (jqXHR.status != 500) {
                var strjson = JSON.parse(jqXHR.responseText);
                swal({
                    title: "Error",
                    text: strjson.processMessage,
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Close"
                });
            } else {
                swal({
                    title: "Error",
                    text: "Internal Server Error",
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Close"
                }, function () {
                    // location.reload();
                });
            }
        }
    });
}




function closeSwal() {
    swal.clickCancel();
}

