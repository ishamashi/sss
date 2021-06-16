

$(function(){

    $('#addIndustry').click(function(e){
        e.preventDefault();
        addIndustry();
    });

    filterPamIndustry();

});

function filterPamIndustry() {

    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/pambyind',
        dataType: 'json',
        success: function(data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function(k,v){
            perdata = {
                        "1": no,
                        "2": v[0],
                        "3": v[1],
                        "4": '<button class="btn btn-success btn-rounded" title="Edit PAM"><span class="fa fa-pencil" onclick="addIndustry(\''+v[2]+'\', \''+v[1]+'\', \''+v[3]+'\', \''+v[4]+'\', \''+v[5]+'\', \''+v[6]+'\', \''+v[7]+'\', \''+v[8]+'\')"></span></button>'+
                        '&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete PAM"><span class="fa fa-times" onclick="deleteThis(\''+v[2]+'\')"></span></button>'
                      };
            dattab.push(perdata);
            no++;
            });
            var colome = [{data: "1"},{data: "2"},{data: "3"},{data: "4", "className": "text-center"}]
            setTableContent('#mstindustry', colome, dattab);
            
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

function addIndustry(id, desc, wei_demo,wei_poi, age, gender, sec, poi){
    if(id === undefined) { id = '';}
    if(desc === undefined) { desc = '';}
    if(wei_demo === undefined) { wei_demo = '50';}
    if(wei_poi === undefined) { wei_poi = '50';}
    if(age === undefined) { age = '';}
    if(gender === undefined) { gender = '';}
    if(sec === undefined) { sec = '';}
    if(poi === undefined) { poi = '';}
    if(true){
        var dathtml = '<div class="col-md-12">'
                          +'<h4 style="text-align:left"> <span class="fa fa-plus"></span> '+(id!=""?"EDIT":"ADD")+' DATA PAM INDUSTRY</h4>'
                          +'<p> Please check the input before save </p> <hr>'
                          +'<form id="formaddind">';

                dathtml +=    '<div class="row">'
                                  +'<div class="col-md-12">'
                                      +'<div class="form-horizontal">'
                                      +'<div class="panel-body form-group-separated">'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Industry</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<select class="form-control select" id="industry" name="industry"></select> '
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Description</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<textarea name="desc" id="desc" class="form-control" rows="4">'+desc+'</textarea>'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Weight Demografi</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="number" id="wei_demo" name="wei_demo" class="form-control" value="'+wei_demo+'" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Age</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="text" id="ise_step" name="age" /> '
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Gender</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<div class="col-md-6"> <label class="check checker"><input type="checkbox" name="gender[]" value="1" id="gender1" class="cbx" /> Male</label></div>'
                                                    +'<div class="col-md-6"> <label class="check checker"><input type="checkbox" name="gender[]" value="2" id="gender2" class="cbx"/> Female</label></div>'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">SEC</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<div class="col-md-2"> <label class="check"><input type="checkbox" name="sec[]" value="upper1" id="upper1" class="cbx" /> UPPER 1</label></div>'
                                                    +'<div class="col-md-2"> <label class="check"><input type="checkbox" name="sec[]" value="upper2" id="upper2"  class="cbx"/> UPPER 2</label></div>'
                                                    +'<div class="col-md-2"> <label class="check"><input type="checkbox" name="sec[]" value="middle1" id="middle1" class="cbx" /> MIDDLE 1</label></div>'
                                                    +'<div class="col-md-2"> <label class="check"><input type="checkbox" name="sec[]" value="middle2" id="middle2"class="cbx" /> MIDDLE 2</label></div>'
                                                    +'<div class="col-md-2"> <label class="check"><input type="checkbox" name="sec[]" value="lower" id="lower" class="cbx"/> LOWER</label></div>'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Weight POI</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input type="number" id="wei_poi" name="wei_poi" class="form-control" value="'+wei_poi+'" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">POI Selection</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<ul class="checkbox pull-left ulfill" id="pam_poi" style="text-align:left"></ul>'
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
                                // +'<button type="button" class="btn btn-warning" id="resetFormInd"> Reset</button>'
                            +'</div>'
                            +'<div class="col-md-2">'
                                +'<button type="button" class="btn btn-success" id="saveInd"><span class="fa fa-save"></span> Save</button>'
                            +'</div>';
                        +'</div>';
        swal({
            html:dathtml,
            width:750,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        });

        if(gender){
            var arrgen = gender.split(',');
            $.each(arrgen, function(k,v){
                $('#gender'+v).attr('checked','checked');
            });
        }

        if(sec){
            var arrsec = sec.split(',');
            $.each(arrsec, function(k,v){
                $('#'+v).attr('checked','checked');
            });
        }

        $.ajax({
            cache: false,
            type: 'GET',
            data: {"lvl":"ind",},
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/filterindustry',
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); }
                var optionsAsString = ""; 
                $.each(data.data, function(k,v){
                    var ste = id==v[0] ? 'SELECTED':'' ;
                    optionsAsString += "<option "+ste+" value='" + v[0] + "'>" + v[1] + "</option>";
                });
                $('#industry').find('option').remove();
                $('#industry').append(optionsAsString);    
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

        from = 15, to = 35 ;

        if(age){
            var arr = age.split(';');
            from = Number(arr[0]) ;
            to = Number(arr[1]) ;
        }

        $("#ise_step").ionRangeSlider({
            type: "double",
            grid: true,
            min: 1,
            max: 56,
            from: from,
            to: to,
            step: 1
        });

        $('#wei_demo').keyup(function(e){
            e.preventDefault();
            if($(this).val() > 100) $(this).val(100)
            if($(this).val() < 0) $(this).val(1)
            $('#wei_poi').val(100-$(this).val())
        });

        $('#wei_poi').keyup(function(e){
            e.preventDefault();
            if($(this).val() > 100) $(this).val(100)
            if($(this).val() < 0) $(this).val(1)
            $('#wei_demo').val(100-$(this).val())
        });

        filterPoiSel();

        function filterPoiSel() {
            var arrpoi = [] ;
            if(poi){
                arrpoi = poi.split(',');
            }
            $.ajax({
                cache: false,
                type: 'GET',
                data: {"province":province, "district":city},
                headers: { "Ip-Addr": IP, "token": "Bearer " + token },
                url: APIURL + 'data/filterpoi',
                dataType: 'json',
                success: function(data) {
                    if(typeof data != 'object'){ data = $.parseJSON(data); }
                    var optionsForPam   = "";
                    $.each(data.data, function(k,v){
                        optionsForPam += '<li> <div class="catlepam"><label style="padding-left:0px;">'+v.class_name+'</label><span class="catog arrhidden"></span></div>';
                        optionsForPam += '<ul class="checkbox ulfill sublist">';

                        $.each(v.subclass, function(k1,v1){
                            var checked         = "" ;
                            if(arrpoi.indexOf(''+v1.scpoid+'') !== -1){
                                checked = "checked" ;
                            }
                            optionsForPam += '<li><label> <input type="checkbox" '+checked+' name="pampoisel[]" class="poiselpam" value="'+v1.scpoid+'" >'+v1.scpoiname+'</label></li>';
                        });

                        optionsForPam += '</ul>';
                        optionsForPam += '</li>';
                    });
                    if (optionsForPam) {
                        $('#pam_poi').html('');
                        $('#pam_poi').append(optionsForPam);
                        listcatle('.catlepam');
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


        $('#saveInd').click(function(e){
            e.preventDefault();
            saveInd();
        });

        $('#resetFormInd').click(function(e){
            e.preventDefault();
            resetFormInd();
        });

    } 

}

function deleteYes(idx){
    if(idx){
        $.ajax({
            url: APIURL + "data/pambyind?idx="+idx,
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
                    filterPamIndustry();
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

function resetFormInd(){
    document.getElementById("formaddind").reset();
}

function saveInd(){
    var form    = $("#formaddind")[0];
    var data    = new FormData(form);
    var indname = $('#industry').val();
    if(indname){
        $.ajax({
            url: APIURL + "data/pambyind",
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
                    filterPamIndustry();

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
        $('#industry').first().focus();
    }
}

