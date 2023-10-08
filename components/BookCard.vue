<script setup lang="ts">
import { filename } from "pathe/utils";

const props = defineProps({
  book: Object,
});

const formatedEdition = computed(() =>
  props.book.edition === 1
    ? "1st Edition"
    : props.book.edition === 2
    ? "2nd Edition"
    : props.book.edition === 3
    ? "3rd Edition"
    : typeof props.book.edition === "string"
    ? props.book.edition
    : `${props.book.edition}th Edition`
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
        >{{ formatedEdition }}
      </UBadge>
    </p>
  </div>
</template>
