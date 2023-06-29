<template>
  <div>
    <header class="p-4 border-b dark:border-zinc-800">
      <nav class="flex justify-between items-center">
        <nuxt-link to="/" class="font-bold flex gap-1 items-center">
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
    </header>
    <main class="p-4 min-h-[500px] container max-w-2xl mx-auto">
      <slot />
    </main>
    <footer class="text-center p-24">
      <p>&copy; RAD MCQS. {{ new Date().getFullYear() }}</p>

      <p class="text-xs font-light font-[poppins]">
        Developed by Gerald Batariwah
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const mounted = ref(false);

const isDark = useDark({
  // onChanged(dark) {
  //   console.log(dark);
  //   a.value = dark;
  // },
});
const toggleDark = useToggle(isDark);

onMounted(() => (mounted.value = true));

const items = [
  [
    {
      label: "Settings",
      icon: "i-ic-baseline-settings",
      shortcuts: ["E"],
      click: () => {
        console.log("Edit");
      },
    },
  ],
];
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kablammo&family=Oswald:wght@400;500;600&family=Poppins:ital,wght@0,200;0,400;0,600;1,200;1,400;1,600&display=swap");
</style>
