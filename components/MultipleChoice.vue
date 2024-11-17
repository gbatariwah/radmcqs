<template>
  <div v-motion-slide-visible-once-bottom>
    <h2 class="font-[oswald] text-lg tracking-wide font-bold">
      <span class="text-orange-400">{{ questionId + 1 }}</span
      >. {{ question.stem }}:
    </h2>
    <Choice
      v-for="(option, optionId) in question.options"
      :key="optionId"
      :option
      :optionId="Number(optionId)"
      :checkAnswers
      :rev
    />
    <div v-if="isMCQsInAnatomyOrQbase1 && checkAnswers">
      <div v-if="question.explanation">
        <UBadge
          color="emerald"
          class="text-sm p-2 font-light rounded-lg mt-1 flex pr-6"
        >
          <p class="p-4 self-start">
            <UIcon name="ph:lightbulb-duotone" />
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
    <div class="py-2 text-right">
      <UButton
        v-if="questionsAnswered"
        @click="checkAnswers = !checkAnswers"
        :label="checkAnswers ? 'Hide Answers' : 'Show Answers'"
        v-motion-pop
        size="xs"
        color="sky"
        variant="soft"
        :icon="checkAnswers ? 'ph:eye-closed-duotone' : 'ph:eye-duotone'"
      />
    </div>
  </div>
</template>

<script setup>
const { path } = useRoute();
const checkAnswers = ref(false);
const revision = computed(() => props.revisionMode);
const rev = ref("");

const props = defineProps({
  question: Object,
  questionId: Number,
  revisionMode: Boolean,
});

watch(revision, (newVal) => {
  checkAnswers.value = newVal;
  if (newVal) {
    rev.value = "revision";
  } else rev.value = "";
});

const isMCQsInAnatomyOrQbase1 = computed(
  () =>
    path.split("/")[2] === "mcqs-in-anatomy" ||
    path.split("/")[2] === "qbase-radiology-vol-1"
);

const questionsAnswered = computed(() =>
  props.question.options.every((option) => option.response !== "")
);
</script>
