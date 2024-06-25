<script setup lang="ts">
  const projects = [
    {
      year: 2024,
      name: "PayMongo's Dashboard",
      techstack: [
        'React.JS',
        'Sass',
        'Storybook',
        'Ruby on Rails',
        'Sidekiq',
        'PostgreSQL',
        'AWS'
      ],
      links: [
        {
          name: 'dashboard.paymongo.com',
          url: 'https://dashboard.paymongo.com/login'
        }
      ]
    },
    {
      year: 2023,
      name: 'Simple Habit',
      techstack: [
        'Nuxt3',
        'DaisyUI',
        'Google Sign-in',
        'PostgreSQL',
        'Heroku'
      ],
      links: [
        {
          name: 'simplehabit.io',
          url: 'https://simplehabit.io/'
        }
      ]
    },
    {
      year: 2023,
      name: 'PseudoGatewayAPI',
      techstack: ['Fastify', 'Supabase', 'Vercel'],
      links: [
        {
          name: 'github.com',
          url: 'https://github.com/netervati/pseudo-gateway-api',
        },
        {
          name: 'gateway.pseudorestapi.com',
          url: 'https://gateway.pseudorestapi.com'
        }
      ]
    },
    {
      year: 2023,
      name: 'PseudoRESTAPI',
      techstack: ['Nuxt3', 'DaisyUI', 'Supabase', 'Vercel'],
      links: [
        {
          name: 'github.com',
          url: 'https://github.com/netervati/pseudo-rest-api',
        },
        {
          name: 'pseudorestapi.com',
          url: 'https://www.pseudorestapi.com/'
        }
      ]
    },
    {
      year: 2023,
      name: 'Super Stat Me',
      techstack: ['Nuxt3', 'Tailwind CSS', 'Octokit', 'Vercel'],
      links: [
        {
          name: 'github.com',
          url: 'https://github.com/netervati/super-stat-me',
        },
        {
          name: 'super-stat-me.vercel.app',
          url: 'https://super-stat-me.vercel.app/'
        }
      ]
    },
    {
      year: 2022,
      name: 'ProfileMe.dev',
      techstack: ['Next.JS', 'Tailwind CSS'],
      links: [
        {
          name: 'github.com',
          url: 'https://github.com/danielcranney/profileme-dev/pull/73',
        },
        {
          name: 'profileme.dev',
          url: 'https://www.profileme.dev/'
        }
      ]
    },
    {
      year: 2022,
      name: 'PayMongo Payouts (internal)',
      techstack: [
        'React.JS',
        'Sass',
        'Storybook',
        'Ruby on Rails',
        'Sidekiq',
        'PostgreSQL',
        'AWS'
      ],
      links: [
        {
          name: 'paymongo.help',
          url: 'https://paymongo.help/en/articles/5648478-getting-to-know-your-payouts-dashboard',
        }
      ]
    },
    {
      year: 2022,
      name: 'ParaZyte',
      techstack: [
        'JavaScript',
        'Howler.JS',
        'Photoshop',
        'Bfxr',
        'Beepbox',
      ],
      links: [
        {
          name: 'github.com',
          url: 'https://github.com/netervati/Parazyte',
        },
        {
          name: 'itch.io',
          url: 'https://netervati.itch.io/parazyte',
        }
      ]
    },
    {
      year: 2022,
      name: 'Tech Content Portal',
      techstack: ['Vue3', 'Django', 'AWS'],
      links: []
    },
    {
      year: 2021,
      name: 'Space Distortion',
      techstack: [
        'TypeScript',
        'GIMP',
        'Bfxr',
        'Beepbox',
        'NeutralinoJS'
      ],
      links: [
        {
          name: 'github.com',
          url: 'https://github.com/netervati/space-distortion',
        },
        {
          name: 'itch.io',
          url: 'https://netervati.itch.io/space-distortion',
        }
      ]
    },
    {
      year: 2020,
      name: 'ClinicPro',
      techstack: ['PHP', 'jQuery', 'Bootstrap', 'MySQL'],
      links: [
        {
          name: 'emersys.online',
          url: 'http://emersys.online/clinic.php',
        }
      ]
    },
    {
      year: 2019,
      name: 'A.R. Management System',
      techstack: ['PHP', 'jQuery', 'Bootstrap', 'MySQL'],
      links: []
    },
    {
      year: 2018,
      name: 'Support Ticketing System',
      techstack: ['PHP', 'jQuery', 'Bootstrap', 'MySQL'],
      links: []
    }
  ];
</script>

<template>
  <section class="flex flex-col mt-32 gap-4 w-full">
    <PageTitle>Projects</PageTitle>
    <ContainerP>
      Below are hand-picked projects I have worked on, spanning professional 
      engagements, freelance clients, personal projects, and open-source
      contributions.
    </ContainerP>
    <table class="table-fixed mt-4">
      <thead>
        <tr class="text-sm md:text-base">
          <th class="text-start py-4 w-2/5 sm:w-2/12 md:w-1/12">Year</th>
          <th class="text-start py-4 w-3/5 sm:w-5/12 md:w-3/12">Project</th>
          <th class="text-start py-4 w-4/12 hidden md:table-cell">Tech Stack</th>
          <th class="text-start py-4 hidden sm:table-cell sm:w-5/12 md:w-4/12">Links</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, idx) in projects"
          :class="{ 'border-b': idx + 1 !== projects.length }"
          class="text-sm md:text-base"
          :key="idx"
        >
          <td class="align-top py-4 w-2/5 sm:w-2/12 md:w-1/12">{{ project.year }}</td>
          <td class="align-top py-4 w-3/5 sm:w-5/12 md:w-3/12">
            <p class="hidden sm:block">{{ project.name }}</p>
            <p
              v-if="project.links.length > 0"
              class="sm:hidden"
            >
              <a class="text-cyan-500" target="_blank" :href="project.links[0].url">
                {{ project.name }}
                <UIcon class="text-xs" name="i-heroicons-arrow-up-right" />
              </a>
            </p>
            <p v-else class="sm:hidden">{{ project.name }}</p>
          </td>
          <td
            class="align-top py-4 w-4/12 hidden md:table-cell"
          >
            <div class="flex flex-wrap gap-2 px-2">
              <span class="bg-cyan-100 rounded-full py-2 px-4 text-xs" v-for="tech in project.techstack">
                {{ tech }}
              </span>
            </div>
          </td>
          <td class="align-top py-4 hidden sm:table-cell sm:w-5/12 md:w-4/12">
            <p
              v-for="link in project.links"
              :key="link.url"
            >
              <a class="text-cyan-500" target="_blank" :href="link.url">
                {{ link.name }}
                <UIcon class="text-xs" name="i-heroicons-arrow-up-right" />
              </a>
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
