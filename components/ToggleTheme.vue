<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const mounted = ref(false);

const isDark = useDark();
const toggleDark = useToggle(isDark);

onMounted(() => (mounted.value = true));
</script>

<template>
  <div class="flex gap-4 items-center">
    <div v-show="mounted">
      <UButton
        icon="ph:moon-duotone"
        v-if="mounted && isDark"
        @click="() => toggleDark()"
        variant="ghost"
        square
        class="animate__animated animate__rotateIn cursor-pointer rounded-full"
      />
      <UButton
        v-else
        icon="ph:sun-dim-duotone"
        @click="() => toggleDark()"
        variant="ghost"
        square
        class="animate__animated animate__rotateIn cursor-pointer rounded-full"
      />
    </div>
  </div>
</template>

<style scoped></style>
