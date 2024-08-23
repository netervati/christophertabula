<template>
  <NavBar />
  <ScrollToTopButton />
  <main class="font-medium text-cyan-950 px-8 sm:px-16 md:px-38 lg:px-48 max-w-[1366px] m-auto">
    <slot></slot>
  </main>
  <SiteFooter />
</template>
