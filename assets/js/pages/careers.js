/* ==========================================================================
   CAREERS
   - "Apply for This Role" (data-position) pre-selects that role in the form.
   - The résumé upload box shows the chosen file name (and resets with the form).
   ========================================================================== */
(function () {
    'use strict';

    var position = document.getElementById('applyPosition');
    document.querySelectorAll('[data-position]').forEach(function (link) {
        link.addEventListener('click', function () {
            if (position) position.value = link.getAttribute('data-position');
        });
    });

    document.querySelectorAll('.uploadBox input[type="file"]').forEach(function (input) {
        var text = input.parentNode.querySelector('.uploadBoxText');
        if (!text) return;
        var prompt = text.textContent;
        input.addEventListener('change', function () {
            text.textContent = input.files && input.files.length ? input.files[0].name : prompt;
        });
        if (input.form) input.form.addEventListener('reset', function () { text.textContent = prompt; });
    });
})();
