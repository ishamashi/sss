
var modals = [];

$(function () {

    $('#addUser').click(function (e) {
        e.preventDefault();
        addUser();
    });

    $('#addClient').click(function (e) {
        e.preventDefault();
        addClient();
    });

    $('#addCompany').click(function (e) {
        e.preventDefault();
        addComp();
    });

    $('#pancomp').click(function (e) {
        e.preventDefault();
        filterListCompany();
    });

    filterListUser();
    filterListLevel();
    UserClient(true);
    $('select').selectpicker();

});

function filterListUser() {

    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'user/usermanage',
        dataType: 'json',
        success: function (data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function (k, v) {
                perdata = {
                    "1": no,
                    "2": v[2],
                    "3": v[1],
                    "4": v[4],
                    "5": v[8],
                    "6": v[7],
                    "7": v[5] == 'A' ? 'ACTIVE' : 'INACTIVE',
                    "8": '<button class="btn btn-success btn-rounded" title="Edit User"><span class="fa fa-pencil" onclick="editUser(\'' + v[0] + '\')"></span></button>' +
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete User"><span class="fa fa-times" onclick="deleteThis(\'' + v[0] + '\')"></span></button>'
                };
                dattab.push(perdata);
                no++;
            });
            var colome = [{ data: "1" }, { data: "2" }, { data: "3" }, { data: "4" }, { data: "5" }, { data: "6" }, { data: "7" }, { data: "8", "className": "text-center" }]
            setTableContent('#mstuser', colome, dattab);

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

function filterListLevel() {

    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'user/level',
        dataType: 'json',
        success: function (data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function (k, v) {
                perdata = {
                    "1": no,
                    "2": v[1],
                    "3": v[3],
                    "4": v[4],
                    "5": v[2]
                };
                dattab.push(perdata);
                no++;
            });
            var colome = [{ data: "1" }, { data: "2" }, { data: "3" }, { data: "4" }, { data: "5" }]
            setTableContent('#mstlevel', colome, dattab);

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

function filterListCompany() {

    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'user/company',
        dataType: 'json',
        success: function (data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function (k, v) {
                perdata = {
                    "1": no,
                    "2": v[1],
                    "3": v[2],
                    "4": v[3],
                    "5": v[5] ? v[5] : 'None',
                    "6": '<button class="btn btn-success btn-rounded" title="Edit Company"><span class="fa fa-pencil" onclick="editComp(\'' + v[0] + '\')"></span></button>' +
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete Company"><span class="fa fa-times" onclick="deleteThisComp(\'' + v[0] + '\')"></span></button>'
                };
                dattab.push(perdata);
                no++;
            });
            var colome = [{ data: "1" }, { data: "2" }, { data: "3" }, { data: "4" }, { data: "5" }, { data: "6", "className": "text-center" }]
            setTableContent('#mstcompany', colome, dattab);

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

function editUser(id) {
    if (id) {
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/usermanage?idx=' + id,
            dataType: 'json',
            success: function (data) {
                if (data.data) {
                    addUser(id, data.data[0]);
                }
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
}

function addUser(id, pardat) {
    if (id === undefined) { id = ''; }
    if (pardat === undefined) { pardat = ''; }

    if (true) {
        var dathtml = '<div class="col-md-12">'
            + '<h4 style="text-align:left"> <span class="fa fa-plus"></span> ' + (id != "" ? "EDIT" : "ADD") + ' DATA USER</h4>'
            + '<p> Please check the input before save </p> <hr>'
            + '<form id="formadduser">'
            + '<input type="hidden" name="user_id" value="' + id + '" />';

        dathtml += '<div class="row">'
            + '<div class="col-md-12">'
            + '<div class="form-horizontal">'
            + '<div class="panel-body form-group-separated">'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">User Name</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<input type="text" id="user_name" name="user_name" class="form-control" value="' + (id != "" && pardat ? pardat[2] : "") + '" />'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">User Login</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<input type="text" id="user_login" name="user_login" class="form-control" value="' + (id != "" && pardat ? pardat[1] : "") + '" />'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Email</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<input type="text" id="user_email" name="user_email" class="form-control" value="' + (id != "" && pardat ? pardat[4] : "") + '" />'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Password</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<input type="text" id="user_password" name="user_password" class="form-control" value="" />'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Company</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<select class="form-control select" id="user_company" name="user_company"></select> '
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Level</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<select class="form-control select" id="user_level" name="user_level"></select> '
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Address</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<textarea name="user_address" id="user_address" class="form-control" rows="2">' + (id != "" && pardat ? pardat[3] : "") + '</textarea>'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Status</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<select class="form-control select" id="user_status" name="user_status">'
            + '<option value="A" >ACTIVE</option>'
            + '<option value="I">INACTIVE</option>'
            + '</select> '
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

        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/company',
            dataType: 'json',
            success: function (data) {
                if (typeof data != 'object') { data = $.parseJSON(data); }
                var optionsAsString = "";
                $.each(data.data, function (k, v) {
                    var ste = pardat[9] == v[0] ? 'SELECTED' : '';
                    v[1] === 'PRISMA ADS' ?
                        optionsAsString += "<option " + ste + " value='" + v[0] + "'>" + v[1] + "</option>"
                        : '';
                });
                $('#user_company').find('option').remove();
                $('#user_company').append(optionsAsString);
                $('.select').selectpicker('refresh');
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

        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/level',
            dataType: 'json',
            success: function (data) {
                if (typeof data != 'object') { data = $.parseJSON(data); }
                var optionsAsString = "";
                $.each(data.data, function (k, v) {
                    var ste = pardat[6] == v[0] ? 'SELECTED' : '';
                    v[1] != 'CLIENT' ?
                        optionsAsString += "<option " + ste + " value='" + v[0] + "'>" + v[1] + "</option>"
                        : '';
                });
                $('#user_level').find('option').remove();
                $('#user_level').append(optionsAsString);
                $('.select').selectpicker('refresh');
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

        if (id != "" && pardat) {
            $("#user_status").val(pardat[5]);
        }

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

function deleteYes(idx) {
    if (idx) {
        $.ajax({
            url: APIURL + "user/usermanage?idx=" + idx,
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            type: "DELETE",
            success: function (data, textStatus, jqXHR) {
                var result = data.data
                swal({
                    title: "Success!",
                    text: "Data Deleted",
                    type: "success",
                    confirmButtonText: "OK"
                });
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
}

function deleteThis(idx) {
    swal({
        title: "Warning",
        html: "Are you sure to Delete this Item ? ",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#ec6c62"
    }).then(function (isConfirm) {
        if (isConfirm.value) {
            deleteYes(idx)
        }
    });
}

function resetFormUser() {
    document.getElementById("formadduser").reset();
}

function resetFormClient() {
    document.getElementById("formaddclient").reset();
}

function saveUser() {
    var form = $("#formadduser")[0];
    var data = new FormData(form);
    var indname = $('#user_login').val();
    var usremail = $('#user_email').val();
    if (indname || usremail) {
        $.ajax({
            url: APIURL + "user/usermanage",
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
    } else {
        $('#user_name').first().focus();
    }
}

function editComp(id) {
    if (id) {
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/company?idx=' + id,
            dataType: 'json',
            success: function (data) {
                if (data.data) {
                    addComp(id, data.data[0]);
                }
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
}

function addComp(id, pardat) {
    if (id === undefined) { id = ''; }
    if (pardat === undefined) { pardat = ''; }

    if (true) {
        var dathtml = '<div class="col-md-12">'
            + '<h4 style="text-align:left"> <span class="fa fa-plus"></span> ' + (id != "" ? "EDIT" : "ADD") + ' DATA COMPANY</h4>'
            + '<p> Please check the input before save </p> <hr>'
            + '<form id="formaddcomp">'
            + '<input type="hidden" name="company_id" value="' + id + '" />';

        dathtml += '<div class="row">'
            + '<div class="col-md-12">'
            + '<div class="form-horizontal">'
            + '<div class="panel-body form-group-separated">'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Company Name</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<input type="text" id="company_name" name="company_name" class="form-control" value="' + (id != "" && pardat ? pardat[1] : "") + '" />'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Company Email</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<input type="text" id="company_email" name="company_email" class="form-control" value="' + (id != "" && pardat ? pardat[3] : "") + '" />'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Company Desccription</label>'
            + '<div class="col-md-9 col-xs-7">'
            + '<textarea name="company_desc" id="company_desc" class="form-control" rows="2">' + (id != "" && pardat ? pardat[2] : "") + '</textarea>'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<label class="col-md-3 col-xs-5 control-label">Company Advertiser<br><br>*(If your advertiser doesnt found, please add Data Master Advertiser first)</label>'
            + '<div class="col-md-9 col-xs-7">'
            //+'<ul class="checkbox pull-left ulfill" id="advertiser" style="text-align:left"></ul>'
            + '<select class="form-control" id="advertiser" data-live-search="true"  name="company_adv"  title="Select Advertiser">'
            + '</select>'
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
            + '<button type="button" class="btn btn-warning" id="resetFormComp"> Reset</button>'
            + '</div>'
            + '<div class="col-md-2">'
            + '<button type="button" class="btn btn-success" id="saveComp"><span class="fa fa-save"></span> Save</button>'
            + '</div>';
        +'</div>';
        swal({
            html: dathtml,
            width: 750,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });

        filterAdvSel();

        function filterAdvSel() {
            //var arrpoi = [] ;
            var arrpoi = '';
            if (pardat) {

                if (pardat[4]) {
                    //arrpoi.push(pardat[4]);
                    arrpoi = pardat[4];
                }

                console.log(arrpoi);
            }
            $.ajax({
                cache: false,
                type: 'GET',
                data: { "industry": null, 'pamstat': 1 },
                headers: { "Ip-Addr": IP, "token": "Bearer " + token },
                url: APIURL + 'data/filterindustry',
                dataType: 'json',
                success: function (data) {
                    if (typeof data != 'object') { data = $.parseJSON(data); }
                    var optionsForPam = "";
                    $.each(data.data, function (k, v) {
                        //optionsForPam += '<li> <div class="catlepam"><label style="padding-left:0px;">'+v.class_name+'</label><span class="catog arrhidden"></span></div>';
                        //optionsForPam += '<ul class="checkbox ulfill sublist">';
                        optionsForPam += '<optgroup label="' + v.class_name + '">';


                        $.each(v.subclass, function (k1, v1) {
                            var checked = "";
                            //console.log(v1.scpoid+'==');
                            if (arrpoi == v1.scpoid) {
                                checked = 'selected';
                            }
                            //optionsForPam += '<li><label> <input type="radio" '+checked+' name="company_adv" value="'+v1.scpoid+'" >'+v1.scpoiname+'</label></li>';
                            optionsForPam += '<option  value="' + v1.scpoid + '"  ' + checked + '>' + v1.scpoiname + '</option>';
                        });

                        //optionsForPam += '</ul>';
                        //optionsForPam += '</li>';
                        optionsForPam += '</optgroup>';
                    });
                    if (optionsForPam) {
                        $('#advertiser').html('');
                        $('#advertiser').append(optionsForPam);
                        //listcatle('.catlepam');
                        $('#advertiser').selectpicker();
                    }
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

        $('#saveComp').click(function (e) {
            e.preventDefault();
            saveComp();
        });

        $('#resetFormComp').click(function (e) {
            e.preventDefault();
            resetFormComp();
        });

    }

}

function deleteYesComp(idx) {
    if (idx) {
        $.ajax({
            url: APIURL + "user/company?idx=" + idx,
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            type: "DELETE",
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
                        text: "Company exist on Master User !",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                }
                filterListCompany();
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
}

function deleteThisComp(idx) {
    swal({
        title: "Warning",
        html: "Are you sure to Delete this Item ? ",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#ec6c62"
    }).then(function (isConfirm) {
        if (isConfirm.value) {
            deleteYesComp(idx)
        }
    });
}

function resetFormComp() {
    document.getElementById("formaddcomp").reset();
}

function saveComp() {
    var form = $("#formaddcomp")[0];
    var data = new FormData(form);
    var indname = $('#company_name').val();
    if (indname) {
        $.ajax({
            url: APIURL + "user/company",
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            type: "POST",
            enctype: 'multipart/form-data',
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (data, textStatus, jqXHR) {
                var result = data.data
                swal({
                    title: "Success!",
                    text: "Data Saved",
                    type: "success",
                    confirmButtonText: "OK"
                },
                    function () {
                    });
                filterListCompany();

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
    } else {
        $('#company_name').first().focus();
    }
}

function addClient(id, pardat) {
    if (id === undefined) { id = ''; }
    if (pardat === undefined) { pardat = ''; }

    if (true) {
        var dathtml = '<div class="col-md-12">'
            + '<h4 style="text-align:left"> <span class="fa fa-plus"></span> ' + (id != "" ? "EDIT" : "PENDAFTARAN") + ' KLIEN BARU</h4>'
            + '<hr style="margin-bottom:1px">'
            + '<form id="formaddclient" method="POST" enctype="multipart/form-data">'
            + '<input type="hidden" name="user_id" value="' + id + '" />';

        dathtml += '<div class="row">'
            + '<div class="col-md-12">'
            + '<div class="form-horizontal">'
            + '<div class="panel-body form-group-separated">'
            + '<h2 align="left">Profil</h2>'
            + '<br>'
            + '<div class="form-group">'
            + '<div class="col-md-12 col-xs-7">'
            + '<label class="pull-left"><b>Nama Perusahaan</b></label>'
            + '<select class="form-control" style="text-align:left" id="user_company2" name="user_company" required></select> '
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<div class="col-md-12 col-xs-7">'
            + '<label class="pull-left"><b>Nama Lengkap Client</b></label>'
            + '<select class="form-control" style="text-align:left" id="user_client" name="user_client" required></select> '
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<div class="col-md-12 col-xs-7">'
            + '<label class="pull-left"><b>Email Client</b></label>'
            + '<input type="text" id="user_email" name="user_email" class="form-control" value="" readonly />'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<div class="col-md-12 col-xs-7">'
            + '<label class="pull-left"><b>Alamat Perusahaan</b></label>'
            + '<textarea name="user_address" id="user_address" class="form-control" rows="2" readonly></textarea>'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<div class="col-md-12 col-xs-7">'
            + '<label class="pull-left"><b>Status</b></label>'
            + '<br>'
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<div class="col-md-12 col-xs-7">'
            + '<div class="pull-left">'
            + '<input type="radio" class="form-check-input" value="A" name="status" checked id="status"><label class="form-check-label" > &nbsp;&nbsp;Aktif</label> &nbsp;&nbsp;'
            + '<input type="radio" class="form-check-input" value="N" name="status" id="status"><label class="form-check-label" > &nbsp;&nbsp;Tidak Aktif</label>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<br>'
            + '<h2 align="left">Layanan</h2>'
            + '<br>'
            + '<div class="form-group">'
            + '<div class="col-md-12 col-xs-7">'
            + '<label class="pull-left"><b>Akses Provinsi</b></label>'
            + '<select class="form-control" id="user_provinsi" name="user_provinsi[]" multiple required></select> '
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<div class="col-md-12 col-xs-7">'
            + '<label class="pull-left"><b>Akses Industri</b></label>'
            + '<select class="form-control" id="user_industry" name="user_industry[]" multiple required></select> '
            + '</div>'
            + '</div>'
            + '<div class="form-group">'
            + '<div class="col-md-9 col-xs-7">'
            + '<label class="pull-left"><b>Masa Layanan (Mulai)</b></label>'
            + '<br>'
            + '<input type="hidden" class="form-control" name="start_date" id="start_date" required>'
            + '<input type="hidden" class="form-control" name="end_date" id="end_date" required>'
            + '<input type="text" class="form-control date-picker" readonly name="masa_layanan" placeholder="Tanggal Mulai Layanan" id="masa_layanan" required>'
            + '</div>'
            + '<div class="col-md-3 col-xs-7">'
            + '<label class="pull-left"><b>Durasi</b></label>'
            + '<input type="number" class="form-control" name="bulan_layanan" placeholder="Bulan" min="0" id="bulan_layanan" readonly required>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>';

        dathtml += '</form>'
            + '</div>'
            + '<div class="col-md-12">'
            + '<div class="col-md-2">'
            + '<button type="button" class="btn btn-warning pull-left" id="resetFormClient"> Reset</button>'
            + '</div>'
            + '<div class="col-md-2">'
            + '<button type="button" class="btn btn-success pull-left" id="saveClient"><span class="fa fa-save"></span> Save</button>'
            + '</div>';
        +'</div>';
        swal({
            html: dathtml,
            width: 500,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            onOpen: function () {
                $('#masa_layanan').daterangepicker({
                    format: 'MM/DD/YY',
                    autoclose: true,
                    opens: "center",
                    drops: "up",
                    autoApply: true,
                    minDate: moment().add(0, 'days'),
                    autoclose: true
                }, function (start, end, label) {
                    console.log("A new date selection was made: " + start.format('MM/DD/YY') + ' to ' + end.format('MM/DD/YY'));
                    $('#start_date').val(start.format('MM/DD/YY'));
                    $('#end_date').val(end.format('MM/DD/YY'));

                    //     new Date(2008, 10, 4), // November 4th, 2008
                    var diff_start = new Date(moment(start).format('YYYY'), moment(start).format('MM'), moment(start).format('DD'))
                    var diff_end = new Date(moment(end).format('YYYY'), moment(end).format('MM'), moment(end).format('DD'))

                    var getDiff = getDiffMonths(diff_start, diff_end);
                    $('#bulan_layanan').val(getDiff);
                });
            }
        });

        $('#user_client').prop('disabled', 'disabled');

        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/company',
            dataType: 'json',
            success: function (data) {
                if (typeof data != 'object') { data = $.parseJSON(data); }
                var optionsAsString = "<option></option>";
                $.each(data.data, function (k, v) {
                    var ste = pardat[9] == v[0] ? 'SELECTED' : '';
                    optionsAsString += "<option " + ste + " value='" + v[5] + "' data-id='" + v[6] + "'>" + v[1] + "</option>";
                });
                $('#user_company2').find('option').remove();
                $('#user_company2').append(optionsAsString);
                // $('.select').selectpicker('refresh');
                // $("$user_company").select2('refresh');

                $('#user_company2').on('change', function () {
                    $("#user_email").val('');
                    $("#user_address").val('');
                    $('#user_client').val(null).trigger('change');
                    $.ajax({
                        cache: false,
                        type: 'GET',
                        data: {},
                        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
                        url: APIURL + 'user/clientmanage?id_k=' + $(this).val(),
                        dataType: 'json',
                        success: function (data) {
                            if (typeof data != 'object') { data = $.parseJSON(data); }
                            var optionsAsString = "<option></option>";
                            if (data.data != 'No Data') {
                                $.each(data.data, function (k, v) {
                                    // alert(v['nama_pic']);
                                    optionsAsString += "<option data-nama='" + v['nama_pic'] + "' value='" + v['email_pic'] + "|" + v['alamat_klien'] + "'>" + v['nama_pic'] + "</option>";
                                });
                                $('#user_client').find('option').remove();
                                $('#user_client').append(optionsAsString);
                                $('#user_client').prop('disabled', false);

                                // Menu mengambil nilai klien
                                $('#user_client').on('change', function () {
                                    var str = $(this).val();
                                    if (str != '' && str != null) {
                                        console.log(str);
                                        var email = str.split("|")[0];
                                        var address = str.split("|")[1];
                                        $("#user_email").val(email);
                                        $("#user_address").val(address);
                                    }
                                });
                            } else {
                                $('#user_client').prop('disabled', true);
                                $('#user_client').find('option').remove();
                                alert('Klien Tidak Di Temukan Untuk Perusahaan Ini, Silahkan Tambahkan Klien Melalui Aplikasi ERP');
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (jqXHR.status != 500) {
                                var strjson = JSON.parse(jqXHR.responseText);
                                alert('Klien Tidak Di Temukan Untuk Perusahaan Ini');
                            } else {
                                $('#user_client').prop('disabled', true);
                                $('#user_client').find('option').remove();
                                alert('Klien Tidak Di Temukan Untuk Perusahaan Ini, Silahkan Tambahkan Klien Melalui Aplikasi ERP');
                            }
                        }
                    });
                });
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

        $.ajax({
            cache: false,
            type: 'GET',
            data: {},
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/filterindustry',
            dataType: 'json',
            success: function (data) {
                if (typeof data != 'object') { data = $.parseJSON(data); }
                var optionsAsString = "";
                $.each(data.data, function (k, v) {
                    var ste = pardat[9] == v[0] ? 'SELECTED' : '';
                    optionsAsString += "<option " + ste + " value='" + v[0] + "'>" + v[1] + "</option>";
                });
                $('#user_industry').find('option').remove();
                $('#user_industry').append(optionsAsString);
            }
        });

        $.ajax({
            url: APIURL + "data/filterarea?province=" + province + "&city=" + city,
            headers: {
                "token": token_type + " " + token
            },
            type: "GET",
            contentType: "application/json",
            dataType: 'json',
            processData: false,
            cache: false,
            timeout: 600000,
            success: function (data) {
                if (typeof data != 'object') { data = $.parseJSON(data); }
                var optionsAsString = "";
                $.each(data.data, function (k, v) {
                    var ste = pardat[9] == v[0] ? 'SELECTED' : '';
                    optionsAsString += "<option " + ste + " value='" + v[0] + "'>" + v[1] + "</option>";
                });
                $('#user_provinsi').find('option').remove();
                $('#user_provinsi').append(optionsAsString);
                // $('#user_industry').selectpicker('refresh');
                // $("$user_company").select2('refresh');
            }
        });

        if (id != "" && pardat) {
            $("#user_status").val(pardat[5]);
        }

        $('#saveClient').click(function (e) {
            e.preventDefault();
            // alert('klien');
            saveClient();
        });

        $('#resetFormClient').click(function (e) {
            e.preventDefault();
            resetFormClient();
            $('#user_industry').val(null).trigger('change');
            $('#user_company2').val(null).trigger('change');
            $('#user_provinsi').val(null).trigger('change');
            $('#user_client').val(null).trigger('change');
        });

    }
    $("#user_industry").select2({
        placeholder: '-- Pilih Industri Yang Bisa Di Pilih --'
    });

    $("#user_company2").select2({
        placeholder: '-- Pilih Nama Perusahaan --'
    });

    $("#user_provinsi").select2({
        placeholder: '-- Pilih Provinsi Yang Bisa Di Akses --',
    });

    $("#user_client").select2({
        placeholder: "-- Silahkan Pilih Klien --",
        allowClear: true
    });
}

async function aksesProvinsi(selectorProvinsi, selected = [], readonly = false) {
    var data = await getDataProvinsi().catch(err => err);

    var provinsi = $(`#${selectorProvinsi}`).select2({
        data,
        placeholder: '-- Pilih Provinsi Yang Bisa Di Akses --',
    });

    if (selected.length > 0) provinsi.select2('val', selected);
    if (readonly) provinsi.select2({ disabled: readonly });
}

async function aksesIndustri(selectorIndustri, selected = [], readonly = false) {
    var data = await getDataIndustri().catch(err => err);

    var industry = $(`#${selectorIndustri}`).select2({
        data,
        placeholder: '-- Pilih Industri Yang Bisa Di Pilih --'
    });

    if (selected.length > 0) industry.select2('val', selected);
    if (readonly) industry.select2({ disabled: readonly });
}

function getDataIndustri() {
    return new Promise((resolve, reject) => {
        $.ajax({
            cache: false,
            type: 'GET',
            data: {},
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/filterindustry',
            dataType: 'json',
            success: function ({ data }) {
                // if (typeof data != 'object') { data = $.parseJSON(data); }
                var temp = [];
                if (data.length > 0) {
                    temp = data.map((item) => {
                        return {
                            id: item[0],
                            text: item[1],
                            source: item
                        }
                    });
                    resolve(temp);
                } else {
                    resolve(false);
                }
            },
            error: function (err) {
                console.log(err);
                reject(err);
            }
        });
    })
}

function getDataProvinsi(province = '', city = '') {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: APIURL + "data/filterarea?province=" + province + "&city=" + city,
            headers: {
                "token": token_type + " " + token
            },
            type: "GET",
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            timeout: 600000,
            success: function ({ data }) {
                // if (typeof data != 'object') data = $.parseJSON(data);
                var temp = [];
                if (data.length > 0) {
                    temp = data.map((item) => {
                        return {
                            id: item[0],
                            text: item[1],
                            source: item
                        }
                    })
                    resolve(temp);
                } else {
                    resolve(false);
                }
            },
            error: function (err) {
                console.log(err);
                reject(err);
            }
        });
    })
}

// User Client
function UserClient(firstCall = false) {
    var resend_email = true;
    $.ajax({
        cache: true,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'user/clientmanage',
        dataType: 'json',
        success: function (data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function (k, v) {
                var base64 = btoa(JSON.stringify(v));

                perdata = {
                    "1": no,
                    "2": v['user_name'],
                    "3": v['user_login'],
                    "4": v['level_name'],
                    "5": v['user_email'],
                    "6": v['company_name'],
                    "7": v['user_status'] == 'A' ? 'Aktif' : 'Non Aktif',
                    "8": (v['confirmation_status'] === 'F') ?
                        '&nbsp;&nbsp;<button class="btn btn-primary btn-rounded" title="Resend e-Mail" onclick="resend_mail(\'' + base64 + '\')"><span class="fa fa-envelope"></span></button>' +
                        '&nbsp;&nbsp;<button class="btn btn-default btn-rounded" title="Detail User" onclick="detailClient(\'' + base64 + '\')"><span class="fa fa-eye"></span></button>' +
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete User" onclick="deleteThis(\'' + v['user_id'] + '\')"><span class="fa fa-trash" ></span></button>'
                        :
                        '&nbsp;&nbsp;<button class="btn btn-default btn-rounded" title="Detail User" onclick="detailClient(\'' + base64 + '\')"><span class="fa fa-eye"></span></button>' +
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete User" onclick="deleteThis(\'' + v['user_id'] + '\')"><span class="fa fa-trash" ></span></button>'
                };
                dattab.push(perdata);
                no++;
            });
            var colome = [{ data: "1" }, { data: "2" }, { data: "3" }, { data: "4" }, { data: "5" }, { data: "6" }, { data: "7" }, { data: "8" }]
            // setTableContent('#example', colome, dattab);
            if (firstCall) $('#example thead tr').clone(true).addClass('filters').appendTo('#example thead');
            var table = $('#example').DataTable({
                columns: colome,
                lengthChange: false,
                data: dattab,
                orderCellsTop: true,
                fixedHeader: true,
                destroy: true,
            });

            table.columns().eq(0).each(function (colIdx) {
                var cell = $('.filters .kolom').eq($(table.column(colIdx).header()).index());
                // console.log(cell);
                var title = $(cell).text();
                $(cell).html('<input type="text" class="form-control" placeholder="Cari..." />');

                $('input', $('.filters th').eq($(table.column(colIdx).header()).index())).off('keyup change').on('keyup change', function (e) {
                    e.stopPropagation();
                    $(this).attr('title', $(this).val());
                    var regexr = '({search})'; //$(this).parents('th').find('select').val();
                    table
                        .column(colIdx)
                        .search((this.value != "") ? regexr.replace('{search}', '(((' + this.value + ')))') : "", this.value != "", this.value == "")
                        .draw();

                });

                $('select', $('.filters th').eq($(table.column(colIdx).header()).index())).off('change').on('change', function () {
                    $(this).parents('th').find('input').trigger('change');
                });
            });

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

function getDetailUser(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/usermanage?idx=' + id,
            dataType: 'json',
            success: function (data) {
                console.log("DATA DETAIL", { id, data })
                resolve(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject(jqXHR);
                if (jqXHR.status != 500) {
                    if (jqXHR.status == 400) {
                        window.location = "logout.html";
                    }
                    var strjson = JSON.parse(jqXHR.responseText);
                } else {
                }
            }
        });
    })
}

function htmlLayananNonAktif(dataLayanan = [], base64 = "") {
    var html = "";
    if (dataLayanan.length < 1) return html;

    dataLayanan.forEach((item) => {
        if (item.status === 'N') {
            var detailLayanan = btoa(JSON.stringify(item));
            html += `<div class="col-md-6 col-sm-6 col-xs-6">
                        <a href="javascript:void(0)" onclick="detailLayanan('${base64}', '${detailLayanan}')" style="text-decoration: none; color: #545454">
                            <div class="panel panel-default bg-secondary">
                                <div class="panel-body">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <p class="font-large">Layanan 1</p>
                                        </div>
                                    </div>
                                    <br/>
                                    <p class="d-flex justify-content-start font-normal text-left">${moment(item.start_date).format('DD MMM YYYY')} - ${moment(item.end_date).format('DD MMM YYYY')}</p>
                                    <br/>
                                    <div class="d-flex justify-content-end" style="align-items: center">
                                        <p class="font-large">Non-Aktif</p>
                                        <img src="./assets/images/icons/remove.png" class="mx-1" style="width: 20px;height: 20px;">
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>`
        }
    });

    return html;
}

function htmlLayananAktif(dataLayanan = [], base64 = "") {
    var html = "";
    if (dataLayanan.length < 1) return html;

    dataLayanan.forEach((item) => {
        if (item.status === 'A') {
            var detailLayanan = btoa(JSON.stringify(item));
            html += `
                <div class="panel panel-default bg-custom text-white">
                    <div class="panel-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="font-large">Layanan 1</p>
                            </div>
                            <div class="d-flex" style="align-items: center">
                                <p class="font-large">Aktif</p>
                                <img src="./assets/images/icons/check.png" class="mx-1" style="width: 20px;height: 20px;">
                            </div>
                        </div>
                        <br/>
                        <p class="d-flex justify-content-start">${moment(item.start_date).format('DD MMMM YYYY')} - ${moment(item.end_date).format('DD MMMM YYYY')}</p>
                        <div class="d-flex justify-content-between">
                            <p id="timerCount" data-startdate="${moment(item.end_date)}"></p>
                            <a href="javascript:void(0)" onclick="detailLayanan('${base64}', '${detailLayanan}')" class="btn btn-warning" style="background-color: hsl(58deg 100% 59% / 65%) !important; border-radius: 2em; !important">Lihat Detail</a>
                        </div>
                    </div>
                </div>
            `
        }
    });

    return html;
}

function diffDates(end, start = '') {
    var now = moment();
    var end = moment(end);
    var duration = moment.duration(end.diff(now));

    //Get Days and subtract from duration
    var days = duration.asDays();
    duration.subtract(moment.duration(days, 'days'));

    //Get hours and subtract from duration
    var hours = duration.hours();
    duration.subtract(moment.duration(hours, 'hours'));

    //Get Minutes and subtract from duration
    var minutes = duration.minutes();
    duration.subtract(moment.duration(minutes, 'minutes'));

    //Get seconds
    var seconds = duration.seconds();
    return `${Math.round(days)}d, ${hours}h ${minutes}m ${seconds}s`;
}

async function detailClient(base64) {
    loading(true);
    var getSourcePerusahaan = {}
        , getSourceUserClient = {}
        , dataClient = [];
    var detail = JSON.parse(atob(base64));
    var dataLayanan = await getDataDetailLayanan(detail.user_id).catch(err => {
        console.log("CATCH LAYANAN", err.responseJSON.processMessage);
        return [];
    });
    // console.log("DATA LAYANAN", dataLayanan)
    var dataPerusahaan = await getDataPerusahaan().catch(err => err);

    var html = `
        <h3 class="m-0 text-left">Detail Client</h3>
        <hr/>
        <ul class="nav nav-tabs" role="tablist">
            <li class="active">
                <a href="#pengaturan-profil" role="tab" data-toggle="tab">Pengaturan Profil</a>
            </li>
            <li>
                <a href="#pengaturan-langganan" role="tab" data-toggle="tab">Pengaturan Langganan</a>
            </li>
        </ul>
        <div class="panel-body tab-content">
            <div class="tab-pane active" id="pengaturan-profil" style="height: 55vh;overflow: auto;overflow-x: hidden;">
                <form id="form-update" class="" method="post">
                <div class="row">
                    <div class="col-md-12">
                        <div class="form-horizontal">

                            <div class="form-group">
                                <div class="col-md-12 col-xs-7">
                                    <label class="pull-left"><b>Nama Perusahaan</b></label>
                                    <select class="form-control" style="text-align:left" id="user_company2" name="user_company" required></select> 
                                </div>
                            </div>
                        
                            <div class="form-group">
                                <div class="col-md-12 col-xs-7">
                                    <label class="pull-left"><b>Nama Lengkap Client</b></label>
                                    <input type="hidden" id="username" name="username" class="form-control" readonly />
                                    <select class="form-control" style="text-align:left;width: 100% !important;" id="user_client" name="user_client" required></select> 
                                </div>
                            </div>
                        
                            <div class="form-group">
                                <div class="col-md-12 col-xs-7">
                                    <label class="pull-left"><b>Email Client</b></label>
                                    <input type="hidden" id="old_email" name="old_email" class="form-control" readonly />
                                    <input type="text" id="user_email" name="user_email" class="form-control" value="" readonly />
                                </div>
                            </div>
                        
                            <div class="form-group">
                                <div class="col-md-12 col-xs-7">
                                    <label class="pull-left"><b>Alamat Perusahaan</b></label>
                                    <textarea name="user_address" id="user_address" class="form-control" rows="2" readonly></textarea>
                                </div>
                            </div>                            
                        
                            <div class="form-group">
                                <div class="col-md-12 col-xs-7">
                                    <label class="pull-left"><b>Status</b></label>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-12 col-xs-7">
                                    <div class="pull-left">
                                        <input type="radio" class="form-check-input" value="A" name="status" id="status"><label class="form-check-label" > &nbsp;&nbsp;Aktif</label> &nbsp;&nbsp;
                                        <input type="radio" class="form-check-input" value="N" name="status" id="status"><label class="form-check-label" > &nbsp;&nbsp;Tidak Aktif</label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <a href="javascript:void(0)" onclick="closeSwal()" class="btn btn-default btn-lg mx-1">Tutup</a>
                    <a href="javascript:void(0)" id="btnSubmit" onclick="updateProfile('${base64}')" class="btn btn-primary btn-lg mx-1">Simpan</a>
                </div>
            </div>
            <div class="tab-pane" id="pengaturan-langganan">
                <div style="height: 55vh;overflow: auto;overflow-x: hidden;position:relative;">
                    <h3 class="text-left">Layanan Aktif</h3>
                    ${htmlLayananAktif(dataLayanan, base64)}
                    <h3 class="text-left">Layanan Non-Aktif</h3>
                        <div class="row">${htmlLayananNonAktif(dataLayanan, base64)}</div>
                    </div>
                    <div class="d-flex justify-content-around" style="position: fixed;bottom: 20%;right: 35%;">
                        <a href="javascript:void(0)" class="btn btn-primary btn-lg" onclick="buatLayananBaru('${base64}')" style="border-radius: 50%;"><span>&#43;</span></a>
                    </div>
                    <hr class="mt-0" />
                    <div class="d-flex justify-content-end">
                        <a href="javascript:void(0)" onclick="closeSwal()" class="btn btn-default btn-lg">Tutup</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    swal({
        html: html,
        width: 600,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
    });

    $("#user_company2").select2({
        placeholder: '-- Pilih Nama Perusahaan --',
        data: dataPerusahaan,
        // disabled: true,
    }).select2('val', detail.company_id);
    $("#user_company2").attr("readonly", "readonly");

    getSourcePerusahaan = $("#user_company2 :selected");
    if (typeof getSourcePerusahaan.data() !== 'undefined') {
        getSourcePerusahaan = $("#user_company2 :selected").data().data.source;
        console.log("GET SOURCE PERUSAHAAN", getSourcePerusahaan);
        dataClient = await getDataClient(getSourcePerusahaan[5]).catch(err => err);
    }
    loading(false);

    console.log({
        company: dataPerusahaan,
        client: dataClient,
        source_company: getSourcePerusahaan,
        detail,
        dataLayanan
    });

    if (!dataClient) return alert("Client tidak ditemukan !");

    $("#user_client").select2({
        placeholder: "-- Silahkan Pilih Klien --",
        allowClear: true,
        data: dataClient,
        minimumInputLength: 1,
    }).select2('val', detail.user_email);

    getSourceUserClient = $("#user_client :selected");

    if (typeof getSourceUserClient.data() !== 'undefined') {
        var sourceClient = getSourceUserClient.data().data.source;
        console.log("Source Client", getSourceUserClient.data().data.source);
        $('#username').val(sourceClient.nama_pic);
        $('#old_email').val(sourceClient.email_pic);
        $('#user_email').val(sourceClient.email_pic);
        $('#user_address').val(sourceClient.alamat_klien);
    }

    $("#user_client").on('change', function () {
        var getSourceUserClient = $("#user_client :selected").data().data.source;
        $('#username').val(getSourceUserClient.nama_pic);
        $('#user_email').val(getSourceUserClient.email_pic);
        $('#user_address').val(getSourceUserClient.alamat_klien);
    });

    $(`input[name="status"][value='${detail.user_status}']`).prop("checked", true);
}

async function getDetailPic(company_id, email_pic) {
    var dataPerusahaan = await getDataPerusahaan().catch(err => err);
    var detailPerusahaan = dataPerusahaan.find((item) => item.id === company_id);
    var dataPic = await getDataClient(detailPerusahaan.source[5]).catch(err => err);
    var detailPic = dataPic.find((item) => item.id === email_pic);
    if (typeof detailPic === 'undefined') alert('Email PIC Tidak terdaftar.');
    return detailPic;
}

async function updateProfile(base64) {
    var detail = JSON.parse(atob(base64));
    var form = $('#form-update')[0];
    var old_email = $('#old_email').val();
    var user_client = $('#user_client').val();
    var new_email = $('#user_email').val();
    var username = $('#username').val();

    if (!form.checkValidity()) return alert('Harap lengkapi form !');
    var data = {
        u_mail: old_email,
        status: $('input[name="status"]:checked').val(),
        u_name: username,
    }

    if (new_email !== old_email) {
        data['u_mail_new'] = new_email;
        var detailPic = await getDetailPic(detail.company_id, new_email);
        data['address'] = detailPic.source.alamat_klien;
    }

    // else{
    //     var detailPic = await getDetailPic(detail.company_id, old_email);
    // }

    // console.log("value", data);
    var update = await submitUpdateProfile(data).catch((err) => err.responseJSON);

    if (update.processMessage === "Success") {
        swal({
            title: "Success!",
            text: "Data Updated! ",
            type: "success",
            confirmButtonText: "OK"
        });
    } else {
        swal({
            title: "Error",
            text: update.processMessage,
            type: "error",
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Close"
        });
    }

    UserClient();
}

function submitUpdateProfile(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: APIURL + `user/clientmanage`,
            cache: false,
            delay: 250,
            type: 'PUT',
            data: data,
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            dataType: 'json',
            beforeSend: function () {
                disabledButton('btnSubmit');
            },
            success: function (data) {
                disabledButton('btnSubmit', false);
                resolve(data);
            },
            error: function (err) {
                disabledButton('btnSubmit', false);
                console.log("ERROR", err.responseJSON);
                reject(err);
            }
        });
    });
}

function getDataDetailLayanan(user_id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: APIURL + `user/layanan?u_id=${user_id}`,
            cache: false,
            delay: 250,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            dataType: 'json',
            success: function ({ data }) {
                resolve(data);
            },
            error: function (err) {
                console.log("ERROR", err.responseJSON);
                reject(err);
            }
        });
    });
}

function detailLayanan(dataParent, dataChild) {
    var data = JSON.parse(atob(dataChild));
    // console.log("DETAIL LAYANAN", data);

    var html = `
        <h3 class="m-0 text-left">Detail Layanan</h3>
        <hr/>
        <div class="row">
            <div class="col-md-12">
                <div class="form-horizontal">
                    <div class="panel-body form-group-separated">
                        <div class="form-group">
                            <div class="col-md-12 col-xs-7">
                                <label class="pull-left"><b>Nama Layanan</b></label>
                                <input type="text" class="form-control" style="text-align:left" value="Layanan 1" required readonly> 
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 col-xs-7">
                                <label class="pull-left"><b>Akses Provinsi</b></label>
                                <select class="form-control" id="user_provinsi" name="user_provinsi[]" multiple required readonly></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 col-xs-7">
                                <label class="pull-left"><b>Akses Industri</b></label>
                                <select class="form-control" id="user_industry" name="user_industry[]" multiple required readonly></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-9 col-sm-6 col-xs-6">
                                <label class="pull-left"><b>Masa Layanan</b></label>
                                <input type="text" class="form-control date-picker" readonly name="masa_layanan" placeholder="Tanggal Mulai Layanan" id="masa_layanan" required>
                            </div>
                            <div class="col-md-3 col-sm-6 col-xs-6">
                                <label class="pull-left"><b>Durasi</b></label>
                                <input type="number" class="form-control" name="bulan_layanan" placeholder="Bulan" min="0" id="bulan_layanan" required readonly>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-end">
            <a href="javascript:void(0)" onclick="closeSwal()" class="btn btn-default btn-lg mx-1">Batal</a>
        </div>
    `;

    swal({
        html: html,
        width: 600,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        onClose: () => {
            detailClient(dataParent);
        },
        onOpen: () => {
            $('#masa_layanan').val(`${moment(data.start_date).format('DD MMMM YYYY')} - ${moment(data.end_date).format('DD MMMM YYYY')}`);

            var diff_start = new Date(moment(data.start_date).format('YYYY'), moment(data.start_date).format('MM'), moment(data.start_date).format('DD'))
            var diff_end = new Date(moment(data.end_date).format('YYYY'), moment(data.end_date).format('MM'), moment(data.end_date).format('DD'))

            var getDiff = getDiffMonths(diff_start, diff_end);
            $('#bulan_layanan').val(getDiff);

            var selectedProvinsi = (data.provinsi.length > 0) ? data.provinsi.map((item) => item.id) : [];
            var selectedIndustry = (data.industry.length > 0) ? data.industry.map((item) => item.id) : [];

            aksesProvinsi('user_provinsi', selectedProvinsi, true);
            aksesIndustri('user_industry', selectedIndustry, true);
        }
    });
}

async function buatLayananBaru(base64) {
    var tempDates = [];
    var detail = JSON.parse(atob(base64));
    var dataLayanan = await getDataDetailLayanan(detail.user_id).catch(err => err);

    await Promise.all(
        dataLayanan.map((item) => {
            var getRangeDate = getRange(moment(item.start_date).format('YYYY-MM-DD'), moment(item.end_date).format('YYYY-MM-DD'), 'days');
            if (getRangeDate.length > 0) tempDates = tempDates.concat(getRangeDate);
        })
    )

    tempDates = tempDates.filter((item, index) => {
        return (tempDates.indexOf(item) == index)
    })

    var html = `
        <h3 class="m-0 text-left">Buat Layanan Baru</h3>
        <hr/>
        <div class="row">
            <div class="col-md-12">
                <form id="formaddclient" method="POST" enctype="multipart/form-data">
                <div class="form-horizontal">
                    <div class="panel-body form-group-separated">
                        <div class="form-group">
                            <div class="col-md-12 col-xs-7">
                                <label class="pull-left"><b>Nama Layanan</b></label>
                                <input type="hidden" class="form-control" id="user_id" value="${detail.user_id}" required readonly />
                                <input type="text" class="form-control" style="text-align:left" value="Layanan 1" required readonly />
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 col-xs-7">
                                <label class="pull-left"><b>Akses Provinsi</b></label>
                                <select class="form-control" id="user_provinsi" name="user_provinsi[]" multiple required></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12 col-xs-7">
                                <label class="pull-left"><b>Akses Industri</b></label>
                                <select class="form-control" id="user_industry" name="user_industry[]" multiple required></select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-9 col-sm-6 col-xs-6">
                                <label class="pull-left"><b>Masa Layanan</b></label>
                                <input type="hidden" class="form-control" id="start_date">
                                <input type="hidden" class="form-control" id="end_date">
                                
                                <input type="text" class="form-control date-picker" readonly name="masa_layanan" placeholder="Tanggal Mulai Layanan" id="masa_layanan" required>
                            </div>
                            <div class="col-md-3 col-sm-6 col-xs-6">
                                <label class="pull-left"><b>Durasi</b></label>
                                <input type="number" class="form-control" name="bulan_layanan" placeholder="Bulan" min="0" id="bulan_layanan" readonly>
                            </div>
                        </div>

                    </div>
                </div>
                </form>
            </div>
        </div>
        <hr>
        <div class="d-flex justify-content-end">
            <a href="javascript:void(0)" onclick="closeSwal()" class="btn btn-default btn-lg mx-1">Batal</a>
            <a href="javascript:void(0)" onclick="submitAddLayanan()" id="btnSubmit" class="btn btn-primary btn-lg mx-1">Simpan</a>
        </div>
    `;

    swal({
        html: html,
        width: 600,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        onClose: () => {
            detailClient(base64);
        },
        onOpen: () => {
            $('#masa_layanan').daterangepicker({
                format: 'MM/DD/YY',
                autoclose: true,
                opens: "center",
                drops: "up",
                autoApply: true,
                minDate: moment().add(1, 'days'),
                isInvalidDate: function (date) {
                    return searchingDayIfExists(tempDates, moment(date).format('YYYY-MM-DD'));
                },
            }, function (start, end, label) {
                console.log("A new date selection was made: " + start.format('MM/DD/YY') + ' to ' + end.format('MM/DD/YY'));
                $('#start_date').val(start.format('MM/DD/YY'));
                $('#end_date').val(end.format('MM/DD/YY'));

                //     new Date(2008, 10, 4), // November 4th, 2008
                var diff_start = new Date(moment(start).format('YYYY'), moment(start).format('MM'), moment(start).format('DD'))
                var diff_end = new Date(moment(end).format('YYYY'), moment(end).format('MM'), moment(end).format('DD'))

                var getDiff = getDiffMonths(diff_start, diff_end);
                $('#bulan_layanan').val(getDiff);

            });
            aksesProvinsi('user_provinsi');
            aksesIndustri('user_industry');
        }
    });
}

function submitAddLayanan() {
    var form = $("#formaddclient")[0];
    if (!form.checkValidity()) return alert('Harap lengkapi form !');
    if ($('#bulan_layanan').val() === '') return alert('Harap pilih masa layanan');

    let data = {
        u_id: $('#user_id').val(),
        l_prov: $('#user_provinsi').val().join(';'),
        l_ind: $('#user_industry').val().join(';'),
        l_sdate: $('#start_date').val(),
        l_edate: $('#end_date').val(),
    }

    $.ajax({
        url: APIURL + 'user/layanan',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        type: 'POST',
        cache: false,
        data: data,
        dataType: 'json',
        beforeSend: function () {
            loading(true);
            disabledButton('btnSubmit');
        },
        success: function (result, textStatus, jqXHR) {
            loading(false);
            disabledButton('btnSubmit', false);

            if (result.processMessage === 'Success') {
                swal({
                    title: "Success!",
                    text: "Layanan berhasil dibuat !",
                    type: "success",
                    confirmButtonText: "OK"
                });
            }
            UserClient();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            loading(false);
            disabledButton('btnSubmit', false);

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

function disabledButton(selector, disabled = true) {
    if (disabled) {
        $(`#${selector}`).attr('disabled', 'disabled');
        $(`#${selector}`).addClass('disabled');
    } else {
        $(`#${selector}`).removeAttr('disabled');
        $(`#${selector}`).removeClass('disabled');
    }
}

function searchingDayIfExists(array = [], value = '') {
    var exists = false;
    if (array.length < 1) return false;

    array.find((item) => {
        if (item === value) {
            exists = true;
        }
    });

    return exists;
}

function getRange(startDate, endDate, type, format = 'YYYY-MM-DD') {
    let fromDate = moment(startDate)
    let toDate = moment(endDate)
    let diff = toDate.diff(fromDate, type)
    let range = []
    for (let i = 0; i <= diff; i++) {
        range.push(moment(startDate).add(i, type).format(format))
    }
    return range;
}

function getDataPerusahaan() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: APIURL + 'user/company',
            cache: false,
            delay: 250,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            dataType: 'json',
            success: function ({ data }) {
                var temp = [];
                if (data.length > 0) {
                    temp = data.map((item) => {
                        return {
                            id: item[6],
                            text: item[1],
                            source: item
                        }
                    });
                    resolve(temp);
                }
            },
            error: function (err) {
                console.log(err.message);
                reject(err);
            }
        });
    });
}

function closeSwal() {
    swal.clickCancel();
}

async function getDataClient(value) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: APIURL + 'user/clientmanage?id_k=' + value,
            cache: false,
            type: 'GET',
            data: {},
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            dataType: 'json',
            success: function ({ data }) {
                var temp = [];
                if (data !== 'No Data' && data.length > 0) {
                    $.each(data, (k, v) => {
                        temp.push({
                            id: v.email_pic,
                            text: v.nama_pic,
                            source: v
                        });
                    });
                    resolve(temp);
                } else {
                    resolve(false);
                }
            },
            error: function (err) {
                console.log(err);
                reject(err);
            }
        })
    })
}

async function resend_mail(base64) {
    var data = JSON.parse(atob(base64));
    var param = "";

    var dataLayanan = await getDataDetailLayanan(data.user_id).catch(err => {
        console.log("CATCH LAYANAN", err.responseJSON.processMessage);
        return false;
    });

    var getLayananActive = dataLayanan.find((item) => item.status === 'A');

    var detailPic = await getDetailPic(data.company_id, data.user_email);
    var { user_name, user_status, user_email, company_id } = data;

    var manageClient = {
        u_name: user_name,
        u_status: user_status,
        u_mail: user_email,
        c_id: company_id,
        resend: true,
        address: detailPic.source.alamat_klien
    }

    console.log("DATA", { getLayananActive });

    if (typeof getLayananActive !== 'undefined') {
        manageClient['l_prov'] = getLayananActive.provinsi.map((item) => item.id).join(';');
        manageClient['l_ind'] = getLayananActive.industry.map((item) => item.id).join(';');
        manageClient['l_sdate'] = moment(getLayananActive.start_date).format('MM/DD/YYYY')
        manageClient['l_edate'] = moment(getLayananActive.end_date).format('MM/DD/YYYY')
    } else {
        alert("Tidak ada layanan yang aktif !");
        manageClient['l_prov'] = null;
        manageClient['l_ind'] = null;
        manageClient['l_sdate'] = null;
        manageClient['l_edate'] = null;
    }

    console.log("manageClient", { manageClient, detailPic, getLayananActive });

    $.ajax({
        // OLD
        // url: APIURL + "user/usermanages",
        url: APIURL + "user/clientmanage",
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        type: "POST",
        data: manageClient,
        cache: false,
        timeout: 600000,
        beforeSend: function () {
            loading(true);
        },
        success: function (data, textStatus, jqXHR) {
            loading(false);
            var result = data.data;
            if (result) {
                swal({
                    title: "Success!",
                    text: "Email berhasil dikirim ulang!",
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

            UserClient();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            loading(false);
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

function saveClient() {
    var form = $("#formaddclient")[0];
    if (!form.checkValidity()) return alert('Harap lengkapi form !');
    if ($('#bulan_layanan').val() === '') return alert('Harap pilih masa layanan !');

    var data = new FormData(form);
    var perusahan = $("#user_company2 option:selected").data('id');
    var client_email = $("#user_email").val();
    var status = $("input[id='status']:checked").val();
    var user_provinsi = $("#user_provinsi").val();
    var user_industry = $("#user_industry").val();
    // var masa_layanan = $("#masa_layanan").val();
    // var bulan_layanan = $("#bulan_layanan").val();
    var nama_client = $("#user_client option:selected").text();
    var start_date = $("#start_date").val();
    var end_date = $("#end_date").val();
    var address = $("#user_address").val();

    var manageClient = {
        u_name: nama_client.trim(),
        u_status: status,
        u_mail: client_email,
        address: address,
        // u_mail: 'irwanmaulana@prisma-ads.com',
        c_id: perusahan,
        l_prov: user_provinsi.join(';'),
        l_ind: user_industry.join(';'),
        l_sdate: start_date,
        l_edate: end_date,
    }

    $.ajax({
        // OLD
        // url: APIURL + "user/usermanages",
        url: APIURL + "user/clientmanage",
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        type: "POST",
        // enctype: 'application/x-www-form-urlencoded',
        data: manageClient,
        cache: false,
        timeout: 600000,
        beforeSend: function () {
            disabledButton('saveClient');
        },
        success: function (data, textStatus, jqXHR) {
            disabledButton('saveClient', false);
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
            UserClient();

        },
        error: function (jqXHR, textStatus, errorThrown) {
            disabledButton('saveClient', false);
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

// $('#fromDate').datepicker({
//     orientation: "top auto",
//     autoclose: true,
// }).on("changeDate", function (selected) {
//     var minDate = new Date(selected.date.valueOf());
//     $('#toDate').datepicker('setStartDate', minDate);
// });

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function getDiffMonths(d1, d2) {
    var diff = monthDiff(d1, d2);
    console.log(
        d1.toISOString().substring(0, 10),
        "to",
        d2.toISOString().substring(0, 10),
        ":",
        diff
    );
    return diff;
}

setInterval(() => {
    var data = $('#timerCount').data('startdate');
    var getTimer = diffDates(data);
    $('#timerCount').html(getTimer);
}, 1000);