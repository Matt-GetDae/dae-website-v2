<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const words = ['your clinic', 'your practice', 'your growth']
const displayText = ref(words[0])
const showCursor = ref(false)
const isDeleting = ref(false)
const wordIndex = ref(0)
const charIndex = ref(words[0].length)
let timer = null

const typeSpeed = 80
const backSpeed = 50
const backDelay = 1500
const typeDelay = 200

function tick() {
  const currentWord = words[wordIndex.value]

  if (!isDeleting.value) {
    charIndex.value++
    displayText.value = currentWord.substring(0, charIndex.value)

    if (charIndex.value === currentWord.length) {
      isDeleting.value = true
      timer = setTimeout(tick, backDelay)
      return
    }
    timer = setTimeout(tick, typeSpeed)
  } else {
    charIndex.value--
    displayText.value = currentWord.substring(0, charIndex.value)

    if (charIndex.value === 0) {
      isDeleting.value = false
      wordIndex.value = (wordIndex.value + 1) % words.length
      timer = setTimeout(tick, typeDelay)
      return
    }
    timer = setTimeout(tick, backSpeed)
  }
}

onMounted(() => {
  showCursor.value = true
  // Start with first word fully displayed, then begin deleting after a pause
  isDeleting.value = true
  timer = setTimeout(tick, backDelay)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div id="hero_header" class="hero-header section panel overflow-hidden">
    <div class="section-outer py-6 lg:py-8 xl:py-10 min-h-700px">
      <div
        class="w-750px h-750px position-absolute top-50 start-50 translate-middle rounded-circle border border-dashed border-tertiary-100 dark:border-tertiary-600">
      </div>
      <div
        class="w-1000px h-1000px position-absolute top-50 start-50 translate-middle rounded-circle border border-dashed border-tertiary-100 dark:border-tertiary-600">
      </div>
      <div
        class="w-1280px h-1280px position-absolute top-50 start-50 translate-middle rounded-circle border border-dashed border-tertiary-100 dark:border-tertiary-600">
      </div>
      <div
        class="position-cover bg-gradient-to-bb from-white dark:from-tertiary-700 via-transparent to-white dark:to-tertiary-800">
      </div>
      <div
        class="position-absolute top-0 start-50 translate-middle w-1000px h-500px bg-secondary-300 dark:bg-white rounded-circle blur-10 dark:blend-overlay">
      </div>
      <div class="container">
        <div class="section-inner panel">
          <div class="d-none xl:d-block"
            data-anime="targets: >*; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 500});">
            <div
              class="position-absolute rounded-circle border border-dark dark:border-white dark:border-opacity-15 dark:bg-gradient-45 to-transparent cstack w-56px h-56px d-none lg:d-block"
              style="top: 10%; right: 10.5%"
              data-anime="translateY: [0, 15]; easing: linear; loop: true; direction: alternate; delay: 50;"><img
                class="p-2" src="~/assets/images/apps/zapier.svg" alt="brand"></div>
            <div
              class="position-absolute rounded-circle border border-dark dark:border-white dark:border-opacity-15 dark:bg-gradient-45 to-transparent cstack w-56px h-56px d-none lg:d-block"
              style="top: -5%; left: 24%"
              data-anime="translateY: [0, 5]; easing: linear; loop: true; direction: alternate; delay: 25;"><img
                class="p-2" src="~/assets/images/apps/stipe.svg" alt="brand"></div>
            <div
              class="position-absolute rounded-circle border border-dark dark:border-white dark:border-opacity-15 dark:bg-gradient-45 to-transparent cstack w-56px h-56px d-none lg:d-block"
              style="top: 30%; left: -1.5%"
              data-anime="translateY: [0, 10]; easing: linear; loop: true; direction: alternate; delay: 0;"><img
                class="p-2" src="~/assets/images/apps/asana.svg" alt="brand"></div>
            <div
              class="position-absolute rounded-circle border border-dark dark:border-white dark:border-opacity-15 dark:bg-gradient-45 to-transparent cstack w-56px h-56px d-none lg:d-block"
              style="top: 45%; right: -1.5%"
              data-anime="translateY: [0, 5]; easing: linear; loop: true; direction: alternate; delay: 50;"><img
                class="p-2 text-dark dark:text-yellow-400" src="~/assets/images/apps/mailchimp.svg" alt="brand"
                data-uc-svg></div>
            <div
              class="position-absolute rounded-circle border border-dark dark:border-white dark:border-opacity-15 dark:bg-gradient-45 to-transparent cstack w-56px h-56px d-none lg:d-block"
              style="top: 75%; right: 21%"
              data-anime="translateY: [0, 15]; easing: linear; loop: true; direction: alternate; delay: 25;"><img
                class="p-2" src="~/assets/images/apps/drive.svg" alt="brand"></div>
            <div
              class="position-absolute rounded-circle border border-dark dark:border-white dark:border-opacity-15 dark:bg-gradient-45 to-transparent cstack w-56px h-56px d-none lg:d-block"
              style="top: 85%; left: 11.5%"
              data-anime="translateY: [0, 10]; easing: linear; loop: true; direction: alternate; delay: 50;"><img
                class="p-2" src="~/assets/images/apps/bitbucket.svg" alt="brand"></div>
          </div>
          <div class="panel vstack items-center gap-2 max-w-md mx-auto text-center px-4 lg:px-0 mt-6"
            data-anime="onview:-100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: easeOutCubic; duration: 500; delay: anime.stagger(100, {start: 200});">
            <span
              class="fs-7 fw-medium py-narrow px-2 bg-dark text-white dark:bg-primary dark:text-dark rounded-pill">Dental Appointment Engine</span>
            <h2 class="h2 xl:display-5 m-0 text-center hero-heading">Implant consultations<br>on autopilot for<br><span class="text-tertiary dark:text-primary typed-word" style="white-space: nowrap;">{{ displayText }}<span v-if="showCursor" class="typed-cursor">|</span></span></h2>
            <p class="fs-5 lg:fs-4">The technology platform that helps dental clinics generate and book high-value implant consultations automatically.</p>
            <div class="panel vstack items-center gap-1 max-w-400px lg:max-w-750px mx-auto text-center mt-2 xl:mt-4">
              <div class="mb-2 lg:mb-3">
                <a href="#"
                  class="btn btn-md xl:btn-lg btn-primary border border-dark dark:border-white dark:border-opacity-15 px-3 lg:px-5 w-auto rounded-pill">
                  <span>Book a Demo</span>
                </a>
              </div>
              <div class="hstack justify-center gap-1 fs-6 text-gray-900 dark:text-white">
                <span>Trusted by 60+ dental clinics across Australia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-heading {
  min-height: 3.6em;
}

.typed-word {
  display: inline;
}

.typed-cursor {
  display: inline;
  font-weight: 100;
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
