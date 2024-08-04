<script setup lang="ts">
  const curY = ref(0);
  const isDisplayed = ref(false);

  const calculateDisplay = () => {
    curY.value = window.scrollY || window.screenY;
    const percentage = ((curY.value / window.innerHeight) * 100);
    isDisplayed.value = percentage >= 20;
  };

  onMounted(() => {
    window.addEventListener('scroll', calculateDisplay);
  });

  const scrollToTop = () => window.scrollTo(0,0);
</script>

<template>
  <button
    v-if="isDisplayed"
    @click="scrollToTop"
    class="bg-blue-300 cursor-pointer fixed text-right z-20 right-8 px-4 py-2 text-gray-700 bottom-8 rounded-full"
    data-aos="fade-in"
    type="button"
  >
    <i class="fa-solid fa-arrow-up"></i>
  </button>
</template>
