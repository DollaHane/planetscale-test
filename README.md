This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## INTRO

So this is my first attempt at deploying a Next.js 13 app (This is also my first README.md :P). Herein I'll be detailing the necessary steps in deploying a simple app and some of the challenges I faced.

## TOOLS USED
  1) Next.js 13
  2) Prisma
  3) Backend Database: PlanetScale
  3) Front-end Host: Vercel

## FRONT END DEVELOPEMENT

1) Login to PlanetScale and create new database
2) Install NEXT App: `npx create-next-app@latest`
3) Install Prisma: `npm install prisma --save-dev` /`npx prisma init`
4) Check HomeBrew Version: `brew -v`
5) PlanetScale Auth: `pscale auth login`
6) Edit .env: `DATABASE_URL="mysql://root@127.0.0.1:3309/YOUR-DB-NAME-HERE"`
7) Edit schema.prisma variables:  
8) Define the schema model in schema.prisma
9) Connect to PlanetScale (Run local): `pscale connect myfirstdatabase main --port 3309` < (Don't quite using ctrl+c, open new terminal)
10) Sync Prisma & Pascale: `npx prisma db push`
11) Run: `npx prisma generate`
12) Run: `pscale shell myfirstdatabase main`
13) Run: `describe {model name ie ”BookSuggestions”};` < (Remember to use semicolon)
14) When schema is okay, promote schema to production: `pscale branch promote YOUR-DB-NAME-HERE main`
15) Create API for comms to front-end. Go to app/api/hello/route.ts to write the API endpoints.

---
## PUSH TO GITHUB

  1)  Before deploying, its very important to update the package.json by adding `"postinstall": "prisma generate”`, for more info on       this visit: https://github.com/prisma/prisma/issues/5175

This was the solution to the following error I experienced when deploying on Vercel. "Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the `prisma generate` command during the build process."

  2)  Once you've completed the above, you can push your app to a repository from where Vercel can deploy your app.

### DEPLOYING TO VERCEL

1. Add a new project on Vercel Dashboard.
2. Run Deploy
