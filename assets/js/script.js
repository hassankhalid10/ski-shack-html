/* ==========================================================================
   THE SKI SHACK — shared behaviour
   --------------------------------------------------------------------------
   Carousels  <div class="owl-carousel" data-carousel='{"margin":24,"responsive":{...}}'>
              + optional external buttons: data-carousel-prev="#id" / data-carousel-next="#id"
   Lightbox   <a href="large.jpg" data-gallery="groupName">  (Fancybox)
   Forms      form.gtm_form validates .require_check fields and shows an inline confirmation instead of
              submitting (static site — wire to the CRM / reCAPTCHA later).
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

    /* ---- Forms ---------------------------------------------------------------------
       Lead forms follow the production convention: <form class="gtm_form" id="x_form" data-form-id="…">,
       required inputs carry .require_check and an empty <div class="field-error" id="error_<inputId>">,
       plus a honeypot. Production replaces this block with its own reCAPTCHA / validation / GTM handlers;
       here it validates the same markup and shows a confirmation so the static site is demoable. */
    var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    function setError($field, message) {
        var $err = $("#error_" + $field.attr("id"));
        if (!$err.length) $err = $field.closest("form").find(".field-error").first();
        $err.text(message || "");
        $field.toggleClass("hasError", !!message).attr("aria-invalid", message ? "true" : "false");
    }
    function validateField($f) {
        var v = $.trim($f.val()), type = ($f.attr("type") || "").toLowerCase(), msg = "";
        if ($f.hasClass("require_check") && !v) msg = "This field is required.";
        else if (v && type === "email" && !EMAIL.test(v)) msg = "Please enter a valid email address.";
        else if (v && type === "tel" && v.replace(/\D/g, "").length < 10) msg = "Please enter a valid phone number.";
        setError($f, msg);
        return !msg;
    }

    $("form.gtm_form").attr("novalidate", "").on("input change", ".require_check, input[type=email], input[type=tel]", function () {
        if ($(this).hasClass("hasError")) validateField($(this));
    });

    $("form").not("[action]").add("form.gtm_form").on("submit", function (e) {
        e.preventDefault();
        var $form = $(this), valid = true, $first = null;
        if ($form.hasClass("gtm_form")) {
            if ($form.find("input[name=honeypot], input[name=business_url]").filter(function () { return $.trim(this.value) !== ""; }).length) return; // spam trap
            $form.find(".require_check, input[type=email], input[type=tel]").each(function () {
                if (!validateField($(this))) { valid = false; if (!$first) $first = $(this); }
            });
            if (!valid) { $first.trigger("focus"); return; }
        } else if (this.checkValidity && !this.checkValidity()) { this.reportValidity(); return; }
        var message = $form.data("success") || "Thanks! A member of The Ski Shack team will be in touch shortly.";
        $form.find(".formSuccess").remove();
        $("<p class=\"formSuccess\" role=\"status\"></p>").text(message).appendTo($form);
        this.reset();
    });
})(jQuery);
