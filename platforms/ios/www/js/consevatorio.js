$('body').on('tap', 'a', function(e) {
    window.location = $(this).attr('href');
    e.preventDefault();
});

$(document).bind("mobileinit", function(){
    $.mobile.defaultPageTransition = 'none'; 
    $.mobile.pushStateEnabled = false;  
  });

//$(document).on("pageinit","#page1",function(){
    $("#page1").on("swipeleft",function(){
        $.mobile.navigate( "#page2", { transition : "slide"} );
  //  });
    
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