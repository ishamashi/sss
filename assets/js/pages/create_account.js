<<<<<<< HEAD
var parameters = location.search.substring(1);

var params = new URLSearchParams(parameters);
var getToken = params.get('ac');

jQuery.validator.addMethod("noSpace", function (value, element) {
	return value.indexOf(" ") < 0 && value != "";
}, "No space please and don't leave it empty");

jQuery.validator.addMethod("hasNumber", function(value, element) {
	return this.optional(element) || /\d/.test(value);
}, "Must contain a number.");

$.validator.addMethod("hasUppercase", function(value, element) {
	if (this.optional(element)) {
		return true;
	}
    return /[A-Z]/.test(value);
}, "Must contain uppercase");

$('#confirmForm').validate({
	rules: {
		username: {
			required: true,
			noSpace: true,
		},
		password: {
			required: true,
			minlength: 6,
			hasNumber: true,
			hasUppercase: true,
		},
		confirmation_password: {
			required: true,
			equalTo: '#password'
		}
	}
});

$('#confirmation').on('click', async () => {
	var form = $("#confirmForm")[0];
	if (!form.checkValidity()) return alert('Harap lengkapi form !');
	if(!$('#confirmForm').validate().checkForm()) return alert('Harap periksa kembali isi form !');
	// console.log();

	var data = {
		username: $('#username').val(),
		password: $('#password').val(),
		komfirmasi_password: $('#confirmation_password').val(),
		token: getToken,
	}
	var confirmation = await confirmationEmail(data).catch((err) => {
		return {
			code: err.code,
			data: err.data
		}
	});
	console.log("CONFIR", confirmation);
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
=======
var parameters = location.search.substring(1);

var params = new URLSearchParams(parameters);
var getToken = params.get('ac');

jQuery.validator.addMethod("noSpace", function (value, element) {
	return value.indexOf(" ") < 0 && value != "";
}, "No space please and don't leave it empty");

jQuery.validator.addMethod("hasNumber", function(value, element) {
	return this.optional(element) || /\d/.test(value);
}, "Must contain a number.");

$.validator.addMethod("hasUppercase", function(value, element) {
	if (this.optional(element)) {
		return true;
	}
    return /[A-Z]/.test(value);
}, "Must contain uppercase");

$('#confirmForm').validate({
	rules: {
		username: {
			required: true,
			noSpace: true,
		},
		password: {
			required: true,
			minlength: 6,
			hasNumber: true,
			hasUppercase: true,
		},
		confirmation_password: {
			required: true,
			equalTo: '#password'
		}
	}
});

$('#confirmation').on('click', async () => {
	var form = $("#confirmForm")[0];
	if (!form.checkValidity()) return alert('Harap lengkapi form !');
	if(!$('#confirmForm').validate().checkForm()) return alert('Harap periksa kembali isi form !');
	// console.log();

	var data = {
		username: $('#username').val(),
		password: $('#password').val(),
		komfirmasi_password: $('#confirmation_password').val(),
		token: getToken,
	}
	var confirmation = await confirmationEmail(data).catch((err) => {
		return {
			code: err.code,
			data: err.data
		}
	});
	console.log("CONFIR", confirmation);
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
>>>>>>> 95d280c2288956db0e5353cc11c20b8312a68803
})();