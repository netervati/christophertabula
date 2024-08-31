<script setup lang="ts">
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <section class="flex flex-col gap-12 py-12 text-center">
    <h2
      data-aos="fade-up"
      class="font-main mb-12 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:max-2xltext-6xl"
    >
      {{ title }}<span class="text-cyan-500">.</span>
    </h2>
    <slot></slot>
  </section>
</template>
