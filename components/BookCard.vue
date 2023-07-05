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

    <p class="py-2 text-center">
      <nuxt-link
        :to="`/${book.type}/${book.slug}`"
        class="font-[oswald] tracking-wider font-medium"
      >
        {{ book.title }}
        <UBadge :color="book.color" size="xs"
          >{{ book.edition }}<sup>{{ editionSuffix }}</sup>
          <span class="ml-1">Edition</span></UBadge
        >
      </nuxt-link>
    </p>
  </div>
</template>
