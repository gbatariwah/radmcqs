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
      :optionId="Number(optionId)"
      :checkAnswers="checkAnswers"
    />
    <div v-if="isMCQsInAnatomyOrQbase1 && (showAnswers || checkAnswers)">
      <div v-if="question.explanation">
        <UBadge
          color="emerald"
          class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
        >
          <p class="p-4 self-start">
            <UIcon name="i-ic-baseline-lightbulb" />
          </p>
          <div class="space-y-2">
            <p>{{ question.explanation }}.</p>
            <p class="font-thin" v-if="question.reference">
              Reference: {{ question.reference }}
            </p>
          </div>
        </UBadge>
      </div>
    </div>
    <div class="py-2 text-right" v-if="questionsAnswered && !showAnswers">
      <UButton
        @click="checkAnswers = !checkAnswers"
        :label="checkAnswers ? 'Hide Answers' : 'Show Answers'"
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

const isMCQsInAnatomyOrQbase1 = computed(
  () =>
    path.split("/")[2] === "mcqs-in-anatomy" ||
    path.split("/")[2] === "qbase-radiology-vol-1"
);

const optionLabels = ["a", "b", "c", "d", "e"];

const questionsAnswered = computed(() =>
  props.question.options.every((option) => option.response !== "")
);
</script>
