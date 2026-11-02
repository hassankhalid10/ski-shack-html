/* ==========================================================================
   MEET OUR STAFF — "Jump To" department chips
   The chips are plain anchor links (#grp-0 …) so they work without JS; this
   keeps the highlighted chip (isActive + aria-current) in sync with the
   department the visitor jumped to, including on arrival via staff.html#grp-N.
   ========================================================================== */
(function () {
    'use strict';

    var chips = Array.prototype.slice.call(document.querySelectorAll('.jumpBar .filterChip'));
    if (!chips.length) return;

    function activate(chip) {
        chips.forEach(function (c) {
            var on = c === chip;
            c.classList.toggle('isActive', on);
            if (on) c.setAttribute('aria-current', 'true');
            else c.removeAttribute('aria-current');
        });
    }

    function syncWithHash() {
        var match = chips.filter(function (c) { return c.getAttribute('href') === window.location.hash; })[0];
        if (match) activate(match);
    }

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () { activate(chip); });
    });
    window.addEventListener('hashchange', syncWithHash);
    syncWithHash();
})();
