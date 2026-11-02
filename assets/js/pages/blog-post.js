/* ==========================================================================
   BLOG POST — "Copy link" share button
   --------------------------------------------------------------------------
   <button data-copy-link> copies the article URL; the result is announced
   through the visually hidden [data-copy-status] live region.
   ========================================================================== */
(function () {
    'use strict';

    var button = document.querySelector('[data-copy-link]');
    if (!button) return;
    var status = document.querySelector('[data-copy-status]');
    var timer;

    function announce(message) {
        if (status) status.textContent = message;
        button.classList.add('isCopied');
        clearTimeout(timer);
        timer = setTimeout(function () {
            button.classList.remove('isCopied');
            if (status) status.textContent = '';
        }, 2500);
    }

    button.addEventListener('click', function () {
        var url = window.location.href.split('#')[0];
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(url).then(function () {
                announce('Link copied to clipboard');
            }, function () {
                window.prompt('Copy this link:', url);
            });
        } else {
            window.prompt('Copy this link:', url);
        }
    });
})();
