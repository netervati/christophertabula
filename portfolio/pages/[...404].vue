<script setup lang="ts">
  useHead({
    title: 'Christopher I. Tabula',
    meta: [
      {
        name: 'description',
        content: "I'm a software engineer with a passion for crafting solid and scalable digital products."
      }
    ]
  });
</script>

<template>
  <section class="flex h-[90vh]">
    <div class="flex gap-4 m-auto text-center">
      <h1
        class="font-main font-medium text-4xl md:text-5xl lg:text-6xl"
      >
        404
      </h1>
      <div class="text-start">
        <h2 class="font-medium text-lg md:text-xl lg:text-2xl">
          Not found.
        </h2>
        <NuxtLink class="group/menu text-sm md:text-base inline-block text-teal-700" to="/">
          Go home
          <span
            class="bg-cyan-400 block duration-300 group-hover/menu:w-full transition-all h-0.5 w-0"
          >
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
