

$(function(){

    $('#addKodeProduk').click(function(e){
        e.preventDefault();
        addKodeProduk();
    });

    filterProduk();

});

function filterProduk() {

    $.ajax({
        cache: false,
        type: 'GET', 
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/kodeproduk',
        dataType: 'json',
        success: function(data) {
            var dattab = [];
            var no = 1;
            $.each(data.data, function(k,v){
            perdata = {
                        "1": no,
                        "2": v[3],
                        "3": v[2],
                        "4": v[0], 
                        "5": v[4], 
                        "6": v[5], 
                        "7": '<button class="btn btn-success btn-rounded" title="Map Data"><span class="fa fa-pencil" onclick="addKodeProduk(\''+v[0]+'\', \''+v[1]+'\', \''+v[2]+'\', \''+v[3]+'\')"></span></button>'
                      };
            dattab.push(perdata);
            no++;
            });
            var colome = [{data: "1"},{data: "2"},{data: "3"},{data: "4"},{data: "5"},{data: "6"},{data: "7", "className": "text-center"}]
            setTableContent('#mstKodeProduk', colome, dattab);
            
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

function addKodeProduk(kodeproduk, oohtype, kodekategori, kodejenis){

    if(kodeproduk === undefined) { kodeproduk = '';}
    if(oohtype === undefined) { oohtype = '';}
    if(kodekategori === undefined) { kodekategori = '';}
    if(kodejenis === undefined) { kodejenis = '';} 
    if(true){
        var dathtml = '<div class="col-md-12">'
                          +'<h4 style="text-align:left"> <span class="fa fa-plus"></span> '+(kodeproduk!=""?"EDIT":"ADD")+' DATA Kode Produk</h4>'
                          +'<p> Please check the input before save </p> <hr>'
                          +'<form id="formaddind">' 
                          +'<input type="hidden"  id="kode_produk" name="kode_produk" value="'+kodeproduk+'" />';

                dathtml +=    '<div class="row">'
                                  +'<div class="col-md-12">'
                                      +'<div class="form-horizontal">'
                                      +'<div class="panel-body form-group-separated">' 
                                            +'<div class="form-group">'
                                                +'<label class="col-md-3 col-xs-5 control-label">Archernine OOH Type</label>'
                                                +'<div class="col-md-9 col-xs-7">'
                                                    +'<select class="form-control select" id="ooh_type" name="ooh_type"></select> '
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
                                +'<button type="button" class="btn btn-success" id="saveProduk"><span class="fa fa-save"></span> Save</button>'
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
            url: APIURL + 'data/filtertype',
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); }
                var optionsAsString = "";  
                $.each(data.data, function(k,v){
                    var ste = oohtype==v.type_id ? 'SELECTED':'' ;
                    optionsAsString += "<option value='" + v.type_id + "' "+ste+">" + v.type_name + "</option>";
                  });
                $('#ooh_type').find('option').remove();
                $('#ooh_type').append(optionsAsString);    
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
 


        $('#saveProduk').click(function(e){
            e.preventDefault();
            saveProduk();
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

function saveProduk(){
    var form    = $("#formaddind")[0];
    var data    = new FormData(form);
    var kode_produk   = $('#kode_produk').val(); 
    if(kode_produk){
        $.ajax({
            url: APIURL + "data/kodeproduk",
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
                    filterProduk();

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
 