<script setup lang="ts">
const props = defineProps({
  question: Object,
  questionId: Number,
  showAnswers: Boolean,
  checkAnswer: Boolean,
});

const optionLabels = ["A", "B", "C", "D", "E"];
</script>

<template>
  <div class="border-b dark:border-b-zinc-900">
    <h2 class="font-[oswald] text-lg tracking-wide font-bold">
      <span class="text-orange-400">{{ questionId + 1 }}</span
      >. {{ question.stem }}:
    </h2>

    <div v-for="(option, optionId) in question.options">
      <div
        class="flex gap-3 py-2 items-center"
        v-if="checkAnswer || showAnswers"
      >
        <div class="flex flex-col gap-2">
          <URadio
            :value="option"
            class="cursor-pointer"
            disabled
            v-model="question.response"
            :ui="{
              label: 'text-lg font-medium font-[oswald]',
              wrapper: 'items-center flex',
            }"
          />
        </div>
        <div class="font-[poppins] font-light">
          <span class="text-orange-400">{{ optionLabels[optionId] }}. </span>
          <span
            class="inline-flex gap-2 items-center"
            v-if="option === question.answer"
          >
            <UBadge color="green">{{ option }}</UBadge>
            <UIcon
              v-if="question.response === question.answer"
              class="' text-green-600 text-lg"
              name="i-ic-baseline-check-circle"
            />
          </span>
          <span v-else>{{ option }}</span>

          <span v-if="question.response === option">
            <UIcon
              v-if="question.response !== question.answer"
              class="text-lg ml-2 -m-1 text-red-600"
              name="i-ic-baseline-cancel"
            />
          </span>
        </div>
      </div>
      <div class="flex gap-3 py-2 items-center" v-else>
        <div class="flex flex-col gap-2">
          <URadio
            :value="option"
            class="cursor-pointer"
            v-model="question.response"
            :ui="{
              label: 'text-lg font-medium font-[oswald]',
              wrapper: 'items-center flex',
            }"
          />
        </div>
        <div class="font-[poppins] font-light">
          <span class="text-orange-400">{{ optionLabels[optionId] }}. </span>

          <span>{{ option }}</span>
        </div>
      </div>
    </div>
    <div v-if="(checkAnswer || showAnswers) && question.explanation">
      <UBadge
        color="green"
        v-if="question.response === question.answer"
        class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
      >
        <p class="p-4">
          <UIcon name="i-ic-baseline-lightbulb" />
        </p>
        <p>{{ question.explanation }}.</p>
      </UBadge>
      <UBadge
        color="red"
        v-else
        class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
      >
        <p class="p-4">
          <UIcon name="i-ic-baseline-lightbulb" />
        </p>
        <p>{{ question.explanation }}.</p>
      </UBadge>
    </div>

    <div class="py-2 text-right" v-if="question.response && !showAnswers">
      <UButton
        @click="checkAnswer = !checkAnswer"
        :label="checkAnswer ? 'Hide Answer' : 'Check Answer'"
        size="xs"
        color="sky"
        class="animate__animated animate__bounceIn animate__faster"
        variant="outline"
        :icon="
          checkAnswer ? 'i-ic-baseline-visibility-off' : 'i-ic-round-visibility'
        "
      />
    </div>
  </div>
</template>
