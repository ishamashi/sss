var parameters = location.search.substring(1);

var params = new URLSearchParams(parameters);
var getToken = params.get('ac');
console.log({ params, getToken, parameters });

$('#confirmation').on('click', async () => {
	var form = $("#confirmForm")[0];
	if (!form.checkValidity()) return alert('Harap lengkapi form !');
	console.log(form);

	var data = {
		username: $('#username').val(),
		password: $('#password').val(),
		token: getToken,
	}

	var confirmation = await confirmationEmail(data).catch((err) => {
		return {
			code: err.code,
			data: err.data
		}
	});

	if (confirmation.code === 200) {
		swal({
			title: "Success",
			text: confirmation.processMessage,
			type: "success",
			confirmButtonText: "OK"
		});
		setTimeout(() => {
			window.location = "login.html";
		}, 1000);
	} else {
		swal({
			title: "Error",
			text: confirmation.data.processMessage,
			type: "error",
			confirmButtonColor: "#DD6B55",
			confirmButtonText: "Close"
		});
	}
});

function confirmationEmail({ username, password, token }) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: APIURL + `user/activator?u_login=${username}&u_passw=${password}&ac=${token}`,
			type: "POST",
			contentType: "application/json",
			dataType: 'json',
			processData: false,
			cache: false,
			timeout: 600000,
			success: function (result, textStatus, xhr) {
				console.log("RESULT", result);
				resolve({ code: xhr.status, data: result.responseJSON });
			},
			error: function (err, textStatus, xhr) {
				console.error(err);
				reject({ code: err.status, data: err.responseJSON });
			}
		});
	})
}

(function () {
	if (getToken === null) {
		window.location = "logout.html";
	}
})();