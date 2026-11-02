/* ==========================================================================
   BOAT DETAILS — photo & video gallery
   --------------------------------------------------------------------------
   Thumbnails drive the main stage: data-src for photos, data-video for the
   walkaround video (plays inline, muted). Prev / next, arrow keys and swipes
   cycle through every item; "Video" jumps to the video; "Full Screen" (or a
   click on the photo) opens the whole gallery in Fancybox at the current item.
   ========================================================================== */
(function () {
    'use strict';

    var root = document.querySelector('[data-vdp-gallery]');
    if (!root) return;

    var thumbs = Array.prototype.slice.call(root.querySelectorAll('.galleryThumb'));
    var photo = root.querySelector('[data-gallery-photo]');
    var video = root.querySelector('[data-gallery-video]');
    var count = root.querySelector('[data-gallery-count]');
    var strip = root.querySelector('.thumbStrip');
    var title = photo.getAttribute('alt').split(' — ')[0];
    var current = 0;

    var items = thumbs.map(function (t) {
        var isVideo = t.hasAttribute('data-video');
        return {
            video: isVideo,
            src: t.getAttribute(isVideo ? 'data-video' : 'data-src'),
            thumb: t.querySelector('img').getAttribute('src')
        };
    });

    function keepThumbInView(thumb) {
        var s = strip.getBoundingClientRect(), r = thumb.getBoundingClientRect();
        if (r.left < s.left) strip.scrollBy({ left: r.left - s.left, behavior: 'smooth' });
        else if (r.right > s.right) strip.scrollBy({ left: r.right - s.right, behavior: 'smooth' });
    }

    function show(index) {
        var n = items.length;
        current = (index + n) % n;
        var item = items[current];

        if (item.video) {
            photo.hidden = true;
            video.hidden = false;
            var playing = video.play();
            if (playing && playing.catch) playing.catch(function () { /* autoplay blocked: controls stay visible */ });
        } else {
            video.pause();
            video.hidden = true;
            photo.hidden = false;
            photo.src = item.src;
            photo.alt = title + ' — gallery item ' + (current + 1) + ' of ' + n;
        }
        count.textContent = (current + 1) + ' / ' + n;

        thumbs.forEach(function (t, i) {
            var on = i === current;
            t.classList.toggle('isActive', on);
            if (on) t.setAttribute('aria-current', 'true');
            else t.removeAttribute('aria-current');
        });
        keepThumbInView(thumbs[current]);
    }

    function openFullScreen() {
        if (!window.Fancybox) return;
        video.pause();
        // the .mp4 extension lets Fancybox detect the HTML5 video (and its MIME type) itself
        window.Fancybox.show(items.map(function (it, i) {
            return it.video
                ? { src: it.src, thumb: it.thumb, caption: title + ' — on-water video' }
                : { src: it.src, type: 'image', thumb: it.thumb, caption: title + ' — photo ' + (i + 1) + ' of ' + items.length };
        }), { startIndex: current, Hash: false });
    }

    thumbs.forEach(function (t, i) { t.addEventListener('click', function () { show(i); }); });
    root.querySelector('[data-gallery-prev]').addEventListener('click', function () { show(current - 1); });
    root.querySelector('[data-gallery-next]').addEventListener('click', function () { show(current + 1); });
    root.querySelector('[data-gallery-play]').addEventListener('click', function () {
        var v = items.findIndex(function (it) { return it.video; });
        if (v > -1) show(v);
    });
    root.querySelector('[data-gallery-fullscreen]').addEventListener('click', openFullScreen);
    photo.addEventListener('click', openFullScreen);

    root.addEventListener('keydown', function (e) {
        if (e.target === video) return;
        if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    });

    /* swipe on touch screens */
    var stage = photo.parentNode, startX = null;
    stage.addEventListener('touchstart', function (e) {
        startX = e.target === video ? null : e.touches[0].clientX;   // leave the video's own controls alone
    }, { passive: true });
    stage.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        startX = null;
        if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    });
})();
