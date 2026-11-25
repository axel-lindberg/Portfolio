/*
 * Google Analytics 4 — shared by every page.
 *
 * Traffic sources
 *   GA4 attributes visits from the referrer and from utm_* parameters. Many
 *   visits arrive with neither (LinkedIn app, PDF resume, email, Discord…) and
 *   show up as "(direct)". To label those, share links with a short ?ref= tag:
 *
 *     https://axel-lindberg.github.io/Portfolio/?ref=linkedin
 *     https://axel-lindberg.github.io/Portfolio/?ref=resume
 *
 *   ?ref=<name> is turned into utm_source=<name> & utm_medium=<see REF_MEDIUM>,
 *   then removed from the address bar so a copied link isn't mis-attributed.
 *   Regular utm_* links keep working as usual and take precedence.
 *
 * Your own visits
 *   Nothing is sent from localhost / file://. On your own phone or laptop,
 *   open the site once with ?notrack=1 to stop tracking that browser
 *   (?notrack=0 turns it back on).
 *
 * Custom events (register the params under Admin → Custom definitions):
 *   resume_click         { link_location }
 *   contact_email_click  { link_location }
 *   project_card_click   { project, card_position }
 *   video_start / video_progress / video_complete  { video_title, percent }
 */
(function () {
  'use strict';

  var GA_ID = 'G-LT5BD7VWH6';

  // How each ?ref= value is grouped in GA's "Session medium". Unlisted → 'referral'.
  var REF_MEDIUM = {
    linkedin: 'social',
    github: 'referral',
    resume: 'resume',
    cv: 'resume',
    email: 'email',
    itch: 'referral'
  };

  var host = location.hostname;
  if (location.protocol === 'file:' || host === 'localhost' || host === '127.0.0.1' || host === '') return;

  var params = new URLSearchParams(location.search);
  var store = safeStorage();
  if (params.has('notrack') && store) {
    if (params.get('notrack') === '0') store.removeItem('ga-optout');
    else store.setItem('ga-optout', '1');
  }
  if (store && store.getItem('ga-optout') === '1') window['ga-disable-' + GA_ID] = true;

  // ---- ?ref= → utm_* -------------------------------------------------------
  var pageLocation = location.href;
  var ref = (params.get('ref') || '').toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 40);
  if (params.has('ref')) {
    var tracked = new URL(location.href);
    tracked.searchParams.delete('ref');
    var clean = tracked.pathname + tracked.search + tracked.hash;
    if (ref && !tracked.searchParams.has('utm_source')) {
      tracked.searchParams.set('utm_source', ref);
      tracked.searchParams.set('utm_medium', REF_MEDIUM[ref] || 'referral');
    }
    pageLocation = tracked.href;
    if (history.replaceState) history.replaceState(history.state, '', clean);
  }

  // ---- gtag bootstrap --------------------------------------------------------
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID, { page_location: pageLocation });

  // ---- click tracking --------------------------------------------------------
  function linkLocation(el) {
    if (el.closest('.site-nav')) return 'nav';
    if (el.closest('.hero, main header')) return 'hero';
    if (el.closest('#contact')) return 'contact';
    if (el.closest('footer')) return 'footer';
    return 'body';
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');

    if (/^mailto:/i.test(href)) {
      gtag('event', 'contact_email_click', { link_location: linkLocation(a) });
    } else if (/resume\.pdf$/i.test(href)) {
      gtag('event', 'resume_click', { link_location: linkLocation(a) });
    } else if (a.matches('.project-grid .card')) {
      var cards = Array.prototype.slice.call(document.querySelectorAll('.project-grid .card'));
      gtag('event', 'project_card_click', {
        project: href.replace(/^.*\//, '').replace(/\.html$/, ''),
        card_position: cards.indexOf(a) + 1
      });
    }
  });

  // ---- <video> tracking (GA only auto-tracks YouTube embeds) ---------------
  function trackVideo(v) {
    var title = (v.currentSrc || v.querySelector('source') && v.querySelector('source').src || 'video')
      .replace(/^.*\//, '').replace(/\.[a-z0-9]+$/i, '');
    var sent = {};
    function once(name, percent) {
      var key = name + percent;
      if (sent[key]) return;
      sent[key] = true;
      gtag('event', name, { video_title: title, percent: percent });
    }
    v.addEventListener('play', function () { once('video_start', 0); });
    v.addEventListener('timeupdate', function () {
      if (!v.duration) return;
      var pct = v.currentTime / v.duration * 100;
      [25, 50, 75].forEach(function (m) { if (pct >= m) once('video_progress', m); });
    });
    v.addEventListener('ended', function () { once('video_complete', 100); });
  }

  function initVideos() { Array.prototype.forEach.call(document.querySelectorAll('video'), trackVideo); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initVideos);
  else initVideos();

  function safeStorage() {
    try { var k = '__t'; localStorage.setItem(k, k); localStorage.removeItem(k); return localStorage; }
    catch (err) { return null; }
  }
})();
