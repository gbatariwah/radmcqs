<script setup lang="ts">
import { filename } from "pathe/utils";

const { params } = useRoute();

const { data: book } = await useAsyncData(`${params.bookSlug}`, () =>
  queryContent()
    .where({ _path: `/${params.bookSlug}/content` })
    .findOne()
);

const glob = import.meta.glob("~/assets/covers/*.jpg", { eager: true });
const covers = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const editionSuffix = computed(() =>
  book.value.editon === 1
    ? "st"
    : book.value.editon === 2
    ? "nd"
    : book.value.editon === 3
    ? "rd"
    : "th"
);
</script>

<template>
  <div class="space-y-8">
    <div class="flex">
      <img :src="covers[params.bookSlug]" :alt="params.bookSlug" class="w-40" />

      <div class="p-4">
        <h1 class="font-[oswald] text-4xl pb-2">
          {{ book.title }}
          <span class="text-orange-400 font-light"
            >{{ book.edition }}{{ editionSuffix }} Edition</span
          >
        </h1>
        <p>By {{ book.author }}</p>
      </div>
    </div>

    <div v-if="params.bookSlug === 'mcq-companion'">
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Modules
      </h2>

      <div class="space-y-6">
        <div v-for="(module, i) in book.modules" :key="i">
          <h3 class="text-orange-400 py-2">Module {{ i + 1 }}</h3>
          <div class="space-y-4">
            <div v-for="(section, id) in module" :key="id">
              <h5 class="font-[oswald] text-xl">
                <nuxt-link :to="`/mcqs/mcq-companion/${section.slug}`">
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
