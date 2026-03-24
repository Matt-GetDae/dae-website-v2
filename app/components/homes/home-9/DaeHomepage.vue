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

        <!-- Decorative floating images -->
        <div class="dae-hero__float dae-hero__float--left dae-reveal" aria-hidden="true">
          <img
            src="~/assets/images/custom-icons/hero-float-revenue.jpg"
            alt="Revenue growth chart showing $95K to $190K over 6 months"
            class="dae-hero__float-img"
          />
        </div>
        <div class="dae-hero__float dae-hero__float--right dae-reveal" aria-hidden="true">
          <div class="dae-hero__float-stack">
            <img
              src="~/assets/images/custom-icons/hero-float-lead-card.jpg"
              alt="New lead notification — Sophie Taylor, All-on-4 Implants, $24,000"
              class="dae-hero__float-img dae-hero__float-img--small"
            />
            <img
              src="~/assets/images/custom-icons/hero-float-bar-chart.jpg"
              alt="Monthly consultations bar chart showing growth from 10 to 18"
              class="dae-hero__float-img"
            />
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SECTION 2: PRODUCT VISUAL (Pipeline Preview)              -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="dae-preview">
        <div class="dae-container">
          <div class="dae-preview__card dae-preview__card--img">
            <img
              src="~/assets/images/custom-icons/dae-pipeline-hero.png"
              alt="DAE pipeline dashboard showing new leads, qualified patients, and booked consultations with deal values"
              class="dae-preview__hero-img"
            />
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
      <!-- SECTION 5: HOW IT WORKS — 3 Showcase Cards                -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section id="how-it-works" class="dae-steps-overview">
        <div class="dae-container">
          <h2 class="dae-showcase__h2 dae-reveal">
            Everything You Need to <span class="dae-showcase__accent">Scale</span>
          </h2>
          <p class="dae-showcase__sub dae-reveal">
            From first ad click to booked consultation and revenue tracked — one integrated system replaces your entire marketing stack.
          </p>
          <div class="dae-showcase__grid dae-reveal">
            <div class="dae-showcase__card">
              <div class="dae-showcase__img-wrap dae-showcase__img-wrap--blue">
                <img
                  src="~/assets/images/custom-icons/meta-creative-implants.png"
                  alt="Dental implant ad creatives and marketing assets"
                  class="dae-showcase__img"
                />
              </div>
              <h3 class="dae-showcase__card-title">Patient Acquisition</h3>
              <p class="dae-showcase__card-desc">Targeted campaigns bring implant-ready patients to your door. Every lead captured, scored, and qualified automatically.</p>
            </div>
            <div class="dae-showcase__card">
              <div class="dae-showcase__img-wrap dae-showcase__img-wrap--purple">
                <img
                  src="~/assets/images/custom-icons/ghl-pipeline-dashboard.jpg"
                  alt="Opportunities pipeline with lead stages and deal values"
                  class="dae-showcase__img"
                />
              </div>
              <h3 class="dae-showcase__card-title">Pipeline Management</h3>
              <p class="dae-showcase__card-desc">Track every opportunity from new lead to booked consultation. Visual pipeline keeps your team aligned and focused.</p>
            </div>
            <div class="dae-showcase__card">
              <div class="dae-showcase__img-wrap dae-showcase__img-wrap--green">
                <img
                  src="~/assets/images/custom-icons/ghl-revenue-dashboard.jpg"
                  alt="Revenue tracking dashboard with charts and conversion data"
                  class="dae-showcase__img"
                />
              </div>
              <h3 class="dae-showcase__card-title">Revenue Intelligence</h3>
              <p class="dae-showcase__card-desc">Know your true ROI down to the dollar. Revenue trends, conversion rates, and case value tracking in real time.</p>
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
              <img
                src="~/assets/images/custom-icons/ghl-contacts-dashboard.jpg"
                alt="DAE patient contacts dashboard showing lead management, pipeline tracking, and automated qualification"
                class="dae-feature__img"
              />
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
            <div class="dae-feature__visual dae-reveal">
              <img
                src="~/assets/images/custom-icons/ghl-pipeline-dashboard.jpg"
                alt="DAE opportunities pipeline showing new leads, qualified patients, booked consultations, and won cases with deal values"
                class="dae-feature__img"
              />
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
              <img
                src="~/assets/images/custom-icons/ghl-revenue-dashboard.jpg"
                alt="DAE revenue dashboard showing monthly revenue trends, consultations booked, treatment breakdown, and recent conversions"
                class="dae-feature__img"
              />
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
  background: #5CF7BB;
  color: #131338;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(92,247,187,0.3);
}
.dae-btn--primary:hover {
  background: #3ee8a5;
  box-shadow: 0 4px 16px rgba(92,247,187,0.4);
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
  background: #F9E219;
  color: #131338;
  font-weight: 700;
  box-shadow: 0 4px 16px rgba(249,226,25,0.3);
}
.dae-btn--white:hover {
  background: #f7d800;
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
  background: #5CF7BB;
  color: #131338;
  font-weight: 700;
}
.dae-nav__cta--primary:hover { background: #3ee8a5; }

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
  background: #F9E219;
  animation: dae-pulse 2s infinite;
}
@keyframes dae-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
.dae-hero__h1 {
  font-family: 'Sora', system-ui, sans-serif;
  font-size: clamp(2.75rem, 5.5vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  max-width: 900px;
  margin: 0 auto;
  color: #131338;
}
.dae-hero__accent {
  color: #5CF7BB;
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

/* Floating images (hero decoration) */
.dae-hero__float {
  position: absolute;
  z-index: 5;
  pointer-events: none;
}
.dae-hero__float--left { left: 16px; top: 50%; transform: translateY(-50%); }
.dae-hero__float--right { right: 16px; top: 50%; transform: translateY(-50%); }
@media (max-width: 1300px) {
  .dae-hero__float { display: none; }
}
.dae-hero__float-img {
  display: block;
  width: 240px;
  height: auto;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(19,19,56,0.10), 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid rgba(226,232,240,0.6);
}
.dae-hero__float-img--small {
  width: 200px;
}
.dae-hero__float-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}
@media (min-width: 1500px) {
  .dae-hero__float-img { width: 280px; }
  .dae-hero__float-img--small { width: 230px; }
  .dae-hero__float--left { left: 32px; }
  .dae-hero__float--right { right: 32px; }
}

/* ═══════════════════════════════════════════════════════════════════
   PRODUCT PREVIEW
═══════════════════════════════════════════════════════════════════ */
.dae-preview {
  background: #ffffff;
  padding: 0 0 80px;
}
.dae-preview .dae-container {
  max-width: 1400px;
  perspective: 20px;
}
.dae-preview__card {
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(19,19,56,0.10),
    0 8px 24px rgba(19,19,56,0.06);
  background: #ffffff;
  transform: rotateX(0.1deg);
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.5s ease;
}
.dae-preview__card:hover {
  transform: rotateX(0deg);
  box-shadow:
    0 12px 40px rgba(19,19,56,0.08),
    0 4px 16px rgba(19,19,56,0.04);
}
.dae-preview__card--img {
  padding: 0;
  line-height: 0;
}
.dae-preview__hero-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 16px;
}


/* Feature section image */
.dae-feature__img {
  width: 100%;
  height: auto;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  display: block;
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
  font-weight: 800;
  color: #131338;
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
  font-weight: 800;
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
  font-weight: 700;
  color: #131338;
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
   SHOWCASE CARDS (3-col image + title + desc)
═══════════════════════════════════════════════════════════════════ */
.dae-steps-overview {
  background: #ffffff;
  padding: 80px 0;
}
.dae-showcase__h2 {
  font-family: 'Sora', system-ui, sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  color: #131338;
  text-align: center;
  margin-bottom: 16px;
}
.dae-showcase__accent {
  font-style: normal;
  color: #5CF7BB;
}
.dae-showcase__sub {
  text-align: center;
  color: #64748b;
  font-size: 1.0625rem;
  line-height: 1.6;
  max-width: 640px;
  margin: 0 auto 48px;
}
.dae-showcase__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
@media (max-width: 900px) {
  .dae-showcase__grid { grid-template-columns: 1fr; gap: 40px; }
}
.dae-showcase__card {
  text-align: center;
}
.dae-showcase__img-wrap {
  border-radius: 20px;
  padding: 24px 20px 0;
  margin-bottom: 24px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 260px;
}
.dae-showcase__img-wrap--blue {
  background: linear-gradient(135deg, #e8fdf4, #d1fae5);
}
.dae-showcase__img-wrap--purple {
  background: linear-gradient(135deg, #fef9e1, #fdf3c7);
}
.dae-showcase__img-wrap--green {
  background: linear-gradient(135deg, #e0e0f7, #eeeef9);
}
.dae-showcase__img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
}
.dae-showcase__card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #131338;
  margin-bottom: 8px;
}
.dae-showcase__card-desc {
  font-size: 0.9375rem;
  color: #64748b;
  line-height: 1.6;
  max-width: 340px;
  margin: 0 auto;
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
  font-weight: 800;
  color: #131338;
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
  font-weight: 800;
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
  font-weight: 800;
  color: #F9E219;
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
  color: #F9E219;
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
  color: #131338;
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
  color: #F9E219;
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
  color: #131338;
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
  font-weight: 800;
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
  font-weight: 800;
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
