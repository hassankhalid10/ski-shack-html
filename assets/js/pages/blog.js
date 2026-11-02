/* ==========================================================================
   BLOG — category chips + article search
   --------------------------------------------------------------------------
   <button data-filter="lifestyle">  toggles .isActive and shows only the
   #articleGrid cards whose data-category matches; #articleSearch narrows the
   grid by text. #articleEmpty is shown when nothing matches.
   ========================================================================== */
(function () {
    'use strict';

    var grid = document.getElementById('articleGrid');
    if (!grid) return;

    var chips = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
    var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-category]'));
    var search = document.getElementById('articleSearch');
    var empty = document.getElementById('articleEmpty');
    var category = 'all';

    function applyFilters() {
        var query = search ? search.value.trim().toLowerCase() : '';
        var visible = 0;
        cards.forEach(function (card) {
            var show = (category === 'all' || card.getAttribute('data-category') === category) &&
                (!query || card.textContent.toLowerCase().indexOf(query) !== -1);
            card.hidden = !show;
            if (show) visible++;
        });
        if (empty) empty.hidden = visible > 0;
    }

    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            category = chip.getAttribute('data-filter');
            chips.forEach(function (c) {
                var active = c === chip;
                c.classList.toggle('isActive', active);
                c.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            applyFilters();
        });
    });

    if (search) search.addEventListener('input', applyFilters);
})();
