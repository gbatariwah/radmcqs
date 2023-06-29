<script setup lang="ts"></script>

<template>
  <div class="space-y-12">
    <div>
      <h1
        class="text-center font-[oswald] font-bold text-xl tracking-wider uppercase pb-8"
      >
        Anatomy
      </h1>

      <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        <div>
          <div>
            <nuxt-link to="/mcq-companion">
              <img src="~/assets/mcq-companion/cover.jpg" alt="mcq-companion" />
            </nuxt-link>

            <p class="p-2 text-center">
              <nuxt-link
                to="/mcq-companion"
                class="font-[oswald] tracking-wider font-medium"
              >
                MCQ Companion
              </nuxt-link>
            </p>
          </div>
        </div>
        <div
          class="bg-zinc-950 h-60 border border-zinc-700"
          v-for="box in 7"
        ></div>
      </div>
    </div>

    <div>
      <h1
        class="text-center font-[oswald] font-bold text-xl tracking-wider uppercase pb-8"
      >
        Physics
      </h1>

      <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        <div>
          <div>
            <nuxt-link to="/review-of-radiologic-physics">
              <img
                src="~/assets/review-of-radiologic-physics/cover.jpg"
                alt="review-of-radiologic-physics"
              />
            </nuxt-link>

            <p class="p-2 text-center">
              <nuxt-link
                to="/mcq-companion"
                class="font-[oswald] tracking-wider font-medium"
              >
                Review of Radiologic Physics
              </nuxt-link>
            </p>
          </div>
        </div>
        <div
          class="bg-zinc-950 h-60 border border-zinc-700"
          v-for="box in 7"
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
