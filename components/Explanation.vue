<script setup lang="ts">
const props = defineProps({
  text: String,
  reference: String,
  response: String,
  answer: String,
  revision: Boolean,
  bookSlug: String,
});
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: -100 }"
    :enter="{ opacity: 1, y: 0 }"
  >
    <div>
      <div v-if="bookSlug === 'marrow-qbank'">
        <figure class="py-4">
          <img :src="text" alt="" class="w-full" />
        </figure>

        <p v-if="reference">
          Reference: <span class="font-thin">{{ reference }}</span>
        </p>
      </div>
      <div v-else>
        <div v-if="revision || response === answer">
          <UBadge
            color="green"
            class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
          >
            <p class="p-4 self-start text-lg">
              <UIcon name="ph:lightbulb-duotone" />
            </p>
            <div class="space-y-2">
              <p v-if="text">{{ text }}.</p>
              <p class="font-thin" v-if="reference">
                Reference: {{ reference }}
              </p>
            </div>
          </UBadge>
        </div>
        <div v-else>
          <UBadge
            color="pink"
            class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
          >
            <p class="p-4 self-start text-lg">
              <UIcon name="ph:lightbulb-duotone" />
            </p>
            <div class="space-y-2">
              <p v-if="text">{{ text }}.</p>
              <p class="font-thin" v-if="reference">
                Reference: {{ reference }}
              </p>
            </div>
          </UBadge>
        </div>
      </div>
    </div>
  </div>
</template>
