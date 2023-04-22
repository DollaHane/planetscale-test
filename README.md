This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## INTRO

So this is my first "FULL NOOB" attempt at deploying a Next.js 13 app (This is also my first README.md :P). Herein I'll be detailing the necessary steps in deploying a simple app and some of the challenges I faced. Here is a link to the app: https://planetscale-test-eight.vercel.app

I would advise watching this video which covers much of the below (except deployment): https://www.youtube.com/watch?v=JtqdAn_wYzY
Also be sure to checkout the following tutorial if you are not familiar with building Next.js 13 API's: https://www.youtube.com/watch?v=vrR4MlB7nBI&t=380s

## TOOLS USED
  1) Next.js 13
  2) Prisma
  3) Backend Database: PlanetScale
  3) Front-end Host: Vercel

## FRONT END DEVELOPEMENT

  1)  Login to PlanetScale and create new database
  2)  Install Next.js App: `npx create-next-app@latest`
  3)  Install Prisma: `npm install prisma` then `npx prisma init`
  4)  Check HomeBrew Version: `brew -v`, if you do not have HomeBrew installed run `brew install node`
  5)  Login to PlanetScale from the terminal: `pscale auth login`> This will open a webpage for code confirmation.
  6)  Edit .env file created by Prisma: `DATABASE_URL="mysql://root@127.0.0.1:3309/YOUR-DB-NAME-HERE"`
  7)  Edit schema.prisma variables:   
  8)  Define the schema model in schema.prisma. (Checkout the code in the respository as an example)
  9)  Connect to PlanetScale (Run local): `pscale connect YOUR-DB-NAME-HERE main --port 3309`  
      Don't quite using ctrl+c after this step, instead open a new terminal to run the below commands. I found that I got connection       issues after quiting and then running `npx prisma db push`
  11)   Sync Prisma & Pascale: `npx prisma db push`
  12)   Run: `pscale shell myfirstdatabase main`
  13)   Run: `describe {model name};` < (Remember to use a semicolon)
  14)   When schema is okay, promote schema to production: `pscale branch promote YOUR-DB-NAME-HERE main`
  15)   Start building your API in app/api/hello/route.ts (or route.js). 
        **NB!** Review the API's I created as the syntax for Next v13 is very differant from standard Express syntax. 
  16) Run: `npm run dev`
 
Inevatbably you'll need to restart your project during developement, in order to make sure you dont run into connection problems with the PlanetScale/Prisma server, I suggest running the following commands in order:
  1) `pscale auth login`
  2) `pscale connect YOUR-DB-NAME-HERE main --port 3309`
  3) `npx prisma db push`
  4) `npm run dev`

I found that running `npm run dev` before connecting to PlanetScale gave me server err: 500 issues. If you have a quicker solution please let me know.

---
## PUSH TO GITHUB

  1)  Before deploying, its very important to update the package.json by adding `"postinstall": "prisma generate”`, for more info on       this visit: https://github.com/prisma/prisma/issues/5175

This was the solution to the following error I experienced when deploying on Vercel. "Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the `prisma generate` command during the build process."

  2)  Once you've completed the above, you can push your app to a GitHub repository from where Vercel can deploy your app.

### DEPLOYING TO VERCEL

  1)  Add a new project on Vercel Dashboard. "Add New.." > "Project".
  2)  Import GitHub Repository.
  3)  In your PlanetScale database dashboard:
   i)   Click "Connect"
   ii)  Connect with "Prisma"
   iii) Generate a new password (if initial is displayed as ******)
  4)  Back in Vercel deploy page, connect PlanetScale via the Environmental Variables config.
    i)  Paste "DATABASE_URL" to "Name"
    ii) Paste the URL in "Value"
    **NB** This must be done during the inital deployment, my connection did not work updating the variables after the app was deployed.
  5) Run the deployment > Vwhala!
    
If you have any questions / suggestions please let me know! :)
