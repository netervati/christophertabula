<script setup lang="ts">
  const curY = ref(0);
  const dropShadow = ref(false);

  const links = [
    {
      name: 'About',
      to: '/',
    },
    {
      name: 'Projects',
      to: '/projects',
    },
    {
      name: 'Blog',
      to: '/blog',
    },
    {
      name: 'Contact Me',
      to: '/contact-me',
    }
  ];

  const fullScreenLinks = links.slice(1);

  onMounted(() => {
    window.addEventListener('scroll', () => {
      curY.value = window.scrollY || window.screenY;
      const percentage = ((curY.value / window.innerHeight) * 100);
      dropShadow.value = percentage >= 20;
    });
  });
</script>

<template>
  <nav
    :class="{ 'drop-shadow-lg': dropShadow }"
    class="absolute bg-white font-medium text-cyan-950 flex gap-4 left-0 right-0 mx-auto justify-between max-w-[1366px] md:justify-center items-center px-8 sm:px-16 md:px-38 lg:px-48 p-4 md:py-8 top-0 w-full"
  >
    <div class="grow-0 w-[12rem]">
      <NuxtLink class="font-main font-extrabold" to="/">
        Christopher Tabula
      </NuxtLink>
    </div>
    <div class="gap-12 grow hidden md:flex md:justify-end">
      <NuxtLink
        v-for="link in fullScreenLinks"
        class="group/menu inline-block"
        :to="link.to"
      >
        {{ link.name }}
        <span
          class="bg-cyan-400 block duration-300 group-hover/menu:w-full transition-all h-0.5 w-0"
        >
        </span>
      </NuxtLink>
    </div>
    <div class="grow-0 md:hidden">
      <UPopover class="block md:hidden" :popper="{ placement: 'top-end' }">
        <UButton color="white" trailing-icon="i-heroicons-bars-2-solid" />
        <template #panel>
          <div class="p-8 w-48">
            <ul class="flex flex-col gap-4">
              <li v-for="link in links">
                <NuxtLink class="group/menu inline-block" :to="link.to">
                  {{ link.name }}
                  <span
                    class="bg-cyan-400 block duration-300 group-hover/menu:w-full transition-all h-0.5 w-0"
                  >
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </template>
      </UPopover>
    </div>
  </nav>
</template>
