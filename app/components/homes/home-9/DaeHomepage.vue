<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

/* ─── HOW IT WORKS — Step Selector ─── */
const activeStep = ref(0)
const steps = [
  {
    title: 'Targeted Traffic',
    desc: 'We run precision Meta and Google campaigns targeting patients actively searching for implant solutions in your area. Every dollar is directed at high-intent audiences — not broad awareness.'
  },
  {
    title: 'Lead Capture',
    desc: 'Custom landing pages convert visitors into enquiries with qualifying questions built in from the start. No generic contact forms — every field serves a purpose.'
  },
  {
    title: 'AI Screening',
    desc: 'Every lead is automatically screened for budget, timeline, and treatment readiness before your team ever sees them. Your front desk only speaks with genuine candidates.'
  },
  {
    title: 'Automated Follow-Up',
    desc: 'Multi-channel sequences via SMS and email nurture leads who don\'t book immediately — converting them over days, not minutes. No lead is forgotten.'
  },
  {
    title: 'Smart Booking',
    desc: 'Qualified patients are routed directly into your calendar with pre-filled consultation details. No back-and-forth. No phone tag.'
  },
  {
    title: 'Revenue Tracking',
    desc: 'Track every patient from first click to treatment acceptance. Know your true cost-per-consultation and ROI — not vanity metrics.'
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
  nextTick(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('dae-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    document.querySelectorAll('.dae-animate').forEach((el) => {
      observer.observe(el)
    })
  })
})
onUnmounted(() => {
  if (observer) observer.disconnect()
})

/* ─── Count-Up Animation ─── */
const revenueRef = ref(null)
const leadsCount = ref(0)
const qualifiedCount = ref(0)
const bookedCount = ref(0)
const acceptedCount = ref(0)
const revenueTotal = ref(0)
let countObserver = null

function animateCount(refVal, target, duration = 1200) {
  const start = performance.now()
  function step(now) {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    refVal.value = Math.round(target * eased)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(() => {
  nextTick(() => {
    const productSection = document.querySelector('.dae-product-visual')
    if (productSection) {
      countObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(leadsCount, 47, 1400)
              animateCount(qualifiedCount, 28, 1400)
              animateCount(bookedCount, 14, 1200)
              animateCount(acceptedCount, 9, 1000)
              animateCount(revenueTotal, 487200, 1800)
              countObserver.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 }
      )
      countObserver.observe(productSection)
    }
  })
})
onUnmounted(() => {
  if (countObserver) countObserver.disconnect()
})
</script>

<template>
  <div class="dae-homepage">

    <!-- ═══════════════════════════════════════════ -->
    <!-- SECTION 1: HERO                            -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="dae-hero">
      <div class="dae-hero__bg"></div>
      <div class="dae-hero__grid"></div>
      <div class="dae-container dae-hero__inner">
        <!-- Floating card left -->
        <div class="dae-float-card dae-float-card--left dae-animate">
          <div class="dae-float-card__dot dae-float-card__dot--green"></div>
          <div class="dae-float-card__content">
            <span class="dae-float-card__label">New Lead</span>
            <span class="dae-float-card__detail">Sarah M. — Full Arch Inquiry</span>
          </div>
        </div>
        <!-- Floating card right -->
        <div class="dae-float-card dae-float-card--right dae-animate">
          <div class="dae-float-card__icon">&#128197;</div>
          <div class="dae-float-card__content">
            <span class="dae-float-card__label">Consult Booked</span>
            <span class="dae-float-card__detail">Dr. Patel — Tomorrow 2:30pm</span>
          </div>
        </div>
        <!-- Center content -->
        <div class="dae-hero__center">
          <div class="dae-pill dae-animate">
            <span class="dae-pill__dot"></span>
            Now Accepting Founding Clinics
          </div>
          <h1 class="dae-hero__h1 dae-animate">
            Implant consultations booked <span class="dae-gradient-text">automatically.</span>
          </h1>
          <p class="dae-hero__sub dae-animate">
            DAE is the patient acquisition system that generates, qualifies, and books
            high-value implant consultations — so your chairs stay full and your team stays focused.
          </p>
          <div class="dae-hero__ctas dae-animate">
            <a href="#apply" class="dae-btn dae-btn--primary">Book a Demo</a>
            <a href="#how-it-works" class="dae-btn dae-btn--secondary">See How It Works</a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- SECTION 2: PROBLEM                         -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="dae-problem">
      <div class="dae-container">
        <h2 class="dae-section-title dae-section-title--dark dae-animate">
          Most Implant Enquiries Never Become Patients
        </h2>
        <div class="dae-problem__grid">
          <div class="dae-problem-card dae-animate">
            <div class="dae-problem-card__icon dae-problem-card__icon--red">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#ff6b6b" stroke-width="2"/>
                <line x1="9" y1="9" x2="19" y2="19" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
                <line x1="19" y1="9" x2="9" y2="19" stroke="#ff6b6b" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="dae-problem-card__title">Unqualified Leads</h3>
            <p class="dae-problem-card__desc">
              Your front desk wastes hours fielding enquiries from people who can't afford
              treatment or aren't serious candidates.
            </p>
          </div>
          <div class="dae-problem-card dae-animate">
            <div class="dae-problem-card__icon dae-problem-card__icon--orange">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#ffa94d" stroke-width="2"/>
                <polyline points="14,8 14,15 18,15" stroke="#ffa94d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="dae-problem-card__title">Wasted Chair Time</h3>
            <p class="dae-problem-card__desc">
              Consultations that go nowhere. Patients ghost, no-show, or turn out to be
              price shoppers — not implant candidates.
            </p>
          </div>
          <div class="dae-problem-card dae-animate">
            <div class="dae-problem-card__icon dae-problem-card__icon--red">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="12" stroke="#ff6b6b" stroke-width="2"/>
                <line x1="6" y1="16" x2="22" y2="16" stroke="#ff6b6b" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="14" cy="12" r="4" stroke="#ff6b6b" stroke-width="2"/>
              </svg>
            </div>
            <h3 class="dae-problem-card__title">No Visibility</h3>
            <p class="dae-problem-card__desc">
              You have no idea which campaigns bring real patients, what your cost-per-consultation
              is, or where leads drop off.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- SECTION 3: SOLUTION OVERVIEW               -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="dae-solution">
      <div class="dae-container">
        <div class="dae-solution__card dae-animate">
          <div class="dae-solution__grid">
            <div class="dae-solution__text">
              <div class="dae-pill dae-pill--small">THE DAE SYSTEM</div>
              <h2 class="dae-solution__h2">A complete system, not another tool.</h2>
              <p class="dae-solution__body">
                DAE replaces the patchwork of agencies, ad managers, and manual follow-ups
                with a single integrated system. From first click to booked consultation —
                every step is tracked, optimised, and automated.
              </p>
              <div class="dae-chips">
                <span class="dae-chip">Traffic Generation</span>
                <span class="dae-chip">Lead Screening</span>
                <span class="dae-chip">Automated Follow-Up</span>
                <span class="dae-chip">Smart Booking</span>
                <span class="dae-chip">Revenue Tracking</span>
                <span class="dae-chip">Pipeline Analytics</span>
              </div>
              <a href="#apply" class="dae-btn dae-btn--secondary dae-btn--on-dark">Book a Demo</a>
            </div>
            <div class="dae-solution__mockup">
              <!-- Pipeline Kanban Mockup -->
              <div class="dae-kanban">
                <div class="dae-kanban__header">
                  <span class="dae-kanban__title">Patient Pipeline</span>
                  <span class="dae-kanban__badge">Live</span>
                </div>
                <div class="dae-kanban__cols">
                  <div class="dae-kanban__col">
                    <div class="dae-kanban__col-head">
                      <span class="dae-kanban__col-dot" style="background:#5CF7BB"></span>
                      New Lead <span class="dae-kanban__count">3</span>
                    </div>
                    <div class="dae-kanban__item">James R. — Single Implant</div>
                    <div class="dae-kanban__item">Maria K. — Full Arch</div>
                    <div class="dae-kanban__item">Tom W. — Consultation</div>
                  </div>
                  <div class="dae-kanban__col">
                    <div class="dae-kanban__col-head">
                      <span class="dae-kanban__col-dot" style="background:#4da6ff"></span>
                      Qualified <span class="dae-kanban__count">2</span>
                    </div>
                    <div class="dae-kanban__item">Sarah M. — Full Arch</div>
                    <div class="dae-kanban__item">David L. — All-on-4</div>
                  </div>
                  <div class="dae-kanban__col">
                    <div class="dae-kanban__col-head">
                      <span class="dae-kanban__col-dot" style="background:#ffa94d"></span>
                      Booked <span class="dae-kanban__count">1</span>
                    </div>
                    <div class="dae-kanban__item">Helen P. — Implant Bridge</div>
                  </div>
                  <div class="dae-kanban__col">
                    <div class="dae-kanban__col-head">
                      <span class="dae-kanban__col-dot" style="background:#a78bfa"></span>
                      Accepted <span class="dae-kanban__count">1</span>
                    </div>
                    <div class="dae-kanban__item">Robert G. — Full Arch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- SECTION 4: HOW IT WORKS                    -->
    <!-- ═══════════════════════════════════════════ -->
    <section id="how-it-works" class="dae-how">
      <div class="dae-container">
        <div class="dae-how__header dae-animate">
          <h2 class="dae-section-title">From Ad Click to Booked Consultation</h2>
          <p class="dae-section-sub">Six stages. Fully automated. Nothing falls through the cracks.</p>
        </div>
        <div class="dae-how__layout">
          <div class="dae-how__steps">
            <button
              v-for="(step, i) in steps"
              :key="i"
              class="dae-step-btn"
              :class="{ 'dae-step-btn--active': activeStep === i }"
              @click="activeStep = i"
            >
              <span class="dae-step-btn__num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="dae-step-btn__title">{{ step.title }}</span>
            </button>
          </div>
          <div class="dae-how__panel dae-animate">
            <div class="dae-how__panel-num">{{ String(activeStep + 1).padStart(2, '0') }}</div>
            <h3 class="dae-how__panel-title">{{ steps[activeStep].title }}</h3>
            <p class="dae-how__panel-desc">{{ steps[activeStep].desc }}</p>
            <div class="dae-how__panel-visual">
              <div class="dae-step-graphic">
                <div class="dae-step-graphic__bar" :style="{ width: ((activeStep + 1) / 6 * 100) + '%' }"></div>
              </div>
              <div class="dae-step-graphic__labels">
                <span>Ad Click</span>
                <span>Booked Consultation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- SECTION 5: PRODUCT VISUAL                  -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="dae-product-visual">
      <div class="dae-container">
        <div class="dae-product__card dae-animate">
          <h2 class="dae-product__title">Built for implant clinics, not generic leads</h2>
          <div class="dae-product__mockups">
            <!-- Patient Card -->
            <div class="dae-mockup-card">
              <div class="dae-mockup-card__header">
                <span class="dae-mockup-card__label">Patient Profile</span>
                <span class="dae-mockup-card__status dae-mockup-card__status--green">Qualified</span>
              </div>
              <div class="dae-mockup-card__body">
                <div class="dae-mockup-card__name">Sarah Mitchell</div>
                <div class="dae-mockup-card__tag">Full Arch</div>
                <div class="dae-mockup-card__row">
                  <span class="dae-mockup-card__row-label">Qualification Score</span>
                  <span class="dae-mockup-card__row-value dae-text-mint">92%</span>
                </div>
                <div class="dae-mockup-card__row">
                  <span class="dae-mockup-card__row-label">Phone</span>
                  <span class="dae-mockup-card__row-value">●●●● ●●● 412</span>
                </div>
                <div class="dae-mockup-card__row">
                  <span class="dae-mockup-card__row-label">Budget</span>
                  <span class="dae-mockup-card__row-value">$25k–$40k</span>
                </div>
                <div class="dae-mockup-card__notes">
                  <span class="dae-mockup-card__notes-label">Notes</span>
                  Interested in All-on-4. Has dental insurance. Prefers morning appointments.
                </div>
              </div>
            </div>
            <!-- Revenue Dashboard -->
            <div class="dae-mockup-card">
              <div class="dae-mockup-card__header">
                <span class="dae-mockup-card__label">Revenue Dashboard</span>
              </div>
              <div class="dae-mockup-card__body">
                <div class="dae-mockup-card__big-num">${{ revenueTotal.toLocaleString() }}</div>
                <div class="dae-mockup-card__big-label">Treatment Revenue — Last 6 Months</div>
                <div class="dae-bar-chart">
                  <div class="dae-bar-chart__bar" style="--h:45%"><span>Oct</span></div>
                  <div class="dae-bar-chart__bar" style="--h:62%"><span>Nov</span></div>
                  <div class="dae-bar-chart__bar" style="--h:55%"><span>Dec</span></div>
                  <div class="dae-bar-chart__bar" style="--h:78%"><span>Jan</span></div>
                  <div class="dae-bar-chart__bar" style="--h:85%"><span>Feb</span></div>
                  <div class="dae-bar-chart__bar dae-bar-chart__bar--active" style="--h:100%"><span>Mar</span></div>
                </div>
              </div>
            </div>
            <!-- Pipeline View -->
            <div class="dae-mockup-card">
              <div class="dae-mockup-card__header">
                <span class="dae-mockup-card__label">Pipeline Overview</span>
              </div>
              <div class="dae-mockup-card__body">
                <div class="dae-funnel">
                  <div class="dae-funnel__stage">
                    <div class="dae-funnel__bar" style="--w:100%"></div>
                    <div class="dae-funnel__info">
                      <span class="dae-funnel__num">{{ leadsCount }}</span>
                      <span class="dae-funnel__name">New Leads</span>
                    </div>
                  </div>
                  <div class="dae-funnel__stage">
                    <div class="dae-funnel__bar" style="--w:60%"></div>
                    <div class="dae-funnel__info">
                      <span class="dae-funnel__num">{{ qualifiedCount }}</span>
                      <span class="dae-funnel__name">Qualified</span>
                    </div>
                  </div>
                  <div class="dae-funnel__stage">
                    <div class="dae-funnel__bar" style="--w:30%"></div>
                    <div class="dae-funnel__info">
                      <span class="dae-funnel__num">{{ bookedCount }}</span>
                      <span class="dae-funnel__name">Booked</span>
                    </div>
                  </div>
                  <div class="dae-funnel__stage">
                    <div class="dae-funnel__bar" style="--w:19%"></div>
                    <div class="dae-funnel__info">
                      <span class="dae-funnel__num">{{ acceptedCount }}</span>
                      <span class="dae-funnel__name">Accepted</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="dae-product__caption dae-text-mint">
            Real-time visibility into every stage of your patient pipeline
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- SECTION 6: CREDIBILITY                     -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="dae-credibility">
      <div class="dae-container">
        <h2 class="dae-section-title dae-animate">Built by practitioners, not marketers</h2>
        <div class="dae-credibility__grid">
          <div class="dae-credibility__founders">
            <div class="dae-founder-card dae-animate">
              <div class="dae-founder-card__avatar">MM</div>
              <div class="dae-founder-card__info">
                <h4 class="dae-founder-card__name">Matt McDougall</h4>
                <span class="dae-founder-card__role">Co-Founder &amp; Systems Architect</span>
                <p class="dae-founder-card__bio">
                  $25M+ in dental ad spend managed. Former performance marketing lead
                  specialising in high-ticket healthcare.
                </p>
              </div>
            </div>
            <div class="dae-founder-card dae-animate">
              <div class="dae-founder-card__avatar">LR</div>
              <div class="dae-founder-card__info">
                <h4 class="dae-founder-card__name">Lachlan Robertson</h4>
                <span class="dae-founder-card__role">Co-Founder &amp; Lead Generation Strategist</span>
                <p class="dae-founder-card__bio">
                  Scaled patient acquisition for 60+ dental clinics. Deep expertise in
                  implant and cosmetic dentistry marketing.
                </p>
              </div>
            </div>
          </div>
          <div class="dae-credibility__insights">
            <div class="dae-insight-card dae-animate">
              <h4 class="dae-insight-card__title">Purpose-built for implant dentistry</h4>
              <p class="dae-insight-card__desc">
                Not adapted from generic SaaS. Every workflow, every screen, every automation
                is designed around how implant patients actually research, compare, and decide.
              </p>
            </div>
            <div class="dae-insight-card dae-animate">
              <h4 class="dae-insight-card__title">Revenue-tracked, not vanity-metricked</h4>
              <p class="dae-insight-card__desc">
                We don't report on impressions or clicks. DAE tracks cost-per-qualified-lead,
                cost-per-consultation, and treatment acceptance rate.
              </p>
            </div>
            <div class="dae-insight-card dae-animate">
              <h4 class="dae-insight-card__title">System, not service</h4>
              <p class="dae-insight-card__desc">
                No retainers. No account managers. DAE is infrastructure that runs whether
                you're in the clinic or on holiday.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- SECTION 7: CTA                             -->
    <!-- ═══════════════════════════════════════════ -->
    <section id="apply" class="dae-cta">
      <div class="dae-cta__bg"></div>
      <div class="dae-container dae-cta__inner">
        <!-- Floating cards -->
        <div class="dae-float-card dae-float-card--left dae-float-card--cta dae-animate">
          <div class="dae-float-card__icon dae-text-mint">&#9650;</div>
          <div class="dae-float-card__content">
            <span class="dae-float-card__label">Revenue Generated</span>
            <span class="dae-float-card__detail dae-text-mint">+$127k</span>
          </div>
        </div>
        <div class="dae-float-card dae-float-card--right dae-float-card--cta dae-animate">
          <div class="dae-float-card__icon">&#128197;</div>
          <div class="dae-float-card__content">
            <span class="dae-float-card__label">Consults Booked</span>
            <span class="dae-float-card__detail dae-text-mint">14 This Month</span>
          </div>
        </div>
        <div class="dae-cta__center dae-animate">
          <h2 class="dae-cta__h2">Apply for Founding Clinic Access</h2>
          <p class="dae-cta__sub">
            We're onboarding a limited number of clinics during our founding phase.
            Priority access, hands-on setup, and preferential pricing for early partners.
          </p>
          <a href="#" class="dae-btn dae-btn--primary dae-btn--large">Apply Now</a>
          <p class="dae-cta__note">Limited to 20 founding clinics</p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- SECTION 8: FAQ                             -->
    <!-- ═══════════════════════════════════════════ -->
    <section class="dae-faq">
      <div class="dae-container">
        <div class="dae-faq__grid">
          <div class="dae-faq__left dae-animate">
            <h2 class="dae-section-title dae-section-title--dark dae-section-title--left">
              Frequently Asked Questions
            </h2>
            <p class="dae-faq__intro">
              Everything you need to know about DAE and how it works for your clinic.
              Can't find what you're looking for? Get in touch.
            </p>
          </div>
          <div class="dae-faq__right">
            <div
              v-for="(faq, i) in faqs"
              :key="i"
              class="dae-faq-item dae-animate"
              :class="{ 'dae-faq-item--open': openFaq === i }"
            >
              <button class="dae-faq-item__q" @click="toggleFaq(i)">
                <span>{{ faq.q }}</span>
                <span class="dae-faq-item__icon">{{ openFaq === i ? '−' : '+' }}</span>
              </button>
              <div class="dae-faq-item__a-wrap">
                <p class="dae-faq-item__a">{{ faq.a }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════ -->
    <!-- FOOTER ATTRIBUTION                         -->
    <!-- ═══════════════════════════════════════════ -->
    <footer class="dae-footer">
      <div class="dae-container dae-footer__inner">
        <span class="dae-footer__copy">&copy; {{ new Date().getFullYear() }} DAE — Dental Appointment Engine</span>
      </div>
    </footer>

  </div>
</template>

<style scoped>
/* ════════════════════════════════════════════════════
   DAE HOMEPAGE — Scoped Styles
   ════════════════════════════════════════════════════ */

/* ─── Design Tokens ─── */
.dae-homepage {
  --dae-dark: #0d0d2b;
  --dae-dark-2: #131338;
  --dae-card-dark: #1a1a4e;
  --dae-mint: #5CF7BB;
  --dae-mint-glow: rgba(92, 247, 187, 0.15);
  --dae-mint-glow-strong: rgba(92, 247, 187, 0.25);
  --dae-white: #ffffff;
  --dae-muted: #8b8ba7;
  --dae-light: #c4c4d4;
  --dae-border: rgba(255, 255, 255, 0.08);
  --dae-border-light: rgba(0, 0, 0, 0.08);
  --dae-radius: 16px;
  --dae-radius-sm: 8px;
  --dae-radius-pill: 999px;
  --dae-section-pad: 100px 0;
  --dae-section-pad-m: 60px 0;
  --dae-max-w: 1200px;

  color: var(--dae-white);
  font-family: inherit;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ─── Resets & Utilities ─── */
.dae-homepage *,
.dae-homepage *::before,
.dae-homepage *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.dae-container {
  max-width: var(--dae-max-w);
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.dae-text-mint {
  color: var(--dae-mint);
}

/* ─── Animation Base ─── */
.dae-animate {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.dae-animate.dae-visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger children */
.dae-animate:nth-child(2) { transition-delay: 0.1s; }
.dae-animate:nth-child(3) { transition-delay: 0.2s; }
.dae-animate:nth-child(4) { transition-delay: 0.3s; }
.dae-animate:nth-child(5) { transition-delay: 0.4s; }

/* ─── Buttons ─── */
.dae-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  border-radius: var(--dae-radius-sm);
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
  border: none;
  line-height: 1.2;
}
.dae-btn--primary {
  background: var(--dae-mint);
  color: var(--dae-dark);
}
.dae-btn--primary:hover {
  background: #4de0a8;
  box-shadow: 0 0 30px var(--dae-mint-glow);
}
.dae-btn--secondary {
  background: transparent;
  color: var(--dae-white);
  border: 1.5px solid rgba(255,255,255,0.3);
}
.dae-btn--secondary:hover {
  border-color: var(--dae-white);
  background: rgba(255,255,255,0.05);
}
.dae-btn--on-dark {
  border-color: rgba(255,255,255,0.2);
}
.dae-btn--large {
  padding: 18px 48px;
  font-size: 18px;
}

/* ─── Pill Badge ─── */
.dae-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  border-radius: var(--dae-radius-pill);
  font-size: 14px;
  font-weight: 500;
  background: rgba(92, 247, 187, 0.1);
  color: var(--dae-mint);
  border: 1px solid rgba(92, 247, 187, 0.2);
  margin-bottom: 24px;
}
.dae-pill--small {
  padding: 6px 16px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 16px;
}
.dae-pill__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dae-mint);
  animation: dae-pulse-dot 2s ease-in-out infinite;
}

@keyframes dae-pulse-dot {
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(92, 247, 187, 0.6); }
  50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(92, 247, 187, 0); }
}

/* ─── Section Titles ─── */
.dae-section-title {
  font-size: 44px;
  font-weight: 800;
  color: var(--dae-white);
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.15;
}
.dae-section-title--dark {
  color: var(--dae-dark);
}
.dae-section-title--left {
  text-align: left;
}
.dae-section-sub {
  font-size: 18px;
  color: var(--dae-muted);
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
}

/* ═══════════════════════════════════════════════
   SECTION 1: HERO
   ═══════════════════════════════════════════════ */
.dae-hero {
  position: relative;
  background: var(--dae-dark);
  padding: 140px 0 120px;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
}
.dae-hero__bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  height: 900px;
  background: radial-gradient(circle, rgba(92, 247, 187, 0.12) 0%, rgba(92, 247, 187, 0.04) 35%, transparent 70%);
  pointer-events: none;
  animation: dae-glow-pulse 6s ease-in-out infinite;
}
@keyframes dae-glow-pulse {
  0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
}
.dae-hero__grid {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
.dae-hero__inner {
  position: relative;
  z-index: 2;
}
.dae-hero__center {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
.dae-hero__h1 {
  font-size: 66px;
  font-weight: 800;
  color: var(--dae-white);
  line-height: 1.08;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}
.dae-gradient-text {
  background: linear-gradient(135deg, var(--dae-mint) 0%, #2dd4a0 50%, #1ab394 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.dae-hero__sub {
  font-size: 19px;
  color: var(--dae-muted);
  max-width: 650px;
  margin: 0 auto 40px;
  line-height: 1.7;
}
.dae-hero__ctas {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

/* ─── Floating Cards ─── */
.dae-float-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--dae-dark-2);
  border: 1px solid var(--dae-border);
  border-radius: 12px;
  padding: 14px 18px;
  z-index: 3;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  animation: dae-float 3.5s ease-in-out infinite;
  max-width: 280px;
}
.dae-float-card--left {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
.dae-float-card--right {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  animation-delay: 1.2s;
}
.dae-float-card--cta {
  top: 40%;
}
.dae-float-card__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dae-float-card__dot--green {
  background: var(--dae-mint);
  box-shadow: 0 0 8px rgba(92, 247, 187, 0.5);
}
.dae-float-card__icon {
  font-size: 20px;
  flex-shrink: 0;
}
.dae-float-card__content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.dae-float-card__label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--dae-muted);
}
.dae-float-card__detail {
  font-size: 14px;
  font-weight: 500;
  color: var(--dae-white);
}

@keyframes dae-float {
  0%, 100% { transform: translateY(-50%); }
  50% { transform: translateY(calc(-50% - 12px)); }
}

/* ═══════════════════════════════════════════════
   SECTION 2: PROBLEM
   ═══════════════════════════════════════════════ */
.dae-problem {
  background: #f8f8fc;
  padding: var(--dae-section-pad);
}
.dae-problem__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}
.dae-problem-card {
  background: var(--dae-dark);
  border-radius: var(--dae-radius);
  padding: 36px 30px;
  border: 1px solid var(--dae-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.dae-problem-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(13, 13, 43, 0.15);
}
.dae-problem-card__icon {
  margin-bottom: 20px;
}
.dae-problem-card__title {
  font-size: 20px;
  font-weight: 700;
  color: var(--dae-white);
  margin-bottom: 12px;
}
.dae-problem-card__desc {
  font-size: 15px;
  color: var(--dae-muted);
  line-height: 1.7;
}

/* ═══════════════════════════════════════════════
   SECTION 3: SOLUTION OVERVIEW
   ═══════════════════════════════════════════════ */
.dae-solution {
  background: #f8f8fc;
  padding: 0 0 100px;
}
.dae-solution__card {
  background: var(--dae-dark);
  border-radius: 20px;
  padding: 64px;
  overflow: hidden;
}
.dae-solution__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}
.dae-solution__h2 {
  font-size: 38px;
  font-weight: 800;
  color: var(--dae-white);
  margin-bottom: 18px;
  line-height: 1.15;
}
.dae-solution__body {
  font-size: 16px;
  color: var(--dae-light);
  line-height: 1.75;
  margin-bottom: 24px;
}

/* ─── Chips ─── */
.dae-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 32px;
}
.dae-chip {
  padding: 8px 16px;
  border-radius: var(--dae-radius-pill);
  font-size: 13px;
  font-weight: 500;
  background: rgba(92, 247, 187, 0.08);
  color: var(--dae-mint);
  border: 1px solid rgba(92, 247, 187, 0.15);
}

/* ─── Kanban Mockup ─── */
.dae-kanban {
  background: var(--dae-dark-2);
  border-radius: 14px;
  padding: 24px;
  border: 1px solid var(--dae-border);
}
.dae-kanban__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.dae-kanban__title {
  font-size: 15px;
  font-weight: 700;
  color: var(--dae-white);
}
.dae-kanban__badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--dae-radius-pill);
  background: rgba(92, 247, 187, 0.12);
  color: var(--dae-mint);
}
.dae-kanban__cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.dae-kanban__col {
  background: rgba(255,255,255,0.03);
  border-radius: 10px;
  padding: 12px;
}
.dae-kanban__col-head {
  font-size: 11px;
  font-weight: 600;
  color: var(--dae-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.dae-kanban__col-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}
.dae-kanban__count {
  margin-left: auto;
  background: rgba(255,255,255,0.06);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 10px;
}
.dae-kanban__item {
  background: var(--dae-card-dark);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 12px;
  color: var(--dae-light);
  margin-bottom: 6px;
  border: 1px solid var(--dae-border);
}
.dae-kanban__item:last-child {
  margin-bottom: 0;
}

/* ═══════════════════════════════════════════════
   SECTION 4: HOW IT WORKS
   ═══════════════════════════════════════════════ */
.dae-how {
  background: var(--dae-dark);
  padding: var(--dae-section-pad);
}
.dae-how__header {
  margin-bottom: 60px;
}
.dae-how__layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 48px;
  align-items: start;
}
.dae-how__steps {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dae-step-btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 20px;
  background: transparent;
  border: none;
  border-left: 3px solid var(--dae-border);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  border-radius: 0 var(--dae-radius-sm) var(--dae-radius-sm) 0;
}
.dae-step-btn:hover {
  background: rgba(255,255,255,0.03);
}
.dae-step-btn--active {
  border-left-color: var(--dae-mint);
  background: rgba(92, 247, 187, 0.06);
}
.dae-step-btn__num {
  font-size: 14px;
  font-weight: 700;
  color: var(--dae-muted);
  font-variant-numeric: tabular-nums;
  transition: color 0.3s ease;
}
.dae-step-btn--active .dae-step-btn__num {
  color: var(--dae-mint);
}
.dae-step-btn__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--dae-muted);
  transition: color 0.3s ease;
}
.dae-step-btn--active .dae-step-btn__title {
  color: var(--dae-white);
}

.dae-how__panel {
  background: var(--dae-dark-2);
  border-radius: var(--dae-radius);
  padding: 48px;
  border: 1px solid var(--dae-border);
  min-height: 360px;
}
.dae-how__panel-num {
  font-size: 56px;
  font-weight: 800;
  color: var(--dae-mint);
  opacity: 0.2;
  line-height: 1;
  margin-bottom: 8px;
  font-variant-numeric: tabular-nums;
}
.dae-how__panel-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--dae-white);
  margin-bottom: 16px;
}
.dae-how__panel-desc {
  font-size: 17px;
  color: var(--dae-light);
  line-height: 1.75;
  margin-bottom: 36px;
  max-width: 560px;
}
.dae-how__panel-visual {
  margin-top: auto;
}
.dae-step-graphic {
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 3px;
  overflow: hidden;
}
.dae-step-graphic__bar {
  height: 100%;
  background: linear-gradient(90deg, var(--dae-mint), #2dd4a0);
  border-radius: 3px;
  transition: width 0.5s ease;
}
.dae-step-graphic__labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: var(--dae-muted);
}

/* ═══════════════════════════════════════════════
   SECTION 5: PRODUCT VISUAL
   ═══════════════════════════════════════════════ */
.dae-product-visual {
  background: #f8f8fc;
  padding: var(--dae-section-pad);
}
.dae-product__card {
  background: var(--dae-dark);
  border-radius: 20px;
  padding: 64px;
  text-align: center;
}
.dae-product__title {
  font-size: 38px;
  font-weight: 800;
  color: var(--dae-white);
  margin-bottom: 48px;
  line-height: 1.15;
}
.dae-product__mockups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}
.dae-product__caption {
  font-size: 16px;
  font-weight: 500;
}

/* ─── Mockup Cards ─── */
.dae-mockup-card {
  background: var(--dae-dark-2);
  border-radius: 14px;
  border: 1px solid var(--dae-border);
  text-align: left;
  overflow: hidden;
}
.dae-mockup-card__header {
  padding: 16px 20px;
  border-bottom: 1px solid var(--dae-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dae-mockup-card__label {
  font-size: 12px;
  font-weight: 600;
  color: var(--dae-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.dae-mockup-card__status {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: var(--dae-radius-pill);
}
.dae-mockup-card__status--green {
  background: rgba(92, 247, 187, 0.12);
  color: var(--dae-mint);
}
.dae-mockup-card__body {
  padding: 20px;
}
.dae-mockup-card__name {
  font-size: 18px;
  font-weight: 700;
  color: var(--dae-white);
  margin-bottom: 8px;
}
.dae-mockup-card__tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: var(--dae-radius-pill);
  font-size: 12px;
  font-weight: 600;
  background: rgba(92, 247, 187, 0.1);
  color: var(--dae-mint);
  margin-bottom: 16px;
}
.dae-mockup-card__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--dae-border);
  font-size: 13px;
}
.dae-mockup-card__row-label {
  color: var(--dae-muted);
}
.dae-mockup-card__row-value {
  color: var(--dae-white);
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.dae-mockup-card__notes {
  margin-top: 16px;
  font-size: 13px;
  color: var(--dae-light);
  line-height: 1.6;
}
.dae-mockup-card__notes-label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  color: var(--dae-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.dae-mockup-card__big-num {
  font-size: 36px;
  font-weight: 800;
  color: var(--dae-white);
  font-variant-numeric: tabular-nums;
  margin-bottom: 4px;
}
.dae-mockup-card__big-label {
  font-size: 13px;
  color: var(--dae-muted);
  margin-bottom: 24px;
}

/* ─── Bar Chart ─── */
.dae-bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  height: 120px;
}
.dae-bar-chart__bar {
  flex: 1;
  height: var(--h);
  background: rgba(92, 247, 187, 0.2);
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: height 0.6s ease;
}
.dae-bar-chart__bar--active {
  background: var(--dae-mint);
}
.dae-bar-chart__bar span {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  color: var(--dae-muted);
}

/* ─── Funnel ─── */
.dae-funnel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.dae-funnel__stage {
  display: flex;
  align-items: center;
  gap: 16px;
}
.dae-funnel__bar {
  width: var(--w);
  height: 32px;
  background: linear-gradient(90deg, var(--dae-mint), rgba(92, 247, 187, 0.3));
  border-radius: 6px;
  min-width: 40px;
  transition: width 1s ease;
}
.dae-funnel__info {
  display: flex;
  align-items: baseline;
  gap: 8px;
  white-space: nowrap;
}
.dae-funnel__num {
  font-size: 24px;
  font-weight: 800;
  color: var(--dae-white);
  font-variant-numeric: tabular-nums;
}
.dae-funnel__name {
  font-size: 13px;
  color: var(--dae-muted);
}

/* ═══════════════════════════════════════════════
   SECTION 6: CREDIBILITY
   ═══════════════════════════════════════════════ */
.dae-credibility {
  background: var(--dae-dark);
  padding: var(--dae-section-pad);
}
.dae-credibility__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 48px;
}
.dae-credibility__founders {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.dae-founder-card {
  display: flex;
  gap: 20px;
  background: var(--dae-dark-2);
  border-radius: var(--dae-radius);
  padding: 28px;
  border: 1px solid var(--dae-border);
}
.dae-founder-card__avatar {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--dae-mint), #2dd4a0);
  color: var(--dae-dark);
  font-size: 18px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.dae-founder-card__name {
  font-size: 17px;
  font-weight: 700;
  color: var(--dae-white);
  margin-bottom: 4px;
}
.dae-founder-card__role {
  font-size: 13px;
  color: var(--dae-mint);
  font-weight: 500;
  display: block;
  margin-bottom: 10px;
}
.dae-founder-card__bio {
  font-size: 14px;
  color: var(--dae-muted);
  line-height: 1.65;
}

.dae-credibility__insights {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.dae-insight-card {
  background: var(--dae-dark-2);
  border-radius: var(--dae-radius);
  padding: 24px 28px;
  border: 1px solid var(--dae-border);
  transition: border-color 0.3s ease;
}
.dae-insight-card:hover {
  border-color: rgba(92, 247, 187, 0.2);
}
.dae-insight-card__title {
  font-size: 16px;
  font-weight: 700;
  color: var(--dae-white);
  margin-bottom: 8px;
}
.dae-insight-card__desc {
  font-size: 14px;
  color: var(--dae-muted);
  line-height: 1.65;
}

/* ═══════════════════════════════════════════════
   SECTION 7: CTA
   ═══════════════════════════════════════════════ */
.dae-cta {
  position: relative;
  background: var(--dae-dark);
  padding: 120px 0;
  overflow: hidden;
}
.dae-cta__bg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(92, 247, 187, 0.1) 0%, transparent 65%);
  pointer-events: none;
  animation: dae-glow-pulse 6s ease-in-out infinite;
}
.dae-cta__inner {
  position: relative;
  z-index: 2;
}
.dae-cta__center {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
}
.dae-cta__h2 {
  font-size: 44px;
  font-weight: 800;
  color: var(--dae-white);
  margin-bottom: 18px;
  line-height: 1.15;
}
.dae-cta__sub {
  font-size: 18px;
  color: var(--dae-light);
  margin-bottom: 40px;
  line-height: 1.7;
}
.dae-cta__note {
  margin-top: 16px;
  font-size: 14px;
  color: var(--dae-muted);
  font-style: italic;
}

/* ═══════════════════════════════════════════════
   SECTION 8: FAQ
   ═══════════════════════════════════════════════ */
.dae-faq {
  background: #f8f8fc;
  padding: var(--dae-section-pad);
}
.dae-faq__grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 64px;
  align-items: start;
}
.dae-faq__intro {
  font-size: 16px;
  color: #6b6b85;
  line-height: 1.7;
  margin-top: 16px;
}
.dae-faq-item {
  border-bottom: 1px solid rgba(0,0,0,0.08);
}
.dae-faq-item__q {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 22px 0;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--dae-dark);
  text-align: left;
  font-family: inherit;
  line-height: 1.4;
}
.dae-faq-item__q:hover {
  color: #1a1a4e;
}
.dae-faq-item__icon {
  font-size: 22px;
  color: var(--dae-muted);
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}
.dae-faq-item--open .dae-faq-item__icon {
  transform: rotate(180deg);
}
.dae-faq-item__a-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.dae-faq-item--open .dae-faq-item__a-wrap {
  max-height: 300px;
}
.dae-faq-item__a {
  padding: 0 0 22px;
  font-size: 15px;
  color: #6b6b85;
  line-height: 1.7;
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
.dae-footer {
  background: var(--dae-dark);
  padding: 32px 0;
  border-top: 1px solid var(--dae-border);
}
.dae-footer__inner {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dae-footer__copy {
  font-size: 13px;
  color: var(--dae-muted);
}

/* ═══════════════════════════════════════════════
   RESPONSIVE — 1024px
   ═══════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .dae-hero {
    padding: 100px 0 80px;
    min-height: auto;
  }
  .dae-hero__h1 {
    font-size: 48px;
  }
  .dae-section-title {
    font-size: 34px;
  }
  .dae-solution__h2,
  .dae-product__title {
    font-size: 30px;
  }
  .dae-cta__h2 {
    font-size: 36px;
  }

  .dae-float-card--left,
  .dae-float-card--right {
    display: none;
  }

  .dae-problem__grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .dae-solution__grid {
    grid-template-columns: 1fr;
  }
  .dae-solution__card {
    padding: 40px;
  }
  .dae-how__layout {
    grid-template-columns: 1fr;
  }
  .dae-product__mockups {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }
  .dae-product__card {
    padding: 40px;
  }
  .dae-credibility__grid {
    grid-template-columns: 1fr;
  }
  .dae-faq__grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .dae-section-title--left {
    text-align: center;
  }
  .dae-faq__intro {
    text-align: center;
  }
  .dae-kanban__cols {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ═══════════════════════════════════════════════
   RESPONSIVE — 640px
   ═══════════════════════════════════════════════ */
@media (max-width: 640px) {
  .dae-homepage {
    --dae-section-pad: 60px 0;
    --dae-section-pad-m: 48px 0;
  }
  .dae-container {
    padding: 0 16px;
  }
  .dae-hero {
    padding: 80px 0 60px;
  }
  .dae-hero__h1 {
    font-size: 36px;
  }
  .dae-hero__sub {
    font-size: 16px;
  }
  .dae-section-title {
    font-size: 28px;
  }
  .dae-section-sub {
    font-size: 16px;
    margin-bottom: 40px;
  }
  .dae-solution__h2,
  .dae-product__title {
    font-size: 26px;
  }
  .dae-cta__h2 {
    font-size: 28px;
  }
  .dae-solution__card,
  .dae-product__card {
    padding: 28px 20px;
    border-radius: 14px;
  }
  .dae-how__panel {
    padding: 28px 20px;
  }
  .dae-hero__ctas {
    flex-direction: column;
    align-items: center;
  }
  .dae-hero__ctas .dae-btn {
    width: 100%;
    max-width: 300px;
  }
  .dae-btn--large {
    padding: 16px 36px;
    font-size: 16px;
  }
  .dae-kanban__cols {
    grid-template-columns: 1fr;
  }
  .dae-founder-card {
    flex-direction: column;
    align-items: flex-start;
  }
  .dae-mockup-card__big-num {
    font-size: 28px;
  }
  .dae-how__panel-num {
    font-size: 40px;
  }
  .dae-how__panel-title {
    font-size: 22px;
  }
  .dae-cta {
    padding: 80px 0;
  }
  .dae-cta__sub {
    font-size: 16px;
  }
  .dae-funnel__num {
    font-size: 20px;
  }
  .dae-funnel__bar {
    height: 24px;
  }
}
</style>
