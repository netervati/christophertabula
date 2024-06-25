<script setup lang="ts">
  const curDate = new Date();

  const links = [
    {
      icon: 'fa-brands fa-github',
      url: 'https://github.com/netervati'
    },
    {
      icon: 'fa-brands fa-stack-overflow',
      url: 'https://stackoverflow.com/users/17811563/christopher-tabula'
    },
    {
      icon: 'fa-brands fa-linkedin',
      url: 'https://www.linkedin.com/in/tabula-christopher/'
    },
    {
      icon: 'fa-brands fa-youtube',
      url: 'www.youtube.com/@netervati'
    },
    {
      icon: 'fa-regular fa-envelope',
      url: 'mailto:netervati@gmail.com'
    }
  ];
</script>

<template>
  <footer class="flex flex-col font-medium gap-4 mt-32 text-teal-700 text-center w-full py-12">
    <div>
      <small>
        &copy; {{ curDate.getFullYear() }} Christopher I. Tabula.
        All rights reserved.
      </small>
    </div>
    <div class="m-auto">
      <ul class="flex gap-8">
        <li v-for="link in links" :key="link.url">
          <a :href="link.url" target="_blank">
            <i :class="link.icon"></i>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
