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

const shuffleQuestions = () => {
  questionsShuffled.value = true;
  toast.add({ title: "Questions Shuffled!", icon: "i-ic-outline-info" });
  refresh();
};

const totalQuestions = computed(() => section.value.questions?.length);

const showStats = ref(false);

const allQuestionsAnswered = computed(() =>
  section.value.questions.every((question) =>
    question.options.every((option) => option.response !== "")
  )
);

const isAnswering = computed(() =>
  section.value.questions.some((question) =>
    question.options.some((option) => option.response !== "")
  )
);

const stats = ref();
const revisionMode = ref(false);

const handleSubmit = () => {
  showStats.value = true;

  stats.value = section.value.questions.reduce(
    (obj, a, b) => {
      a.options.forEach((option) => {
        if (option.response) {
          obj.attempted += 1;
        } else {
          obj.notAttempted += 1;
        }

        if (option.response && option.response === option.answer) {
          obj.correct += 1;
        }
        if (option.response && option.response !== option.answer) {
          obj.wrong += 1;
        }
      });

      return obj;
    },
    { attempted: 0, correct: 0, wrong: 0, notAttempted: 0 }
  );
  window.scrollTo({ top: 280, left: 0, behavior: "smooth" });
};

const handleReset = () => {
  showStats.value = false;
  refresh();
};

const glob = import.meta.glob("~/assets/covers/*.jpg", { eager: true });
const covers = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const bookSlug = computed(() => path.split("/")[2]);
</script>

<template>
  <div>
    <Loader v-if="pending" />
    <div v-else class="space-y-6">
      <div class="flex flex-col sm:flex-row items-center sm:items-start">
        <img
          :src="covers[bookSlug]"
          alt="mcq-companion"
          class="w-40 rounded-lg"
        />

        <div class="p-4 flex flex-col justify-between">
          <div>
            <h1
              class="font-[oswald] font-bold text-xl tracking-wider uppercase mb-2"
            >
              {{ section.name }}
            </h1>
            <p v-if="params.bookSlug !== 'qbase-radiology-vol-1'">
              by {{ section.authors }}
            </p>

            <p class="py-4 font-[oswald] tracking-wider">
              <span class="text-orange-400 font-bold">
                {{ totalQuestions }}
              </span>
              Questions
            </p>

            <div v-if="section.questions?.length > 0">
              <div v-if="isAnswering">
                <UButton
                  icon="i-ic-outline-restart-alt"
                  label="Restart"
                  variant="soft"
                  size="xs"
                  @click="handleReset"
                />
              </div>
              <div v-else class="space-y-2">
                <div>
                  <UButton
                    v-if="!revisionMode"
                    label="Shuffle"
                    variant="soft"
                    size="xs"
                    @click="shuffleQuestions"
                    icon="i-ic-baseline-shuffle"
                  />
                </div>

                <div class="inline-flex flex-col gap-1">
                  <h1 class="font-[oswald] tracking-wider">Quick Revision</h1>
                  <UToggle
                    v-model="revisionMode"
                    icon="i-ic-baseline-menu-book"
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

        <p class="font-[oswald] tracking-wider font-thin">
          Questions will be added soon...🙂
        </p>
      </div>

      <div v-else>
        <div v-if="showStats" class="mb-6">
          <h5
            class="font-[oswald] font-medium text-2xl tracking-wider text-center py-4"
          >
            Summary
            <UIcon name="ph:chart-line-duotone" />
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
                  {{ section.questions.length * 5 }}
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
                  {{
                    (
                      (stats.correct / (section.questions.length * 5)) *
                      100
                    ).toFixed(1)
                  }}
                </div>
              </div>
            </div>
            <div class="flex gap-2 justify-center">
              <UButton
                class="self-center"
                icon="i-ic-baseline-arrow-circle-left

  "
                @click="$router.back()"
                >Go Back</UButton
              >
              <UButton
                class="self-center"
                icon="i-ic-round-settings-backup-restore

  "
                @click="handleReset"
                >Reset</UButton
              >
            </div>
          </div>
        </div>

        <div class="space-y-8">
          <MultipleChoice
            v-for="(question, questionId) in section.questions"
            :key="questionId"
            :question="question"
            :questionId="questionId"
            :revisionMode
          />
        </div>

        <div v-if="section.questions?.length">
          <div
            class="flex justify-end border-t dark:border-t-zinc-900 pt-4 mt-4"
          >
            <UButton
              class="animate__animated animate__bounceIn animate__faster"
              @click="handleSubmit"
              :disabled="showStats || !allQuestionsAnswered"
              >Submit</UButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
