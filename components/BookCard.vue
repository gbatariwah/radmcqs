<script setup lang="ts">
import { filename } from "pathe/utils";

const props = defineProps({
  book: Object,
});

const editionSuffix = computed(() =>
  props.book.edition === 1
    ? "st"
    : props.book.edition === 2
    ? "nd"
    : props.book.edition === 3
    ? "rd"
    : typeof props.book.edition === "string"
    ? ""
    : "th"
);

const glob = import.meta.glob("~/assets/covers/*.jpg", { eager: true });
const covers = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);
</script>

<template>
  <div class="flex flex-col items-center">
    <nuxt-link :to="`/${book.type}/${book.slug}`">
      <img :src="covers[book.slug]" :alt="book.slug" />
    </nuxt-link>

    <p class="py-2 flex flex-col gap-1">
      <nuxt-link
        :to="`/${book.type}/${book.slug}`"
        class="font-[oswald] tracking-wider font-medium text-center"
      >
        {{ book.title }}
      </nuxt-link>
      <UBadge
        class="self-center"
        v-if="book.slug !== 'engineering-interview-questions'"
        :color="book.color"
        size="xs"
        >{{ book.edition }}<sup>{{ editionSuffix }}</sup>
        <span class="ml-1">Edition</span>
      </UBadge>
    </p>
  </div>
</template>
