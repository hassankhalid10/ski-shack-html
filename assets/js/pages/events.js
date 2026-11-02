/* ==========================================================================
   EVENTS — location chips
   --------------------------------------------------------------------------
   <button data-filter="springfield"> toggles .isActive and shows only the
   #eventGrid cards whose data-category matches ("all" shows everything).
   ========================================================================== */
(function () {
    'use strict';

    var grid = document.getElementById('eventGrid');
    if (!grid) return;

    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-category]'));

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            var location = chip.getAttribute('data-filter');
            chips.forEach(function (c) {
                var active = c === chip;
                c.classList.toggle('isActive', active);
                c.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            cards.forEach(function (card) {
                card.hidden = location !== 'all' && card.getAttribute('data-category') !== location;
            });
        });
    });
})();
