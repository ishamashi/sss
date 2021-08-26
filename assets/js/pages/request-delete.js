$(document).ready(function () {

	filterArea();
	filterType('oview');
	filterIndustry('oview');
	filterOwnership();
	getRequestDelete(false);
	getArchieveDelete();

});

$('#search').on('click', function () {
	getRequestDelete(true);
});

function getRequestDelete(is_search) {
	var highlight = 'PRISMA';
	if(is_search)
	{
		var area = $("#province").val();
		// var area = 3217;
		var industry = $("#industry").val();
		var owner = $("#owner").val();
		var type = $("#type").val();
		var parameter = 'data/reqtodel?area=' + area + '&owner=' + owner + '&type=' + type + '&industry=' + industry;
	}else{
		var parameter = 'data/reqtodel';
	}

	$.ajax({
		cache: false,
		type: 'GET',
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		url: APIURL + parameter,
		dataType: 'json',
		success: function (data) {
			var dattab = [];
			var no = 1;
			$.each(data.data, function (k, v) {
				perdata = {
					"1": v[4]==highlight?'<font color="red">'+no+'</font>':no, 
					"2": v[4]==highlight?'<font color="red">'+v[1]+'</font>':v[1], 
					"3": v[4]==highlight?'<font color="red">'+v[3]+'</font>':v[3], 
					"4": v[4]==highlight?'<font color="red">'+v[2]+'</font>':v[2], 
					"5": v[4]==highlight?'<font color="red">'+v[5]+'</font>':v[5], 
					"6": v[4]==highlight?'<font color="red">'+v[7]+'</font>':v[7], 
					"7": v[4]==highlight?'<font color="red">'+v[6]+'</font>':v[6],
					"8": v[4]==highlight?'<font color="red">'+v[8]+'</font>':v[8],  
					"9": '<button class="btn btn-success btn-rounded" title="Approve" onclick="approval(\'' + v[0] + '\', \'a\', \'' + v[6] + '\')"><span class="fa fa-check" ></span></button>' +
						'&nbsp;&nbsp;<button class="btn btn-danger btn-rounded" title="Reject" onclick="approval(\'' + v[0] + '\', \'r\', \'' + v[6] + '\')"><span class="fa fa-times"></span></button>'
				};
				dattab.push(perdata);
				no++;
			});
			var colome = [{ data: "1" }, { data: "2" }, { data: "3" }, { data: "4" }, { data: "5" }, { data: "6" }, { data: "7" }, { data: "8"}, { data: "9"},]
			setTableContent('#request_del', colome, dattab);

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

function getArchieveDelete() {
	var highlight = 'PRISMA';
	$.ajax({
		cache: false,
		type: 'GET',
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		url: APIURL + 'data/archivedel',
		dataType: 'json',
		success: function (data) {
			var dattab = [];
			var no = 1;
			$.each(data.data, function (k, v) {
				perdata = {
					"1": v[4]==highlight?'<font color="red">'+no+'</font>':no, 
					"2": v[4]==highlight?'<font color="red">'+v[1]+'</font>':v[1], 
					"3": v[4]==highlight?'<font color="red">'+v[3]+'</font>':v[3],
					"4": v[4]==highlight?'<font color="red">'+v[2]+'</font>':v[2],
					"5": v[4]==highlight?'<font color="red">'+v[5]+'</font>':v[5],
					"6": v[4]==highlight?'<font color="red">'+v[7]+'</font>':v[7],
					"7": v[4]==highlight?'<font color="red">'+v[6]+'</font>':v[6],
					"8": v[4]==highlight?'<font color="red">'+v[13]+'</font>':v[13],
					"9": v[9]==1?'Approve':'Reject',
					// "9": '<button class="btn btn-success btn-rounded" title="Rollback" onclick="rollback(\'' + v[0] + '\', \'true\')"><span class="fa fa-history" ></span></button>'
					"10": v[8]<=3600?'<button class="btn btn-success btn-rounded" title="Rollback" onclick="rollback(\'' + v[0] + '\', \'true\', \'' + v[6] + '\')"><span class="fa fa-history" ></span></button>':'-'
				};
				dattab.push(perdata);
				no++;
			});
			var colome = [{ data: "1"}, { data: "2"}, { data: "3" }, { data: "4" }, { data: "5" }, { data: "6" }, { data: "7" },  { data: "8" }, { data: "9" }, { data: "10" }]
			setTableContent('#archieve_del', colome, dattab);

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

function approval(oid, type,createat) {
	if (type == 'r') {
		var teks = 'Menolak';
	} else {
		var teks = 'Menyetujui';
	}
	swal({
		title: "Warning",
		html: "Apakah anda yakin untuk " + teks + " Permintaan Hapus Titik Ini ?",
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes",
		confirmButtonColor: "#ec6c62"
	}).then(function (isConfirm) {
		if (isConfirm.value) {
			confirmed(oid, type)
		}
	});
}

function rollback(oid, type) {
	swal({
		title: "Warning",
		html: "Apakah anda yakin untuk mengembalikan data ini ke request ?",
		type: "warning",
		showCancelButton: true,
		confirmButtonText: "Yes",
		confirmButtonColor: "#ec6c62"
	}).then(function (isConfirm) {
		if (isConfirm.value) {
			confirmedArchieve(oid, type)
		}
	});
}

function confirmed(oid, type,createat) {
	$.ajax({
		url: APIURL + "data/reqtodel?action="+type+"&oid="+oid+"&createdat='"+createat+"'",
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		data : {'action' : type, 'oid' : oid},
		type: "POST",
		success: function (data, textStatus, jqXHR) {
			var result = data.data;
			if (result==1) {
				swal({
					title: "Success!",
					text: "Data Submitted",
					type: "success",
					confirmButtonText: "OK"
				});
			} else {
				swal({
					title: "Error!",
					text: data.processMessage,
					type: "error",
					confirmButtonText: "OK"
				});
			}
			getRequestDelete();
			getArchieveDelete();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			if (jqXHR.status != 500) {
				var strjson = JSON.parse(jqXHR.responseText);
				swal({
					title: "Error",
					text: strjson.processMessage,
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Close"
				});
			} else {
				swal({
					title: "Error",
					text: "Internal Server Error",
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Close"
				}, function () {
					// location.reload();
				});
			}
		}
	});
}


function confirmedArchieve(oid, type,createat) {
	$.ajax({
		url: APIURL + "data/archivedel?action="+type+"&oid="+oid+"&createdat='"+createat+"'",
		headers: { "Ip-Addr": IP, "token": "Bearer " + token },
		data : {'action' : type, 'oid' : oid},
		type: "POST",
		success: function (data, textStatus, jqXHR) {
			// alert(data);
			var result = data.data;
			if (result==1) {
				swal({
					title: "Success!",
					text: "Data Submitted",
					type: "success",
					confirmButtonText: "OK"
				});
			} else {
				swal({
					title: "Error!",
					text: data.processMessage,
					type: "error",
					confirmButtonText: "OK"
				});
			}
			getArchieveDelete();
			getRequestDelete();
		},
		error: function (jqXHR, textStatus, errorThrown) {
			if (jqXHR.status != 500) {
				var strjson = JSON.parse(jqXHR.responseText);
				swal({
					title: "Error",
					text: strjson.processMessage,
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Close"
				});
			} else {
				swal({
					title: "Error",
					text: "Internal Server Error",
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Close"
				}, function () {
					// location.reload();
				});
			}
		}
	});
}