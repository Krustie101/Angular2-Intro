# Angular2-Intro
This repo contains a demo project used for a presentation introducing angular 2 & typescript intended for Java developers so the explanation about the frontend setup will be long-winded (the project itself originated from https://github.com/pkozlowski-opensource/ng2-play). The project is set up to run with Spring Boot. For the moment, the Spring Boot application only serves the angular 2 application, but soon it will also be used as a rest service controller. I will assume that you are familiar with Maven & Spring Boot, all major Java IDE's have excellent support for them anyway.

A quick starter skeleton version can be found at [Angular2-SpringBoot](https://github.com/Krustie101/Angular2-SpringBoot).

For now, I want to focus on developing angular 2 applications and try to keep the build & module loading process as simple as possible. So no webpack or jspm at the moment, these are moving targets anyway. 

The main project consists of two sub projects
- frontend: contains the Angular 2 code   
- backend:  a Maven project that contains the Spring Boot application

##Quick start

In order to run the application you will first need to set up the frontend project. In order to do so, you first have to follow these steps.

- Install node.js  
- Install typescript globally: npm install typescript -g. You invoke the typescript compiler by using `tsc` from now on.
- Install gulp globally: npm install gulp -g. 

After that you need to go to the frontend project where you will find 3 configuration files: gulp.json, package.json,, tsconfig.json that are used to build an develop the application.

To get quickly up and running, run the following commands in the frontend folder:
- npm install
- gulp setup-typings
- gulp build (or `gulp build-watch`, `gulp build-watch-resources` if you want to start to write your own code, see below for the difference) 

After you have started the Spring Boot Application, you can navigate to the following simple example applications:
- localhost:8080/app/index-welcome.html  (Hello World)
- localhost:8080/app/index.html (Cheap Booking Com)
- localhost:8080/app/root (Cheap Booking Com with cheap routing)

For the location you should take 'Dublin' or 'Killarney'.
 
##Further explanation

If you are not familiar with javascript or typescript development, the following explanation might be useful.

package.json contains some information about the project and the dependencies of the project on javascrip & css libraries (the dev-dependencies are dependencies on build tools and you can ignore them for now)

First run `npm install` in the frontend directory. This will use package.json to download the necessary javascript & css libraries to the node_modules folder. If there is an update of angular 2, you can run `npm install angular2 --save`, this will install the new version but also update package.json with the new version number thanks to the `--save` option. For more information about the version system used by npm, you can go here https://github.com/npm/node-semver.

Do not forget to run `gulp setup-typings` and `gulp build` after an npm update. 

The typescript compiler and your IDE will need typescript definition files for your javascript libraries. In the case of angular2 (and rx) these typescript definitions have been downloaded during npm install so you only need to copy them to the typings folder in your frontend folder.

For this purpose I added a gulp task to the gulpfile.js. Add the moment, this will remove the old versions for angular2 related & rx definition files and copy the new ones from the node_modules folder to the typings folder. Rx is strictly speaking not necessary, but this is used by angular 2 and you might want to benefit from it in the future.

In short, you just need to run `gulp setup-typings`.

Now we are ready to build the frontend project to the `dist` folder. For this purpose I have added the following gulp tasks to the gulp file
- build
- build-watch
- build-watch-resources


They all start with the build step that cleans the `dist` folder, copies the necessary javascript libraries to the `dist/lib` folder, copies the html files and templates from the `src` to the `dist` folder and ultimately transpiles the ts files from the `src` to the `dist` folder using the tsc command. When renaming files, the old version of javascript files are not removed so it is a good idea to start the day with a clean build.

The typescript compilation step will use the tsconfig.json file. The same one will also be picked up automatically by the latest version of the modern IDE's (e.g. Visual Studio Code & Webstorm 11 (almost released)).

In short, in order to be abled to start and check out the application you need to run `gulp build`. 

The Spring Boot application is configured to pick up the application files in the `dist` folder and, for debugging purposes, the source files in the `src` folder of the front end project. Have a look at the class WebMvcConfiguration.

After you have started the Spring Boot Application, you can navigate to the simple examples mentioned in the beginning.

If you open Developer Tools in your browser you should see the typescript files in the `booking-com/app-src` directory, they can be used for debugging purposes. It is also possible to debug typescript files from Webstorm but it needs further setup.

Now to the other type of build tasks:
- build-watch
- build-watch-resources
Both of them will after the clean build watch for changes in html files in the `src` folder of your frontend project and copy any changed files to the `dist` folder. That is all that the second will do.

The first one will instruct the tsc command to watch for changes in the ts files and perform an incremental compilation on any change. You will not need this if your IDE does the incremental compilation itself based on the tsconfig.json file (they will also delegate tot the tsc command anyhow), in this case running `build-watch-resources` is enough during development. 

I had good experiences concerning typescript code completion with the following IDE's:
- Webstorm 11 (pre release). This also has good completion & highlighting for angular 2 in html files and inline templates. Refactoring was also a breeze. It also has good support for Gulp.
- Visual Studio Code. This is a free editor based on Atom that focuses on web development. Code completion for typescript is very good, but there is no completion or highlighing for angular 2 in inline templates.

I have no experience with Visual Studio, but expect it to offer good support as well. Eclipse seems to be lagging: two typescript plugins that I know of are eclipse-typescript from palantir and typecs. I did not look at them for a few months now because the solution offered by Webstorm & VS Code where keeping up better with the pace of typescript changes.

In order to start develping in Webstorm 11 open the frontend folder as a project, opening the main folder as a project got the typescript compiler confused. Then you just need to go the Typescript configuration in `File -> Settings` and configure to use tsconfig.json (2 checkboxes), enable the typescript compiler and instruct it to track changes. 
If you right-click on your gulpfile.js, you can get a list of gulp tasks by clicking `Show Gulp Tasks`. Mark your `dist` folder as an excluded directory and now you are good to go.

For the configuration of VS Code, you can have a look here: https://code.visualstudio.com/Docs/languages/typescript. For running tasks in VS Code, go here https://code.visualstudio.com/docs/editor/tasks. It is also able to run Gulp tasks.

##Further reading 

Angular 2
- [angular.io](https://angular.io/) (API, Developer Guides, Tutorial are getting up to scratch) 
- [github angular](https://github.com/angular/angular) (examples, source code, changelogs)
- [gitter angular](https://gitter.im/angular/angular)
- [angular weekly meeting notes](https://docs.google.com/document/d/150lerb1LmNLuau_a_EznPV1I1UHMTbEl61t4hZ7ZpS0)
- [angular js blogspot](http://angularjs.blogspot.be/)
- blogs: [Victor Savkin](http://victorsavkin.com/), [Pascal Precht](http://blog.thoughtram.io/)
- Curated list of angular 2 links: [awesome-angular2](https://angular-class.github.io/awesome-angular2/),     [angular2-education](https://github.com/timjacobi/angular2-education)
- [angular-connect](http://angularconnect.com/) 

[Ionic 2](http://ionic.io/2): angular 2 on mobile.  
You need to use `npm install ionic-framework`

Typescript:
- [Typescript Language](http://www.typescriptlang.org/) (tutorial, handbook)
- [Typescript github](https://github.com/Microsoft/TypeScript/) (+wiki)
- [Changelog] (https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript)

[System Module Loader](https://github.com/systemjs/systemjs/wiki)  
At some stage, you will need to read up on it. 










 




