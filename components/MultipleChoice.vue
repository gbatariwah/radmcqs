<template>
  <div>
    <h2 class="font-[oswald] text-lg tracking-wide font-bold">
      <span class="text-orange-400">{{ questionId + 1 }}</span
      >. {{ question.stem }}:
    </h2>
    <Choice
      v-for="(option, optionId) in question.options"
      :key="optionId"
      :option="option"
      :showAnswers="showAnswers"
      :optionId="optionId"
      :checkAnswers="checkAnswers"
    />
    <div class="py-2 text-right" v-if="questionsAnswered && !showAnswers">
      <UButton
        @click="checkAnswers = !checkAnswers"
        :label="checkAnswers ? 'Hide Answers' : 'Check Answers'"
        class="animate__animated animate__bounceIn animate__faster"
        size="xs"
        color="sky"
        variant="outline"
        :icon="
          checkAnswers
            ? 'i-ic-baseline-visibility-off'
            : 'i-ic-round-visibility'
        "
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  question: Object,
  showAnswers: Boolean,
  checkAnswers: Boolean,
  questionId: Number,
});

const questionsAnswered = computed(() =>
  props.question.options.every((option) => option.response !== "")
);
</script>
