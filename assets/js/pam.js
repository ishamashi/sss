$(function () {
	// CounterUp Plugin
	$('.counter').counterUp({
		delay: 10,
		time: 1000
	});

	$("#ise_step").ionRangeSlider({
		type: "double",
		grid: true,
		min: 1,
		max: 56,
		from: 15,
		to: 35,
		step: 1
	});

});

function numberToMoney(number) {
	if (isNaN(number)) { return number }
	else if (number === null) { return '0' }
	else { return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); }
}


function filterArea() {
	$.ajax({
		url: APIURL + "data/filterarea?province=" + province + "&city=" + city,
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
			var option = "";

			$.each(data.data, function (k, v) {
				option += "<option value='" + v[0] + "'>" + v[1] + "</option>";
			});
			if (province != '' && city == '') {
				$("#city").html('<option value="">All City</option>' + option).selectpicker('refresh');
			} else if (province != '' && city != '') {

			} else if (province == '' && city == '') {
				$("#province").html('<option value="">All Province</option>' + option).selectpicker('refresh');
			}
			if($('#province').val() === '') return $("#city").html('<option value="">All City</option>').selectpicker('refresh');
		},
		error: function (jqXHR, textStatus, errorThrown) {
			errorHandler(jqXHR);
		}
	});
}

function filterOwnership() {
	$.ajax({
		url: APIURL + "data/filterownership",
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
			var option = "";
			$.each(data.data, function (k, v) {
				option += "<option value='" + v.ownership_id + "'>" + v.ownership_name + "</option>";
			});
			$("#owner").html(option).selectpicker('refresh');
		},
		error: function (jqXHR, textStatus, errorThrown) {
			errorHandler(jqXHR);
		}
	});
}

function filterPolygon(pamstat) {

	if (pamstat === undefined) { pamstat = null; }

	if (province || city) {
		loading();
		var form = pamstat == 'pamstatind' ? $("#formpamind")[0] : $("#formpamcustom")[0];
		var data = new FormData(form);
		data.append("province", province == null ? "" : province);
		data.append("district", city == null ? "" : city);
		data.append("pamstat", pamstat == null ? "" : pamstat);
		data.append("fillcolor", '#ee6e73');
		data.append("bordercolor", '#9c27b0');
		//loading();
		$.ajax({
			cache: false,
			type: 'POST',
			data: data,
			headers: { "Ip-Addr": IP, "token": "Bearer " + token },
			enctype: 'multipart/form-data',
			url: APIURL + 'data/areapolygon',
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,
			success: function (data) {
				loading(false);
				if (data.data.polygon) {
					create_polygon(data.data.polygon);
				}
				if (data.data.pam) {
					var dattab = [];
					cnt = '';
					no = 1;
					dat = data.data.pam;
					dat.sort(function (a, b) { return parseFloat(b.score) - parseFloat(a.score) });
					$.each(dat, function (k1, v1) {
						perdata = {
							"1": no,
							"2": v1['name'],
							"3": v1['level'],
							"4": v1['score'],
							"5": '<input type="checkbox" class="kecamatan" name="kec[]" value="' + v1['id'] + '">'
						};
						dattab.push(perdata);
						no++;
					})
					$('#pamlist').html(cnt);
					var colome = [{ data: "5" }, { data: "2" }, { data: "3" }, { data: "4" }]
					setTableContent('#pamlist', colome, dattab);
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
				loading(false);
			}
		});


	} else if (pamstat) {
		swal({
			title: "Error",
			text: "Filter Area harus diisi",
			type: "error",
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Close"
		});
	}
}

function setTableContent(idne, colome, datane) {
	if (!$.fn.DataTable.fnIsDataTable(idne)) {
	} else {
		$(idne).DataTable().destroy();
	}
	if (idne == '#archieve_del' || idne=='#request_del') {
		$(idne).DataTable({
			dom: 'Bfrtip',
			buttons: [
				'csv', 'excel'
			],
			responsive: true,
			columns: colome,
			lengthChange: false,
			data: datane
		});
	} else {
		$(idne).DataTable({
			responsive: true,
			columns: colome,
			lengthChange: false,
			data: datane
		});
	}

}

function errorHandler(jqXHR) {
	var strjson = JSON.parse(jqXHR.responseText);
	console.log(strjson)
	if (jqXHR.status != 500) {
		if (strjson.processStatus == 107) {
			window.location = "logout.html";
			console.log("Kampreet");
		} else {
			console.log("Internal Server Error");
			Swal({
				title: "Error",
				text: strjson.processMessage,
				type: "error",
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Close"
			});
		}
	} else {
		if (strjson.processMessage == 'user not logged in or session is expired') {
			window.location = "logout.html";
			console.log("user not logged in or session is expired");
		} else if (strjson.processMessage == 'unknown user') {

		} else {
			console.log("Internal Server Error");
		}
	}
}

function filterPoiSel(partype) {

	if (partype === undefined) { partype = null; }

	$.ajax({
		cache: false,
		type: 'GET',
		data: { "partype": partype, "province": province, "district": city },
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		url: APIURL + 'data/filterpoi',
		dataType: 'json',
		success: function (data) {
			if (typeof data != 'object') { data = $.parseJSON(data); }
			var optionsForPam = "";
			var optionsForPoi = "";
			var optionsForZoning = '<li class="dd-item" ><div class="dd-handle bg-primary ">Check / uncheck all<span class="pull-right"><input class="checkbox checkzoning" id="checkzoning" type="checkbox"  ></span></div></li>';

			$.each(data.data, function (k, v) {

				optionsForZoning += '<li class="dd-item" data-id="' + v.class_id + '"><div class="dd-handle">' + v.class_name + '<span class="pull-right"><input class="checkbox zoningsel" type="checkbox" value="' + v.class_id + '"></span></div></li>';
				optionsForPam += '<li class="dd-item" data-id="' + v.class_id + '"><div class="dd-handle">' + v.class_name + '<span class="pull-right"><input class="checkbox parpoi" id="parpoi_' + v.class_id + '" type="checkbox" value="' + v.class_id + '" ></span></div>';
				optionsForPoi += '<li class="dd-item" data-id="' + v.class_id + '"><div class="dd-handle">' + v.class_name + '<span class="pull-right"><input class="checkbox poipoint" id="poipoint_' + v.class_id + '" type="checkbox" value="' + v.class_id + '" ></span></div>';
				optionsForPam += '<ol class="dd-list" style="display: none;" id="listparpoi_' + v.class_id + '">';
				optionsForPoi += '<ol class="dd-list" style="display: none;" id="listpoipoint_' + v.class_id + '">';
				$.each(v.subclass, function (k1, v1) {
					optionsForPam += '<li class="dd-item" data-parent="' + v.class_id + '" data-id="' + v1.scpoid + '"><div class="dd-handle">' + v1.scpoiname + ' (' + v1.st_jml + ') <span class="pull-right"><input type="checkbox" name="pampoisel[]" class="checkbox poiselpam" value="' + v1.scpoid + '" ></span></div></li>';
					optionsForPoi += '<li class="dd-item" data-parent="' + v.class_id + '" data-id="' + v1.scpoid + '"><div class="dd-handle">' + v1.scpoiname + ' (' + v1.st_jml + ') <span class="pull-right"><input type="checkbox" name="poipoint[]" class="checkbox poipointsel" value="' + v1.scpoid + '" ></span></div></li>';
				});
				optionsForPam += '</ol>';
				optionsForPoi += '</ol>';
				optionsForPam += '</li>';
				optionsForPoi += '</li>';

				//fil_poipoint
				setTimeout(function () {
					$('#parpoi_' + v.class_id + '').click(function () {
						var checked = $(this).prop('checked');
						$('#listparpoi_' + v.class_id + '').find('input:checkbox').prop('checked', checked);
					});

					$('#poipoint_' + v.class_id + '').click(function () {
						var checked = $(this).prop('checked');
						$('#listpoipoint_' + v.class_id + '').find('input:checkbox').prop('checked', checked);
					});
				}, 500);


			});
			//fil_zoning
			$('#pam_poi').html('');
			$('#pam_poi').append(optionsForPam);

			$('#nestable-poi').nestable('destroy');
			$('#nestable-poi').nestable('init');

			$('#fil_poipoint').html('');
			$('#fil_poipoint').append(optionsForPoi);

			$('#fil_zoning').html('');
			$('#fil_zoning').append(optionsForZoning);

			$('#nestable-poipoint').nestable('destroy');
			$('#nestable-poipoint').nestable('init');

			$('#nestable-zoning').nestable('destroy');
			$('#nestable-zoning').nestable('init');

			$('#checkzoning').click(function () {
				var checked = $(this).prop('checked');
				$('#fil_zoning').find('input:checkbox').prop('checked', checked);
			});

			$('#checkzoning').click();


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
function filterType(page = 'all') {

	$.ajax({
		cache: false,
		type: 'GET',
		data: {},
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		url: APIURL + 'data/filtertype',
		dataType: 'json',
		success: function (data) {
			if (typeof data != 'object') { data = $.parseJSON(data); }
			var optionsAsString = "";
			if (data.data.length > 0) { $('#type').html('') }
			var option = "";
			if (page == 'oview') {
				option += "<option value=''>All Type</option>";
			}
			$.each(data.data, function (k, v) {
				option += "<option value='" + v.type_id + "'>" + v.type_name + "</option>";
			});
			$("#type").html(option).selectpicker('refresh');


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

function filterTypeSel(partype) {

	if (partype === undefined) { partype = null; }
	fromDate = $("#fromDate").val();
	toDate = $("#toDate").val();
	ownership = $("#owner").val();
	//console.log(ownership);

	$.ajax({
		cache: false,
		type: 'GET',
		data: { "partype": partype, "province": province, "district": city, "from": fromDate, "to": toDate, "ownership": ownership },
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		url: APIURL + 'data/filtertype',
		dataType: 'json',
		success: function (data) {
			if (typeof data != 'object') { data = $.parseJSON(data); }
			var optionsAsString = '<li class="dd-item" ><div class="dd-handle bg-primary">Check / uncheck all<span class="pull-right"><input class="checkbox" id="checkalltypeooh"  type="checkbox"></span></div></li>';
			if (data.data.length > 0) { $('#fil_type').html('') }
			$.each(data.data, function (k, v) {

				optionsAsString += '<li class="dd-item" data-id="' + v.type_id + '"><div class="dd-handle">' + v.type_name + ' (' + v.type_count + ')<span class="pull-right"><input class="checkbox typeooh" type="checkbox" value="' + v.type_id + '"></span></div></li>';

			});
			if (optionsAsString) {
				$('#fil_type').html('')
				$('#fil_type').append(optionsAsString);

				$('#nestable-type').nestable('destroy');
				$('#nestable-type').nestable('init');

				$('#checkalltypeooh').click(function () {
					var checked = $(this).prop('checked');
					$('#fil_type').find('input:checkbox').prop('checked', checked);
				});
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

function filterIndustry(page = 'all') {
	$.ajax({
		cache: false,
		type: 'GET',
		data: {},
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		url: APIURL + 'data/filterindustry',
		dataType: 'json',
		success: function (data) {
			if (typeof data != 'object') { data = $.parseJSON(data); }
			var optionsAsString = "";
			if (data.data.length > 0) { $('#industry').html('') }
			var option = "";
			if (page == 'oview') {
				option += "<option value=''>All Industry</option>";
			}
			$.each(data.data, function (k, v) {
				option += "<option value='" + v[0] + "'>" + v[1] + "</option>";
			});
			$("#industry").html(option).selectpicker('refresh');

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

function filterIndustrySel() {


	fromDate = $("#fromDate").val();
	toDate = $("#toDate").val();
	ownership = $("#owner").val();

	$.ajax({
		cache: false,
		type: 'GET',
		data: { "industry": null, 'pamstat': 1, "province": province, "district": city, "from": fromDate, "to": toDate, "ownership": ownership },
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		url: APIURL + 'data/filterindustry',
		dataType: 'json',
		success: function (data) {
			if (typeof data != 'object') { data = $.parseJSON(data); }
			var optionsAsString = "";
			if (data.data.length > 0) { $('#fil_industry').html('') }
			$.each(data.data, function (k, v) {

				optionsAsString += '<li class="dd-item" data-id="' + v.class_id + '"><div class="dd-handle">' + v.class_name + '<span class="pull-right"><input class="checkbox indusooh" id="indusooh_' + v.class_id + '" type="checkbox" value="' + v.class_id + '"></span></div>';
				optionsAsString += '<ol class="dd-list" style="display: none;"  id="listindusooh_' + v.class_id + '" >';
				$.each(v.subclass, function (k1, v1) {
					optionsAsString += '<li class="dd-item" data-parent="' + v.class_id + '" data-id="' + v1.scpoid + '"><div class="dd-handle">' + v1.scpoiname + ' (' + v1.adv_jml + ') <span class="pull-right"><input type="checkbox" name="advooh[]" class="checkbox advooh" value="' + v1.scpoid + '" ></span></div></li>';
				});
				optionsAsString += '</ol>';
				optionsAsString += '</li>';

				setTimeout(function () {
					$('#indusooh_' + v.class_id + '').click(function () {
						var checked = $(this).prop('checked');
						$('#listindusooh_' + v.class_id + '').find('input:checkbox').prop('checked', checked);
					});
				}, 300);


			});
			if (optionsAsString) {
				$('#fil_industry').html('')
				$('#fil_industry').append(optionsAsString);
				$('#nestable-industry').nestable('destroy');
				$('#nestable-industry').nestable('init');
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

function keyup_formatMoney(x) {
	console.log(x)
	var val = $(x).val().replace(/\D/g, '');
	var val = (val == '' ? 0 : val);
	// var val = ($(x).val()=='0' || $(x).val()=='' ?0:$(x).val().replace(/\D/g,''));
	// var val
	console.log(val)
	var n = parseInt(val, 10);
	$(x).val(n.toLocaleString());
}
