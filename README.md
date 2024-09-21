# christophertabula.com

This is the fourth iteration of my portfolio site.

## Frontend

Deployed as a Static Site Generator (SSG)

| Type              | Tool
| ----------------- | -----------------------------------------
| **Framework**     | [Nuxt3](https://nuxt.com/)
| **Presentation**  | [Nuxt UI](https://ui.nuxt.com)
| **Content**       | [Nuxt Content](https://content.nuxt.com/)
| **Analytics**     | [Log Rocket](https://logrocket.com/)
| **Deployment**    | [Vercel](https://vercel.com/)

### Run locally

1. Create a `./portfolio/.env` file.
2. Copy the contents in `./portfolio/.env.example` and paste it to your `.env` file.
3. Replace the values based on your setup.
4. Run the following commands:

```shell
$ chmod +x bin/portfolio
$ bin/portfolio dev # or generate
```

## Backend

Deployed as a Serverless Function

| Type              | Tool
| ----------------- | -----------------------------------------
| **Framework**     | [Fast API](https://fastapi.tiangolo.com/)
| **Messaging**     | [Slack API](https://slack.dev/python-slack-sdk/)
| **Deployment**    | [Vercel](https://vercel.com/)

### Run locally

1. Create a `./message-api/.env` file.
2. Copy the contents in `./message-api/.env.example` and paste it to your `.env` file.
3. Replace the values based on your setup.
4. Run the following commands:

```shell
$ chmod +x bin/message
$ bin/message
```
