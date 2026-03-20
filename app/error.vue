<script setup>
import HeaderEight from '~/layouts/headers/HeaderEight.vue'
import FooterEight from '~/layouts/footers/FooterEight.vue'

useHead({
  title: '404 - Page Not Found',
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="theme-5">
    <div class="bp-xs bp-sm bp-md bp-lg bp-xl dom-ready bp-xxl-max uni-body panel uni-body panel bg-tertiary-800 text-tertiary-200 overflow-x-hidden disable-cursor uc-dark">
      <HeaderEight />
      <div id="wrapper" class="wrap">
        <section class="py-20 text-center" style="min-height: 60vh; display: flex; align-items: center; justify-content: center;">
          <div>
            <h1 class="h2 mb-4">Page Not Found</h1>
            <p class="mb-6">The page you're looking for doesn't exist.</p>
            <button @click="handleError" class="btn btn-primary">Go Home</button>
          </div>
        </section>
      </div>
      <FooterEight />
    </div>
  </div>
</template>

<style scoped>
@import '~/assets/css/theme/theme-five.purge.css';
</style>
