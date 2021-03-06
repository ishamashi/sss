var markerselectedprint = new Array();
var center_lat = '';
var center_lng = '';
var IMAGE_HOST = "http://mobile-prisma-api.com:7080/";
var advertiser = '';
var globalDataContentsOOH = [];
var selectedPreviewOOHImage = {
	image_day: null,
	image_night: null,
};
var TempPrintBAST = {
	content_id: null,
	date: null,
}

// $('#btnRefresh').on('click', function () {
// 	window.addEventListener('keypress', (event) => {
// 		console.log("You have pressed key: ", event.key);
// 		$("#inputRefresh").trigger(event.key);
// 	});

// 	window.addEventListener('keydown', (event) => {
// 		console.log(`key: ${event.key} has been pressed down`);
// 		// reff.val(event.key);
// 	});

// 	window.addEventListener('keyup', (event) => {
// 		console.log(`key: ${event.key} has been released`);
// 	});
// });

$(document).ready(function () {
	if (parseInt(localStorage.prisma_level) === 1) {
		$('#table-price-ooh, #table-print-ooh').remove();
		$('#table-prismaId-ooh').html('Pemilik');
	}
	initMap(-3.337954, 116.596456, 'opt');
	$('select').selectpicker();
	filterArea();
	filterType();
	filterIndustry();
	filterOwnership();
	getData();

	$('#province').on('change', function () {
		province = $(this).val();
		if (province != null) {
			let change_province = province.toString();
			// console.log('province', province);
			// console.log('modif province', change_province)
			// console.log('rubah', change_province.replace(/,/g,"+"))
			province = change_province.replace(/,/g, ";");
		}
		city = '';
		filterArea();
	});

	$('#fromDate').datepicker({
		orientation: "top auto",
		autoclose: true,
	}).on("changeDate", function (selected) {
		var minDate = new Date(selected.date.valueOf());
		$('#toDate').datepicker('setStartDate', minDate);
	});

	(async () => {
		var adv = "";
		let advertis = await getAdvertiser().catch(err => err);
		advertis.forEach((item) => {
			adv += `<option value="${item[0]}">${item[1]}</option>`;
		});
		$('#advertiser').append(adv);
		$('#advertiser').selectpicker('refresh');
	})();

	$('#toDate').datepicker({
		orientation: "top auto",
		autoclose: true,
	}).on("changeDate", function (selected) {
		var maxDate = new Date(selected.date.valueOf());
		$('#fromDate').datepicker('setEndDate', maxDate);
	});

	$('#search').on('click', function () {
		province = $("#province").val();
		city = $("#city").val();
		type = $("#type").val();
		oohstatus = $('#status_ooh').val();
		industry = $("#industry").val();
		ownership = $("#owner").val();

		if (province != null) {
			let change_province = province.toString();
			province = change_province.replace(/,/g, ";");
		}

		if (city != null) {
			let change_city = city.toString();
			city = change_city.replace(/,/g, ";");
		} else {
			city = '';
		}


		advertiser = $('#advertiser').val();

		if (advertiser === null) {
			advertiser = '';
		}

		if (industry === null) {
			industry = '';
		} else {
			let change_industry = industry.toString();
			industry = change_industry.replace(/,/g, ";");
		}

		if (oohstatus === null) {
			oohstatus = '';
		}

		if (type === null) {
			type = '';
		}

		if (ownership === null) {
			ownership = '';
		}


		fromDateStr = new Date($("#fromDate").val());
		toDateStr = new Date($("#toDate").val());
		var checkFromDate = Date.parse(fromDateStr);
		if (isNaN(checkFromDate) == true && fromDateStr !== '') {
			fromDate = '';
		}
		else {
			fromDate = fromDateStr.getFullYear() + "-" + (fromDateStr.getMonth() + 1) + "-" + fromDateStr.getDate();
		}

		var checkToDate = Date.parse(toDateStr);
		if (isNaN(checkToDate) == true && checkToDate !== '') {
			toDate = '';
		}
		else {
			toDate = toDateStr.getFullYear() + "-" + (toDateStr.getMonth() + 1) + "-" + toDateStr.getDate();
		}



		jalan = $('#jalan').val();
		getData();
		/*
		$('.ooh-print-modal').on('show.bs.modal', function() { 
		  
		  
		}); */
		console.log("SEARCH MARKER", { province, city, type, industry, fromDate, toDate, oohstatus, ownership, advertiser });
		storeFilterCache(province, city, type, industry, fromDate, toDate, oohstatus, ownership);

	});

	function getAdvertiser() {
		return new Promise((resolve, reject) => {
			$.ajax({
				url: APIURL + 'data/filterindustry?lvl=adv',
				headers: { "Ip-Addr": IP, "token": "Bearer " + token },
				type: 'GET',
				dataType: 'json',
				success: function (res) {
					resolve(res.data);
				},
				error: function (err) {
					console.log(err);
					reject(err);
				}
			});
		});
	}

	$('.ooh-detail-modal').on('show.bs.modal', function () {
		// do something when the modal is shown 
		wheelzoom(document.querySelectorAll('.wheelzoom'));

		$('[data-toggle="tooltip"]').tooltip();
		$('.dropdown-toggle').dropdown();

		$('#tahun').change(function () {
			// alert($(this).val());
			$('.cntne').hide();
			$('.btgrp').addClass('hide');
			$('#btgrp-' + $(this).val()).removeClass('hide');
			// $('.imgooh').addClass('hide');
			$('#btnclk-' + $(this).val() + '-1').click();
			$('#btvidit-' + $(this).val() + '-1-1').click();
		});

		$(".btvidit").click(function () {
			$('.btvidit').removeClass("active");
			$(this).addClass("active");

			var slot = $(this).data("btnval");
			$('.cntne').hide();
			$('.imgooh').addClass('hide');
			// var valbtn = $('button.btvidit').find('.active').attr('data-btnval');
			//console.log(valbtn);
			if (slot) {
				$('.cntne-' + slot).show();
				//$("#img-"+slot).show();
				$("#img-" + slot).removeClass('hide');
			}

		});

		$(".btnclk").click(function () {
			$('.btnclk').removeClass("active");
			$(this).addClass("active");
			var slot = $(this).data("btnval");
			$('.cntne').hide();
			//console.log('Clicked 1 '+slot);
			if (slot) {
				//console.log('Clicked 2 '+slot);

				$('.btvid').addClass('hide');
				$("#btvid-" + slot).removeClass('hide');
				$('#btvidit-' + slot + "-1").click(); //klik btn slot 1
			}
		});


		$("#RadiusSelect").change(function () {
			var radius = $(this).val();
			var lat = $(this).data('lat');
			var lng = $(this).data('lng');
			var sub_district = $(this).data('sudistrict');
			surrounding_poi(sub_district, lng, lat, radius);
		});

		$("#RadiusSelect").change();


		$('.switchpic').bootstrapToggle({
			on: 'Night',
			off: 'Day',
			size: 'mini',
			onstyle: 'primary',
			offstyle: 'default',
			width: 54,
		});

		$('.switchpic').trigger("click");
		$('#tahun').change();
		$(".btnclk").click();
		$("#home-tab").click();

		setTimeout(function () {
			var ooh_id = $('#view_ooh_id').val();
			var ooh_type = $('#view_ooh_type').val();
			getVasQuestion(ooh_id, ooh_type);
		}, 2000)




	});





});

function getData() {
	loading();
	$.ajax({
		url: APIURL + "data/oohlib?province=" + province + "&advertiser=" + advertiser + "&district=" + city + "&type=" + type + "&status=" + oohstatus + "&industry=" + industry + "&from=" + fromDate + "&to=" + toDate + "&ownership=" + ownership + "&address=" + jalan,
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
			setData(data);
			loading(false);
			// console.log('testing', data);
		},
		error: function (jqXHR, textStatus, errorThrown) {
			errorHandler(jqXHR);
			loading(false);
		}
	});
}

function setData(data) {
	var datas = data.data;
	var datane = [];
	var pointdata = [];

	var can_edit = false;
	var lvsdstorage = localStorage.getItem('prisma_lvsd');
	var idxn = lvsdstorage.search("edit-ooh");
	if (idxn >= 0) {
		can_edit = true;
	}
	//"location": v['latitude'] + "," + v['longitude']+"",
	$.each(datas, function (k, v) {
		rate_card = v['pricelist_12bulan']; //v['harga_12bulan'] + v['markup_12bulan'] + v['pricelist_12bulan'];
		perdata = {
			"no": v['ooh_id'],
			"no_cnv": v['no_cnv'],
			"no_site": v['no_site'],
			"district": v['district_name'],
			"address": "<a class=\"uppercase\" href=\"#\" onclick=\"zoomMarker('" + v['ooh_id'] + "')\">" + v['address'] + "</a>",
			"type": v['otyp_name'],
			"size": v['panjang'] + " m X " + v['lebar'] + " m",
			"lighting": v['lighting'],
			"reach": (v['reach'] === null) ? '0' : numberToMoney(v['reach']),
			"traffic": (v['traffic'] === null) ? '0' : numberToMoney(v['traffic']),
			"action": (can_edit) ? "<a href=\"#\" data-lvsd=\"edit-ooh\" onclick=\"editOoh('" + v['ooh_id'] + "')\" data-toggle=\"modal\" data-target=\".ooh-edit-modal\"><span class=\"menu-icon icon-pencil\" title=\"Edit OOH\"></span></a>  <a style=\"margin-right:5px;margin-left: 5px;\" href=\"javascript:void(0)\" onclick=\"detailOoh('" + v['ooh_id'] + "')\" data-toggle=\"modal\" data-target=\".ooh-detail-modal\"><span class=\"menu-icon icon-eye\" title=\"View OOH\"></span></a>" : "<a style=\"margin-right:5px;margin-left: 5px;\" href=\"javascript:void(0)\" onclick=\"detailOoh('" + v['ooh_id'] + "')\" data-toggle=\"modal\" data-target=\".ooh-detail-modal\"><span class=\"menu-icon icon-eye\" title=\"View OOH\"></span></a>",
		}
		/* "action":  (v['ooh_origin'] === 'ARCHERNINE') ? "<a href=\"#\" onclick=\"editOoh('"+v['ooh_id']+"')\" data-toggle=\"modal\" data-target=\".ooh-edit-modal\"><span class=\"menu-icon icon-pencil\" title=\"Edit OOH\"></span></a>" : "", */
		if (parseInt(localStorage.prisma_level) !== 1) {
			perdata['price'] = (rate_card === null) ? '0' : numberToMoney(rate_card);
			perdata['print'] = `<label class="switch switch-small"><input onchange="changePropPrint()" class="printprop" type="checkbox" value="${v['ooh_id']}" /><span></span></label>`;
		} else if (parseInt(localStorage.prisma_level) === 1) {
			perdata['no_site'] = (v['no_site'] === null) ? 'Non Prisma' : 'Prisma';
		}

		datane.push(perdata);
		perpoint = {
			"ooh_id": v.ooh_id,
			"latitude": v.latitude,
			"longitude": v.longitude,
			"name": v.address,
			"color": '#FF0000',
			"type": v.otyp_icon == 'icon-deleted' ? 0 : v.ooh_type,
			"status": v.ooh_status,
		}
		pointdata.push(perpoint);
		// console.log('testing', perdata);
	});

	setTableContent(datane);
	create_ooh(pointdata, 'yes');
}

function setTableContent(datane) {
	if (!$.fn.DataTable.fnIsDataTable("#ooh_site")) {
		// do nothing
	} else {
		$('#ooh_site').DataTable().destroy();
		// $('#table-data').html('');
	}

	var columns = [
		{ data: "no" },
		{ data: "no_cnv" },
		{ data: "no_site" },
		{ data: "district" },
		{ data: "address" },
		//{data: "location"},
		{ data: "type" },
		{ data: "size" },
		{ data: "traffic" },
	];

	if (parseInt(localStorage.prisma_level) !== 1) {
		columns.push({
			data: 'price'
		})
	}

	columns.push({ data: "action" });
	if (parseInt(localStorage.prisma_level) !== 1) {
		columns.push({
			data: 'print'
		})
	}

	$('#ooh_site').DataTable({
		"fixedHeader": false,
		"destroy": true,
		"searching": true,
		"bLengthChange": true,
		"retrieve": true,
		"order": [[1, "desc"]],
		"info": true,
		"ordering": true,
		"dom": '<""lf>t<""ipB>',
		dom: 'Bfrtip',
		"pageLength": 25,
		lengthMenu: [
			[10, 25, 50, -1],
			['10 rows', '25 rows', '50 rows', 'Show all']
		],
		buttons: [
			'copy', 'csv', 'excel', 'pageLength'
		],
		"columns": columns,
		"columnDefs": [
			// { className: "text-center", "targets": [ 0 ] },
			// { "visible": false, "targets": [ 0 ] },

			{ "width": "25%", "targets": [4] },
			// { "width": "5%", "targets": [9, 10] }
		],
		"fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
			// console.log("ROW", nRow);
			$('td:eq(0)', nRow).html(iDisplayIndexFull + 1);
			return nRow;
		},
		"data": datane
	});


	// $('.printprop').bootstrapToggle({
	// 	on: 'Yes',
	// 	off: 'No',
	// 	size: 'mini',
	// 	onstyle: 'primary',
	// 	offstyle: 'default'
	// });

	$('.traffic').bootstrapToggle({
		on: 'Show Traffic',
		off: 'Hide Traffic',
		size: 'small',
		onstyle: 'primary',
		offstyle: 'default'
	});
}

setInterval(() => {
	$('.printprop').bootstrapToggle({
		on: 'Yes',
		off: 'No',
		size: 'mini',
		onstyle: 'primary',
		offstyle: 'default'
	});
}, 300);

$(".printprop").on('change', function () {
	console.log("PRINTPROP", $(this).val());
	if ($('.printprop:checked').length > 0) {
		//do something
		$('#printPropOoh').css({ color: '#222' });
	}

	if ($('.printprop:checked').length === 0) {
		//do something
		$('#printPropOoh').css({ color: '#a2a2a2' });
	}
});

function changePropPrint() {
	console.log("CHECK", $('.printprop').is(':checked'));
	if ($('.printprop:checked').length > 0) {
		//do something
		$('#printPropOoh').css({ color: '#222' });
	}

	if ($('.printprop:checked').length === 0) {
		//do something
		$('#printPropOoh').css({ color: '#a2a2a2' });
	}
}

function zoomMarker(ooh_id) {
	controllingZoomMaps(ooh_id);
}

function detailOoh(ooh_id) {
	if (ooh_id) {
		$.ajax({
			url: APIURL + "data/oohlib?ooh_id=" + ooh_id,
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
				// console.log("data DETAIL OOh", temp[0]);
				setDataDetail(data.data)
			},
			error: function (jqXHR, textStatus, errorThrown) {
				errorHandler(jqXHR);
			}
		});
	}
}

function editOoh(ooh_id) {
	if (ooh_id) {

		localStorage.setItem('ooh_idx', ooh_id);
		window.open('ooh-database-input.html', '_blank');
	}
}

function printOoh(ooh_id) {
	if (ooh_id) {
		$.ajax({
			url: APIURL + "data/oohlib?ooh_id=" + ooh_id,
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
				$("#print_ooh").html('');
				if (typeof data != 'object') { data = $.parseJSON(data); }
				// var contentid = $('button.btvidit.active').attr('data-btnval');
				// var theID = $('button.btvidit.active').attr('id');
				var html = setPrintOOH(data.data, TempPrintBAST.content_id, TempPrintBAST.date);
				$("#print_ooh").append(html);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				errorHandler(jqXHR);
			}
		});
	}
}

const RemoveDuplicates = (array, key, type = 'single') => {
	return array.reduce((arr, item) => {
		const removed = arr.filter(i => i[key] !== item[key]);
		return [...removed, item];
	}, []);
};

const RemoveDuplicatesDouble = (array, key1, key2) => {
	return array.reduce((arr, item) => {
		const removed = arr.filter(i => (i[key1] !== item[key1] && i[key2] !== item[key2]));
		return [...removed, item];
	}, []);
};

// OOH Detail Popup Window
function setDataDetail(data) {
	$("#detail_ooh").empty(); // clear data
	var imgno = randomIntFromInterval(1, 3); // Math.floor(Math.random() * (4 - 1) ) + 1
	var yea = [];
	var ymcont = {};
	var whjm = 0;
	var html_img = '';
	var mntth = '';
	var opye = '';
	var btvid = '';
	var idx = 0;
	var html = '';
	var htmlLayanan = '';
	var imageFront = {
		image_day: null,
		image_night: null
	};
	var tempCountThis = [];
	var selectedDate = "";
	var resultData = [];
	var dataOOH = [];
	var filterData = [];

	$.each(data, function (idooh, theData) {
		dataOOH = theData;
		console.log({
			theData
		})
		var prismaphoto = '';
		var tbcontent = `<table class="table borderless">`;
		$.each(theData.conthis, function (key, value) {
			tempCountThis.push(value);
		});

		filterData = RemoveDuplicates(tempCountThis, 'sorper');

		resultData = filterData.map((item) => {
			var content = tempCountThis.filter((subItem, index) => {
				if (subItem.sorper === item.sorper) {
					return subItem;
				}
			});

			content = content.map((itemContent, index) => {
				return {
					...itemContent,
					index: index + 1,
				}
			})

			var date = moment(item.year + '-' + item.month + '-01').format('YYYY-MM-DD');
			return {
				year: item.year,
				month: item.month,
				sorper: item.sorper,
				contents: content,
				dates: moment(date).format('YYYY-MM'),
			}
		});
		resultData.sort((a, b) => parseInt(b.sorper) - parseInt(a.year));
		globalDataContentsOOH = resultData;

		console.log("FIX COUNTHIS", { tempCountThis, filterData, resultData });
		if (tempCountThis.length > 0) {
			// tempCountThis.length - 1
			var getLastImage = tempCountThis[0];
			if (getLastImage.image_day !== null && getLastImage.image_day !== 'noimage.jpg') {
				imageFront = getLastImage.image_day;
			} else if (getLastImage.image_night !== null && getLastImage.image_night !== 'noimage.jpg') {
				imageFront = getLastImage.image_night;
			} else {
				imageFront = 'noimage.jpg';
			}
		} else {
			imageFront = 'noimage.jpg';
		}
		console.log("GET IMAGE FRONT", imageFront);

		$.each(theData.conthis, function (k1, v1) {
			var is_hiding_image = (idx == 0) ? '' : 'hide';

			prismaphoto = ERP_HOST + 'assets/img/' + theData.no_site + '.jpg';

			var localset = 'assets/images/ooh-pictures/' + v1.image_night;
			// var localset = IMAGE_HOST+'image/'+v1.image_night;
			tbcontent += `
				<tr class="cntne cntne-${v1.content_id}">
					<th colspan="2"><h3>Isi Content</h3></th>
				</tr>
				<tr class="cntne cntne-${v1.content_id}">
					<th>Campaign</th>
					<td>${v1.campaign_title}</td>
				</tr>
				<tr class="cntne cntne-${v1.content_id}">
					<th>Industry</th>
					<td>${v1.ind_name}</td>
				</tr>
				<tr class="cntne cntne-${v1.content_id}">
					<th>Sub-Industry</th>
					<td>${v1.subind_name}</td>
				</tr>
				<tr class="cntne cntne-${v1.content_id}">
					<th>Advertiser</th>
					<td>${v1.comp_name}</td>
				</tr>
			`;

			html_img += `
						<div class="imgooh ${is_hiding_image}" id="img-${v1.content_id}">
							<img loading="lazy" src="${localset}" data-src="${localset}" class="wheelzoom imageooh" id="imageooh-${v1.content_id}" width="512" height="320" onError="this.onerror=null;this.src='assets/images/ooh-pictures/noimage.jpg';">
              					<div class="row" style="margin: 5px 25px; overflow: auto;position: absolute;right: 0;top: 0px;z-index: 99;">
								  <input type="checkbox" data-toggle="toggle" selected class="switchpic" data-size="mini" onchange="changePics('${v1.content_id}','${v1.image_night}','${v1.image_day}','${theData.owner}','${theData.no_site}','${theData.no_cnv}');" id="switchpic-${v1.content_id}" name="switchpic" data-on-text="Night" data-off-text="Day">
								</div>
						</div>`;
			if ($.inArray(v1.year, yea) < 0) yea.push(v1.year);
			if (typeof ymcont[v1.year + '-' + v1.month] == "undefined") ymcont[v1.year + '-' + v1.month] = [];
			ymcont[v1.year + '-' + v1.month].push(v1.content_id);

			whjm = k1;
			idx++;
		});
		tbcontent += '</table>';
		console.log("IMAGE FRONT", imageFront);
		var objectArr = Object.keys(ymcont);
		if (objectArr.length > 0) {
			var splitObject = objectArr[0].split('-');
			// selectedDate = moment(objectArr[0] + '-01').format('YYYY-MM-DD');
		}

		var no = 0;
		$.each(yea, function (k1, y1) {
			no++;
			opye += '<option value="' + y1 + '">' + y1 + '</option>';
			if (no == 1) {
				mntth += '<div class="btn-group btn-group btgrp" id="btgrp-' + y1 + '" > ';
			} else {
				mntth += '<div class="btn-group btn-group btgrp hide" id="btgrp-' + y1 + '" > ';
			}
			var nme = 1;
			var idmx = 0;
			$.each(monthe, function (km, vm) {

				var dishow = 'class="btn  btn-primary  btn-cilik" disabled';
				if (typeof ymcont[y1 + '-' + km] !== "undefined") {
					var is_active1 = '';// (idmx == 0) ? 'active' : '';
					dishow = 'class="btn btn-primary btn-cilik btnclk btnclk-' + y1 + '-' + km + ' ' + is_active1 + ' " id="btnclk-' + y1 + '-' + km + '" data-btnval="' + y1 + '-' + km + '" ';
					var is_hiding = (idmx == 0) ? '' : 'hide';
					btvid += `<div class="btn-group btvid ${is_hiding}" id="btvid-${y1}-${km}" style="float:left;margin: 10px;">`;
					var idxx = 0;
					$.each(ymcont[y1 + '-' + km], function (k2, v2) {
						if (idxx < 8) {
							var is_active = (idxx == 0) ? 'active' : '';
							btvid += `<button 
										style="margin-left: 0.5em;margin-right: 0.5em;border-radius: 0.25em;" 
										class="btn ${is_active} btn-primary btvidit btvidit-${y1}-${km}-${(k2 + 1)}" 
										id="btvidit-${y1}-${km}-${(k2 + 1)}" 
										data-btnval="${v2}" >${(k2 + 1)}
									  </button>`;
						}
						idxx++;
					});
					var max = 8;
					var sisa = max - idxx;
					if (sisa > 0) {
						for (i = idxx + 1; i <= max; i++) {
							btvid += `<button 
										style="margin-left: 0.5em;margin-right: 0.5em;border-radius: 0.25em;" 
										class="btn btn-primary" 
										disabled>${i}
									  </button>`;
						}
					}

					btvid += '</div>';
					nme++;
					idmx++;
				}
				mntth += '<button ' + dishow + '  >' + vm + '</button> ';

			});
			mntth += '</div>';
		});

		rate_card = theData.pricelist_12bulan; //theData.harga_12bulan + theData.markup_12bulan + theData.pricelist_12bulan;
		var strStatus = { 1: "Available", 2: "Contract end within 1 month", 3: "Contract more than 3 months", 4: "Contract end within 3 month", 5: "Expired" }
		// <div class="col-md-6">
		// 						<div class="panel info-box panel-white">
		// 							<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
		// 								<div class="info-box-stats" style="float: none !important;">
		// 									<span class="info-box-title text-center">Average Daily Traffic</span>
		// 									<p class="text-center"><span id="traffic">${numberToMoney(theData.traffic)}</span></p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>

		// 					<div class="col-md-6">
		// 						<div class="panel info-box panel-white">
		// 							<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
		// 								<div class="info-box-stats" style="float: none !important;">
		// 									<span class="info-box-title text-center">Average Daily Traffic</span>
		// 									<p class="text-center"><span id="traffic">${numberToMoney(theData.traffic)}</span></p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>

		// 					<div class="col-md-6">
		// 						<div class="panel info-box panel-white">
		// 							<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
		// 								<div class="info-box-stats" style="float: none !important;">
		// 									<span class="info-box-title text-center">Average Daily Traffic</span>
		// 									<p class="text-center"><span id="traffic">${numberToMoney(theData.traffic)}</span></p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		var decode_json = parseJwt(localStorage.prisma_token);

		if (decode_json['traffic_status']) {
			htmlLayanan += `
			<div class="col-md-6">
				<div class="panel info-box panel-white">
					<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
						<div class="info-box-stats" style="float: none !important;">
							<span class="info-box-title text-center">Average Daily Traffic</span>
							<p class="text-center"><span id="traffic">${numberToMoney(theData.traffic)}</span></p>
						</div>
					</div>
				</div>
			</div>`;
		}

		if (decode_json['score_status']) {
			htmlLayanan += `
			<div class="col-lg-6 col-md-6">
				<div class="panel info-box panel-white">
					<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
					<div class="info-box-stats" style="float: none !important;">
						<span class="info-box-title text-center">Site Score <span class="fa fa-question pull-right" data-html="true" data-toggle="tooltip" data-placement="top" title="" id="help_score"></span></span>
						<p class="text-center"><span id="score">${numberToMoney(theData.vscore)}</span></p>
					</div>
					</div>
				</div>
			</div>`;
		}

		if (decode_json['price_status']) {
			htmlLayanan += `
			<div class="col-lg-12 col-md-12">
				<div class="panel info-box panel-white">
					<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
						<div class="info-box-stats" style="float: none !important;">
						<span class="info-box-title text-center">Price</span>
						<input type="hidden" name="no_site" id="no_site" value="${theData.no_site}">
						<p class="text-center"><span id="rate_card">Rp. ${numberToMoney(rate_card)}</span></p>
						<center><h4 id="top_industry">per year</h4></center>
						</div>
					</div>
				</div>
			</div>`;
		}

		html += `
		<ul class="nav nav-tabs" id="myTab" role="tablist">
			<li class="nav-item">
				<a class="nav-link active" id="home-tab" data-toggle="tab" href="#informasi_dasar" role="tab">Informasi Dasar</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" id="contents-tab" data-toggle="tab" href="#contents" role="tab" >Content</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" id="poi-tab" data-toggle="tab" href="#poi" role="tab" >Point of Interest</a>
			</li>
		</ul>
		<div class="tab-content" id="myTabContent">
			<div class="tab-pane fade active" id="informasi_dasar" role="tabpanel">
				<div class="row">
					<div class="col-md-6">
						<img src="assets/images/ooh-pictures/${imageFront}" class="wheelzoom lazy" onError="checkErrorImgInfo('${imageFront}', 'imageFrontTest')" id="imageFrontTest" width="512" height="320" />
					</div>
					<div class="col-md-6">
						<div class="row">
							${htmlLayanan}
						</div>
					</div>
				</div>

				<div class="row" style="margin-top: 1em;">
					<div class="col-md-6">
						<h4>Spesifikasi</h4>
						<table class="table borderless">
							<tr>
								<th style="width: 20%;">Site Number</th>
								<td>${theData.no_site}</td>
							</tr>
							<tr>
								<th>Alamat</th>
								<td>${theData.address}</td>
							</tr>
							<tr>
								<th>OOH Point</th>
								<td>${theData.latitude};${theData.longitude}</td>
							</tr>
							<tr>
								<th>Road Class</th>
								<td>${theData.kelas_jalan}</td>
							</tr>
							<tr>
								<th>View</th>
								<td>${theData.view}</td>
							</tr>
							<tr>
								<th>Size</th>
								<td>${theData.panjang} m X ${theData.lebar} m, ${theData.orientasi}, ${theData.lighting}</td>
							</tr>
							<tr>
								<th>Status</th>
								<td>${strStatus[theData.ooh_status]}</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
			<div class="tab-pane fade" id="contents" role="tabpanel"></div>
			<div class="tab-pane fade" id="poi" role="tabpanel">
				<div class="row">
					<div class="col-lg-6 col-md-6">
						<div class="form-group row">
							<label class="col-sm-6 col-form-label" for="RadiusSelect" style="padding-top: 8px;">Filter Radius</label>
							<div class="col-sm-6">
							<select class="form-control form-control-sm" id="RadiusSelect" data-sudistrict="${theData.sub_district}" data-lng="${theData.longitude}" data-lat="${theData.latitude}" >
								<option value="100" selected>100 m</option>
								<option value="200" >200 m</option>
								<option value="300" >300 m</option>
								<option value="400" >400 m</option>
								<option value="500" >500 m</option>
								<option value="600" >600 m</option>
								<option value="700" >700 m</option>
								<option value="800" >800 m</option>
								<option value="900" >900 m</option>
								<option value="1000" >1000 m</option>
							</select>
							</div>
						</div>
					</div>
					<div class="col-lg-6 col-md-6">
						<button onclick="downloadExcelPOI()" class="btn btn-primary">Download XLSX</button>
					</div>
				</div>
				<div class="row">
					<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true" style="margin-right: 15px;margin-left: 15px;">
						<div class="panel panel-default" id="panel_surounding_poi">
						</div>
					</div>
				</div>
			</div>
		</div>
		<input type="hidden" name="no_site" id="no_site" value="${theData.no_site}">
		<input type="hidden" id="view_ooh_id" value="${theData.ooh_id}">
		<input type="hidden" id="view_ooh_type" value="${theData.ooh_type}">
    `;

	});

	// 	<div class="row">
	// 	<div class="col-md-6">
	// 	  <div class="row">
	// 		<div class="col-md-12">
	// 			${html_img}
	// 		</div>
	// 	  </div>
	// 	  <div class="row">
	// 		<div class="col-md-12">
	// 		  &nbsp;
	// 		</div>
	// 	  </div>
	// 	  <div class="row">
	// 		<div class="col-md-2">
	// 		  <div class="form-group col-md-10">
	// 			<select class="js-states form-control" id="tahun" style="width: 75px;height: 32px;">
	// 			  ${opye}
	// 			</select>
	// 		  </div>
	// 		</div>
	// 		<div class="col-md-10">
	// 		  ${mntth}
	// 		</div>
	// 	  </div>
	// 	  <div class="row">
	// 		<div class="col-md-4">
	// 		  <button style="margin:10px;" class="btn  btn-info btn-small" onclick="showerpfoto('${prismaphoto}');" > Show ERP Photo</button>
	// 		</div>
	// 		<div class="col-md-8">
	// 			${btvid}
	// 		</div>
	// 	  </div>
	// 	  <div class="row">
	// 		<div class="col-md-12">
	// 		  <ul class="nav nav-tabs" id="myTab" role="tablist">
	// 			<li class="nav-item">
	// 			  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Info</a>
	// 			</li>
	// 			<li class="nav-item">
	// 			  <a class="nav-link" id="content-tab" data-toggle="tab" href="#content" role="tab" aria-controls="content" aria-selected="false">Content</a>
	// 			</li>
	// 		  </ul>
	// 		  <div class="tab-content" id="myTabContent">
	// 			<div class="tab-pane fade active" id="home" role="tabpanel" aria-labelledby="home-tab">
	// 			  <div class="stats-info">
	// 				<ul class="list-unstyled uppercase">
	// 				  <li class="row"><div class="col-md-4">Pemilik</div><div class="col-md-8 text-primary"><h5 style="margin-top:3px;">${theData.owner}</h5></div></li>
	// 				  <li class="row"><div class="col-md-4">Canvasing ID</div><div class="col-md-8 text-primary"><h5 style="margin-top:3px;">${theData.no_cnv}</h5></div></li>
	// 				  <li class="row"><div class="col-md-4">Nomor Site Prisma</div><div class="col-md-8 text-primary"><h5 style="margin-top:3px;">${theData.no_site}</h5></div></li>
	// 				  <li class="row"><div class="col-md-4">Address</div><div class="col-md-8 text-primary ">${theData.address}</div></li>
	// 				  <li class="row"><div class="col-md-4">OOH Point</div><div class="col-md-8 text-primary ">${theData.latitude},${theData.longitude}</div></li>
	// 				  <li class="row"><div class="col-md-4">Industry</div><div class="col-md-8 text-primary ">${theData.conthis[0].ind_name}</div></li>
	// 				  <li class="row"><div class="col-md-4">Sub Industry</div><div class="col-md-8 text-primary ">${theData.conthis[0].subind_name}</div></li>
	// 				  <li class="row"><div class="col-md-4">Size</div><div class="col-md-8 text-primary ">${theData.panjang} m X ${theData.lebar} m, ${theData.orientasi}, ${theData.lighting}</div></li>
	// 				  <li class="row"><div class="col-md-4">Road Class</div><div class="col-md-8 text-primary ">${theData.kelas_jalan}</div></li>
	// 				  <li class="row"><div class="col-md-4">View</div><div class="col-md-8 text-primary ">${theData.view}</div></li>
	// 				  <li class="row"><div class="col-md-4">AVG Daily Traffic</div><div class="col-md-8 text-primary ">${numberToMoney(theData.traffic)}</div></li>
	// 				  <li class="row"><div class="col-md-4">Status</div><div class="col-md-8 text-primary ">${strStatus[theData.ooh_status]}</div></li>
	// 				</ul>
	// 			  </div>
	// 			</div>
	// 			<div class="tab-pane fade" id="content" role="tabpanel" aria-labelledby="content-tab"></div>
	// 		  </div>
	// 		</div>
	// 	  </div>
	// 	</div>
	// 	<div class="col-md-6">
	// 	  <div class="row">
	// 		<div class="col-lg-6 col-md-6">
	// 		  <div class="panel info-box panel-white">
	// 			<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
	// 			  <div class="info-box-stats" style="float: none !important;">
	// 				<span class="info-box-title text-center">Site Score <span class="fa fa-question pull-right" data-html="true" data-toggle="tooltip" data-placement="top" title="" id="help_score"></span></span>
	// 				<p class="text-center"><span id="score">${numberToMoney(theData.vscore)}</span></p>
	// 			  </div>
	// 			</div>
	// 		  </div>
	// 		</div>
	// 		<div class="col-lg-6 col-md-6">
	// 		  <div class="panel info-box panel-white">
	// 			<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
	// 			  <div class="info-box-stats" style="float: none !important;">
	// 				<span class="info-box-title text-center">Average Daily Traffic</span>
	// 				<p class="text-center"><span id="traffic">${numberToMoney(theData.traffic)}</span></p>
	// 			  </div>
	// 			</div>
	// 		  </div>
	// 		</div>
	// 	  </div>
	// 	  <div class="row">
	// 		<div class="col-lg-12 col-md-12">
	// 		  <div class="panel info-box panel-white">
	// 			<div class="panel-body" style="margin-top: -15px;margin-bottom: -15px;">
	// 			  <div class="info-box-stats" style="float: none !important;">
	// 				<span class="info-box-title text-center">Price</span>
	// 				<input type="hidden" name="no_site" id="no_site" value="${theData.no_site}">
	// 				<p class="text-center"><span id="rate_card">Rp. ${numberToMoney(rate_card)}</span></p>
	// 				<center><h4 id="top_industry">per year</h4></center>
	// 			  </div>
	// 			</div>
	// 		  </div>
	// 		</div>
	// 	  </div>
	// 	  <div class="row">
	// 		<div class="col-lg-12 col-md-12 text-right">
	// 		  <span class="fa fa-question" data-toggle="tooltip" data-placement="top" title="Site score is calculated based on outdoor physical condition, e.g.: viewing distance, viewing speed, total surrounding OOH, etc."></span>
	// 		</div>
	// 	  </div>
	// 	  <div class="row">
	// 		<div class="col-lg-6 col-md-6">
	// 		<h3>Surrounding Area</h3>
	// 		</div>
	// 		<div class="col-lg-6 col-md-6">
	// 		  <div class="form-group row">
	// 			<label class="col-sm-6 col-form-label" for="RadiusSelect" style="padding-top: 8px;">Filter Radius</label>
	// 			<div class="col-sm-6">
	// 			  <select class="form-control form-control-sm" id="RadiusSelect" data-sudistrict="${theData.sub_district}" data-lng="${theData.longitude}" data-lat="${theData.latitude}" >
	// 				<option value="100" selected>100 m</option>
	// 				<option value="200" >200 m</option>
	// 				<option value="300" >300 m</option>
	// 				<option value="400" >400 m</option>
	// 				<option value="500" >500 m</option>
	// 				<option value="600" >600 m</option>
	// 				<option value="700" >700 m</option>
	// 				<option value="800" >800 m</option>
	// 				<option value="900" >900 m</option>
	// 				<option value="1000" >1000 m</option>
	// 			  </select>
	// 			</div>
	// 		  </div>
	// 		</div>
	// 	  </div>
	// 	  <input type="hidden" id="view_ooh_id" value="${theData.ooh_id}">
	// 	  <input type="hidden" id="view_ooh_type" value="${theData.ooh_type}">
	// 	  <button type="button" class="btn btn-success right" onclick="printOoh('${theData.ooh_id}')" data-toggle="modal" data-target=".ooh-print-modal">Print BAST</button>
	// 	</div>
	//   </div>

	$("#detail_ooh").html(html);
	showingContents(resultData, dataOOH);
	$(".ooh-detail-modal").modal("show");
	$("#imageFrontTest").removeAttr("fin");
}

function getDataSurroundPOI(ooh_id, lat, lng, areaid, radius) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: APIURL + `data/surroundpoi?oid=${ooh_id}&lng=${lng}&lat=${lat}&areaid=${areaid}&radius=${radius}`,
			headers: {
				"token": token_type + " " + token
			},
			type: "POST",
			contentType: "application/json",
			dataType: 'json',
			success: function ({ data }) {
				resolve(data);
			},
			error: function (err) {
				reject(err);
			}
		});
	});
}

async function downloadExcelPOI() {
	var ooh_id = $('#view_ooh_id').val();
	var selectRadius = $('#RadiusSelect');
	var lat = selectRadius.data('lat');
	var lng = selectRadius.data('lng');
	var areaid = selectRadius.data('sudistrict');
	var radius = selectRadius.val();

	var dataPOI = await getDataSurroundPOI(ooh_id, lat, lng, areaid, radius).catch(err => err);
	if (dataPOI.length < 1) return alert("Data tidak ada !");
	console.log("DATA POI", {
		data: dataPOI,
		param: {
			ooh_id,
			lat,
			lng,
			areaid,
			radius
		}
	});

	var wb = XLSX.utils.book_new();
	wb.Props = {
		Title: "SheetJS Tutorial",
		Subject: "Test",
		Author: "Red Stapler",
		CreatedDate: new Date(2017, 12, 19)
	};
	wb.SheetNames.push("No Titik atau Canvasing");
	var header = [
		'No Titik',
		'Canvasing ID',
		'Type Product',
		'Country',
		'Province',
		'City',
		'Address',
		'Radius',
		'POI Category',
		'POI Sub Category',
		'POI Name'
	];

	var ws_data = [];

	ws_data.push(header);
	dataPOI.forEach((item) => {
		var body = [
			item['No_titik'],
			item['Canvasing ID'],
			item['Type_Product'],
			item['Country'],
			item['Province'],
			item['City'],
			item['POI_Address'],
			item['Radius'],
			item['POI_Category'],
			item['POI_SubCategory'],
			item['POI_Name'],
		];
		ws_data.push(body);
	});

	var ws = XLSX.utils.aoa_to_sheet(ws_data);
	wb.Sheets["No Titik atau Canvasing"] = ws;

	var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

	function s2ab(s) {
		var buf = new ArrayBuffer(s.length);
		var view = new Uint8Array(buf);
		for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
		return buf;
	}

	saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), `Export Data Point Of Interest - Radius ${radius}m.xlsx`);
}

function checkErrorImgInfo(value, id) {
	console.log("CHECK IMAGE INFORMASI DASAR", { value, id });
	checkOnLoadImage(id, value);
	// var image = new Image();
	// console.log("IMAGE", image);
	// var srcimage2 = 'assets/images/ooh-pictures/' + value;
	// var img = new Image();
	// img.src = srcimage2;

	// img.onload = function () {
	// 	$(`#${id}`).attr('src', img.src);
	// }

	// img.onerror = function () {
	// 	console.log('trying read image from server');
	// 	srcimage2 = IMAGE_HOST + 'image/' + value;
	// 	img = new Image();
	// 	img.src = srcimage2;

	// 	img.onload = function () {
	// 		console.log('image from server mobile found');
	// 		$(`#${id}`).attr('src', img.src);
	// 	}

	// 	img.onerror = function () {
	// 		console.log('image from server mobile not found')
	// 		srcimage2 = 'assets/images/ooh-pictures/noimage.jpg';
	// 		img = new Image();
	// 		img.src = srcimage2;
	// 		$(`#${id}`).attr('src', img.src);
	// 	}
	// }

	// if (typeof $(`#${id}`).attr('fin') !== 'undefined') {
	// 	$(`#${id}`).attr('src', 'assets/images/ooh-pictures/noimage.jpg');
	// 	return;
	// }

	// if (value != null) {
	// 	$(`#${id}`).attr('src', IMAGE_HOST + 'image/' + value).attr('fin', '1');
	// } else {
	// 	$(`#${id}`).attr('src', 'assets/images/ooh-pictures/noimage.jpg');
	// }
}

function showingContents(data, dataOOH) {
	var selectedDate = moment(data[0].year + '-' + data[0].month + '-01').format('YYYY-MM-DD');
	var html = `<div class="row">
					<div class="col-md-4">
						<div class="form-group">
							<label for="exampleInputEmail1">Periode</label>
							<input type="text" class="form-control" id="periodePicker" name="periodePicker">
						</div>
					</div>
					<div class="col-md-4">
						<div class="form-group">
							<label for="">&nbsp;</label>
							<br/>
							<button type="button" class="btn btn-success" onclick="printOoh('${dataOOH.ooh_id}')" data-toggle="modal" data-target=".ooh-print-modal">Print BAST</button>
						</div>
					</div>
				</div>
				<div id="showingDetailContent"></div>`;
	$('#contents').html(html);

	$('#periodePicker').daterangepicker({
		parentEl: ".ooh-detail-modal .modal-body",
		singleDatePicker: true,
		orientation: "top auto",
		locale: {
			format: "MMMM, YYYY",
		},
		autoclose: true,
		startDate: moment(selectedDate).format('MMMM, YYYY'),
		opens: "left",
		drops: "down",
		showDropdowns: true,
		autoApply: true,
	}, function (start, end) {
		var startDate = start.format('YYYY-MM');
		var endDate = end.format('YYYY-MM');

		var getDetailContent = data.find((item) => item.dates === startDate);
		if (typeof getDetailContent === 'undefined') return alert("Content tidak ada !");
		showingDetailContent(getDetailContent);
	});
	showingDetailContent(data[0]);
}

function showingDetailContent(value) {
	var { contents } = value;
	var slot = '';
	var dataContents = btoa(JSON.stringify(contents));
	slot += `<div class="btn-group">`;
	var orderedData = contents.sort((a, b) => a.index - b.index);

	TempPrintBAST = {
		content_id: orderedData[0].content_id,
		date: orderedData[0].year + '-' + orderedData[0].month + '-1',
	}

	for (let i = 0; i < 8; i++) {
		var date = "";
		if (typeof contents[i] !== 'undefined') {
			date = contents[i].year + '-' + contents[i].month + '-' + (i + 1);
		}
		slot += `
				<button 
					style="margin-left: 0.50em;margin-right: 0.50em;border-radius: 0.25em;"
					id="buttonSlot${i + 1}" 
					onclick="changeSlot('${dataContents}', 
										'${(typeof contents[i] !== 'undefined') ? contents[i].sorper : ''}', 
										'${(typeof contents[i] !== 'undefined') ? contents[i].index : ''}', 
										'buttonSlot${i + 1}', '${date}')" 
					class="btn btn-primary ${(typeof contents[i] === 'undefined' ? ' disabled ' : '')} ${(i === 0 ? ' btn-active-slot ' : '')}">
					${i + 1}
				</button>
			`;
	}

	slot += `</div>`;

	var html = `<div class="row">
					<div class="col-md-12">
						<label for="">Slot</label>
						<div class="form-group">
							${slot}
						</div>
					</div>
				</div>
				<div class="row">
					<div class="image-crop col-md-6" id="showImageOOH"></div>
					<div class="image-crop col-md-6" id="showTableOOH"></div>
				</div>`;

	$('#showingDetailContent').html(html);

	showingImageOOH(contents[0]);
	showingTableOOH(contents[0]);
}

function showingTableOOH(contents) {
	var html = `
				<table class="table borderless">
					<tr class="cntne cntne-${contents.content_id}">
						<th colspan="2"><h3>Isi Content</h3></th>
					</tr>
					<tr class="cntne cntne-${contents.content_id}">
						<th>Campaign</th>
						<td>${contents.campaign_title}</td>
					</tr>
					<tr class="cntne cntne-${contents.content_id}">
						<th>Industry</th>
						<td>${contents.ind_name}</td>
					</tr>
					<tr class="cntne cntne-${contents.content_id}">
						<th>Sub-Industry</th>
						<td>${contents.subind_name}</td>
					</tr>
					<tr class="cntne cntne-${contents.content_id}">
						<th>Advertiser</th>
						<td>${contents.comp_name}</td>
					</tr>
				</table>
				`;
	$('#showTableOOH').html(html);
}

function changeSlot(contents, sorper, index, selector, date) {
	if (sorper === '' && index === '') return;
	var parsingContents = JSON.parse(atob(contents));
	var selectObject = parsingContents.find((item) => item.sorper == sorper && item.index == index);
	$("[id*='buttonSlot']").removeClass('btn-active-slot');
	$(`#${selector}`).addClass('btn-active-slot');
	TempPrintBAST = {
		content_id: selectObject.content_id,
		date: date
	}
	showingImageOOH(selectObject);
	showingTableOOH(selectObject);
}

function showingImageOOH(content) {
	var image = '';
	selectedPreviewOOHImage = {
		image_day: content.image_day,
		image_night: content.image_night
	}
	var url = 'assets/images/ooh-pictures/' + content.image_day;
	image += `<div class="imgooh" id="showingPreviewImg">
		<img loading="lazy" src="${url}" data-src="${url}" data-url="${content.image_day}" class="wheelzoom-previewOoh imageooh lazy" id="imageoohPreview" width="512" height="320" onError="checkingImageIfError()">
			<div class="row" style="margin: 5px 25px; overflow: auto;position: absolute;right: 0;top: 0px;z-index: 99;">
			<input type="checkbox" data-toggle="toggle" selected class="switchpic" data-size="mini" onchange="changePicImageOOH(event)" id="switchpic" name="switchpic" data-on-text="Night" data-off-text="Day">
			</div>
	</div>`;

	$('#showImageOOH').html(image);
	$('.switchpic').bootstrapToggle({
		on: 'Night',
		off: 'Day',
		size: 'mini',
		onstyle: 'primary',
		offstyle: 'default',
		width: 54,
	});

	$('.switchpic').trigger("click");
	wheelzoom(document.querySelectorAll('.wheelzoom-previewOoh'));
}

function changePicImageOOH(e) {
	var checked = $('#switchpic').is(':checked');
	// console.log("CHANGE PIC", { checked, selectedPreviewOOHImage });
	if (selectedPreviewOOHImage.image_day === null) {
		selectedPreviewOOHImage.image_day = "noimage.jpg";
	} else if (selectedPreviewOOHImage.image_night === null) {
		selectedPreviewOOHImage.image_night = "noimage.jpg";
	}

	var url = 'assets/images/ooh-pictures/';
	$(`#imageoohPreview`).removeAttr('fin');
	console.log("CHANGE PIC", { selectedPreviewOOHImage, checked });
	if (!checked) {
		// Day
		$('#imageoohPreview').data('url', selectedPreviewOOHImage.image_day);
		// $('#imageoohPreview').attr('src', url + selectedPreviewOOHImage.image_day);
		checkOnLoadImage('imageoohPreview', selectedPreviewOOHImage.image_day);

	} else {
		// Night
		$('#imageoohPreview').data('url', selectedPreviewOOHImage.image_night);
		// $('#imageoohPreview').attr('src', url + selectedPreviewOOHImage.image_night);
		checkOnLoadImage('imageoohPreview', selectedPreviewOOHImage.image_night);
	}
}

function checkingImageIfError() {
	var image = $("#imageoohPreview");
	checkOnLoadImage('imageoohPreview', image.data('url'));
	// var host_android = "http://mobile-prisma-api.com:7080/image/";
	// if (typeof $(`#imageoohPreview`).attr('fin') !== 'undefined') {
	// 	$(`#imageoohPreview`).attr('src', 'assets/images/ooh-pictures/noimage.jpg');
	// 	return;
	// }
	// $('#imageoohPreview').attr('src', host_android + image.data('url')).attr('fin', '1');;
	return;
}

function checkOnLoadImage(id, value) {
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

			img.onload = function () {
				console.log('image from server dev 120 found', {
					url: img.src
				});
				$(`#${id}`).attr('src', img.src);
			}

			img.onerror = function () {
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

function surrounding_poi(areaid, pointx, pointy, radius) {
	$("#panel_surounding_poi").html('');
	$.ajax({
		url: APIURL + "data/surroundpoi?lng=" + pointx + "&lat=" + pointy + "&areaid=" + areaid + "&radius=" + radius,
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
			//console.log(data);
			var ymcont = {};
			var sumpoi = [];
			$.each(data.data, function (k, v) {
				if (typeof ymcont[v[2]] == "undefined") ymcont[v[2]] = [];
				var datatopush = { 'scpoi_id': v[0], 'scpoi_name': v[1], 'count': v[3] }
				ymcont[v[2]].push(datatopush);

				if (typeof sumpoi[v[2]] == "undefined") sumpoi[v[2]] = 0;
				sumpoi[v[2]] += v[3];
			});
			var html = '';
			var idx = 1;
			$.each(ymcont, function (kk, vv) {

				var sumkk = sumpoi[kk];
				var panel_head = '<div class="panel-heading" role="tab" id="heading' + idx + '" style="height: 40px;">\
                          <h4 class="panel-title" style="margin-top: -7px;">\
                            <a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapse'+ idx + '" aria-expanded="false" aria-controls="collapse' + idx + '">\
                              '+ kk + ' (' + sumkk + ')\
                            </a>\
                          </h4>\
                        </div>\
                        <div id="collapse'+ idx + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + idx + '">\
                            <div class="panel-body" style="padding: 10px;">\
                              <div class="row">\
                                <div class="col-md-12" style="padding-left: 0px; padding-right: 0px;">\
                                  <ul style="font-size: 12px;">';

				var panel_lists = '';
				$.each(vv, function (k, v) {
					panel_lists += '<li>' + v.scpoi_name + ' (' + v.count + ')</li>';
				});

				panel_head += panel_lists + '</ul>\
                    </div>\
                  </div>\
                </div>\
              </div>';
				idx++;

				html += panel_head;

			});

			$("#panel_surounding_poi").html(html);

			//console.log(ymcont);


		},
		error: function (jqXHR, textStatus, errorThrown) {
			errorHandler(jqXHR);
		}
	});
}


function changePics(id, imgsrc2, imgsrc1, owner, no_site, no_cnv) {
	console.log('start change pic', imgsrc1, '-', imgsrc2);
	//console.log($("#switchpic-"+id).prop('checked'))
	/*
	if(owner == 'prisma'){
	  var srcimage2 = 'http://117.102.105.202/prisma/assets/img/'+no_site+'.jpg';
	  var srcimage1 = 'http://117.102.105.202/prisma/assets/img/'+no_site+'.jpg';
  
	  if( no_cnv.length > 3){
		srcimage1 = 'assets/images/ooh-pictures/'+imgsrc1;
	  }
  
	}else{ */
	//}

	// var srcimage1 = IMAGE_HOST+'image/'+imgsrc2;
	// var srcimage2 = IMAGE_HOST+'image/'+imgsrc1;

	// src1 = night
	// src2 = day
	// i want to the default is day



	// console.log('height',img.height);


	// Loading Image
	var loadingImage = 'assets/images/ooh-pictures/loading-buffering.gif';


	if ($("#switchpic-" + id).prop('checked') == true) {
		var srcimage2 = 'assets/images/ooh-pictures/' + imgsrc2;
		var img2 = new Image();
		img2.src = srcimage2;

		img2.onload = function () {
			console.log('image from local found')
			$("#imageooh-" + id).attr('src', img2.src).appendTo("#imageooh-" + id);
		}

		img2.onerror = function () {
			console.log('trying read image from server');
			$("#imageooh-" + id).attr('src', loadingImage).appendTo("#imageooh-" + id);
			srcimage2 = IMAGE_HOST + 'image/optimize/' + imgsrc2;
			var img2 = new Image();
			img2.src = srcimage2;

			img2.onload = function () {
				console.log('image from server mobile found');
				$("#imageooh-" + id).attr('src', img2.src).appendTo("#imageooh-" + id);
			}

			img2.onerror = function () {
				console.log('image from server mobile not found')
				srcimage2 = IMAGE_HOST + 'image/' + imgsrc2;
				var img2 = new Image();
				img2.src = srcimage2;
				$("#imageooh-" + id).attr('src', img2.src).appendTo("#imageooh-" + id);
			}
		}
	} else {

		var srcimage1 = 'assets/images/ooh-pictures/' + imgsrc1;
		// getMeta(srcimage1);
		var img = new Image();
		img.src = srcimage1;


		img.onload = function () {
			console.log('image from local found')
			$("#imageooh-" + id).attr('src', img.src).appendTo("#imageooh-" + id);
		}

		img.onerror = function () {
			console.log('trying read image from server (2)');
			$("#imageooh-" + id).attr('src', loadingImage).appendTo("#imageooh-" + id);
			srcimage1 = IMAGE_HOST + 'image/optimize/' + imgsrc1;
			var img = new Image();
			img.src = srcimage1;

			img.onload = function () {
				console.log('image from server mobile found (2)');
				$("#imageooh-" + id).attr('src', img.src).appendTo("#imageooh-" + id);
			}

			img.onerror = function () {
				console.log('image from server mobile not found (2)')
				srcimage1 = IMAGE_HOST + 'image/' + imgsrc1;
				var img = new Image();
				img.src = srcimage1;
				$("#imageooh-" + id).attr('src', img.src).appendTo("#imageooh-" + id);

			}
		}

		// console.log('i am here 2', srcimage1, 'size', img.height);
		// $("#imageooh-" + id).attr('src', srcimage1).appendTo("#imageooh-" + id);

	}


}

function getMeta(url) {
	var img = new Image();
	img.addEventListener("load", function () {
		alert(this.naturalWidth + ' ' + this.naturalHeight);
	});

	img.onerror = function () {
		alert('image not found');
	}
	img.src = url;
}

function fillTable(pointdrag) {

	if (pointdrag === undefined) { pointdrag = null; }

	jalan = $('#jalan').val();
	industry = $('#industry').val();
	oohstatus = $('#status_ooh').val();
	advertiser = $('#advertiser').val();
	fromDate = $("#fromDate").val();
	toDate = $("#toDate").val();
	ownership = $("#owner").val();
	raddrag = $('#raddrag').val();

	var typooh = '';
	$.each($(".typooh:checkbox:checked"), function () {
		typooh += $(this).val() + ',';
	});

	var sbtypooh = '';
	$.each($(".sbtypooh:checkbox:checked"), function () {
		sbtypooh += $(this).val() + ',';
	});

	var indusooh = '';
	$.each($(".indusooh:checkbox:checked"), function () {
		indusooh += $(this).val() + ',';
	});

	var advooh = '';
	$.each($(".advooh:checkbox:checked"), function () {
		advooh += $(this).val() + ',';
	});

	if (true) {
		if (typooh) {
			typooh = typooh.slice(0, -1);
		}
		if (sbtypooh) {
			sbtypooh = sbtypooh.slice(0, -1);
		}
		if (indusooh) {
			indusooh = indusooh.slice(0, -1);
		}
		if (advooh) {
			advooh = advooh.slice(0, -1);
		}
		//url: APIURL + "ooh_database?province="+province+"&city="+city+"&type="+type+"&industry="+industry+"&from="+fromDate+"&to="+toDate+"&ownership="+ownership+"&address="+jalan,
		$.ajax({
			cache: false,
			type: 'GET',
			data: {
				"province": province, "district": city, "from": fromDate, "to": toDate, "ownership": ownership,
				"pointdrag": pointdrag, "raddrag": raddrag, 'type': typooh, 'status': oohstatus
			},
			headers: {
				"token": token_type + " " + token
			},
			url: APIURL + 'data/oohlib',
			dataType: 'json',
			success: function (data) {
				if (typeof data != 'object') { data = $.parseJSON(data); }
				if (data) {
					var datmap = [];
					var datane = [];
					$.each(data.data, function (k, v) {

						var colorooh = '#d500f9';

						var rand = randomIntFromInterval(1, 4);
						madata = {
							"ooh_id": v.ooh_id,
							"latitude": v.latitude,
							"longitude": v.longitude,
							"name": v.address,
							"color": colorooh,
							"type": v.ooh_type,
							"status": v.ooh_status,
						};
						datmap.push(madata);

						rate_card = v.pricelist_12bulan; //v.harga_12bulan + v.markup_12bulan + v.pricelist_12bulan;
						//console.log(rate_card);
						var can_edit = false;
						var lvsdstorage = localStorage.getItem('prisma_lvsd');
						var idxn = lvsdstorage.search("edit-ooh");
						if (idxn >= 0) {
							can_edit = true;
						}
						//"location": v.latitude + "," + v.longitude,
						perdata = {
							"no": v.ooh_id,
							"no_cnv": v.no_cnv,
							"no_site": v.no_site,
							"district": v.district,
							"address": "<a class=\"uppercase\" href=\"#\" onclick=\"detailOoh('" + v.ooh_id + "')\" data-toggle=\"modal\" data-target=\".ooh-detail-modal\">" + v.address + "</a>",

							"type": v.ooh_type,
							"size": v.panjang + " m X " + v.lebar + " m",
							"lighting": v.lighting,
							"reach": (v.reach === null) ? '0' : numberToMoney(v.reach),
							"traffic": (v.traffic === null) ? '0' : numberToMoney(v.traffic),
							// "price": (rate_card === null) ? '0' : numberToMoney(rate_card),
							"action": (can_edit) ? "<a href=\"#\"  data-lvsd=\"edit-ooh\" onclick=\"editOoh('" + v.ooh_id + "')\" data-toggle=\"modal\" data-target=\".ooh-edit-modal\"><span class=\"menu-icon icon-pencil\" title=\"Edit OOH\"></span></a>" : "-",
						}

						if (parseInt(localStorage.prisma_level) !== 1) {
							perdata['price'] = (rate_card === null) ? '0' : numberToMoney(rate_card);
							perdata['print'] = `<label class="switch switch-small"><input onchange="changePropPrint()" class="printprop" type="checkbox" value="${v.ooh_id}" /><span></span></label>`;
						} else if (parseInt(localStorage.prisma_level) === 1) {
							perdata['no_site'] = (v.no_site === null) ? 'Non Prisma' : 'Prisma';
						}
						datane.push(perdata);

					});
					setTableContent(datane);
					create_ooh(datmap);
					if (pointdrag && raddrag) {
						var prd = pointdrag.split(',');
						createCicle(prd[1], prd[0], Number(raddrag))
					}
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				if (jqXHR.status != 500) {
					if (jqXHR.status == 400) {
						window.location = "logout.html";
					}
					var strjson = JSON.parse(jqXHR.responseText);
				} else {
				}
			}
		});

	}
}

function price(oohsite) {
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
				ratecard_nontitik = v[1] + v[2] + v[3];
				ratecard_1 = v[4] + v[5] + v[6];
				ratecard_3 = v[7] + v[8] + v[9];
				ratecard_6 = v[10] + v[11] + v[12];
				ratecard_12 = v[13] + v[14] + v[15];
				ratecard_repostering = v[16] + v[17] + v[18];
				ratecard_repostbongkar = v[19] + v[20] + v[21];
				ratecard_repostcetak = v[22] + v[23] + v[24];
				ratecard_promo = v[25] + v[26] + v[27];


			});

			$('#rate_card').html('Rp. ' + numberToMoney(ratecard_12));

		},
		error: function (jqXHR, textStatus, errorThrown) {
			errorHandler(jqXHR);
		}
	});
}

function showerpfoto(filename) {

	swal({
		title: "prisma ORIGIN PHOTO",
		html: "<img src='" + filename + "' style='width:512px;'>",

	})
}


//&lt;
var dataquestion_billboard = [
	{
		"code": "quest001",
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
		"code": "quest002",
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
		"code": "quest003",
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
		"code": "quest004",
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
		"code": "quest005",
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
		"code": "quest006",
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
		"code": "quest007",
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
		"code": "quest008",
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
		"code": "quest009",
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
		"code": "quest010",
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
		"code": "quest011",
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
		"code": "quest001",
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
		"code": "quest002",
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
		"code": "quest003",
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
		"code": "quest004",
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
		"code": "quest005",
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
		"code": "quest006",
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
		"code": "quest007",
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
		"code": "quest008",
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
		"code": "quest009",
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
		"code": "quest010",
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
		"code": "quest011",
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
		"code": "quest002",
		'map': [
			{
				"None": 5,
				"1 Site": 4,
				"2 Sites": 3,
				"3 Sites": 2,
				"4 Sites": 2,
				"5 Sites": 2,
				"6+ Sites": 1,
			}
		]
	},
	{
		"code": "quest006",
		'map': [
			{
				"0-25m": 1,
				"25-50m": 2,
				"50-100m": 3,
				"100-200m": 4,
				"200m+": 5
			}
		]
	},
	{
		"code": "quest010",
		'map': [
			{
				"None": 5,
				"Slight": 1,
				"Moderate": 0,
				"Severe": 0
			}
		]
	}
];

function getVasQuestion(ooh_id, typeooh = 1) {
	$('#help_score').prop('title', '');


	var dataquestion = [];
	if (typeooh == 1) {
		dataquestion = dataquestion_billboard;
	}
	else {
		dataquestion = dataquestion_ooh;
	}

	//var ooh_id = $("#ooh_id").val();
	if (ooh_id) {

		var dataanswer = {};
		$.ajax({
			cache: false,
			type: 'GET',
			headers: { "Ip-Addr": IP, "token": "Bearer " + token },
			url: APIURL + 'data/vascontent',
			data: { ooh_id: ooh_id },
			dataType: 'json',
			success: function (data) {
				if (typeof data != 'object') { data = $.parseJSON(data); }
				dataanswer = data.data;
				//console.log(dataanswer);
				//console.log(dataanswer.length);

				if (jQuery.isEmptyObject(dataanswer)) {
					$('#help_score').prop('title', 'Scoring not yet done! Please fill scoring form first!');
				} else {
					var htmlform = '';
					$.each(dataquestion, function (k, v) {
						var questid = k + 1;
						htmlform += '(' + v.question + ' : ';

						$.each(v.answer, function (kk, vv) {
							var vscore = kk + 1;
							if (vscore == dataanswer[v.code]) {
								htmlform += vv;
							}
						});
						htmlform += '), ';
					});

					$('#help_score').prop('title', htmlform);
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
// console.log('decode', decode_json['traffic_status']);

function parseJwt(token) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
};
