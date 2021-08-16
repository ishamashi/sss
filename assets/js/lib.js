// ----- base url -----   

var APIURL    = "http://192.168.20.135:8000/v1_test/";

var ERP_HOST = 'http://103.78.81.227/prisma/'; 
var APP_HOST = '192.168.20.135';

// Fungsi untuk session log out jika idle
(function() {
    var idleDurationSecs = 1800; // 30 Menit
    var redirectUrl = 'logout.html';  // Redirect idle users to this URL
    var idleTimeout;
  
    var resetIdleTimeout = function() {
      if(idleTimeout) clearTimeout(idleTimeout);
  
      idleTimeout = setTimeout(function(){
        location.href = redirectUrl
      }, idleDurationSecs * 1000);
    };
  
    resetIdleTimeout();
  
    ['click', 'touchstart', 'mousemove'].forEach(evt =>
      document.addEventListener(evt, resetIdleTimeout, false)
    );
  })();

// ----- local storage -----
var access_key  = localStorage.getItem('prisma_key');
var token_type = localStorage.getItem('prisma_token_type');
var token = localStorage.getItem('prisma_token');
var name = localStorage.getItem('prisma_name');
var prisma_level = localStorage.getItem('prisma_level');
var HOSTNAME  = window.location.hostname;
var IP        = localStorage.getItem('prisma_ip');

// ----- master variable -----
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var default_date = '1970-01-01';

var monthe = {
    '1' : 'Jan',
    '2' : 'Feb',
    '3' : 'Mar',
    '4' : 'Apr',
    '5' : 'Mei',
    '6' : 'Jun',
    '7' : 'Jul',
    '8' : 'Agt',
    '9' : 'Spt',
    '10' : 'Okt',
    '11' : 'Nov',
    '12' : 'Des',
}
var province = '';
var city = '';
var type = '';
var industry = '';
var fromDate = '';
var toDate = '';
var ownership = '';
var oohstatus = '';

// ----- global function -----
function loginReq(sessionid) {
    if (!token) //window.location = 'login.html';
    console.log(token)
}

function loginOut(sessionid) {
	if (sessionid) window.location = 'index.html';
}

function refreshLocalStorage() {
	localStorage.clear();
  	window.location = 'login.html';
}

function addDataOoh() {
	localStorage.removeItem('ooh_idx');
    localStorage.removeItem('provincex');
    localStorage.removeItem('districtx');
    localStorage.removeItem('addressx'); 
    localStorage.removeItem('industryx');   
    localStorage.removeItem('advertiserx');
    localStorage.removeItem('datex');
  	window.location = 'ooh-database-input.html';
}


function chklvl(){
    var excpt = localStorage.getItem('prisma_lvmn') ;
    if(excpt){
        arrex = excpt.split(',');
        $('[data-lv]').each(function(){
            var lvdat = $(this).data();
            if (arrex.indexOf(lvdat.lv) < 0){
                $(this).remove();
            }
        });
        var locate = location.pathname.split('/');
        var pathe  = locate[locate.length-1].split('.html')
        if (arrex.indexOf(pathe[0]) < 0 && pathe[0]!='login' && pathe[0]!='logout'){
            window.location = arrex[0]+".html";
        }
        
    }

    var excpt = localStorage.getItem('prisma_lvsd') ;
    if(excpt){
        arrex = excpt.split(',');
        $('[data-lvsd]').each(function(){
            var lvdat = $(this).data(); 
            //console.log(lvdat.lvsd);
            if (arrex.indexOf(lvdat.lvsd) < 0){
                $(this).hide();
            }
        });        
    }
}

function chkdel(lvsdne){
    var stat = false ;
    var excpt = localStorage.getItem('prisma_lvsd') ;
    if(excpt){
        arrex = excpt.split(',');
        $.each(arrex, function(k,v){
            if(v==lvsdne) stat = true ;  
        } ) 
    }
    return stat ;
}


function numberToMoney(number) {
    if(isNaN(number)){ return number }
    else if( number === null ){ return '0' }
    else { return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"); }
}

function moneyToNumber(string) {
  string = String(string);
  return parseInt(string.replace(/,/g,''));
}

function format_money(num) {
	return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g,"$1,");
}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
        if( n < 0) {
        negative = true;
      n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    if( negative ) {    
        n = (n * -1).toFixed(2);
    }
    return n;
}


function checkFileImg(e, type) {

    var file_list = e.files;
    var stat  = true;

    if(file_list){
        if(type == 'img'){
            for (var i = 0, file; file = file_list[i]; i++) {
                var sFileName = file.name;
                var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
                var iFileSize = file.size;
                var iConvert = (file.size / 1048576).toFixed(2);
                if (!(sFileExtension === "jpg" ||  sFileExtension === "jpeg") || iFileSize > 10485760) { 
                    stat = false ;
                }
            }
        }
        if(type == 'xls'){
            for (var i = 0, file; file = file_list[i]; i++) {
                var sFileName = file.name;
                var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
                var iFileSize = file.size;
                if (!(sFileExtension === "xls" ||  sFileExtension === "xlsx") || iFileSize > 20485760) { 
                    stat = false ;
                }
            }
        }
        if(type == 'zip'){
            for (var i = 0, file; file = file_list[i]; i++) {
                var sFileName = file.name;
                var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
                var iFileSize = file.size;
                if (!(sFileExtension === "zip") || iFileSize > 50485760) { 
                    stat = false ;
                }
            }
        }        
        if(type == 'kml'){
            for (var i = 0, file; file = file_list[i]; i++) {
                var sFileName = file.name;
                var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
                var iFileSize = file.size;
                if (!(sFileExtension === "kml") || iFileSize > 50485760) { 
                    stat = false ;
                }
            }
        }        

    }
    
    return stat;
}


function loading(stat=true){
    if(stat){
        $("#loadMe").modal({
            backdrop: "static", //remove ability to close modal with click
            keyboard: false, //remove option to close with keyboard
            show: true //Display loader!
          });
    }else{
        $("#loadMe").modal("hide");
    }
}

function ScrollZoom(container,max_scale,factor){
    var target = container.children().first()
    var size = {w:target.width(),h:target.height()}
    var pos = {x:0,y:0}
    var zoom_target = {x:0,y:0}
    var zoom_point = {x:0,y:0}
    var scale = 1
    target.css('transform-origin','0 0')
    target.on("mousewheel DOMMouseScroll",scrolled)

    function scrolled(e){
        var offset = container.offset()
        zoom_point.x = e.pageX - offset.left
        zoom_point.y = e.pageY - offset.top

        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        if (delta === undefined) {
          //we are on firefox
          delta = e.originalEvent.detail;
        }
        delta = Math.max(-1,Math.min(1,delta)) // cap the delta to [-1,1] for cross browser consistency

        // determine the point on where the slide is zoomed in
        zoom_target.x = (zoom_point.x - pos.x)/scale
        zoom_target.y = (zoom_point.y - pos.y)/scale

        // apply zoom
        scale += delta*factor * scale
        scale = Math.max(1,Math.min(max_scale,scale))

        // calculate x and y based on zoom
        pos.x = -zoom_target.x * scale + zoom_point.x
        pos.y = -zoom_target.y * scale + zoom_point.y


        // Make sure the slide stays in its container area when zooming out
        if(pos.x>0)
            pos.x = 0
        if(pos.x+size.w*scale<size.w)
            pos.x = -size.w*(scale-1)
        if(pos.y>0)
            pos.y = 0
         if(pos.y+size.h*scale<size.h)
            pos.y = -size.h*(scale-1)

        update()
    }

    function update(){
        target.css('transform','translate('+(pos.x)+'px,'+(pos.y)+'px) scale('+scale+','+scale+')')
    }
}

function printElement(elem, append, delimiter) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");
 

    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }

    if (append !== true) {
        $printSection.innerHTML = "";
    }
    else if (append === true) {
        if (typeof(delimiter) === "string") {
            $printSection.innerHTML += delimiter;
        }
        else if (typeof(delimiter) === "object") {
            $printSection.appendChlid(delimiter);
        }
    }

    $printSection.appendChild(domClone);

    //console.log($printSection);

    var host = APP_HOST;     
    //var host = 'https://prisma.oxide.co.id/';     
    var mywindow = window.open('', 'new div', 'height=960px,width=1028px');
    mywindow.document.write('<html><head><title>Print OOH Site</title>');
    mywindow.document.write('<link href="'+host+'assets/css/jquery-ui.min.css" rel="stylesheet"/>');
    //mywindow.document.write('<link href="'+host+'assets/plugins/uniform/css/uniform.default.min.css" rel="stylesheet"/>');
    mywindow.document.write('<link href="'+host+'assets/css/bootstrap-grid.min.css" rel="stylesheet"/>');
    //mywindow.document.write('<link href="'+host+'assets/plugins/fontawesome/css/font-awesome.css" rel="stylesheet"/>');
    //mywindow.document.write('<link href="'+host+'assets/css/modern.min.css" rel="stylesheet"/>');
    mywindow.document.write('<link href="'+host+'assets/css/print.css" rel="stylesheet"/>');
    mywindow.document.write('</head><body style="background-color:white;" >');
    mywindow.document.write($printSection.outerHTML);
    mywindow.document.write('<script src="'+host+'assets/plugins/jquery/jquery-2.1.3.min.js"></script>');
    //mywindow.document.write('<script src="'+host+'assets/plugins/jquery-ui/jquery-ui.min.js"></script>');
    //mywindow.document.write('<script src="'+host+'assets/plugins/pace-master/pace.min.js"></script>');
    //mywindow.document.write('<script src="'+host+'assets/plugins/jquery-blockui/jquery.blockui.js"></script>');
    //mywindow.document.write('<script src="'+host+'assets/plugins/bootstrap/js/bootstrap.min.js"></script>');
    //mywindow.document.write('<script src="'+host+'assets/plugins/jquery-slimscroll/jquery.slimscroll.min.js"></script>');
    //mywindow.document.write('<script src="'+host+'assets/plugins/switchery/switchery.min.js"></script>');
    //mywindow.document.write('<script src="'+host+'assets/plugins/uniform/jquery.uniform.min.js"></script>');
    mywindow.document.write('<script src="'+host+'assets/plugins/wheelzoom.js"></script>'); 
    mywindow.document.write('<script>$( document ).ready(function() { $(".imgtoprint").removeClass(\'hide\'); $(".wheelzoom").addClass(\'no-print\');  wheelzoom(document.querySelectorAll(\'.imgtoprint\')); /*setTimeout(function(){window.print();},2000);*/});</script>');
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus(); 
    
    //mywindow.close();
}

function storeFilterCache(province = 0,city = 0,type = 0,industry = 0,
    fromDate = null,toDate = null ,status = 0, owner = 'All'){
    localStorage.setItem('filter_prov', province); 
	localStorage.setItem('filter_city', city); 
	localStorage.setItem('filter_type', type); 
	localStorage.setItem('filter_industry', industry); 
	localStorage.setItem('filter_fromdate', fromDate); 
	localStorage.setItem('filter_todate', toDate); 
	localStorage.setItem('filter_status', status); 
	localStorage.setItem('filter_owner', owner);  
}

function loadFilter(triggered = true){
    f_prov = localStorage.getItem('filter_prov');
    f_city = localStorage.getItem('filter_city');
    f_type = localStorage.getItem('filter_type');
    f_ind = localStorage.getItem('filter_industry');
    f_fdate = localStorage.getItem('filter_fromdate');
    f_tdate = localStorage.getItem('filter_todate');
    f_status = localStorage.getItem('filter_status');
    f_owner = localStorage.getItem('filter_owner');

    
    var prov = function() {
        var defer = $.Deferred();
        if($("#province").length == 0) {
            //do nothing
        }
        else {
            console.log('Filter Prov Checked ->'+f_prov);
            if (f_prov != null ) $('#province').val(f_prov).change();
        }
    
        setTimeout(function() {
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
        }, 500);
    
        return defer;
    };

    var city = function() {
        var defer = $.Deferred();
        
        if($("#city").length == 0) {
            //do nothing
        }
        else {
            console.log('Filter City Checked  ->'+f_city);
            if (f_city != null ) $('#city').val(f_city).change();
        }
    
        setTimeout(function() {
            $('.modal-backdrop').remove();
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
        }, 500);
    
        return defer;
    };

    var type = function() {
        var defer = $.Deferred();
        if($("#type").length == 0) {
            //do nothing
        }
        else {
            console.log('Filter Type Checked');
            if (f_type > 0 ) $('#type').val(f_type).change();
        }
    
        setTimeout(function() {
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
        }, 500);
    
        return defer;
    };

    var industry = function() {
        var defer = $.Deferred();
        
        if($("#industry").length == 0) {
            //do nothing
        }
        else {
            console.log('Filter Industry Checked');
            if (f_ind > 0 ) $('#industry').val(f_ind).change();
        }
    
        setTimeout(function() {
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
        }, 500);
    
        return defer;
    };

    var owner = function() {
        var defer = $.Deferred();
        
        if($("#owner").length == 0) {
            //do nothing
        }
        else {
            console.log('Filter Owner Checked');
            if (f_owner == 'All' ) { $('#owner').change(); console.log('owner changed'); }
            if (f_owner != 'All' ) { $('#owner').val(f_owner).change(); console.log('owner changed'); }
        }
    
        setTimeout(function() {
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
        }, 500);
    
        return defer;
    };

    var status = function() {
        var defer = $.Deferred();
        
        if($("#status_ooh").length == 0) {
            //do nothing
        }
        else {
            console.log('Filter Status Checked');
            if (f_status > 0 ) $('#status_ooh').val(f_status).change();
        }
    
        setTimeout(function() {
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
        }, 500);
    
        return defer;
    };

    var fDate = function() {
        var defer = $.Deferred();
        
        if($("#fromDate").length == 0) {
            //do nothing
        }
        else {
            console.log('Filter fromDate Checked');
            if (f_fdate != null ) $('#fromDate').val(f_fdate).change();
        }
    
        setTimeout(function() {
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
        }, 500);
    
        return defer;
    };

    var tDate = function() {
        var defer = $.Deferred();
        
        if($("#toDate").length == 0) {
            //do nothing
        }
        else {
            console.log('Filter toDate Checked');
            if (f_tdate != null ) $('#toDate').val(f_tdate).change();
        }
    
        setTimeout(function() {
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
        }, 500);
    
        return defer;
    };

    var search = function() {
        var defer = $.Deferred();
        if($("#search").length == 0) {
            //do nothing
        }
        else {
            $('#search').click();
        }
        
    
        setTimeout(function() {
            defer.resolve(); // When this fires, the code in a().then(/..../); is executed.
            
        }, 500);
    
        return defer;
    };

    if(triggered){
        prov().then(city).then(type).then(industry).then(owner).then(status).then(fDate).then(tDate).then(search);
    }else {
        prov().then(city).then(type).then(industry).then(owner).then(status).then(fDate).then(tDate);
    }
    

    
}

chklvl();
setTimeout(function() {
    loadFilter(false);    
},2000);
