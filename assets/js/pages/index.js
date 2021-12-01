$( document ).ready(function() {
	Highcharts.setOptions({ lang: { thousandsSep: ',' } });
	$('select').selectpicker();
	filterArea();
	filterType('oview');
	filterIndustry('oview');
	getData();

	$('#province').on('change',function(){
    province = $(this).val();
	if(province!=null) {
		let change_province = province.toString();
		// console.log('province', province);
		// console.log('modif province', change_province)
		// console.log('rubah', change_province.replace(/,/g,"+"))
		province = change_province.replace(/,/g,";");
	}
    city = '';
    filterArea();
  });

	$('#search').on('click',function(){
    province = $("#province").val();
    city = $("#city").val();
    type = $("#type").val();
	if(province!=null) {
		let change_province = province.toString();
		province = change_province.replace(/,/g,";");
	}else{
		province = '';
	}
	
	if(city!=null) {
		let change_city 	= city.toString();
		city = change_city.replace(/,/g,";");
	}else{
		city = '';
	}

    industry = $("#industry").val();
    fromDate = $("#fromDate").val();
    toDate = $("#toDate").val();
	getData();
	storeFilterCache(province,city,type,industry,fromDate,toDate);
  });

	$('#fromDate').datepicker({
		orientation: "top auto",
		autoclose: true,
		format: "yyyy-mm",
		startView: "months", 
		viewMode: "months", 
		minViewMode: "months"
	}).on("changeDate", function(selected){
		var minDate = new Date(selected.date.valueOf());
		$('#toDate').datepicker('setStartDate', minDate);
	});

	$('#toDate').datepicker({
		orientation: "top auto",
		autoclose: true,
		format: "yyyy-mm",
		startView: "months", 
		viewMode: "months", 
		minViewMode: "months"
	}).on("changeDate", function(selected){
		var maxDate = new Date(selected.date.valueOf());
		$('#fromDate').datepicker('setEndDate', maxDate);
	});
	
	setTimeout(function() {
		toastr.options = {
			closeButton: true,
			progressBar: true,
			showMethod: 'fadeIn',
			hideMethod: 'fadeOut',
			timeOut: 5000
		};
		toastr.success('Wellcome to PRISMA OOH Dashboard!', 'Hi, '+ name +'!');
	}, 1800);

	var start = moment().subtract(29, 'days');
	var end = moment();

	function cb(start, end) {
		$('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	}

	$('#reportrange').daterangepicker({
		startDate: start,
		endDate: end,
		alwaysShowCalendars: true,
		ranges: {
		   'Today': [moment(), moment()],
		   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		   'This Month': [moment().startOf('month'), moment().endOf('month')],
		   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
		   'This Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
		}
	}, cb);

	cb(start, end);
	
});


function getLastUpdate() {
	var field = 'created_date';
	var table = 'f_ooh';
	$.ajax({
    url: APIURL + "statistic/lastupdate?field="+field+"&table="+table,
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
		$('#lastupdate').html(data.data[0]);
    	//console.log(data.data[0])
    },
    error: function(jqXHR, textStatus, errorThrown) {
      errorHandler(jqXHR);
    }
  });
}


// Initiate Variable
var industry = [];
var advertiser = [];
var type = [];
var city_advertiser = [];
var district = [];
var sort_industry = [];
var top20_industry = [];
var top20_advertiser = [];
var sort_advertiser = [];
var sort_district = [];
var sort_type = [];

function getData() {
	emptyData(); //updated at 20200617
	$.ajax({
    url: APIURL + "statistic/overview?province="+province+"&city="+city+"&type="+type+"&industry="+industry+"&from="+fromDate+"&to="+toDate,
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


//updated at 20200617
function emptyData(){
	var total_ooh = 0; 
	advertiser = [];
	district = [];
	sort_industry = [];
	city_advertiser = []; 
	top20_industry = [];
	top20_advertiser = [];
	sort_advertiser = [];
	sort_district = [];
	sort_type = [];
	$("#total_ooh").text(numberToMoney(total_ooh));
	$("#top_industry").text('NA');
	$("#top_industry_count").text(numberToMoney(0));
	$("#top_industry_percent").text(0);
	$("#top_advertiser").text('NA');
	$("#top_advertiser_count").text(numberToMoney(0));
	$("#top_advertiser_percent").text(0);
	$("#top_district").text('NA');
	$("#top_district_count").text(numberToMoney(0));
	$("#top_district_percent").text(0);

	SOVbyIndustry(top20_industry);
	SOVbyAdvertiser(top20_advertiser);
	SOVbyOOHType(sort_type);
	SOVbyCity(district, city_advertiser,total_ooh);
}

function setData(data) {
	var total_ooh = data.data.total_ooh;
	industry = data.data.industry;
	advertiser = data.data.advertiser;
	district = data.data.district;
	type = data.data.type;
	city_advertiser = data.data.city_advertiser;
	 
	for (var n in industry) { sort_industry.push([n, industry[n]]); }
	console.log(sort_industry);
	sort_industry.sort(function(a, b) { return b[1] - a[1]; });
	top20_industry = sort_industry.slice(0,20); //changes 20200617
	
	for (var n in advertiser) { sort_advertiser.push([n, advertiser[n]]); }
	sort_advertiser.sort(function(a, b) { return b[1] - a[1]; });
	top20_advertiser = sort_advertiser.slice(0,20);  //changes 20200617
	
	for (var n in district) { sort_district.push([n, district[n]]); }
	sort_district.sort(function(a, b) { return b[1] - a[1]; }); 
	
	for (var n in type) { sort_type.push([n, type[n]]); }
	sort_type.sort(function(a, b) { return b[1] - a[1]; });

	$("#total_ooh").text(numberToMoney(total_ooh));
	$("#top_industry").text(sort_industry[0][0]);
	$("#top_industry_count").text(numberToMoney(sort_industry[0][1]));
	$("#top_industry_percent").text(Math.round(100*100*sort_industry[0][1]/total_ooh)/100);
	$("#top_advertiser").text(sort_advertiser[0][0]);
	$("#top_advertiser_count").text(numberToMoney(sort_advertiser[0][1]));
	$("#top_advertiser_percent").text(Math.round(100*100*sort_advertiser[0][1]/total_ooh)/100);
	$("#top_district").text(sort_district[0][0]);
	$("#top_district_count").text(numberToMoney(sort_district[0][1]));
	$("#top_district_percent").text(Math.round(100*100*sort_district[0][1]/total_ooh)/100);
	$("#fromDate").val(data.data.default_year_periode+'-01');
	$("#toDate").val(data.data.default_year_periode+'-12');
``
	SOVbyIndustry(top20_industry);
	SOVbyAdvertiser(top20_advertiser);
	SOVbyOOHType(sort_type);
	SOVbyCity(district, city_advertiser,total_ooh);
	getLastUpdate();
}

function SOVbyIndustry(data) {
	Highcharts.chart('sov_by_industry', {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		credits: {
			enabled: false
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: 'Total OOH'
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y:,.f}'
				}
			}
		},
		tooltip: {
			// headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.f}</b> of total<br/>'
		},
		series: [
			{
				colorByPoint: true,
				data: data
			}
		]
	});
}

function SOVbyAdvertiser(data) {
	Highcharts.chart('sov_by_advertiser', {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		credits: {
			enabled: false
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: 'Total OOH'
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y:,.f}'
				}
			}
		},
		tooltip: {
			// headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.f}</b> of total<br/>'
		},
		series: [
			{
				colorByPoint: true,
				data: data
			}
		]
	});
}

function SOVbyOOHType(data) {
	Highcharts.chart('sov_by_oohtype', {
		chart: {
			type: 'column'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		credits: {
			enabled: false
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: 'Total OOH'
			}
		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y:,.f}'
				}
			}
		},
		tooltip: {
			// headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:,.f}</b> of total<br/>'
		},
		series: [
			{
				colorByPoint: true,
				data: data
			}
		]
	});
}

// Telkomsel, HMS, Mandiri, BCA , Tokopedia
function SOVbyCity(district, data,total_ooh) { 
	var datane = [];
	$.each(data, function(k,v){
		split_key = k.split("|");
		var jml_ooh_district = district[split_key[0]];
		perdata = {
			"area": split_key[0],
			"sov": Math.round(100*100*jml_ooh_district/total_ooh)/100,
			"total_ooh": jml_ooh_district,
			"top_advertiser": split_key[1]+" ("+ v +")"
		}
		datane.push(perdata);
	});

	if(!$.fn.DataTable.fnIsDataTable( "#sov_by_city" )) {
      // do nothing
  } else {
      $('#sov_by_city').DataTable().destroy();
      // $('#table-data').html('');
  }
  $('#sov_by_city').DataTable({
    "fixedHeader": false,
    "destroy" : true,
    "searching": true,
    "bLengthChange": true,
    "retrieve": true,
    "info": true,
    "ordering": true,
    // "dom": '<""lf>t<""ipB>',
    "columns" : [
      {data: "area"},
      {data: "sov"},
      {data: "total_ooh"},
      {data: "top_advertiser"}
    ],
    "columnDefs": [
    	// { className: "text-center", "targets": [ 0 ] },
      // { "visible": false, "targets": [ 0 ] },
    ],
    // "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
    //     $('td:eq(0)',nRow).html(iDisplayIndexFull +1);
    //     return nRow;
    // },
    "data" : datane
  });
}