

var industry    	= [];  
var sub_industry    = [];  
var advertiser      = []; 
var arrindustry    	= [];  
var arrsub_industry    = [];  
var arrcontract    = [];  
var arradvertiser      = []; 
var datacontent     = [];
var province = null; 
var district = null;
var sub_district = null;

$(function(){
    
    initialLoadData('ind');
    initialLoadData('subind');
    initialLoadData('adv');
    filterArea();
    filterKodeProduk();
    filterCompany();

	$('#province').on('change',function(){
		province = $(this).find("option:selected").val();
        district = null;
        sub_district = null;
		filterArea(province,'pr');
	});

	$('#district').on('change',function(){
		district = $(this).find("option:selected").val();
        sub_district = null;
        filterArea(district,'di');
    });

    $('#contract_start').datepicker({
        orientation: "top auto",
        autoclose: true,
      }).on("changeDate", function(selected){
        var minDate = new Date(selected.date.valueOf());
        $('#contract_end').datepicker('setStartDate', minDate);
      });
    
      $('#contract_end').datepicker({
        orientation: "top auto",
        autoclose: true,
      }).on("changeDate", function(selected){
        var maxDate = new Date(selected.date.valueOf());
        $('#contract_start').datepicker('setEndDate', maxDate);
      });
    
    

    $('#sub_district').on('change',function(){ sub_district = $(this).find("option:selected").val(); });
 
    $('#datee').datepicker( {
        format: "mm-yyyy",
        startView: "months", 
        minViewMode: "months"
    });

    $('#btnQuery').on('click',function(event){ 
        event.preventDefault();
        showContentByMonth($("#datee").val());        
    });

    SelboxCustom();

    //custom selbox
    $('#ooh_type').on('change',function(){ 
        ooh_type    = $(this).find("option:selected").val();
        //ooh_subtipe = null ;
        //filterSubType();
        console.log('Get Value ooh_type -> '+ooh_type);
        if( (ooh_type == '1') || (ooh_type == '2')){
            console.log('Billboard Quest');
            getVasQuestion(1);
        }else{
            console.log('OOH Quest');
            getVasQuestion(2);
        }
        
    });
    $('#ooh_type').change();
    $('#ooh_subtipe').on('change',function(){ ooh_subtipe = $(this).find("option:selected").val(); });

    $("#saveforminfo").click(function(){
        infoSave();
    });

    $('#filelocation').change(function() { 
        checkLocation();
    });

    $("#saveformcontent").click(function(){
        contentSave();
    });
    
    $("#saveformcontract").click(function(){
        contractSave();
    });

    $("#setformvas").click(function(){
        getVasContent();
    });

    $("#saveformvas").click(function(){
        vasSave();
    });

    $("#setformcpm").click(function(){
        getCpmContent();
    });

    $("#saveformcpm").click(function(){
        cpmSave();
    });

    $('.cpminp').on('change',function(){
        setcpmscore();
    });

    $('.kv-fileinput-upload').hide();

    $("#saveScore").click(function(e){
        e.preventDefault();
        vasSave();
    });

    $(".answer").change(function(e){
        //e.preventDefault();
        calcScore();
    });
   

    $('#backinv').click(function() { 
        window.location = 'inventory.html';
    });
    var html_list = '';
    var html_content = '';
    for(i=1; i<=8;i++){
        var is_active = i==1?'active':'';
        var title = '';

	if(i == 1) {
        title = 'Content 1';
    } else if(i == 2) {
        title = 'Content 2';
    } else if(i == 3){
        title = 'Content 3';
    } else if(i == 4){
        title = 'Content 4';
    } else if(i == 5){
        title = 'Content 5';
    } else if(i == 6){
        title = 'Content 6';
    } else if(i == 7){
        title = 'Content 7';
    } else {
        title = 'Content 8';
    }

    // if(i == 1) {
    //     title = 'BAST1';
    // } else if(i == 2) {
    //     title = 'BAST2';
    // } else if(i == 3){
    //     title = 'Recovering1';
    // } else if(i == 4){
    //     title = 'Recovering2';
    // } else if(i == 5){
    //     title = 'Claim 1';
    // } else if(i == 6){
    //     title = 'Claim 2';
    // } else if(i == 7){
    //     title = 'Maintenance';
    // } else {
    //     title = 'Disposal';
    // }

	html_list += '<li class="'+is_active+'"><a href="#tab-'+i+'" role="tab" data-toggle="tab">'+title+'</a></li>';        

        html_content += '<div class="tab-pane '+is_active+'" id="tab-'+i+'">'
                +'<div class="col-md-12">'
                +'<div class="col-md-6">'
                    +'<div class="form-group">'
                    +'<label class="col-md-2 control-label">Contract</label>'
                    +'<div class="col-md-10">'                                    
                        +'<select class="form-control select contractlist" id="contract'+i+'" name="contract['+i+']">'
                        +'</select>'
                    +'</div>'
                    +'</div>'
                    +'<div class="form-group">'
                    +'<label class="col-md-2 control-label">Industry</label>'
                    +'<div class="col-md-10">'                                            
                        +'<select class="form-control select industry" id="industry'+i+'" name="industry['+i+']">'
                        +'</select>'
                    +'</div>'
                    +'</div>'
                    +'<div class="form-group">'
                    +'<label class="col-md-2 control-label">Sub Industry</label>'
                    +'<div class="col-md-10">'                                    
                        +'<select class="form-control select sub_industry" id="sub_industry'+i+'" name="sub_industry['+i+']">'
                        +'</select>'
                    +'</div>'
                    +'</div>'
                    +'<div class="form-group">'
                    +'<label class="col-md-2 control-label">Advertiser</label>'
                    +'<div class="col-md-10">'   
                        +'<select class="form-control select" id="advertiser'+i+'" name="advertiser['+i+']" >'
                        +'</select>'
                    +'</div>'
                    +'</div>'
                    +'<div class="form-group">'
                    +'<label class="col-md-2 control-label">Brand</label>'
                    +'<div class="col-md-10">'
                        +'<input type="text" class="form-control brand" placeholder="Brand" id="brand'+i+'" name="brand['+i+']" />                              '
                    +'</div>'
                    +'</div>'
                    +'<div class="form-group">'
                    +'<label class="col-md-2 control-label">Campaign Title</label>'
                    +'<div class="col-md-10">'
                        +'<input type="text" class="form-control campaign_title" placeholder="Campaign Title" id="campaign_title'+i+'" name="campaign_title['+i+']" />                              '
                    +'</div>'
                    +'</div>'
                    +'<div class="form-group">'
                    +'<label class="col-md-2 control-label">Link Video</label>'
                    +'<div class="col-md-10">'
                        +'<input type="text" class="form-control link_video" placeholder="URL" id="link_video'+i+'" name="link_video['+i+']" />'
                    +'</div>'
                    +'</div>'
                +'</div>'
                +'<div class="col-md-6">'
                    +'<p>- Resolusi Foto minimal 1029 x 579 px </p>'
                    +'<p>- File size minimal 50 Kb, maksimal 1 Mb</p>'                    
                    +'<div class="form-group">'
                        +'<label class="col-md-6 control-label">Image Day</label>'
                        +'<div class="col-md-12">'
                            +'<img class="img" style="height:256px;" id="preview_image_day'+i+'"  onerror="checkingImageIfError(\'preview_image_day'+i+'\', \'day\')" src="#" alt="Image Day - '+i+'" />'
                            +'<input type="file" multiple class="file image_day" id="image_day'+i+'" name="image_day['+i+']" data-preview-file-type="jpg"/>'
                        +'</div>'
                    +'</div>'
                    +'<div class="form-group">'
                        +'<label class="col-md-6 control-label">Image Night</label>'
                        +'<div class="col-md-12">'
                            +'<img class="img" style="height:256px;" id="preview_image_night'+i+'" onerror="checkingImageIfError(\'preview_image_night'+i+'\', \'night\')" src="#" alt="Image Night - '+i+'" />'
                            +'<input type="file" multiple class="file image_night" id="image_night'+i+'" name="image_night['+i+']" data-preview-file-type="jpg"/>'
                        +'</div>'
                    +'</div>'
                    +'<input type="hidden" id="remove_this'+i+'" name="remove_this['+i+']" value="0">'
                    +'<input type="hidden" id="content_id'+i+'" name="content_id['+i+']">'
                +'</div>'
                +'<div class="col-md-12 right">'
                    +'<button class="btn btn-warning resetslot" id="reset'+i+'" onClick="resetslot('+i+');" data-idx="'+i+'" >Reset this slot data.</button>'
                +'</div>'
                +'</div>'
            +'</div>';


            

           
    }

    //LOAD DATA IF EDIT DATA OOH HERE
    setTimeout(function(){
        if(localStorage.getItem('ooh_idx')){
            $('#ooh_id').val(localStorage.getItem('ooh_idx'));
            console.log(localStorage.getItem('ooh_idx'));
            setEditOoh(localStorage.getItem('ooh_idx'));
        }
    },1000);


    //console.log(html_content);
    setTimeout(function(){
        $('#nav-tab-list').html(html_list);
        $('#content-tab-list').html(html_content);
    },1000);

    setTimeout(function(){
        //Data - 1
        filterIndustry('ind',1);
        $('#industry1').on('change',function(){
            industry[1] = $(this).find("option:selected").val();
            $('#sub_industry1').find('option').remove(); $('#sub_industry1').append( '<option selected="selected" value="">All Sub Industry</option>');
            $('#advertiser1').find('option').remove(); $('#advertiser1').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('subind',1);
        });

        $('#sub_industry1').on('change',function(){
            sub_industry[1] = $(this).find("option:selected").val();
            $('#advertiser1').find('option').remove(); $('#advertiser1').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('adv',1);
        });

        $('#advertiser1').on('change',function(){
            advertiser[1] = $(this).find("option:selected").val();
        });

        //filterContract(1);

        //Data - 2
        filterIndustry('ind',2);
        $('#industry2').on('change',function(){
            industry[2] = $(this).find("option:selected").val();
            $('#sub_industry2').find('option').remove(); $('#sub_industry2').append( '<option selected="selected" value="">All Sub Industry</option>');
            $('#advertiser2').find('option').remove(); $('#advertiser2').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('subind',2);
        });

        $('#sub_industry2').on('change',function(){
            sub_industry[2] = $(this).find("option:selected").val();
            $('#advertiser2').find('option').remove(); $('#advertiser2').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('adv',2);
        });

        $('#advertiser2').on('change',function(){
            advertiser[2] = $(this).find("option:selected").val();
        });
        //filterContract(2);

        //Data - 3
        filterIndustry('ind',3);
        $('#industry3').on('change',function(){
            industry[3] = $(this).find("option:selected").val();
            $('#sub_industry3').find('option').remove(); $('#sub_industry3').append( '<option selected="selected" value="">All Sub Industry</option>');
            $('#advertiser3').find('option').remove(); $('#advertiser3').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('subind',3);
        });

        $('#sub_industry3').on('change',function(){
            sub_industry[3] = $(this).find("option:selected").val();
            $('#advertiser3').find('option').remove(); $('#advertiser3').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('adv',3);
        });

        $('#advertiser3').on('change',function(){
            advertiser[3] = $(this).find("option:selected").val();
        });
        //filterContract(3);

        //Data - 4
        filterIndustry('ind',4);
        $('#industry4').on('change',function(){
            industry[4] = $(this).find("option:selected").val();
            $('#sub_industry4').find('option').remove(); $('#sub_industry4').append( '<option selected="selected" value="">All Sub Industry</option>');
            $('#advertiser4').find('option').remove(); $('#advertiser4').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('subind',4);
        });

        $('#sub_industry4').on('change',function(){
            sub_industry[4] = $(this).find("option:selected").val();
            $('#advertiser4').find('option').remove(); $('#advertiser4').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('adv',4);
        });

        $('#advertiser4').on('change',function(){
            advertiser[4] = $(this).find("option:selected").val();
        });

        //filterContract(4);


        //Data - 5
        filterIndustry('ind',5);
        $('#industry5').on('change',function(){
            industry[5] = $(this).find("option:selected").val();
            $('#sub_industry5').find('option').remove(); $('#sub_industry5').append( '<option selected="selected" value="">All Sub Industry</option>');
            $('#advertiser5').find('option').remove(); $('#advertiser5').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('subind',5);
        });

        $('#sub_industry5').on('change',function(){
            sub_industry[5] = $(this).find("option:selected").val();
            $('#advertiser5').find('option').remove(); $('#advertiser5').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('adv',5);
        });

        $('#advertiser5').on('change',function(){
            advertiser[5] = $(this).find("option:selected").val();
        });
        //filterContract(5);

        //Data - 6
        filterIndustry('ind',6);
        $('#industry6').on('change',function(){
            industry[6] = $(this).find("option:selected").val();
            $('#sub_industry6').find('option').remove(); $('#sub_industry6').append( '<option selected="selected" value="">All Sub Industry</option>');
            $('#advertiser6').find('option').remove(); $('#advertiser6').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('subind',6);
        });

        $('#sub_industry6').on('change',function(){
            sub_industry[6] = $(this).find("option:selected").val();
            $('#advertiser6').find('option').remove(); $('#advertiser6').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('adv',6);
        });

        $('#advertiser6').on('change',function(){
            advertiser[6] = $(this).find("option:selected").val();
        });
        //filterContract(6);

        //Data - 7
        filterIndustry('ind',7);
        $('#industry7').on('change',function(){
            industry[7] = $(this).find("option:selected").val();
            $('#sub_industry7').find('option').remove(); $('#sub_industry7').append( '<option selected="selected" value="">All Sub Industry</option>');
            $('#advertiser7').find('option').remove(); $('#advertiser7').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('subind',7);
        });

        $('#sub_industry7').on('change',function(){
            sub_industry[7] = $(this).find("option:selected").val();
            $('#advertiser7').find('option').remove(); $('#advertiser7').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('adv',7);
        });

        $('#advertiser7').on('change',function(){
            advertiser[7] = $(this).find("option:selected").val();
        });
        //filterContract(7);

        //Data - 8
        filterIndustry('ind',8);
        $('#industry8').on('change',function(){
            industry[8] = $(this).find("option:selected").val();
            $('#sub_industry8').find('option').remove(); $('#sub_industry8').append( '<option selected="selected" value="">All Sub Industry</option>');
            $('#advertiser8').find('option').remove(); $('#advertiser8').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('subind',8);
        });

        $('#sub_industry8').on('change',function(){
            sub_industry[8] = $(this).find("option:selected").val();
            $('#advertiser8').find('option').remove(); $('#advertiser8').append( '<option selected="selected" value="">All Advertiser</option>');
            filterIndustry('adv',8);
        });

        $('#advertiser8').on('change',function(){
            advertiser[8] = $(this).find("option:selected").val();
        });
        //filterContract(8);

        
        var ooh_id = $("#ooh_id").val();
        if(ooh_id){
            $('#formcontent :input').prop('disabled',false);
            $('#btnQuery').prop('disabled',false);
            $('#datee').prop('disabled',false);
            //$('#formcontent :select').prop('disabled',false);
            $('#saveformcontent').html('<strong>SAVE <span class="fa fa-floppy-o fa-right"></span> </strong>');
            
        }
        else{
            $('#formcontent :input').prop('disabled',true);
            $('#btnQuery').prop('disabled',false);
            $('#datee').prop('disabled',false);
            $('#saveformcontent').html('<strong>Please save your  OOH Information first </strong>');
    
        }
 

    },2000);

});

function checkingImageIfError(selector, type = 'day'){
    var asset = '';
    var host_android = "http://mobile-prisma-api.com:7080/image/optimize/";
    var selected = $(`#${selector}`);

    if(type === 'day'){
        asset = 'assets/images/ooh-pictures/noimage.jpg';
    }else{
        asset = 'assets/images/ooh-pictures/noimage2.jpg';
    }

    if(typeof selected.data('url') !== 'undefined'){
        selected.attr('src', host_android + selected.data('url'));
    }else{
        selected.attr('src', asset);
    }
    return;
}

function activeTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

function yesResetThis(i, remove= false){
    $("#contract"+i).val('default');
    $("#contract"+i).selectpicker("refresh"); 

    $("#industry"+i).val('default');
    $("#industry"+i).selectpicker("refresh"); 
    
    $("#sub_industry"+i).val('default');
    $("#sub_industry"+i).selectpicker("refresh"); 
    
    $("#advertiser"+i).val('default');
    $("#advertiser"+i).selectpicker("refresh"); 

    $("#brand"+i).val('');
    $("#image_day"+i).val(null);
    $("#image_night"+i).val(null);
    $("#preview_image_day"+i).attr('src','#');
    $("#preview_image_night"+i).attr('src','#');
    $("#campaign_title"+i).val('');
    $("#link_video"+i).val('');
    if(remove){
        $("#remove_this"+i).val('1');
    }
   
}

function resetslot(i){ 
    event.preventDefault();

    swal({
        title: "Are you sure?",
        text: "Do you want reset this slot number "+i,
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then(function(isConfirm){
        if (isConfirm.value) { 
            yesResetThis(i,true);
            swal("Poof! This slot has been reseted!. Click Save button for apply this.", {
            icon: "success",
            });
        } else {
            swal("This slot content is safe!");
        }
    });

    

}

var keyDict = {
    "advertiser": null,
    "brand": null,
    "campaign_title": null,
    "comp_name": null,
    "content_id": null,
    "image_day": null,
    "image_night": null,
    "ind_name": null,
    "industry": null,
    "link_video": null,
    "month": null,
    "sorper": null,
    "sub_industry": null,
    "subind_name": null,
    "year": null
}

function showContentByMonth(monthyear){
    loading();

    var ooh_id = $("#ooh_id").val();
    if(ooh_id){
        $('#formcontent :input').prop('disabled',false);
        $('#btnQuery').prop('disabled',false);
        $('#datee').prop('disabled',false);
        $('#saveformcontent').html('<strong>SAVE <span class="fa fa-floppy-o fa-right"></span> </strong>');
        
    }
    else{
        $('#formcontent :input').prop('disabled',true);
        $('#btnQuery').prop('disabled',false);
        $('#datee').prop('disabled',false);
        $('#saveformcontent').html('<strong>Please save your  OOH Information first </strong>');

    }
    
    var result = [];
    if(ooh_id){
        if(datacontent.length > 0){ 
            $.each(datacontent, function(k,v){ 
                //console.log(v);
                result.push(v[monthyear]); 
            });
        }
        //filter dari undefined array
        result = result.filter(function(element){
            return element !== undefined;
        });

        //console.log(monthyear+' -> Length : '+result.length);

        //rendering
        var arrtemp = [];
        
        if(result.length > 0){
            var idx = 1;
            //Pengisian Data
            $.each(result, function(kk,vv){ 

                filterIndustry('ind',idx,vv.industry);
                filterIndustry('subind',idx,vv.sub_industry, vv.industry);
                filterIndustry('adv',idx,vv.advertiser, vv.sub_industry);
                //console.log(idx+' contract '+vv.contract_id)
                //setTimeout(function(){
                    filterContract(idx,vv.contract_id);
                //},3000);
                
                
                $('#datee').val(zeroleftpad(vv.month,2)+'-'+vv.year);
                //console.log(idx+' - '+vv.industry);
                $.each(vv, function(k2,v2){
                    // console.log("Rendering Image...", {
                    //     tipe: k2,
                    //     index: idx,
                    //     src: v2
                    // });
                    if($('#'+k2+''+idx+'').length){
                        if(k2=='image_day' || k2=='image_night'){ 
                            var localset = ''; //'http://192.168.56.106/prisma-frontend/';
                            $('#preview_'+k2+''+idx+'').attr('src',localset+'assets/images/ooh-pictures/'+v2).attr('data-url', v2);
                            $('#'+k2+''+idx+'').text(v2);
                        } else {
                            $('#'+k2+''+idx+'').val(v2); 
        
                        }
                    }
                }); 
                idx++;
            });
            //console.log('Last Isi ID:'+idx);
            var max = 8;
            var max_idx = max - idx;
            //console.log('Sisa Isi ID:'+max_idx);
            
            if(max_idx > 0){
                // Reset Form yg kosong
                for(j=idx;j<=max;j++){  
                    //console.log('Idx yg kudu diisi : '+j);
                    yesResetThis(j); 
                }
            }
            
        }else{
            // Reset Form yg kosong
            console.log('Reset All');
            for(j=1;j<=8;j++){  
                //console.log('Idx yg kudu diisi : '+j);
                yesResetThis(j);
                $("#content_id"+j).val('');
            }
        }
        

        

    }else {
        swal({
                title: "Error",
                text: "Data Info Titik harus di isi terlebih dahulu",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            });

    }

    setTimeout(function(){
        activeTab('tab-1');
        loading(false);
    },2000);

    return result;
}

function zeroleftpad(str,max){ 
    return (Array(max + 1).join('0') + str).slice(-max);
}
 

function setEditOoh(ooh_id) {
    loading();
    $.ajax({
        cache: false,
        type: 'GET',
        data: {"ooh_id":ooh_id},
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/oohlib',
        dataType: 'json',
        success: function(data) {
            if(typeof data != 'object'){ data = $.parseJSON(data); }
            $.each(data.data, function(k,v){

                var ownership = v.owner;

                //HIDE INFO N CONTRACT KETIKA OWNERSHIP NYA PRISMA
                /*
                if(ownership == 'PRISMA'){
                    $('[data-lvsd="input-info"]').hide();
                    $('[data-lvsd="input-contract"]').hide(); 
                }*/
                //END HIDE 
                //var dfd = $.Deferred();
                //dfd.done( filterArea(v.province)).done( filterArea(v.district)).done( filterArea(v.sub_district));
                //filterArea(v.province).then(filterArea(v.district).then( filterArea(v.sub_district)));
                province = v.province;
                district = v.district;
                sub_district = v.sub_district;
                filterArea(v.province,'pr'); 
                setTimeout(function(){
                    filterArea(v.district,'di');
                },1000);
                setTimeout(function(){
                    filterArea(v.sub_district,'su'); 
                },2000);
                
                
                $('#ooh_id_disabled').val(ooh_id);
                $('#no_cnv_disabled').val(v.no_cnv);
                $('.select').selectpicker('refresh');
                $(".titooh1").html("[ " +v.latitude+ ", "+v.longitude+" ]" + "  OOH - " + v.ooh_id);
                $(".titooh2").html(v.address);

                $('#vscore_current').text(v.vscore);

                if(v.ooh_type){
                        filterSubType(v.ooh_type);  
                        console.log('750 -> ooh_type '+v.ooh_type);
                        if( (v.ooh_type == '1') || (v.ooh_type == '2')){
                            
                            setTimeout(function(){ 
                                console.log('750 -> Billboard Quest'); 
                                getVasQuestion(1); 
                            },5000);
                        }else{
                            
                            setTimeout(function(){ 
                                console.log('750 -> OOH Quest');
                                getVasQuestion(2);
                            },5000);
                        }
                }

                var arr_dropdown = ['ooh_type','kode_produk','type_produk','orientasi','lighting','owner','jumlah_sisi','fixing','competition','visible_distance','angle_of_vision','obstruction','street_lite','road_type'];

                var sta = 0 ;
                var index = 0;
                $.each(v, function(k1,v1){
                    index += 1;
                    if($('#'+k1+'').length){
                        if(arr_dropdown.indexOf(k1) >= 0) {
                            //console.log(k1+' -> '+v1);
                            if(v1 == null){ 
                                 v1 = 0;
                            }
                            setTimeout(function(){
                                $('#'+k1+'').val(v1);
                                $('#'+k1+'').selectpicker('refresh');
                            },200*index);

                            if(k1 == 'ooh_subtipe'){
                                setTimeout(function(){
                                    $('#'+k1+'').val(v1);
                                    $('#'+k1+'').selectpicker('refresh');
                                },500);
                            }


                        } else { 
                            if(v1 == null){
                               // console.log('ini yg null')
                                v1 = 0;
                            }
                            if(k1 == 'traffic'){
                                if(v1 == null){ 
                                    v1 = 0;
                                }
                                if(v1 == 'NA'){ 
                                    v1 = 0;
                                }
                            }
                            if(k1 == 'vscore'){
                                if(v1 == null){ 
                                    v1 = 0;
                                }
                                if(v1 == 'NA'){ 
                                    v1 = 0;
                                }
                            }
                            $('#'+k1+'').val(v1);
                            //console.log(k1+' --> '+v1);
                        }
                    }     
                    
                    if($.isArray(v1)){
                        //if(sta==0){
                            //console.log(v1);
                            var idx = 1;
                            $.each(v1, function(kk,vv){ 
                                $('#datee').val(zeroleftpad(vv.month,2)+'-'+vv.year); 
                                var arrtopush = new Array();
                                arrtopush[''+zeroleftpad(vv.month,2)+'-'+vv.year+''] = vv;
                                datacontent.push(arrtopush); 
                                idx++;
                            });
                            setTimeout(function(){
                             $('#btnQuery').click();
                            },2000);
                            //sta++;
                        //}
                        
                    }
                    
                });

            });  
            console.log('Try to change ooh_type');
            //$('#ooh_type').change(); 
            filterCompany(); 
            if(chkdel('input-info') === false){
                if(chkdel('input-content')){
                 $('li[data-lvsd="input-content"] a[href="#tab-cont"]').tab('show');
                }
            }
             
            loading(false);
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


function setTableContent1(datane) { 

    if(!$.fn.DataTable.fnIsDataTable( "#contract-table" )) {
        // do nothing
    } else {
        $('#contract-table').DataTable().destroy();
        //$('#ooh_site').empty();
        // $('#table-data').html('');
    }
  
    $('#contract-table').DataTable({
      "fixedHeader": false,
      "destroy" : true,
      "searching": true,
      "bLengthChange": true,
      "retrieve": true,
      "info": true,
      "ordering": true,
      // "dom": '<""lf>t<""ipB>',
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel'
      ],
      "columns" : [
        {data: "id"}, 
        {data: "client"}, 
        {data: "startdate"},
        {data: "enddate"},
        {data: "remark"}
      ],
      "columnDefs": [
        // { className: "text-center", "targets": [ 0 ] },
        // { "visible": false, "targets": [ 0 ] },
      ], 
      "data" : datane
    });
   
  }

  function filterArea(curr_val,lvl='pr') {
    if(lvl === undefined) { lvl = 'pr';}
    if(curr_val === undefined) { curr_val = false;}
    var data = {};
    if(lvl == 'pr'){
        data = {};
    }else if(lvl == 'di'){
        data = {"province":province};
    }else {
       data = {"province":province, "district":district};
    }



    $.ajax({
        cache: false,
        type: 'GET',
        data: data,
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/filterarea',
        dataType: 'json',
        async: (curr_val==false) ? true : false,
        success: function(data) {
            if(typeof data != 'object'){ data = $.parseJSON(data); }
            var optionsAsString = ""; 
            $.each(data.data, function(k,v){
                var selected = '';
                if(curr_val) {
                    if(v[0]==curr_val) {
                        selected = 'selected';
                    }
                }
            	optionsAsString += "<option value='" + v[0] + "' "+selected+">" + v[1] + "</option>";
            }); 
            
            if (lvl == 'su') {
            	$('#sub_district').find('option').remove();
            	$('#sub_district').append( '<option selected="selected" value="">All Sub District</option>' + optionsAsString );
                if(curr_val) { sub_district = curr_val; 
                    $('select[name=sub_district]').val(curr_val);
                }
            } else if(lvl == 'di') {
            	$('#district').find('option').remove();
                $('#district').append( '<option selected="selected" value="">All District</option>' + optionsAsString );
                if(curr_val) { 
                    district = curr_val; 
                    $('select[name=district]').val(curr_val);
                }
            } else {
                $('#province').find('option').remove();
                $('#province').append( '<option selected="selected" value="">All Province</option>' + optionsAsString );
                if(curr_val) { 
                    province = curr_val;
                    $('select[name=province]').val(curr_val);
                 }
                
            }
            
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
}

function filterDataIndustry(lvl,value){
    var result = []
    if(lvl == 'ind'){
        result = $.grep(arrindustry, function(v) {
            return v.id == value;
        });    

        if(result.length < 1) result = arrindustry;
    }
    if(lvl == 'subind'){
        result = $.grep(arrsub_industry, function(v) {
            return v.ind_id == value;
        });    

        if(result.length < 1) result = arrsub_industry;
    }
    if(lvl == 'adv'){
        result = $.grep(arradvertiser, function(v) {
            return v.subind_id == value;
        });    
        if(result.length < 1) result = arradvertiser;
    }

    return result;
}

function initialLoadData(lvl) {

    if(lvl === undefined) { lvl = '';}  

    //console.log(industry);
    $.ajax({
        cache: false,
        type: 'GET',
        data: { "lvl":lvl},
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/filterindustry',
        dataType: 'json',
        success: function(data) {
            if(typeof data != 'object'){ data = $.parseJSON(data); }
            var optionsAsString = ""; 
             
            $.each(data.data, function(k,v){
                var selected = ''; 
                var arrTemp = [];
                if(lvl == 'subind'){
                    arrTemp = {
                        "id" : v[0],
                        "name" : v[1],
                        "desc" : v[2],
                        "ind_id" : v[3],
                        "ind_name" : v[4],
                    };

                    arrsub_industry.push(arrTemp);
                }

                if(lvl == 'adv'){
                    arrTemp = {
                        "id" : v[0],
                        "name" : v[1],
                        "desc" : v[2],
                        "color" : v[3],
                        "subind_id" : v[4],
                        "subind_name" : v[5],
                    };

                    arradvertiser.push(arrTemp);
                }

                if(lvl == 'ind'){
                    arrTemp = {
                        "id" : v[0],
                        "name" : v[1],
                        "desc" : v[2],
                    };

                    arrindustry.push(arrTemp);
                }
            });
            
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

function filterIndustry(lvl, idx, curr_val, subval) {

    if(lvl === undefined) { lvl = '';}
    if(curr_val === undefined) { curr_val = false;}
    if(subval === undefined) { subval = false;}

    industry[idx]     = (lvl=='subind' && subval) ? subval : $('#industry'+idx+'').val();
    sub_industry[idx] = (lvl=='adv' && subval) ? subval : $('#sub_industry'+idx+'').val();

    
    var data = [];
    if(lvl == 'ind'){
        data = filterDataIndustry(lvl,0); 
    } 
    if(lvl == 'subind'){
        data = filterDataIndustry(lvl,industry[idx]);
    } 
    if(lvl == 'adv'){
        data = filterDataIndustry(lvl,sub_industry[idx]);
    } 
    
    var optionsAsString = ""; 
    $.each(data, function(k,v){
        var selected = '';
        //console.log(v.id+' --> Current Value : '+curr_val);
        if(curr_val) {
            if(v.id==curr_val) {
                
                selected = 'selected';
            }
        }
        optionsAsString += "<option value='" + v.id + "' "+selected+" >" + v.name+ "</option>";
    });
    if (lvl=='adv') {
        //$('#advertiser'+idx+'').find('option').remove();
        $("#advertiser"+idx).val('default').selectpicker("refresh");        
        $('#advertiser'+idx+'').append( '<option selected="selected" value="">All Advertiser</option>' + optionsAsString ).selectpicker("refresh");;
    } else if (lvl=='subind') {
        //$('#sub_industry'+idx+'').find('option').remove();
        $("#sub_industry"+idx).val('default').selectpicker("refresh");
        $('#sub_industry'+idx+'').append( '<option selected="selected" value="">All Sub Industry</option>' + optionsAsString ).selectpicker("refresh");;
    } else { 
        $("#industry"+idx).val('default').selectpicker("refresh");
        $('#industry'+idx+'').append( '<option selected="selected" value="">All Industry</option>' + optionsAsString ).selectpicker("refresh");;
    }
    //$('.select').selectpicker('refresh');
 
}


function filterDataContract(value){
    var result = [] 
    result = $.grep(arrcontract, function(v) {
        return v.contract_id == value;
    });    

    if(result.length < 1) result = arrcontract; 

    return result;
}

function filterContract(idx, curr_val) {
 
    if(curr_val === undefined) { curr_val = false;} 
    //console.log('Contract idx '+idx)
    
    var data = [];
    data = filterDataContract(curr_val); 
    
    var optionsAsString = ""; 
    $.each(data, function(k,v){
        var selected = '';
        //console.log(v.id+' --> Current Value : '+curr_val);
        if(curr_val) {
            if(v.contract_id==curr_val) {
                
                selected = ' selected="selected"';
            }
        }
        optionsAsString += "<option value='" + v.contract_id + "' "+selected+" >" + v.cmp_name+ "</option>";
    }); 
    $("#contract"+idx).find('option').remove(); 
    $("#contract"+idx).val('default').selectpicker("refresh");        
    $('#contract'+idx+'').append( '<option value="">Select Contract</option>' + optionsAsString ).selectpicker("refresh");;
    //$("#contract"+idx).val('default').selectpicker("refresh");        
 
}

function SelboxCustom() {

    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/selboxcustom',
        dataType: 'json',
        success: function(data) {
            if(typeof data != 'object'){ data = $.parseJSON(data); } 

            $.each(data.data, function(k,v){
                var optionsAsString = "";
                $.each(data.data[k], function(k1,v1){
                    optionsAsString += "<option value='" + v1[0] + "'>" + v1[1] + "</option>";
                });
                $('#'+k+'').append(optionsAsString);
            });
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
}

function filterSubType(oty) {

    if(oty === undefined) { oty = false;}

    var otype  = oty ? oty : ooh_type;
    if(otype){
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/filtertype',
            data: {"otype":otype},
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); } 
                if(data.data[otype].subclass){
                    var optionsAsString = "";
                    $.each(data.data[otype].subclass, function(k,v){                    
                        optionsAsString += "<option value='" + v.scpoid + "'>" + v.scpoiname+ "</option>";
                    });
                    $('#ooh_subtipe').find('option').remove();
                    $('#ooh_subtipe').append(optionsAsString);
                    $('.select').selectpicker('refresh');
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

function infoSave(){

    var form = $("#forminfo")[0];
    var data = new FormData(form);
    var lat  = $("#latitude").val();
    var lng  = $("#longitude").val();
    if(province && sub_district && district && lat && lng){
        loading();
        $.ajax({
        url: APIURL + "data/oohlib",
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
                $("#ooh_id").val(result.ooh_id);
                $(".titooh1").html("[ " +result.location+ " ]" + "  OOH - " + result.ooh_id);
                $(".titooh2").html(result.address);
                $("#tab-cont").click();
                swal({
                    title: "Success!",
                    text: "Data Saved",
                    type: "success",
                    confirmButtonText: "OK"
                },
                function(){
                });
                filterCompany();
                loading(false);
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
        swal({
                title: "Error",
                text: "Data lokasi harus di isi",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            });

    }
}

function contentSave(){

    var form = $("#formcontent")[0];
    var data = new FormData(form);
    data.append("ooh_id", $("#ooh_id").val());


    if($("#ooh_id").val()){
        var statImg1 = checkFileImg(document.getElementById("image_day1"), 'img');
        var statImg2 = checkFileImg(document.getElementById("image_night1"), 'img');

        if(datee && statImg1 && statImg2){
            loading();
            $.ajax({
            url: APIURL + "data/oohcontent",
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
                        text: "Content Data Saved",
                        type: "success",
                        confirmButtonText: "OK"
                    },
                    function(){
                    });
                    loading(false);
                    location.reload();
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
                        loading(false); 
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
                        loading(false); 
                    }
                }
            });
        } else {
                swal({
                        title: "Error",
                        text: "Bulan-Tahun tidak boleh kosong dan Gambar harus sesuai format (jpg / jpeg)",
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Close"
                    }); 

            }
    } else {
        swal({
                title: "Error",
                text: "Anda harus mengisi info OOH terlebih dahulu",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            }); 
            

    }
}


function contractSave(){

    var form = $("#formcontract")[0];
    var data = new FormData(form);
    data.append("ooh_id", $("#ooh_id").val());


    if($("#ooh_id").val()){
        var contract_start = $('#contract_start').val();
        var contract_end = $('#contract_end').val(); 

        if(contract_start && contract_end){
            loading();
            $.ajax({
            url: APIURL + "data/contract",
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
                        text: "Content Data Saved",
                        type: "success",
                        confirmButtonText: "OK"
                    },
                    function(){
                    });
                    loading(false);
                    fillContractTable();
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
                        loading(false); 
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
                        loading(false); 
                    }
                }
            });
        } else {
                swal({
                        title: "Error",
                        text: "Bulan-Tahun tidak boleh kosong dan Gambar harus sesuai format (jpg / jpeg)",
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Close"
                    }); 

            }
    } else {
        swal({
                title: "Error",
                text: "Anda harus mengisi info OOH terlebih dahulu",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            }); 
            

    }
}

function checkLocation(){

    var formData = new FormData();
    formData.append('image', $("#filelocation").prop('files')[0]);

    var statImg = checkFileImg(document.getElementById("filelocation"), 'img');

    if(statImg){
        $.ajax({
        url: APIURL + "data/chkmetaimage",
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        type: "POST",
        enctype: 'multipart/form-data',
        data: formData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success:function(data, textStatus, jqXHR) {
                var result = data.data
                $("#address").val(result.alamat);
                if(result.latitude){
                    $("#latitude").val(result.latitude);
                    $("#longitude").val(result.longitude);
                }else{
                    swal({
                        title: "Warning",
                        text: "Maaf tidak ditemukan metadata GPS Location, silahkan input manual",
                        type: "warning",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Close"
                    });
                }
                
            }
        });
    } else {
                swal({
                        title: "Error",
                        text: "Gambar harus sesuai format (jpg / jpeg)",
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Close"
                    });

            }
}


function getVasContent(){

    var ooh_id = $("#ooh_id").val();
    if(ooh_id){
        $.ajax({
        url: APIURL + "data/vascontent",
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        cache: false,
        type: 'GET',
        data: {"ooh_id":ooh_id},
        success:function(data, textStatus, jqXHR) {
                var optionsAsString =  '<table class="table table-striped" style="margin-top:20px;"><tbody>';
                var valmax          = 0;
                var pos_ooh         = ''

                $.each(data.data, function(k,v){
                    optionsAsString +=  '<tr><td><div class="form-group">'+
                                            '<label class="col-md-2 control-label" style="text-align: left;">'+
                                                v.variable_desc+
                                            '</label>';
                    optionsAsString +=      '<div class="col-md-10" >';

                    var valvar = 0;
                    $.each(v.parameter, function(k1,v1){
                        var valpar = v.variable_weight * v1.param_weight
                        optionsAsString +=      '<div class="col-md-'+(k1>2?3:2)+'">'+
                                                    '<label class="check"><input onchange="setvasscore()" '+v1.check+' type="radio" data-vale="'+valpar+'" value="'+v1.param_id+'" class="iradio vaschk" name="'+v.variable_name+'" />&nbsp; '+v1.param_name+'</label>'+
                                                '</div>';
                        valvar = valpar > valvar ? valpar : valvar ;
                    });
                    valmax = valmax + valvar ;

                    optionsAsString +=      '</div>';
                    optionsAsString +=  '</div>';
                    optionsAsString +=  '</td></tr>';

                    pos_ooh     = v.posisi_ooh;
                });

                optionsAsString +=   '</tbody></table>';

                $('#cont_vas').html(optionsAsString);
                $('#vastotscore').text('');
                $('#vasscore').text('');
                $('#vasmaxscore').text(valmax);
                var posooh = '';
                if(pos_ooh==1){
                    posooh = 'INDOOR OOH';
                }else if (pos_ooh==2) {
                    posooh = 'OUTDOOR OOH';
                }
                $('#pos_ooh').text(posooh);
                $('#vas_pos_ooh').val(pos_ooh);

                setvasscore();
                
            }
        });
    } else {

        swal({
                title: "Warning",
                text: "Data utama OOH belum di Set !",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            });

    } 
}

function setvasscore(){

    var vaschk = 0;
    $.each($("#formvas input:radio:checked"), function(){        
        // vaschk = vaschk + Number($(this).val()) ;
        vaschk = vaschk + Number($(this).data('vale')) ;
    });
    
    $('#vastotscore').text(vaschk);
    var mx = $('#vasmaxscore').text();
    var vs = ((vaschk/Number(mx))*100).toFixed(2);
    $('#vasscore').text(vs);
}

function vasSave(){

    var form = $("#formvas")[0];
    var data = new FormData(form);
    data.append("ooh_id", $("#ooh_id").val());
    data.append("vas_score",  $('#vasscore').val());
    console.log($("#ooh_id").val());
    console.log($("#vasscore").val());
    if($("#ooh_id").val() && $('#vasscore').val()){
        $.ajax({
        url: APIURL + "data/vascontent",
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
                    text: "Content Data Saved",
                    type: "success",
                    confirmButtonText: "OK"
                },
                function(){
                });

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
        swal({
                title: "Error",
                text: "Anda harus mengisi info OOH dan mengisi Nilai Vas",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            });

    }
}

function getCpmContent() {

    var ooh_id = $("#ooh_id").val();
    if(ooh_id){
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/cpmcontent',
            dataType: 'json',
            data: {"ooh_id":ooh_id},
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); } 
                $.each(data.data, function(k,v){
                    $('#'+k+'').val(v);
                });
                setcpmscore();
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
    } else {

        swal({
                title: "Warning",
                text: "Data utama OOH belum di Set !",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            });

    } 
}

function setcpmscore(){

    // var trhr        = $('#traffic_hr').val();
    // var trmth       = $('#traffic_mth').val();
    // var esimmth     = $('#est_imp_mth').val();
    
    var esunimmth   = $('#est_uniq_imp_mth').val();
    var kurs_usd    = $('#kurs_usd').val();
    var comthidr    = $('#cost_mth_idr').val();

    if(comthidr && kurs_usd) {
        var cus = (comthidr/kurs_usd).toFixed(2);
        $('.cost_mth_usd').text(cus);
        $('#cost_mth_usd').val(cus);
    }
    if(comthidr && esunimmth) {
        var ecpmidr = ((esunimmth/1000) * comthidr).toFixed(2);
        $('.est_cpm_idr').text(ecpmidr);
        $('#est_cpm_idr').val(ecpmidr);
    }
    var comthusd = $('#cost_mth_usd').val();
    if(comthusd && esunimmth) {
        var ecpmusd = ((esunimmth/1000) * comthusd).toFixed(2);
        $('.est_cpm_usd').text(ecpmusd);
        $('#est_cpm_usd').val(ecpmusd);
    }
    
}

function cpmSave(){

    var form = $("#formcpm")[0];
    var data = new FormData(form);
    data.append("ooh_id", $("#ooh_id").val());

    if($("#ooh_id").val()){
        $.ajax({
        url: APIURL + "data/cpmcontent",
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
                    text: "Content Data Saved",
                    type: "success",
                    confirmButtonText: "OK"
                },
                function(){
                });

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
        swal({
                title: "Error",
                text: "Anda harus mengisi info OOH terlebih dahulu",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            });

    }
}

function filterKodeProduk(kode = '') {
 
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/kodeproduk',
            data: {"kode":kode},
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); } 
                if(data.processStatus == 0 ){
                    var optionsAsString = "";
                    $.each(data.data, function(k,v){                    
                        optionsAsString += "<option value='" + v[0] + "'>" + v[0]+ "</option>";
                    });
                    $('#kode_produk').find('option').remove();
                    $('#kode_produk').append(optionsAsString);
                    $('.select').selectpicker('refresh');
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



function filterCompany() {

    var ooh_id = $("#ooh_id").val();
    if(ooh_id){
        $('#cmp_id').prop('disabled', false);
        $('#contract_start').prop('disabled', false);
        $('#contract_end').prop('disabled', false);
        $('#contract_desc').prop('disabled', false);
        $('#saveformcontract').prop('disabled', false);
        $('#saveformcontract').html('<strong>SAVE <span class="fa fa-floppy-o fa-right"></span> </strong>');

        fillContractTable();
    }
    else{
        $('#cmp_id').prop('disabled', true);
        $('#contract_start').prop('disabled', true);
        $('#contract_end').prop('disabled', true);
        $('#contract_desc').prop('disabled', true);
        $('#saveformcontract').prop('disabled', true);
        $('#saveformcontract').html('<strong>Please save your  OOH Information first </strong>');

    }

    
 
    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'user/company', 
        //data:{ooh_id:ooh_id},
        dataType: 'json',
        success: function(data) {
            if(typeof data != 'object'){ data = $.parseJSON(data); } 
            if(data.processStatus == 0 ){
                var optionsAsString = "";
                $.each(data.data, function(k,v){                    
                    optionsAsString += "<option value='" + v[0] + "'>" + v[1]+ "</option>";
                });
                $('#cmp_id').find('option').remove();
                $('#cmp_id').append(optionsAsString);
                $('.select').selectpicker('refresh');
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


function initialLoadContract() {

    var ooh_id = $("#ooh_id").val();
    if(ooh_id){
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token }, 
            url: APIURL + 'data/contract', 
            data:{ooh_id:ooh_id},
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); } 
                if(data.processStatus == 0 ){
                    //var optionsAsString = "";
                    arrcontract = [];
                    var arrTemp = [];
                    $.each(data.data, function(k,v){                    
                        //optionsAsString += "<option value='" + v[0] + "'>" + v[1]+ "</option>";
                        arrTemp = {
                            "contract_id" : v[0],
                            "cmp_id" : v[1],
                            "cmp_name" : v[2],
                            "contract_start" : v[3],
                            "contract_end" : v[4],
                            "contract_desc" : v[5],
                            "ooh_id" : v[6],
                            "no_site" : v[7],
                        };
    
                        arrcontract.push(arrTemp);
                    }); 
                    //$('#contract'+idx).find('option').remove();
                    //$('#contract'+idx).append(optionsAsString);
                    //$('.select').selectpicker('refresh');
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


function fillContractTable() {
    initialLoadContract();
    var ooh_id = $("#ooh_id").val();
    if(ooh_id){ 
    
 
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/contract', 
            data:{ooh_id:ooh_id},
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); } 
                if(data.processStatus == 0 ){
                    var datane1  = [];
                    var optionsAsString = "";
                    $.each(data.data, function(k,v){  
                        //console.log(v);                  
                        perdata1 = {
                            "id": v[0], 
                            "client": v[2],
                            "startdate": v[3],
                            "enddate": v[4],
                            "remark":  v[5],
                        }
                        datane1.push(perdata1);
                    }); 
                    setTableContent1(datane1);
                }
                setTimeout(function(){                    
                    filterContract(1);
                    filterContract(2);
                    filterContract(3);
                    filterContract(4);
                    filterContract(5);
                    filterContract(6);
                    filterContract(7);
                    filterContract(8);
                },100);
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
//&lt;
var dataquestion_billboard = [
    {
      "code" : "quest001",
      "question": "Size Billboard",
      "answer": [
        "25 - 32 m2",
        "32 - 71 m2",
        "72 - 127 m2",
        "128 - 200 m2",
        "&gt; 200 m2"
      ]
    },
    {
      "code" : "quest002",
      "question": "Jumlah Billboard di sekitar",
      "answer": [
        "&gt; 5",
        "3 - 5",
        "2",
        "1",
        "0"
      ]
    },
    {
        "code" : "quest003",  
      "question": "Lokasi billboard",
      "answer": [
        "Perumahan",
        "Airport",
        "Perkantoran",
        "Hangout Place",
        "Landmark"
      ]
    },
    {
        "code" : "quest004",
      "question": "Arah pandang ke billboard",
      "answer": [
        "Paralel",
        "Cross Opposite",
        "Kanan jalan",
        "Kiri jalan",
        "Frontal / Jarak pandang lebar"
      ]
    },
    {
        "code" : "quest005",
      "question": "Posisi billboard",
      "answer": [
        "Sisi Jalan",
        "Tikungan Jalan",
        "Melintang Jalan",
        "Pertigaan/persimpangan jalan, termasuk perempatan jalan yang tidak memiliki lampu merah",
        "Perempatan Lampu Merah"
      ]
    },
    {
        "code" : "quest006",
      "question": "Jarak pandang ke billboard",
      "answer": [
        "&lt; 30 m",
        "30 - 80 m",
        "80 - 150 m",
        "150 - 250 m",
        "&gt; 250 m"
      ]
    },
    {
        "code" : "quest007",
      "question": "Traffic",
      "answer": [
        "&lt; 30,000 vehicle/day",
        "30,000 - 50,000 vehicle/day",
        "50,000 - 100,000 vehicle/day",
        "100,000 - 200,000 vehicle/day",
        "&gt; 200,000 vehicle/day"
      ]
    },
    {
        "code" : "quest008",
      "question": "Rata-rata kecepatan kendaraan",
      "answer": [
        "&gt;= 81 km/jam",
        "61 &lt;= 80 km/jam",
        "41 &lt;= 60 km/jam",
        "21 &lt;= 40 km/jam",
        "&lt;= 20 km/jam"
      ]
    },
    {
        "code" : "quest009",
      "question": "Jarak dengan billboard competitor",
      "answer": [
        "&lt;= 30 m",
        "31 - 80 m",
        "81 - 150 m",
        "151 - 200 m",
        "&gt; 200 m"
      ]
    },
    {
        "code" : "quest010",
      "question": "Clear view (dari pohon, kabel, billboard lain, dll)",
      "answer": [
        "80%",
        "85%",
        "90%",
        "95%",
        "100%"
      ]
    },
    {
        "code" : "quest011",
      "question": "Kelas Jalan",
      "answer": [
        "Ekonomi 2",
        "Ekonomi 1",
        "Premium Area",
        "Protokol B dan C",
        "Protokol A"
      ]
    }
  ];

  var dataquestion_ooh = [
    {
        "code" : "quest001",
      "question": "Ukuran OOH",
      "answer": [
        "&lt; 6 m2",
        "6 - 12 m2",
        "13 - 24 m2",
        "25 - 31 m2",
        "&gt; 32 m2"
      ]
    },
    {
        "code" : "quest002",
      "question": "Jumlah OOH di sekitar",
      "answer": [
        "&gt; 7",
        "5 - 7",
        "3 - 5",
        "2",
        "1"
      ]
    },
    {
        "code" : "quest003",
      "question": "Lokasi OOH",
      "answer": [
        "Pemukiman",
        "Public Transport Stations",
        "Perkantoran",
        "Hangout Place",
        "Landmark"
      ]
    },
    {
        "code" : "quest004",
      "question": "Arah pandang ke OOH",
      "answer": [
        "Cross Opposite",
        "Kanan jalan",
        "Paralel",
        "Kiri jalan",
        "Frontal / Jarak pandang lebar"
      ]
    },
    {
        "code" : "quest005",
      "question": "Posisi OOH",
      "answer": [
        "Sisi Jalan",
        "Tikungan Jalan",
        "Trotoar",
        "Pertigaan/persimpangan jalan, termasuk perempatan jalan yang tidak memiliki lampu merah",
        "Perempatan Lampu Merah"
      ]
    },
    {
        "code" : "quest006",
      "question": "Jarak pandang ke OOH",
      "answer": [
        "&lt; 10 m",
        "10 - 24 m",
        "25 - 49 m",
        "50 - 99 m",
        "&gt; 100 m"
      ]
    },
    {
        "code" : "quest007",
      "question": "Traffic",
      "answer": [
        "&lt; 20,000 vehicle/day",
        "20,000 - 50,000 vehicle/day",
        "50,001 - 80,000 vehicle/day",
        "80,001 - 100,000 vehicle/day",
        "&gt; 100,000 vehicle/day"
      ]
    },
    {
        "code" : "quest008",
      "question": "Rata-rata kecepatan kendaraan",
      "answer": [
        "&lt; 60 km/jam",
        "40 - 60 km/jam",
        "20 - 40 km/jam",
        "10 - 20 km/jam",
        "&gt; 10 km/jam"
      ]
    },
    {
        "code" : "quest009",
      "question": "Jarak dengan OOH competitor",
      "answer": [
        "&lt; 30 m",
        "30 - 80 m",
        "81 - 150 m",
        "151 - 200 m",
        "&gt; 200 m"
      ]
    },
    {
        "code" : "quest010",
      "question": "Clear view (dari pohon, kabel, OOH lain, dll)",
      "answer": [
        "80%",
        "85%",
        "90%",
        "95%",  
        "100%"
      ]
    },
    {
        "code" : "quest011",
      "question": "Kelas Jalan",
      "answer": [
        "Lingkungan",
        "Ekonomi 2",
        "Ekonomi 1",
        "Premium Area",
        "Protokol"
      ]
    }
  ];


var mapDataScore = [
    {
        "code" : "quest002",
        'map':[
            {
                "None": 5,
                "1 Site":4,
                "2 Sites":3,
                "3 Sites":2,
                "4 Sites":2,
                "5 Sites":2,
                "6+ Sites":1,
            }
        ]
    },
    {
        "code" : "quest006",
        'map':[
            {
                "0-25m": 1,
                "25-50m":2,
                "50-100m":3,
                "100-200m":4,
                "200m+":5
            }
        ]
    },
    {
        "code" : "quest010",
        'map':[
            {
                "None": 5,
                "Slight":1,
                "Moderate":0,
                "Severe":0
            }
        ]
    }
]; 

function getVasQuestion(typeooh = 1){
    $('#quest').html('');
    
    
    var dataquestion = [];
    if(typeooh == 1){
        dataquestion = dataquestion_billboard;
    }
    else {
        dataquestion = dataquestion_ooh;
    }

    
 
   

    var ooh_id = $("#ooh_id").val();
    if(ooh_id){

        var dataanswer = {};
        $.ajax({
            cache: false,
            type: 'GET',
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            url: APIURL + 'data/vascontent', 
            data:{ooh_id:ooh_id},
            dataType: 'json',
            success: function(data) {
                if(typeof data != 'object'){ data = $.parseJSON(data); } 
                dataanswer = data.data;
                //console.log(dataanswer)

                var htmlform = '';
                $.each(dataquestion,function(k,v){
                    var questid = k + 1;
                    htmlform += '<div class="row">'+
                    '<div class="col-md-2 h5">'+
                        v.question+
                    '</div>';
                    
                    $.each(v.answer,function(kk,vv){
                        var vscore = kk + 1;
                        //console.log('test -> '+vscore+' '+v.code+' -> '+dataanswer[v.code])
                        var ischecked = ( vscore == dataanswer[v.code] ) ? 'checked="checked"' : "";
                        htmlform +='<div class="col-md-2">'+
                                    '<label class="check"><input  '+ischecked+' type="radio" class="iradio answer" id="'+v.code+'" name="'+v.code+'" value="'+vscore+'" data-score="'+vscore+'" /> '+vv+'</label>'+
                                '</div>';
                    });
                    htmlform += '</div>';
                });

                //return htmlform;
                $('#quest').html(htmlform);
                $('#saveScore').prop('disabled',false);

                $(".answer").change(function(e){
                    //e.preventDefault();
                    calcScore();
                });
            }
        }); 


        
    } else {
        $('#quest').html('<h1>Data informasi OOH belum di Set !</h1><p>Silahkan isi terlebih dahulu data Informasi OOH, pada tab "info"</p>');
        $('#saveScore').prop('disabled',true);
        /*swal({
                title: "Warning",
                text: "Data utama OOH belum di Set !",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            }); */

    } 


}

function calcScore() {
    var score = 0;
    var idx = 0;
    $("input[type=radio][data-score]:checked").each(function(i, el) {
      score += +$(el).data("score");
      //console.log("i : "+i);
      //console.log("Score : "+$(el).data("score"));
      idx += 1;
      //console.log("Idx : "+idx);
    });
    var maxval = 5 * idx;
    var vscore = parseFloat( (score / maxval ) * 100).toFixed(2);
    $("#score").text(vscore); 
    $("#vasscore").val(vscore); 
  }

  
function vasSave(){

    var form = $("#formvas")[0];
    var data = new FormData(form);
    data.append("ooh_id", $("#ooh_id").val());
    data.append("vas_score",  $('#vasscore').val());

    if($("#ooh_id").val() && $('#vasscore').val()){
        $.ajax({
        url: APIURL + "data/vascontent",
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
                    text: "Content Data Saved",
                    type: "success",
                    confirmButtonText: "OK"
                },
                function(){
                });

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
        swal({
                title: "Error",
                text: "Anda harus mengisi info OOH dan mengisi Nila Vas",
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Close"
            });

    }
}


function mapinfodata(){
    loading();
    var visible_distance = $('#visible_distance').val();
    var competition = $('#competition').val();
    var obstruction = $('#obstruction').val();

    //console.log(visible_distance);
    //console.log(competition);
    //console.log(obstruction);

    $.each(mapDataScore,function(k,v){
        //console.log(v)
        $.each(v.map[0],function(kk,vv){
            //console.log(kk);
            if('quest006' == v.code){
                if(kk == visible_distance){ 
                    console.log(kk+' == '+visible_distance);
                    $("input[name=quest006][value=" + vv + "]").attr('checked', 'checked');
                }
            }

            if('quest002' == v.code){
                if(kk == competition){ 
                    console.log(kk+' == '+competition);
                    $("input[name=quest002][value=" + vv + "]").attr('checked', 'checked');
                }
            }

            if('quest010' == v.code){
                if(kk == obstruction){ 
                    console.log(kk+' == '+obstruction);
                    $("input[name=quest010][value=" + vv + "]").attr('checked', 'checked');
                }
            }
        });
    });
    loading(false);
}

function gettraffic(){
    loading();
    var latitude = $('#latitude').val();
    var longitude = $('#longitude').val();
    $.ajax({
        cache: false,
        type: 'GET',
        headers: { "Ip-Addr": IP, "token": "Bearer " + token },
        url: APIURL + 'data/gettraffic', 
        data:{latitude:latitude,longitude:longitude},
        dataType: 'json',
        success: function(data) {
            if(typeof data != 'object'){ data = $.parseJSON(data); } 
            resdata = data.data;
            console.log(resdata);
            var traffic = resdata[0][1];

            $('#traffic').val(traffic);
        }
    });
    loading(false);
}
