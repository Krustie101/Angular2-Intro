# Angular2-Intro
This repo contains a demo project used for a presentation introducing angular 2 & typescript intended for Java developers so the explanation about the frontend setup will be long-winded (the project itself originated from https://github.com/pkozlowski-opensource/ng2-play). The project is set up to run with Spring Boot. For the moment, the Spring Boot application only serves the angular 2 application, but soon it will also be used as a rest service controller. I will assume that you are familiar with Maven & Spring Boot, all major Java IDE's have excellent support for them anyway.

For now, I want to focus on building angular 2 applications and try to keep the build & module loading process as simple as possible.

The main project consists of two sub projects
- frontend: contains the Angular 2 code   
- backend:  a Maven project that contains the Spring Boot application

In order to run the application you will first need to set up the frontend project. In order to do so, you first have to follow these steps.

- Install node.js  
- Install typescript globally: npm install typescript -g. You invoke the typescript compiler by using "tsc" from now on.
- Install gulp globally: npm install gulp -g. 

After that you need to go to the frontend project where you will find 3 configuration files: gulp.json, package.json,, tsconfig.json that are used to build an develop the application.

To get quickly up and running, run the following commands in the frontend folder:
- npm install
- gulp setup-typings
- gulp build (or "gulp build-watch", "gulp build-watch-resources" if you want to start to write your own code, see below for the difference) 

After you have started the Spring Boot Application, you can navigate to the following simple example applications:

localhost:8080/app/index-welcome.html  (Hello World)
localhost:8080/app/index.html (Cheap Booking Com)
localhost:8080/app/root (Cheap Booking Com with cheap routing)

For the hotels you should take 'Dublin' or 'Killarney'.
 

If you are not familiar with javascript or typescript development, the followin explanation might be useful.

package.json contains some information about the project and the dependencies of the project on javascrip & css libraries (the dev-dependencies are dependencies on build tools and you can ignore them for now)

First run "npm install" in the frontend directory. This will use package.json to download the necessary javascript & css libraries to the node_modules folder. If there is an update of angular 2, you can run "npm install angular2 --save", this will install the new version but also update package.json with the new version number thanks to the "--save" option. For more information about the version system used by npm, you can go here https://github.com/npm/node-semver.

The typescript compiler and your IDE will need typescript definition files for your javascript libraries. In the case of angular2 (and rx) these typescript definitions have been downloaded during npm install so you only need to copy them to the typings folder in your frontend folder.

For this purpose I added a gulp task to the gulpfile.js. Add the moment, this will remove the old versions for angular2 related & rx definition files and copy the new ones from the node_modules folder to the typings folder. Rx is strictly speaking not necessary, but this is used by angular 2 and you might want to benefit from it in the future.

In short, you just need to run "gulp setup-typings".

Now we are ready to build the frontend project to the "dist" foldr. For this purpose I have added the following gulp tasks to the gulp file
- build
- build-watch
- build-watch-resources


They all start with the build step that cleans the "dist" folder, copies the necessary javascript libraries to the "dist/lib" folder, copies the html files and templates from the "src" to the "dist" folder and ultimately transpiles the ts files from the "src" to the "dist" folder using the tsc command. When renaming files, the old version of javascript files are not removed so it is a good idea to start the day with a clean build.

The typescript compilation step will use the tsconfig.json file. The same one will also be picked up automatically by the latest version of the modern IDE's (e.g. Visual Studio Code & Webstorm 11 (almost released)).

In short, in order to be abled to start and check out the application you need to run "gulp build". 

The Spring Boot application is configured to pick up the application files in the "dist" folder and, for debugging purposes, the source files in the "src" folder of the front end project. Have a look at the class WebMvcConfiguration.

After you have started the Spring Boot Application, you can navigate to following simple examples mentioned in the beginning.













 




