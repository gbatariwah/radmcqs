<script setup lang="ts"></script>

<template>
  <div class="container max-w-2xl mx-auto">
    <nav class="flex py-6 px-4 sm:px-0 justify-end items-center">
      <ToggleTheme />
    </nav>
    <div class="pt-20"><slot /></div>
  </div>
</template>

<style scoped></style>
