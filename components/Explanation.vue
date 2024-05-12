<script setup lang="ts">
const props = defineProps({
  text: String,
  reference: String,
  response: String,
  answer: String,
});
</script>

<template>
  <div 
  v-motion
    :initial="{ opacity: 0, y: -100 }"
    :enter="{ opacity: 1, y: 0}"
   
  >
    <UBadge
      color="green"
      v-if="response === answer"
      class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
    >
      <p class="p-4 self-start text-lg">
        <UIcon name="i-ic-baseline-lightbulb" />
      </p>
      <div class="space-y-2">
        <p v-if="text">{{ text }}.</p>
        <p class="font-thin" v-if="reference">Reference: {{ reference }}</p>
      </div>
    </UBadge>
    <UBadge
      color="pink"
      v-else
      class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
    >
      <p class="p-4 self-start text-lg">
        <UIcon name="i-ic-baseline-lightbulb" />
      </p>
      <div class="space-y-2">
        <p v-if="text">{{ text }}.</p>
        <p class="font-thin" v-if="reference">Reference: {{ reference }}</p>
      </div>
    </UBadge>
  </div>
</template>
