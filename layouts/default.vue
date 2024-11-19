<template>
  <div class="container max-w-2xl mx-auto px-4 sm:px-0">
    <header class="border-b dark:border-zinc-800 mb-4">
      <Navbar />
    </header>
    <main class="min-h-[500px]">
      <slot />
      <ScrollToTop />
    </main>
    <footer class="text-center border-t dark:border-zinc-800 p-6">
      <div>
        <Logo class="flex justify-center" />
      </div>

      <p class="text-xs font-light font-[poppins]">
        Developed by Gerald Batariwah
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// const user = useSupabaseUser();

// watchEffect(() => {
//   if (!user.value) {
//     navigateTo("/sign-in");
//   }
// });
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kablammo&family=Oswald:wght@400;500;600&family=Poppins:ital,wght@0,200;0,400;0,600;1,200;1,400;1,600&display=swap");
</style>
