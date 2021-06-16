

$(function(){

    $('#addUser').click(function(e){
        e.preventDefault();
        addUser();
    });

    $('#addCompany').click(function(e){
        e.preventDefault();
        addComp();
    });

    $('#pancomp').click(function(e){
        e.preventDefault();
        filterListCompany();
    });

    filterListUser();
    filterListLevel();

    $('select').selectpicker();

});

function filterListUser() {

    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'user/usermanage',
        dataType: 'json',
        success: function(data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function(k,v){
            perdata = {
                        "1": no,
                        "2": v[2],
                        "3": v[1],
                        "4": v[4],
                        "5": v[8],
                        "6": v[7],
                        "7": v[5]=='A'?'ACTIVE':'INACTIVE',
                        "8": '<button class="btn btn-success btn-rounded" title="Edit User"><span class="fa fa-pencil" onclick="editUser(\''+v[0]+'\')"></span></button>'+
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete User"><span class="fa fa-times" onclick="deleteThis(\''+v[0]+'\')"></span></button>'
                      };
            dattab.push(perdata);
            no++;
            });
            var colome = [{data: "1"},{data: "2"},{data: "3"},{data: "4"},{data: "5"},{data: "6"},{data: "7"},{data: "8", "className": "text-center"}]
            setTableContent('#mstuser', colome, dattab);
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status != 500){
                if (jqXHR.status == 400) {
                    window.location = "logout.html";
                }
                var strjson = JSON.parse(jqXHR.responseText);
            }else{
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
        success: function(data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function(k,v){
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
            var colome = [{data: "1"},{data: "2"},{data: "3"},{data: "4"},{data: "5"}]
            setTableContent('#mstlevel', colome, dattab);
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status != 500){
                if (jqXHR.status == 400) {
                    window.location = "logout.html";
                }
                var strjson = JSON.parse(jqXHR.responseText);
            }else{
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
        success: function(data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function(k,v){
            perdata = {
                        "1": no,
                        "2": v[1],
                        "3": v[2],
                        "4": v[3],
                        "5": v[5] ? v[5] : 'None',
                        "6": '<button class="btn btn-success btn-rounded" title="Edit Company"><span class="fa fa-pencil" onclick="editComp(\''+v[0]+'\')"></span></button>'+
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete Company"><span class="fa fa-times" onclick="deleteThisComp(\''+v[0]+'\')"></span></button>'
                      };
            dattab.push(perdata);
            no++;
            });
            var colome = [{data: "1"},{data: "2"},{data: "3"},{data: "4"},{data: "5"},{data: "6", "className": "text-center"}]
            setTableContent('#mstcompany', colome, dattab);
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            if (jqXHR.status != 500){
                if (jqXHR.status == 400) {
                    window.location = "logout.html";
                }
                var strjson = JSON.parse(jqXHR.responseText);
            }else{
            }
        }
    });
}

function setTableContent(idne, colome, datane){
    if(!$.fn.DataTable.fnIsDataTable( idne )) {
    } else {
        $(idne).DataTable().destroy();
    }

    $(idne).DataTable({
        columns : colome,
        lengthChange: false,
        data : datane
    });
}

function editUser(id){
    if(id){
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/usermanage?idx='+id,
            dataType: 'json',
            success: function(data) {
                if(data.data){
                    addUser(id, data.data[0]);
                }                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status != 500){
                    if (jqXHR.status == 400) {
                        window.location = "logout.html";
                    }
                    var strjson = JSON.parse(jqXHR.responseText);
                }else{
                }
            }
        });
    }
}

function addUser(id, pardat){
    if(id === undefined) { id = '';}
    if(pardat === undefined) { pardat = '';}

    if(true){
        var dathtml = '<div class="col-md-12">'
                          +'<h4 style="text-align:left"> <span class="fa fa-plus"></span> '+(id!=""?"EDIT":"ADD")+' DATA USER</h4>'
                          +'<p> Please check the input before save </p> <hr>'
                          +'<form id="formadduser">'
                           +'<input type="hidden" name="user_id" value="'+id+'" />';

                dathtml +=    '<div class="row">'
                                  +'<div class="col-md-12">'
                                      +'<div class="form-horizontal">'
                                      +'<div class="panel-body form-group-separated">'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">User Name</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="text" id="user_name" name="user_name" class="form-control" value="'+(id!="" && pardat ? pardat[2] : "")+'" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">User Login</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="text" id="user_login" name="user_login" class="form-control" value="'+(id!="" && pardat ? pardat[1] : "")+'" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Email</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="text" id="user_email" name="user_email" class="form-control" value="'+(id!="" && pardat ? pardat[4] : "")+'" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Password</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="text" id="user_password" name="user_password" class="form-control" value="" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Company</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<select class="form-control select" id="user_company" name="user_company"></select> '
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Level</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<select class="form-control select" id="user_level" name="user_level"></select> '
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Address</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<textarea name="user_address" id="user_address" class="form-control" rows="2">'+(id!="" && pardat ? pardat[3] : "")+'</textarea>'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Status</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<select class="form-control select" id="user_status" name="user_status">'
                                                        +'<option value="A" >ACTIVE</option>'
                                                        +'<option value="I">INACTIVE</option>'
                                                    +'</select> '
                                                +'</div>'
                                            +'</div>'
                                      +'</div>'
                                  +'</div>'
                                  +'</div>'
                                  +'</div>';

             dathtml += '</form>'
                        +'</div>'
                        +'<div class="col-md-12">'
                            +'<div class="col-md-8"></div>'
                            +'<div class="col-md-2">'
                                +'<button type="button" class="btn btn-warning" id="resetFormUser"> Reset</button>'
                            +'</div>'
                            +'<div class="col-md-2">'
                                +'<button type="button" class="btn btn-success" id="saveUser"><span class="fa fa-save"></span> Save</button>'
                            +'</div>';
                        +'</div>';
        swal({
            html:dathtml,
            width:750,
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
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); }
                var optionsAsString = "";
                $.each(data.data, function(k,v){
                    var ste = pardat[9]==v[0] ? 'SELECTED':'' ;
                    optionsAsString += "<option "+ste+" value='" + v[0] + "'>" + v[1] + "</option>";
                });
                $('#user_company').find('option').remove();
                $('#user_company').append(optionsAsString);    
                $('.select').selectpicker('refresh');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status != 500){
                    if (jqXHR.status == 400) {
                        window.location = "logout.html";
                    }
                    var strjson = JSON.parse(jqXHR.responseText);
                }else{
                }
            }
        });

        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/level',
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); }
                var optionsAsString = ""; 
                $.each(data.data, function(k,v){
                    var ste = pardat[6]==v[0] ? 'SELECTED':'' ;
                    optionsAsString += "<option "+ste+" value='" + v[0] + "'>" + v[1] + "</option>";
                });
                $('#user_level').find('option').remove();
                $('#user_level').append(optionsAsString);    
                $('.select').selectpicker('refresh');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status != 500){
                    if (jqXHR.status == 400) {
                        window.location = "logout.html";
                    }
                    var strjson = JSON.parse(jqXHR.responseText);
                }else{
                }
            }
        });

        if (id!="" && pardat ){
            $("#user_status").val(pardat[5]);
        }

        $('#saveUser').click(function(e){
            e.preventDefault();
            saveUser();
        });

        $('#resetFormUser').click(function(e){
            e.preventDefault();
            resetFormUser();
        });

    }

}

function deleteYes(idx){
    if(idx){
        $.ajax({
            url: APIURL + "user/usermanage?idx="+idx,
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            type: "DELETE",
            success:function(data, textStatus, jqXHR) {
                    var result = data.data
                    swal({
                        title: "Success!",
                        text: "Data Deleted",
                        type: "success",
                        confirmButtonText: "OK"
                    });
                    filterListUser();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status != 500){
                        var strjson = JSON.parse(jqXHR.responseText);
                        swal({
                            title: "Error",
                            text: strjson.processMessage,
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Close"
                        });
                    }else{
                        swal({
                            title: "Error",
                            text: "Internal Server Error",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Close"
                        }, function(){
                            // location.reload();
                        });
                    }
                }
            });
    }
}

function deleteThis(idx){
     swal({
                title: "Warning",
                html: "Are you sure to Delete this Item ? ",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                confirmButtonColor: "#ec6c62"
            }).then(function(isConfirm) {
                if (isConfirm.value) {
                    deleteYes(idx)
                }
            });
}

function resetFormUser(){
    document.getElementById("formadduser").reset();
}

function saveUser(){
    var form    = $("#formadduser")[0];
    var data    = new FormData(form);
    var indname = $('#user_login').val();
    var usremail = $('#user_email').val();
    if(indname || usremail){
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
            success:function(data, textStatus, jqXHR) {
                    var result = data.data;
                    if(result){
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
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status != 500){
                        var strjson = JSON.parse(jqXHR.responseText);
                        swal({
                            title: "Error",
                            text: strjson.processMessage,
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Close"
                        });
                    }else{
                        swal({
                            title: "Error",
                            text: "Internal Server Error",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Close"
                        }, function(){
                            // location.reload();
                        });
                    }
                }
            });
    } else {
        $('#user_name').first().focus();
    }
}

function editComp(id){
    if(id){
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'user/company?idx='+id,
            dataType: 'json',
            success: function(data) {
                if(data.data){
                    addComp(id, data.data[0]);
                }                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.status != 500){
                    if (jqXHR.status == 400) {
                        window.location = "logout.html";
                    }
                    var strjson = JSON.parse(jqXHR.responseText);
                }else{
                }
            }
        });
    }
}

function addComp(id, pardat){
    if(id === undefined) { id = '';}
    if(pardat === undefined) { pardat = '';}

    if(true){
        var dathtml = '<div class="col-md-12">'
                          +'<h4 style="text-align:left"> <span class="fa fa-plus"></span> '+(id!=""?"EDIT":"ADD")+' DATA COMPANY</h4>'
                          +'<p> Please check the input before save </p> <hr>'
                          +'<form id="formaddcomp">'
                           +'<input type="hidden" name="company_id" value="'+id+'" />';

                dathtml +=    '<div class="row">'
                                  +'<div class="col-md-12">'
                                      +'<div class="form-horizontal">'
                                      +'<div class="panel-body form-group-separated">'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Company Name</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="text" id="company_name" name="company_name" class="form-control" value="'+(id!="" && pardat ? pardat[1] : "")+'" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Company Email</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="text" id="company_email" name="company_email" class="form-control" value="'+(id!="" && pardat ? pardat[3] : "")+'" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Company Desccription</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<textarea name="company_desc" id="company_desc" class="form-control" rows="2">'+(id!="" && pardat ? pardat[2] : "")+'</textarea>'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Company Advertiser<br><br>*(If your advertiser doesnt found, please add Data Master Advertiser first)</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    //+'<ul class="checkbox pull-left ulfill" id="advertiser" style="text-align:left"></ul>'
                                                    +'<select class="form-control" id="advertiser" data-live-search="true"  name="company_adv"  title="Select Advertiser">'
                                                    +'</select>'
                                                +'</div>'
                                            +'</div>'
                                      +'</div>'
                                  +'</div>'
                                  +'</div>'
                                  +'</div>';

             dathtml += '</form>'
                        +'</div>'
                        +'<div class="col-md-12">'
                            +'<div class="col-md-8"></div>'
                            +'<div class="col-md-2">'
                                +'<button type="button" class="btn btn-warning" id="resetFormComp"> Reset</button>'
                            +'</div>'
                            +'<div class="col-md-2">'
                                +'<button type="button" class="btn btn-success" id="saveComp"><span class="fa fa-save"></span> Save</button>'
                            +'</div>';
                        +'</div>';
        swal({
            html:dathtml,
            width:750,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });

        filterAdvSel();

        function filterAdvSel() {
            //var arrpoi = [] ;
            var arrpoi = '' ;
            if(pardat){
                
                if(pardat[4]){
                    //arrpoi.push(pardat[4]);
                    arrpoi = pardat[4];
                }

                console.log(arrpoi);
            }
            $.ajax({
                cache: false,
                type: 'GET',
                data: {"industry":null, 'pamstat':1},
                headers: { "Ip-Addr": IP, "token": "Bearer " + token },
                url: APIURL + 'data/filterindustry',
                dataType: 'json',
                success: function(data) {
                    if(typeof data != 'object'){ data = $.parseJSON(data); }
                    var optionsForPam   = "";
                    $.each(data.data, function(k,v){
                        //optionsForPam += '<li> <div class="catlepam"><label style="padding-left:0px;">'+v.class_name+'</label><span class="catog arrhidden"></span></div>';
                        //optionsForPam += '<ul class="checkbox ulfill sublist">';
                        optionsForPam += '<optgroup label="'+v.class_name+'">';


                        $.each(v.subclass, function(k1,v1){
                            var checked         = "" ;
                            //console.log(v1.scpoid+'==');
                            if(arrpoi == v1.scpoid ){
                                checked = 'selected' ;
                            }
                            //optionsForPam += '<li><label> <input type="radio" '+checked+' name="company_adv" value="'+v1.scpoid+'" >'+v1.scpoiname+'</label></li>';
                            optionsForPam += '<option  value="'+v1.scpoid+'"  '+checked+'>'+v1.scpoiname+'</option>';
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
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status != 500){
                        if (jqXHR.status == 400) {
                            window.location = "logout.html";
                        }
                        var strjson = JSON.parse(jqXHR.responseText);
                    }else{
                    }
                }
              });
        }

        $('#saveComp').click(function(e){
            e.preventDefault();
            saveComp();
        });

        $('#resetFormComp').click(function(e){
            e.preventDefault();
            resetFormComp();
        });

    }

}

function deleteYesComp(idx){
    if(idx){
        $.ajax({
            url: APIURL + "user/company?idx="+idx,
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            type: "DELETE",
            success:function(data, textStatus, jqXHR) {
                    var result = data.data;
                    if(result){
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
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status != 500){
                        var strjson = JSON.parse(jqXHR.responseText);
                        swal({
                            title: "Error",
                            text: strjson.processMessage,
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Close"
                        });
                    }else{
                        swal({
                            title: "Error",
                            text: "Internal Server Error",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Close"
                        }, function(){
                            // location.reload();
                        });
                    }
                }
            });
    }
}

function deleteThisComp(idx){
     swal({
                title: "Warning",
                html: "Are you sure to Delete this Item ? ",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                confirmButtonColor: "#ec6c62"
            }).then(function(isConfirm) {
                if (isConfirm.value) {
                    deleteYesComp(idx)
                }
            });
}

function resetFormComp(){
    document.getElementById("formaddcomp").reset();
}

function saveComp(){
    var form    = $("#formaddcomp")[0];
    var data    = new FormData(form);
    var indname = $('#company_name').val();
    if(indname){
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
            success:function(data, textStatus, jqXHR) {
                    var result = data.data
                    swal({
                        title: "Success!",
                        text: "Data Saved",
                        type: "success",
                        confirmButtonText: "OK"
                    },
                    function(){
                    });
                    filterListCompany();

                },
                error: function(jqXHR, textStatus, errorThrown) {
                    if (jqXHR.status != 500){
                        var strjson = JSON.parse(jqXHR.responseText);
                        swal({
                            title: "Error",
                            text: strjson.processMessage,
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Close"
                        });
                    }else{
                        swal({
                            title: "Error",
                            text: "Internal Server Error",
                            type: "error",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Close"
                        }, function(){
                            // location.reload();
                        });
                    }
                }
            });
    } else {
        $('#company_name').first().focus();
    }
}

