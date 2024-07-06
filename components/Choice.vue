<script setup lang="ts">
const props = defineProps({
  option: Object,
  optionId: Number,
  checkAnswers: Boolean,
  rev: String,
});

const optionLabels = ["a", "b", "c", "d", "e"];
</script>

<template>
  <div class="px-2">
    <div class="border-b dark:border-zinc-900">
      <div v-if="checkAnswers">
        <div class="flex gap-4 py-2 items-center">
          <p
            class="flex gap-2 items-center text-lg font-medium font-[oswald]"
            :class="{ hidden: rev === 'revision' }"
          >
            {{ option.response[0] }}
            <UIcon
              class="text-lg"
              :class="
                option.response === option.answer
                  ? 'text-green-600'
                  : 'text-red-600'
              "
              :name="
                option.response === option.answer
                  ? 'i-ic-baseline-check-circle'
                  : 'i-ic-baseline-cancel'
              "
            />
          </p>
          <div>
            <p>
              <span class="text-orange-400">{{ optionLabels[optionId] }}.</span>
              {{ option.text }}.
              <span>
                <UBadge color="cyan" size="sm" :label="option.answer" />
              </span>
            </p>
            <div v-if="option.explanation" v-motion-pop>
              <UBadge
                color="green"
                v-if="rev === 'revision' || option.response === option.answer"
                class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
              >
                <p class="p-4">
                  <UIcon name="i-ic-baseline-lightbulb" />
                </p>
                <p>{{ option.explanation }}.</p>
              </UBadge>
              <UBadge
                v-else
                color="pink"
                class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
              >
                <p class="p-4">
                  <UIcon name="i-ic-baseline-lightbulb" />
                </p>
                <p>{{ option.explanation }}.</p>
              </UBadge>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex gap-3 py-2 items-center">
        <div
          class="flex divide-x dark:divide-zinc-800 gap-2 items-center h-full"
        >
          <label
            class="flex items-center gap-2 text-lg font-medium font-[oswald] mr-1"
          >
            <URadio
              value="True"
              class="cursor-pointer"
              v-model="option.response"
            />
            T
          </label>
          <label
            class="flex items-center gap-2 text-lg font-medium font-[oswald]"
          >
            <URadio
              value="False"
              class="cursor-pointer ml-3"
              :key="'F' + optionId"
              v-model="option.response"
            />
            F
          </label>
        </div>
        <p class="font-[poppins] font-light">
          <span class="text-orange-400">{{ optionLabels[optionId] }}.</span>
          {{ option.text }}.
        </p>
      </div>
    </div>
  </div>
</template>
