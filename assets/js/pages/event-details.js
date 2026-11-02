/* ==========================================================================
   EVENT DETAILS — "View All Photos" opens the event gallery
   --------------------------------------------------------------------------
   <button data-gallery-open="eventPhotos"> starts the Fancybox gallery bound
   by script.js to the [data-gallery="eventPhotos"] links, at the first photo.
   ========================================================================== */
(function () {
    'use strict';

    var openers = document.querySelectorAll('[data-gallery-open]');

    Array.prototype.forEach.call(openers, function (opener) {
        opener.addEventListener('click', function () {
            var first = document.querySelector('[data-gallery="' + opener.getAttribute('data-gallery-open') + '"]');
            if (first) first.click();
        });
    });
})();
