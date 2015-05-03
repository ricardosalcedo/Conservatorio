
$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

$(document).on("pageinit","#page1",function(){
    $("#page1").on("swipeleft",function(){ 
        $.mobile.navigate( "#page2", { transition : "slide"} );
    });
});
 

$(document).on("pageinit","#page2",function(){
    $("#loginbtn").click(function(){
        var hasError = false;
        var emailVal = $("#EMAIL").val();
        var passwordVal = $("#PASS").val();
        if (emailVal == '') {
            $.blockUI({message: 'INGRESE EMAIL...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }else if (passwordVal == '') {      
            $.blockUI({message: 'INGRESE CLAVE...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20  }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }
        if(hasError == true) {
            $("#register")[0].checkValidity(); 
            return false;
            } else {
                $.ajax({
                    url: 'http://smdevelopers.co/smdev/Conservatorio/valu.php',
                    //url: 'http://localhost:8888/Conservatorio/valu.php',
                    dataType: 'jsonp',
                    data:  "email="+emailVal+"&password="+passwordVal,
                    jsonp: 'jsoncallback',
                    timeout: 5000,
                    success: function(data, status){
                        $.each(data, function(i,item){
                            if (item == "empty"){
                                $.blockUI({message: 'Usuario o Clave Invalida...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', fontSize: 20 }});
                                setTimeout($.unblockUI, 1000);
                            } else {
                                $.blockUI({message: null, css: { color: 'white', border: 'none', backgroundColor: 'transparent', fontSize: 20 }});
                                setTimeout($.unblockUI, 1000);
                                $("#register")[0].reset();
                                $.mobile.navigate( "#page3", { transition : "slide"} );
                            }                             
                        });
                        
                    },
                    error: function(){
                        $.blockUI({message: 'ERROR DE CONEXION...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', fontSize: 20 }});
                        setTimeout($.unblockUI, 1000);
                    }
                });
                return false;
            }
        
    });
});

$(document).on("pageinit","#page10",function(){

    $("#loginbtnreg").click(function(){
        var hasError = false;
        var userVal = $("#NOMBREREG").val();
        var emailVal = $("#EMAILREG").val();
        var passwordVal = $("#PASSREG").val();
        var checkVal = $("#PASSCREG").val();
        if (userVal == '') {
            $.blockUI({message: 'INGRESE NOMBRE...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }else if (emailVal == '') {
            $.blockUI({message: 'INGRESE EMAIL...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }else if (passwordVal == '') {   
            $.blockUI({message: 'INGRESE CLAVE...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        } else if (checkVal == '') {
            $.blockUI({message: 'CONFIRME CLAVE...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        } else if (passwordVal != checkVal) {
            $.blockUI({message: 'CLAVE NO CONCUERDA...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }
        if(hasError == true) {
            $("#regform")[0].checkValidity(); 
            return false;
            } else {
                $.blockUI({message: 'REGISTRANDO...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20  }});
                $.ajax({
                    url: 'http://smdevelopers.co/smdev/Conservatorio/register.php',
                    //url: 'http://localhost:8888/Conservatorio/register.php',
                    dataType: 'jsonp',
                    data:  "nombre="+$("#NOMBREREG").val()+"&email="+$("#EMAILREG").val()+"&password="+$("#PASSREG").val(),
                    jsonp: 'jsoncallback',
                    timeout: 5000,
                    success: function(data, status){
                        $.blockUI({message: 'USUARIO REGISTRADO!', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20  }});
                        setTimeout($.unblockUI, 1000);
                    },
                    error: function(){
                        $.blockUI({message: 'ERROR CREANDO USUARIO...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 20  }});
                        setTimeout($.unblockUI, 1000);
                    }
                });
                return false;
            }
        
    });
    
});

$(document).on("pageinit","#page5",function(){
    var output = $('#contents');

    $.ajax({
        url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
        dataType: 'jsonp',
        data:  "tipo=noticia",
        type: 'POST',
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){
            //console.log(status);
            //if(data != undefined && data.post != undefined){            
                $.each(data, function(i,item){
                    var landmark = '<li id="notlist"><br><a onclick="notClick('+item.ID+')" class="ui-btn ui-btn-inline" data-transition="slideup" id="not-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttl">'
                    +item.Nombre+'</span><div id="imgcontainer"><img class="progressive-image" id="imgnot" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img></div></div>';
                    
                    output.append(landmark);
                });
            //}
        },
        error: function(){
            alert('Hubo un error al cargar los datos');
        }
    }); 
 
});


function notClick(value){ 
    $('.center').remove();
    $('.detitle').remove();
    $.mobile.navigate( "#page8", { transition : "slide"} );
    var output = $('.notphoto');
    var output2 = $('.ndivdetails');
        $.ajax({
            url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
            dataType: 'jsonp',
            data:  "tipo=noticia",
            type: 'POST',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function(data, status){
               $.each(data, function(i,item){
                   var landmark = '<div class="center"><img class="notfoto" id="not'+i+'" style="';
                   var landmark2 = '<div><h2 class="detitle" id="title'+i+'" style="'; 
                   if(i == 0){
                       landmark = landmark + 'display: inline;';
                       landmark2 = landmark2 + 'display: inline;';
                   }else{
                       landmark = landmark + 'display: none;';
                       landmark2 = landmark2 + 'display: none;';
                   };
                   landmark = landmark + '" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"/></div>';
                   landmark2 = landmark2 + '">'+item.Nombre+'</h2><div><p class="notdetails" id="details'+i+'" style="';
                   if(i == 0){
                       landmark2 = landmark2 + 'display: inline;';
                   }else{
                       landmark2 = landmark2 + 'display: none;';
                   };
                   
                   landmark2 = landmark2 + '">'+item.Descripcion+'</p>';
                   
                   output.append(landmark);
                   output2.append(landmark2);
               });              

            },
            error: function(){
                alert('Hubo un error al cargar los datos');
            }
        });

};

function notChange(value){ 
       var item = $('.notfoto:visible').attr('id').substring(3, 4);
       $("#not"+item).hide();
       $("#title"+item).hide();
       $("#details"+item).hide();
       if (value == 'back'){
           item--;
           if(item < 0){
               item = $('.notfoto').length;
               item--;
           } 
       } else {
           item++;
           var valel = document.getElementById("not"+item);
           if(valel == null){
               item = 0;
           } 
       }   
       $("#not"+item).show();
       $("#title"+item).show();
       $("#details"+item).show();
};      


function notBack(){
    $('.center').remove();
};

$(document).on("pageinit","#page6",function(){   
    var output = $('#evcontents');

    $.ajax({
        url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        type: 'POST',
        data:  "tipo=evento",
        timeout: 5000,
        success: function(data, status){
            $.each(data, function(i,item){
                var landmark = '<li id="evlist"><br><a onclick="evClick('+item.ID+')" class="ui-btn ui-btn-inline" data-transition="slideup" id="ev-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttl">'
                +item.Nombre+'</span><div id="imgcontainer"><img class="progressive-image" id="imgnot" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img></div></div>';
                output.append(landmark);
            });
        },
        error: function(){
            alert('Hubo un error al cargar los datos');
        }
    });
});

function evClick(value){ 
    $('.center').remove();
    $('.evtitle').remove();
    $('.evtable').remove();
    $.mobile.navigate( "#page11", { transition : "slide"} );
    var output = $('.evphoto');
    var output2 = $('.evdivdetails');
        $.ajax({
            url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
            dataType: 'jsonp',
            data:  "tipo=evento",
            type: 'POST',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function(data, status){
               $.each(data, function(i,item){
                   
                  var monthNames = [
                                     "", "En.", "Feb.", "Mar.",
                                     "Abr.", "May.", "Jun.", "Jul.",
                                     "Ago.", "Sep.", "Oct.",
                                     "Nov.", "Dic."
                                 ];

                   var day = item.Fecha.substring(8 ,10);
                   var month = monthNames[item.Fecha.substring(5 ,7)*1];
                    
                   var date = month + day;  
                   
                   var landmark = '<div class="center"><img class="evfoto" id="evt'+i+'" style="';
                   var landmark2 = '<div><h2 class="evtitle" id="evtitle'+i+'" style="'; 
                   if(i == 0){
                       landmark = landmark + 'display: inline;';
                       landmark2 = landmark2 + 'display: inline;';
                   }else{
                       landmark = landmark + 'display: none;';
                       landmark2 = landmark2 + 'display: none;';
                   };
                   landmark = landmark + '" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"/></div>';
                   landmark2 = landmark2 + '">'+item.Nombre+'</h2><div><p class="notdetails" id="evdetails'+i+'" style="';
                   if(i == 0){
                       landmark2 = landmark2 + 'display: inline;';
                   }else{
                       landmark2 = landmark2 + 'display: none;';
                   };
                   
                   landmark2 = landmark2 + '">'+item.Descripcion+'</p><table class="evtable" id="table'+i+'" style="';
                   
                   if(i == 0){
                       landmark2 = landmark2 + 'display: grid;';
                   }else{
                       landmark2 = landmark2 + 'display: none;';
                   };
                   
                   landmark2 = landmark2 + '"><tr><th>FECHA</th><th>HORA</th><th>LUGAR</th><tr><td class="evdet">'+date+'</td><td class="evdet">'+item.Hora+'</td><td class="evdet">'+item.Lugar+'</td></table>';
                   
                   output.append(landmark);
                   output2.append(landmark2);
               });              

            },
            error: function(){
                alert('Hubo un error al cargar los datos');
            }
        });

};

function evChange(value){ 
       var item = $('.evfoto:visible').attr('id').substring(3, 4);
       $("#evt"+item).hide();
       $("#evtitle"+item).hide();
       $("#evdetails"+item).hide();
       $("#table"+item).hide();
       if (value == 'back'){
           item--;
           if(item < 0){
               item = $('.evfoto').length;
               item--;
           } 
       } else {
           item++;
           var valel = document.getElementById("evt"+item);
           if(valel == null){
               item = 0;
           } 
       }   
       $("#evt"+item).show().css( "display", "inline");
       $("#evtitle"+item).show().css( "display", "inline");
       $("#evdetails"+item).show().css( "display", "inline");
       $("#table"+item).show();
};      


function evBack(){
    $('.center').remove();
    $('.evtitle').remove();
    $('.evtable').remove();
};


$(document).on("pageinit","#page7",function(){
    var output = $('#fotcontents');

    $.ajax({
        url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        data:  "tipo=foto",
        type: 'POST',
        timeout: 5000,
        success: function(data, status){
                $.each(data, function(i,item){
                    
                    var monthNames = [
                                      "", "ENERO", "FEBRERO", "MARZO",
                                      "ABRIL", "MAYO", "JUNIO", "JULIO",
                                      "AGOSTO", "SEPTIEMBRE", "OCTUBRE",
                                      "NOVIEMBRE", "DICIEMBRE"
                                  ];

                    var day = item.Fecha.substring(8,10);
                    var month = monthNames[item.Fecha.substring(5 ,7)*1];
                    var year = item.Fecha.substring(0,4);
                    
                    var date = month + " "+ day + " DE " + year; 
                    
                    var landmark = '<a href="#page12" onclick="fotClick('+item.ID+')" class="ui-btn ui-btn-inline" data-transition="slideup" id="fot-but"><div class="infot"><label class="datef">'+date+'</label><span class="ttlf">'
                    +item.Nombre+'</span></div><div id="fotcontainer" class="bubble"><img class="foto" id="foto" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img><p class="fotplus">ver+</p></div></a>';
                    if (i < data.length){
                        landmark = landmark + '<hr id="hinline">';
                    }
                    
                    output.append(landmark);
                });
        },
        error: function(){
            alert('Hubo un error al cargar los datos');
        }
    });
});

function fotClick(value){ 
    $('.fcenter').remove();
    $('.fottitle').remove();
    var output = $('.fotphoto');
    var output2 = $('.fotdivdetails');
        $.ajax({
            url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
            dataType: 'jsonp',
            data:  "tipo=foto",
            type: 'POST',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function(data, status){
               $.each(data, function(i,item){
                   var landmark = '<div class="fcenter"><img class="fotfoto" id="fot'+i+'" style="';
                   var landmark2 = '<div><h2 class="fottitle" id="fottitle'+i+'" style="'; 
                   if(i == 0){
                       landmark = landmark + 'display: inline;';
                       landmark2 = landmark2 + 'display: inline;';
                   }else{
                       landmark = landmark + 'display: none;';
                       landmark2 = landmark2 + 'display: none;';
                   };
                   landmark = landmark + '" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"/></div>';
                   landmark2 = landmark2 + '">'+item.Nombre+'</h2>';
                                      
                   output2.append(landmark2);
                   output.append(landmark);
               });              

            },
            error: function(){
                alert('Hubo un error al cargar los datos');
            }
        });

};

function fotChange(value){ 
       var item = $('.fotfoto:visible').attr('id').substring(3, 4);
       $("#fot"+item).hide();
       $("#fottitle"+item).hide();
       if (value == 'back'){
           item--;
           if(item < 0){
               item = $('.notfoto').length;
               item--;
           } 
       } else {
           item++;
           var valel = document.getElementById("fot"+item);
           if(valel == null){
               item = 0;
           } 
       }   
       $("#fot"+item).show().css( "display", "inline");
       $("#fottitle"+item).show().css( "display", "inline");
};      


function fotBack(){
    $('.fcenter').remove();
    $('.fottitle').remove();
};

