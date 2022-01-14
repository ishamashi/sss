$(function () {
	$('#login').click(function (e) {
		e.preventDefault();
		var data = new FormData();
		data.append("username", $('#username').val());
		data.append("password", $('#password').val());
		$.ajax({
			url: APIURL + "user/login",
			type: "POST",
			enctype: 'multipart/form-data',
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,
			success: function (data, textStatus, jqXHR) {
				if (data.processStatus == '0') {
					localStorage.setItem('prisma_token_type', data.data.prisma_token_type);
					localStorage.setItem('prisma_token', data.data.prisma_token)
					localStorage.setItem('prisma_name', data.data.prisma_name);
					localStorage.setItem('prisma_lvmn', data.data.prisma_lvmn);
					localStorage.setItem('prisma_lvsd', data.data.prisma_lvsd);
					localStorage.setItem('prisma_level', data.data.prisma_level);
					(async function(){
						let version = await getDataVersion(data.data.prisma_token_type, data.data.prisma_token).catch(err => err);
						console.log(version);
						if(localStorage.getItem('version') == null && version.processMessage === 'Success'){
							localStorage.setItem('version', version.data[0].version);
						}
						window.location = "menu.html";
					})();
				} else {
					console.log(data)
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				var strjson = JSON.parse(jqXHR.responseText);
				Swal({
					title: "Error",
					text: strjson.processMessage,
					type: "error",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Close"
				});
			}
		});
	});
});

function getDataVersion(token_type, token) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: APIURL + "data/version",
			headers: {
				"token": token_type + " " + token
			},
			type: "GET",
			contentType: "application/json",
			dataType: 'json',
			success: function (result) {
				resolve(result);
			},
			error: function (err) {
				reject(err);
			}
		});
	});
}