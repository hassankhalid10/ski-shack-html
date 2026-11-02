/* ==========================================================================
   LISTINGS — filters, active-filter tags, sort, grid / list view and the
   continuous-scroll loader.

   Cards are static placeholders until the inventory feed is wired in. Each card
   carries data-condition / data-brand / data-type / data-year / data-length
   (add data-price once the feed provides a numeric price — the price filter and
   price sort use it). The first render shows the design's example state; the
   cards are filtered client-side as soon as the shopper changes a filter.
   ========================================================================== */
(function () {
    'use strict';

    var form = document.querySelector('[data-filter-form]');
    var grid = document.querySelector('[data-listing-grid]');
    if (!form || !grid) return;

    var panel = document.querySelector('[data-filter-panel]');
    var toggle = document.querySelector('[data-filter-toggle]');
    var tagsBox = document.querySelector('[data-filter-tags]');
    var countEl = document.querySelector('[data-results-count]');
    var emptyEl = document.querySelector('[data-results-empty]');
    var sortSelect = document.querySelector('[data-sort]');
    var skeleton = document.querySelector('[data-skeleton]');
    var loadStatus = document.querySelector('[data-load-status]');
    var viewButtons = document.querySelectorAll('[data-view]');
    var VIEW_KEY = 'skiShackListingView';
    var closeIcon = '<span class="ico ico12 icoClose" aria-hidden="true"></span>';

    function cards() { return Array.prototype.slice.call(grid.querySelectorAll('.listingCard')); }
    function num(value) {
        var n = parseFloat(String(value == null ? '' : value).replace(/[^0-9.]/g, ''));
        return isNaN(n) ? null : n;
    }
    function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }
    function field(name) { return form.elements[name]; }

    cards().forEach(function (card, i) { card.setAttribute('data-order', i); });

    /* ---- Current filter state --------------------------------------------- */
    var ranges = [
        { name: 'priceMin', label: function (v) { return 'From ' + money(v); } },
        { name: 'priceMax', label: function (v) { return 'Up to ' + money(v); } },
        { name: 'yearFrom', label: function (v) { return v + ' or newer'; } },
        { name: 'yearTo', label: function (v) { return v + ' or older'; } },
        { name: 'lengthMin', label: function (v) { return v + "'+ long"; } },
        { name: 'lengthMax', label: function (v) { return "Up to " + v + "'"; } }
    ];

    function readState() {
        var s = { condition: [], brand: [], type: [] };
        form.querySelectorAll('input[type="checkbox"]:checked').forEach(function (cb) { s[cb.name].push(cb.value); });
        ranges.forEach(function (r) { s[r.name] = num(field(r.name).value); });
        return s;
    }

    function matches(card, s) {
        var d = card.dataset;
        if (s.condition.length && s.condition.indexOf(d.condition) < 0) return false;
        if (s.brand.length && s.brand.indexOf(d.brand) < 0) return false;
        if (s.type.length && s.type.indexOf(d.type) < 0) return false;
        var year = num(d.year), length = num(d.length), price = num(d.price);
        if (year !== null && ((s.yearFrom !== null && year < s.yearFrom) || (s.yearTo !== null && year > s.yearTo))) return false;
        if (length !== null && ((s.lengthMin !== null && length < s.lengthMin) || (s.lengthMax !== null && length > s.lengthMax))) return false;
        if (price !== null && ((s.priceMin !== null && price < s.priceMin) || (s.priceMax !== null && price > s.priceMax))) return false;
        return true;
    }

    /* ---- Active-filter tags ------------------------------------------------ */
    function tagButton(name, value, label) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'filterTag';
        b.setAttribute('data-tag-name', name);
        b.setAttribute('data-tag-value', value);
        b.setAttribute('aria-label', 'Remove filter: ' + label);
        b.appendChild(document.createTextNode(label + ' '));
        b.insertAdjacentHTML('beforeend', closeIcon);
        return b;
    }

    function renderTags(s) {
        tagsBox.innerHTML = '';
        var count = 0;
        ['condition', 'brand', 'type'].forEach(function (name) {
            s[name].forEach(function (value) { tagsBox.appendChild(tagButton(name, value, value)); count++; });
        });
        ranges.forEach(function (r) {
            if (s[r.name] !== null) { tagsBox.appendChild(tagButton(r.name, '', r.label(s[r.name]))); count++; }
        });
        if (count) {
            var clear = document.createElement('button');
            clear.type = 'button';
            clear.className = 'filterClear';
            clear.setAttribute('data-filter-clear', '');
            clear.textContent = 'Clear all';
            tagsBox.appendChild(clear);
        }
        tagsBox.hidden = !count;
        if (toggle) toggle.setAttribute('data-count', count);
        updateToggleLabel();
        return count;
    }

    /* ---- Apply filters + sort --------------------------------------------------- */
    function apply() {
        var s = readState();
        var visible = 0;
        cards().forEach(function (card) {
            var show = matches(card, s);
            card.hidden = !show;
            if (show) visible++;
        });
        renderTags(s);
        if (countEl) countEl.textContent = visible;
        if (emptyEl) emptyEl.hidden = visible > 0;
        checkLoader();
    }

    function sortCards() {
        var mode = sortSelect ? sortSelect.value : 'newest';
        var key = { 'price-asc': 'price', 'price-desc': 'price', year: 'year', length: 'length' }[mode];
        var dir = mode === 'price-asc' ? 1 : -1;
        cards().sort(function (a, b) {
            if (key) {
                var x = num(a.dataset[key]), y = num(b.dataset[key]);
                if (x !== null && y !== null && x !== y) return (x - y) * dir;
                if (x !== null && y === null) return -1;
                if (x === null && y !== null) return 1;
            }
            return a.getAttribute('data-order') - b.getAttribute('data-order');
        }).forEach(function (card) { grid.appendChild(card); });
    }

    function resetFilters() {
        form.querySelectorAll('input[type="checkbox"]').forEach(function (cb) { cb.checked = false; });
        ranges.forEach(function (r) { field(r.name).value = ''; });
        apply();
    }

    form.addEventListener('change', apply);
    form.addEventListener('submit', function (e) { e.preventDefault(); apply(); });
    var typing;
    form.addEventListener('input', function (e) {
        if (e.target.type !== 'text') return;
        clearTimeout(typing);
        typing = setTimeout(apply, 450);
    });

    document.addEventListener('click', function (e) {
        var tag = e.target.closest('.filterTag');
        if (tag) {
            var name = tag.getAttribute('data-tag-name');
            var value = tag.getAttribute('data-tag-value');
            var input = form.querySelector('input[type="checkbox"][name="' + name + '"][value="' + value + '"]');
            if (input) input.checked = false;
            else if (field(name)) field(name).value = '';
            apply();
            return;
        }
        if (e.target.closest('[data-filter-clear], [data-filter-reset]')) resetFilters();
    });

    if (sortSelect) sortSelect.addEventListener('change', sortCards);

    /* ---- Grid / list view --------------------------------------------------------- */
    function setView(view, remember) {
        var list = view === 'list';
        grid.classList.toggle('isList', list);
        if (skeleton) skeleton.classList.toggle('isList', list);
        viewButtons.forEach(function (b) {
            var on = b.getAttribute('data-view') === view;
            b.classList.toggle('isActive', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        if (remember) { try { localStorage.setItem(VIEW_KEY, view); } catch (err) { /* storage unavailable */ } }
    }
    viewButtons.forEach(function (b) {
        b.addEventListener('click', function () { setView(b.getAttribute('data-view'), true); });
    });
    try { if (localStorage.getItem(VIEW_KEY) === 'list') setView('list', false); } catch (err) { /* storage unavailable */ }

    /* ---- Mobile filter panel ------------------------------------------------------------ */
    var body = document.getElementById('filterBody');
    function updateToggleLabel() {
        if (!toggle) return;
        var open = toggle.getAttribute('aria-expanded') === 'true';
        var n = +toggle.getAttribute('data-count') || 0;
        toggle.textContent = (open ? 'Hide Filters' : 'Show Filters') + (n ? ' (' + n + ')' : '');
    }
    if (panel && toggle && body) {
        panel.classList.add('jsFilters');
        toggle.setAttribute('data-count', tagsBox ? tagsBox.querySelectorAll('.filterTag').length : 0);
        updateToggleLabel();
        toggle.addEventListener('click', function () {
            var open = toggle.getAttribute('aria-expanded') !== 'true';
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            body.classList.toggle('isOpen', open);
            updateToggleLabel();
        });
    }

    /* ---- Continuous scroll ---------------------------------------------------------------
       When the loader comes near the viewport the next page is requested. The static
       build has no further inventory, so fetchNextPage() resolves empty and the loader
       switches to its end state. Wire it to the inventory feed to append real cards:
       resolve with an array of card HTML strings. */
    var loading = false, finished = false, page = 1;

    function fetchNextPage(nextPage) {
        return new Promise(function (resolve) { setTimeout(function () { resolve([]); }, 900); });
    }

    function finish() {
        finished = true;
        if (skeleton) skeleton.hidden = true;
        if (loadStatus) {
            loadStatus.classList.add('isDone');
            loadStatus.querySelector('[data-load-text]').textContent = "You've reached the end of our current inventory";
        }
    }

    function checkLoader() {
        if (!loadStatus || loading || finished) return;
        if (loadStatus.getBoundingClientRect().top > window.innerHeight + 200) return;
        loading = true;
        fetchNextPage(page + 1).then(function (items) {
            loading = false;
            if (!items || !items.length) { finish(); return; }
            page++;
            grid.insertAdjacentHTML('beforeend', items.join(''));
            cards().forEach(function (card, i) { if (!card.hasAttribute('data-order')) card.setAttribute('data-order', i); });
            apply();
            sortCards();
        });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { ticking = false; checkLoader(); });
    }, { passive: true });
})();
