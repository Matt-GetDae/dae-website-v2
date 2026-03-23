<script setup>
</script>



<template>
  <footer id="uc-footer" class="uc-footer panel overflow-hidden">
    <div
      class="footer-outer py-6 lg:py-8 xl:py-9 lg:m-2 lg:rounded-2 bg-secondary dark:bg-tertiary-700 border border-secondary dark:border-white dark:border-opacity-15">
      <div class="uc-footer-content">
        <div class="container xl:max-w-xl">
          <div class="uc-footer-inner vstack gap-4 lg:gap-6 xl:gap-8">
            <div class="uc-footer-widgets panel">
              <div class="row child-cols-6 md:child-cols col-match g-4">
                <div class="col-12">
                  <div
                    class="panel vstack items-center gap-1 max-w-400px lg:max-w-750px mx-auto text-center mb-6 xl:mb-8">
                    <div class="mb-2 lg:mb-3">
                      <a href="https://dentalappointmentengine.com"
                        class="btn btn-md xl:btn-lg btn-primary border border-dark dark:border-white dark:border-opacity-15 px-3 lg:px-5 w-auto rounded-pill">
                        <span>Book a Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-12 lg:col-6">
                  <div class="panel vstack items-start gap-3 xl:gap-4 lg:max-w-1/2">
                    <div>
                      <NuxtLink class="panel text-none" to="/" style="height: 36px;">
                        <img src="~/assets/images/common/dae-logo-white.png"
                          alt="DAE" style="height: 36px; width: auto;">
                      </NuxtLink>
                      <p class="mt-2">The AI-powered patient acquisition platform for high-value dental implant clinics.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <ul class="nav-y gap-2 fw-medium dark:text-white">
                    <li class="fs-7 fw-bold text-uppercase opacity-50 mb-1">Platform</li>
                    <li><NuxtLink to="#features">How It Works</NuxtLink></li>
                    <li><NuxtLink to="#key_features">Features</NuxtLink></li>
                    <li><a href="https://dentalappointmentengine.com">Book a Demo</a></li>
                  </ul>
                </div>
                <div>
                  <ul class="nav-y gap-2 fw-medium dark:text-white">
                    <li class="fs-7 fw-bold text-uppercase opacity-50 mb-1">Company</li>
                    <li><a href="mailto:hello@getdae.com">Contact</a></li>
                    <li><NuxtLink to="#">Privacy Policy</NuxtLink></li>
                    <li><NuxtLink to="#">Terms of Service</NuxtLink></li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="uc-footer-bottom panel vstack lg:hstack gap-4 justify-between text-center pt-4 lg:pt-6 mt-6 border-top">
              <p>DAE © {{ new Date().getFullYear() }}, All rights reserved.</p>
              <ul class="nav-x justify-center gap-2">
                <li><a class="duration-150 hover:text-primary" href="https://www.linkedin.com/"><i
                      class="icon icon-2 unicon-logo-linkedin"></i></a></li>
                <li><a class="duration-150 hover:text-primary" href="https://www.instagram.com/"><i
                      class="icon icon-2 unicon-logo-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>