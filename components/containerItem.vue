<script setup lang="ts">
  type Props = {
    dataAos?: string;
    reversed?: boolean;
    title: string;
  };

  const props = withDefaults(defineProps<Props>(), {
    dataAos: 'fade-right',
    reversed: false,
  })
</script>

<template>
  <article
    :data-aos="dataAos"
    class="p-8 grid gap-8 md:grid-cols-2"
  >
    <figure :class="{ 'md:order-last': props.reversed }">
      <slot name="figure">
      </slot>
    </figure>
    <div class="flex flex-col gap-4">
      <h3 class="font-main font-extrabold text-start sm:text-lg md:text-xl lg:text-2xl">
        {{ title }}
      </h3>
      <slot name="details"></slot>
    </div>
  </article>
</template>
