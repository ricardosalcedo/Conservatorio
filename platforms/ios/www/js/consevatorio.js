$('body').on('tap', 'a', function(e) {
    window.location = $(this).attr('href');
    e.preventDefault();
});

$(document).bind("mobileinit", function(){
    $.mobile.defaultPageTransition = 'none'; 
    $.mobile.pushStateEnabled = false;  
  });

$(document).on("pageinit","#page1",function(){
    $("#page1").on("swipeleft",function(){
        $.mobile.navigate( "#page2", { transition : "slide"} );
});
    
window.fbAsyncInit = function() {
        FB.init({
          appId      : '707742835999981',
          cookie     : true,  // enable cookies to allow the server to access 
                              // the session
          xfbml      : true,  // parse social plugins on this page
          version    : 'v2.1' // use version 2.1
        });

        };
    
});

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
      console.log("Usuario conectado a Facebook");
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function logIn(){
    alert("Login Button Invoked...");
    FB.login(function(response) {
        if (response.status === 'connected') {
            console.log("Conectado!!!");
            $.mobile.navigate( "#page3", { transition : "slide"} );
        } else if (response.status === 'not_authorized') {
           alert("Usuario no autorizado");
        } else {
          // The person is not logged into Facebook, so we're not sure if
          // they are logged into this app or not.
           alert(response.status);
        }
      });
}

function logOut(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected'){
            console.log("Desconectando Usuario");
            FB.logout();
        }
    });
    
    $.mobile.navigate( "#page2" );
    
}

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


$(document).on("pageinit","#page2",function(){
    $("#loginbtn").click(function(){
        var hasError = false;
        var emailVal = $("#EMAIL").val();
        var passwordVal = $("#PASS").val();
        if (emailVal == '') {
            $("#popuptitlel").text("INGRESE EMAIL");
            $("#popupDialogl").popup("open", { y: $("#EMAIL").offset().top - 10 });
            hasError = true;
        }else if (passwordVal == '') {      
            $("#popuptitlel").text("INGRESE CLAVE");
            $("#popupDialogl").height(50);
            $("#popupDialogl").popup("open", { y: $("#PASS").offset().top - 0 });
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
                                $("#popuptitlel").text("USUARIO O CLAVE INVALIDA");
                                $("#popupDialogl").width(204);
                                $("#popupDialogl").popup("open");
                            } else {
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
            $("#popuptitle").text("INGRESE NOMBRE");
            $("#popupDialog").popup("open", { y: $("#NOMBREREG").offset().top - 10 });
            hasError = true;
        }else if (emailVal == '') {
            $("#popuptitle").text("INGRESE EMAIL");
            $("#popupDialog").popup("open", { y: $("#EMAILREG").offset().top - 10 });
            hasError = true;
        }else if (passwordVal == '') {      
            $("#popuptitle").text("INGRESE CLAVE");
            $("#popupDialog").height(50);
            $("#popupDialog").popup("open", { y: $("#PASSREG").offset().top - 0 });
            hasError = true;
        } else if (checkVal == '') {
            $("#popuptitle").text("CONFIRME CLAVE");
            $("#popupDialog").height(50);
            $("#popupDialog").popup("open", { y: $("#PASSCREG").offset().top - 10 });
            hasError = true;
        } else if (passwordVal != checkVal) {
            $("#popuptitle").text("CLAVE NO CONCUERDA");
            $("#popupDialog").height(50);
            $("#popupDialog").popup("open", { y: $("#PASSCREG").offset().top - 10 });
            hasError = true;
        }
        if(hasError == true) {
            $("#regform")[0].checkValidity(); 
            return false;
            } else {
                $.ajax({
                    url: 'http://smdevelopers.co/smdev/Conservatorio/register.php',
                    //url: 'http://localhost:8888/Conservatorio/register.php',
                    dataType: 'jsonp',
                    data:  "nombre="+$("#NOMBREREG").val()+"&email="+$("#EMAILREG").val()+"&password="+$("#PASSREG").val(),
                    jsonp: 'jsoncallback',
                    timeout: 5000,
                    success: function(data, status){
                        $("#popuptitle").text("GRACIAS! USUARIO CREADO");
                        $("#popupDialog").width(204);
                        $("#popupDialog").popup("open");
                    },
                    error: function(){
                        $("#popuptitle").text("ERROR AL CREAR USUARIO");
                        $("#popupDialog").width(204);
                        $("#popupDialog").popup("open");
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
        alert(value);
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

