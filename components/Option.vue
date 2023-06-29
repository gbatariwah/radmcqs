<script setup lang="ts">
const props = defineProps({
  option: Object,
  showAnswers: Boolean,
  optionId: Number,
  checkAnswers: Boolean,
});

const optionLabels = ["a", "b", "c", "d", "e"];
</script>

<template>
  <div class="px-2">
    <div
      class="border-b dark:border-zinc-900"
      :class="{ 'border-b-0': optionId === 4 }"
    >
      <div v-if="checkAnswers">
        <div class="flex gap-4 py-2 items-center">
          <p class="flex gap-2 items-center text-lg font-medium font-[oswald]">
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
            <div v-if="option.explanation">
              <UBadge
                color="green"
                v-if="option.response === option.answer"
                class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
              >
                <p class="p-4">
                  <UIcon name="i-ic-baseline-lightbulb" />
                </p>
                <p>{{ option.explanation }}.</p>
              </UBadge>
              <UBadge
                v-else
                color="red"
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
      <div v-else>
        <div v-if="showAnswers" class="flex gap-4 py-2 items-center">
          <p class="flex gap-2 items-center text-lg font-medium font-[oswald]">
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
            <div v-if="option.explanation">
              <UBadge
                color="green"
                v-if="option.response === option.answer"
                class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
              >
                <p class="p-4">
                  <UIcon name="i-ic-baseline-lightbulb" />
                </p>
                <p>{{ option.explanation }}.</p>
              </UBadge>
              <UBadge
                v-else
                color="red"
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
        <div v-else class="flex gap-3 py-2 items-center">
          <div class="flex flex-col gap-2">
            <URadio
              label="T"
              value="True"
              class="cursor-pointer"
              v-model="option.response"
              :ui="{
                label: 'text-lg font-medium font-[oswald]',
                wrapper: 'items-center flex',
              }"
            />
            <URadio
              label="F"
              value="False"
              class="cursor-pointer"
              v-model="option.response"
              :ui="{
                label: 'text-lg font-medium font-[oswald]',
                wrapper: 'items-center flex',
              }"
            />
          </div>
          <p class="font-[poppins] font-light">
            <span class="text-orange-400">{{ optionLabels[optionId] }}.</span>
            {{ option.text }}.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
