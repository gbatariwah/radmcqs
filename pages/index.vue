<script setup lang="ts">
const books = [
{
    title: "Grainger & Allison’s Diagnostic Radiology: Single Best Answer MCQs",
    slug: "grainger-and-allisons-diagnostic-radiology",
    edition: 5,
    color: "green",
    type: "sbas",
  },
  {
    title: "SBAs for the FRCR Part 2A",
    slug: "sbas-for-the-frcr-part-2a",
    edition: "Illustrated Edition",
    color: "primary",
    type: "sbas",
  },
  {
    title: "Final FRCR 2A:SBAs",
    slug: "final-frcr-2a",
    edition: 1,
    color: "sky",
    type: "sbas",
  },
  {
    title: "MCQ Companion",
    slug: "mcq-companion",
    edition: 1,
    color: "cyan",
    type: "mcqs",
  },
  {
    title: "MCQs in Anatomy",
    slug: "mcqs-in-anatomy",
    edition: 1,
    color: "primary",
    type: "mcqs",
  },
  {
    title: "QBase Radiology: Volume 1, MCQs for the FRCR",
    slug: "qbase-radiology-vol-1",
    edition: "Volume 1",
    color: "sky",
    type: "mcqs",
  },
  {
    title: "800 MCQ For Medical Radiographers",
    slug: "mcqs-for-medical-radiographers",
    edition: 1,
    color: "red",
    type: "sbas",
  },
  {
    title: "Review of Radiologic Physics",
    slug: "review-of-radiologic-physics",
    edition: 4,
    color: "green",
    type: "sbas",
  },
  {
    title: "Review of Radiologic Physics",
    slug: "review-of-radiologic-physics-2",
    edition: 3,
    color: "primary",
    type: "sbas",
  },
  {
    title: "Engineering Interview Questions - Radiology",
    slug: "engineering-interview-questions",
    edition: 0,
    color: "primary",
    type: "sbas",
  }
];
</script>

<template>
  <div>
    <h1
      class="text-center font-[oswald] font-bold text-xl tracking-wider uppercase pb-8"
    >
      Books
    </h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <BookCard v-for="book in books" :key="book.slug" :book="book" />
    </div>
  </div>
</template>
