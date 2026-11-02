/* ==========================================================================
   THE SKI SHACK — shared header & footer
   --------------------------------------------------------------------------
   Every page contains the two empty shells below; this file fills them so the
   header and footer markup lives in exactly one place.

     <header id="siteHeader" class="siteHeader"></header>   (add siteHeaderOverlay on the homepage)
     <footer id="siteFooter" class="siteFooter"></footer>

   The active top-level nav item comes from <body data-nav="sales|brokerage|pro|service|company">.
   ========================================================================== */
(function () {
    'use strict';

    var IMG = 'assets/images/common/';
    // Page slug used to build CTA ids: [page]-[button-name]-btn (e.g. home-header-call-us-btn)
    var PAGE = (location.pathname.split('/').pop() || '').replace(/.html?$/, '') || 'home';

    var arrow = '<span class="ico icoArrow" aria-hidden="true"></span>';
    var chevron = '<span class="ico ico14 icoChevron" aria-hidden="true"></span>';

    var salesLinks = [
        { t: 'New Boats', href: 'listings.html' },
        { t: 'Used Boats', href: 'listings.html' },
        { t: 'Brokerage & Trade-Ins', href: 'brokerage.html' },
        { t: 'Schedule a Demo', href: 'schedule-demo.html' },
        { t: 'Financing', href: 'financing.html' }
    ];

    var brands = [
        { n: 'Malibu', href: 'brand-malibu.html', img: 'malibu-boat-on-lake.jpg', pos: '51% 50%', logo: 'logo-malibu.png', logoStyle: 'height:48px;width:auto' },
        { n: 'Axis', href: 'brand-axis.html', img: 'axis-boat-on-lake.webp', pos: '50% 50%', logo: 'logo-axis.png', logoStyle: 'height:46px;width:auto' },
        { n: 'Nautique', href: 'brand-nautique.html', img: 'nautique-rider-with-wakeboard.jpg', pos: '50% 50%', logo: 'logo-nautique.png', logoStyle: 'width:170px;height:auto' },
        { n: 'Chris-Craft', href: 'brand-chris-craft.html', img: 'chris-craft-runabout.jpg', pos: '50% 50%', logo: 'logo-chris-craft.png', logoStyle: 'width:160px;height:auto' },
        { n: 'Revel', href: 'brand-revel.html', img: 'revel-pontoon-on-lake.jpg', pos: '50% 50%', logo: 'logo-revel.png', logoStyle: 'height:56px;width:auto' }
    ];

    var serviceLinks = [
        { t: 'Service Center', d: 'Maintenance, diagnostics & repair', href: 'service-center.html' },
        { t: 'Mobile Service', d: 'At your dock or on the water', href: 'mobile-service.html' },
        { t: 'Winterization & Spring Start-Up', d: 'Seasonal prep, done right', href: 'winterization.html' },
        { t: 'Warranty Service', d: 'Authorized for the brands we sell', href: 'warranty-service.html' },
        { t: 'Engine & Outboard Repair', d: 'Inboard, sterndrive & outboard', href: 'engine-repair.html' },
        { t: 'Detailing', d: 'Hull, interior & gelcoat care', href: 'detailing.html' }
    ];

    var companyLinks = [
        { t: 'About Us', href: 'about-us.html' },
        { t: 'Meet Our Staff', href: 'staff.html' },
        { t: 'Careers', href: 'careers.html' },
        { t: 'Testimonials', href: 'testimonials.html' },
        { t: 'Contact', href: 'contact.html' }
    ];

    var communityLinks = [
        { t: 'Events', href: 'events.html' },
        { t: 'Boating Blog', href: 'blog.html' },
        { t: 'FAQs', href: 'faqs.html' }
    ];

    var locations = [
        { name: 'Springfield', href: 'location-springfield.html', tel: 'tel:+14178828480', phone: '417.882.8480', offers: 'Sales · Service · Parts · Pro Shop', addr: '5539 S. Campbell, Springfield, MO 65810', hours: 'Hours: Mon–Fri 9 AM–5 PM · Sat 10 AM–2 PM' },
        { name: 'Indian Point', href: 'location-indian-point.html', tel: 'tel:+14173388481', phone: '417.338.8481', offers: 'Pro Shop · Demos · Rentals', addr: '3443 Indian Point Rd, Branson, MO 65616', hours: 'Hours: Seasonal · Opens late May' },
        { name: 'Mill Creek', href: 'location-mill-creek.html', tel: 'tel:+14178828480', phone: '417.882.8480', offers: 'Service · Parts', addr: '8936 MO-13, Lampe, MO 65681', hours: 'Hours: Mon–Fri 9 AM–5 PM' }
    ];

    function esc(s) {
        return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function megaLinkList(list) {
        return list.map(function (l) {
            return '<a class="megaLink" href="' + l.href + '">' + esc(l.t) + ' ' + arrow + '</a>';
        }).join('');
    }

    /* ---------------------------------------------------------------- header */
    function headerHTML() {
        var brandTiles = brands.map(function (b) {
            return '<a class="megaBrandTile mediaFrame mediaFrameGradient" href="' + b.href + '">' +
                '<img class="coverImg" src="' + IMG + b.img + '" alt="' + b.n + ' boat" style="object-position:' + b.pos + '" loading="lazy">' +
                '<span class="megaBrandInfo"><img src="' + IMG + b.logo + '" alt="' + b.n + '" style="' + b.logoStyle + '">' +
                '<span class="megaBrandCta">Shop New →</span></span></a>';
        }).join('');

        var serviceItems = serviceLinks.map(function (s) {
            return '<a class="megaServiceLink" href="' + s.href + '"><strong>' + esc(s.t) + '</strong><span>' + esc(s.d) + '</span></a>';
        }).join('');

        var callCards = locations.map(function (l) {
            return '<div class="megaCallCard">' +
                '<div class="row2 justifyBetween gap16"><strong class="megaCallName">' + l.name + '</strong><span class="softChip">' + l.offers + '</span></div>' +
                '<a class="megaTel" href="' + l.tel + '">' + l.phone + '</a>' +
                '<span class="megaCallText">' + l.addr + '<br>' + l.hours + '</span>' +
                '<a class="megaCallLink" href="' + l.href + '">Location Details →</a></div>';
        }).join('');

        return '' +
            '<div class="siteContainer headerBar">' +
                '<a class="headerLogo" href="home.html" aria-label="The Ski Shack home"><img src="' + IMG + 'ski-shack-logo.png" alt="The Ski Shack"></a>' +
                '<nav class="mainNav" aria-label="Primary">' +
                    '<button class="navItem" type="button" data-menu="sales" data-section="sales" aria-expanded="false" aria-controls="megaSales">Sales ' + chevron + '</button>' +
                    '<a class="navItem" href="brokerage.html" data-section="brokerage">Brokerage</a>' +
                    '<a class="navItem" href="pro-shop.html" data-section="pro">Pro Shop</a>' +
                    '<button class="navItem" type="button" data-menu="service" data-section="service" aria-expanded="false" aria-controls="megaService">Service ' + chevron + '</button>' +
                    '<button class="navItem" type="button" data-menu="company" data-section="company" aria-expanded="false" aria-controls="megaCompany">Company ' + chevron + '</button>' +
                '</nav>' +
                '<div class="headerActions">' +
                    '<a class="iconBtn" href="listings.html" aria-label="Search inventory and site"><span class="ico ico20 icoSearch" aria-hidden="true"></span></a>' +
                    '<button id="' + PAGE + '-header-call-us-btn" class="greenBtn callBtn" type="button" data-menu="call" aria-expanded="false" aria-controls="megaCall">' +
                        '<span class="ico ico18 icoPhone" aria-hidden="true"></span><span class="callLabel">Call Us</span><span class="ico ico14 icoChevron callChevron" aria-hidden="true"></span>' +
                    '</button>' +
                    '<button class="iconBtn navToggle" type="button" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu"><span class="ico ico20 icoMenu" aria-hidden="true"></span></button>' +
                '</div>' +
            '</div>' +

            /* Sales */
            '<div id="megaSales" class="megaMenu" data-panel="sales">' +
                '<div class="siteContainer megaInner pt56 pb56">' +
                    '<div class="megaLinks"><p class="menuLabel">Sales</p>' + megaLinkList(salesLinks) + '</div>' +
                    '<div class="megaBrands"><p class="menuLabel">Shop by Brand</p>' +
                        '<div class="megaBrandGrid">' + brandTiles + '</div>' +
                        '<div class="megaFooterLink"><a class="textLink" href="listings.html">View All Inventory ' + arrow + '</a></div>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            /* Service */
            '<div id="megaService" class="megaMenu" data-panel="service">' +
                '<div class="siteContainer megaInner megaPadService">' +
                    '<div class="flexFill"><p class="menuLabel">Service</p><div class="megaServiceGrid">' + serviceItems + '</div></div>' +
                    '<div class="megaPromo">' +
                        '<span class="megaPromoTitle">Book Your<br>Service</span>' +
                        '<span class="megaPromoText">Available at <strong>Springfield</strong> and the <strong>Mill Creek Service Center</strong> in Lampe.</span>' +
                        '<a id="' + PAGE + '-header-schedule-service-btn" class="blueBtn btnSm selfStart marginTopAuto" href="service-center.html#request">Schedule Service</a>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            /* Company */
            '<div id="megaCompany" class="megaMenu" data-panel="company">' +
                '<div class="siteContainer megaInner pt48 pb48">' +
                    '<div class="megaLinks megaLinksWide"><p class="menuLabel">Company</p>' + megaLinkList(companyLinks) + '</div>' +
                    '<div class="megaLinks megaLinksWide"><p class="menuLabel">Community</p>' + megaLinkList(communityLinks) + '</div>' +
                    '<div class="megaFeatureGrid">' +
                        '<a class="megaFeature" href="event-details.html"><span class="mediaFrame mediaFrameGradient"><img class="coverImg" src="' + IMG + 'couple-relaxing-chris-craft.jpg" alt="Couple relaxing aboard a Chris-Craft at a boating event" loading="lazy"></span>' +
                            '<span class="megaFeatureLabel">Next Event · [DATE]</span><strong>[Event] — On-Water Demo Day</strong></a>' +
                        '<a class="megaFeature" href="blog-post.html"><span class="mediaFrame mediaFrameGradient"><img class="coverImg" src="' + IMG + 'wake-boat-engine.jpg" alt="Wake boat engine" loading="lazy"></span>' +
                            '<span class="megaFeatureLabel">From the Blog</span><strong>How to Winterize Your Wake Boat in Missouri</strong></a>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            /* Call */
            '<div id="megaCall" class="megaMenu" data-panel="call">' +
                '<div class="siteContainer stack gap24 megaPadCall">' +
                    '<p class="menuLabel mb0">Call or visit a location</p>' +
                    '<div class="megaCallGrid">' + callCards + '</div>' +
                '</div>' +
            '</div>' +

            /* Mobile */
            '<nav id="mobileNav" class="mobileNav" aria-label="Mobile">' +
                '<div class="siteContainer mobileNavInner">' +
                    mobileGroup('Sales', salesLinks.concat(brands.map(function (b) { return { t: 'Shop ' + b.n, href: b.href }; }))) +
                    '<div class="mobileNavGroup"><a class="mobileNavLink" href="brokerage.html">Brokerage ' + arrow + '</a></div>' +
                    '<div class="mobileNavGroup"><a class="mobileNavLink" href="pro-shop.html">Pro Shop ' + arrow + '</a></div>' +
                    mobileGroup('Service', serviceLinks) +
                    mobileGroup('Company', companyLinks.concat(communityLinks)) +
                    mobileGroup('Call Us', locations.map(function (l) { return { t: l.name + ' · ' + l.phone, href: l.tel }; })) +
                    '<div class="mobileNavCta"><a id="' + PAGE + '-mobile-shop-inventory-btn" class="blueBtn" href="listings.html">Shop Inventory</a><a id="' + PAGE + '-mobile-schedule-service-btn" class="outlineBtn" href="service-center.html#request">Schedule Service</a></div>' +
                '</div>' +
            '</nav>';
    }

    var mobileId = 0;
    function mobileGroup(title, list) {
        var id = 'mobilePanel' + (++mobileId);
        return '<div class="mobileNavGroup">' +
            '<button class="mobileNavToggle" type="button" aria-expanded="false" aria-controls="' + id + '">' + title + ' ' + chevron + '</button>' +
            '<div id="' + id + '" class="mobileNavPanel">' +
            list.map(function (l) { return '<a href="' + l.href + '">' + esc(l.t) + '</a>'; }).join('') +
            '</div></div>';
    }

    /* ---------------------------------------------------------------- footer */
    function footerHTML() {
        var footerNav = function (label, links) {
            return '<nav class="footerNav" aria-label="' + label + '"><p class="footerLabel">' + label + '</p>' +
                links.map(function (l) { return '<a class="footerLink" href="' + l.href + '">' + esc(l.t) + '</a>'; }).join('') + '</nav>';
        };
        var social = function (label, svg) {
            return '<a class="iconBtn" href="#" aria-label="The Ski Shack on ' + label + '"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' + svg + '</svg></a>';
        };
        var footerLocations = [
            { name: 'Springfield', href: 'location-springfield.html', addr: '5539 S. Campbell, Springfield, MO 65810', tel: 'tel:+14178828480', phone: '417.882.8480' },
            { name: 'Indian Point', href: 'location-indian-point.html', addr: '3443 Indian Point Rd, Branson, MO 65616', tel: 'tel:+14173388481', phone: '417.338.8481' },
            { name: 'Mill Creek Service Center', href: 'location-mill-creek.html', addr: '8936 MO-13, Lampe, MO 65681', tel: 'tel:+14178828480', phone: '417.882.8480' }
        ];

        return '' +
            '<div class="siteContainer footerMain">' +
                '<div class="footerBrand">' +
                    '<a href="home.html" aria-label="The Ski Shack home"><img class="footerLogo" src="' + IMG + 'ski-shack-logo.png" alt="The Ski Shack"></a>' +
                    '<p class="footerText">New and pre-owned boats, service and watersports gear in Springfield, Branson and Table Rock Lake, Missouri.</p>' +
                    '<form class="newsletterForm gtm_form" aria-label="Newsletter signup" action="javascript:void(0)" id="newsletter_form" data-form-id="Newsletter Signup Form" data-newsletter>' +
                        '<label for="newsletterEmail" class="footerLabel">Get new arrivals &amp; event news</label>' +
                        '<div class="field-error" id="error_newsletterEmail"></div>' +
                        '<div class="newsletterField"><input id="newsletterEmail" class="require_check" type="email" name="email" placeholder="Your email" autocomplete="email" aria-required="true"><button id="' + PAGE + '-footer-sign-up-btn" class="blueBtn gtm_form_submit g-recaptcha" type="submit" data-form-id="Newsletter Signup Form" data-sitekey="{{config.googleCaptchaSiteKey}}" data-callback="newsletter_form" data-action="submit">Sign Up</button></div>' +
                        '<input type="text" name="honeypot" id="newsletter_form_honeypot" style="display: none;" autocomplete="off" tabindex="-1">' +
                        '<div style="opacity: 0; position: absolute; top: 0; left: 0; height: 0; width: 0; z-index: -1;"><label for="newsletter_form_business_url">Business Website</label><input type="text" name="business_url" id="newsletter_form_business_url" tabindex="-1" autocomplete="off"></div>' +
                        '<!-- {{> partials/utm}} -->' +
                    '</form>' +
                    '<div class="socialLinks">' +
                        social('Facebook', '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>') +
                        social('Instagram', '<rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><path d="M17.5 6.5h.01"></path>') +
                        social('YouTube', '<rect x="2" y="5" width="20" height="14" rx="4"></rect><path d="M10 9l5 3-5 3z"></path>') +
                    '</div>' +
                '</div>' +
                footerNav('Sales', salesLinks.concat([{ t: 'Pro Shop', href: 'pro-shop.html' }])) +
                footerNav('Service', serviceLinks) +
                footerNav('Company', [
                    { t: 'Events', href: 'events.html' }, { t: 'About Us', href: 'about-us.html' }, { t: 'Meet Our Staff', href: 'staff.html' },
                    { t: 'Boating Blog', href: 'blog.html' }, { t: 'Testimonials', href: 'testimonials.html' }, { t: 'Contact', href: 'contact.html' }, { t: 'FAQs', href: 'faqs.html' }
                ]) +
                '<div class="footerLocations"><p class="footerLabel">Locations</p>' +
                    footerLocations.map(function (l) {
                        return '<div class="footerLocation"><a href="' + l.href + '">' + l.name + '</a><br>' + l.addr + '<br><a class="phoneLink" href="' + l.tel + '">' + l.phone + '</a></div>';
                    }).join('') +
                '</div>' +
            '</div>' +
            '<div class="siteContainer footerBottom">' +
                '<span>© 2026 The Ski Shack. All rights reserved.</span>' +
                '<span class="footerLegal"><a class="footerLink" href="#">Privacy</a><a class="footerLink" href="#">Terms</a><a class="footerLink" href="#">Sitemap</a><a class="footerLink" href="careers.html">Careers</a></span>' +
            '</div>';
    }

    /* ------------------------------------------------------------ behaviour */
    function initHeader(header) {
        var section = document.body.getAttribute('data-nav') || '';
        var triggers = header.querySelectorAll('[data-menu]');
        var panels = header.querySelectorAll('.megaMenu');
        var navItems = header.querySelectorAll('.mainNav .navItem');
        var current = null;

        function render() {
            panels.forEach(function (p) { p.classList.toggle('isOpen', p.getAttribute('data-panel') === current); });
            triggers.forEach(function (t) {
                var open = t.getAttribute('data-menu') === current;
                t.classList.toggle('isOpen', open);
                t.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
            navItems.forEach(function (n) {
                var s = n.getAttribute('data-section');
                // Dropdown sections only stay highlighted while no other menu is open; plain links always do.
                var active = s === section && (n.tagName === 'A' || !current);
                n.classList.toggle('isActive', active);
            });
        }
        function setMenu(m) { current = m; render(); }
        var desktop = window.matchMedia('(min-width: 1200px)');

        triggers.forEach(function (t) {
            var m = t.getAttribute('data-menu');
            t.addEventListener('click', function () {
                // Below 1200px the mega menus are hidden: the call button opens the mobile panel on its "Call Us" group.
                if (!desktop.matches && m === 'call') { openMobile('Call Us'); return; }
                setMenu(current === m ? null : m);
            });
            t.addEventListener('mouseenter', function () { if (desktop.matches) setMenu(m); });
        });
        header.querySelectorAll('.mainNav a.navItem, .headerActions a.iconBtn').forEach(function (a) {
            a.addEventListener('mouseenter', function () { if (desktop.matches) setMenu(null); });
        });
        header.addEventListener('mouseleave', function () { if (desktop.matches) setMenu(null); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { setMenu(null); closeMobile(); } });
        document.addEventListener('click', function (e) { if (!header.contains(e.target)) { setMenu(null); closeMobile(); } });

        /* mobile panel */
        var toggle = header.querySelector('.navToggle');
        var mobile = header.querySelector('.mobileNav');
        function closeMobile() {
            mobile.classList.remove('isOpen');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
            toggle.querySelector('.ico').className = 'ico ico20 icoMenu';
        }
        function setMobile(open) {
            setMenu(null);
            mobile.classList.toggle('isOpen', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            toggle.querySelector('.ico').className = 'ico ico20 ' + (open ? 'icoClose' : 'icoMenu');
        }
        function setGroup(button, open) {
            button.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.getElementById(button.getAttribute('aria-controls')).classList.toggle('isOpen', open);
        }
        function openMobile(groupTitle) {
            setMobile(true);
            header.querySelectorAll('.mobileNavToggle').forEach(function (b) {
                setGroup(b, b.textContent.trim() === groupTitle);
            });
        }
        toggle.addEventListener('click', function () { setMobile(!mobile.classList.contains('isOpen')); });
        header.querySelectorAll('.mobileNavToggle').forEach(function (b) {
            b.addEventListener('click', function () { setGroup(b, b.getAttribute('aria-expanded') !== 'true'); });
        });
        desktop.addEventListener('change', function () { setMenu(null); closeMobile(); });

        render();
    }

    var header = document.getElementById('siteHeader');
    if (header) {
        header.innerHTML = headerHTML();
        initHeader(header);
    }
    var footer = document.getElementById('siteFooter');
    if (footer) footer.innerHTML = footerHTML();
})();
