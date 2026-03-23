<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Counter animation
const counters = ref([
  { value: 0, target: 20, suffix: '', unit: 'Years', label: 'Proven Track Record' },
  { value: 0, target: 30, suffix: '+', unit: 'Million', label: 'Ad Spend Managed' },
  { value: 0, target: 29, suffix: ',000', unit: 'Leads', label: 'Qualified Leads Generated' },
  { value: 0, target: 5, suffix: '', unit: 'Mins', label: 'Average Contact Time' },
  { value: 0, target: 60, suffix: '+', unit: "Clinic's", label: 'Digitally Grown' },
])

const hasAnimated = ref(false)
let scrollCleanup = null

function animateCounters() {
  if (hasAnimated.value) return
  hasAnimated.value = true
  counters.value.forEach((counter, i) => {
    const duration = 1600
    const steps = 40
    const stepTime = duration / steps
    const increment = counter.target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= counter.target) {
        counters.value[i].value = counter.target
        clearInterval(timer)
      } else {
        counters.value[i].value = Math.floor(current)
      }
    }, stepTime)
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          // Fade in animation
          entry.target.querySelectorAll('.sp-animate').forEach((el, i) => {
            setTimeout(() => {
              el.classList.add('sp-visible')
            }, i * 80)
          })
        }
      })
    },
    { threshold: 0.15 }
  )

  const section = document.getElementById('social-proof')
  if (section) observer.observe(section)

  // Parallax on arrow-dots
  const dots = document.querySelector('.sp-banner-dots')
  if (dots) {
    const onScroll = () => {
      const banner = dots.closest('.sp-banner-inner')
      if (!banner) return
      const rect = banner.getBoundingClientRect()
      const vh = window.innerHeight
      // progress 0→1 as banner scrolls through viewport
      const progress = 1 - (rect.top + rect.height) / (vh + rect.height)
      // shift dots upward by up to 40px as user scrolls down
      const offset = Math.max(-40, Math.min(0, (progress - 0.5) * -80))
      dots.style.transform = `translateY(calc(-50% + ${offset}px))`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    scrollCleanup = () => window.removeEventListener('scroll', onScroll)
  }
})
onUnmounted(() => {
  if (scrollCleanup) scrollCleanup()
})
</script>

<template>
  <div id="social-proof" class="social-proof-section">

    <!-- STATS BAR -->
    <div class="sp-stats-bar">
      <div class="sp-stats-container">
        <!-- Meta Badge -->
        <div class="sp-stat-item sp-badge-item sp-animate">
          <img
            src="~/assets/images/custom-icons/google-badge.png"
            alt="Meta Business Partner"
            class="sp-meta-badge"
          />
        </div>

        <!-- Stat items -->
        <div
          v-for="(stat, index) in counters"
          :key="index"
          class="sp-stat-item sp-animate"
        >
          <div class="sp-stat-divider"></div>
          <div class="sp-stat-content">
            <div class="sp-stat-number">
              <span class="sp-stat-value">{{ stat.value }}{{ stat.suffix }}</span>
              <span class="sp-stat-unit">{{ stat.unit }}</span>
            </div>
            <p class="sp-stat-label">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- DARK BANNER -->
    <div class="sp-banner">
      <div class="sp-banner-inner">
        <span class="sp-banner-tag sp-animate">WHAT WE DO</span>
        <h2 class="sp-banner-heading sp-animate">
          Filling chairs<br />
          with high-value implant patients.
        </h2>
        <img
          src="~/assets/images/custom-icons/arrow-dots.svg"
          alt=""
          class="sp-banner-dots"
          aria-hidden="true"
        />
      </div>
    </div>

    <!-- VALUE PROPS -->
    <div class="sp-value-grid">
      <div class="sp-value-container">
        <div class="sp-value-card sp-animate">
          <div class="sp-value-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="28" r="18" stroke="#1a1a2e" stroke-width="2" fill="none"/>
              <path d="M26 28l4 4 8-8" stroke="#025864" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 46c0 0 4-6 12-6s12 6 12 6" stroke="#1a1a2e" stroke-width="2" stroke-linecap="round"/>
              <circle cx="32" cy="28" r="6" stroke="#025864" stroke-width="1.5" fill="none" stroke-dasharray="3 3"/>
            </svg>
          </div>
          <h4 class="sp-value-title">Pre-Qualified Patients</h4>
          <p class="sp-value-desc">Every lead is screened and qualified before it reaches your clinic — no tyre-kickers, only high-value implant candidates ready to book.</p>
        </div>

        <div class="sp-value-card sp-animate">
          <div class="sp-value-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="12" y="16" width="40" height="32" rx="4" stroke="#1a1a2e" stroke-width="2" fill="none"/>
              <path d="M12 26h40" stroke="#1a1a2e" stroke-width="2"/>
              <circle cx="22" cy="21" r="1.5" fill="#025864"/>
              <circle cx="28" cy="21" r="1.5" fill="#025864"/>
              <circle cx="34" cy="21" r="1.5" fill="#025864"/>
              <path d="M24 34l4 4 8-8" stroke="#025864" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 42h24" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 3"/>
            </svg>
          </div>
          <h4 class="sp-value-title">Done-For-You System</h4>
          <p class="sp-value-desc">From ad creative to landing pages, follow-ups and booking — we build, run and optimise everything so your team can focus on treatment.</p>
        </div>

        <div class="sp-value-card sp-animate">
          <div class="sp-value-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 48V24l16-12 16 12v24" stroke="#1a1a2e" stroke-width="2" stroke-linejoin="round" fill="none"/>
              <rect x="26" y="36" width="12" height="12" rx="1" stroke="#1a1a2e" stroke-width="2" fill="none"/>
              <path d="M32 36v12" stroke="#025864" stroke-width="1.5"/>
              <circle cx="32" cy="28" r="4" stroke="#025864" stroke-width="2" fill="none"/>
              <path d="M30 28h4" stroke="#025864" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M32 26v4" stroke="#025864" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <h4 class="sp-value-title">Dental-Specific Expertise</h4>
          <p class="sp-value-desc">Built exclusively for implant and cosmetic dentistry. Our system is designed around how dental patients actually research, compare and decide.</p>
        </div>

        <div class="sp-value-card sp-animate">
          <div class="sp-value-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 44l8-10 8 6 8-14 8 8" stroke="#025864" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 44l8-10 8 6 8-14 8 8" stroke="#025864" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" opacity="0.2" transform="translate(0,4)"/>
              <circle cx="48" cy="34" r="3" fill="#025864"/>
              <path d="M44 18l4-4 4 4" stroke="#1a1a2e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M48 14v12" stroke="#1a1a2e" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 50h42" stroke="#1a1a2e" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </div>
          <h4 class="sp-value-title">Scalable Growth</h4>
          <p class="sp-value-desc">Start with one location or scale across multiple clinics. Our platform grows with your practice — more spend, more patients, same system.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ============================
   SOCIAL PROOF SECTION
   ============================ */
.social-proof-section {
  background: #fff;
  position: relative;
}

/* Animate in */
.sp-animate {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.sp-animate.sp-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ============================
   STATS BAR
   ============================ */
.sp-stats-bar {
  padding: 40px 0;
  border-bottom: 1px solid #e8e8e8;
}
.sp-stats-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* Meta Badge */
.sp-badge-item {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}
.sp-meta-badge {
  height: 52px;
  width: auto;
  object-fit: contain;
}

/* Stat items */
.sp-stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
}
.sp-stat-divider {
  width: 3px;
  height: 40px;
  background: #025864;
  border-radius: 2px;
  flex-shrink: 0;
}
.sp-stat-content {
  display: flex;
  flex-direction: column;
}
.sp-stat-number {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.sp-stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a2e;
  line-height: 1;
  letter-spacing: -0.02em;
}
.sp-stat-unit {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a2e;
  line-height: 1;
}
.sp-stat-label {
  font-size: 0.85rem;
  color: #666;
  margin: 4px 0 0;
  line-height: 1.3;
}

/* ============================
   DARK BANNER
   ============================ */
.sp-banner {
  padding: 24px;
}
.sp-banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  background: #1a1a2e;
  border-radius: 16px;
  padding: 60px 56px 72px;
  position: relative;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.sp-banner-tag {
  display: inline-block;
  background: #2a2a3e;
  color: #b0b0c0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 8px 16px;
  border-radius: 6px;
  margin-bottom: 40px;
  width: fit-content;
}
.sp-banner-heading {
  font-size: 2.75rem;
  font-weight: 400;
  color: #fff;
  line-height: 1.25;
  margin: 0;
  max-width: 600px;
}
.sp-banner-heading br + * {
  font-weight: 600;
}
.sp-banner-dots {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  width: 260px;
  height: auto;
  opacity: 0.25;
  will-change: transform;
  transition: transform 0.1s linear;
}

/* ============================
   VALUE PROPS GRID
   ============================ */
.sp-value-grid {
  padding: 72px 24px 80px;
}
.sp-value-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
}
.sp-value-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.sp-value-icon {
  margin-bottom: 20px;
}
.sp-value-icon svg {
  width: 64px;
  height: 64px;
}
.sp-value-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 12px;
  line-height: 1.3;
}
.sp-value-desc {
  font-size: 0.925rem;
  color: #555;
  line-height: 1.65;
  margin: 0;
}

/* ============================
   RESPONSIVE
   ============================ */
@media (max-width: 1024px) {
  .sp-stats-container {
    flex-wrap: wrap;
    justify-content: center;
    gap: 24px 32px;
  }
  .sp-badge-item {
    flex: 0 0 100%;
    justify-content: center;
  }
  .sp-value-container {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  .sp-banner-heading {
    font-size: 2.25rem;
  }
}

@media (max-width: 640px) {
  .sp-stats-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .sp-stat-item {
    width: 100%;
    max-width: 280px;
  }
  .sp-badge-item {
    justify-content: center;
  }
  .sp-value-container {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .sp-banner-inner {
    padding: 40px 28px 48px;
  }
  .sp-banner-heading {
    font-size: 1.75rem;
  }
  .sp-banner-dots {
    width: 140px;
    right: 16px;
    opacity: 0.15;
  }
}
</style>
