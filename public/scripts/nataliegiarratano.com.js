$(document).ready(function () {
    $('ul.nav a').click(function () {
        var top = $($(this).attr('href')).offset().top;
        if ($(this).attr('href') == '#Bio') {
            top = 0;
        }

        $('html, body').animate({
            scrollTop: top
        }, 500);
        return false;
    });

    //wire up scroll to top functionality
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollup').fadeIn();
        } else {
            $('.scrollup').fadeOut();
        }
    });

    $('.scrollup').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });

    var windowHeight = $(window).height()
    $('article.page').each(function(){
        if (windowHeight > $(this).height()) {
            $(this).height(windowHeight);
        }
    });
});