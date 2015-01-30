$('body').on('tap', 'a', function(e) {
    window.location = $(this).attr('href');
    e.preventDefault();
});

$(document).on("pagecreate","#page1",function(){    
    $("#page1").on("swiperight",function(){
        $.mobile.navigate( "#page2" );
      });
});