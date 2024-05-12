<template>
  <nav class="flex justify-between items-center">
    <nuxt-link to="/" class="font-bold flex gap-1 items-center" v-motion-roll-visible-once-left>
      <span class="font-[Kablammo] text-2xl tracking-wide">RAD MCQS </span
      ><img src="/img/light-bulb.png" alt="logo-img" />
    </nuxt-link>

    <div class="flex gap-4 items-center">
      <div class="text-2xl" v-show="mounted">
        <UIcon
          name="i-ic-sharp-dark-mode"
          v-if="mounted && isDark"
          @click="() => toggleDark()"
          class="animate__animated animate__rotateIn cursor-pointer"
        />
        <UIcon
          v-else
          name="i-ic-baseline-wb-sunny"
          @click="() => toggleDark()"
          class="animate__animated animate__rotateIn cursor-pointer"
        />
      </div>
      <!--          <UDropdown-->
      <!--            :items="items"-->
      <!--            :popper="{ placement: 'bottom-start' }"-->
      <!--            :ui="{ width: 'w-28', background: 'dark:bg-zinc-900' }"-->
      <!--          >-->
      <!--            <UButton color="white" trailing-icon="i-ic-sharp-more-vert" />-->
      <!--          </UDropdown>-->
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const mounted = ref(false);

const isDark = useDark();
const toggleDark = useToggle(isDark);

onMounted(() => (mounted.value = true));
</script>
