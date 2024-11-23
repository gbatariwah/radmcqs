<script setup lang="ts">
import { filename } from "pathe/utils";

const { params } = useRoute();

const { data: book } = await useAsyncData(`${params.bookSlug}`, () =>
  queryContent()
    .where({ _path: `/${params.bookSlug}/content` })
    .findOne()
);

const formatedEdition = computed(() =>
  book.value.edition === 1
    ? "1st Edition"
    : book.value.edition === 2
    ? "2nd Edition"
    : book.value.edition === 3
    ? "3rd Edition"
    : typeof book.value.edition === "string"
    ? book.value.edition
    : `${book.value.edition}th Edition`
);

const glob = import.meta.glob("~/assets/covers/*.jpg", { eager: true });
const covers = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const numbers = [
  "ph:number-zero-duotone",
  "ph:number-one-duotone",
  "ph:number-two-duotone",
  "ph:number-three-duotone",
  "ph:number-four-duotone",
  "ph:number-five-duotone",
  "ph:number-six-duotone",
  "ph:number-seven-duotone",
  "ph:number-eight-duotone",
  "ph:number-nine-duotone",
  "ph:number-ten-duotone",
];
</script>

<template>
  <div class="space-y-8">
    <div class="flex">
      <img
        :src="`${covers[book.slug]}`"
        :alt="book.slug"
        class="w-40 self-start rounded-lg"
      />

      <div class="px-4">
        <h1 class="font-[oswald] text-4xl pb-2">
          {{ book.title }}
          <span
            v-if="params.bookSlug !== 'engineering-interview-questions'"
            class="text-orange-400 font-light"
            >{{ formatedEdition }}</span
          >
        </h1>
        <p
          v-if="params.bookSlug !== 'engineering-interview-questions'"
          class="font-thin"
        >
          By {{ book.author }}
        </p>
      </div>
    </div>

    <!--    <div v-if="params.bookSlug === 'mcqs-for-medical-radiographers'">-->
    <!--      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">-->
    <!--        Parts-->
    <!--      </h2>-->

    <!--      <div class="space-y-6">-->
    <!--        <div v-for="part in book.sections" :key="part.slug">-->
    <!--          <nuxt-link :to="`/sbas/mcqs-for-medical-radiographers/${part.slug}`">-->
    <!--            <h3-->
    <!--              class="py-2 font-[oswald] font-bold tracking-wider text-xl underline"-->
    <!--            >-->
    <!--              {{ part.part }}-->
    <!--            </h3>-->
    <!--          </nuxt-link>-->

    <!--          <div class="space-y-2 pl-4">-->
    <!--            <p-->
    <!--              v-for="topic in part.topics"-->
    <!--              :key="topic"-->
    <!--              class="font-[poppins] font-thin text-sm dark:text-zinc-400"-->
    <!--            >-->
    <!--              {{ topic }}-->
    <!--            </p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <div
      v-if="params.bookSlug === 'grainger-and-allisons-diagnostic-radiology'"
    >
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Modules
      </h2>

      <div class="space-y-6">
        <div v-for="(module, i) in book.modules" :key="i">
          <h3 class="text-orange-400 py-2">Module {{ i + 1 }}</h3>
          <div class="space-y-4">
            <h5 class="font-[oswald] text-xl">
              <nuxt-link
                :to="`/sbas/${params.bookSlug}/${module.slug}`"
                class="hover:underline"
              >
                {{ module.name }}
              </nuxt-link>
            </h5>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else-if="
        params.bookSlug ===
        'frcr-part-2a-single-best-answer-questions-for-the-new-format'
      "
    >
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Contents
      </h2>

      <div class="space-y-10">
        <div v-for="(section, i) in book.sections" :key="i">
          <h3 class="font-bold py-2 font-[oswald] tracking-wide text-sky-400">
            <span class="uppercase">Section {{ i + 1 }}</span> :
            {{ i === 0 ? "Practice SBAs" : "Mock Papers" }}
          </h3>

          <div v-for="(module, i) in section" :key="i">
            <h3 class="text-orange-400 py-2">Module {{ i + 1 }}</h3>
            <div class="space-y-4">
              <h5 class="font-[oswald] text-xl">
                <nuxt-link
                  :to="`/sbas/${params.bookSlug}/${module.slug}`"
                  class="hover:underline"
                >
                  {{ module.name.split("-")[0] }}
                </nuxt-link>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-4">
        Contents
      </h2>

      <div class="space-y-6">
        <div v-for="(section, i) in book.sections" :key="section.slug">
          <div class="space-y-4">
            <div class="font-[oswald] text-xl flex items-center gap-6">
              <div>
                <div v-if="i < 9">
                  <UIcon :name="numbers[0]" class="invisible" />
                  <UIcon :name="numbers[i + 1]" />
                </div>

                <div v-else-if="i >= 9">
                  <UIcon :name="numbers[Number(String(i + 1).split('')[0])]" />
                  <UIcon :name="numbers[Number(String(i + 1).split('')[1])]" />
                </div>
              </div>
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
