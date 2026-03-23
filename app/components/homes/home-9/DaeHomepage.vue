<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

/* ─── Mobile nav toggle ─── */
const mobileMenuOpen = ref(false)

/* ─── Sticky nav ─── */
const navStuck = ref(false)
function handleScroll() {
  navStuck.value = window.scrollY > 10
}

/* ─── HOW IT WORKS — Step Selector ─── */
const activeStep = ref(0)
const steps = [
  {
    num: '01',
    title: 'Targeted Traffic',
    desc: 'Precision Meta and Google campaigns targeting patients actively searching for implant solutions in your area. Every dollar directed at high-intent audiences.'
  },
  {
    num: '02',
    title: 'Lead Capture',
    desc: 'Custom landing pages convert visitors into enquiries with qualifying questions built in from the start. No generic contact forms.'
  },
  {
    num: '03',
    title: 'AI Screening',
    desc: 'Every lead is automatically screened for budget, timeline, and treatment readiness before your team ever sees them.'
  },
  {
    num: '04',
    title: 'Automated Follow-Up',
    desc: 'Multi-channel sequences via SMS and email nurture leads who don\'t book immediately — converting over days, not minutes.'
  },
  {
    num: '05',
    title: 'Smart Booking',
    desc: 'Qualified patients are routed directly into your calendar with pre-filled consultation details. No back-and-forth.'
  },
  {
    num: '06',
    title: 'Revenue Tracking',
    desc: 'Track every patient from first click to treatment acceptance. Know your true cost-per-consultation and ROI.'
  }
]

/* ─── FAQ Accordion ─── */
const openFaq = ref(-1)
const faqs = [
  {
    q: 'How is DAE different from hiring a marketing agency?',
    a: 'Agencies manage campaigns. DAE is an end-to-end system that generates leads, qualifies them automatically, books consultations, and tracks revenue — all without account managers or monthly retainers.'
  },
  {
    q: 'What kind of results can I expect?',
    a: 'Results vary by market, but our system is built to deliver qualified implant consultations at a predictable cost. During onboarding, we\'ll model expected volume based on your location, budget, and competition.'
  },
  {
    q: 'Do I need to change my existing website?',
    a: 'No. DAE operates independently with its own landing pages, tracking, and booking flow. It works alongside your existing website and practice management software.'
  },
  {
    q: 'How long before I see results?',
    a: 'Most clinics see their first qualified leads within 7–14 days of launch. The system optimises continuously, with meaningful data within the first 30 days.'
  },
  {
    q: 'What does "founding clinic" access include?',
    a: 'Founding clinics receive priority onboarding, direct access to our team during setup, and preferential pricing locked in for the life of their account.'
  },
  {
    q: 'What if I already run ads?',
    a: 'Many of our clinics were running ads before DAE. The difference is the system behind the ads — qualification, follow-up, booking automation, and revenue tracking that most ad setups don\'t include.'
  }
]
function toggleFaq(i) {
  openFaq.value = openFaq.value === i ? -1 : i
}

/* ─── Scroll-Triggered Animations ─── */
let observer = null
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  nextTick(() => {
    const revealEls = document.querySelectorAll('.dae-reveal')
    /* First, hide all reveal elements below the fold */
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect()
      if (rect.top > window.innerHeight * 0.85) {
        el.classList.add('dae-hidden')
      }
    })
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('dae-hidden')
            entry.target.classList.add('dae-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    revealEls.forEach((el) => {
      observer.observe(el)
    })
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (observer) observer.disconnect()
})
</script>

<template>
  <div class="dae-page">

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- ANNOUNCEMENT BAR                                              -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="dae-announce">
      <div class="dae-announce__inner">
        <span class="dae-announce__badge">Now Live</span>
        <span>The patient acquisition system built for implant clinics</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- STICKY NAV                                                    -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <nav class="dae-nav" :class="{ 'dae-nav--stuck': navStuck }">
      <div class="dae-nav__inner">
        <!-- Logo -->
        <a href="/" class="dae-nav__logo">
          <img src="~/assets/images/common/dae-logo-white.png" alt="DAE" class="dae-nav__logo-img" />
        </a>

        <!-- Desktop links -->
        <div class="dae-nav__links">
          <a href="#how-it-works" class="dae-nav__link">How It Works</a>
          <a href="#platform" class="dae-nav__link">Platform</a>
          <a href="#founders" class="dae-nav__link">About</a>
          <a href="#faq" class="dae-nav__link">FAQ</a>
        </div>

        <!-- Right CTA -->
        <div class="dae-nav__ctas">
          <a href="#apply" class="dae-nav__cta dae-nav__cta--outline">Learn More</a>
          <a href="#apply" class="dae-nav__cta dae-nav__cta--primary">Book a Demo</a>
        </div>

        <!-- Mobile hamburger -->
        <button class="dae-nav__burger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile drawer -->
      <div class="dae-nav__mobile" v-if="mobileMenuOpen">
        <a href="#how-it-works" @click="mobileMenuOpen = false">How It Works</a>
        <a href="#platform" @click="mobileMenuOpen = false">Platform</a>
        <a href="#founders" @click="mobileMenuOpen = false">About</a>
        <a href="#faq" @click="mobileMenuOpen = false">FAQ</a>
        <a href="#apply" class="dae-nav__cta dae-nav__cta--primary" @click="mobileMenuOpen = false">Book a Demo</a>
      </div>
    </nav>

    <main>
      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 1: HERO                                           -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-hero">
        <div class="dae-hero__container">

          <!-- Pill badge -->
          <div class="dae-hero__badge-row dae-reveal">
            <div class="dae-hero__badge">
              <span class="dae-hero__badge-dot"></span>
              Now Accepting Founding Clinics
            </div>
          </div>

          <!-- Main headline -->
          <h1 class="dae-hero__h1 dae-reveal">
            Implant consultations booked
            <span class="dae-hero__accent">automatically.</span>
          </h1>

          <!-- Sub-headline -->
          <p class="dae-hero__sub dae-reveal">
            <strong class="dae-hero__sub-bold">AI-powered</strong>
            patient acquisition that generates, qualifies, and books
            high-value implant consultations — so your chairs stay full.
          </p>

          <!-- CTA Buttons -->
          <div class="dae-hero__ctas dae-reveal">
            <a href="#apply" class="dae-btn dae-btn--primary">Book a Demo</a>
            <a href="#how-it-works" class="dae-btn dae-btn--secondary">See How It Works</a>
          </div>
        </div>

        <!-- Decorative floating cards -->
        <div class="dae-hero__float dae-hero__float--left dae-reveal" aria-hidden="true">
          <div class="dae-float-card">
            <span class="dae-float-card__dot" style="background:#5CF7BB"></span>
            <div>
              <div class="dae-float-card__label">New Lead</div>
              <div class="dae-float-card__detail">Sarah M. — Full Arch Inquiry</div>
            </div>
          </div>
        </div>
        <div class="dae-hero__float dae-hero__float--right dae-reveal" aria-hidden="true">
          <div class="dae-float-card">
            <span class="dae-float-card__icon">📅</span>
            <div>
              <div class="dae-float-card__label">Consult Booked</div>
              <div class="dae-float-card__detail">Dr. Patel — Tomorrow 2:30pm</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 2: PRODUCT VISUAL (Pipeline Preview)              -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-preview">
        <div class="dae-container">
          <div class="dae-preview__card">
            <!-- Tab bar -->
            <div class="dae-preview__tabs">
              <button class="dae-preview__tab dae-preview__tab--active">Pipeline View</button>
              <button class="dae-preview__tab">Lead Tracker</button>
              <button class="dae-preview__tab">Revenue Dashboard</button>
              <button class="dae-preview__tab">Booking Calendar</button>
            </div>
            <!-- Mockup content -->
            <div class="dae-preview__body">
              <div class="dae-kanban">
                <div class="dae-kanban__cols">
                  <div class="dae-kanban__col">
                    <div class="dae-kanban__head"><span class="dae-kanban__dot" style="background:#5CF7BB"></span> New Lead <span class="dae-kanban__count">3</span></div>
                    <div class="dae-kanban__card">James R. — Single Implant</div>
                    <div class="dae-kanban__card">Maria K. — Full Arch</div>
                    <div class="dae-kanban__card">Tom W. — Consultation</div>
                  </div>
                  <div class="dae-kanban__col">
                    <div class="dae-kanban__head"><span class="dae-kanban__dot" style="background:#4da6ff"></span> Qualified <span class="dae-kanban__count">2</span></div>
                    <div class="dae-kanban__card">Sarah M. — Full Arch</div>
                    <div class="dae-kanban__card">David L. — All-on-4</div>
                  </div>
                  <div class="dae-kanban__col">
                    <div class="dae-kanban__head"><span class="dae-kanban__dot" style="background:#ffa94d"></span> Booked <span class="dae-kanban__count">1</span></div>
                    <div class="dae-kanban__card">Helen P. — Implant Bridge</div>
                  </div>
                  <div class="dae-kanban__col">
                    <div class="dae-kanban__head"><span class="dae-kanban__dot" style="background:#a78bfa"></span> Accepted <span class="dae-kanban__count">1</span></div>
                    <div class="dae-kanban__card">Robert G. — Full Arch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 3: SOCIAL PROOF — Credibility Strip               -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-proof">
        <div class="dae-container">
          <h2 class="dae-proof__h2 dae-reveal">
            Built by specialists in dental implant marketing
          </h2>
          <div class="dae-proof__badges dae-reveal">
            <img src="~/assets/images/custom-icons/google-badge.png" alt="Meta Business Partner" class="dae-proof__badge-img" />
          </div>
          <div class="dae-proof__stats dae-reveal">
            <div class="dae-proof__stat">
              <div class="dae-proof__stat-val">$25M+</div>
              <div class="dae-proof__stat-label">Ad Spend Managed</div>
            </div>
            <div class="dae-proof__stat">
              <div class="dae-proof__stat-val">60+</div>
              <div class="dae-proof__stat-label">Clinics Served</div>
            </div>
            <div class="dae-proof__stat">
              <div class="dae-proof__stat-val">7–14</div>
              <div class="dae-proof__stat-label">Days to First Leads</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 4: COMPARISON — Old Way vs DAE                    -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-compare">
        <div class="dae-container">
          <h2 class="dae-section-h2 dae-reveal">
            Most implant enquiries never become patients
          </h2>
          <div class="dae-compare__grid dae-reveal">

            <!-- Old way -->
            <div class="dae-compare__card dae-compare__card--old">
              <h3 class="dae-compare__card-title">Traditional Marketing</h3>
              <ul class="dae-compare__list">
                <li><span class="dae-x">✗</span> Unqualified leads clog your front desk</li>
                <li><span class="dae-x">✗</span> No automated follow-up system</li>
                <li><span class="dae-x">✗</span> Consultations with price shoppers</li>
                <li><span class="dae-x">✗</span> No visibility on cost-per-patient</li>
                <li><span class="dae-x">✗</span> Agency retainers with unclear ROI</li>
              </ul>
            </div>

            <!-- DAE way -->
            <div class="dae-compare__card dae-compare__card--new">
              <h3 class="dae-compare__card-title dae-compare__card-title--light">The DAE System</h3>
              <ul class="dae-compare__list dae-compare__list--light">
                <li><span class="dae-check">✓</span> AI-screened, qualified leads only</li>
                <li><span class="dae-check">✓</span> Automated SMS &amp; email nurturing</li>
                <li><span class="dae-check">✓</span> Consultations with real candidates</li>
                <li><span class="dae-check">✓</span> Full revenue tracking, click to chair</li>
                <li><span class="dae-check">✓</span> One system, no agency dependency</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 5: HOW IT WORKS — 3 Steps Overview                -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section id="how-it-works" class="dae-steps-overview">
        <div class="dae-container">
          <h2 class="dae-section-h2 dae-reveal">
            From ad click to booked consultation
          </h2>
          <div class="dae-steps-overview__grid dae-reveal">
            <div class="dae-step-card">
              <div class="dae-step-card__num">1</div>
              <h3 class="dae-step-card__title">Attract</h3>
              <p class="dae-step-card__desc">High-intent campaigns on Meta and Google bring implant-ready patients to your door. Precision targeting, not awareness spray.</p>
            </div>
            <div class="dae-step-card">
              <div class="dae-step-card__num">2</div>
              <h3 class="dae-step-card__title">Qualify</h3>
              <p class="dae-step-card__desc">AI screens every lead for treatment readiness, budget, and timeline before your team touches them. Only real candidates get through.</p>
            </div>
            <div class="dae-step-card">
              <div class="dae-step-card__num">3</div>
              <h3 class="dae-step-card__title">Book</h3>
              <p class="dae-step-card__desc">Qualified patients are routed into your calendar automatically. Pre-filled details, zero phone tag, consultations that convert.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 6A: FEATURE — Targeted Traffic + Lead Capture     -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section id="platform" class="dae-feature">
        <div class="dae-container">
          <div class="dae-feature__grid">
            <div class="dae-feature__text dae-reveal">
              <h2 class="dae-feature__h2">Generate high-intent implant enquiries on autopilot</h2>
              <p class="dae-feature__body">
                Precision ad campaigns on Meta and Google target patients actively searching for implant solutions.
                Custom landing pages with built-in qualification capture every lead with purpose.
              </p>
              <div class="dae-pills">
                <span class="dae-pill-tag">Meta Ads</span>
                <span class="dae-pill-tag">Google Ads</span>
                <span class="dae-pill-tag">Custom Landing Pages</span>
                <span class="dae-pill-tag">Lead Qualification</span>
                <span class="dae-pill-tag">Geo-Targeting</span>
              </div>
              <a href="#how-it-works" class="dae-feature__link">See the full pipeline →</a>
            </div>
            <div class="dae-feature__visual dae-reveal">
              <div class="ghl-dash">
                <!-- Sidebar -->
                <aside class="ghl-dash__sidebar">
                  <div class="ghl-dash__logo">
                    <img src="~/assets/images/common/dae-logo-white.png" alt="DAE" class="ghl-dash__logo-img" />
                  </div>
                  <div class="ghl-dash__search">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>Search...</span>
                  </div>
                  <div class="ghl-dash__nav-group">
                    <span class="ghl-dash__nav-label">MAIN</span>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                      Dashboard
                    </a>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                      Conversations
                    </a>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      Calendar
                    </a>
                    <a class="ghl-dash__nav-item ghl-dash__nav-item--active">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                      Contacts
                      <span class="ghl-dash__badge">24</span>
                    </a>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      Opportunities
                    </a>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                      Payments
                    </a>
                  </div>
                  <div class="ghl-dash__nav-group">
                    <span class="ghl-dash__nav-label">MARKETING</span>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                      Campaigns
                    </a>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                      Sites
                    </a>
                  </div>
                  <div class="ghl-dash__nav-group">
                    <span class="ghl-dash__nav-label">REPORTING</span>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                      Reports
                    </a>
                    <a class="ghl-dash__nav-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                      Settings
                    </a>
                  </div>
                  <div class="ghl-dash__user">
                    <span class="ghl-dash__avatar ghl-dash__avatar--sm ghl-dash__avatar--green">SM</span>
                    <div class="ghl-dash__user-info">
                      <span class="ghl-dash__user-name">Dr. Sarah Mitchell</span>
                      <span class="ghl-dash__user-role">Implant Specialist</span>
                    </div>
                  </div>
                </aside>
                <!-- Main Content -->
                <div class="ghl-dash__main">
                  <!-- Header -->
                  <div class="ghl-dash__header">
                    <h3 class="ghl-dash__title">Contacts</h3>
                    <div class="ghl-dash__header-actions">
                      <div class="ghl-dash__search-bar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        <span>Search patients...</span>
                      </div>
                      <button class="ghl-dash__add-btn">+ Add Patient</button>
                    </div>
                  </div>
                  <!-- Filter Tabs -->
                  <div class="ghl-dash__filters">
                    <span class="ghl-dash__filter ghl-dash__filter--active">All <b>24</b></span>
                    <span class="ghl-dash__filter"><i class="ghl-dash__dot ghl-dash__dot--new"></i> New <b>12</b></span>
                    <span class="ghl-dash__filter"><i class="ghl-dash__dot ghl-dash__dot--qualified"></i> Qualified <b>8</b></span>
                    <span class="ghl-dash__filter"><i class="ghl-dash__dot ghl-dash__dot--booked"></i> Booked <b>4</b></span>
                  </div>
                  <!-- Patient Cards Grid -->
                  <div class="ghl-dash__cards">
                    <!-- Card 1 -->
                    <div class="ghl-dash__card">
                      <div class="ghl-dash__card-top">
                        <div class="ghl-dash__card-identity">
                          <span class="ghl-dash__avatar ghl-dash__avatar--blue">JA</span>
                          <div>
                            <span class="ghl-dash__card-name">James Anderson</span>
                            <span class="ghl-dash__card-loc">📍 Sydney, NSW</span>
                          </div>
                        </div>
                        <span class="ghl-dash__status ghl-dash__status--new">● New</span>
                      </div>
                      <div class="ghl-dash__tags">
                        <span class="ghl-dash__tag ghl-dash__tag--teal">Full Arch Implants</span>
                        <span class="ghl-dash__tag ghl-dash__tag--gray">Google Ads</span>
                      </div>
                      <div class="ghl-dash__metrics">
                        <div><span class="ghl-dash__metric-label">Est. Value</span><span class="ghl-dash__metric-val ghl-dash__metric-val--teal">$28,000</span></div>
                        <div><span class="ghl-dash__metric-label">Lead Score</span><span class="ghl-dash__metric-val">87/100</span></div>
                      </div>
                      <div class="ghl-dash__pipeline">
                        <div class="ghl-dash__pipe-track">
                          <div class="ghl-dash__pipe-fill" style="width:40%"></div>
                          <span class="ghl-dash__pipe-dot" style="left:40%"></span>
                        </div>
                        <div class="ghl-dash__pipe-labels">
                          <span>Lead</span><span class="ghl-dash__pipe-active">Qualify</span><span>Book</span><span>Consult</span>
                        </div>
                      </div>
                      <div class="ghl-dash__card-footer">
                        <span class="ghl-dash__timestamp">Added 2 hours ago</span>
                        <div class="ghl-dash__actions">
                          <span class="ghl-dash__action-icon">📞</span>
                          <span class="ghl-dash__action-icon">✉️</span>
                          <span class="ghl-dash__action-icon">⋯</span>
                        </div>
                      </div>
                    </div>
                    <!-- Card 2 -->
                    <div class="ghl-dash__card">
                      <div class="ghl-dash__card-top">
                        <div class="ghl-dash__card-identity">
                          <span class="ghl-dash__avatar ghl-dash__avatar--orange">ST</span>
                          <div>
                            <span class="ghl-dash__card-name">Sophie Taylor</span>
                            <span class="ghl-dash__card-loc">📍 Perth, WA</span>
                          </div>
                        </div>
                        <span class="ghl-dash__status ghl-dash__status--qualified">● Qualified</span>
                      </div>
                      <div class="ghl-dash__tags">
                        <span class="ghl-dash__tag ghl-dash__tag--teal">All-on-4 Implants</span>
                        <span class="ghl-dash__tag ghl-dash__tag--gray">Facebook</span>
                        <span class="ghl-dash__tag ghl-dash__tag--gray">Urgent</span>
                      </div>
                      <div class="ghl-dash__metrics">
                        <div><span class="ghl-dash__metric-label">Est. Value</span><span class="ghl-dash__metric-val ghl-dash__metric-val--teal">$24,000</span></div>
                        <div><span class="ghl-dash__metric-label">Lead Score</span><span class="ghl-dash__metric-val">92/100</span></div>
                      </div>
                      <div class="ghl-dash__pipeline">
                        <div class="ghl-dash__pipe-track">
                          <div class="ghl-dash__pipe-fill" style="width:65%"></div>
                          <span class="ghl-dash__pipe-dot" style="left:65%"></span>
                        </div>
                        <div class="ghl-dash__pipe-labels">
                          <span>Lead</span><span>Qualify</span><span class="ghl-dash__pipe-active">Book</span><span>Consult</span>
                        </div>
                      </div>
                      <div class="ghl-dash__card-footer">
                        <span class="ghl-dash__timestamp">Qualified 3 hours ago</span>
                        <div class="ghl-dash__actions">
                          <span class="ghl-dash__action-icon">📞</span>
                          <span class="ghl-dash__action-icon">✉️</span>
                          <span class="ghl-dash__action-icon">⋯</span>
                        </div>
                      </div>
                    </div>
                    <!-- Card 3 -->
                    <div class="ghl-dash__card">
                      <div class="ghl-dash__card-top">
                        <div class="ghl-dash__card-identity">
                          <span class="ghl-dash__avatar ghl-dash__avatar--red">RN</span>
                          <div>
                            <span class="ghl-dash__card-name">Rachel Nguyen</span>
                            <span class="ghl-dash__card-loc">📍 Sydney, NSW</span>
                          </div>
                        </div>
                        <span class="ghl-dash__status ghl-dash__status--booked">● Booked</span>
                      </div>
                      <div class="ghl-dash__tags">
                        <span class="ghl-dash__tag ghl-dash__tag--teal">Full Arch Implants</span>
                        <span class="ghl-dash__tag ghl-dash__tag--gray">Referral</span>
                      </div>
                      <div class="ghl-dash__metrics">
                        <div><span class="ghl-dash__metric-label">Est. Value</span><span class="ghl-dash__metric-val ghl-dash__metric-val--teal">$32,000</span></div>
                        <div><span class="ghl-dash__metric-label">Lead Score</span><span class="ghl-dash__metric-val">95/100</span></div>
                      </div>
                      <div class="ghl-dash__pipeline">
                        <div class="ghl-dash__pipe-track">
                          <div class="ghl-dash__pipe-fill" style="width:100%"></div>
                          <span class="ghl-dash__pipe-dot" style="left:100%"></span>
                        </div>
                        <div class="ghl-dash__pipe-labels">
                          <span>Lead</span><span>Qualify</span><span>Book</span><span class="ghl-dash__pipe-active">Consult</span>
                        </div>
                      </div>
                      <div class="ghl-dash__card-footer">
                        <span class="ghl-dash__timestamp">Mar 28, 10:00am</span>
                        <div class="ghl-dash__actions">
                          <span class="ghl-dash__action-icon">📞</span>
                          <span class="ghl-dash__action-icon">✉️</span>
                          <span class="ghl-dash__action-icon">⋯</span>
                        </div>
                      </div>
                    </div>
                    <!-- Card 4 -->
                    <div class="ghl-dash__card">
                      <div class="ghl-dash__card-top">
                        <div class="ghl-dash__card-identity">
                          <span class="ghl-dash__avatar ghl-dash__avatar--purple">MC</span>
                          <div>
                            <span class="ghl-dash__card-name">Maria Chen</span>
                            <span class="ghl-dash__card-loc">📍 Melbourne, VIC</span>
                          </div>
                        </div>
                        <span class="ghl-dash__status ghl-dash__status--new">● New</span>
                      </div>
                      <div class="ghl-dash__tags">
                        <span class="ghl-dash__tag ghl-dash__tag--teal">Single Implant</span>
                        <span class="ghl-dash__tag ghl-dash__tag--gray">Website</span>
                      </div>
                      <div class="ghl-dash__metrics">
                        <div><span class="ghl-dash__metric-label">Est. Value</span><span class="ghl-dash__metric-val ghl-dash__metric-val--teal">$5,500</span></div>
                        <div><span class="ghl-dash__metric-label">Lead Score</span><span class="ghl-dash__metric-val">64/100</span></div>
                      </div>
                      <div class="ghl-dash__pipeline">
                        <div class="ghl-dash__pipe-track">
                          <div class="ghl-dash__pipe-fill" style="width:40%"></div>
                          <span class="ghl-dash__pipe-dot" style="left:40%"></span>
                        </div>
                        <div class="ghl-dash__pipe-labels">
                          <span>Lead</span><span class="ghl-dash__pipe-active">Qualify</span><span>Book</span><span>Consult</span>
                        </div>
                      </div>
                      <div class="ghl-dash__card-footer">
                        <span class="ghl-dash__timestamp">Added 5 hours ago</span>
                        <div class="ghl-dash__actions">
                          <span class="ghl-dash__action-icon">📞</span>
                          <span class="ghl-dash__action-icon">✉️</span>
                          <span class="ghl-dash__action-icon">⋯</span>
                        </div>
                      </div>
                    </div>
                    <!-- Card 5 -->
                    <div class="ghl-dash__card">
                      <div class="ghl-dash__card-top">
                        <div class="ghl-dash__card-identity">
                          <span class="ghl-dash__avatar ghl-dash__avatar--orange">DK</span>
                          <div>
                            <span class="ghl-dash__card-name">David Kim</span>
                            <span class="ghl-dash__card-loc">📍 Adelaide, SA</span>
                          </div>
                        </div>
                        <span class="ghl-dash__status ghl-dash__status--qualified">● Qualified</span>
                      </div>
                      <div class="ghl-dash__tags">
                        <span class="ghl-dash__tag ghl-dash__tag--teal">Single Implant</span>
                        <span class="ghl-dash__tag ghl-dash__tag--gray">Google Ads</span>
                      </div>
                      <div class="ghl-dash__metrics">
                        <div><span class="ghl-dash__metric-label">Est. Value</span><span class="ghl-dash__metric-val ghl-dash__metric-val--teal">$5,500</span></div>
                        <div><span class="ghl-dash__metric-label">Lead Score</span><span class="ghl-dash__metric-val">78/100</span></div>
                      </div>
                      <div class="ghl-dash__pipeline">
                        <div class="ghl-dash__pipe-track">
                          <div class="ghl-dash__pipe-fill" style="width:65%"></div>
                          <span class="ghl-dash__pipe-dot" style="left:65%"></span>
                        </div>
                        <div class="ghl-dash__pipe-labels">
                          <span>Lead</span><span>Qualify</span><span class="ghl-dash__pipe-active">Book</span><span>Consult</span>
                        </div>
                      </div>
                      <div class="ghl-dash__card-footer">
                        <span class="ghl-dash__timestamp">Qualified 1 day ago</span>
                        <div class="ghl-dash__actions">
                          <span class="ghl-dash__action-icon">📞</span>
                          <span class="ghl-dash__action-icon">✉️</span>
                          <span class="ghl-dash__action-icon">⋯</span>
                        </div>
                      </div>
                    </div>
                    <!-- Card 6 -->
                    <div class="ghl-dash__card">
                      <div class="ghl-dash__card-top">
                        <div class="ghl-dash__card-identity">
                          <span class="ghl-dash__avatar ghl-dash__avatar--green">MT</span>
                          <div>
                            <span class="ghl-dash__card-name">Michael Torres</span>
                            <span class="ghl-dash__card-loc">📍 Gold Coast, QLD</span>
                          </div>
                        </div>
                        <span class="ghl-dash__status ghl-dash__status--booked">● Booked</span>
                      </div>
                      <div class="ghl-dash__tags">
                        <span class="ghl-dash__tag ghl-dash__tag--teal">All-on-4 Implants</span>
                        <span class="ghl-dash__tag ghl-dash__tag--gray">Facebook</span>
                        <span class="ghl-dash__tag ghl-dash__tag--gray">Insurance</span>
                      </div>
                      <div class="ghl-dash__metrics">
                        <div><span class="ghl-dash__metric-label">Est. Value</span><span class="ghl-dash__metric-val ghl-dash__metric-val--teal">$24,000</span></div>
                        <div><span class="ghl-dash__metric-label">Lead Score</span><span class="ghl-dash__metric-val">91/100</span></div>
                      </div>
                      <div class="ghl-dash__pipeline">
                        <div class="ghl-dash__pipe-track">
                          <div class="ghl-dash__pipe-fill" style="width:100%"></div>
                          <span class="ghl-dash__pipe-dot" style="left:100%"></span>
                        </div>
                        <div class="ghl-dash__pipe-labels">
                          <span>Lead</span><span>Qualify</span><span>Book</span><span class="ghl-dash__pipe-active">Consult</span>
                        </div>
                      </div>
                      <div class="ghl-dash__card-footer">
                        <span class="ghl-dash__timestamp">Mar 29, 2:30pm</span>
                        <div class="ghl-dash__actions">
                          <span class="ghl-dash__action-icon">📞</span>
                          <span class="ghl-dash__action-icon">✉️</span>
                          <span class="ghl-dash__action-icon">⋯</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 6B: FEATURE — AI Screening + Follow-Up            -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-feature dae-feature--alt">
        <div class="dae-container">
          <div class="dae-feature__grid dae-feature__grid--reverse">
            <div class="dae-feature__visual dae-reveal">
              <div class="dae-mockup-card">
                <div class="dae-mockup-card__header">
                  <span class="dae-mockup-card__dot" style="background:#ff5f56"></span>
                  <span class="dae-mockup-card__dot" style="background:#ffbd2e"></span>
                  <span class="dae-mockup-card__dot" style="background:#27c93f"></span>
                  <span class="dae-mockup-card__title">Lead Screening</span>
                </div>
                <div class="dae-mockup-card__body">
                  <div class="dae-screen-row">
                    <span class="dae-screen-row__name">Sarah M.</span>
                    <span class="dae-screen-row__tag dae-screen-row__tag--pass">Qualified</span>
                  </div>
                  <div class="dae-screen-row">
                    <span class="dae-screen-row__name">Mike T.</span>
                    <span class="dae-screen-row__tag dae-screen-row__tag--review">Under Review</span>
                  </div>
                  <div class="dae-screen-row">
                    <span class="dae-screen-row__name">Linda K.</span>
                    <span class="dae-screen-row__tag dae-screen-row__tag--pass">Qualified</span>
                  </div>
                  <div class="dae-screen-row">
                    <span class="dae-screen-row__name">John D.</span>
                    <span class="dae-screen-row__tag dae-screen-row__tag--fail">Unqualified</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="dae-feature__text dae-reveal">
              <h2 class="dae-feature__h2">Every lead screened and nurtured before you see them</h2>
              <p class="dae-feature__body">
                AI evaluates every enquiry for budget, timeline, and treatment readiness.
                Multi-channel follow-up via SMS and email converts leads who don't book immediately.
              </p>
              <div class="dae-pills">
                <span class="dae-pill-tag">AI Lead Scoring</span>
                <span class="dae-pill-tag">SMS Sequences</span>
                <span class="dae-pill-tag">Email Nurturing</span>
                <span class="dae-pill-tag">Budget Screening</span>
                <span class="dae-pill-tag">Timeline Qualification</span>
              </div>
              <a href="#how-it-works" class="dae-feature__link">See screening in action →</a>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 6C: FEATURE — Smart Booking + Revenue Tracking    -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-feature">
        <div class="dae-container">
          <div class="dae-feature__grid">
            <div class="dae-feature__text dae-reveal">
              <h2 class="dae-feature__h2">Consultations booked and revenue tracked end-to-end</h2>
              <p class="dae-feature__body">
                Qualified patients route directly into your calendar with pre-filled details.
                Track every patient from first click to treatment acceptance — real ROI, not vanity metrics.
              </p>
              <div class="dae-pills">
                <span class="dae-pill-tag">Calendar Integration</span>
                <span class="dae-pill-tag">Pre-Filled Details</span>
                <span class="dae-pill-tag">Revenue Attribution</span>
                <span class="dae-pill-tag">Cost-Per-Consultation</span>
                <span class="dae-pill-tag">Pipeline Analytics</span>
              </div>
              <a href="#how-it-works" class="dae-feature__link">See revenue tracking →</a>
            </div>
            <div class="dae-feature__visual dae-reveal">
              <div class="dae-mockup-card">
                <div class="dae-mockup-card__header">
                  <span class="dae-mockup-card__dot" style="background:#ff5f56"></span>
                  <span class="dae-mockup-card__dot" style="background:#ffbd2e"></span>
                  <span class="dae-mockup-card__dot" style="background:#27c93f"></span>
                  <span class="dae-mockup-card__title">Revenue Tracker</span>
                </div>
                <div class="dae-mockup-card__body">
                  <div class="dae-mockup-stat"><span class="dae-mockup-stat__val">$142K</span><span class="dae-mockup-stat__label">Revenue This Month</span></div>
                  <div class="dae-mockup-stat"><span class="dae-mockup-stat__val">38</span><span class="dae-mockup-stat__label">Consultations Booked</span></div>
                  <div class="dae-mockup-stat"><span class="dae-mockup-stat__val">72%</span><span class="dae-mockup-stat__label">Acceptance Rate</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 7: STATS BANNER                                   -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-stats">
        <div class="dae-container">
          <h2 class="dae-stats__h2 dae-reveal">Built to fill chairs, not generate vanity metrics</h2>
          <div class="dae-stats__grid dae-reveal">
            <div class="dae-stats__item">
              <div class="dae-stats__val">6</div>
              <p class="dae-stats__label">Automated stages from click to chair</p>
            </div>
            <div class="dae-stats__item">
              <div class="dae-stats__val">24/7</div>
              <p class="dae-stats__label">Lead capture and nurturing — never off</p>
            </div>
            <div class="dae-stats__item">
              <div class="dae-stats__val">100%</div>
              <p class="dae-stats__label">Revenue visibility, first click to treatment</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 8: HOW IT WORKS — Detailed 6 Steps                -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-detailed-steps">
        <div class="dae-container">
          <div class="dae-detailed-steps__header dae-reveal">
            <h2 class="dae-section-h2">The complete patient acquisition pipeline</h2>
            <p class="dae-section-sub">Six stages. Fully automated. Nothing falls through the cracks.</p>
          </div>
          <div class="dae-detailed-steps__layout dae-reveal">
            <div class="dae-detailed-steps__sidebar">
              <button
                v-for="(step, i) in steps"
                :key="i"
                class="dae-step-selector"
                :class="{ 'dae-step-selector--active': activeStep === i }"
                @click="activeStep = i"
              >
                <span class="dae-step-selector__num">{{ step.num }}</span>
                <span class="dae-step-selector__title">{{ step.title }}</span>
              </button>
            </div>
            <div class="dae-detailed-steps__content">
              <transition name="dae-fade" mode="out-in">
                <div :key="activeStep" class="dae-step-detail">
                  <h3 class="dae-step-detail__title">{{ steps[activeStep].title }}</h3>
                  <p class="dae-step-detail__desc">{{ steps[activeStep].desc }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 9: FOUNDERS / CREDIBILITY                         -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section id="founders" class="dae-founders">
        <div class="dae-container">
          <h2 class="dae-section-h2 dae-reveal">Built by people who know dental implant marketing</h2>
          <div class="dae-founders__grid dae-reveal">
            <div class="dae-founder-card">
              <div class="dae-founder-card__avatar">MM</div>
              <h3 class="dae-founder-card__name">Matt McDougall</h3>
              <p class="dae-founder-card__role">Co-Founder &amp; Systems Architect</p>
              <p class="dae-founder-card__stat">$25M+ in ad spend managed across health &amp; dental verticals</p>
            </div>
            <div class="dae-founder-card">
              <div class="dae-founder-card__avatar">LR</div>
              <h3 class="dae-founder-card__name">Lachlan Robertson</h3>
              <p class="dae-founder-card__role">Co-Founder &amp; Lead Generation Strategist</p>
              <p class="dae-founder-card__stat">60+ dental clinics scaled with predictable patient pipelines</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 10: FAQ                                           -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section id="faq" class="dae-faq">
        <div class="dae-container dae-faq__container">
          <h2 class="dae-section-h2 dae-reveal">Frequently asked questions</h2>
          <div class="dae-faq__list dae-reveal">
            <div
              v-for="(item, i) in faqs"
              :key="i"
              class="dae-faq__item"
              :class="{ 'dae-faq__item--open': openFaq === i }"
            >
              <button class="dae-faq__q" @click="toggleFaq(i)">
                <span>{{ item.q }}</span>
                <svg class="dae-faq__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5l5 5 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="dae-faq__a" v-show="openFaq === i">
                <p>{{ item.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 11: PRE-FOOTER CTA                                -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section id="apply" class="dae-cta-banner">
        <div class="dae-container dae-cta-banner__inner">
          <h2 class="dae-cta-banner__h2 dae-reveal">Ready to fill your chairs with qualified implant patients?</h2>
          <p class="dae-cta-banner__sub dae-reveal">
            Limited founding clinic spots available. Lock in priority onboarding and preferential pricing.
          </p>
          <a href="mailto:hello@getdae.com" class="dae-btn dae-btn--white dae-reveal">Apply for Founding Clinic Access</a>
        </div>
      </section>
    </main>

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- FOOTER                                                        -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <footer class="dae-footer">
      <div class="dae-container">

        <!-- Top row: tagline + CTA -->
        <div class="dae-footer__top">
          <h2 class="dae-footer__tagline">Stop losing implant patients to a broken pipeline.</h2>
          <a href="#apply" class="dae-btn dae-btn--primary">Book a Demo</a>
        </div>

        <!-- Footer nav grid -->
        <div class="dae-footer__grid">
          <div>
            <h4 class="dae-footer__col-title">Platform</h4>
            <ul class="dae-footer__links">
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#platform">Features</a></li>
              <li><a href="#founders">About Us</a></li>
              <li><a href="#apply">Book a Demo</a></li>
            </ul>
          </div>
          <div>
            <h4 class="dae-footer__col-title">System</h4>
            <ul class="dae-footer__links">
              <li><a href="#how-it-works">Targeted Traffic</a></li>
              <li><a href="#how-it-works">Lead Capture</a></li>
              <li><a href="#how-it-works">AI Screening</a></li>
              <li><a href="#how-it-works">Smart Booking</a></li>
              <li><a href="#how-it-works">Revenue Tracking</a></li>
            </ul>
          </div>
          <div>
            <h4 class="dae-footer__col-title">Company</h4>
            <ul class="dae-footer__links">
              <li><a href="mailto:hello@getdae.com">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="dae-footer__bottom">
          <div class="dae-footer__bottom-left">
            <img src="~/assets/images/common/dae-logo-white.png" alt="DAE" class="dae-footer__logo" />
            <p class="dae-footer__copy">DAE © {{ new Date().getFullYear() }}, All rights reserved.</p>
          </div>
          <div class="dae-footer__bottom-right">
            <a href="https://www.perplexity.ai/computer" target="_blank" rel="noopener noreferrer" class="dae-footer__pplx">Created with Perplexity Computer</a>
          </div>
        </div>

      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ═══════════════════════════════════════════════════════════════════
   DAE HOMEPAGE — Supademo-Structured Layout
   Colors: Navy #131338, Mint #5CF7BB, White, Slate
   Font: Inter, system-ui, sans-serif
   Container: max-width 1280px, px-6 / lg:px-8
   Sections: py-20 (80px), alternating white / #f8fafc
═══════════════════════════════════════════════════════════════════ */

/* ─── RESET & BASE ─── */
.dae-page {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #0f172a;
  background: #ffffff;
  -webkit-font-smoothing: antialiased;
}
.dae-page *, .dae-page *::before, .dae-page *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ─── CONTAINER ─── */
.dae-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}
@media (min-width: 1024px) {
  .dae-container { padding: 0 32px; }
}

/* ─── SECTION HEADINGS ─── */
.dae-section-h2 {
  font-size: clamp(1.875rem, 3vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #0f172a;
  text-align: center;
  margin-bottom: 48px;
}
.dae-section-sub {
  font-size: 1.125rem;
  color: #475569;
  text-align: center;
  max-width: 640px;
  margin: -32px auto 48px;
  line-height: 1.6;
}

/* ─── BUTTONS ─── */
.dae-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  font-size: 0.9375rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  transition: background 150ms ease, box-shadow 150ms ease;
  cursor: pointer;
  border: none;
  min-width: 180px;
}
.dae-btn--primary {
  background: #131338;
  color: #5CF7BB;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}
.dae-btn--primary:hover {
  background: #1c1c4d;
  box-shadow: 0 4px 12px rgba(19,19,56,0.3);
}
.dae-btn--secondary {
  background: #ffffff;
  color: #374151;
  border: 1px solid #e2e8f0;
}
.dae-btn--secondary:hover {
  background: #f8fafc;
}
.dae-btn--white {
  background: #ffffff;
  color: #131338;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.dae-btn--white:hover {
  background: #f0fdf8;
}

/* ─── SCROLL ANIMATION ─── */
.dae-reveal {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.dae-reveal.dae-hidden {
  opacity: 0;
  transform: translateY(24px);
}
.dae-reveal.dae-visible {
  opacity: 1;
  transform: translateY(0);
}
.dae-fade-enter-active, .dae-fade-leave-active {
  transition: opacity 0.25s ease;
}
.dae-fade-enter-from, .dae-fade-leave-to {
  opacity: 0;
}

/* ═══════════════════════════════════════════════════════════════════
   ANNOUNCEMENT BAR
═══════════════════════════════════════════════════════════════════ */
.dae-announce {
  background: #131338;
  color: #ffffff;
  text-align: center;
  padding: 10px 16px;
  font-size: 0.875rem;
}
.dae-announce__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
.dae-announce__badge {
  background: rgba(92, 247, 187, 0.2);
  color: #5CF7BB;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 9999px;
}

/* ═══════════════════════════════════════════════════════════════════
   STICKY NAV
═══════════════════════════════════════════════════════════════════ */
.dae-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e2e8f0;
  transition: box-shadow 200ms ease;
}
.dae-nav--stuck {
  box-shadow: 0 1px 8px rgba(0,0,0,0.06);
}
.dae-nav__inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}
@media (min-width: 1024px) {
  .dae-nav__inner { padding: 0 32px; }
}
.dae-nav__logo { flex-shrink: 0; }
.dae-nav__logo-img {
  height: 32px;
  width: auto;
  /* Invert the white logo to dark for the light nav */
  filter: brightness(0) saturate(100%) invert(10%) sepia(40%) saturate(3000%) hue-rotate(220deg) brightness(90%);
}
.dae-nav__links {
  display: none;
  align-items: center;
  gap: 4px;
}
@media (min-width: 1024px) {
  .dae-nav__links { display: flex; }
}
.dae-nav__link {
  padding: 8px 12px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  text-decoration: none;
  border-radius: 6px;
  transition: background 150ms ease, color 150ms ease;
}
.dae-nav__link:hover {
  background: #f1f5f9;
  color: #0f172a;
}
.dae-nav__ctas {
  display: none;
  align-items: center;
  gap: 12px;
}
@media (min-width: 1024px) {
  .dae-nav__ctas { display: flex; }
}
.dae-nav__cta {
  padding: 8px 16px;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 10px;
  text-decoration: none;
  transition: background 150ms ease;
}
.dae-nav__cta--outline {
  color: #475569;
  border: 1px solid #e2e8f0;
  background: #fff;
}
.dae-nav__cta--outline:hover { background: #f8fafc; }
.dae-nav__cta--primary {
  background: #131338;
  color: #5CF7BB;
}
.dae-nav__cta--primary:hover { background: #1c1c4d; }

/* Mobile burger */
.dae-nav__burger {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}
@media (min-width: 1024px) {
  .dae-nav__burger { display: none; }
}
.dae-nav__burger span {
  display: block;
  width: 22px;
  height: 2px;
  background: #0f172a;
  border-radius: 2px;
}

/* Mobile drawer */
.dae-nav__mobile {
  display: flex;
  flex-direction: column;
  padding: 16px 24px 24px;
  gap: 8px;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
}
@media (min-width: 1024px) {
  .dae-nav__mobile { display: none !important; }
}
.dae-nav__mobile a {
  padding: 10px 0;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 1px solid #f1f5f9;
}
.dae-nav__mobile .dae-nav__cta--primary {
  margin-top: 8px;
  text-align: center;
  border-radius: 10px;
  padding: 12px;
  border-bottom: none;
}

/* ═══════════════════════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════════════════════ */
.dae-hero {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #eef0ff 0%, #ffffff 60%);
  padding: 96px 0 80px;
}
@media (min-width: 1024px) {
  .dae-hero { padding: 128px 0 112px; }
}
.dae-hero__container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 10;
  text-align: center;
}
@media (min-width: 1024px) {
  .dae-hero__container { padding: 0 32px; }
}
.dae-hero__badge-row {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.dae-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  padding: 6px 16px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.dae-hero__badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #5CF7BB;
  animation: dae-pulse 2s infinite;
}
@keyframes dae-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.dae-hero__h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: #0f172a;
  max-width: 900px;
  margin: 0 auto;
}
.dae-hero__accent {
  color: #131338;
  background: linear-gradient(135deg, #131338, #5CF7BB);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.dae-hero__sub {
  margin-top: 24px;
  font-size: 1.125rem;
  color: #475569;
  max-width: 580px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}
.dae-hero__sub-bold {
  color: #131338;
  font-weight: 600;
}
.dae-hero__ctas {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
@media (min-width: 640px) {
  .dae-hero__ctas { flex-direction: row; justify-content: center; }
}

/* Floating cards (hero decoration) */
.dae-hero__float {
  position: absolute;
  z-index: 5;
  pointer-events: none;
}
.dae-hero__float--left { left: 24px; top: 50%; transform: translateY(-50%); }
.dae-hero__float--right { right: 24px; top: 50%; transform: translateY(-50%); }
@media (max-width: 1200px) {
  .dae-hero__float { display: none; }
}
.dae-float-card {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  font-size: 0.8125rem;
}
.dae-float-card__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dae-float-card__icon { font-size: 1.25rem; }
.dae-float-card__label { font-weight: 600; color: #0f172a; }
.dae-float-card__detail { color: #64748b; }

/* ═══════════════════════════════════════════════════════════════════
   PRODUCT PREVIEW
═══════════════════════════════════════════════════════════════════ */
.dae-preview {
  background: #ffffff;
  padding: 0 0 64px;
}
.dae-preview__card {
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  background: #ffffff;
}
.dae-preview__tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
  overflow-x: auto;
}
.dae-preview__tab {
  padding: 6px 16px;
  font-size: 0.8125rem;
  font-weight: 500;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  background: transparent;
  color: #64748b;
  transition: background 150ms ease;
}
.dae-preview__tab:hover { background: #f1f5f9; }
.dae-preview__tab--active {
  background: rgba(92, 247, 187, 0.12);
  color: #131338;
  font-weight: 600;
}
.dae-preview__body {
  padding: 24px;
  background: #f8fafc;
  min-height: 240px;
}

/* Kanban mockup */
.dae-kanban__cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
@media (max-width: 768px) {
  .dae-kanban__cols { grid-template-columns: repeat(2, 1fr); }
}
.dae-kanban__head {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
}
.dae-kanban__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.dae-kanban__count {
  background: #f1f5f9;
  padding: 1px 8px;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}
.dae-kanban__card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.8125rem;
  color: #374151;
  margin-bottom: 8px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

/* ═══════════════════════════════════════════════════════════════════
   GHL CONTACTS DASHBOARD MOCKUP
═══════════════════════════════════════════════════════════════════ */
.ghl-dash {
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  font-size: 11px;
  line-height: 1.4;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  max-height: 520px;
  pointer-events: none;
  user-select: none;
}
.ghl-dash__sidebar {
  width: 160px;
  min-width: 160px;
  background: #1e2235;
  color: #c1c7d4;
  display: flex;
  flex-direction: column;
  padding: 14px 0;
  overflow: hidden;
}
.ghl-dash__logo {
  padding: 0 14px 12px;
}
.ghl-dash__logo-img {
  height: 28px;
  width: auto;
  display: block;
}
.ghl-dash__search {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 10px 14px;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(255,255,255,0.06);
  font-size: 10px;
  color: #64748b;
}
.ghl-dash__nav-group {
  margin-bottom: 10px;
}
.ghl-dash__nav-label {
  display: block;
  padding: 6px 14px 4px;
  font-size: 8.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748b;
  text-transform: uppercase;
}
.ghl-dash__nav-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  font-size: 10.5px;
  color: #a0a8b9;
  text-decoration: none;
  cursor: default;
  transition: background 150ms ease;
  white-space: nowrap;
}
.ghl-dash__nav-item--active {
  background: rgba(92,247,187,0.1);
  color: #5CF7BB;
}
.ghl-dash__badge {
  margin-left: auto;
  background: #5CF7BB;
  color: #131338;
  font-size: 9px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 9999px;
}
.ghl-dash__user {
  margin-top: auto;
  padding: 12px 14px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.ghl-dash__user-info {
  display: flex;
  flex-direction: column;
}
.ghl-dash__user-name {
  font-size: 10px;
  font-weight: 600;
  color: #e2e8f0;
  white-space: nowrap;
}
.ghl-dash__user-role {
  font-size: 8.5px;
  color: #64748b;
}

/* Main content area */
.ghl-dash__main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
  overflow: hidden;
}
.ghl-dash__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  gap: 12px;
}
.ghl-dash__title {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  white-space: nowrap;
}
.ghl-dash__header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.ghl-dash__search-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  font-size: 10px;
  color: #94a3b8;
  white-space: nowrap;
}
.ghl-dash__add-btn {
  padding: 5px 12px;
  border-radius: 6px;
  border: none;
  background: #5CF7BB;
  color: #131338;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
  cursor: default;
}

/* Filter tabs */
.ghl-dash__filters {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  flex-wrap: nowrap;
}
.ghl-dash__filter {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 10px;
  font-weight: 500;
  color: #64748b;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  white-space: nowrap;
}
.ghl-dash__filter b {
  font-weight: 700;
  color: #475569;
}
.ghl-dash__filter--active {
  background: #5CF7BB;
  color: #131338;
  border-color: #5CF7BB;
}
.ghl-dash__filter--active b {
  color: #131338;
}
.ghl-dash__dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.ghl-dash__dot--new { background: #3b82f6; }
.ghl-dash__dot--qualified { background: #f59e0b; }
.ghl-dash__dot--booked { background: #22c55e; }

/* Patient cards grid */
.ghl-dash__cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 12px 16px;
  overflow: hidden;
}
.ghl-dash__card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
}
.ghl-dash__card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
}
.ghl-dash__card-identity {
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
}
.ghl-dash__avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 700;
  color: #ffffff;
  flex-shrink: 0;
}
.ghl-dash__avatar--sm {
  width: 26px;
  height: 26px;
  font-size: 8px;
}
.ghl-dash__avatar--blue { background: #3b82f6; }
.ghl-dash__avatar--orange { background: #f59e0b; }
.ghl-dash__avatar--red { background: #ef4444; }
.ghl-dash__avatar--purple { background: #8b5cf6; }
.ghl-dash__avatar--green { background: #22c55e; }
.ghl-dash__card-name {
  display: block;
  font-size: 10.5px;
  font-weight: 600;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ghl-dash__card-loc {
  display: block;
  font-size: 9px;
  color: #94a3b8;
  white-space: nowrap;
}
.ghl-dash__status {
  font-size: 9px;
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}
.ghl-dash__status--new { color: #3b82f6; }
.ghl-dash__status--qualified { color: #f59e0b; }
.ghl-dash__status--booked { color: #22c55e; }

/* Tags */
.ghl-dash__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
}
.ghl-dash__tag {
  font-size: 8.5px;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  white-space: nowrap;
}
.ghl-dash__tag--teal {
  background: rgba(92,247,187,0.15);
  color: #0d9466;
}
.ghl-dash__tag--gray {
  background: #f1f5f9;
  color: #64748b;
}

/* Metrics */
.ghl-dash__metrics {
  display: flex;
  gap: 8px;
}
.ghl-dash__metrics > div {
  flex: 1;
  background: #f8fafc;
  border-radius: 6px;
  padding: 5px 7px;
}
.ghl-dash__metric-label {
  display: block;
  font-size: 8px;
  color: #94a3b8;
  margin-bottom: 1px;
}
.ghl-dash__metric-val {
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}
.ghl-dash__metric-val--teal {
  color: #0d9466;
}

/* Pipeline progress */
.ghl-dash__pipeline {
  padding: 2px 0;
}
.ghl-dash__pipe-track {
  position: relative;
  height: 3px;
  background: #e2e8f0;
  border-radius: 2px;
  margin-bottom: 3px;
}
.ghl-dash__pipe-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #5CF7BB, #3ecf96);
  border-radius: 2px;
}
.ghl-dash__pipe-dot {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 7px;
  height: 7px;
  background: #ffffff;
  border: 2px solid #5CF7BB;
  border-radius: 50%;
}
.ghl-dash__pipe-labels {
  display: flex;
  justify-content: space-between;
  font-size: 7.5px;
  color: #94a3b8;
}
.ghl-dash__pipe-active {
  color: #5CF7BB;
  font-weight: 700;
}

/* Card footer */
.ghl-dash__card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
  border-top: 1px solid #f1f5f9;
}
.ghl-dash__timestamp {
  font-size: 8px;
  color: #94a3b8;
}
.ghl-dash__actions {
  display: flex;
  gap: 4px;
}
.ghl-dash__action-icon {
  font-size: 10px;
  opacity: 0.5;
}

/* GHL responsive: hide sidebar on small screens, show 2-col cards */
@media (max-width: 900px) {
  .ghl-dash__sidebar { display: none; }
  .ghl-dash__cards { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .ghl-dash__cards { grid-template-columns: 1fr; }
  .ghl-dash__header-actions { display: none; }
}

/* ═══════════════════════════════════════════════════════════════════
   SOCIAL PROOF / CREDIBILITY STRIP
═══════════════════════════════════════════════════════════════════ */
.dae-proof {
  background: #ffffff;
  padding: 64px 0;
}
.dae-proof__h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #0f172a;
  text-align: center;
  margin-bottom: 16px;
}
.dae-proof__badges {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
}
.dae-proof__badge-img {
  height: 48px;
  width: auto;
  opacity: 0.8;
}
.dae-proof__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
@media (max-width: 640px) {
  .dae-proof__stats { grid-template-columns: 1fr; gap: 24px; }
}
.dae-proof__stat-val {
  font-size: 2rem;
  font-weight: 700;
  color: #131338;
}
.dae-proof__stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 4px;
}

/* ═══════════════════════════════════════════════════════════════════
   COMPARISON
═══════════════════════════════════════════════════════════════════ */
.dae-compare {
  background: #f8fafc;
  padding: 80px 0;
}
.dae-compare__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}
@media (max-width: 768px) {
  .dae-compare__grid { grid-template-columns: 1fr; }
}
.dae-compare__card {
  border-radius: 16px;
  padding: 32px;
}
.dae-compare__card--old {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.dae-compare__card--new {
  background: #131338;
  color: #ffffff;
}
.dae-compare__card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 24px;
}
.dae-compare__card-title--light { color: #ffffff; }
.dae-compare__list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: 0.9375rem;
  color: #475569;
}
.dae-compare__list--light { color: rgba(255,255,255,0.8); }
.dae-compare__list li {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dae-x {
  color: #ef4444;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}
.dae-check {
  color: #5CF7BB;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

/* ═══════════════════════════════════════════════════════════════════
   3-STEP OVERVIEW (Record → Edit → Share equivalent)
═══════════════════════════════════════════════════════════════════ */
.dae-steps-overview {
  background: #ffffff;
  padding: 80px 0;
}
.dae-steps-overview__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
@media (max-width: 768px) {
  .dae-steps-overview__grid { grid-template-columns: 1fr; }
}
.dae-step-card {
  text-align: center;
  padding: 32px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
}
.dae-step-card__num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(92, 247, 187, 0.15);
  color: #131338;
  font-weight: 700;
  font-size: 0.875rem;
  margin-bottom: 16px;
}
.dae-step-card__title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 12px;
}
.dae-step-card__desc {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.6;
}

/* ═══════════════════════════════════════════════════════════════════
   FEATURE SECTIONS (alternating text + visual, like Supademo C1-C4)
═══════════════════════════════════════════════════════════════════ */
.dae-feature {
  background: #ffffff;
  padding: 80px 0;
}
.dae-feature--alt {
  background: #f8fafc;
}
.dae-feature__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
@media (max-width: 900px) {
  .dae-feature__grid { grid-template-columns: 1fr; gap: 40px; }
}
.dae-feature__grid--reverse {
  direction: rtl;
}
.dae-feature__grid--reverse > * {
  direction: ltr;
}
@media (max-width: 900px) {
  .dae-feature__grid--reverse { direction: ltr; }
}
.dae-feature__h2 {
  font-size: clamp(1.75rem, 2.5vw, 2.25rem);
  font-weight: 700;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 16px;
}
.dae-feature__body {
  color: #475569;
  line-height: 1.7;
  margin-bottom: 24px;
}
.dae-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.dae-pill-tag {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 9999px;
  background: rgba(92, 247, 187, 0.1);
  color: #131338;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: background 150ms ease;
}
.dae-pill-tag:hover {
  background: rgba(92, 247, 187, 0.2);
}
.dae-feature__link {
  color: #131338;
  font-weight: 600;
  text-decoration: none;
  font-size: 0.9375rem;
}
.dae-feature__link:hover {
  text-decoration: underline;
}

/* Mockup cards */
.dae-mockup-card {
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
  background: #ffffff;
}
.dae-mockup-card__header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 14px 18px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.dae-mockup-card__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dae-mockup-card__title {
  margin-left: 8px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #475569;
}
.dae-mockup-card__body {
  padding: 24px;
}

/* Stats inside mockup */
.dae-mockup-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}
.dae-mockup-stat:last-child { border-bottom: none; }
.dae-mockup-stat__val {
  font-size: 1.25rem;
  font-weight: 700;
  color: #131338;
}
.dae-mockup-stat__label {
  font-size: 0.8125rem;
  color: #64748b;
}

/* Screening rows */
.dae-screen-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}
.dae-screen-row:last-child { border-bottom: none; }
.dae-screen-row__name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #0f172a;
}
.dae-screen-row__tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
}
.dae-screen-row__tag--pass {
  background: rgba(92, 247, 187, 0.15);
  color: #0f7a50;
}
.dae-screen-row__tag--review {
  background: #fef3c7;
  color: #92400e;
}
.dae-screen-row__tag--fail {
  background: #fee2e2;
  color: #991b1b;
}

/* ═══════════════════════════════════════════════════════════════════
   STATS BANNER (like Supademo's indigo-600 metrics)
═══════════════════════════════════════════════════════════════════ */
.dae-stats {
  background: #131338;
  padding: 64px 0;
}
.dae-stats__h2 {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin-bottom: 48px;
}
.dae-stats__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  text-align: center;
}
@media (max-width: 640px) {
  .dae-stats__grid { grid-template-columns: 1fr; }
}
.dae-stats__val {
  font-size: 3rem;
  font-weight: 700;
  color: #5CF7BB;
  margin-bottom: 8px;
}
.dae-stats__label {
  font-size: 0.9375rem;
  color: rgba(255,255,255,0.6);
}

/* ═══════════════════════════════════════════════════════════════════
   DETAILED STEPS (sidebar + content panel)
═══════════════════════════════════════════════════════════════════ */
.dae-detailed-steps {
  background: #f8fafc;
  padding: 80px 0;
}
.dae-detailed-steps__header {
  text-align: center;
  margin-bottom: 48px;
}
.dae-detailed-steps__layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 48px;
  align-items: start;
}
@media (max-width: 768px) {
  .dae-detailed-steps__layout { grid-template-columns: 1fr; gap: 24px; }
}
.dae-detailed-steps__sidebar {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dae-step-selector {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border: none;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;
  transition: background 150ms ease;
}
.dae-step-selector:hover {
  background: #ffffff;
}
.dae-step-selector--active {
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06);
}
.dae-step-selector__num {
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  min-width: 28px;
}
.dae-step-selector--active .dae-step-selector__num {
  color: #5CF7BB;
}
.dae-step-selector__title {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #475569;
}
.dae-step-selector--active .dae-step-selector__title {
  color: #0f172a;
  font-weight: 600;
}
.dae-detailed-steps__content {
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  padding: 40px;
  min-height: 200px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}
.dae-step-detail__title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
}
.dae-step-detail__desc {
  font-size: 1rem;
  color: #475569;
  line-height: 1.7;
}

/* ═══════════════════════════════════════════════════════════════════
   FOUNDERS
═══════════════════════════════════════════════════════════════════ */
.dae-founders {
  background: #ffffff;
  padding: 80px 0;
}
.dae-founders__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 720px;
  margin: 0 auto;
}
@media (max-width: 640px) {
  .dae-founders__grid { grid-template-columns: 1fr; }
}
.dae-founder-card {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
}
.dae-founder-card__avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #131338;
  color: #5CF7BB;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 16px;
}
.dae-founder-card__name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
}
.dae-founder-card__role {
  font-size: 0.8125rem;
  color: #64748b;
  margin-bottom: 16px;
}
.dae-founder-card__stat {
  font-size: 0.8125rem;
  color: #475569;
  line-height: 1.5;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
}

/* ═══════════════════════════════════════════════════════════════════
   FAQ
═══════════════════════════════════════════════════════════════════ */
.dae-faq {
  background: #f8fafc;
  padding: 80px 0;
}
.dae-faq__container {
  max-width: 800px;
}
.dae-faq__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dae-faq__item {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 150ms ease;
}
.dae-faq__item--open {
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.dae-faq__q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 18px 24px;
  border: none;
  background: none;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  gap: 16px;
}
.dae-faq__chevron {
  flex-shrink: 0;
  transition: transform 200ms ease;
  color: #94a3b8;
}
.dae-faq__item--open .dae-faq__chevron {
  transform: rotate(180deg);
}
.dae-faq__a {
  padding: 0 24px 18px;
}
.dae-faq__a p {
  font-size: 0.9375rem;
  color: #475569;
  line-height: 1.7;
}

/* ═══════════════════════════════════════════════════════════════════
   CTA BANNER (like Supademo's gradient pre-footer CTA)
═══════════════════════════════════════════════════════════════════ */
.dae-cta-banner {
  background: linear-gradient(135deg, #131338 0%, #1c1c4d 100%);
  padding: 80px 0;
}
.dae-cta-banner__inner {
  text-align: center;
}
.dae-cta-banner__h2 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}
.dae-cta-banner__sub {
  font-size: 1.125rem;
  color: rgba(255,255,255,0.6);
  max-width: 520px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

/* ═══════════════════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════════════════ */
.dae-footer {
  background: #0f0f1a;
  color: #ffffff;
  padding: 80px 0 40px;
}
.dae-footer__top {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 64px;
  margin-bottom: 64px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
@media (min-width: 1024px) {
  .dae-footer__top {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
.dae-footer__tagline {
  font-size: 1.75rem;
  font-weight: 700;
}
.dae-footer__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 64px;
}
@media (max-width: 640px) {
  .dae-footer__grid { grid-template-columns: 1fr 1fr; gap: 24px; }
}
.dae-footer__col-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffffff;
  margin-bottom: 16px;
}
.dae-footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.dae-footer__links a {
  font-size: 0.875rem;
  color: #94a3b8;
  text-decoration: none;
  transition: color 150ms ease;
}
.dae-footer__links a:hover {
  color: #ffffff;
}
.dae-footer__bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}
@media (min-width: 1024px) {
  .dae-footer__bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}
.dae-footer__bottom-left {
  display: flex;
  align-items: center;
  gap: 16px;
}
.dae-footer__logo {
  height: 24px;
  width: auto;
}
.dae-footer__copy {
  font-size: 0.8125rem;
  color: #64748b;
}
.dae-footer__pplx {
  font-size: 0.75rem;
  color: #64748b;
  text-decoration: none;
  transition: color 150ms ease;
}
.dae-footer__pplx:hover {
  color: #94a3b8;
}
</style>
