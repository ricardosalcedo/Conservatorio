$('body').on('tap', 'a', function(e) {
    window.location = $(this).attr('href');
    e.preventDefault();
});

$('#page1').on('flick', function(e) {
    if ('horizontal' == e.orientation) {
        if (1 == e.direction) {
            $(this).addClass('is-opened');
        }
        else {
            $(this).removeClass('is-opened');
        }
    }
});