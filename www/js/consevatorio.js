$('body').on('tap', 'a', function(e) {
    window.location = $(this).attr('href');
    e.preventDefault();
});

$(document).on("pageinit","#page1",function(){
    $("#page1").on("swipeleft",function(){
            $.mobile.navigate( "#page2" );
    });
});