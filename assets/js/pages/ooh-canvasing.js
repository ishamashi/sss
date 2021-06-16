

$(function(){

    $('#mstindref').click(function() { 
        getMasterData('mstindref');
    });

    $('#mstind').click(function() { 
        getMasterData('indadv');
    });

    $('#mstrefer').click(function() { 
        getMasterData('ref');
    });

    $('#mstooh').click(function() { 
        getMasterData('ooh');
    });

    $('#mstoohtmp').click(function() { 
        getMasterData('oohtmp');
    });

    $("#saveformooh").click(function(){
        oohSave();
    });

    $("#saveformimage").click(function(){
        imgSave();
    });

    $("#saveformkml").click(function(){
        kmlSave();
    });

    $('.kv-fileinput-upload').hide();

    $('#datee').datepicker( {
        format: "mm-yyyy",
        startView: "months", 
        minViewMode: "months"
    });

    $('#datee1').datepicker( {
        format: "mm-yyyy",
        startView: "months", 
        minViewMode: "months"
    });

    $('#datee2').datepicker( {
        format: "mm-yyyy",
        startView: "months", 
        minViewMode: "months"
    });

    getDataTrafficLists();

});

function oohSave(){

    var form = $("#formcontent")[0];
    var data = new FormData(form);
    var file = checkFileImg(document.getElementById("oohdata"), 'xls');

    if(file){
        $('.progresse').show();
        $.ajax({
        url: APIURL + "data/upldata",
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        type: "POST",
        enctype: 'multipart/form-data',
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success:function(data, textStatus, jqXHR) {
                $('.progresse').hide();
                var result = data.data;
                if(result==1){
                        swal({
                            title: "Success!",
                            text: "File Data Saved",
                            type: "success",
                            confirmButtonText: "OK"
                        },
                        function(){
                        });
                    }
                else {
                    swal({
                        title: "Error",
                        text: "Fail to Save",
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Close"
                    });
                }

            },
        error: function(jqXHR, textStatus, errorThrown) {
                $('.progresse').hide();
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

        });
    } else {
            swal({
                    title: "Error",
                    text: "Please upload on Excell File (max 20Mb)",
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Close"
                });

        }
} 

function getMasterData(parid){

     var date1 = $('#datee1').val();
     var date2 = $('#datee2').val(); 

     var folderweb = '/'

    if(parid){
        if(parid=='ref'){
            var linke  = location.origin +  folderweb + 'assets/docs/CANVASING_INPUT_DATA_TEMPLATE.xlsx';
            var mywindow = window.open(linke, 'Download');
            mywindow.focus(); 
        }        
        else {
            $.ajax({
            url: APIURL + "data/dwnmaster",
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            type: "GET",
            dataType: 'json',
            data : {'parid':parid, date1:date1, date2:date2},
            success:function(data, textStatus, jqXHR) {
                    var result = data.data
                    if(result.filename) {
                        var linke  = location.origin +  folderweb + 'assets/docs/' + result.filename;
                        var mywindow = window.open(linke, 'Download');
                        mywindow.focus();
                    }
                }
            });
        }
        
    } else {
                swal({
                        title: "Error",
                        text: "Maaf",
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Close"
                    });

            }
}

function imgSave(){

    var form = $("#formimage")[0];
    var data = new FormData(form);
    var file = checkFileImg(document.getElementById("imgdata"), 'zip');

    var date = $('#datee').val();
    data.append("date", date);

    if(file){
            swal({
                title: "Warning",
                html: "Are You sure to save with this files ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                confirmButtonColor: "#ec6c62"
            }).then(function(isConfirm) {
                if (isConfirm.value) {
                    $('.progresse').show();
                    $.ajax({
                    url: APIURL + "data/uplimage",
                    headers: { "Ip-Addr": IP, "token": "Bearer " + token },
                    type: "POST",
                    enctype: 'multipart/form-data',
                    data: data,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 600000,
                    success:function(data, textStatus, jqXHR) {
                            $('.progresse').hide();
                            var result = data.data;
                            if(result==1){
                                    swal({
                                        title: "Success!",
                                        text: "Image Data Saved",
                                        type: "success",
                                        confirmButtonText: "OK"
                                    },
                                    function(){
                                    });
                                }
                            else {
                                swal({
                                    title: "Error",
                                    text: "Fail to Save",
                                    type: "error",
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Close"
                                });
                            }

                        },
                    error: function(jqXHR, textStatus, errorThrown) {
                            $('.progresse').hide();
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

                    });
                }
            });
    } else {
            swal({
                    title: "Error",
                    text: "Please Fill Photo compress on ZIP (max 50Mb)",
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Close"
                });

        }
} 


function kmlSave(){

    var form = $("#formkml")[0];
    var data = new FormData(form);
    var file = checkFileImg(document.getElementById("kmlfile"), 'kml');

    //var traffic = $('#traffic').val();
    //data.append("traffic", traffic);

    if(file){
            swal({
                title: "Warning",
                html: "Are You sure to save with this files ?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                confirmButtonColor: "#ec6c62"
            }).then(function(isConfirm) {
                if (isConfirm.value) {
                    $('.progresse').show();
                    $.ajax({
                    url: APIURL + "data/uploadkml",
                    headers: { "Ip-Addr": IP, "token": "Bearer " + token },
                    type: "POST",
                    enctype: 'multipart/form-data',
                    data: data,
                    processData: false,
                    contentType: false,
                    cache: false,
                    timeout: 600000,
                    success:function(data, textStatus, jqXHR) {
                            $('.progresse').hide();
                            var result = data.data;
                            if(result==1){
                                    swal({
                                        title: "Success!",
                                        text: "KML Data Saved",
                                        type: "success",
                                        confirmButtonText: "OK"
                                    },
                                    function(){
                                    });
                                    getDataTrafficLists();
                                }
                            else {
                                swal({
                                    title: "Error",
                                    text: "Fail to Save",
                                    type: "error",
                                    confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Close"
                                });
                            }

                        },
                    error: function(jqXHR, textStatus, errorThrown) {
                            $('.progresse').hide();
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

                    });
                }
            });
    } else {
            swal({
                    title: "Error",
                    text: "Please Fill KML File (max 50Mb)",
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Close"
                });

        }
}


function getDataTrafficLists() {

    $.ajax({
        cache: false,
        type: 'GET', 
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/datakml',
        dataType: 'json',
        success: function(data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function(k,v){
            perdata = {
                        "1": v[0],
                        "2": v[1],
                        "3": v[2],
                        "4": v[3],
                        "5": '<button class="btn btn-success btn-rounded" title="Edit Data"><span class="fa fa-pencil" onclick="editTraffic(\''+v[0]+'\', \''+v[1]+'\', \''+v[2]+'\', \''+v[3]+'\')"></span></button>'
                      };
            dattab.push(perdata);
            no++;
            });
            var colome = [{data: "1"},{data: "2"},{data: "3"},{data: "4"},{data: "5", "className": "text-center"}]
            setTableContent('#traffic-table', colome, dattab);
            
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


function editTraffic(id, name, traffic, city ){

    if(id === undefined) { id = '';}
    if(name === undefined) { name = '';}
    if(traffic === undefined) { traffic = '';} 
    if(city === undefined) { city = '';} 

    if(true){
        var dathtml = '<div class="col-md-12">'
                          +'<h4 style="text-align:left"> <span class="fa fa-plus"></span> '+(id!=""?"EDIT":"ADD")+' DATA Traffic</h4>'
                          +'<p> Please check the input before save </p> <hr>'
                          +'<form id="formedittraffic">' 
                          +'<input type="hidden"  id="road_id" name="road_id" value="'+id+'" />';

                dathtml +=    '<div class="row">'
                                  +'<div class="col-md-12">'
                                      +'<div class="form-horizontal">'
                                      +'<div class="panel-body form-group-separated">' 
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">City</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +city
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Name</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +name
                                                +'</div>'
                                            +'</div>'
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Traffic</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<input class="form-control" id="traffic" name="traffic" value="'+traffic+'" > '
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
                                +'<button type="button" class="btn btn-success" id="saveTraffic"><span class="fa fa-save"></span> Save</button>'
                            +'</div>';
                        +'</div>';
        swal({
            html:dathtml,
            width:750,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        }); 
 


        $('#saveTraffic').click(function(e){
            e.preventDefault();
            saveTraffic();
        }); 

    }

}


function saveTraffic(){
    var form    = $("#formedittraffic")[0];
    var data    = new FormData(form);
    var road_id   = $('#road_id').val(); 
    if(road_id){
        $.ajax({
            url: APIURL + "data/datakml",
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
                    getDataTrafficLists();

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