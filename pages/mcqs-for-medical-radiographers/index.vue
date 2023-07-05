<script setup lang="ts">
const { data: parts } = await useAsyncData(
  "mcqs-for-medical-radiographers",
  () =>
    queryContent()
      .where({ _path: `/mcqs-for-medical-radiographers/parts` })
      .findOne()
);

console.log(parts);
</script>

<template>
  <div class="space-y-8">
    <div class="flex">
      <img
        src="~/assets/covers/800-mcqs.png"
        alt="mcqs-for-medical-radiographers"
        class="w-40"
      />

      <div class="p-4">
        <h1 class="font-[oswald] text-4xl pb-2">
          800 MCQ For Medical Radiographers
          <span class="text-orange-400 font-light">1st Edition</span>
        </h1>
        <p>By Husam Hassan Mansour</p>
      </div>
    </div>

    <div>
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Parts
      </h2>

      <div class="space-y-6">
        <div v-for="part in parts.body" :key="part.slug">
          <nuxt-link :to="`/mcqs-for-medical-radiographers/${part.slug}`">
            <h3
              class="py-2 font-[oswald] text-orange-400 font-bold tracking-wider text-xl"
            >
              {{ part.part }}
            </h3>
          </nuxt-link>

          <div class="space-y-2 pl-4">
            <p
              v-for="topic in part.topics"
              :key="topic"
              class="font-[poppins] font-thin text-sm dark:text-zinc-400"
            >
              {{ topic }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
