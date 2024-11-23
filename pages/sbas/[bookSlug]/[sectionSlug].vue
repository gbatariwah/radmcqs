<script setup lang="ts">
import { filename } from "pathe/utils";

const { path, params } = useRoute();
const toast = useToast();

const questionsShuffled = ref(false);

const {
  data: section,
  refresh,
  pending,
} = await useAsyncData(
  `${params.bookSlug}-${params.sectionSlug}`,
  () =>
    queryContent()
      .where({ _path: `/${params.bookSlug}/${params.sectionSlug}` })
      .findOne(),
  {
    transform: (res) => {
      const shuffle = (array) =>
        array
          .map((value) => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value);

      if (questionsShuffled.value) {
        questionsShuffled.value = false;
        const transformed = shuffle(
          res.questions.map((question) => ({
            ...question,
            options: shuffle(question.options),
          }))
        );

        return { ...res, questions: transformed };
      }

      return res;
    },
  }
);

const bookSlug = computed(() => path.split("/")[2]);
const shuffleQuestions = () => {
  questionsShuffled.value = true;
  toast.add({ title: "Questions Shuffled!", icon: "ph:info-duotone" });
  refresh();
};

const allQuestionsAnswered = computed(() =>
  section.value.questions.every((question) => question.response !== "")
);

const isAnswering = computed(() =>
  section.value.questions.some((question) => question.response !== "")
);

const totalQuestions = computed(() => section.value.questions?.length);
const showAnswers = ref(false);

const stats = ref();
const revisionMode = ref(false);

const handleSubmit = () => {
  showAnswers.value = true;

  const correctOrWrong = section.value.questions.reduce(
    (obj, question) => {
      if (question.response === question.answer) {
        obj.correct += 1;
      }
      if (question.response !== question.answer) {
        obj.wrong += 1;
      }

      return obj;
    },
    { correct: 0, wrong: 0 }
  );

  const percentageScore = (
    (correctOrWrong.correct / section.value.questions.length) *
    100
  ).toFixed(1);

  stats.value = { ...correctOrWrong, percentageScore };

  window.scrollTo({ top: 280, left: 0, behavior: "smooth" });
};

const handleReset = () => {
  showAnswers.value = false;
  refresh();
};

const glob = import.meta.glob("~/assets/covers/*.jpg", { eager: true });
const covers = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);
</script>

<template>
  <div>
    <Loader v-if="pending" />
    <div v-else>
      <div class="flex flex-col sm:flex-row items-center sm:items-start">
        <img
          :src="`${covers[bookSlug]}`"
          :alt="bookSlug"
          class="w-40 rounded-lg"
        />
        <div class="p-4 flex flex-col justify-between">
          <div>
            <h1
              class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-2"
            >
              {{ section.name }}
            </h1>

            <p class="py-4 font-[oswald] tracking-wider">
              <span class="text-orange-400 font-bold">
                {{ totalQuestions }}
              </span>
              Questions
            </p>

            <div v-if="section.questions?.length > 0">
              <div v-if="isAnswering">
                <UButton
                  icon="ph:info-duotone"
                  label="Restart"
                  variant="soft"
                  size="xs"
                  @click="handleReset"
                />
              </div>
              <div v-else class="space-y-3">
                <div>
                  <UButton
                    v-if="!revisionMode"
                    label="Shuffle"
                    variant="soft"
                    size="xs"
                    @click="shuffleQuestions"
                    icon="ph:matrix-logo-duotone"
                  />
                </div>

                <div class="inline-flex flex-col gap-1">
                  <h1 class="font-[oswald] tracking-wider">Quick Revision</h1>
                  <UToggle
                    v-model="revisionMode"
                    icon="ph:fast-forward-duotone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="section.questions?.length === 0"
        class="flex flex-col items-center py-6 gap-4"
      >
        <img
          src="~/assets/img/wait.svg"
          alt="wait for questions"
          class="w-2/5"
        />

        <p class="font-[oswald] tracking-wider font-thin">Coming soon...🙂</p>
      </div>

      <div class="mt-8" v-else>
        <div class="mb-6" v-if="showAnswers">
          <h5
            class="font-[oswald] font-medium text-2xl tracking-wider text-center py-4"
          >
            Summary <UIcon name="ph:chart-line-duotone" />
          </h5>
          <div class="flex flex-col justify-center gap-4">
            <div class="border dark:border-zinc-900 rounded p-4 space-y-2">
              <div>
                <div class="font-[oswald] tracking-wider">
                  Number of Questions
                </div>
                <div
                  class="font-bold text-2xl font-[poppins] tracking-wide pl-2"
                >
                  {{ section.questions.length }}
                </div>
              </div>
              <div>
                <div class="font-[oswald] tracking-wider">Correct Answers</div>
                <div
                  class="font-bold text-2xl font-[poppins] tracking-wide text-green-700 pl-2"
                >
                  {{ stats.correct }}
                </div>
              </div>
              <div>
                <div class="font-[oswald] tracking-wider">Wrong Answers</div>
                <div
                  class="font-bold text-2xl font-[poppins] tracking-wide text-red-700 pl-2"
                >
                  {{ stats.wrong }}
                </div>
              </div>
              <div>
                <div class="font-[oswald] tracking-wider uppercase">
                  Percentage (%)
                </div>
                <div
                  class="font-bold text-2xl font-[poppins] tracking-wide pl-2"
                >
                  {{ stats.percentageScore }}
                </div>
              </div>
            </div>
            <div class="flex gap-2 justify-center">
              <UButton
                class="self-center"
                icon="ph:caret-circle-left-duotone

                "
                @click="$router.back()"
                >Go Back</UButton
              >
              <UButton
                class="self-center"
                @click="handleReset"
                icon="ph:arrows-counter-clockwise-duotone

                "
                >Reset</UButton
              >
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <SingleBest
            v-for="(question, questionId) in section.questions"
            :key="questionId"
            :question="question"
            :questionId
            :showAnswers
            :revisionMode
          />
        </div>

        <div>
          <div
            v-if="section.questions?.length > 0"
            class="flex justify-end border-t dark:border-t-zinc-900 pt-4 mt-4"
          >
            <UButton
              @click="handleSubmit"
              :disabled="!allQuestionsAnswered || showAnswers"
              >Submit</UButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
