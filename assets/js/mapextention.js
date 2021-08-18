var pathx = new Array();
var poimarker = new Array();
var infoWindow = new google.maps.InfoWindow();
var oohmarker  = new Array();

var driminfow  = new google.maps.InfoWindow();
var gmap = new google.maps.Map(document.getElementById('canvasMap'));
var trafficLayer = new google.maps.TrafficLayer();

var circlearr  = new Array();
var oohmarker  = new Array();
var hearmaparr = new Array();
var oohbouncearr = new Array();
var drag_area, actual, mark, drmarker, heatmap;
var overview, zIndex = 0;

/*jslint sub: true, maxerr: 50, indent: 4, browser: true */
/*global console */
 

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Region(points) {
	this.points = points || [];
	this.length = points.length;
}

Region.prototype.area = function () {
	var area = 0,
		i,
		j,
		point1,
		point2;

	for (i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
		point1 = this.points[i];
		point2 = this.points[j];
		area += point1.x * point2.y;
		area -= point1.y * point2.x;
	}
	area /= 2;

	return area;
};

Region.prototype.centroid = function () {
	var x = 0,
		y = 0,
		i,
		j,
		f,
		point1,
		point2;

	for (i = 0, j = this.length - 1; i < this.length; j = i, i += 1) {
		point1 = this.points[i];
		point2 = this.points[j];
		f = point1.x * point2.y - point2.x * point1.y;
		x += (point1.x + point2.x) * f;
		y += (point1.y + point2.y) * f;
	}

	f = this.area() * 6;

	return new Point(x / f, y / f);
};



     



function helper() {
  this.setMap(gmap);
  this.draw = function() {};
}
helper.prototype = new google.maps.OverlayView();

function fillMarker(icon) {
  var div = document.createElement("div");
  div.style.backgroundImage = "url(" + icon + ")";
  div.style.left = "0px";
  div.id = "m1";
  div.className = "drag";
  div.onmousedown = div.ontouchstart = initDrag;
  drag_area.replaceChild(div, mark);
  mark = null;
}

function createDraggedMarker(latlng, icone) {

	cleardrmarker();

	var icon = {
		url: icone,
		size: new google.maps.Size(36, 36),
		anchor: new google.maps.Point(15, 36)
	};

	drmarker = new google.maps.Marker({
				position: latlng,
				map: gmap,
				clickable: true,
				draggable: true,
				crossOnDrag: false,
				optimized: false,
				icon: icon,
				zIndex: zIndex
	});

	var lat = drmarker.getPosition().lat();
	var lng = drmarker.getPosition().lng();

	var contentStr = '<div class="col-md-12"> '+           
	                        '<table class="table table-striped">'+
	                         '   <tr><td class="text-left"><strong>Posisi</strong></td><td class="text-right">'+ lat.toFixed(6) + "," + lng.toFixed(6)+'</td></tr>'+
	                         '   <tr><td class="text-left"><strong>Radius(m)</strong><br>max 2000</td><td class="text-right"><input style="border: 0.5px solid;" type="number" onkeyup="setrad(this.value)" /></td></tr>'+
	                         '   <tr><td class="text-right"><button class="btn btn-info btn-block" onclick="cleardrmarker()" type="button" >Clear</button></td>'+
	                         '		 <td class="text-right"><button class="btn btn-info btn-block" onclick="setFillDrag(\''+lng.toFixed(6) + "," + lat.toFixed(6)+'\')" type="button" >Search</button></td></tr>'+
	                        '</table>'+ 
	                '</div>';

	driminfow.setContent(contentStr);
	driminfow.open(gmap, drmarker);


	google.maps.event.addListener(drmarker, "click", function() {
		driminfow.setContent(contentStr);
		driminfow.open(gmap, this);    
	});

	google.maps.event.addListener(drmarker, "dragend", function() {
		createDraggedMarker(this.getPosition(), icone);  
	});
}

function cleardrmarker(){
	if(drmarker){
		drmarker.setMap(null);
	}
	clearcircle();
}

function clearcircle(){
	if(circlearr){
		$.each(circlearr, function(y,v){
				v.setMap(null);				 
			})	
	}
}

function setrad(vale){
	document.getElementById('raddrag').value = vale ;

}

function initDrag(evt) {
  function getPt(evt) {
    var pt = {};
    if (evt && evt.touches && evt.touches.length) {
      pt.x = evt.touches[0].clientX;
      pt.y = evt.touches[0].clientY;
    } else {
      if (!evt) var evt = window.event;
      pt.x = evt.clientX;
      pt.y = evt.clientY;
    }
    return pt;
  };
  var drag = function(mEvt) {
    if (mark && mark.className == "drag") {
      var pt = getPt(mEvt),
        x = pt.x - o.x,
        y = pt.y - o.y;
      mark.style.left = (mark.x + x) + "px";
      mark.style.top = (mark.y + y) + "px";
      mark.onmouseup = mark.ontouchend = function() {
        var mapDiv = gmap.getDiv(),
          mapLeft = mapDiv.offsetLeft,
          mapTop = mapDiv.offsetTop,
          mapWidth = mapDiv.offsetWidth,
          mapHeight = mapDiv.offsetHeight;
        var dragLeft = drag_area.offsetLeft,
          dragTop = drag_area.offsetTop,
          iconWidth = mark.offsetWidth,
          iconHeight = mark.offsetHeight;
        var newLeft = mark.offsetLeft + dragLeft + iconWidth / 2;
        var newTop = mark.offsetTop + dragTop + iconHeight / 2;
        if (dragLeft > mapLeft && newLeft < (mapLeft + mapWidth) && newTop > mapTop && newTop < (mapTop + mapHeight)) {
          var offset = 1;
          var divPt = new google.maps.Point(newLeft - mapLeft - offset, newTop - mapTop + (iconHeight / 2));
          var proj = overview.getProjection();
          var latlng = proj.fromContainerPixelToLatLng(divPt);
          var icon = mark.style.backgroundImage.slice(4, -1).replace(/"/g, "");
          createDraggedMarker(latlng, icon);
          fillMarker(icon);
        }
      };
    }
    return false;
  };
  if (!evt) var evt = window.event;
  mark = evt.target ? evt.target : evt.srcElement ? evt.srcElement : evt.touches ? evt.touches[0].target : null;
  if (mark.className != "drag") {
    if (d.cancelable) d.preventDefault();
    mark = null;
    return;
  } else {
    zIndex++;
    mark.style.zIndex = zIndex.toString();
    mark.x = mark.offsetLeft;
    mark.y = mark.offsetTop;
    var o = getPt(evt);
    if (evt.type === "touchstart") {
      mark.onmousedown = null;
      mark.ontouchmove = drag;
      mark.ontouchend = function() {
        mark.ontouchmove = null;
        mark.ontouchend = null;
        mark.ontouchstart = initDrag;
      };
    } else {
      document.onmousemove = drag;
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        if (mark) mark = null;
      };
    }
  }
  return false;
}


function setFillDrag(pointdrag){
	if(pointdrag === undefined) { pointdrag = null;}
    raddrag  = $('#raddrag').val();
    if(pointdrag && raddrag && (raddrag <= 2000)){
        fillTable(pointdrag);
    }else {
        swal({
            title: "Warning",
            text: "Cek kembali inputaan anda !",
            type: "warning",
            confirmButtonText: "Close"
        });
    }
    
}


function changeTraffMap(){
	//console.log($("#cont_traffic").prop('checked'))
	if ($("#cont_traffic").prop('checked') == true) {
		trafficLayer.setMap(gmap);
	} else {
		trafficLayer.setMap(null);
	}
}



function initMap(lat, lng , pages="std") {
  lng = 116.596456;
  lat = -3.337954;
  zoom = 5;
  var mapOptions = {
    center: {lat: lat, lng: lng},
    zoom: zoom,
    fullscreenControl: false,
    streetViewControl: true,
    mapTypeControl: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
      style: google.maps.ZoomControlStyle.SMALL
    }
  };

  gmap = new google.maps.Map(document.getElementById('canvasMap'),  mapOptions);
	//console.log(pages);
	if(pages === 'opt'){
		drag_area = document.getElementById("markers");
		dm1 = document.getElementById("m1");
		dm1.onmousedown = dm1.ontouchstart = initDrag;
		overview = new helper();
	}
 
}

function clearPath(){
	if(pathx){
		$.each(pathx, function(y,v){
			v.setMap(null);
		});
	}
}

function clearPoi(){
	if(poimarker){
		$.each(poimarker, function(y,v){
			v.setMap(null);
		});
	}
}

function clearOoh(){
	if(oohmarker){
		$.each(oohmarker, function(y,v){
			v.setMap(null);
		});
	}
}

function clearAll(){
	cleardrmarker();
	clearPath();
	clearPoi();
	clearOoh();
	
}

function randomIntFromInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}


function create_ooh(jsonData, iconstat, eventWindow){
	if(iconstat === undefined) { iconstat = null;}
	if(eventWindow === undefined) { eventWindow = null;}

	var bound = new google.maps.LatLngBounds();

	clearOoh();

	oohmarker = []

	var iconBase =	'assets/images/oohicon/';
	var icons = {
		4: {
			icon: { 
				1 : iconBase + 'icon-bh-1.png', 
				2 : iconBase + 'icon-bh-2.png', 
				3 : iconBase + 'icon-bh-3.png', 
				4 : iconBase + 'icon-bh-4.png',  
				5 : iconBase + 'icon-bh-5.png',  
			}
		},
		1: {
			icon: {
				1 : iconBase + 'icon-bb-1.png', 
				2 : iconBase + 'icon-bb-2.png', 
				3 : iconBase + 'icon-bb-3.png', 
				4 : iconBase + 'icon-bb-4.png',  
				5 : iconBase + 'icon-bb-5.png',  
			} 
		},
		2: {
			icon: {
				1 : iconBase + 'icon-dooh-1.png', 
				2 : iconBase + 'icon-dooh-2.png', 
				3 : iconBase + 'icon-dooh-3.png', 
				4 : iconBase + 'icon-dooh-4.png',  
				5 : iconBase + 'icon-dooh-5.png',   
			}
		},
		5: {
			icon: {
				1 : iconBase + 'icon-mbb-1.png', 
				2 : iconBase + 'icon-mbb-2.png', 
				3 : iconBase + 'icon-mbb-3.png', 
				4 : iconBase + 'icon-mbb-4.png', 
				5 : iconBase + 'icon-mbb-5.png', 
			} 
		},
		3: {
			icon: {
				1 : iconBase + 'icon-ss-1.png', 
				2 : iconBase + 'icon-ss-2.png', 
				3 : iconBase + 'icon-ss-3.png', 
				4 : iconBase + 'icon-ss-4.png', 
				5 : iconBase + 'icon-ss-5.png', 
			} 
		},
		0: {
			icon: {
				1 : iconBase + 'icon-deleted-1.png', 
				2 : iconBase + 'icon-deleted-2.png', 
				3 : iconBase + 'icon-deleted-3.png', 
				4 : iconBase + 'icon-deleted-4.png', 
				5 : iconBase + 'icon-deleted-5.png', 
			} 
		}
	};

	// 1 : Available
	// 3 : Expired
	// 2 : Tersewa
		// 2.1 : 
	 

	if(jsonData.length > 0) {
		$.each(jsonData, function(i) {
			if(iconstat=='no'){
				var oohpoint = new google.maps.Marker({
					position: new google.maps.LatLng(jsonData[i].latitude,jsonData[i].longitude),
					map: gmap,
					title: jsonData[i].name, 
				});
			} else {
				//console.log(icons);
				var randx =randomIntFromInterval(1,4); 
				var oohpoint   = new google.maps.Marker({
					position: new google.maps.LatLng(jsonData[i].latitude,jsonData[i].longitude),
					map: gmap,
					id:jsonData[i].ooh_id,
					title: jsonData[i].name,
					icon: icons[jsonData[i].type].icon[jsonData[i].status], 
					map_icon_label: '<span class="map-icon map-icon-billboard"></span>'
				});
			}

			oohmarker.push(oohpoint);

			bound.extend(new google.maps.LatLng(jsonData[i].latitude,jsonData[i].longitude));
			
			if(eventWindow === 'no'){
				// Ga Pake InfoWindow
				var markers = [];
				google.maps.event.addListener(oohpoint, 'click', function ( ) { 

						if(StateChooseSite){
							
							markers.push(oohpoint);  
							if (oohpoint.getAnimation() != null) {
									oohpoint.setAnimation(null);
									removeByKey(dataTableNa,{
										key: 'id',
										value: oohpoint.id
									});

									var v = dataMarker[oohpoint.id]; 
									removeByKey(ReachSubDistrict[v.district],{
										key: 'id',
										value: v.id
									});
									removeByKey(PriceSubDistrict[v.district],{
										key: 'id',
										value: v.id
									});
									removeByKey(OOHSubDistrict[v.district],{
										key: 'id',
										value: v.id
									});   
									if(dataTableNa === null){
										console.log('Clear all variables');
										ReachSubDistrict = {};
										PriceSubDistrict = {};
										OOHSubDistrict = {};
									}
							} else {
								oohpoint.setAnimation(google.maps.Animation.BOUNCE);								
								dataTableNa.push(dataMarker[oohpoint.id]); 

								oohbouncearr.push(oohpoint);

								var v = dataMarker[oohpoint.id];
								//console.log(v);

								if (!ReachSubDistrict[v.district]) {
								ReachSubDistrict[v.district] = [];
								}
								if (!PriceSubDistrict[v.district]) {
								PriceSubDistrict[v.district] = [];
								}
								if (!OOHSubDistrict[v.district]) {
								OOHSubDistrict[v.district] = [];
								}
								//console.log(v);

								var ttraffic = ((typeof v.traffic_ori == 'string') ? 0 : v.traffic_ori );
      
								  var xrate_card = (v.price_ori === null ) ? 0 : v.price_ori ;

								  var dataTraffic = {
									"id" : v.id, 
									"traffic" : ttraffic
								  }
								  var dataPrice = {
									"id" : v.id, 
									"price" : xrate_card
								  }
								  var dataDistric = {
									"id" : v.id, 
									"traffic" : ttraffic,
									"price" : xrate_card
								  }
								   

								ReachSubDistrict[v.district].push(dataTraffic);
								PriceSubDistrict[v.district].push(dataPrice);
								OOHSubDistrict[v.district].push(dataDistric);



							}
							
							setTableContent1(dataTableNa); 



						}else{
							var table = $('#ooh_site').DataTable();
							
							// Find indexes of rows which have `Yes` in the second column
							var indexes = $('#ooh_site').DataTable().rows().eq( 0 ).filter( function (rowIdx) {
								return $('#ooh_site').DataTable().cell( rowIdx, 0 ).data() === oohpoint.id  ? true : false;
							} );
							//console.log(indexes);
							//console.log('clicked '+oohpoint.id+' index = '+indexes);
							$('#ooh_site').DataTable().rows().every(function() {
								this.nodes().to$().removeClass('selectedrow')
							})
							// Add a class to those rows using an index selector
							$('#ooh_site').DataTable().rows( indexes )
								.nodes()
								.to$()
								.addClass( 'selectedrow' );
						}
	
				}); 

			}else {
				// add listener
				google.maps.event.addListener(oohpoint, 'click', function () {		
					detailOoh(jsonData[i].ooh_id);	 
				});
			}

		});
		gmap.fitBounds(bound);

	}

}

function removeByKey(array, params){
	array.some(function(item, index) {
		if(array[index][params.key] === params.value){
			// found it!
			array.splice(index, 1);
			return true; // stops the loop
		}
		return false;
	});
	return array;
}

function clearAll(){
	// cleardrmarker();
	clearPath();
	clearPoi();
	clearOoh();
}

function create_polygon(jsonData){
	//console.log(jsonData)

	clearAll();

	pathx = []
	
	var multibounds = new google.maps.LatLngBounds();
	var autofocus   = true;
	var noe			= 0 ;
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
	// 	var keyword = jsonData[0].checkboxid;
	// 	var checkbox = document.getElementById(keyword); 

	// 	checkbox.addEventListener("change", function(){ 
	// 		for (var ase = 0; ase < noe; ase++) {
	// 			if(checkbox.checked){	
	// 				pathx[ase].setMap(gmap); 
	// 			}else{
	// 				pathx[ase].setMap(null); 						
	// 			}
	// 		}
	// 	});
	// }
		 
	function setautofocus(){
		gmap.fitBounds(multibounds);
	}

	changeLayerMap();
}

function changeLayerMap(){
	if(pathx){
		$.each(pathx, function(y,v){
			if($("#cont_layer").prop('checked') == true) {
				v.setMap(gmap);
			} else {
				v.setMap(null);	
			}			 
		});
	}
}

//var circlearr = [];

function createCicle(lat, lng, radius, statrem){

	if(statrem === undefined) { statrem = true;}

	if(statrem==true){
		clearcircle();
	}
	

	

	var circle = new google.maps.Circle({
	    strokeColor: "#FF0000",
	    strokeOpacity: 0.6,
	    strokeWeight: 1,
	    fillColor: "#FF0000",
	    fillOpacity: 0.15,
	    visible:true,
	    map: gmap,
	    radius: radius,
	    center: new google.maps.LatLng(lat, lng)
	  });

	circlearr.push(circle);
}

function clearcircle(){
	if(circlearr){
		$.each(circlearr, function(y,v){
				v.setMap(null);				 
			})	
	}
}

function createHeatMap(toThePoints,statrem){

	if(statrem === undefined) { statrem = true;}

	if(statrem==true){
		clearHeatMap();
	}
	var heatmap = new google.maps.visualization.HeatmapLayer({
		data: toThePoints,
		map: gmap
	});

	hearmaparr.push(heatmap);
}

function clearHeatMap(){
	if(hearmaparr){
		$.each(hearmaparr, function(y,v){
				v.setMap(null);				 
			})	
	}
}

function clearBounceMap(){
	if(oohbouncearr){
		$.each(oohbouncearr, function(y,v){
				v.setAnimation(null);				 
			})	
	}
}