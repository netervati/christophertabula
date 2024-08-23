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
      <h1 class="font-main xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-7xl">
        Hi, my <u class="decoration-4 decoration-cyan-500">name</u> is
        <strong>Chris</strong><span class="text-cyan-500">.</span>
      </h1>
      <h3 class="xs:text-medium sm:text-lg md:text-xl lg:text-2xl text-3xl">
        I'm a <b>software engineer</b>
        with a passion for crafting solid and scalable digital products.
      </h3>
      <div class="text-teal-700 grid gap-4 grid-cols-2 xs:text-sm sm:text-sm md:text-base lg:text-base text-large">
        <p>Detail-oriented and highly skilled at full-stack development.</p>
        <p>Proven track record of building successful products.</p>
      </div>
    </div>
  </header>
  <section class="text-center py-16"></section>
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
          I previously worked on <a class="underline decoration-2 decoration-cyan-500" href="https://dashboard.paymongo.com/login">PayMongo's Dashboard</a>,
          the platform that powers online payment processing for businesses.
        </ContainerP>
        <ContainerP>
          I also worked on its internal systems that are responsible for processing
          <a class="underline decoration-2 decoration-cyan-500" href="https://paymongo.help/en/articles/5648478-getting-to-know-your-payouts-dashboard">payouts</a>
          and ensuring the platform's full compliance to regulations.
        </ContainerP>
      </template>
    </ContainerItem>
    <ContainerItem title="Simple Habit">
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
          I was responsible for building the MVP for a freelance client, establishing its infrastructure and developing
          its core features such as the calendar widget, sign-in, and reflections.
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
      class="mt-8 w-fit mx-auto text-base md:text-lg lg:text-xl"
      data-aos="fade-up"
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
          and <strong>React.js</strong>, I'm not limited by those tools only. I select
          and adapt technologies that best fit the project's requirements, whether it
          involves serverless, BaaS, server-side development, etc.
        </ContainerP>
      </template>
    </ContainerItem>
    <ContainerItem title="Scalability and Longevity">
      <template #figure><div></div></template>
      <template #details>
        <ContainerP>
          I have a strong focus on <strong>optimizing the product's internals</strong>
          to keep infrastructure costs manageable. My goal is to ensure the product
          operates within budget constraints and to reduce reliance on third-party
          services, which often leads to higher operating costs.
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
          code that is testable and easy to follow. While I take inspiration from
          multiple techniques and patterns, my focus is on reducing coupling in
          the code while avoiding excessive indirection or abstraction.
        </ContainerP>
      </template>
    </ContainerItem>
  </Container>
</template>
