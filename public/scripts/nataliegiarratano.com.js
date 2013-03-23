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
    $('article.page').last().each(function(){
        if (windowHeight > $(this).height()) {
            $(this).height(windowHeight);
        } else {
            //increase the height to be a multiple of the window height
            var currentHeight = $(this).height();
            $(this).height((Math.floor(currentHeight / windowHeight) + 1) * windowHeight);
        }
    });

    //poetry slide in transistion
    var poetry = $('#Poetry');
    var poetryHeader = $('#Poetry header');
    var poems = $('article.poem');
    var numberOfPoems = $('article.poem').length;
    var poetryContainer = $('#PoetryContainer');

    //initialize the poetry article height to the height of the first poem plus the height of the header
    if (windowHeight > poems.first().height() + poetryHeader.height()) {
        poetry.height(windowHeight);
    } else {
        poetry.height(poems.first().height() + poetryHeader.height());
    }

    //set the poems' inner div width to the width of the body element
    poems.children('div').width($('body').width());

    //set the poems' width to the width of the window
    poems.width($(window).width());

    //increase the width of the poetry container to the window width times the number of poems.
    poetryContainer.width(numberOfPoems * $(window).width());

    //shift to the selected poem
    $('#Poetry nav ul li a').click(function () {
        var poem = $($(this).attr('href'));
        poetryContainer.animate({ left: -poem.position().left }, {
            duration: 600, // how fast we are animating
            easing: 'easeInCubic', // the type of easing
        });

        var newHeight = (windowHeight > (poem.height() + poetryHeader.height())) ? windowHeight : (poem.height() + poetryHeader.height());
        poetry.height(newHeight);
        return false;
    });
});