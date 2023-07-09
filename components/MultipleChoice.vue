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
    <div v-if="isMCQsInAnatomy && (showAnswers || checkAnswers)">
      <div v-if="question.explanation">
        <UBadge
          color="lime"
          class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
        >
          <p class="p-4">
            <UIcon name="i-ic-baseline-lightbulb" />
          </p>
          <p>{{ question.explanation }}.</p>
        </UBadge>
      </div>
    </div>
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
const { path } = useRoute();

const props = defineProps({
  question: Object,
  showAnswers: Boolean,
  checkAnswers: Boolean,
  questionId: Number,
});

const isMCQsInAnatomy = computed(
  () => path.split("/")[2] === "mcqs-in-anatomy"
);

const questionsAnswered = computed(() =>
  props.question.options.every((option) => option.response !== "")
);
</script>
