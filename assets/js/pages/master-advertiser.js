

$(function(){

    $('#addAdvertiser').click(function(e){
        e.preventDefault();
        addAdvertiser();
    });

    filterIndustry('adv');

});

function filterIndustry(lvl) {

    $.ajax({
        cache: false,
        type: 'GET',
        data: {"lvl":lvl},
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/filterindustry',
        dataType: 'json',
        success: function(data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function(k,v){
            perdata = {
                        "1": no,
                        "2": v[1],
                        "3": v[2],
                        "4": v[5], 
                        "5": '<button class="btn btn-success btn-rounded" title="Edit Sub Industry"><span class="fa fa-pencil" onclick="addAdvertiser(\''+v[0]+'\', \''+v[1]+'\', \''+v[2]+'\', \''+v[4]+'\', \''+v[3]+'\')"></span></button>'
                        +'&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Delete Advertiser"><span class="fa fa-times" onclick="deleteThis(\''+v[0]+'\', \'adv\')"></span></button>'
                      };
            dattab.push(perdata);
            no++;
            });
            var colome = [{data: "1"},{data: "2"},{data: "3"},{data: "4"},{data: "5", "className": "text-center"}]
            setTableContent('#mstadvertiser', colome, dattab);
            
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

function addAdvertiser(id, name, desc, subind, color){

    if(id === undefined) { id = '';}
    if(name === undefined) { name = '';}
    if(desc === undefined) { desc = '';}
    if(subind === undefined) { subind = '';}
    if(color === undefined) { color = '';}
    color = (color =='null') ? "#FFFFFF" : color ;
    if(true){
        var dathtml = '<div class="col-md-12">'
                          +'<h4 style="text-align:left"> <span class="fa fa-plus"></span> '+(id!=""?"EDIT":"ADD")+' DATA ADVERTISER</h4>'
                          +'<p> Please check the input before save </p> <hr>'
                          +'<form id="formaddind">'
                          +'<input type="hidden" id="statind" name="statind" value="adv" />'
                          +'<input type="hidden" name="advertiser" value="'+id+'" />';

                dathtml +=    '<div class="row">'
                                  +'<div class="col-md-12">'
                                      +'<div class="form-horizontal">'
                                      +'<div class="panel-body form-group-separated">'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Advertiser Name</label>'
                                                +'<div class="col-md-9">'
                                                    +'<input type="text" name="advname" id="advname" class="form-control" value="'+name+'" />'
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Description</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<textarea name="advdesc" id="advdesc" class="form-control" rows="4">'+desc+'</textarea>'
                                                +'</div>'
                                            +'</div>' 
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Sub Industry</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<select class="form-control select" id="sub_industry" name="sub_industry"></select> '
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

        $.ajax({
            cache: false,
            type: 'GET',
            data: {"lvl":"subind",},
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/filterindustry',
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); }
                var optionsAsString = ""; 
                $.each(data.data, function(k,v){
                    var ste = subind==v[0] ? 'SELECTED':'' ;
                    optionsAsString += "<option "+ste+" value='" + v[0] + "'>" + v[1] + "</option>";
                });
                $('#sub_industry').find('option').remove();
                $('#sub_industry').append(optionsAsString);    
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

        if($("#colpick").length > 0)
                $("#colpick").colorpicker();

        $(".colorpicker").css("z-index", "10000");


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


function resetFormInd(){
    document.getElementById("formaddind").reset();
}

function saveInd(){
    var form    = $("#formaddind")[0];
    var data    = new FormData(form);
    var state   = $('#statind').val();
    var indname = $('#'+state+'name').val();
    if(indname){
        $.ajax({
            url: APIURL + "data/saveindustry",
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
                    filterIndustry(state);

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
        $('#'+state+'name').first().focus();
    }
}

function deleteThis(idx, statind){
     swal({
                title: "Warning",
                html: "Are you sure to Delete this Item ? ",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                confirmButtonColor: "#ec6c62"
            }).then(function(isConfirm) {
                if (isConfirm.value) {
                    deleteYes(idx, statind)
                }
            });
}

function deleteYes(idx, statind){
    if(idx){
        $.ajax({
            url: APIURL + "data/saveindustry?idx="+idx+"&statind="+statind,
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            // data : {'idx' : idx, 'statind' : statind},
            type: "DELETE",
            success:function(data, textStatus, jqXHR) {
                    var result = data.data;
                    if(result){
                        swal({
                            title: "Success!",
                            text: "Data Deleted",
                            type: "success",
                            confirmButtonText: "OK"
                        });
                    } else {
                        swal({
                            title: "Error!",
                            text: "Advertiser exist on OOH Data !",
                            type: "error",
                            confirmButtonText: "OK"
                        });
                    }
                    filterIndustry(statind);
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


