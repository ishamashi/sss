$(function(){
	$('#register').click(function(e){
		e.preventDefault();
		var data = new FormData();
		data.append("username", $('#username').val());
		data.append("password", $('#password').val());
		$.ajax({
			url: APIURL + "user/register",
			type: "POST",
			enctype: 'multipart/form-data',
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			timeout: 600000,
			success:function(data, textStatus, jqXHR) {
				Swal({
					title: "Berhasil",
					text: 'Pendaftaran Akun Berhasil Di Lakukan, Silahkan Login Dengan Username Password Yang Anda Input',
					type: "success",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Close"
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
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