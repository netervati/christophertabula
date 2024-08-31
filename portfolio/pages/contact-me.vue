<script setup lang="ts">
  useHead({
    title: 'Christopher I. Tabula',
    meta: [
      {
        name: 'description',
        content: "I'm a software engineer with a passion for crafting solid and scalable digital products."
      }
    ]
  });

  const form = ref<HTMLFormElement>();

  const submitEmail = async () => {
    const formData = new FormData(form.value);
    const { messageApiUrl } = useRuntimeConfig().public;
    const payload: { [key: string]: FormDataEntryValue } = {};

    for (const pair of formData) {
      payload[pair[0]] = pair[1]
    }

    await fetch(`${messageApiUrl}/send`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  };
</script>

<template>
  <section class="flex flex-col mt-32 gap-4 w-full">
    <PageTitle>Contact Me</PageTitle>
    <ContainerP>
      I'd love to hear from you! If you have any questions, feedback, or just want
      to say hello, feel free to drop me a message using the form below. I'll do my
      best to get back to you as soon as possible.
    </ContainerP>
    <ContainerP>
      Looking forward to connecting with you!
    </ContainerP>
    <form ref="form" @submit.prevent="submitEmail">
      <div class="p-2">
        <input
          class="border-b border-gray-400 focus:border-teal focus:outline-none w-full md:max-2xl:w-1/2 lg:w-1/2"
          name="email"
          type="email"
          placeholder="Your email"
          required
        />
      </div>
      <div class="p-2">
        <textarea
          class="border-b border-gray-400 focus:border-teal focus:outline-none w-full"
          name="body"
          placeholder="Your message here."
          required
          rows="8"
        ></textarea>
      </div>
      <div class="p-2">
        <input type="submit" value="Submit here" />
      </div>
    </form>
  </section>
</template>
