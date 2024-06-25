<script setup lang="ts">
  defineProps({
    href: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: undefined,
      required: false,
    },
  });
</script>

<template>
  <NuxtLink
    :to="href"
    :target="target"
    class="underline decoration-2 decoration-cyan-500"
  >
    <slot />
  </NuxtLink>
</template>
