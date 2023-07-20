<script setup lang="ts">
import { filename } from "pathe/utils";
const { params } = useRoute();

const { data: book } = await useAsyncData(`${params.bookSlug}`, () =>
  queryContent()
    .where({ _path: `/${params.bookSlug}/content` })
    .findOne()
);

const editionSuffix = computed(() =>
  book.value.edition === 1
    ? "st"
    : book.value.edition === 2
    ? "nd"
    : book.value.edition === 3
    ? "rd"
    : "th"
);

const glob = import.meta.glob("~/assets/covers/*.jpg", { eager: true });
const covers = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);
</script>

<template>
  <div class="space-y-8">
    <div class="flex">
      <img
        :src="`${covers[book.slug]}`"
        alt="review-of-radiologic-physics"
        class="w-40"
      />

      <div class="p-4">
        <h1 class="font-[oswald] text-4xl pb-2">
          {{ book.title }}
          <span
            v-if="params.bookSlug !== 'engineering-interview-questions'"
            class="text-orange-400 font-light"
            >{{ book.edition }}{{ editionSuffix }} Edition</span
          >
        </h1>
        <p v-if="params.bookSlug !== 'engineering-interview-questions'">
          By {{ book.author }}
        </p>
      </div>
    </div>

    <div v-if="params.bookSlug === 'mcqs-for-medical-radiographers'">
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Parts
      </h2>

      <div class="space-y-6">
        <div v-for="part in book.sections" :key="part.slug">
          <nuxt-link :to="`/sbas/mcqs-for-medical-radiographers/${part.slug}`">
            <h3
              class="py-2 font-[oswald] font-bold tracking-wider text-xl underline"
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

    <div v-else>
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Sections
      </h2>

      <div class="space-y-6">
        <div v-for="section in book.sections" :key="section.slug">
          <div class="space-y-4">
            <div class="font-[oswald] text-xl">
              <nuxt-link
                :to="`/sbas/${params.bookSlug}/${section.slug}`"
                class="hover:underline"
              >
                {{ section.name }}
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
