
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
                    var landmark = '<br><br><a href="#page8" onclick="notClick('+item.ID+')" class="ui-btn ui-btn-inline" data-transition="slideup" id="not-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttl">'
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
        var output = $('#notcontainer');
        $.ajax({
            url: 'http://smdevelopers.co/smdev/Conservatorio/connect.php',
            dataType: 'jsonp',
            data:  "tipo=noticia",
            type: 'POST',
            jsonp: 'jsoncallback',
            timeout: 5000,
            success: function(data, status){
                //console.log(status);
                $( '#gallery' ).click( function( e ) {
                    e.preventDefault();
                    $.swipebox( [ 
                           $.each(data, function(i,item){
                               "{ href:'http://smdevelopers.co/smdev/Conservatorio/images/'"+item.Foto+"', title:item.Nombre },"
                                 
                           })
                    ]);

                });
            },
            error: function(){
                alert('Hubo un error al cargar los datos');
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
                    var landmark = '<br><br><a href="#page9" onclick="notClick('+item.ID+')" class="ui-btn ui-btn-inline" data-transition="slideup" id="ev-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttl">'
                    +item.Nombre+'</span><div id="imgcontainer"><img class="progressive-image"id="imgnot" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img></div></div>';
                    
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
                    var landmark = '<br><br><a href="#page9" onclick="notClick('+item.ID+')" class="ui-btn ui-btn-inline" data-transition="slideup" id="fot-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttlf">'
                    +item.Nombre+'</span><div id="imgcontainer"><img class="progressive-image" id="imgnot" src="http://smdevelopers.co/smdev/Conservatorio/images/'+item.Foto+'"></img></div></div>';
                    
                    
                    output.append(landmark);
                });
        },
        error: function(){
            alert('Hubo un error al cargar los datos');
        }
    });
});

