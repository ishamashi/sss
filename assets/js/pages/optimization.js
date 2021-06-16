var ooh_point   = [];

$( document ).ready(function() {
  initMap(-3.337954, 116.596456,'opt'); 
  filterArea();
  filterOwnership();

  $('#showRight').click(function(){
    $("#cbp-spmenu-s1").animate({ "left": "-=320px" }, "slow" );
  });
  $('#closeRight').click(function(){
    $("#cbp-spmenu-s1").animate({ "left": "+=320px" }, "slow" );
  });
 
  // getData();

  $('#province').on('change',function(){
    province = $(this).val();
    city = '';
    filterArea();
    filterPolygon();
    filterPoiSel();
    filterTypeSel();
    filterIndustrySel();
  });

  $('#city').on('change',function(){
    city = $(this).val();  
    filterPolygon();
    filterPoiSel();
    filterTypeSel();
    filterIndustrySel();
  });

	$('#fromDate').datepicker({
		orientation: "top auto",
		autoclose: true,
	}).on("changeDate", function(selected){
		var minDate = new Date(selected.date.valueOf());
		$('#toDate').datepicker('setStartDate', minDate);
	});

	$('#toDate').datepicker({
		orientation: "top auto",
		autoclose: true,
	}).on("changeDate", function(selected){
		var maxDate = new Date(selected.date.valueOf());
		$('#fromDate').datepicker('setEndDate', maxDate);
	});

  $('#search').on('click',function(){
    province = $("#province").val();
    city = $("#city").val();
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();
    ownership = $("#owner").val();
    getData();
    //filterPolygon();
    filterPoiSel();
    filterTypeSel();
    filterIndustrySel();
    type = localStorage.getItem('filter_type');
    industry = localStorage.getItem('filter_industry'); 
    oohstatus = localStorage.getItem('filter_status'); 
    storeFilterCache(province,city,type,industry,fromDate,toDate,oohstatus,ownership);
  });

  $('#genPam').click(function() {
    filterPolygon('genPam');

    var elem = $('#panel-score');
    if(elem.hasClass('hide')){
      elem.removeClass('hide');
    }else{
      //elem.addClass('hide');
    }
  })

  $('#searchOoh').click(function(e) {
    e.preventDefault();
    fillTable();
  })
  $('#clearOoh').click(function(e){
    e.preventDefault();
    $('#ooh_site').DataTable().clear().draw();
    $('#total_site').DataTable().clear().draw();
    clearOoh();
  });

  $('#searchIndustry').click(function(e) {
    e.preventDefault();
    fillTable();
  })
  $('#clearIndustry').click(function(e){
    e.preventDefault();
    $('#ooh_site').DataTable().clear().draw();
    $('#total_site').DataTable().clear().draw();
    clearOoh();
  });

  $('#searchPoiPoint').click(function(e) {
    e.preventDefault();
    fillPoi();
  });

  $('#searchZoning').click(function(e) {
    e.preventDefault();
    create_zoning();
  });

  $('#clearZoning').click(function(e) {
    e.preventDefault();
    clearHeatMap();
  });

  $('#clearPoiPoint').click(function(e){
    e.preventDefault();
    clearPoi();
  });

  $('#clearPamForm').click(function(e){
    e.preventDefault();    
    $('.parpoi:checkbox').removeAttr('checked');
    $('.poiselpam:checkbox').removeAttr('checked');
    $('.checker').find('span').removeClass('checked');
    $('.checkbox').prop('checked', false);
  });
  
  $('#searchByKec').click(function(e) {
    e.preventDefault();
    fillTable();
  })
  $('#clearByKec').click(function(e){
    e.preventDefault();
    $('#ooh_site').DataTable().clear().draw();
    $('#total_site').DataTable().clear().draw(); 
    $('.kecamatan:input:checkbox').removeAttr('checked');
    clearOoh();
  });

  $('.percent').bind('keyup mouseup',function(){ 
    var edited = $(this).attr('id');
    var editednext = ( (edited == 'wei_demo') ? 'wei_poi' : 'wei_demo'  ); 
    var valEdited = $('#'+edited).val();
    if(valEdited <= 100){
      var sisa = 100 - valEdited;
      $('#'+editednext).val(sisa);
    }else{
      swal({
          title: "Invalid Value for Percentage",
          text: "Maximum value is 100 percent",
          type: "error",
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Close"
      });
      $('#'+edited).val(100);
      $('#'+editednext).val(0);
    }
     
  });

  

  var updateOutput = function(e) {
    var list   = e.length ? e : $(e.target),
      output = list.data('output');
    if (window.JSON) {
      output.val(window.JSON.stringify(list.nestable('serialize')));//, null, 2));
    } else {
      output.val('JSON browser support required for this demo.');
    }
  };

  
  $('#nestable-poi').nestable('init'); 
  $('#nestable-type').nestable('init'); 
  $('#nestable-industry').nestable('init'); 
  $('#nestable-poipoint').nestable('init');  
  $('#nestable-zoning').nestable('init');  
  

  $('.printprop').bootstrapToggle({
    on: 'Yes',
    off: 'No',
    size:'mini',
    onstyle : 'primary',
    offstyle : 'default'
  });

  $('#scoreModal').on('shown.bs.modal', function (e) {
    var ooh_id = $(e.relatedTarget).data('ooh');
    var ooh_type = $(e.relatedTarget).data('type');
    getVasQuestion(ooh_id,ooh_type);
  });

 

});

function numberToMoney(number) {
  if(isNaN(number)) return number
  return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}

var StateChooseSite = false;

function activateChooseSite(){
  if ($("#choosesite").prop('checked') == true) { 
    $("#calculate").attr("disabled", false);

    dataTableNa = [];
    StateChooseSite = true;
    setTableContent1(dataTableNa);

    ReachSubDistrict = {};
    PriceSubDistrict = {};
    OOHSubDistrict = {};
    DataSubDistrict = [];

    
    setTableContent2(DataSubDistrict);

    var tot_price_year = 0;
    var tot_price_month =0 ;
    var tot_reach = 0;
    var cost_reach = 0;
    $('#res_tot_cost_year').html(numberToMoney(tot_price_year));
    $('#res_tot_reach').html(numberToMoney(tot_reach));
    $('#res_tot_cost_month').html(numberToMoney(tot_price_month));
    $('#res_tot_cost_reach').html(numberToMoney(cost_reach));
 

  } else {        
    $("#calculate").attr("disabled", true);
    StateChooseSite = false;
    ReachSubDistrict = {};
    PriceSubDistrict = {};
    OOHSubDistrict = {};
    clearBounceMap();
    fillTable();
  }
}


function calculateChooseSite(){
    //console.log('click');
    var tot_price_year = 0;
    var tot_price_month = 0 ;
    var tot_reach = 0;
    var cost_reach = 0; 
    $('#res_tot_cost_year').html(numberToMoney(tot_price_year));
    $('#res_tot_reach').html(numberToMoney(tot_reach));
    $('#res_tot_cost_month').html(numberToMoney(tot_price_month));
    $('#res_tot_cost_reach').html(numberToMoney(cost_reach));

    

    $.each(dataTableNa, function(k,dd) {
      var reach = parseInt(dd.traffic_ori);
      var price = parseInt(dd.price_ori);

      tot_price_year += price;
      tot_reach += reach;

     // console.log(dd.reach_ori);
    }); 

    DataSubDistrict = []; //kosongin dulu.....
    $.each(OOHSubDistrict, function(k,v){
      var totReach = 0;  
      var totPrice = 0;              
      
      //console.log(PriceSubDistrict[k]);
      $.each(ReachSubDistrict[k], function(kk,vv){
        totReach = totReach + parseInt(vv.traffic);
      }); 
      $.each(PriceSubDistrict[k], function(kkk,vvv){
        totPrice = totPrice + parseInt(vvv.price);
      }); 

      //console.log(k);
      //console.log(totPrice);

      var res = {
        "district" : k,
        "count_ooh" : v.length,
        "avg_reach" : format_money(roundTo((totReach / v.length),2)),
        "sum_price" : format_money(totPrice),
      }
      DataSubDistrict.push(res); 

    }); 

    setTableContent2(DataSubDistrict);
    
    tot_price_month =  roundTo((tot_price_year / 12),2);
    cost_reach =  roundTo((tot_price_month / (tot_reach * 30)),2) ;

    $('#res_tot_cost_year').html(numberToMoney(tot_price_year));
    $('#res_tot_reach').html(numberToMoney(tot_reach));
    $('#res_tot_cost_month').html(numberToMoney(tot_price_month));
    $('#res_tot_cost_reach').html(numberToMoney(cost_reach)); 
  }



function getDataOOH() {
  $.ajax({
    url: APIURL + "data/oohlib?province="+province+"&district="+city+"&from="+fromDate+"&to="+toDate+"&ownership="+ownership,
    headers: {
      "token": token_type + " " + token
    },
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    processData: false,
    cache: false,
    timeout: 600000,
    success:function(data, textStatus, jqXHR) {
      if(typeof data != 'object'){ data = $.parseJSON(data); }
      var datmap   = [];
      $.each(data.data, function(k,v){ 
          madata = {
            "ooh_id" : v.ooh_id, 
            "latitude" : v.latitude, 
            "longitude" : v.longitude, 
            "name" : v.address,
            "color" : '#226ee8',
            "type" : v.ooh_type,
            "status" : v.ooh_status,
          }
          datmap.push(madata);
      });
      create_ooh(datmap);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorHandler(jqXHR);
    }
  });
}


function getData() {
  $.ajax({
    url: APIURL + "data/oohlib?province="+province+"&district="+city+"&from="+fromDate+"&to="+toDate+"&ownership="+ownership,
    headers: {
      "token": token_type + " " + token
    },
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    processData: false,
    cache: false,
    timeout: 600000,
    success:function(data, textStatus, jqXHR) {
      if(typeof data != 'object'){ data = $.parseJSON(data); }
      setData(data) 
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorHandler(jqXHR);
    }
  });
} 

function changeZoning(){
	if ($("#zoning").prop('checked') == true) {
    //zoningDummy();
    create_zoning();
	} else {
    clearHeatMap();
	}
}

function zoningDummy(){
  var dummy = [
    {
      "lat" : '-6.189455',
      "lng" : '106.942908',
      "rad" : 3000,
    },
    {
      "lat" : '-6.252018',
      "lng" : '106.872418',
      "rad" : 4000,
    },
    {
      "lat" : '-6.189437',
      "lng" : '106.768339',
      "rad" : 3500,
    },
    {
      "lat" : '-6.1044143',
      "lng" : '106.6984309',
      "rad" : 4000,
    }
  ];

  $.each(dummy, function(k,v){
    createCicle(v.lat,v.lng,v.rad,false);
  });
  
}

function recommendation_dummy(){
	//var pointdrag =  '106.782682 , -6.266367 ';
  //$('#raddrag').val(500); 
  //fillTable(pointdrag); 
    
} 

function setData(data) { 

  var datane1 = [];
  var datane2 = [];
  var pointdata = [];
  var datatotalopt = [];
  var datatotal = [];
  var total_reach = total_population = total_ooh_id = total_price = 0;
 
  ooh_point = [];
  $.each(data.data, function(k,v){ 
      madata = {
        "ooh_id" : v.ooh_id, 
        "latitude" : v.latitude, 
        "longitude" : v.longitude, 
        "name" : v.address,
        "color" : '#226ee8',
        "type" : v.ooh_type,
        "status" : v.ooh_status,
      }
      ooh_point.push(madata);

      var ttraffic = ((typeof v.traffic == 'string') ? 0 : v.traffic );
      //var vscore = ((typeof v.vscore == 'string') ? 0 : v.vscore );
      var vscore = (( v.vscore == 'NA') ? 0 : v.vscore );
      //var vscore =   v.vscore ;
      
      var xrate_card = ((typeof v.rate_card == 'string') ? 0 : v.rate_card );
      perdata1 = {
        "ooh_id": v.ooh_id,
        "no_site": v.no_site,
        "district": v.district_name,
        "type": v.otyp_name,
        "size": v.panjang + " m X " + v.lebar + " m",
        "traffic": numberToMoney(ttraffic),
        "score": '<a href="#scoreModal" data-toggle="modal" data-type="'+v.ooh_type+'"  data-ooh="'+v.ooh_id+'" data-target="#scoreModal" >'+vscore+'</a>',
        "print": "<label class=\"switch switch-small\"><input class=\"printprop\" type=\"checkbox\" value=\""+ v.ooh_id +"\" /><span></span></label>"
      }
      datane1.push(perdata1);


      if(datatotal[v.district_name]==undefined){
        datatotal[v.district_name] = [];
      }

      if(datatotal[v.district_name]['rate_card']==undefined){
        datatotal[v.district_name]['rate_card'] =0;
      }
      datatotal[v.district_name]['rate_card'] += xrate_card;

      if(datatotal[v.district_name]['traffic']==undefined){
        datatotal[v.district_name]['traffic'] =0;
      }
      datatotal[v.district_name]['traffic'] += ttraffic;

      if(datatotal[v.district_name]['ooh']==undefined){
        datatotal[v.district_name]['ooh'] =0;
      }
      datatotal[v.district_name]['ooh'] += 1;

      if(datatotal['total']==undefined){
        datatotal['total'] = [];
      }
      if(datatotal['total']['rate_card']==undefined){
        datatotal['total']['rate_card'] =0;
      }
      if(datatotal['total']['traffic']==undefined){
        datatotal['total']['traffic'] =0;
      }
      if(datatotal['total']['ooh']==undefined){
        datatotal['total']['ooh'] =0;
      }
  
      datatotal['total']['traffic'] += ttraffic ;
      datatotal['total']['ooh'] += 1;
      datatotal['total']['rate_card'] += xrate_card; 


  }); 
 

}
 

function setTableContent1(datane) { 

  if(!$.fn.DataTable.fnIsDataTable( "#ooh_site" )) {
      // do nothing
  } else {
      $('#ooh_site').DataTable().destroy();
      //$('#ooh_site').empty();
      // $('#table-data').html('');
  }

  $('#ooh_site').DataTable({
    "fixedHeader": false,
    "destroy" : true,
    "searching": true,
    "bLengthChange": true,
    "retrieve": true,
    "info": true,
    "ordering": true,
    "dom": '<""lf>t<""ipB>',
    dom: 'Bfrtip',
    buttons: [
        'copy', 'csv', 'excel'
    ],
    "columns" : [
      {data: "id"},
      {data: "address"},
      {data: "type"}, 
      {data: "traffic"},
      {data: "score"},
      {data: "print"}
    ],
    "columnDefs": [
      // { className: "text-center", "targets": [ 0 ] },
      // { "visible": false, "targets": [ 0 ] },
    ],
    // "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
    //   $('td:eq(0)',nRow).html(iDisplayIndexFull +1);
    //   return nRow;
    // },
    "data" : datane
  });


  $('.printprop').bootstrapToggle({
    on: 'Yes',
    off: 'No',
    size:'mini',
    onstyle : 'primary',
    offstyle : 'default'
  });
  $(".printprop").change(function(){
    if ($('.printprop:checked').length  > 0) {
      //do something
      $('#printPropOoh').css({color:'#222'});
    }

    if ($('.printprop:checked').length  === 0) {
      //do something
      $('#printPropOoh').css({color:'#a2a2a2'});
    }
});
}

function setTableContent2(datane) { 
  if(!$.fn.DataTable.fnIsDataTable( "#total_site" )) {
      // do nothing
  } else {
      $('#total_site').DataTable().destroy();
      //$('#total_site').empty();
      //$('#total_site').DataTable().clear();
      // $('#table-data').html('');
  }
  $('#total_site').DataTable({
    "fixedHeader": false,
    "destroy" : true,
    "searching": true,
    "bLengthChange": true,
    "retrieve": true,
    "info": false,
    "ordering": true,
    "paginate": false,
    // "dom": '<""lf>t<""ipB>',
    "columns" : [
      {data: "district"},
      {data: "avg_reach"}, 
      {data: "count_ooh"},
      {data: "sum_price"}
    ],
    "columnDefs": [
      // { className: "text-center", "targets": [ 0 ] },
      // { "visible": false, "targets": [ 0 ] },
    ],
    // "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
    //   $('td:eq(0)',nRow).html(iDisplayIndexFull +1);
    //   return nRow;
    // },
    "data" : datane
  });
}


function fillPoi() {
  var arrscpoi = '';
  $.each($(".poipointsel:checkbox:checked"), function(){    
      arrscpoi += $(this).val()+',';
  });
  if((province || city ) && arrscpoi){
      arrscpoi = arrscpoi.slice(0, -1);
      $.ajax({
      cache: false,
      type: 'GET',
      data: {"province":province, "district":city, "arrscpoi":arrscpoi},
      headers: { "Ip-Addr": IP, "token": "Bearer " + token },
      url: APIURL + 'data/setpoi',
      dataType: 'json',
      success: function(data) {
          if(data.data){
              var datmap = [];
              $.each(data.data, function(k,v){
                  var strhtm ='<table class="table table-striped custab responsive">'+
                                  '<tbody>'+
                                      '<tr>'+
                                          '<td>Name</td>'+
                                          '<td>'+v.name+'</td>'+                             
                                      '</tr>'+
                                      '<tr>'+
                                          '<td>Address</td>'+
                                          '<td>'+v.address+'</td>'+                             
                                      '</tr>'+
                                      '<tr>'+
                                          '<td>Sub Class</td>'+
                                          '<td>'+v.subcls+'</td>'+                             
                                      '</tr>'+
                                      '<tr>'+
                                          '<td>Group Name</td>'+
                                          '<td>'+v.grpname+'</td>'+                             
                                      '</tr>'+
                                  '</tbody>'+    
                              '</table>'
                  madata = {
                              "latitude" : v.latitude, 
                              "longitude": v.longitude, 
                              "name"     : v.name, 
                              "contentString"     : strhtm, 
                              "icon"     : 'assets/images/iconpoi/'+ v.icon + '.png', 
                           };
                  datmap.push(madata);
              });
              create_poi(datmap);
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
  } else {
      swal({
              title: "Error",
              text: "Filter Area dan POI harus diisi",
              type: "error",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Close"
          });
  }
}


function create_zoning() {
  loading();
  var arrclpoi = '';
  $.each($(".zoningsel:checkbox:checked"), function(){    
    arrclpoi += $(this).val()+',';
  });
  if((province || city ) && arrclpoi){
    arrclpoi = arrclpoi.slice(0, -1);
      $.ajax({
      cache: false,
      type: 'GET',
      data: {"province":province, "district":city, "arrclpoi":arrclpoi},
      headers: { "Ip-Addr": IP, "token": "Bearer " + token },
      url: APIURL + 'data/setpoi',
      dataType: 'json',
      success: function(data) {
          if(data.data){
              var datmap = [];
              var points = [];
              $.each(data.data, function(k,v){ 
                  var polypoint = {
                              "x" : parseFloat(v.latitude), 
                              "y": parseFloat(v.longitude), 
                           };
                  datmap.push(polypoint);

                  var point = new google.maps.LatLng(parseFloat(v.latitude), parseFloat(v.longitude));
                  points.push(point);
              });
              //console.log(datmap);
              //create_poi(datmap);
              region = new Region(datmap);

              //console.log(region.centroid());

              createHeatMap(points);

              
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
  } else {
      swal({
              title: "Error",
              text: "Filter Area dan POI harus diisi",
              type: "error",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Close"
          });
  }

  loading(false);
}





function create_poi(jsonData){

  clearPoi();

  poimarker = []
   
  $.each(jsonData, function(i) {
    var poipoint  ; 
         
    poipoint   = new google.maps.Marker({
            position: new google.maps.LatLng(jsonData[i].latitude,jsonData[i].longitude),
            map: gmap,
            title: jsonData[i].name,
            icon: jsonData[i].icon,
          });
    poimarker.push(poipoint);
    
    // add listener
    google.maps.event.addListener(poipoint, 'click', function () {       
      poiinfow.setContent(jsonData[i].contentString);
      poiinfow.open(gmap, this);
    });
    
    // var checkbox = document.getElementById(jsonData[i].checkboxid); 
    //  google.maps.event.addDomListener(checkbox, "click", function(){       
    //  $.each(poimarker, function(y,v){
    //    v.setMap(null);
         
    //  })            
    // });  
  
  });
    
}
 

var dataMarker = {};
var dataTableNa = [];
var dataMarkerNa = [];

var ReachSubDistrict = {};
var PriceSubDistrict = {};
var OOHSubDistrict = {};
var DataSubDistrict = [];

function fillTable(pointdrag) {

  if(pointdrag === undefined) { pointdrag = null;}
  
  jalan     = $('#jalan').val();    
  industry    = $('#industry').val();    
  advertiser  = $('#advertiser').val(); 
  fromDate = $("#fromDate").val();
  toDate = $("#toDate").val();
  ownership = $("#owner").val();
  raddrag     = $('#raddrag').val();

  var typooh = '';
  $.each($(".typeooh:checkbox:checked"), function(){    
      typooh += $(this).val()+',';
  });

  var indusooh = '';
  $.each($(".indusooh:checkbox:checked"), function(){    
      indusooh += $(this).val()+',';
  });

  var advooh = '';
  $.each($(".advooh:checkbox:checked"), function(){    
      advooh += $(this).val()+',';
  });

  var kecamatan = '';
  /*$.each($(".kecamatan:checkbox:checked"), function(){    
    kecamatan += $(this).val()+',';
  }); */

  $("#pamlist").DataTable().rows().nodes().to$().find('input[type="checkbox"]:checked').each(function(){
    //console.log($(this).val());
    kecamatan += $(this).val()+',';
    });

  if(true){ 
      if(typooh) {
        typooh = typooh.slice(0, -1);
      }
      if(indusooh) {
          indusooh = indusooh.slice(0, -1);
      }
      if(advooh) {
          advooh = advooh.slice(0, -1);
      }
      if(kecamatan) {
        kecamatan = kecamatan.slice(0, -1);
      }

      //console.log('cek kecamatan');
      //console.log(kecamatan);
      //url: APIURL + "ooh_database?province="+province+"&city="+city+"&type="+type+"&industry="+industry+"&from="+fromDate+"&to="+toDate+"&ownership="+ownership+"&address="+jalan,
      $.ajax({
      cache: false,
      type: 'GET',
      data: {
              "province":province, "district":city,  "from":fromDate, "to":toDate, "ownership":ownership,
              "pointdrag":pointdrag, "raddrag":raddrag , 'type': typooh ,"sub_industry":indusooh, "advertiser":advooh , "kecamatan":kecamatan
          },
      headers: {
            "token": token_type + " " + token
          },
      url: APIURL + 'data/oohlib',
      dataType: 'json',
      success: function(data) {
          if(typeof data != 'object'){ data = $.parseJSON(data); }
          if(data) {
              var datmap = [];
              var datane1  = [];
              var colorooh = "#fff"; 

              ReachSubDistrict = {};
              PriceSubDistrict = {};
              OOHSubDistrict = {};
              DataSubDistrict = [];
              $.each(data.data, function(k,v){

                
                madata = {
                    "ooh_id"   : v.ooh_id, 
                    "latitude" : v.latitude, 
                    "longitude": v.longitude, 
                    "name"     : v.address, 
                    "color"    : colorooh,  
                    "type"     : v.ooh_type, 
                    "status" : v.ooh_status,
                };
                datmap.push(madata); 

                var ttraffic = ((typeof v.traffic == 'string') ? 0 : v.traffic );
                
                var vscore = (( v.vscore == 'NA') ? 0 : v.vscore );
                //var vscore =   v.vscore ;
                var rate_card =  v.pricelist_12bulan;
                xrate_card =  (rate_card === null) ? '0' : rate_card;
                perdata1 = {
                  "id": v.ooh_id,
                  "district": v.sub_district_name,
                  "address": v.address,
                  "type": v.otyp_name,
                  "size": v.panjang + " m X " + v.lebar +" m",
                  "traffic": numberToMoney(ttraffic),
                  "traffic_ori":  ttraffic,
                  "score":  '<a href="#scoreModal" data-toggle="modal"  data-type="'+v.ooh_type+'"  data-ooh="'+v.ooh_id+'"  data-target="#scoreModal" >'+vscore+'</a>',
                  "price":  (xrate_card === null) ? '0' : numberToMoney(xrate_card),
                  "price_ori":  (xrate_card === null) ? 0 : xrate_card,
                  "print": "<label class=\"switch switch-small\"><input class=\"printprop\" type=\"checkbox\" value=\""+ v.ooh_id +"\" /><span></span></label>"
                }
                datane1.push(perdata1);
                dataMarker[v.ooh_id] = perdata1;

                if (!ReachSubDistrict[v.sub_district_name]) {
                  ReachSubDistrict[v.sub_district_name] = [];
                }
                if (!PriceSubDistrict[v.sub_district_name]) {
                  PriceSubDistrict[v.sub_district_name] = [];
                }
                if (!OOHSubDistrict[v.sub_district_name]) {
                  OOHSubDistrict[v.sub_district_name] = [];
                }

                ReachSubDistrict[v.sub_district_name].push(ttraffic);
                PriceSubDistrict[v.sub_district_name].push(xrate_card);
                OOHSubDistrict[v.sub_district_name].push(v.ooh_id);

              });
              
              //console.log(ReachSubDistrict);
              //console.log(PriceSubDistrict);
              //console.log(OOHSubDistrict);

              var tot_price_year = 0;
              var tot_price_month =0 ;
              var tot_reach = 0;
              var cost_reach = 0;
              $('#res_tot_cost_year').html(numberToMoney(tot_price_year));
              $('#res_tot_reach').html(numberToMoney(tot_reach));
              $('#res_tot_cost_month').html(numberToMoney(tot_price_month));
              $('#res_tot_cost_reach').html(numberToMoney(cost_reach));


              $.each(OOHSubDistrict, function(k,v){
                var totReach = 0;  
                var totPrice = 0;              
                $.each(ReachSubDistrict[k], function(kk,vv){
                  totReach = totReach + parseInt(vv);
                }); 
                $.each(PriceSubDistrict[k], function(kkk,vvv){
                  totPrice = totPrice + parseInt(vvv);
                }); 

                var res = {
                  "district" : k,
                  "count_ooh" : v.length,
                  "avg_reach" : format_money(roundTo((totReach / v.length),2)),
                  "sum_price" : format_money(totPrice),
                }
                DataSubDistrict.push(res);


                tot_price_year += totPrice;
                tot_reach += totReach;

              }); 

              //console.log(DataSubDistrict);
              setTableContent2(DataSubDistrict);
              
              create_ooh(datmap,'yes','no');
              setTableContent1(datane1); //Load data to Datatable 
              
              tot_price_month =  roundTo((tot_price_year / 12),2);
              cost_reach =  roundTo((tot_price_month / (tot_reach * 30)),2) ;

               
              $('#res_tot_cost_year').html(numberToMoney(tot_price_year));
              $('#res_tot_reach').html(numberToMoney(tot_reach));
              $('#res_tot_cost_month').html(numberToMoney(tot_price_month));
              $('#res_tot_cost_reach').html(numberToMoney(cost_reach)); 



              if(pointdrag && raddrag){
                  var prd = pointdrag.split(',');
                  createCicle(prd[1], prd[0], Number(raddrag))
              } 
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
 


function detailOoh(ooh_id) {
  //console.log('OOH ID -> '+ooh_id);
  if(ooh_id) {
    $.ajax({
      url: APIURL + "ooh_detail?ooh_id="+ooh_id,
      headers: {
        "token": token_type + " " + token
      },
      type: "GET",
      contentType: "application/json",
      dataType: 'json',
      processData: false,
      cache: false,
      timeout: 600000,
      success:function(data, textStatus, jqXHR) {
        if(typeof data != 'object'){ data = $.parseJSON(data); }
        setDataDetail(data)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        errorHandler(jqXHR);
      }
    });
  }
} 


function setDataDetail(data) {
  var imgno = Math.floor(Math.random() * (4 - 1) ) + 1
  var html = '\
    <div class="row">\
      <div class="col-md-6">\
        <div class="row">\
          <div class="image-crop col-md-12">\
            <img src="assets/images/img'+imgno+'.jpeg" class="wheelzoom1" id="imageooh"  width="560" height="320">\
            <div class="row" style="margin: 5px 25px; overflow: auto;position: absolute;right: 0;top: 0px;z-index: 99;">\
                <input type="checkbox"  onchange="changePics('+imgno+');" id="switchpic" name="switchpic" data-on-text="Actual" data-off-text="Dummy">\
            </div>\
            </br>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-md-12">\
            &nbsp;\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-md-2">\
            <div class="form-group col-md-10">\
              <select class="js-states form-control" id="tahun" style="width: 75px;">\
                <option value="2019">2019</option>\
              </select>\
            </div>\
          </div>\
          <div class="col-md-10">\
            <div class="btn-group btn-group btgrp" id="btgrp-2019" style="display: inline-block;">\
              <button class="btn btnclk btn-default tabmonth" data-btnval="2019-1">Jan</button> \
              <button class="btn btnclk btn-warning tabmonth" data-btnval="2019-2">Feb</button> \
              <button class="btn tabmonth" disabled="">Mar</button> \
              <button class="btn tabmonth" disabled="">Apr</button> \
              <button class="btn tabmonth" disabled="">Mar</button> \
              <button class="btn tabmonth" disabled="">Mei</button> \
              <button class="btn tabmonth" disabled="">Jun</button> \
              <button class="btn tabmonth" disabled="">Jul</button> \
              <button class="btn tabmonth" disabled="">Agt</button> \
              <button class="btn tabmonth" disabled="">Spt</button>\
              <button class="btn tabmonth" disabled="">Nov</button> \
              <button class="btn tabmonth" disabled="">Des</button> \
            </div>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-md-2">\
            &nbsp;\
          </div>\
          <div class="col-md-10">\
            <div class="btn-group btn-group btgrp" id="visibility" style="display: inline-block;">\
              <button class="btn btnclk btn-warning tabvisibility" data-btnval="1">1</button> \
              <button class="btn tabvisibility"  disabled="" data-btnval="2">2</button> \
              <button class="btn tabvisibility" disabled="">3</button> \
              <button class="btn tabvisibility" disabled="">4</button> \
              <button class="btn tabvisibility" disabled="">5</button> \
              <button class="btn tabvisibility" disabled="">6</button> \
              <button class="btn tabvisibility" disabled="">7</button> \
              <button class="btn tabvisibility" disabled="">8</button> \
            </div>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-md-12">\
            <div class="stats-info">\
              <ul class="list-unstyled">\
                <li>Address<div class="text-success pull-right">'+data.data.detail.address+'</div></li>\
                <li>OOH Point<div class="text-success pull-right">'+data.data.detail.latitude+', '+data.data.detail.longitude+'</div></li>\
                <li>Size<div class="text-success pull-right">'+data.data.detail.long+' X '+data.data.detail.wide+'</div></li>\
                <li>Orientation<div class="text-success pull-right">'+data.data.detail.ooh_orientation+'</div></li>\
                <li>Lighting<div class="text-success pull-right">NA</div></li>\
                <li>View<div class="text-success pull-right">'+data.data.detail.view+'</div></li>\
                <li>Traffic<div class="text-success pull-right">NA</div></li>\
              </ul>\
            </div>\
          </div>\
        </div>\
      </div>\
      <div class="col-md-6">\
        <div class="row">\
          <div class="col-lg-6 col-md-6">\
            <div class="panel info-box panel-white">\
              <div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">\
                <div class="info-box-stats" style="float: none !important;">\
                  <span class="info-box-title text-center">Site Score</span>\
                  <p class="text-center"><span id="top_industry_count">85</span></p>\
                  <center><h4 id="top_industry">(Very Recommended)</h4></center>\
                </div>\
              </div>\
            </div>\
          </div>\
          <div class="col-lg-6 col-md-6">\
            <div class="panel info-box panel-white">\
              <div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">\
                <div class="info-box-stats" style="float: none !important;">\
                  <span class="info-box-title text-center">Average Daily Traffic</span>\
                  <p class="text-center"><span id="top_industry_count">2.5%</span></p>\
                  <center><h4 id="top_industry">(Very High)</h4></center>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-lg-6 col-md-6">\
            <div class="panel info-box panel-white">\
              <div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">\
                <div class="info-box-stats" style="float: none !important;">\
                  <span class="info-box-title text-center">Annual Occupancy Rate</span>\
                  <p class="text-center"><span id="top_industry_count">'+Math.ceil(data.data.detail.occupancy_rate * 100)+'%</span></p>\
                  <center><h4 id="top_industry">(Favorable)</h4></center>\
                </div>\
              </div>\
            </div>\
          </div>\
          <div class="col-lg-6 col-md-6">\
            <div class="panel info-box panel-white">\
              <div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">\
                <div class="info-box-stats" style="float: none !important;">\
                  <span class="info-box-title text-center">Price</span>\
                  <p class="text-center"><span id="top_industry_count">Rp. '+ format_money(data.data.detail.price) +'</span></p>\
                  <center><h4 id="top_industry">per year</h4></center>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-lg-12 col-md-12 text-right">\
            <span class="fa fa-question" data-toggle="tooltip" data-placement="top" title="Site score is calculated based on outdoor physical condition, e.g.: viewing distance, viewing speed, total surrounding OOH, etc."></span>\
          </div>\
        </div>\
        <div class="row">\
          <div class="col-lg-6 col-md-6">\
           <h3>Surrounding Area</h3>\
          </div>\
          <div class="col-lg-6 col-md-6">\
            <div class="form-group row">\
              <label class="col-sm-6 col-form-label" for="RadiusSelect" style="padding-top: 8px;">Filter Radius</label>\
              <div class="col-sm-6">\
                <select class="form-control form-control-sm" id="RadiusSelect">\
                  <option>100 m</option>\
                  <option>200 m</option>\
                  <option>300 m</option>\
                  <option>400 m</option>\
                  <option>500 m</option>\
                </select>\
              </div>\
            </div>\
          </div>\
          <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" style="margin-right: 15px;margin-left: 15px;">\
            <div class="panel panel-default">\
              <div class="panel-heading" role="tab" id="headingHospital" style="height: 40px;">\
                <h4 class="panel-title" style="margin-top: -7px;">\
                  <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseHospital" aria-expanded="false" aria-controls="collapseHospital">\
                    <span class="fa fa-medkit"  ></span> Hospital (7)\
                  </a>\
                </h4>\
              </div>\
              <div id="collapseHospital" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingHospital">\
                <div class="panel-body" style="padding: 10px;">\
                  <div class="row">\
                    <div class="col-md-12" style="padding-left: 0px; padding-right: 0px;">\
                      <ul style="font-size: 12px;">\
                        <li>Rumah Sakit Pusat Pertamina</li>\
                        <li>RS Khusus THT Ciranjang</li>\
                        <li>Rumah Sakit Asri</li>\
                        <li>Rumah Sakit Jakarta Medical Center (JMC)</li>\
                        <li>RS Gandaria</li>\
                        <li>Rumah Sakit Jakarta</li>\
                        <li>Rumah Sakit Metropolitan Medical Centre</li>\
                      </ul>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>\
            <div class="panel panel-default">\
              <div class="panel-heading" role="tab" id="headingRestaurant" style="height: 40px;">\
                <h4 class="panel-title" style="margin-top: -7px;">\
                  <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseRestaurant" aria-expanded="false" aria-controls="collapseRestaurant">\
                    <span class="fa fa-cutlery"></span> Restaurant (10)\
                  </a>\
                </h4>\
              </div>\
              <div id="collapseRestaurant" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingRestaurant">\
                <div class="panel-body" style="padding: 10px;">\
                  <div class="row">\
                    <div class="col-md-12" style="padding-left: 0px; padding-right: 0px;">\
                      <ul style="font-size: 12px;">\
                        <li>Okuzono Japanese Dining</li>\
                        <li>Three Buns Jakarta</li>\
                        <li>GIOI</li>\
                        <li>Montys Restaurant</li>\
                        <li>Sushi iro Senopati</li>\
                        <li>3 Wise Monkeys</li>\
                        <li>Emilie French Restaurant</li>\
                        <li>Meradelima</li>\
                        <li>Amuz Gourmet</li>\
                        <li>Hard Rock Cafe</li>\
                        <li><a href="#">Selengkapnya...</a></li>\
                      </ul>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>\
          </div>\
        </div>\
        <button type="button" class="btn btn-success right" onclick="printOoh('+data.data.detail.ooh_id+')" data-toggle="modal" data-target=".ooh-print-modal">Print</button>\
      </div>\
    </div>\
  ';
  $("#detail_ooh").html(html);
  $(".ooh-detail-modal").modal("show");
  
  wheelzoom(document.querySelectorAll('.wheelzoom1'));

  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('.dropdown-toggle').dropdown();
    })
}


function changePics(imgno){
  console.log($("#switchpic").prop('checked'))
  if ($("#switchpic").prop('checked') == true) { 
    $("#imageooh").attr("src", "assets/images/actual"+imgno+".jpg");
  } else {        
    $("#imageooh").attr("src", "assets/images/img"+imgno+".jpeg");
  }
}

function create_polygon(jsonData){
  //console.log(jsonData)

  clearAll();

  pathx = []
  
  var multibounds = new google.maps.LatLngBounds();
  var autofocus   = true;
  var noe     = 0 ;
  $.each(jsonData, function(i) {
    $.each(jsonData[i].geometris, function(y) {
      var path  = new Array();
      var bounds = new google.maps.LatLngBounds();
      var a;
       
      for(z = 0;z<jsonData[i].geometris[y].length;z++){
        var cord = jsonData[i].geometris[y][z];
        var myarr = cord.split(",");
        var myLatlng = new google.maps.LatLng(myarr[0],myarr[1]);            
        path.push(myLatlng);       
      }
      
      pathx[noe] = new google.maps.Polygon({
        paths: path,
        zindex: 10,
        strokeColor: jsonData[i].strokeColor,
        strokeOpacity: jsonData[i].strokeOpacity,
        strokeWeight: jsonData[i].strokeWeight,
        fillColor: jsonData[i].fillColor,
        fillOpacity: jsonData[i].fillOpacity        
      }); 
       
      pathx[noe].setMap(gmap);  

      for (a = 0; a < path.length; a++) {
          bounds.extend(path[a]);
          multibounds.extend(path[a]);
      }
          
      google.maps.event.addListener(pathx[noe], 'click', popupe1);
      function popupe1(){          
        infoWindow.setContent(jsonData[i].contentString);
        infoWindow.setPosition(new google.maps.LatLng(bounds.getCenter().lat(),bounds.getCenter().lng()));
        infoWindow.open(gmap);
      }

      noe++;      
    }); 

    if(typeof(jsonData[i].autofocus) != "undefined" && jsonData[i].autofocus !== null) {               
       //not auto focus
    } else{
      setautofocus();                
    }
  }); 
  
  // if(typeof(jsonData[0].checkboxid) != "undefined" && jsonData[0].checkboxid !== null) { 
  //  var keyword = jsonData[0].checkboxid;
  //  var checkbox = document.getElementById(keyword); 

  //  checkbox.addEventListener("change", function(){ 
  //    for (var ase = 0; ase < noe; ase++) {
  //      if(checkbox.checked){ 
  //        pathx[ase].setMap(gmap); 
  //      }else{
  //        pathx[ase].setMap(null);            
  //      }
  //    }
  //  });
  // }
     
  function setautofocus(){
    gmap.fitBounds(multibounds);
  }

  changeLayerMap();
}

function changeLayerMap(){

  $('#cont_layer').change(function() {
      // this will contain a reference to the checkbox
      if (this.checked) {
          // the checkbox is now checked
      $.each(pathx, function(y,v){
          v.setMap(gmap);
            
        });
      } else {
          // the checkbox is now no longer checked
      $.each(pathx, function(y,v){
          v.setMap(null);            
        });
      }
  });
  /*
  if(pathx){
    $.each(pathx, function(y,v){
      if($("#cont_layer").prop('checked') == true) {
        v.setMap(gmap);
      } else {
        v.setMap(null); 
      }      
    });
  }*/
}


function printOoh(ooh_id) {
  if(ooh_id) {
    $.ajax({
      url: APIURL + "ooh_detail?ooh_id="+ooh_id,
      headers: {
        "token": token_type + " " + token
      },
      type: "GET",
      contentType: "application/json",
      dataType: 'json',
      processData: false,
      cache: false,
      timeout: 600000,
      success:function(data, textStatus, jqXHR) {
        if(typeof data != 'object'){ data = $.parseJSON(data); }
        setPrintOOH(data)
      },
      error: function(jqXHR, textStatus, errorThrown) {
        errorHandler(jqXHR);
      }
    });
  }
}

function setPrintOOH(data) {
  
  var imgno = Math.floor(Math.random() * (4 - 1) ) + 1
  var html = '\
  <div id="DivIdToPrint">\
    <div class="row" style="height:45px;">\
      <div class="col-md-10" style="background-image: linear-gradient(to right, #572d86 , #f04e6a);height:64px;"><h2 style="color:white;">'+data.data.detail.address+'</h2></div>\
      <div class="col-md-2" style="background:white;height:64px;" ><img src="assets/images/Logo_prisma_Baru2.png" style="height:52px;" alt="" ></div>\
    </div>\
    <div class="row">\
      <div class="col-md-6 image-crop">\
        <img class="wheelzoom" src="assets/images/img'+imgno+'.jpeg" width="566" height="320" >\
        <div class="col-md-12 text-center" style="background: #bdbdbd ;  width:566px; padding-top: 4px; height:25px;"><h3 style="color:white;margin-top: 0px;">DISTANT VIEW</h3></div>\
      </div>\
      <div class="col-md-6 image-crop">\
        <img class="wheelzoom" src="assets/images/img'+imgno+'.jpeg" width="566" height="320">\
        <div class="col-md-12 text-center" style="background: #bdbdbd ; width:566px; padding-top: 4px; height:25px;"><h3 style="color:white;margin-top: 0px;">CLOSE VIEW</h3></div>\
      </div>\
    </div>\
    <div class="row">\
      <div class="col-md-3" >\
        <div class="row" style="padding:5px;">\
          <div class="col-md-12 box">\
            <h4>PRICE</h4>\
            <b style="font-size:21px;">Rp. '+ format_money(data.data.detail.price) +' per year</b>\
          </div>\
          <div class="col-md-12 box" style="min-height: 292px;">\
            <h4>SITE INFORMATION</h4>\
            <br>\
            <div class="row">\
              <div class="col-md-4">Address</div>\
              <div class="col-md-8">: '+data.data.detail.address+'</div>\
            </div>\
            <div class="row">\
              <div class="col-md-4">Coordinate</div>\
              <div class="col-md-8">: '+data.data.detail.latitude+','+data.data.detail.longitude+'</div>\
            </div>\
            <div class="row">\
              <div class="col-md-4">View</div>\
              <div class="col-md-8">: '+data.data.detail.view+'</div>\
            </div>\
            <div class="row">\
              <div class="col-md-4">Type</div>\
              <div class="col-md-8">: '+data.data.detail.ooh_format+'</div>\
            </div>\
            <div class="row">\
              <div class="col-md-4">Orientation</div>\
              <div class="col-md-8">: '+data.data.detail.ooh_orientation+'</div>\
            </div>\
            <div class="row">\
              <div class="col-md-4">Size</div>\
              <div class="col-md-8">: '+format_money(data.data.detail.long)+' m X '+format_money(data.data.detail.wide)+' m</div>\
            </div>\
            <div class="row">\
              <div class="col-md-4">Avg Traffic</div>\
              <div class="col-md-8">: '+format_money(data.data.detail.reach)+'</div>\
            </div>\
          </div>\
        </div>\
      </div>\
      <div class="col-md-3" >\
        <div class="row" style="padding:5px;">\
          <div class="col-md-12 box">\
            <h4>SITE DESCRIPTION</h4>\
            <p>This site located at high traffic area and surrounded by business district. This site also have good viewing angle with eye level within 300 meters.</p>\
            <p>\
            Point of interest within 300 meters radius:\
              <ul style="margin-left: -25px;">\
                <li>Private Office (4)</li>\
                <li>Bank (2)</li>\
                <li>Government Office (1)</li>\
              </ul>\
            </p>\
          </div>\
          <div class="col-md-12 box">\
            <h4>SITE SCORE AVAILABLE</h4>\
            <ul style="margin-left: -25px;">\
              <li class="col-md-6" style="padding-left: 0px;">Viewing distance </li>\
              <li class="col-md-6" style="padding-left: 0px;">Viewing speed</li>\
              <li class="col-md-6" style="padding-left: 0px;">Traffic</li>\
              <li class="col-md-6" style="padding-left: 0px;">Surrounding OOH</li>\
              <li class="col-md-6" style="padding-left: 0px;">OOH position</li>\
              <li class="col-md-6" style="padding-left: 0px;">Elevation</li>\
              <li class="col-md-6" style="padding-left: 0px;">Obstruction</li>\
            </ul>\
          </div>\
        </div>\
      </div>\
      <div class="col-md-2"  style="padding-top:5px;">\
        <div class="box-block">\
          <h2>SITE SCORE</h2>\
          <h1>'+data.data.detail.site_score+'</h1>\
          <span>(very recommended)</span>\
        </div>\
        <div>\
          <img src="assets/images/qrcode.png">\
        </div>\
      </div>\
      <div class="col-md-4" style="padding-top:5px;">\
        <div id="map" class="box" style="height:320px;"></div>\
      </div>\
    </div>\
  </div>\
  ';
  $("#print_ooh").html(html);
  $(".ooh-print-modal").modal("show");
  wheelzoom(document.querySelectorAll('.wheelzoom'));

  function lihatTitik() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: new google.maps.LatLng(data.data.detail.latitude,data.data.detail.longitude), 
    });

    var iconBase =	'assets/images/oohicon/';
    var icons = {
      Baliho: {
        icon: iconBase + 'baliho1.png'
      },
      BillBoard: {
        icon: iconBase + 'billboard1.png'
      },
      LED: {
        icon: iconBase + 'dooh1.png'
      },
      mini_billboard: {
        icon: iconBase + 'mini_billboard1.png'
      },
      street_sign: {
        icon: iconBase + 'street_sign1.png'
      }
      }; 

    var oohMarker = new google.maps.Marker({
      position: new google.maps.LatLng(data.data.detail.latitude,data.data.detail.longitude), 
      map: map,
      icon: icons[data.data.detail.ooh_format].icon,
    });
  }
  lihatTitik();

  

}



function autorecommendation() {
    
  var pamstat = 'genPam';
  var pointdrag = null;

  if(province || city ){

    Swal.fire({
      title: 'Input number of Top data',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Recomendation',
      showLoaderOnConfirm: true, 
    }).then((result) => {
      if (result.value) {
         //console.log(result.value);

         var showdata = result.value;
      
          //console.log('Showing data -> '+ showdata);


          loading(); 
          /*
          var gender = [1,2];
          var pampoisel = [1, 2	,3	, 4	, 5	, 6	, 7	, 8	, 9	, 10	,
            11	, 12	, 13	, 14	, 15	, 16	, 17	, 18	, 19	, 20	,
            21	, 22	, 23	, 24	, 25	, 26	, 27	, 28	, 29	, 30	,
            31	, 32	, 33	, 34	, 35	, 36	, 37	, 38	, 39	, 40	,
            41	, 42	, 43	, 44	, 45	, 46	, 47	, 48	, 49	, 50	,
            51	, 52	, 53	, 54	, 55	, 56	, 57	, 58	, 59	, 60	,
            61	, 62	, 63	, 64	, 65	, 66	, 67	, 68	, 69	, 70	,
            71	, 72	, 73	, 74	, 75	, 76	, 77	, 78	, 79	, 80	,
            81	, 82	, 83	, 84	, 85	, 86	, 87	, 88	, 89	, 90	,
            91	, 92	, 93	, 94	, 95	, 96	, 97	, 98	, 99	, 100	,
            101	, 102	, 103	, 104	,105	, 106	, 107	, 108	, 109	, 110	]; 
          var sec = ['upper1','upper2','middle1','middle2','lower'];
          var data = new FormData();
          */
          var form = $("#formpamcustom")[0];
          var data = new FormData(form);
          data.append("province", province==null?"":province);
          data.append("district", city==null?"":city); 
          data.append("pamstat", pamstat);
          data.append("fillcolor",'#ee6e73');
          data.append("bordercolor",'#9c27b0');
          /*
          data.append("wei_demo",50);
          data.append("wei_poi",50);
          data.append("age","17;45");
          data.append("gender[]",gender);
          data.append("sec[]",sec);
          data.append("pampoisel[]",pampoisel); 
          */

          var data_pamscore = [];
          var data_pam = [];
          var data_ooh = [];
          var data_ooh_scoring = [];

          //loading();
          $.ajax({
              cache: false,
              type: 'POST',
              data:data,
              headers: { "Ip-Addr": IP, "token": "Bearer " + token },
              enctype: 'multipart/form-data',
              url: APIURL + 'data/areapolygon',
              processData: false,
              contentType: false,
              cache: false,
              timeout: 600000,
              success: function(data) {
                  if(data.data.polygon){
                      create_polygon(data.data.polygon);
                  }
                  if(data.data.pam){
                      var dattab = [];
                      var obj = {};
                      cnt = '';
                      no = 1;
                      dat = data.data.pam ;
                      dat.sort(function(a, b) { return parseFloat(b.score) - parseFloat(a.score)});
                      $.each(dat, function(k1,v1){
                          perdata = {
                              "1": no,
                              "2": v1['name'],
                              "3": v1['level'],
                              "4": v1['score']
                            };
                          dattab.push(perdata);
                          data_pam.push(v1);
                          obj[v1['id']] = v1['score'];  
                          data_pamscore.push(obj)
                          no++;
                      });
                      //$('#pamlist').html(cnt);
                      //var colome = [{data: "2"},{data: "3"},{data: "4"}]
                      //setTableContent('#pamlist', colome, dattab);

                      //console.log(data_pam);
                      //console.log(data_pamscore);
                      
                      fromDate = $("#fromDate").val();
                      toDate = $("#toDate").val();
                      ownership = $("#owner").val();

                      if(ownership == null){
                        ownership = '';
                      }

    

                      //GET data OOH here
                      //+"&type="+type+"&status="+oohstatus+"&industry="+industry+"&from="+fromDate+"&to="+toDate+"&ownership="+ownership+"&address="+jalan
                      $.ajax({
                        url: APIURL + "data/oohlib?province="+province+"&district="+city+"&ownership="+ownership+"&from="+fromDate+"&to="+toDate,
                        headers: {
                          "token": token_type + " " + token
                        },
                        type: "GET",
                        contentType: "application/json",
                        dataType: 'json',
                        processData: false,
                        cache: false,
                        timeout: 600000,
                        success:function(data, textStatus, jqXHR) {
                          if(typeof data != 'object'){ data = $.parseJSON(data); }
                          //setData(data);
                          var datas = data.data;
                          var pointdata = [];
                          var vperpoint = [];
                          var vscrore = [];                          
                          var colorooh = "#fff"; 
                          var scoreoohlist = [];
                          $.each(datas, function(k,v){
                            var ratecard_12bulan = v.harga_12bulan + v.markup_12bulan + v.pricelist_12bulan;
                            scoreoohlist.push({"score":ratecard_12bulan});
                          });

                          var min = Math.min.apply(null,scoreoohlist.map(function(a){return a.score}));
                          var max = Math.max.apply(null,scoreoohlist.map(function(a){return a.score}));

                          $.each(datas, function(k,v){

                             // var ratecard_12bulan = v.harga_12bulan + v.markup_12bulan + v.pricelist_12bulan;
                              var ratecard_12bulan = v.pricelist_12bulan;
                              var scorearea = data_pamscore[0][v.sub_district];

                              if(scorearea==undefined){
                                scorearea = 0;
                              }

                              // Normalisasi Score
                              var score_ooh = ( 1 - (ratecard_12bulan - min) / (max - min) ) * 100;

                              vperpoint = {
                                "ooh_id" : v.ooh_id, 
                                "no_site" : v.no_site, 
                                "otyp_name" : v.otyp_name, 
                                "sub_district" : v.sub_district,
                                "sub_district_name" : v.sub_district_name,
                                "ratecard_1bulan" : v.harga_1bulan + v.markup_1bulan + v.pricelist_1bulan,
                                "ratecard_3bulan" : v.harga_3bulan + v.markup_3bulan + v.pricelist_3bulan,
                                "ratecard_6bulan" : v.harga_6bulan + v.markup_6bulan + v.pricelist_6bulan,
                                "ratecard_12bulan" : v.harga_12bulan + v.markup_12bulan + v.pricelist_12bulan,
                                "ratecard_nontitik" : v.harga_nontitik + v.markup_nontitik + v.pricelist_nontitik,
                                "ratecard_promo" : v.harga_promo + v.markup_promo + v.pricelist_promo,
                                "ratecard_repostbongkar" : v.harga_repostbongkar + v.markup_repostbongkar + v.pricelist_repostbongkar,
                                "ratecard_repostcetak" : v.harga_repostcetak + v.markup_repostcetak + v.pricelist_repostcetak,
                                "ratecard_repostering" : v.harga_repostering + v.markup_repostering + v.pricelist_repostering,
                                "status" : v.ooh_status,
                                "score_area": scorearea
                              }
                              data_ooh.push(vperpoint);
                              //var score_ooh = ((ratecard_12bulan == 0)? 1 : ( 1/ratecard_12bulan ) * 1000 ) ;
                              var ttraffic = ((typeof v.traffic == 'string') ? 0 : v.traffic );
                              var xrate_card = ratecard_12bulan ;
                              vscrore = {
                                "score_ooh" : score_ooh,
                                "score_area": scorearea,
                                "score_total" : scorearea + score_ooh,
                                "sub_district" : v.sub_district,
                                "sub_district_name" : v.sub_district_name, 
                                "no_site" : v.no_site,
                                "otyp_name" : v.otyp_name, 
                                //Map Data
                                "ooh_id"   : v.ooh_id, 
                                "latitude" : v.latitude, 
                                "longitude": v.longitude, 
                                "name"     : v.address, 
                                "color"    : colorooh,  
                                "type"     : v.ooh_type, 
                                "status" : v.ooh_status,
                                //Table
                                "id": v.ooh_id,
                                "district": v.sub_district_name,
                                "address": v.address,
                                "type_name": v.otyp_name,
                                "size": v.panjang + " m X " + v.lebar +" m",
                                "traffic": numberToMoney(ttraffic),
                                "traffic_ori":  ttraffic,
                                "price":  numberToMoney(xrate_card),
                                "price_ori":  xrate_card,
                                "print": "<label class=\"switch switch-small\"><input class=\"printprop\" type=\"checkbox\" value=\""+ v.ooh_id +"\" /><span></span></label>"
                              }

                              data_ooh_scoring.push(vscrore);

                              perpoint = {
                                "ooh_id" : v.ooh_id, 
                                "latitude" : v.latitude, 
                                "longitude" : v.longitude, 
                                "name" : v.address,
                                "color" : '#226ee8',
                                "type" : v.ooh_type,
                                "status" : v.ooh_status,
                              }
                              pointdata.push(perpoint);
                          });

                          ///create_ooh(pointdata, 'yes');
                          //SORTING DATA DESC
                          data_ooh_scoring = sortByKeyDesc(data_ooh_scoring,"score_total");
                          //SLICE TOP DATA
                          data_slice = data_ooh_scoring.slice(0,showdata);

                          //console.log(data_slice);

                          //SHOW DATA 
                          var datmap = [];
                          var datane1  = [];
                          ReachSubDistrict = {};
                          PriceSubDistrict = {};
                          OOHSubDistrict = {};
                          DataSubDistrict = [];
                          $.each(data_slice, function(k,v){
                            
                            madata = {
                              "ooh_id"   : v.ooh_id, 
                              "latitude" : v.latitude, 
                              "longitude": v.longitude, 
                              "name"     : v.name, 
                              "color"    : v.color,  
                              "type"     : v.type, 
                              "status" : v.status,
                            };
                            datmap.push(madata);  
                            perdata1 = {
                              "id": v.id,
                              "address": v.address,
                              "type": v.type_name,
                              "size": v.size,
                              "traffic": v.traffic,
                              "traffic_ori":  v.traffic_ori,
                              "price":  v.price,
                              "price_ori":  v.price_ori,
                              "print": v.print,
                            }
                            datane1.push(perdata1);
                            dataMarker[v.ooh_id] = perdata1;
            
                            if (!ReachSubDistrict[v.sub_district_name]) {
                              ReachSubDistrict[v.sub_district_name] = [];
                            }
                            if (!PriceSubDistrict[v.sub_district_name]) {
                              PriceSubDistrict[v.sub_district_name] = [];
                            }
                            if (!OOHSubDistrict[v.sub_district_name]) {
                              OOHSubDistrict[v.sub_district_name] = [];
                            }
            
                            ReachSubDistrict[v.sub_district_name].push(v.traffic);
                            PriceSubDistrict[v.sub_district_name].push(v.price);
                            OOHSubDistrict[v.sub_district_name].push(v.ooh_id);


                          });
                          
                          //console.log('datmap');
                          //console.log(datmap);

                          var tot_price_year = 0;
                          var tot_price_month =0 ;
                          var tot_reach = 0;
                          var cost_reach = 0;
                          $('#res_tot_cost_year').html(numberToMoney(tot_price_year));
                          $('#res_tot_reach').html(numberToMoney(tot_reach));
                          $('#res_tot_cost_month').html(numberToMoney(tot_price_month));
                          $('#res_tot_cost_reach').html(numberToMoney(cost_reach));


                          $.each(OOHSubDistrict, function(k,v){
                            var totReach = 0;  
                            var totPrice = 0;              
                            $.each(ReachSubDistrict[k], function(kk,vv){
                              totReach = totReach + parseInt(vv);
                            }); 
                            $.each(PriceSubDistrict[k], function(kkk,vvv){
                              totPrice = totPrice + parseInt(vvv);
                            }); 

                            var res = {
                              "district" : k,
                              "count_ooh" : v.length,
                              "avg_reach" : format_money(roundTo((totReach / v.length),2)),
                              "sum_price" : format_money(totPrice),
                            }
                            DataSubDistrict.push(res);


                            tot_price_year += totPrice;
                            tot_reach += totReach;

                          }); 

                          //console.log(DataSubDistrict);
                          setTableContent2(DataSubDistrict);
                          
                          create_ooh(datmap,'yes','no');
                          setTableContent1(datane1); //Load data to Datatable 
                          
                          tot_price_month =  roundTo((tot_price_year / 12),2);
                          cost_reach =  roundTo((tot_price_month / (tot_reach * 30)),2) ;

                          
                          $('#res_tot_cost_year').html(numberToMoney(tot_price_year));
                          $('#res_tot_reach').html(numberToMoney(tot_reach));
                          $('#res_tot_cost_month').html(numberToMoney(tot_price_month));
                          $('#res_tot_cost_reach').html(numberToMoney(cost_reach)); 



                          if(pointdrag && raddrag){
                              var prd = pointdrag.split(',');
                              createCicle(prd[1], prd[0], Number(raddrag))
                          } 



                          loading(false);
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                          errorHandler(jqXHR);
                          loading(false);
                        }
                      });
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
                  loading(false);
              }
          });
          //ENDS AJAX
      }
    }) 
  }else if (pamstat) {
      swal({
              title: "Error",
              text: "Filter Area harus diisi",
              type: "error",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Close"
          });
  }
}

function sortByKeyDesc(array, key) {
  return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}
function sortByKeyAsc(array, key) {
  return array.sort(function (a, b) {
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
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

function getVasQuestion(ooh_id,typeooh = 1){
  $('#detailScoring').html(''); 
  var dataquestion = [];
  if(typeooh == 1){
      dataquestion = dataquestion_billboard;
  }
  else {
      dataquestion = dataquestion_ooh;
  }
 
  //var ooh_id = $("#ooh_id").val();
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
              if( jQuery.isEmptyObject(dataanswer) ){
                $('#detailScoring').html('Scoring not yet done! Please fill scoring form first!');
              }else{
                var htmlform = '';
                $.each(dataquestion,function(k,v){
                    var questid = k + 1;
                    htmlform += '<div class="row" style="border-bottom:1px solid #d0d0d0;">'+
                    '<div class="col-md-6 h5"><b>'+
                        v.question+
                    '</b></div>';
                    
                    $.each(v.answer,function(kk,vv){
                        var vscore = kk + 1; 
                        if ( vscore == dataanswer[v.code] ) {       
                          htmlform +='<div class="col-md-6">'+vv+'</div>';  
                        }
                    });

                    htmlform += '</div>';
                });
  
                $('#detailScoring').html(htmlform);
              }              
          }
      }); 
  } else {
       swal({
              title: "Warning",
              text: "Empty OOH ID!",
              type: "warning",
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Close"
          }); 
  } 
}