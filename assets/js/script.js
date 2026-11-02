/* ==========================================================================
   THE SKI SHACK — shared behaviour
   --------------------------------------------------------------------------
   Carousels  <div class="owl-carousel" data-carousel='{"margin":24,"responsive":{...}}'>
              + optional external buttons: data-carousel-prev="#id" / data-carousel-next="#id"
   Lightbox   <a href="large.jpg" data-gallery="groupName">  (Fancybox)
   Forms      every <form> without an action shows an inline confirmation instead of
              reloading the page (the site is static — wire these to the CRM later).
   ========================================================================== */
(function ($) {
    'use strict';

    /* ---- Owl carousels ------------------------------------------------------ */
    $('[data-carousel]').each(function () {
        var $carousel = $(this);
        var options = $.extend({ nav: false, dots: false, margin: 24, items: 1, rewind: true }, $carousel.data('carousel') || {});
        var id = '#' + this.id;
        var $prev = $('[data-carousel-prev="' + id + '"]');
        var $next = $('[data-carousel-next="' + id + '"]');

        $carousel.owlCarousel(options);
        $prev.on('click', function () { $carousel.trigger('prev.owl.carousel'); });
        $next.on('click', function () { $carousel.trigger('next.owl.carousel'); });
    });

    /* ---- Fancybox galleries ----------------------------------------------------- */
    if (window.Fancybox && document.querySelector('[data-gallery]')) {
        window.Fancybox.bind('[data-gallery]', { groupAttr: 'data-gallery' });
    }

    /* ---- Static forms --------------------------------------------------------- */
    $('form').not('[action]').on('submit', function (e) {
        e.preventDefault();
        var $form = $(this);
        if (this.checkValidity && !this.checkValidity()) { this.reportValidity(); return; }
        var message = $form.data('success') || 'Thanks! A member of The Ski Shack team will be in touch shortly.';
        $form.find('.formSuccess').remove();
        $('<p class="formSuccess" role="status"></p>').text(message).appendTo($form);
        this.reset();
    });
})(jQuery);
