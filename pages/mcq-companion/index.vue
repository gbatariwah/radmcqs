<script setup lang="ts">
const { data: modules } = await useAsyncData("mcq-companion", () =>
  queryContent().where({ _path: `/mcq-companion/modules` }).findOne()
);
</script>

<template>
  <div class="space-y-8">
    <div class="flex">
      <img
        src="~/assets/mcq-companion/cover.jpg"
        alt="mcq-companion"
        class="w-40"
      />

      <div class="p-4">
        <h1 class="font-[oswald] text-4xl pb-2">
          MCQ Companion
          <span class="text-orange-400 font-light">1st Edition</span>
        </h1>
        <p>
          By Arockia Doss, Matthew J. Bull, Alan Sprigg and Paul D. Griffiths
        </p>
      </div>
    </div>

    <div>
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Modules
      </h2>

      <div class="space-y-6">
        <div v-for="(module, i) in modules.body" :key="i">
          <h3 class="text-orange-400 py-2">Module {{ i + 1 }}</h3>
          <div class="space-y-4">
            <div v-for="(section, id) in module" :key="id">
              <h5 class="font-[oswald] text-xl">
                <nuxt-link :to="`/mcq-companion/${section.slug}`">
                  {{ section.name }}
                </nuxt-link>
              </h5>
              <p class="font-thin">by {{ section.authors }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
