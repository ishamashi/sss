

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
            + '<input type="text" class="form-control date-picker" readonly name="masa_layanan" placeholder="Tanggal Mulai Layanan" id="masa_layanan" required>'
            + '</div>'
            + '<div class="col-md-3 col-xs-7">'
            + '<label class="pull-left"><b>Durasi</b></label>'
            + '<input type="number" class="form-control" name="bulan_layanan" placeholder="Bulan" min="0" id="bulan_layanan" required>'
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
                $('#masa_layanan').datepicker({
                    format: 'yyyy-mm-dd',
                    autoclose: true
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
                    optionsAsString += "<option " + ste + " value='" + v[5] + "' data-id='" + v[0] + "'>" + v[1] + "</option>";
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
                    "8": (resend_email) ?
                        '&nbsp;&nbsp;<button class="btn btn-primary btn-rounded" title="Resend e-Mail"><span class="fa fa-envelope" onclick="resend_mail(\'' + base64 + '\')"></span></button>' +
                        '&nbsp;&nbsp;<button class="btn btn-default btn-rounded" title="Edit User"><span class="fa fa-eye" onclick="editUser(\'' + v['user_id'] + '\')"></span></button>' +
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete User"><span class="fa fa-trash" onclick="deleteThis(\'' + v['user_id'] + '\')"></span></button>' :
                        '&nbsp;&nbsp;<button class="btn btn-default btn-rounded" title="Edit User"><span class="fa fa-eye" onclick="editUser(\'' + v['user_id'] + '\')"></span></button>' +
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete User"><span class="fa fa-trash" onclick="deleteThis(\'' + v['user_id'] + '\')"></span></button>'
                };
                dattab.push(perdata);
                no++;
            });
            var colome = [{ data: "1" }, { data: "2" }, { data: "3" }, { data: "4" }, { data: "5" }, { data: "6" }, { data: "7" }, { data: "8" }]
            // setTableContent('#example', colome, dattab);
            if(firstCall) $('#example thead tr').clone(true).addClass('filters').appendTo('#example thead');
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

function resend_mail(base64) {
    var data = JSON.parse(atob(base64));
    var param = "";

    var { user_name, user_status, user_email, company_id } = data;

    var manageClient = {
        u_name: user_name,
        u_status: user_status,
        u_mail: user_email,
        c_id: company_id,
        resend: true
    }

    Object.keys(manageClient).forEach(function (key, index) {
        if (Object.keys(manageClient).length === (index + 1)) {
            param += `${key}=${manageClient[key]}`;
        } else {
            param += `${key}=${manageClient[key]}&`;
        }
    });

    $.ajax({
        // OLD
        // url: APIURL + "user/usermanages",
        url: APIURL + "user/clientmanage?" + param,
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        type: "POST",
        enctype: 'multipart/form-data',
        // data: data,
        processData: false,
        contentType: false,
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
    // alert($("#user_provinsi").val());
    var form = $("#formaddclient")[0];
    if (!form.checkValidity()) return alert('Harap lengkapi form !');

    var data = new FormData(form);
    var perusahan = $("#user_company2 option:selected").data('id');
    var client_email = $("#user_email").val();
    var client_address = $("#user_address").val();
    var status = $("input[id='status']:checked").val();
    var user_provinsi = $("#user_provinsi").val();
    var user_industry = $("#user_industry").val();
    var masa_layanan = $("#masa_layanan").val();
    var bulan_layanan = $("#bulan_layanan").val();
    var nama_client = $("#user_client option:selected").text();
    var param = "";

    var manageClient = {
        u_name: nama_client,
        u_status: status,
        u_mail: client_email,
        // u_mail: 'irwanmaulana@prisma-ads.com',
        c_id: perusahan,
        l_prov: user_provinsi.join(';'),
        l_ind: user_industry.join(';'),
        l_sdate: moment(masa_layanan).format('MM/DD/YY'),
        l_edate: bulan_layanan,
        resend: false
    }

    Object.keys(manageClient).forEach(function (key, index) {
        if (Object.keys(manageClient).length === (index + 1)) {
            param += `${key}=${manageClient[key]}`;
        } else {
            param += `${key}=${manageClient[key]}&`;
        }
    });

    $.ajax({
        // OLD
        // url: APIURL + "user/usermanages",
        url: APIURL + "user/clientmanage?" + param,
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        type: "POST",
        enctype: 'multipart/form-data',
        // data: data,
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
            UserClient();

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

// $('#fromDate').datepicker({
//     orientation: "top auto",
//     autoclose: true,
// }).on("changeDate", function (selected) {
//     var minDate = new Date(selected.date.valueOf());
//     $('#toDate').datepicker('setStartDate', minDate);
// });