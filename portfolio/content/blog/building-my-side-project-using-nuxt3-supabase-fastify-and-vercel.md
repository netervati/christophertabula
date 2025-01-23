---
title: Building my side project using Nuxt3, Supabase, Fastify, & Vercel
sitemap:
  loc: /blog/building-my-side-project-using-nuxt3-supabase-fastify-and-vercel
  lastmod: 2025-01-23
  changefreq: monthly
  priority: 0.8
---

<span class="text-cyan-500">January 23, 2025</span>

# Building my side project using Nuxt3, Supabase, Fastify, & Vercel

<small>
  Originally published at <a class="text-cyan-500 no-underline text-bold" href="https://dev.to/netervati/building-my-side-project-using-nuxt3-supabase-fastify-vercel-3680">Dev.to</a>
</small>

<span class="inline-block bg-cyan-400 my-8 h-1 w-[5rem]"></span>

## Overview

Welcome to my blog post, where I share my experience in building a platform using modern web technologies.

[PseudoRESTAPI](https://www.pseudorestapi.com/) is a _no-code_ tool, which I have been developing since early 2023, that offers a simple way to build fake REST APIs for developers. Essentially, if you need to create rapid prototypes on your application and you don't want to focus on the server logic yet, then this tool is for you!

The platform offers the following features:
- Designing pseudo database tables using models
- Data generation for each model
- Fake API endpoints for external clients to consume

with more to be added soon (_if I'm not lazy_).

## About

I started this project with the intention of exploring technologies that have caught my interest—in particular, [Nuxt3](https://nuxt.com/) and [Supabase](https://supabase.com/). Back then, Nuxt3 was still fresh and Supabase was gaining traction, so I thought of developing a project with these tools in order to experience what they offer.

This blog post will not only showcase some of the challenges and lessons I learned while working on this project, but it will also demonstrate my expertise in certain aspects of software development.

I hope you enjoy reading this!

## Guidelines for Readers

- 💡 Potential insights and valuable information
- 💭 Random thoughts and opinions
- ❗ Something to be cautious about

## Planning the Architecture

The first thing I did was to design the project's architecture. Since my goal was to learn Nuxt3 and Supabase, I wanted to make the deployment easy to manage so I can focus on learning these tools. No need to complicate the infrastructure. Hence, I used [Vercel](https://vercel.com/) for my cloud hosting provider. I also did not want to spend some time on designing the UI, so I decided to use [Tailwindcss](https://tailwindcss.com/) with [DaisyUI](https://v2.daisyui.com/).

Initially, I planned to build everything within a single Nuxt3 application to keep things simple. But later I encountered issues with the middlewares affecting the public endpoints, which prompted me to decouple the services to reduce the complexity of the application. Therefore, I ended up with two services: the <u>dashboard</u> and the <u>gateway</u>.

The **dashboard** is where users can sign-in using their GitHub accounts to create models for their mock server. These models are then exposed via the **gateway** for external clients to consume.

Here's the diagram for that:

![PseudoRESTAPI - Architecture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/e1ltkous012yi60fej75.png)

Both applications were built with Nuxt3 at first, but later, I migrated gateway to [Fastify](https://fastify.dev/) instead to lessen the overhead in the dependencies.

## Server Regions

> 💡 **TIP**:
>
> Make sure your Serverless Function is on the same or at least, close to your Supabase region.

My first big mistake was creating the Supabase project in `ap-southeast-asia-1`. By default, Serverless Functions in Vercel are located in _Washington, D.C., USA_ (`iad1`), a very distant region compared to the Supabase project. This affected the latency on every request.

You can really feel the slow response time from the dashboard especially during authentication. In fact, sign-ins took an average of about 5 seconds to complete, and even more during cold starts, which is just terrible.

Fortunately, Vercel offers a straightforward method to update your function region. After I changed it to _Singapore, Southeast_ (`sin1`), the response time improved. You can find the steps [here](https://vercel.com/guides/redeploy-vercel-functions-regional-failover).

## GitHub Composite Action

Setting up the CI pipeline of the dashboard was not smooth. I started out with two workflow files: `build.yml` & `lint.yml`. The `build.yml` was tasked to install the dependencies and test the project's build to see if it doesn't fail with the recent commits. On the otherhand, the `lint.yml` is meant to check if the code passes the ESlint and Prettier rules.

The configuration was supposed to be straightforward but I wanted to keep things DRY by reducing the repetition of steps on each file. Hence, I tried to _"import"_ the `build.yml` to `lint.yml` because I was under the assumption that the dependencies can be shared across both jobs. This was wrong.

Fortunately, I found out later that it is possible to keep your workflows DRY by using [composite action](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action). Observe:

```yml
name: CI setup
description: 'Sets up the environment for jobs during CI workflow'

inputs:
  node-version:
    description: 'The Node version to be setup'
    required: true

runs:
  using: composite
  steps:
    - uses: actions/checkout@v3
    - name: Use Node.js ${{ inputs.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ inputs.node-version }}
    - name: Install dependencies
      run: npm install
      shell: bash
```

As you can see, the responsibility of installing the dependencies was transferred to this composite action, and I was able to _"import"_ this in my workflows. Once I accomplished this, I then merged both workflows into one file (`build.yml`) and added the `type-check` job.

Here's an example of how I use the composite action:

```yml
jobs:
  type-check:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x]

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      - name: Setup
        uses: ./.github/actions/ci-setup
        with:
          node-version: ${{ matrix.node-version }}
      - name: Type Checking
        run: npm run typecheck
```

## Structuring the Codebase

Undoubtedly, designing the structure of the codebase was a challenging task. Having established standards would have aided me in this process. However, since I was also in the learning phase of Nuxt3, I had to stumble around to determine which structure works best. Frankly, this section deserves its own separate post but I want to highlight the important bits here.

For the client-side structure, I took inspiration from the [MVC pattern](https://www.geeksforgeeks.org/mvc-design-pattern/) where:

- **Pinia stores** served as the _models_
- **Component UI logic** (found in the `<script />` tag) served as the _controllers_
- **Component templates** served as the _views_

![MVC pattern in Nuxt3 client-side](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yk35jqj8uapidzbkqiji.png)

Of course, this may not be the most accurate application of that pattern, but this is how I incorporated it in this project.

Whenever a store is initialized, it immediately sends a `GET` request to the server and caches the response to the client-side. The store also provides _actions_ to mutate the cache whenever the user performs a create, update, or delete operation. These operations are all tied with the _handler_ functions in the component (e.g. `handleSubmit()`, `handleConfirm()`), as they should only execute based on user interaction.

To demonstrate this pattern, here's a sample snippet of the `useApp` store:

```ts
export default defineStore('apps', () => {
  const toast = useToast();

  const { data, pending, refresh } = useLazyFetch<AppWithAppKey[]>(
    '/apps',
    {
      method: 'GET',
      server: false,
    }
  );

  const list = computed(() => data.value || []);

  // action method
  const del = async (id: string, options: Options): Promise<void> => {
    await $fetch(`/apps/${id}`, {
      method: 'DELETE',
      async onResponse({ response }) {
        if (response.status === 200) {
          toast.success('Deleted the app!');

          // triggers a re-fetch
          await refresh();
        }
      },
    });
  };

  // other methods...

  return {
    list,
    delete: del,
  };
}
```

For brevity's sake, here's how I use it in an imaginary component:

```vue
<script lang="ts" setup>
  import useApp from '~~/stores/useApp';

  const app = useApp();

  const handleDelete = async (id: string) => {
    await app.delete(id);
  };
</script>

<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rec in app.list" :key="rec.id">
        <th>
          <button @click="handleDelete(rec.id)">
            Delete
          </button>
        </th>
        <th>{{ rec.id }}</th>
        <th>{{ rec.name }}</th>
      </tr>
    </tbody>
  </table>
</template>
```

> 💡 **TIP**:
>
> Use Nuxt3's fetch composables for retrieving data from the server, as they offer [network calls de-duplication and navigation prevention](https://nuxt.com/docs/getting-started/data-fetching#why-using-specific-composables). For user-based network requests, use `$fetch`.

> 💭 **CONSIDERATIONS**
>
> Because Nuxt3 caches requests with the fetch composables, it is also possible to replicate the store implementation using a simple composable and [useState](https://nuxt.com/docs/getting-started/state-management).

On the other hand, I employed a simple structure on the server-side, consisting of two layers: <u>routes</u> and <u>services</u>.

The **routes** house the business logic of the server, whereas **services** act as the abstraction layer for Supabase queries. These abstraction layers make the data-access more reusable and easy to integrate within the routes.

> ❗ **WARNING**:
>
> In software architecture, the term _"services"_ typically refers to the layer responsible for handling the business logic of the application. A more fitting term for my _"services"_ directory would be _"repositories,"_ aligned with the <u>Repository Design Pattern</u>. You can find additional information [here](https://www.geeksforgeeks.org/repository-design-pattern/).

Here's an example of the `appServices`:

```ts
// server/services/appServices.ts

import ErrorResponse from '../utils/errorResponse';
import SupabaseService from './supabaseService';

export default class AppServices extends SupabaseService {
  async list() {
    const apps = await this.client
      .from('apps')
      .select('id, title, description, app_keys(api_key)')
      .is('deleted_at', null)
      .is('app_keys.deleted_at', null)
      .eq('user_id', this.user.id)
      .order('created_at', { ascending: false });

    if (apps.error !== null) {
      throw ErrorResponse.supabase(apps.error);
    }

    return apps.data;
  }
}
```

To make the services type-safe, the parent class, `SupabaseService`, imports the `Database` type that is generated using the Supabase CLI.

> 💡 **TIP**
>
> To generate your Supabase types, install the Supabase CLI to your project and run the command: `npx supabase gen types typescript --project-id "$PROJECT_REF" --schema public > path/to/output.ts
`

Here's how I use the service class in `apps.get.ts`:
```ts
// server/routes/apps.get.ts

import AppServices from '../services/appServices';

export default defineEventHandler(async (event) => {
  const list = await new AppServices(event).list();

  return list;
});
```

I also want to briefly mention the gateway's structure, which is based on Fastify's [guide](https://fastify.dev/docs/v3.29.x/Guides/Serverless/#vercel) to serverless in Vercel:

```
|-- api/
|   |-- serverless.ts # application instance and entrypoint
|-- functions/
|   |-- models/ # core endpoints
|   |-- healthCheck.ts
|   |-- index.ts
|   |-- types.ts # where routes are registered
|-- supabase/
|-- utils/
```

> 💭 **CONSIDERATIONS**:
>
> Perhaps a better structure for the gateway and the dashboard's server-side might be the [Three-layer architecture](https://bytearcher.com/articles/node-project-structure/).

While it took a great deal of effort conceptualizing everything, it proved to be beneficial in the end, as it enabled me to develop features quickly. In fact, these patterns were extremely helpful when I [revamped](https://github.com/netervati/pseudo-rest-api/pull/125) the entire project.

## Models and Model Data with `jsonb`

A fundamental feature of the platform is the ability to generate pseudo database tables using models. These models should offer capabilities similar to a SQL database, allowing users to flexibly structure their data as needed. This is why I opted for the `jsonb` data type.

> 💡 **TIP**:
>
> Postgres supports two unstructured data types: `jsonb` and `json`. While `jsonb` is a more performant alternative to the `json` data type, it does come with the downside of having unordered keys when stored. If maintaining an ordered structure is crucial for your use case, you should use `json` instead.

Models can be created via the `POST /models` endpoint, which accepts an array of objects that describe the schema of the pseudo database table. For example:

```json
[
  {
    "name": "id",
    "type": "uuid"
  },
  {
    "name": "full_name",
    "type": "string"
  },
  {
    "name": "age",
    "type": "number"
  }
]
```

This array is saved in a `jsonb` column named _schema_ in the `models` table.

When users generate model data, the client sends a POST request to `/models/:id/model-data` including a request body with a similar array of objects, but with additional information to specify the values to generate for each attribute:

```json
[
  {
    "max": null,
    "min": null,
    "name": "id",
    "option": null,
    "type": "uuid"
  },
  {
    "max": null,
    "min": null,
    "name": "full_name",
    "option": "faker_full_name",
    "type": "string"
  },
  {
    "max": 20,
    "min": 60,
    "name": "age",
    "option": null,
    "type": "number"
  }
]
```

The object that is then generated and saved in the `model_data` table contains the following shape:

```json
{
  "id": "b9ee5ff9-f3bf-4973-a14a-37e58bdd2e49",
  "full_name": "John Doe",
  "age": 32
}
```

In essence, models and model data have a one-to-many relationship.

Where this design becomes relevant is in the gateway. Users are able to send POST and PUT request to their fake endpoints, which meant I had to ensure that the exact shape defined in the model is what's being saved in the model data. With that said, a _mapping_ of the model schema and the request body was used to guarantee this. Here's a sample snippet:

```ts
const record = await supabase.from('models')
  .select('id, schema, model_data(id)')
  .is('deleted_at', null)
  .is('model_data.deleted_at', null)
  .eq('name', model)
  .eq('app_id', data.id);

// some validations...

const attrErrors: { attribute: string, detail: string }[] = [];
const schema = record.data[0].schema as { name: string, type: string }[];

const payload = schema.reduce<Object>(
  (obj, { name, type }) => {
    if (name in body && name !== 'id') {
      const isValid = isValidAttribute(type, body[name]);

      if (!isValid) {
        attrErrors.push({
          attribute: name,
          detail: `Not a valid ${type}`,
        });
      } else {
        obj[name] = body[name];
      }
    }

    return obj;
  },
  {}
);

// return attribute errors if present...

payload.id = uuidv4();
```

> ❗ **Warning**:
>
> When using `jsonb`, the type that is going to be generated by Supabase for that column will be too deep for TypeScript to analyze. Hence, you will have to use [type assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) to specify the properties.

## Final Thoughts

Truly, this was a fun project to develop despite the many challenges I encountered. I also enjoyed exploring the technologies I incorporated.

In particular, these were the things I liked and disliked:

- Nuxt3
  - ✅ Caching of requests using fetch composables
  - ✅ Auto-imports on both client-side and server-side
  - ✅ Folder structure
  - ✅ Easy deployment to many cloud hosting providers
  - ❌ Difficulty in setting up ESLint and Prettier
  - ❌ Memory usage when running in development
- Supabase
  - ✅ Integration with different OAuth providers
  - ✅ Decent ORM
  - ❌ Too heavy to setup locally in Docker

Personally, if I had to build this as an actual SaaS product, then I would most likely use a different tech stack, one that is as _"close to the metal"_ as possible like Fastify. That is not to say that none of the technologies mentioned are viable options. Far from it. I simply believed that I could achieve the same result with better performance and lesser dependencies.

Lastly, I'd like to express my gratitude to everyone who has read through the entire post. I hope you enjoyed reading this, as much as I did writing it.

Till the next blog!
