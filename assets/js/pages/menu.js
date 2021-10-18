<<<<<<< HEAD
"use strict"

var timeup = false;

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function checkLogin(token) {
    if (token === null) return window.location.href = 'login.html';
    $('#username').html(localStorage.getItem('prisma_name'));
    var parsingToken = parseJwt(token);
    checkLayanan(parsingToken);
}

async function checkLayanan(token) {
    console.log("Token", token);
    if (token.usr_level !== 1) return;

    var dataLayanan = await getDataLayanan(token.usr_id).catch(err => {
        return err.responseJSON;
    });

    if (dataLayanan.data.length > 0 && parseInt(dataLayanan.processStatus) === 0) {
        var filterData = dataLayanan.data.find((item) => item.status === 'A');
        console.log(filterData);
        if (typeof filterData !== 'undefined') {
            $('#masaAktif').attr('data-startdate', filterData.end_date);
            var getTimer = diffDates(filterData.end_date);
            if (getTimer.separate.days < 3) $('#masaAktif').removeClass('hide');

        } else {
            disabledBox();
            $('#masaAktif').removeClass('hide');
            timeup = true;
            $('#masaAktif').html(`Masa aktif anda telah habis`);
        }
    } else {
        disabledBox();
        timeup = true;
        $('#masaAktif').html(`Masa aktif anda telah habis`);
    }
}

function disabledBox() {
    $('#menuOOHDashboard').attr('href', 'javascript:void(0)');
    $('#disabledBox').addClass('disabled-box');
    $('#fontColorStatus').css('color', '#979797');
}

function getDataLayanan(userid) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: APIURL + `user/layanan?u_id=${userid}`,
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            type: "GET",
            cache: false,
            success: function (data, textStatus, jqXHR) {
                resolve(data);
            },
            error: function (err, textStatus, errorThrown) {
                console.log(err);
                reject(err);
            }
        })
    })
}

function diffDates(end, start = '') {
    var now = moment();
    var end = moment(end);
    var duration = moment.duration(end.diff(now));

    //Get Days and subtract from duration
    var days = duration.asDays();
    duration.subtract(moment.duration(days, 'days'));

    //Get hours and subtract from duration
    var hours = duration.hours();
    duration.subtract(moment.duration(hours, 'hours'));

    //Get Minutes and subtract from duration
    var minutes = duration.minutes();
    duration.subtract(moment.duration(minutes, 'minutes'));

    //Get seconds
    var seconds = duration.seconds();
    return {
        times: `${Math.round(days)}d, ${hours}h ${minutes}m ${seconds}s`,
        separate: {
            days: Math.round(days),
            hours,
            minutes,
            seconds
        }
    }
}

checkLogin(token);

var userLevel = localStorage.getItem("prisma_level");

if (parseInt(userLevel) === 1) {
    setInterval(() => {
        if (!timeup) {
            var data = $('#masaAktif').data('startdate');
            var getTimer = diffDates(data);
            $('#masaAktif').html(`Masa aktif anda tersisa: ${getTimer.times}`);
        }
    }, 1000);
=======
"use strict"

var timeup = false;

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function checkLogin(token) {
    if (token === null) return window.location.href = 'login.html';
    $('#username').html(localStorage.getItem('prisma_name'));
    var parsingToken = parseJwt(token);
    checkLayanan(parsingToken);
}

async function checkLayanan(token) {
    console.log("Token", token);
    if (token.usr_level !== 1) return;

    var dataLayanan = await getDataLayanan(token.usr_id).catch(err => {
        return err.responseJSON;
    });

    if (dataLayanan.data.length > 0 && parseInt(dataLayanan.processStatus) === 0) {
        var filterData = dataLayanan.data.find((item) => item.status === 'A');
        console.log(filterData);
        if (typeof filterData !== 'undefined') {
            $('#masaAktif').attr('data-startdate', filterData.end_date);
            var getTimer = diffDates(filterData.end_date);
            if (getTimer.separate.days < 3) $('#masaAktif').removeClass('hide');

        } else {
            disabledBox();
            $('#masaAktif').removeClass('hide');
            timeup = true;
            $('#masaAktif').html(`Masa aktif anda telah habis`);
        }
    } else {
        disabledBox();
        timeup = true;
        $('#masaAktif').html(`Masa aktif anda telah habis`);
    }
}

function disabledBox() {
    $('#menuOOHDashboard').attr('href', 'javascript:void(0)');
    $('#disabledBox').addClass('disabled-box');
    $('#fontColorStatus').css('color', '#979797');
}

function getDataLayanan(userid) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: APIURL + `user/layanan?u_id=${userid}`,
            headers: { "Ip-Addr": IP, "token": "Bearer " + token },
            type: "GET",
            cache: false,
            success: function (data, textStatus, jqXHR) {
                resolve(data);
            },
            error: function (err, textStatus, errorThrown) {
                console.log(err);
                reject(err);
            }
        })
    })
}

function diffDates(end, start = '') {
    var now = moment();
    var end = moment(end);
    var duration = moment.duration(end.diff(now));

    //Get Days and subtract from duration
    var days = duration.asDays();
    duration.subtract(moment.duration(days, 'days'));

    //Get hours and subtract from duration
    var hours = duration.hours();
    duration.subtract(moment.duration(hours, 'hours'));

    //Get Minutes and subtract from duration
    var minutes = duration.minutes();
    duration.subtract(moment.duration(minutes, 'minutes'));

    //Get seconds
    var seconds = duration.seconds();
    return {
        times: `${Math.round(days)}d, ${hours}h ${minutes}m ${seconds}s`,
        separate: {
            days: Math.round(days),
            hours,
            minutes,
            seconds
        }
    }
}

checkLogin(token);

var userLevel = localStorage.getItem("prisma_level");

if (parseInt(userLevel) === 1) {
    setInterval(() => {
        if (!timeup) {
            var data = $('#masaAktif').data('startdate');
            var getTimer = diffDates(data);
            $('#masaAktif').html(`Masa aktif anda tersisa: ${getTimer.times}`);
        }
    }, 1000);
>>>>>>> 95d280c2288956db0e5353cc11c20b8312a68803
}