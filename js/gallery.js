/*
 * Thumbnail strip + large viewer gallery.
 *
 * Markup is the source of truth. Any element with [data-gallery] is wired up:
 *   [data-gallery-counter]  -> "2 / 4"
 *   [data-gallery-thumb]    -> <button data-full="…" data-caption="…"><img …></button>
 *   [data-gallery-image]    -> the <img> in the viewer
 *   [data-gallery-caption]  -> caption under the viewer
 *   [data-gallery-prev] / [data-gallery-next] -> overlay buttons
 * Add data-pad to a thumb for text-heavy images (screenshots of tables etc.)
 * so the prev/next buttons never sit on top of the content.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var FADE_MS = 200;

  function initGallery(root) {
    var thumbs = Array.prototype.slice.call(root.querySelectorAll('[data-gallery-thumb]'));
    var image = root.querySelector('[data-gallery-image]');
    var caption = root.querySelector('[data-gallery-caption]');
    var counter = root.querySelector('[data-gallery-counter]');
    var strip = root.querySelector('[data-gallery-strip]');
    var prev = root.querySelector('[data-gallery-prev]');
    var next = root.querySelector('[data-gallery-next]');
    if (!thumbs.length || !image) return;

    var total = thumbs.length;
    var current = Math.max(0, thumbs.findIndex(function (t) {
      return t.getAttribute('aria-pressed') === 'true';
    }));
    var token = 0;      // guards against out-of-order image loads
    var preloaded = {};

    if (total < 2) root.setAttribute('data-single', '');

    function preload(index) {
      var src = thumbs[index].getAttribute('data-full');
      if (!src || preloaded[src]) return;
      var img = new Image();
      img.decoding = 'async';
      img.src = src;
      preloaded[src] = img;
    }

    function scrollThumbIntoView(thumb) {
      if (!strip) return;
      var left = thumb.offsetLeft;
      var right = left + thumb.offsetWidth;
      var viewLeft = strip.scrollLeft;
      var viewRight = viewLeft + strip.clientWidth;
      var target = null;
      if (left < viewLeft) target = left - 4;
      else if (right > viewRight) target = right - strip.clientWidth + 4;
      if (target !== null) {
        strip.scrollTo({ left: target, behavior: reduceMotion && reduceMotion.matches ? 'auto' : 'smooth' });
      }
    }

    function swapImage(src, alt, padded) {
      var my = ++token;
      var animate = !(reduceMotion && reduceMotion.matches);

      function show() {
        if (my !== token) return;
        image.src = src;
        image.alt = alt;
        image.classList.toggle('is-padded', padded);
        image.classList.remove('is-fading');
      }

      if (!animate) { show(); return; }

      image.classList.add('is-fading');
      var loader = preloaded[src] || new Image();
      var ready = loader.complete && loader.naturalWidth > 0;
      var start = Date.now();

      function afterFadeOut() {
        var wait = Math.max(0, FADE_MS / 2 - (Date.now() - start));
        setTimeout(show, wait);
      }

      if (ready) {
        afterFadeOut();
      } else {
        loader.onload = loader.onerror = afterFadeOut;
        if (!loader.src) loader.src = src;
        preloaded[src] = loader;
      }
    }

    function select(index, opts) {
      index = (index + total) % total;
      var changed = index !== current;
      current = index;

      thumbs.forEach(function (t, i) {
        var on = i === index;
        t.setAttribute('aria-pressed', on ? 'true' : 'false');
        t.classList.toggle('is-selected', on);
      });

      var thumb = thumbs[index];
      var text = thumb.getAttribute('data-caption') || '';
      if (counter) counter.textContent = (index + 1) + ' / ' + total;
      if (caption) caption.textContent = text;
      if (changed || !image.getAttribute('src')) swapImage(thumb.getAttribute('data-full'), text, thumb.hasAttribute('data-pad'));

      scrollThumbIntoView(thumb);
      if (opts && opts.focusThumb) thumb.focus({ preventScroll: true });
      if (total > 1) preload((index + 1) % total);
    }

    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(i); });
    });
    if (prev) prev.addEventListener('click', function () { select(current - 1); });
    if (next) next.addEventListener('click', function () { select(current + 1); });

    root.addEventListener('keydown', function (e) {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      var onThumb = thumbs.indexOf(document.activeElement) !== -1;
      e.preventDefault();
      select(current + (e.key === 'ArrowRight' ? 1 : -1), { focusThumb: onThumb });
    });

    select(current);
  }

  function initAll() {
    document.querySelectorAll('[data-gallery]').forEach(initGallery);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
