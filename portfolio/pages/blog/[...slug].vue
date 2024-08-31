<template>
  <ContentDoc>
    <template v-slot="{ doc }">
      <ContentRenderer
        :class="{ 'h-[80vh]': doc.fullscreen === true }"
        class="flex flex-col mt-32 gap-4 w-full"
        :value="doc"
      />
    </template>
    <template #not-found>
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
            <NuxtLink
              class="group/menu text-sm md:text-base inline-block text-teal-700"
              to="/blog"
            >
              Back to Blog
              <span
                class="bg-cyan-400 block duration-300 group-hover/menu:w-full transition-all h-0.5 w-0"
              >
              </span>
            </NuxtLink>
          </div>
        </div>
      </section>
    </template>
  </ContentDoc>
</template>
