# Cars

Simple CRUD (adding, browsing, updating, deleting) app for cars. Functionality includes also column sorting, pagination, filtering, favorites and very basic new car data validation.

Installation

* npm install -g json-server
* git clone [repo]
* cd [repo]
* npm install --legacy-peer-deps
* json-server --watch db.json --port 3000
* npm run dev
* browser:  http://localhost:5173/ (or any other port, displayed by Vite)

# Notes for the Code Reviewer

![Alt text](/public/lighthouse.PNG "Chrome Devtools Lighthouse results")

There are 5 video files illustrating main functionalities of the app, located in /public/video folder

1. **Vue 2.7**
   Because it allows for the installation of Vite (which is significantly faster and much less cumbersome to configure, than Webpack)
2. **Pinia rather than Vuex**
   Pinia has better DX than Vuex, due to lack of mutations and including individual stores by default. It is also recommended for Vue 3 by Vue core team
3. **Tailwind**
   I write several times faster in it than in (s)css. Moreover, it's faster both during development (jit compiler) and in the resulting application (dead code elimination).
4. **Layout and responsiveness**
   Based on GridCSS and Flexbox.
5. **Validation**
   Vuelidate was throwing an error during installation, and Vee-Validate's validation-observer was not cooperative, within the assumed short timeframe. That is why, I wrote my own (primitive, but likely sufficient for this use case) validation, sanitizing by the way the input text string.
5. **Node.js version**
   I was using 18.17 (LTS), however as I did not really use any new syntax, there should not be any issues with older versions
6. **Lack of semicolons**
   For aesthetic reasons :)


Thank you for reading and have a nice day! :)
