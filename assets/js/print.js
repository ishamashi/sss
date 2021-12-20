var markerselectedprint = new Array();
var center_lat = '';
var center_lng = '';
var IMAGE_HOST = "http://mobile-prisma-api.com:7080/";

$(document).ready(function () {

  var $image = $(".image-crop > img");

  $image.cropper({
    aspectRatio: 16 / 9,
    autoCrop: false,
    dragCrop: false,
    preview: ".img-preview",
    modal: false,
    data: {
      x: 480,
      y: 60,
      width: 640,
      height: 360
    },
  });


  $('#printPropOoh').click(function (e) {
    e.preventDefault();
    printPropOoh();
  });

  document.getElementById("btnPrint").onclick = function () {
    // wheelzoom can be removed from an element by calling 'wheelzoom.destroy'
    // document.querySelector('.wheelzoom').dispatchEvent(new CustomEvent('wheelzoom.destroy'));
    printElement(document.getElementById("print-kita-donk"));
  }

  $('.ooh-print-modal').on('show.bs.modal', function () {


    //console.log("Print Dialog terbuka...");
    setTimeout(function () {
      // console.log("Editable run");
      $('.edit').click(function () {
        $(this).hide();
        $(this).prev().hide();
        $(this).next().show();
        $(this).next().select();
      });


      $('input.inputedit[type="text"],[type="date"]').blur(function () {
        if ($.trim(this.value) == '') {
          this.value = (this.defaultValue ? this.defaultValue : '');
        }
        else {
          $(this).prev().prev().html(numberToMoney(this.value));
        }

        $(this).hide();
        $(this).prev().show();
        $(this).prev().prev().show();
      });

      $('input.inputedit[type="text"],[type="date"]').keypress(function (event) {
        if (event.keyCode == '13') {
          if ($.trim(this.value) == '') {
            this.value = (this.defaultValue ? this.defaultValue : '');
          }
          else {
            $(this).prev().prev().html(numberToMoney(this.value));
          }

          $(this).hide();
          $(this).prev().show();
          $(this).prev().prev().show();
        }
      });

      $('.edit').click();
      $('input.inputedit[type="text"],[type="date"]').blur();
      $('.tooltiponprint').tooltip({ boundary: 'window' });


      var checkboxes = $('input[name="harga[]"]');
      checkboxes.on("click", function () {
        checkboxes.each(function () {
          var append_el = '';
          if ($(this).prop("checked") == true) {
            checkedID = $(this).attr("data-id");
            console.log(checkedID);
            $("#" + checkedID).removeClass('hide');
            $("#" + checkedID).removeClass('no-print');
          } else {
            console.log($(this).attr("data-id"));
            checkedID = $(this).attr("data-id");
            $("#" + checkedID).addClass('hide');
            $("#" + checkedID).addClass('no-print');
          }
        });
      });


    }, 3000);

  });
});


function printDiv() {

  var divToPrint = document.getElementById('DivIdToPrint');

  var newWin = window.open('', 'Print-Window');

  newWin.document.open();

  newWin.document.write('<html><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');

  newWin.document.close();

  setTimeout(function () { newWin.close(); }, 10);
  setTimeout(function () {
    wheelzoom(document.querySelectorAll('.imgtoprint'));
  }, 500);

}

async function printPropOoh() {

  var data = [];
  /*
  $('.printprop:checkbox:checked').each(function(i){
    data[i] = $(this).val();
  });
  */
  $("#ooh_site").DataTable().rows().nodes().to$().find('input[type="checkbox"]:checked').each(function (i) {
    //console.log($(this).val());
    data[i] = $(this).val();
  });
  console.log("VAL", data);
  if (data) {
    //console.log(data);
    markerselectedprint = [];
    var html = '';
    var count = data.length;
    var district_name = ($('#city option:selected').text() == 'All City') ? $('#province option:selected').text() : $('#city option:selected').text();

    var htmlprintout = `
      <div id="DIvIdToPrint" class="container-fluid div2print uppercase">
        <div class="row" style="height:45px;">
          <div class="col-md-9 prop-header">
            <h3 class="prop-header-title">OOH SITE OVERVIEW - ${district_name}</h3>
          </div>
          <div class="col-md-3 prop-header-logo">
            <img src="assets/images/Logo_Prisma_Baru2.png" style="height:52px;" alt="" >
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <div id="map_overview" class="peta"></div>
          </div>
        </div>
      </div>`;
    //if(count > 2){
    $('#print_ooh_header').html(htmlprintout); //Kalo kurang dari 3 error
    //}

    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var labelIndex = 0;
    var datahtml = "";
    $("#print_ooh").html('');
    await Promise.all(
      data.map(async (v) => {
        var dataOOHLib = await getDataOOHLib(v).catch(err => err);
        var labelsmarker = labels[labelIndex++ % labels.length];
        datahtml = setPrintOOHMulti(dataOOHLib, labelsmarker);
        $("#print_ooh").append(datahtml);
        html += datahtml;
      })
    ).then(() => {
      $(".ooh-print-modal").modal("show");
      console.log("markerselectedprint", markerselectedprint)
      if (markerselectedprint.length > 2) {
        region = new Region(markerselectedprint);
        var centroid = region.centroid();
      } else {
        var centroid = {
          'x': markerselectedprint[0].x,
          'y': markerselectedprint[0].y
        };
      }
      var zoomx = ($('#city option:selected').text() == 'All City') ? 10 : 12;
      overviewTitik(centroid, markerselectedprint, zoomx);
    });
  }
}

function getDataOOHLib(value) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: APIURL + "data/oohlib?ooh_id=" + value,
      headers: {
        "token": token_type + " " + token
      },
      type: "GET",
      contentType: "application/json",
      dataType: 'json',
      processData: false,
      cache: false,
      timeout: 600000,
      success: function (data, textStatus, jqXHR) {
        if (typeof data != 'object') { data = $.parseJSON(data); }
        resolve(data.data);
      },
      error: function (err) {
        reject(err);
      }
    });
  });
}

var mapprinter = [];
var oohMarker = [];

function lihatTitik(oohid, lat, lng, label) {
  mapprinter[oohid] = new google.maps.Map(document.getElementById('map_' + oohid), {
    zoom: 18,
    mapTypeControl: false,
    fullscreenControl: false,
    panControl: false,
    streetViewControl: false,
    zoomControl: false,
    center: new google.maps.LatLng(lat, lng),
  });

  oohMarker[oohid] = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    label: label,
    map: mapprinter[oohid]
  });
}

function overviewTitik(centroid, markers, zoomv = 11) {

  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var labelIndex = 0;
  var mapoverview = new google.maps.Map(document.getElementById('map_overview'), {
    zoom: zoomv,
    mapTypeControl: false,
    fullscreenControl: false,
    panControl: false,
    streetViewControl: false,
    zoomControl: false,
    center: new google.maps.LatLng(centroid.x, centroid.y),
  });

  $.each(markers, function (i, v) {
    var oohMarker = new google.maps.Marker({
      position: new google.maps.LatLng(v.x, v.y),
      label: labels[labelIndex++ % labels.length],
      map: mapoverview
    });
  });
}


function setPrintOOHMulti(data, labelsmarker) {
  var htmlprint = '';
  var district_name = '';
  $.each(data, function (k, v) {
    var harga12bulan = (v.pricelist_12bulan === null) ? '0' : v.pricelist_12bulan; // + v.markup_12bulan + v.harga_12bulan;
    var ratecard = numberToMoney(harga12bulan);

    var harga1bulan = (v.pricelist_1bulan === null) ? '0' : v.pricelist_1bulan;
    var ratecard_1 = numberToMoney(harga1bulan);
    var harga3bulan = (v.pricelist_3bulan === null) ? '0' : v.pricelist_3bulan;
    var ratecard_3 = numberToMoney(harga3bulan);
    var harga6bulan = (v.pricelist_6bulan === null) ? '0' : v.pricelist_6bulan;
    var ratecard_6 = numberToMoney(harga6bulan);



    var panjang = (v.panjang === null) ? '0' : numberToMoney(v.panjang);
    var lebar = (v.lebar === null) ? '0' : numberToMoney(v.lebar);
    var traffic = (v.traffic === null) ? '0' : numberToMoney(v.traffic);
    var idooh = v.ooh_id;

    var dkijakarta = '';
    if (v.province == 31) {
      dkijakarta = '<li>Not allowed to cigarette and alcohol</li>';
    }

    prismaphoto = ERP_HOST + 'assets/img/' + v.no_site + '.jpg';


    var image_night = 'noimage.jpg';
    var image_day = 'noimage.jpg';
    if (v.conthis.length > 0) {
      //console.log('masuk sini');
      $.each(v.conthis, function (kk, vv) {
        console.log("IMAGE", { image_day: vv.image_day, image_night: vv.image_night });
        //console.log(vv.image_day);
        if (vv.image_day !== null) image_day = vv.image_day;
        if (vv.image_night !== null) image_night = vv.image_night;

        // if ((vv.image_night !== '') && (vv.image_night !== 'noimage.jpg')) {
        //   image_night = vv.image_night;
        //   image_day = vv.image_day;
        //   return false;
        // }
      });
    }

    // var src_image = (v.ooh_origin === 'PRISMA') ? prismaphoto : 'assets/images/ooh-pictures/' + image_night;
    var src_image = (v.ooh_origin === 'PRISMA') ? image_day : image_night;

    var addinfo = '';
    if (v.ooh_type == 2) {
      addinfo += '<div class="row">' +
        '<div class="col-md-4">Slot</div>' +
        '<div class="col-md-8">: <label class="text_label" name="slot" id="slot" >Click The Pencil Icon to Edit Me</label>&nbsp;<span class="edit icon-pencil"></span>' +
        '<input type="text" value="Click The Pencil Icon to Edit Me" class="inputedit" /></div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-4">Spot</div>' +
        '<div class="col-md-8">: <label class="text_label" name="spot" id="spot" >Click The Pencil Icon to Edit Me</label>&nbsp;<span class="edit icon-pencil"></span>' +
        '<input type="text" value="Click The Pencil Icon to Edit Me" class="inputedit" /></div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-4">Operating Hour</div>' +
        '<div class="col-md-8">: <label class="text_label" name="operating_hour" id="operating_hour" >Click The Pencil Icon to Edit Me</label>&nbsp;<span class="edit icon-pencil"></span>' +
        '<input type="text" value="Click The Pencil Icon to Edit Me" class="inputedit" /></div>' +
        '</div>' +
        '';
      '';
    }

    // <img class="hide imgtoprint img-fluid" id="ori_image_distant_${idooh}" src="${src_image}" onError="this.onerror=null;this.src=\'assets/images/ooh-pictures/noimage.jpg\';"  width="100%" height="420px"></img>
    // <img class="hide imgtoprint img-fluid" id="ori_image_close_' + idooh + '" src="' + src_image + '" onError="this.onerror=null;this.src=\'assets/images/ooh-pictures/noimage.jpg\';"   width="100%" height="420px"></img>
    htmlprint +=
      `<div id="DIvIdToPrint2"  class="container-fluid div2print2 uppercase">
        <div class="row" style="height:45px;">
          <div class="col-md-9 prop-header"><h3 class="prop-header-title">${labelsmarker}.  ${v.address}</h3></div>
          <div class="col-md-3 prop-header-logo" ><img src="assets/images/Logo_Prisma_Baru2.png" style="height:52px;" alt="" ></div>
        </div>
        <div class="row">
          <div class="col-md-6 image-crop">
            <img class="img-fluid" id="image_distant_${idooh}" src="assets/images/ooh-pictures/${image_day}" onError="checkErrorImg('${image_day}', 'image_distant_${idooh}')"  width="100%" height="400px">
            <div class="col-md-12 text-center prop-image-space" style="height: auto;"><h3 class="prop-image-title" style="margin-bottom: 0 !important" >CLOSE VIEW</h3></div>
          </div>
          <div class="col-md-6 image-crop">
            <img class="img-fluid" id="image_close_${idooh}" src="assets/images/ooh-pictures/${image_night}"  onError="checkErrorImg('${image_night}', 'image_close_${idooh}')"  width="100%" height="400px">
            <div class="col-md-12 text-center prop-image-space" style="height: auto;"><h3 class="prop-image-title" style="margin-bottom: 0 !important" >DISTANCE VIEW</h3></div>
          </div>
        </div>
          <div class="row ">
            <div class="col-md-6" >
              <div class="col-md-12 box">
              <h4>PRICE</h4>
              <p><b style="font-size:16px;" id="vratecard_12_${idooh}" >Rp. <label class="text_label" style="font-size:16px;font-weight:700;" name="ratecard" id="ratecard" >${ratecard}</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="${ratecard}" class="inputedit" style="width:150px;" /> per <label class="text_label" style="font-size:16px;font-weight:700;" name="ratecardperiod" id="ratecardperiod" >year</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="year" style="width:60px;" class="inputedit" /></b></p>
              <p><b style="font-size:16px;" id="vratecard_1_${idooh}" class="hide no-print">Rp. <label class="text_label" style="font-size:16px;font-weight:700;" name="ratecard" id="ratecard_1" >${ratecard_1}</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="${ratecard_1}" class="inputedit" style="width:150px;" /> per <label class="text_label" style="font-size:16px;font-weight:700;" name="ratecardperiod" id="ratecardperiod_1" >year</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="1 month" style="width:60px;" class="inputedit" /></b></p>
              <p><b style="font-size:16px;" id="vratecard_3_${idooh}" class="hide no-print">Rp. <label class="text_label" style="font-size:16px;font-weight:700;" name="ratecard" id="ratecard_3" >${ratecard_3}</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="${ratecard_3}" class="inputedit" style="width:150px;" /> per <label class="text_label" style="font-size:16px;font-weight:700;" name="ratecardperiod" id="ratecardperiod_3" >year</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="3 months" style="width:60px;" class="inputedit" /></b></p>
              <p><b style="font-size:16px;" id="vratecard_6_${idooh}" class="hide no-print">Rp. <label class="text_label" style="font-size:16px;font-weight:700;" name="ratecard" id="ratecard_6" >${ratecard_6}</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="${ratecard_6}" class="inputedit" style="width:150px;" /> per <label class="text_label" style="font-size:16px;font-weight:700;" name="ratecardperiod" id="ratecardperiod_6" >year</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="6 months" style="width:60px;" class="inputedit" /></b></p>
              <div class="row"><a class="btn btn-primary pull-right no-print" data-toggle="collapse" href="#pricetag_${idooh}" role="button" aria-expanded="false" aria-controls="collapseExample">Price Info</a></div>
                <div class="collapse no-print" id="pricetag_${idooh}"></div>
              </div>
              <div class="col-md-12 box uppercase" style="min-height: 292px;">
                <h4>SITE INFORMATION</h4>
                <br>
                <div class="row">
                  <div class="col-md-4">Site Number</div>
                  <div class="col-md-8">: ${v.no_site}</div>
                </div>
                <div class="row">
                    <div class="col-md-4">Address</div>
                    <div class="col-md-8">: ${v.address}</div>
                </div>
                <div class="row">
                  <div class="col-md-4">Coordinate</div>
                  <div class="col-md-8">: ${v.latitude},${v.longitude}</div>
                </div>
                <div class="row">
                  <div class="col-md-4">View</div>
                  <div class="col-md-8">: ${v.view}</div>
                </div>
                <div class="row">
                  <div class="col-md-4">Type</div>
                  <div class="col-md-8">: ${v.otyp_name}</div>
                </div>
                <div class="row">
                  <div class="col-md-4">Size</div>
                  <div class="col-md-8">: ${panjang} m X ${lebar} m, ${v.orientasi}, ${v.lighting}</div>
                </div>
                <div class="row">
                  <div class="col-md-4">AVG Daily Traffic</div>
                  <div class="col-md-8">: ${traffic}</div>
                </div>
                <div class="row">
                  <div class="col-md-4">Surrounding POI</div>
                  <div class="col-md-8">: <label class="text_label" name="surpoitext" id="surpoitext" >-</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="-"  id="surroundarea_${idooh}" class="inputedit" /></div>
                </div>${addinfo}
                <div class="row">
                  <div class="col-md-12">Notes :<br>
                    <ul> 
                      <li>First come, first serve</li>${dkijakarta}
                      <li><label class="text_label" name="notes" id="notes" >Add note here..</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="Add note here.." class="inputedit" /></li>
                      <li><label class="text_label" name="notes2" id="notes2" >Add note here..</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="Add note here.." class="inputedit" /></li>
                      <li><label class="text_label" name="notes3" id="notes3" >Add note here..</label>&nbsp;<span class="edit icon-pencil"></span><input type="text" value="Add note here.." class="inputedit" /></li>
                    </ul>
                  </div>
              </div>
            </div>
          </div>
          <div class="col-md-6" >
            <div class="col-md-4">
              <div id="qrcode_${v.ooh_id}" class="qrcode" ></div>
              <p class="" >Scan this location</p>
          </div>
          <div class="col-md-8">
            <div id="map_${v.ooh_id}" class="box mapbox" ></div>
          </div>
        </div>
      </div>
    </div>`;
    //console.log('debug html -> '+htmlprint);
    district_name = v.district_name;
    oohmark = {
      'x': parseFloat(v.latitude),
      'y': parseFloat(v.longitude)
    };
    //console.log(oohmark);
    markerselectedprint.push(oohmark);
    //console.log(markerselectedprint);

    setTimeout(function () {
      //new QRCode(document.getElementById("qrcode_"+v.ooh_id), "http://maps.google.com/maps/?q="+v.latitude+","+v.longitude); 

      var qrcode = new QRCode("qrcode_" + v.ooh_id, {
        text: "http://maps.google.com/maps/?q=" + v.latitude + "," + v.longitude,
        width: 145,
        height: 145,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      lihatTitik(v.ooh_id, v.latitude, v.longitude, labelsmarker);
      surrounding_poi_onprint(v.ooh_id, v.sub_district, v.longitude, v.latitude, 100);
      pricelist(v.ooh_id, v.no_site);



    }, 1000);

  });

  return htmlprint;


}

function surrounding_poi_onprint(oohid, areaid, pointx, pointy, radius) {
  $("#surroundarea_" + oohid).val('');
  var subclass = '39,80,81,9,38,47,24,17,6,1,87,79,10,51,7,2,11';
  $.ajax({
    url: APIURL + "data/surroundpoi?lng=" + pointx + "&lat=" + pointy + "&areaid=" + areaid + "&radius=" + radius + "&subclass=" + subclass,
    headers: {
      "token": token_type + " " + token
    },
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    processData: false,
    cache: false,
    timeout: 600000,
    success: function (data, textStatus, jqXHR) {
      if (typeof data != 'object') { data = $.parseJSON(data); }
      var html = '';
      $.each(data.data, function (k, v) {
        html += ' ' + v[1] + ' (' + v[3] + '),';
      });

      if (html == '') {
        html = '-';
      }

      $("#surroundarea_" + oohid).val(html);


    },
    error: function (jqXHR, textStatus, errorThrown) {
      errorHandler(jqXHR);
    }
  });
}

function pricelist(oohid, oohsite) {
  $("#pricetag_" + oohid).html('');
  $.ajax({
    url: APIURL + "data/pricelist?no_titik=" + oohsite,
    headers: {
      "token": token_type + " " + token
    },
    type: "GET",
    contentType: "application/json",
    dataType: 'json',
    processData: false,
    cache: false,
    timeout: 600000,
    success: function (data, textStatus, jqXHR) {
      if (typeof data != 'object') { data = $.parseJSON(data); }
      //var html = '<span class="fa fa-question tooltiponprint" data-html="true" data-toggle="tooltip" data-placement="top" title="';
      var html = '<div class="card card-body no-print">';
      var ratecard_nontitik = 0;
      var ratecard_1 = 0;
      var ratecard_3 = 0;
      var ratecard_6 = 0;
      var ratecard_12 = 0;
      var ratecard_repostering = 0;
      var ratecard_repostbongkar = 0;
      var ratecard_repostcetak = 0;
      var ratecard_promo = 0;
      $.each(data.data, function (k, v) {
        //html += ' '+v[1]+' ('+v[3]+'),'; 
        ratecard_nontitik = v[3]; //v[1] + v[2] + v[3];
        ratecard_1 = v[6]; //v[4] + v[5] + v[6];
        ratecard_3 = v[9]; //v[7] + v[8] + v[9];
        ratecard_6 = v[12]; //v[10] + v[11] + v[12];
        ratecard_12 = v[15]; //v[13] + v[14] + v[15];
        ratecard_repostering = v[18];//v[16] + v[17] + v[18];
        ratecard_repostbongkar = v[21];//v[19] + v[20] + v[21];
        ratecard_repostcetak = v[24]; //v[22] + v[23] + v[24];
        ratecard_promo = v[27]; //v[25] + v[26] + v[27];

        //html += '<div class="row"><div class="col-md-4">Non Titik</div><div class="col-md-8">Rp '+ numberToMoney(ratecard_nontitik) +'</div></div>'
        html += '<div class="row"><div class="col-md-4">Ratecard 1 bulan</div><div class="col-md-8">Rp ' + numberToMoney(ratecard_1) + ' <input type="checkbox" name="harga[]" id="harga_1_' + oohid + '" value="' + ratecard_1 + '" data-id="vratecard_1_' + oohid + '" ></div></div>'
        html += '<div class="row"><div class="col-md-4">Ratecard 3 bulan</div><div class="col-md-8">Rp ' + numberToMoney(ratecard_3) + ' <input type="checkbox" name="harga[]" id="harga_3_' + oohid + '" value="' + ratecard_3 + '" data-id="vratecard_3_' + oohid + '"></div></div>'
        html += '<div class="row"><div class="col-md-4">Ratecard 6 bulan</div><div class="col-md-8">Rp ' + numberToMoney(ratecard_6) + ' <input type="checkbox" name="harga[]" id="harga_6_' + oohid + '" value="' + ratecard_6 + '" data-id="vratecard_6_' + oohid + '"></div></div>'
        html += '<div class="row"><div class="col-md-4">Ratecard 12 bulan</div><div class="col-md-8">Rp ' + numberToMoney(ratecard_12) + ' <input type="checkbox" name="harga[]" id="harga_12_' + oohid + '" value="' + ratecard_12 + '" data-id="vratecard_12_' + oohid + '"></div></div>'
        //html += '<div class="row"><div class="col-md-4">Price Repostering</div><div class="col-md-8">Rp '+ numberToMoney(ratecard_repostering) +'</div></div>'
        //html += '<div class="row"><div class="col-md-4">Price Repost Bongkar</div><div class="col-md-8">Rp '+ numberToMoney(ratecard_repostbongkar) +'</div></div>'
        //html += '<div class="row"><div class="col-md-4">Price Repost Cetak</div><div class="col-md-8">Rp '+ numberToMoney(ratecard_repostcetak) +'</div></div>'
        //html += '<div class="row"><div class="col-md-4">Price Promo</div><div class="col-md-8">Rp '+ numberToMoney(ratecard_promo) +'</div></div>' 

        /*
        html += 'Non Titik :  Rp '+ numberToMoney(ratecard_nontitik) +'<br>'
        html += 'Ratecard 1 bulan :  Rp '+ numberToMoney(ratecard_1) +'<br>'
        html += 'Ratecard 3 bulan :  Rp '+ numberToMoney(ratecard_3) +'<br>'
        html += 'Ratecard 6 bulan :  Rp '+ numberToMoney(ratecard_6) +'<br>'
        html += 'Ratecard 12 bulan :  Rp '+ numberToMoney(ratecard_12) +'<br>'
        html += 'Price Repostering :  Rp '+ numberToMoney(ratecard_repostering) +'<br>'
        html += 'Price Repost Bongkar :  Rp '+ numberToMoney(ratecard_repostbongkar) +'<br>'
        html += 'Price Repost Cetak :  Rp '+ numberToMoney(ratecard_repostcetak) +'<br>'
        html += 'Price Promo :  Rp '+ numberToMoney(ratecard_promo) +'<br>'*/
      });
      //html += '"></span>';
      html += '</div>'
      $("#pricetag_" + oohid).html(html);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      errorHandler(jqXHR);
    }
  });
}

function checkErrorImg(value, id, event = null) {
  // console.log("CHECK IMAGE", { value, id, event });
  // if (typeof $(`#${id}`).attr('fin') !== 'undefined') {
  //   $(`#${id}`).attr('src', 'assets/images/ooh-pictures/noimage.jpg');
  //   return;
  // }
  // if (value != null) {
  //   $(`#${id}`).attr('src', IMAGE_HOST + 'image/optimize/' + value).attr('fin', '1');
  // } else {
  //   $(`#${id}`).attr('src', 'assets/images/ooh-pictures/noimage.jpg');
  // }

  var srcimage2 = 'assets/images/ooh-pictures/' + value;

	var img = new Image();
	img.src = srcimage2;
	console.log('trying read image from server local', {
		url: srcimage2
	});

	img.onload = function () {
		console.log('image from server local found', {
			url: srcimage2
		});
		$(`#${id}`).attr('src', img.src);
	}

	img.onerror = function () {
		srcimage2 = IMAGE_HOST + 'image/' + value;
		console.log('trying read image from server mobile', {
			url: srcimage2
		});
		img = new Image();
		img.src = srcimage2;

		img.onload = function () {
			console.log('image from server mobile found', {
				url: img.src
			});
			$(`#${id}`).attr('src', img.src);
		}

		img.onerror = function () {
			srcimage2 = `http://192.168.20.120:5000/image/${value}`;
			console.log('trying read image from server dev 120', {
				url: srcimage2
			});
			img = new Image();
			img.src = srcimage2;

			img.onload = function() {
				console.log('image from server dev 120 found', {
					url: img.src
				});
				$(`#${id}`).attr('src', img.src);
			}

			img.onerror = function() {
				srcimage2 = 'assets/images/ooh-pictures/noimage.jpg';
				img = new Image();
				img.src = srcimage2;
				console.log('image from server dev 120 not found', {
					url: srcimage2
				});
				$(`#${id}`).attr('src', img.src);
			}
		}
	}
}

function setPrintOOH(data, contentid, theID) {
  var htmlprint = '';
  var district_name = '';

  var tanggalcontent = theID.replace('btvidit-', '');

  var tglsplit = tanggalcontent.split("-");

  var d = new Date();

  var month = tglsplit[1];
  var day = tglsplit[2];

  var tanggal_content = tglsplit[0] + '-' +
    (('' + month).length < 2 ? '0' : '') + month + '-' +
    (('' + day).length < 2 ? '0' : '') + day;

  //console.log(today);
  console.log(tanggal_content);


  $.each(data, function (k, v) {
    var panjang = (v.panjang === null) ? '0' : numberToMoney(v.panjang);
    var lebar = (v.lebar === null) ? '0' : numberToMoney(v.lebar);
    var traffic = (v.traffic === null) ? '0' : numberToMoney(v.traffic);
    var idooh = v.ooh_id;


    var image_night = 'noimage.jpg';
    var image_day = 'noimage.jpg';
    var campaign = '-';
    var industry = '-';
    var sub_industry = '-';
    var advertiser = '-';
    var link_video = '-';
    if (v.conthis.length > 0) {
      $.each(v.conthis, function (kk, vv) {
        if (vv.content_id == contentid) {
          if (vv.image_day !== null) image_day = vv.image_day;

          if (vv.image_night !== null) image_night = vv.image_night;

          campaign = (vv.campaign_title === null) ? "-" : vv.campaign_title;
          industry = (vv.ind_name === null) ? "-" : vv.ind_name;
          sub_industry = (vv.subind_name === null) ? "-" : vv.subind_name;
          link_video = (vv.link_video === null) ? "-" : vv.link_video;
          advertiser = (vv.comp_name === null) ? "-" : vv.comp_name;
          return false;
        }
      });
    }
    // '<img class="wheelzoom img-fluid" id="image_distant_' + idooh + '" src="assets/images/ooh-pictures/' + image_night + '" onError="this.onerror=null;this.src=\'assets/images/ooh-pictures/noimage.jpg\';"  width="100%" height="256px">' +
    // '<img class="hide imgtoprint img-fluid" id="ori_image_distant_' + idooh + '" src="assets/images/ooh-pictures/' + image_night + '" onError="this.onerror=null;this.src=\'assets/images/ooh-pictures/noimage.jpg\';" width="100%" height="420px"  >' +
    // '<div class="col-md-12 text-center prop-image-space"><h3 class="prop-image-title" >DAY VIEW</h3></div>' +
    // '</div>' +
    // '<div class="col-md-6 image-crop">' +
    // '<img class="wheelzoom img-fluid" id="image_close_' + idooh + '" src="assets/images/ooh-pictures/' + image_day + '"  onError="this.onerror=null;this.src=\'assets/images/ooh-pictures/noimage.jpg\';"  width="100%" height="256px">' +
    // '<img class="hide imgtoprint img-fluid" id="ori_image_close_' + idooh + '" src="assets/images/ooh-pictures/' + image_day + '" onError="this.onerror=null;this.src=\'assets/images/ooh-pictures/noimage.jpg\';"   width="100%" height="420px">' +
    // '<div class="col-md-12 text-center prop-image-space"><h3 class="prop-image-title" >NIGHT VIEW</h3></div>' +
    // this.onerror=null;this.src=\'assets/images/ooh-pictures/noimage.jpg\'
    htmlprint += `
      <div id="DIvIdToPrint3"  class="container-fluid div2print3 uppercase">
        <div class="row" style="height:45px;">
          <div class="col-md-9 prop-header"><h3 class="prop-header-title">${v.address}</h3></div>
            <div class="col-md-3 prop-header-logo" >
              <img src="assets/images/Logo_Prisma_Baru2.png" style="height:52px;" alt="" >
            </div>
          </div>
          <div class="row" style="margin-top:25px;">
            <div class="col-md-6 image-crop">
              <img class="img-fluid" id="image_distant_${idooh}" src="assets/images/ooh-pictures/${image_day}" onError="checkErrorImg('${image_day}', 'image_distant_${idooh}')"  width="100%" height="400px">
                <div style="height: auto;" class="col-md-12 text-center prop-image-space">
                  <h3 class="prop-image-title" style="margin-bottom: 0">DAY VIEW</h3>
                </div>
            </div>
            <div class="col-md-6 image-crop">
              <img class="img-fluid" id="image_close_${idooh}" src="assets/images/ooh-pictures/${image_night}"  onError="checkErrorImg('${image_night}', 'image_close_${idooh}')"  width="100%" height="400px">
                <div style="height: auto;" class="col-md-12 text-center prop-image-space">
                  <h3 class="prop-image-title" style="margin-bottom: 0">NIGHT VIEW</h3>
                </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6" >
              <div class="col-md-12 box uppercase" style="min-height: 292px;">
              <h4>SITE INFORMATION</h4>
              <br>
              <div class="row">
                <div class="col-md-4">Site Number</div>
                  <div class="col-md-8">: ${v.no_site}</div>
                </div>
                <div class="row">
                  <div class="col-md-4">Address</div>
                    <div class="col-md-8">: ${v.address}</div>
                  </div>
                <div class="row">
                  <div class="col-md-4">Coordinate</div>
                    <div class="col-md-8">: ${v.latitude},${v.longitude}</div>
                  </div>
                <div class="row">
                  <div class="col-md-4">View</div>
                    <div class="col-md-8">:  ${v.view}</div>
                  </div>
                  <div class="row">
                  <div class="col-md-4">Type</div>
                      <div class="col-md-8">: ${v.otyp_name}</div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">Size</div>
                    <div class="col-md-8">: ${panjang}m X ${lebar}m, ${v.orientasi}, ${v.lighting}</div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">AVG Daily Traffic</div>
                    <div class="col-md-8">: ${traffic}</div>
                  </div>
                </div>
              </div>
            <div class="col-md-6" >
              <div class="col-md-12 box uppercase" style="min-height: 292px;">
              <h4>SITE CONTENT</h4>
              <br>
              <div class="row">
                <div class="col-md-4">Industry</div>
                <div class="col-md-8">: ${industry}</div>
              </div>
              <div class="row">
                <div class="col-md-4">Sub Industry</div>
                <div class="col-md-8">: ${sub_industry}</div>
              </div>
              <div class="row">
                <div class="col-md-4">Advertiser</div>
                <div class="col-md-8">: ${advertiser}</div>
              </div>
              <div class="row">
                <div class="col-md-4">Campaign</div>
                <div class="col-md-8">: ${campaign}</div>
              </div>
              <div class="row">
                <div class="col-md-4">Link Video</div>
                <div class="col-md-8">: ${link_video}</div>
              </div>
              <div class="row">
                <div class="col-md-4">Change Cover Date</div>
                <div class="col-md-8">: <label class="text_label" name="date_cover" id="date_cover" >${tanggal_content}</label>&nbsp;<span class="edit icon-pencil"></span> <input type="date" name="date_cover" id="date_cover" value="${tanggal_content}"  class="inputedit" > </div>
              </div>
          </div>
        </div>
      </div>
    </div>`;
    //console.log('debug html -> '+htmlprint);
    district_name = v.district_name;
    oohmark = {
      'x': parseFloat(v.latitude),
      'y': parseFloat(v.longitude)
    };
    //console.log(oohmark);
    markerselectedprint.push(oohmark);
    //console.log(markerselectedprint); 

  });

  return htmlprint;


}