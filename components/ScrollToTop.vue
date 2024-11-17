<template>
  <!--  <button-->
  <!--    v-show="visible"-->
  <!--    @click="scrollUp"-->
  <!--    class="btn btn-circle outline-none fixed bottom-8 right-8 z-50 opacity-80 hover:opacity-100"-->
  <!--  >-->
  <!--    <i class="ph-duotone ph-arrow-u-left-up text-[28px]"></i>-->
  <!--  </button>-->
  <UButton
    v-show="visible"
    @click="scrollUp"
    color="sky"
    icon="ph:arrow-fat-line-up-duotone"
    class="fixed bottom-14 right-8 z-50 ring ring-sky-500"
    variant="soft"
    :ui="{ rounded: 'rounded-full' }"
  />
</template>

<script setup>
import { useEventListener } from "@vueuse/core";

const visible = ref(false);

onMounted(() => {
  useEventListener(document, "scroll", (e) => {
    visible.value = window.scrollY > 150;
  });
});

const scrollUp = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};
</script>
