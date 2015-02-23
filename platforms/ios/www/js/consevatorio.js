$('body').on('tap', 'a', function(e) {
    window.location = $(this).attr('href');
    e.preventDefault();
});


$(document).bind("mobileinit", function(){
    $.mobile.defaultPageTransition = 'none'; 
    $.mobile.pushStateEnabled = false;  
  });

$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);

$(document).on("pageinit","#page1",function(){
    $("#page1").on("swipeleft",function(){ 
        $.mobile.navigate( "#page2", { transition : "slide"} );
    });
});
 

$(document).on("pageinit","#page2",function(){
    $("#facebook").click(function () {  
        $.blockUI({message: 'INGRESANDO A FACEBOOK...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
        setTimeout($.unblockUI, 3000);
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
              console.log('Logged in.');
              $.blockUI({message: 'BIENVENIDO!', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
              $.mobile.navigate( "#page3", { transition : "slide"} );
            }
            else {
                FB.login(function(response) {
                    if (response.authResponse) {
                      $.blockUI({message: 'BIENVENIDO '+ response.name, css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
                      $.mobile.navigate( "#page3", { transition : "slide"} );
                      console.log('Welcome!  Fetching your information.... ');
                      FB.api('/me', function(response) {
                        console.log('Good to see you, ' + response.name + '.');
                      });
                    } else {
                      $.blockUI({message: 'USUARIO NO AUTORIZADO...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
                      console.log('User cancelled login or did not fully authorize.');
                    }
                  });
            }
          });
        
    });
});

function logOut(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected'){
            console.log("Desconectando Usuario");
            FB.logout();
        }
    });
    
    $.mobile.navigate( "#page2" );
    
}


$(document).on("pageinit","#page2",function(){
    $("#loginbtn").click(function(){
        var hasError = false;
        var emailVal = $("#EMAIL").val();
        var passwordVal = $("#PASS").val();
        if (emailVal == '') {
            $.blockUI({message: 'INGRESE EMAIL...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }else if (passwordVal == '') {      
            $.blockUI({message: 'INGRESE CLAVE...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25  }});
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
                                $.blockUI({message: 'Usuario o Clave Invalida...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', fontSize: 25 }});
                                setTimeout($.unblockUI, 1000);
                            } else {
                                $.blockUI({message: null, css: { color: 'white', border: 'none', backgroundColor: 'transparent', fontSize: 25 }});
                                setTimeout($.unblockUI, 1000);
                                $("#register")[0].reset();
                                $.mobile.navigate( "#page3", { transition : "slide"} );
                            }                             
                        });
                        
                    },
                    error: function(){
                        $("#popuptitlel").text("ERROR DE CONEXION");
                        $("#popupDialogl").width(204);
                        $("#popupDialogl").popup("open");
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
            $.blockUI({message: 'INGRESE NOMBRE...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }else if (emailVal == '') {
            $.blockUI({message: 'INGRESE EMAIL...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }else if (passwordVal == '') {   
            $.blockUI({message: 'INGRESE CLAVE...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        } else if (checkVal == '') {
            $.blockUI({message: 'CONFIRME CLAVE...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        } else if (passwordVal != checkVal) {
            $.blockUI({message: 'CLAVE NO CONCUERDA...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25 }});
            setTimeout($.unblockUI, 1000);
            hasError = true;
        }
        if(hasError == true) {
            $("#regform")[0].checkValidity(); 
            return false;
            } else {
                $.blockUI({message: 'REGISTRANDO...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25  }});
                $.ajax({
                    url: 'http://smdevelopers.co/smdev/Conservatorio/register.php',
                    //url: 'http://localhost:8888/Conservatorio/register.php',
                    dataType: 'jsonp',
                    data:  "nombre="+$("#NOMBREREG").val()+"&email="+$("#EMAILREG").val()+"&password="+$("#PASSREG").val(),
                    jsonp: 'jsoncallback',
                    timeout: 5000,
                    success: function(data, status){
                        $.blockUI({message: 'USUARIO REGISTRADO!', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25  }});
                        setTimeout($.unblockUI, 1000);
                    },
                    error: function(){
                        $.blockUI({message: 'ERROR CREANDO USUARIO...', css: { color: 'white', border: 'none', backgroundColor: 'transparent', width: '60%', left: '20%', fontfamily: 'FlamaCondensed', fontSize: 25  }});
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
                    var landmark = '<br><br><a href="#page8" onclick="notClick('+item.ID+')" class="ui-btn ui-btn-inline" id="not-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttl">'
                    +item.Nombre+'</span></div><img id="imgnot" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img>';
                    
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
    
    //$(document).on("pageinit","#page8",function(){
        var output = $('#notcontainer');
        $.ajax({
            url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
            dataType: 'jsonp',
            jsonp: 'jsoncallback',
            type: 'POST',
            data:  "tipo=noticia&"+"id="+value,
            timeout: 5000,
            success: function(data, status){
                //console.log(status);
                //if(data != undefined && data.post != undefined){
                    $.each(data, function(i,item){
                        var landmark = '<button id="backbtn" onclick="backClick('+value+')" class="prev ui-btn ui-btn-icon-notext ui-icon-carat-l ui-state-disabled ui-first-child">Previous</button><button id="nextbtn" onclick="nextClick("'+ value + '",data)" class="next ui-btn ui-btn-icon-notext ui-icon-carat-r ui-last-child">Next</button><img id="imgnotdet" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"><hr id="hline"><h4 class="detitle">'+item.Nombre+'</h4><p class="notdetails">'+item.Descripcion+'</p>'
                        
                        output.append(landmark);
                    });
                //}
            },
            error: function(){
                alert('Hubo un error al cargar los datos');
            }
        });
       //});
};

function nextClick(value, dataitem){
        alert("Next Click");
        var output = $('#notcontainer');
         $.each(dataitem, function(i,item){
             if (item.ID == value) {
                 alert(data[i+1][ID]);
                // var landmark = '<button id="backbtn" onclick="nextclick('+data[i+1][ID]+')" class="prev ui-btn ui-btn-icon-notext ui-icon-carat-l ui-state-disabled ui-first-child">Previous</button><button id="nextbtn" class="next ui-btn ui-btn-icon-notext ui-icon-carat-r ui-last-child">Next</button><img id="imgnotdet" src="http://smdevelopers.co/smdev/Conservatorio/images/'+data[i+1][Foto]+'"><hr id="hline"><h4 class="detitle">'+data[i+1][Foto]+'</h4><p class="notdetails">'+data[i+1][Descripcion]+'</p>'
                 output.html("");
                 //output.append(landmark);    
             }
         });
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
            //console.log(status);
            //if(data != undefined && data.post != undefined){
                $.each(data, function(i,item){
                    var landmark = '<br><br><a href="#page9" class="ui-btn ui-btn-inline" id="ev-but"><div class="info"><label class="datev">'+item.Fecha+'</label><span class="ttl">'
                    +item.Nombre+'</span></div><img id="imgnot" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img>';
                    
                    output.append(landmark);
                });
            //}
        },
        error: function(){
            alert('Hubo un error al cargar los datos');
        }
    });
});
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
                    var landmark = '<br><br><ul data-role="listview" id="fotolist"><li><a href="#page11" class="ui-btn ui-btn-inline" id="fot-but"><div class="info"><label class="datef">'+item.Fecha+'</label><span class="ttlf">'
                    +item.Nombre+'</span></div><img id="imgnot" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img></li></ul>';
                    
                    output.append(landmark);
                });
        },
        error: function(){
            alert('Hubo un error al cargar los datos');
        }
    });
});

