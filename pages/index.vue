<template>
  <header class="flex flex-col md:flex-row-reverse gap-4 h-screen w-full">
    <div class="flex items-center justify-center basis-1/2 p-8">
      <NuxtImg
        data-aos="zoom-in"
        class="rounded-lg mt-20 md:mt-0 w-[200px] lg:w-[256px]"
        src="/me.jpg"
      />
    </div>
    <div class="flex flex-col gap-4 md:gap-8 m-auto basis-1/2">
      <h1 class="font-main text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
        Hi, my <u class="decoration-4 decoration-cyan-500">name</u> is 
        <strong>Chris</strong><span class="text-cyan-500">.</span>
      </h1>
      <h3 class="sm:text-lg md:text-xl lg:text-2xl">
        I'm a <b>software engineer</b> 
        with a passion for crafting solid and scalable digital products.
      </h3>
      <div class="text-teal-700 grid gap-4 grid-cols-2 text-sm md:text-base">
        <p>Detail-oriented and highly skilled at full stack development.</p>
        <p>Proven experience in working in complex, high-traffic systems.</p>
      </div>
    </div>
  </header>
  <section class="text-center py-24"></section>
  <Container title="I bring visions into life">
    <ContainerItem title="PayMongo's Dashboard">
      <template #figure>
        <NuxtImg
          class="border-2 rounded-lg"
          src="/project-1.png"
        />
      </template>
      <template #details>
        <ContainerP>
          I am working on some parts of
          <a class="underline decoration-2 decoration-cyan-500" href="https://dashboard.paymongo.com/login">PayMongo's Dashboard</a>,
          the app that provides tools to manage online payments via PayMongo with ease.
        </ContainerP>
        <ContainerP>
          I am also working on the internal systems that are responsible for processing 
          <a class="underline decoration-2 decoration-cyan-500" href="https://paymongo.help/en/articles/5648478-getting-to-know-your-payouts-dashboard">payouts</a>
          and other compliance-related initiatives.
        </ContainerP>
      </template>
    </ContainerItem>
    <ContainerItem
      data-aos="fade-left"
      title="Simple Habit"
    >
      <template #figure>
        <NuxtImg
          class="border-2 rounded-lg"
          src="/project-2.png"
        />
      </template>
      <template #details>
        <ContainerP>
          I worked on
          <a class="underline decoration-2 decoration-cyan-500" href="https://simplehabit.io/">Simple Habit</a>,
          a minimalist habit-tracker made for self-development and productivity.
        </ContainerP>
        <ContainerP>
          I built the MVP for a freelance client, developing its core features such as the calendar
          widget, sign-in, and reflections. I also established its infrastructure.
        </ContainerP>
      </template>
    </ContainerItem>
    <ContainerItem title="PseudoRESTAPI">
      <template #figure>
        <NuxtImg
          class="border-2 rounded-lg"
          src="/project-3.png"
        />
      </template>
      <template #details>
        <ContainerP>
          I am working on
          <a class="underline decoration-2 decoration-cyan-500" href="https://pseudorestapi.com/">PseudoRESTAPI</a>,
          a no-code platform for setting up mock servers that can be tested with real API requests.
        </ContainerP>
        <ContainerP>
          This project also serves as my playground to explore technologies such as Nuxt3 and
          Supabase.
        </ContainerP>
      </template>
    </ContainerItem>
    <NuxtLink
      class="mt-8 w-fit mx-auto text-lg md:text-xl"
      data-aos="fade-right"
      to="/projects"
    >
      See more
    </NuxtLink>
  </Container>
  <section class="text-center py-24"></section>
  <Container title="I focus on delivering value">
    <ContainerItem
      :reversed="true"
      title="Pragmatic Approach"
    >
      <template #details>
        <ContainerP>
          While I have more professional experience with <strong>Ruby on Rails</strong> 
          and <strong>React.js</strong>, I consider myself framework-agnostic. I don't 
          adopt technologies solely for their own sake; rather, I select and adapt 
          technologies that best fit the project's requirements, whether it involves 
          serverless, BaaS, server-side development, etc.
        </ContainerP>
      </template>
    </ContainerItem>
    <ContainerItem
      data-aos="fade-left"
      title="Scalability and Longevity"
    >
      <template #figure><div></div></template>
      <template #details>
        <ContainerP>
          It's tempting to integrate third-party services whenever a project needs to 
          scale quickly or increase infrastructure capacity by spending more money. 
          However, these approaches aren't always sustainable in the long run. Part of my 
          work involves ensuring projects operate within budget constraints while 
          <strong>focusing on optimizations</strong> to reduce expenses.
        </ContainerP>
      </template>
    </ContainerItem>
    <ContainerItem
      :reversed="true"
      title="Code Maintainability"
    >
      <template #figure><div></div></template>
      <template #details>
        <ContainerP>
          I am passionate about writing <strong>"clean" code</strong>, which means 
          code that is testable and easy to follow. I avoid fixating on specific 
          programming principles or patterns and incorporate them only when they 
          enhance the codebase. My focus is on reducing coupling in the code while 
          avoiding excessive indirection or abstraction.
        </ContainerP>
      </template>
    </ContainerItem>
  </Container>
</template>
