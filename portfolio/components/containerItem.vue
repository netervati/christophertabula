<script setup lang="ts">
  type Props = {
    reversed?: boolean;
    title: string;
  };

  const props = withDefaults(defineProps<Props>(), {
    reversed: false,
  })
</script>

<template>
  <article
    class="p-4 md:p-8 grid gap-8 md:grid-cols-2"
  >
    <figure :class="{ 'md:order-last': props.reversed }">
      <slot name="figure">
      </slot>
    </figure>
    <div class="flex flex-col gap-4">
      <h3 class="font-main font-extrabold text-start text-base sm:text-lg md:text-xl lg:text-2xl xl:max-2xl:text-3xl">
        {{ title }}<span class="text-cyan-500">.</span>
      </h3>
      <slot name="details"></slot>
    </div>
  </article>
</template>
