$(function() {

     

    var uiElements = function(){

         
        
        // Start Smart Wizard
        var uiSmartWizard = function(){
            
            if($(".wizard").length > 0){
                
                //Check count of steps in each wizard
                $(".wizard > ul").each(function(){
                    $(this).addClass("steps_"+$(this).children("li").length);
                });//end
                
                // This par of code used for example
                if($("#wizard-validation").length > 0){
                    
                    var validator = $("#wizard-validation").validate({
                            rules: {
                                login: {
                                    required: true,
                                    minlength: 2,
                                    maxlength: 8
                                },
                                password: {
                                    required: true,
                                    minlength: 5,
                                    maxlength: 10
                                },
                                repassword: {
                                    required: true,
                                    minlength: 5,
                                    maxlength: 10,
                                    equalTo: "#password"
                                },
                                email: {
                                    required: true,
                                    email: true
                                },
                                name: {
                                    required: true,
                                    maxlength: 10
                                },
                                adress: {
                                    required: true
                                }
                            }
                        });
                        
                }// End of example
                
                $(".wizard").smartWizard({                        
                    // This part of code can be removed FROM
                    onLeaveStep: function(obj){
                        var wizard = obj.parents(".wizard");

                        if(wizard.hasClass("wizard-validation")){
                            
                            var valid = true;
                            
                            $('input,textarea',$(obj.attr("href"))).each(function(i,v){
                                valid = validator.element(v) && valid;
                            });
                                                        
                            if(!valid){
                                wizard.find(".stepContainer").removeAttr("style");
                                validator.focusInvalid();                                
                                return false;
                            }         
                            
                        }    
                        
                        return true;
                    },// <-- TO
                    
                    //This is important part of wizard init
                    onShowStep: function(obj){                        
                        var wizard = obj.parents(".wizard");

                        if(wizard.hasClass("show-submit")){
                        
                            var step_num = obj.attr('rel');
                            var step_max = obj.parents(".anchor").find("li").length;

                            if(step_num == step_max){                             
                                obj.parents(".wizard").find(".actionBar .btn-primary").css("display","block");
                            }                         
                        }
                        return true;                         
                    }//End
                });
            }            
            
        }// End Smart Wizard 
       
        return {
            init: function(){ 
                uiSmartWizard(); 
            }
        }
        
    }();

    var templatePlugins = function(){
        
        var tp_clock = function(){
            
            function tp_clock_time(){
                var now     = new Date();
                var hour    = now.getHours();
                var minutes = now.getMinutes();                    
                
                hour = hour < 10 ? '0'+hour : hour;
                minutes = minutes < 10 ? '0'+minutes : minutes;
                
                $(".plugin-clock").html(hour+"<span>:</span>"+minutes);
            }
            if($(".plugin-clock").length > 0){
                
                tp_clock_time();
                
                window.setInterval(function(){
                    tp_clock_time();                    
                },10000);
                
            }
        }
        
        var tp_date = function(){
            
            if($(".plugin-date").length > 0){
                
                var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                        
                var now     = new Date();
                var day     = days[now.getDay()];
                var date    = now.getDate();
                var month   = months[now.getMonth()];
                var year    = now.getFullYear();
                
                $(".plugin-date").html(day+", "+month+" "+date+", "+year);
            }
            
        }
        
        return {
            init: function(){
                tp_clock();
                tp_date();
            }
        }
    }();
    
    var fullCalendar = function(){
            
        var calendar = function(){
            
            if($("#calendar").length > 0){
                
                function prepare_external_list(){
                    
                    $('#external-events .external-event').each(function() {
                            var eventObject = {title: $.trim($(this).text())};

                            $(this).data('eventObject', eventObject);
                            $(this).draggable({
                                    zIndex: 999,
                                    revert: true,
                                    revertDuration: 0
                            });
                    });                    
                    
                }
                
                
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();

                prepare_external_list();

                var calendar = $('#calendar').fullCalendar({
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    editable: true,
                    eventSources: {url: "assets/ajax_fullcalendar.php"},
                    droppable: true,
                    selectable: true,
                    selectHelper: true,
                    select: function(start, end, allDay) {
                        var title = prompt('Event Title:');
                        if (title) {
                            calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                            true
                            );
                        }
                        calendar.fullCalendar('unselect');
                    },
                    drop: function(date, allDay) {

                        var originalEventObject = $(this).data('eventObject');

                        var copiedEventObject = $.extend({}, originalEventObject);

                        copiedEventObject.start = date;
                        copiedEventObject.allDay = allDay;

                        $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);


                        if ($('#drop-remove').is(':checked')) {
                            $(this).remove();
                        }

                    }
                });
                
                $("#new-event").on("click",function(){
                    var et = $("#new-event-text").val();
                    if(et != ''){
                        $("#external-events").prepend('<a class="list-group-item external-event">'+et+'</a>');
                        prepare_external_list();
                    }
                });
                
            }            
        }
        
        return {
            init: function(){
                calendar();
            }
        }
    }();
     
    uiElements.init();
    templatePlugins.init();    
    
    fullCalendar.init();
    
    /* My Custom Progressbar */
    $.mpb = function(action,options){

        var settings = $.extend({
            state: '',            
            value: [0,0],
            position: '',
            speed: 20,
            complete: null
        },options);

        if(action == 'show' || action == 'update'){
            
            if(action == 'show'){
                $(".mpb").remove();
                var mpb = '<div class="mpb '+settings.position+'">\n\
                               <div class="mpb-progress'+(settings.state != '' ? ' mpb-'+settings.state: '')+'" style="width:'+settings.value[0]+'%;"></div>\n\
                           </div>';
                $('body').append(mpb);
            }
            
            var i  = $.isArray(settings.value) ? settings.value[0] : $(".mpb .mpb-progress").width();
            var to = $.isArray(settings.value) ? settings.value[1] : settings.value;            
            
            var timer = setInterval(function(){
                $(".mpb .mpb-progress").css('width',i+'%'); i++;
                
                if(i > to){
                    clearInterval(timer);
                    if($.isFunction(settings.complete)){
                        settings.complete.call(this);
                    }
                }
            }, settings.speed);

        }

        if(action == 'destroy'){
            $(".mpb").remove();
        }                
        
    }
    /* Eof My Custom Progressbar */
    
    
    // New selector case insensivity        
     $.expr[':'].containsi = function(a, i, m) {
         return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
     };              
});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};