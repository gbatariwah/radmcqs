<template>
  <div class="container max-w-2xl mx-auto">
    <header class="p-4 border-b dark:border-zinc-800">
      <Navbar />
    </header>
    <main class="p-4 min-h-[500px]">
      <slot />
      <ScrollToTop />
    </main>
    <footer class="text-center p-8 border-t dark:border-zinc-800">
      <p>&copy; RAD MCQS. {{ new Date().getFullYear() }}</p>

      <p class="text-xs font-light font-[poppins]">
        Developed by Gerald Batariwah
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
