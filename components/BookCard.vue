<script setup lang="ts">
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
</script>

<template>
  <div class="flex flex-col items-center">
    <nuxt-link :to="`/${book.slug}`">
      <img :src="book.cover" :alt="book.slug" />
    </nuxt-link>

    <p class="py-2 text-center">
      <nuxt-link
        :to="`/${book.slug}`"
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
