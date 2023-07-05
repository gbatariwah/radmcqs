<script setup lang="ts">
const { data: sections } = await useAsyncData(
  "review-of-radiologic-physics",
  () =>
    queryContent()
      .where({ _path: `/review-of-radiologic-physics/sections` })
      .findOne()
);
</script>

<template>
  <div class="space-y-8">
    <div class="flex">
      <img
        src="~/assets/covers/review-of-radiologic-physics.jpg"
        alt="review-of-radiologic-physics"
        class="w-40"
      />

      <div class="p-4">
        <h1 class="font-[oswald] text-4xl pb-2">
          Review of Radiologic Physics
          <span class="text-orange-400 font-light">4th Edition</span>
        </h1>
        <p>By Walter Huda</p>
      </div>
    </div>

    <div>
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Sections
      </h2>

      <div class="space-y-6">
        <div v-for="section in sections.body" :key="section.slug">
          <div class="space-y-4">
            <div class="font-[oswald] text-xl">
              <nuxt-link :to="`/review-of-radiologic-physics/${section.slug}`">
                {{ section.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
