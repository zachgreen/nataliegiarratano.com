$(document).ready(function () {
    $('ul.nav a').click(function () {
        var top = $($(this).attr('href')).offset().top;
        if ($(this).attr('href') == '#Bio') {
            top = 0;
        }

        $('html, body').animate({
            scrollTop: top
        }, 500);
        //return false;
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


    //wire up menu
    $('a.menu').click(function () {
        var item = $(this).parent().children('ul.submenu');
        var currentStatus = item.css('display');

        //hide all
        $('ul.submenu').hide();
        $('a.menu').removeClass('active');

        //show or hide depending on current status
        if (currentStatus === 'none') {
            $(this).addClass('active');
            $(this).parent().children('ul.submenu').show();
        } else {
            $(this).removeClass('active');
            $(this).parent().children('ul.submenu').hide();
        }
        return false;
    });

    //when menu item is clicked hide menu
    $('ul.submenu li a').click(function () {
        $('a.menu').removeClass('active');
        $('ul.submenu').hide();
    });

    //poetry slide in transistion
    var poetry = $('#Poetry');
    var poetryHeader = $('#Poetry header');
    var poems = $('article.poem');
    var numberOfPoems = $('article.poem').length;
    var poetryContainer = $('#PoetryContainer');

    //initialize the poetry article height to the height of the first poem plus the height of the header
    setPoetrySectionHeight(windowHeight, poetry, poetryHeader, poems);
    $(window).resize(function () {
        windowHeight = $(window).height();
        setPoetrySectionHeight(windowHeight, poetry, poetryHeader, poems);
    });

    //set the poems' inner div width to the width of the body element
    poems.children('div').width($('body').width());

    //set the poems' width to the width of the window
    poems.width($(window).width());

    //increase the width of the poetry container to the window width times the number of poems.
    poetryContainer.width(numberOfPoems * $(window).width());

    ////if url includes a poem, select it
    //if (window.location.hash.indexOf('?') >= 0) {
    //    var poem = window.location.hash.substring(window.location.hash.indexOf('?') + 1, window.location.hash.indexOf('#'));

    //    //find the poem in the list and select it
    //    selectPoem(windowHeight, poetry, poetryHeader, poetryContainer, $('a[href$="' + poem + '"]'), '#' + poem);
    //} else {
    //    //find the poem in the list and select it
    //    selectPoem(windowHeight, poetry, poetryHeader, poetryContainer, $('a[href$="Swarm"]'), '#Swarm');
    //}

    //mark this poem as selected
    $('a[href="#Swarm"]').addClass('selected');

    //shift to the selected poem when link clicked
    $('#Poetry nav ul li a').click(function () {
        var poem = $($(this).attr('href'));

        //remove all selected poems
        $('#Poetry nav ul li a.selected').removeClass('selected');

        //mark this poem as selected
        $(this).addClass('selected');

        //shift to poem
        poetryContainer.animate({ left: -poem.position().left }, {
            duration: 600, // how fast we are animating
            easing: 'easeInCubic', // the type of easing
        });

        var newHeight = (windowHeight > (poem.height() + poetryHeader.height())) ? windowHeight : (poem.height() + poetryHeader.height());
        poetry.height(newHeight);

        //selectPoem(windowHeight, poetry, poetryHeader, poetryContainer, this, $(this).attr('href'));
        return false;
    });
});

function setPoetrySectionHeight(windowHeight, poetrySection, poetryHeaderSection, poemsSection) {
    if (windowHeight > poemsSection.first().height() + poetryHeaderSection.height()) {
        poetrySection.height(windowHeight);
    } else {
        poetrySection.height(poemsSection.first().height() + poetryHeaderSection.height());
    }
}

function selectPoem(windowHeight, poetry, poetryHeader, poetryContainer, object, id) {
    //remove all selected poems
    $('#Poetry nav ul li a.selected').removeClass('selected');

    //mark this poem as selected
    $(object).addClass('selected');

    //shift to poem
    var poem = $(id);
    poetryContainer.animate({ left: -poem.position().left }, {
        duration: 600, // how fast we are animating
        easing: 'easeInCubic', // the type of easing
    });

    var newHeight = (windowHeight > (poem.height() + poetryHeader.height())) ? windowHeight : (poem.height() + poetryHeader.height());
    poetry.height(newHeight);

    //add poem to url
    window.location.hash = ''
    window.location.href = window.location.href + '?' + $(object).attr('href').toString().substring(1, $(object).attr('href').toString().length);
    window.location.hash = '#Poetry';
}