<script setup lang="ts"></script>

<template>
  <div class="space-y-12">
    <div>
      <h1
        class="text-center font-[oswald] font-bold text-xl tracking-wider uppercase pb-8"
      >
        Anatomy
      </h1>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div class="flex flex-col items-center">
          <nuxt-link to="/mcq-companion" class="w-full sm:w-fll">
            <img src="~/assets/mcq-companion/cover.jpg" alt="mcq-companion" />
          </nuxt-link>

          <p class="p-2 text-center">
            <nuxt-link
              to="/mcq-companion"
              class="font-[oswald] tracking-wider font-medium"
            >
              MCQ Companion
              <UBadge color="lime" size="xs"
                >1<sup>st</sup> <span class="ml-1">Edition</span></UBadge
              >
            </nuxt-link>
          </p>
        </div>
        <div
          class="dark:bg-zinc-950 border dark:border-zinc-900 rounded items-center justify-center h-full"
        >
          <figure class="flex h-full items-center justify-center">
            <img class="w-16 opacity-50" src="/img/no-book.svg" alt="" />
          </figure>
        </div>
        <div
          class="dark:bg-zinc-950 border dark:border-zinc-900 rounded items-center justify-center h-full hidden md:block"
          v-for="box in 2"
        >
          <figure class="flex h-full items-center justify-center">
            <img class="w-16 opacity-50" src="/img/no-book.svg" alt="" />
          </figure>
        </div>
      </div>
    </div>

    <div>
      <h1
        class="text-center font-[oswald] font-bold text-xl tracking-wider uppercase pb-8"
      >
        Physics
      </h1>

      <div class="grid md:grid-cols-4 grid-cols-2 gap-6">
        <div>
          <div class="flex flex-col items-center">
            <nuxt-link to="/review-of-radiologic-physics">
              <img
                src="~/assets/review-of-radiologic-physics/cover.jpg"
                alt="review-of-radiologic-physics"
              />
            </nuxt-link>

            <p class="py-2 text-center">
              <nuxt-link
                to="/review-of-radiologic-physics"
                class="font-[oswald] tracking-wider font-medium"
              >
                Review of Radiologic Physics
                <UBadge color="rose" size="xs"
                  >4<sup>th</sup> <span class="ml-1">Edition</span></UBadge
                >
              </nuxt-link>
            </p>
          </div>
        </div>
        <div>
          <div class="flex flex-col items-center">
            <nuxt-link to="/review-of-radiologic-physics-2">
              <img
                src="~/assets/covers/review-of-radiologic-physics-2.jpg"
                alt="review-of-radiologic-physics"
              />
            </nuxt-link>

            <p class="py-2 text-center">
              <nuxt-link
                to="/review-of-radiologic-physics-2"
                class="font-[oswald] tracking-wider font-medium"
              >
                Review of Radiologic Physics
                <UBadge color="cyan" size="xs"
                  >3<sup>rd</sup> <span class="ml-1">Edition</span></UBadge
                >
              </nuxt-link>
            </p>
          </div>
        </div>
        <div
          class="dark:bg-zinc-950 dark:opacity-50 border dark:border-zinc-900 rounded items-center justify-center h-full hidden md:block"
          v-for="box in 2"
        >
          <figure class="flex h-full items-center justify-center">
            <img class="w-16 opacity-50" src="/img/no-book.svg" alt="" />
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
