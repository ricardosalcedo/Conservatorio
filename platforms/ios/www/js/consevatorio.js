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
    testAPI();
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
    FB.logout(function(response) {
        $.mobile.navigate( "#page2" );
    });
}

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {  
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}


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
        jsonp: 'jsoncallback',
        timeout: 5000,
        success: function(data, status){
            //console.log(status);
            //if(data != undefined && data.post != undefined){
                $.each(data, function(i,item){
                    var landmark = '<br><br><a href="#page7" class="ui-btn ui-btn-inline" id="not-but"><div class="info"><label class="date">'+item.Fecha+'</label><span class="ttl">'
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


