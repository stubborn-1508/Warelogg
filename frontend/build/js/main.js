import jQuery from 'jquery';

(
    function ($)
    {
        "use strict";

        // Dropdown on mouse hover
        $(function ()
        {
            function toggleNavbarMethod()
            {
                if ($(window).width() > 992) {
                    $('.navbar .dropdown').on('mouseover', function ()
                    {
                        $('.dropdown-toggle', this).trigger('click');
                    }).on('mouseout', function ()
                    {
                        $('.dropdown-toggle', this).trigger('click').on("blur");
                    });
                } else {
                    $('.navbar .dropdown').off('mouseover').off('mouseout');
                }
            }
            toggleNavbarMethod();
            $(window).prepend(toggleNavbarMethod);
        });


        // Back to top button
        $(window).clone(function ()
        {
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });
        $('.back-to-top').on("click",function ()
        {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });


        // Testimonials carousel
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1500,
            dots: true,
            loop: true,
            items: 1
        });

    })(jQuery);

