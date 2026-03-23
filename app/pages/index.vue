<script setup>
import { onMounted, onUnmounted } from 'vue' 

import HeaderEight from '~/layouts/headers/HeaderEight.vue'
import FooterEight from '~/layouts/footers/FooterEight.vue'


useHead({
  title: "DAE - Dental Appointment Engine | Implant Consultations on Autopilot",
    meta: [
    { name: "description", content: "DAE is the technology platform and marketing system that helps dental clinics generate and book high-value implant consultations automatically." },
    { name: "keywords", content: "dental implant marketing, dental appointment engine, implant consultations, dental clinic growth, patient generation" },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "DAE - Dental Appointment Engine" },
  ],
  link: [
    { rel: "canonical", href: "https://dentalappointmentengine.com/" },
  ],
  metaOG: [
    { property: "og:title", content: "DAE - Dental Appointment Engine | Implant Consultations on Autopilot" },
    { property: "og:description", content: "The technology platform and marketing system that helps dental clinics generate and book high-value implant consultations automatically." },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://dentalappointmentengine.com/" },
    { property: "og:image", content: "https://dentalappointmentengine.com/og-image.jpg" } 
  ],
  metaTwitter: [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "DAE - Dental Appointment Engine | Implant Consultations on Autopilot" },
    { name: "twitter:description", content: "The technology platform and marketing system that helps dental clinics generate and book high-value implant consultations automatically." },
    { name: "twitter:image", content: "https://dentalappointmentengine.com/og-image.jpg" }
  ],
})

let styleEl

onMounted(async () => {
  const css = await import('~/assets/css/theme/theme-five.purge.css?inline')
  styleEl = document.createElement('style')
  styleEl.textContent = css.default
  document.head.appendChild(styleEl)
})

onUnmounted(() => {
  if (styleEl && styleEl.parentNode) {
    styleEl.parentNode.removeChild(styleEl)
  }
})


</script>


<template>
  <div class="theme-5">
    <div class="bp-xs bp-sm bp-md bp-lg bp-xl dom-ready bp-xxl-max uni-body panel uni-body panel bg-tertiary-800 text-tertiary-200 overflow-x-hidden disable-cursor uc-dark">
      <HeaderEight />
      <div id="wrapper" class="wrap">
        <HomesHome9HeroArea />
        <HomesHome9SocialProof />
        <HomesHome9HwoItWork />
        <HomesHome9PartnerArea />
        <HomesHome9FeaturesArea />
        <HomesHome9KeyFeatures />
        <HomesHome9PricingArea />
        <HomesHome9TestimonialArea />
        <HomesHome9FaqArea />  
      </div>
      <FooterEight />
    </div>
  </div>
</template>


<style scoped>
  @import '~/assets/css/theme/theme-five.purge.css';  
 

</style>
