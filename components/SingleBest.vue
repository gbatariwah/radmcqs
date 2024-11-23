<script setup lang="ts">
const props = defineProps({
  question: Object,
  questionId: Number,
  showAnswers: Boolean,
  revisionMode: Boolean,
});

const { params } = useRoute();
const checkAnswer = ref(false);
const revision = computed(() => props.revisionMode);

const isQuestionMark = computed(
  () =>
    params.bookSlug === "grainger-and-allisons-diagnostic-radiology" ||
    params.bookSlug === "sbas-for-the-frcr-part-2a" ||
    params.bookSlug === "final-frcr-2a" ||
    params.bookSlug === "succeeding-in-the-new-frcr-part-2a-exam" ||
    params.bookSlug ===
      "frcr-part-2a-single-best-answer-questions-for-the-new-format"
);

const optionLabels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

watch(revision, (newVal) => {
  checkAnswer.value = newVal;
});
</script>

<template>
  <div
    class="border-b dark:border-b-zinc-900"
    v-motion-slide-visible-once-bottom
  >
    <h2
      class="font-[oswald] text-lg tracking-wide"
      :class="{
        'font-bold': !isQuestionMark,
      }"
    >
      <span class="text-orange-400">{{ questionId + 1 }}</span
      >. {{ question.stem }}{{ isQuestionMark ? "" : ":" }}
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
            v-motion-pop
          >
            <UBadge color="green">{{ option }}</UBadge>
            <UIcon
              v-if="revision || question.response === question.answer"
              class="' text-green-600 text-lg"
              name="ph:checks-duotone"
            />
          </span>
          <span v-else>{{ option }}</span>

          <span v-if="question.response === option">
            <UIcon
              v-if="question.response !== question.answer"
              class="text-lg ml-2 -m-1 text-red-600"
              name="ph:x-duotone"
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
            :disabled="question.response !== ''"
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

    <template
      v-if="
        ((checkAnswer || showAnswers) && question.explanation) ||
        ((checkAnswer || showAnswers) && question.reference)
      "
    >
      <div class="overflow-hidden">
        <Explanation
          :text="question.explanation"
          :reference="question.reference"
          :answer="question.answer"
          :response="question.response"
          :revision
        />
      </div>
    </template>

    <div class="py-2 text-right" v-if="question.response && !showAnswers">
      <UButton
        @click="checkAnswer = !checkAnswer"
        :label="checkAnswer ? 'Hide Answer' : 'Show Answer'"
        size="xs"
        color="sky"
        v-motion-pop
        variant="soft"
        :icon="checkAnswer ? 'ph:eye-closed-duotone' : 'ph:eye-duotone'"
      />
    </div>
  </div>
</template>
