/* ==========================================================================
   SALES PAGES — shared behaviour
   --------------------------------------------------------------------------
   Payment calculator   <div class="calcBox" data-payment-calc data-condition="new|used">
                        inputs: [data-calc="price|down|trade|rate|term"], result: [data-calc-output]
                        Optional page-wide echo: [data-payment-estimate] ("$412/mo").
                        Defaults when the markup leaves rate / term empty:
                        new 6.49% / 240 months · pre-owned 7.49% / 180 months.
   Photo upload         <label class="uploadBox" data-upload="statusId"> wrapping <input type="file">
   ========================================================================== */
(function () {
    'use strict';

    var DEFAULTS = { new: { rate: 6.49, term: 240 }, used: { rate: 7.49, term: 180 } };

    function toNumber(value) {
        var text = String(value == null ? '' : value);
        if (text.indexOf('[') > -1) return NaN;               // feed placeholder such as "[PRICE]"
        var n = parseFloat(text.replace(/[^0-9.]/g, ''));
        return isNaN(n) ? NaN : n;
    }
    function money(n) { return '$' + Math.round(n).toLocaleString('en-US'); }

    /* Standard amortised loan payment */
    function monthlyPayment(principal, ratePct, months) {
        if (!(principal > 0) || !(months > 0)) return 0;
        var r = ratePct / 100 / 12;
        if (!(r > 0)) return principal / months;
        return principal * r / (1 - Math.pow(1 + r, -months));
    }

    /* ---- Payment calculators --------------------------------------------- */
    document.querySelectorAll('[data-payment-calc]').forEach(function (box) {
        var get = function (key) { return box.querySelector('[data-calc="' + key + '"]'); };
        var price = get('price'), down = get('down'), trade = get('trade'), rate = get('rate'), term = get('term');
        var output = box.querySelector('[data-calc-output]');
        var estimates = document.querySelectorAll('[data-payment-estimate]');
        var placeholder = output.textContent;
        var defaults = DEFAULTS[box.getAttribute('data-condition') === 'used' ? 'used' : 'new'];
        var form = box.querySelector('form');

        if (!rate.value.trim()) rate.value = defaults.rate + '%';
        if (!term.querySelector('option[selected]')) term.value = String(defaults.term);

        function update() {
            var p = toNumber(price.value);
            if (isNaN(p)) {
                output.textContent = placeholder;
                estimates.forEach(function (el) { el.textContent = placeholder + '/mo'; });
                return;
            }
            var principal = p - (toNumber(down.value) || 0) - (toNumber(trade.value) || 0);
            var payment = money(monthlyPayment(principal, toNumber(rate.value) || 0, +term.value));
            output.textContent = payment;
            estimates.forEach(function (el) { el.textContent = payment + '/mo'; });
        }

        [price, down, trade, rate].forEach(function (input) {
            // placeholder tokens are replaced as soon as the shopper starts typing
            input.addEventListener('focus', function () { if (input.value.indexOf('[') > -1) input.select(); });
            input.addEventListener('blur', function () {
                var n = toNumber(input.value);
                if (isNaN(n)) return;
                input.value = input === rate ? n + '%' : money(n);
            });
            input.addEventListener('input', update);
        });
        term.addEventListener('change', update);
        if (form) form.addEventListener('submit', function (e) { e.preventDefault(); update(); });
        update();
    });

    /* ---- Drag & drop photo upload ------------------------------------------ */
    document.querySelectorAll('[data-upload]').forEach(function (box) {
        var input = box.querySelector('input[type="file"]');
        var status = document.getElementById(box.getAttribute('data-upload'));
        var max = +input.getAttribute('data-max') || 10;

        function render(files) {
            if (!status) return;
            var list = Array.prototype.slice.call(files || []);
            if (!list.length) { status.textContent = ''; return; }
            var names = list.slice(0, max).map(function (f) { return f.name; }).join(', ');
            status.textContent = Math.min(list.length, max) + ' photo' + (list.length === 1 ? '' : 's') + ' selected: ' + names +
                (list.length > max ? ' (only the first ' + max + ' will be sent)' : '');
        }

        input.addEventListener('change', function () { render(input.files); });
        ['dragenter', 'dragover'].forEach(function (type) {
            box.addEventListener(type, function (e) { e.preventDefault(); box.classList.add('isDragOver'); });
        });
        ['dragleave', 'dragend', 'drop'].forEach(function (type) {
            box.addEventListener(type, function () { box.classList.remove('isDragOver'); });
        });
        box.addEventListener('drop', function (e) {
            e.preventDefault();
            var files = Array.prototype.filter.call(e.dataTransfer.files, function (f) { return /^image\//.test(f.type); });
            try {
                var transfer = new DataTransfer();
                files.slice(0, max).forEach(function (f) { transfer.items.add(f); });
                input.files = transfer.files;
            } catch (err) { /* older browsers: files are listed but must be re-selected */ }
            render(files);
        });
        if (input.form) input.form.addEventListener('reset', function () { render([]); });
    });
})();
